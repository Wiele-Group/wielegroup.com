#!/usr/bin/env node
/**
 * gen-static-route-lastmod.mjs — codegens per-route last-modified timestamps
 * from git, baked into the bundle for sitemap.xml.
 *
 * Why this exists (v3.9.0-xray-supersweep, 2026-05-13):
 *   sitemap.ts previously used `new Date()` for the static-route lastmod
 *   field. Despite `export const dynamic = "force-static"`, OpenNext on
 *   Cloudflare Workers re-evaluates the sitemap per request, so every fetch
 *   stamped a fresh timestamp. Search engines may discount the lastmod
 *   signal under that pattern — we want lastmod to advance ONLY when the
 *   underlying route's source actually changes.
 *
 * What this does at build time:
 *   - For each route in STATIC_ROUTES (mirrored from sitemap.ts), find the
 *     corresponding `page.tsx` (Next.js App Router convention).
 *   - Run `git log -1 --format=%cI -- <file>` to get the ISO timestamp of
 *     the last commit that touched that file.
 *   - Fall back to filesystem mtime if git returns nothing (uncommitted
 *     file, e.g. first ship before initial commit).
 *   - Fall back to current time as last resort (should never hit in normal
 *     flow — would only happen if both git and fs fail).
 *   - Write src/lib/static-route-lastmod.generated.json containing the map.
 *
 * sitemap.ts imports the generated JSON; bundle ships with constant values.
 *
 * Pipeline wiring: package.json `build:cf` runs this script before
 * `next build`. Local `next dev` also reads the generated JSON (regen
 * before the dev server starts via `npm run gen:lastmod`).
 *
 * Invariant: this script writes a file that is committed to the repo (NOT
 * gitignored) so a fresh CI build doesn't have to re-run codegen if the
 * caller skips the script. It IS regenerated on every `build:cf` so
 * production deploys always reflect the latest state.
 */

import { spawnSync } from "node:child_process";
import { statSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUTPUT_PATH = join(REPO_ROOT, "src/lib/static-route-lastmod.generated.json");

// Mirrors STATIC_ROUTES in src/app/sitemap.ts. Keep these two in sync — if
// a route is added to sitemap.ts, append it here so its lastmod resolves.
// A future improvement: parse sitemap.ts AST to derive routes, but the
// duplication cost here is tiny vs. the parse complexity.
const STATIC_ROUTES = [
  "/",
  "/audit",
  "/platform",
  "/systems",
  "/systems/ai-visibility",
  "/systems/search",
  "/systems/brand-authority",
  "/systems/web-experience",
  "/pricing",
  "/marketing-agency",
  "/advertising-agency",
  "/brand-management-agency",
  "/web-design-agency",
  "/services/premium-brand-site-system",
  "/services/ai-visibility-monitoring",
  "/services/print-production",
  "/onboarding",
  "/proof",
  "/proof/google",
  "/labs",
  "/citation-brief",
  "/citation-brief/how-agencies-get-cited-in-ai-answers",
  "/trust",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

function routeToFile(route) {
  // Next.js App Router: route `/foo/bar` → `src/app/foo/bar/page.tsx`,
  // root `/` → `src/app/page.tsx`.
  const segments = route === "/" ? [] : route.split("/").filter(Boolean);
  return join(REPO_ROOT, "src/app", ...segments, "page.tsx");
}

function getGitLastModified(filePath) {
  try {
    // %cI = committer date, strict ISO-8601 with timezone. Use the relative
    // path from REPO_ROOT for portability across CI environments.
    const relative = filePath.startsWith(REPO_ROOT + "/")
      ? filePath.slice(REPO_ROOT.length + 1)
      : filePath;
    const result = spawnSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relative],
      { cwd: REPO_ROOT, encoding: "utf8" },
    );
    if (result.status !== 0) return null;
    const out = result.stdout.trim();
    return out || null;
  } catch {
    return null;
  }
}

function getFsLastModified(filePath) {
  try {
    return statSync(filePath).mtime.toISOString();
  } catch {
    return null;
  }
}

function resolveLastModified(filePath) {
  // Priority: git log → filesystem mtime → null (caller decides fallback)
  return (
    getGitLastModified(filePath) ||
    getFsLastModified(filePath) ||
    null
  );
}

const buildTimestamp = new Date().toISOString();
const map = {};
const missing = [];

for (const route of STATIC_ROUTES) {
  const filePath = routeToFile(route);
  if (!existsSync(filePath)) {
    missing.push({ route, expected: filePath });
    // Use build timestamp as last-resort fallback so the sitemap entry
    // still ships. This case is the only one where a per-build-fresh
    // timestamp leaks into the JSON — normally never hit.
    map[route] = buildTimestamp;
    continue;
  }
  const ts = resolveLastModified(filePath);
  map[route] = ts || buildTimestamp;
}

// v3.9.1a (2026-05-13) — `__build` field removed from this JSON. It used
// to live as `map.__build = buildTimestamp` so sitemap.ts had a fallback
// for routes added between codegen runs. The trade-off was that every
// build dirtied this JSON in git (the only field that changed was
// __build), polluting diffs and CI signal. Removed in favour of a
// gitignored `.last-build` sidecar for build-time observability without
// the diff noise. Sitemap fallback is now handled inline in sitemap.ts.

// Ensure src/lib/ exists (it should — repo invariant — but defensive)
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

const json = JSON.stringify(map, null, 2) + "\n";
writeFileSync(OUTPUT_PATH, json, "utf8");

// Sidecar: write the build timestamp out-of-band so it's still available
// for build-pipeline observability without dirtying the tracked JSON.
// This file IS gitignored (.last-build entry in .gitignore).
const sidecarPath = join(REPO_ROOT, ".last-build");
writeFileSync(sidecarPath, buildTimestamp + "\n", "utf8");

console.log(
  `[gen-lastmod] wrote ${Object.keys(map).length} routes to ${OUTPUT_PATH}`,
);
console.log(`[gen-lastmod] wrote build timestamp to ${sidecarPath} (gitignored)`);

if (missing.length > 0) {
  console.warn(
    `[gen-lastmod] WARNING — ${missing.length} route file(s) not found, using build timestamp as fallback:`,
  );
  for (const { route, expected } of missing) {
    console.warn(`  - ${route}  (expected ${expected})`);
  }
  // Non-fatal — caller can decide whether to treat this as a build break.
  // Soft warn keeps the build robust against in-progress route refactors.
}
