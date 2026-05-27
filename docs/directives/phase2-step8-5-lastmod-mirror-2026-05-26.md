# Phase 2 Step 8.5 — Lastmod Mirror Cleanup
**Directive version:** phase2-step8-5-lastmod-mirror-2026-05-26  
**Prepared by:** Claude Cowork  
**Date:** 2026-05-26  
**Scope:** Fix two bugs in `scripts/gen-static-route-lastmod.mjs` that cause all citation brief routes to emit build-timestamp fallback instead of correct git dates. Regenerate JSON. Deploy.

---

## §0 PROBLEM STATEMENT

Two independent bugs in `scripts/gen-static-route-lastmod.mjs`:

**Bug 1 — Missing routes.**  
The script has its own hard-coded `STATIC_ROUTES` array (an intentional duplicate of `sitemap.ts` — see script comment). CB#005, CB#006, and CB#007 were added to `sitemap.ts` but never added to the script. Their routes are absent from `static-route-lastmod.generated.json`, so sitemap.ts emits `undefined` lastmod for those entries (search engines receive no freshness signal).

**Bug 2 — Wrong file resolution for citation brief individual routes.**  
The script's `routeToFile()` function maps `/citation-brief/stage-4-freshness` → `src/app/citation-brief/stage-4-freshness/page.tsx`. This file does not exist — citation briefs share a single dynamic route at `src/app/citation-brief/[slug]/page.tsx`. The function hits the `existsSync()` false branch and falls back to build timestamp. This affects ALL individual citation brief entries currently in the script (CB#001–#004, CB#008) — they all show `2026-05-26T09:44:42.858Z` (the Step 8 build timestamp) instead of their actual git commit dates.

**Correct file target for citation brief routes:**  
`src/content/citation-briefs/[slug].mdx` — the per-brief MDX source file. This is the file whose git commit date accurately reflects when the brief's content was last changed.

---

## §0 PRE-FLIGHT — HARD STOP IF ANY FAILS

```bash
# 1. Clean working tree
git status
# Expected: nothing to commit, working tree clean

# 2. On main
git branch --show-current
# Expected: main

# 3. Confirm gen script has stage-4-freshness but is missing CB#005/006/007
grep "citation-brief" scripts/gen-static-route-lastmod.mjs
# Expected: should see stage-4-freshness BUT NOT brand-semantics, stage-1, stage-2

# 4. Confirm all 8 MDX source files exist
ls src/content/citation-briefs/*.mdx
# Expected: 8 files including stage-4-freshness.mdx

# 5. Confirm current generated JSON has build-timestamp fallbacks for briefs
grep "citation-brief/how-agencies" src/lib/static-route-lastmod.generated.json
# Expected: value ending in .858Z or similar millisecond-precision UTC = build timestamp fallback
```

---

## §3 PRE-READS — READ BEFORE EDITING

| # | File | Purpose |
|---|---|---|
| 3a | `scripts/gen-static-route-lastmod.mjs` | Read in full — understand current STATIC_ROUTES array and routeToFile() function exactly before editing |
| 3b | `src/lib/static-route-lastmod.generated.json` | Read current state — confirm which entries exist and which show build-timestamp fallback |

---

## §4 FILE EDITS — VERBATIM

### §4a EDIT — `scripts/gen-static-route-lastmod.mjs`

**Two changes to this file. Read the full file before editing.**

---

**Change 1: Fix `routeToFile()` — add citation brief special case.**

Find the existing `routeToFile` function:

```javascript
function routeToFile(route) {
  // Next.js App Router: route `/foo/bar` → `src/app/foo/bar/page.tsx`,
  // root `/` → `src/app/page.tsx`.
  const segments = route === "/" ? [] : route.split("/").filter(Boolean);
  return join(REPO_ROOT, "src/app", ...segments, "page.tsx");
}
```

Replace it with:

```javascript
function routeToFile(route) {
  // Special case: individual citation brief routes resolve to their MDX
  // source file. The shared dynamic route is at
  // src/app/citation-brief/[slug]/page.tsx — there is no per-slug page.tsx,
  // so the standard App Router convention produces a path that doesn't exist.
  // The MDX source file is the correct lastmod target: its git commit date
  // reflects when the brief's content was last changed.
  const briefMatch = route.match(/^\/citation-brief\/(.+)$/);
  if (briefMatch) {
    return join(REPO_ROOT, "src/content/citation-briefs", `${briefMatch[1]}.mdx`);
  }

  // Next.js App Router: route `/foo/bar` → `src/app/foo/bar/page.tsx`,
  // root `/` → `src/app/page.tsx`.
  const segments = route === "/" ? [] : route.split("/").filter(Boolean);
  return join(REPO_ROOT, "src/app", ...segments, "page.tsx");
}
```

---

**Change 2: Add three missing routes to `STATIC_ROUTES`.**

Find this section in the `STATIC_ROUTES` array:

```javascript
  "/citation-brief/two-tier-access-doctrine",
  "/citation-brief/stage-4-freshness",
```

Replace with:

```javascript
  "/citation-brief/two-tier-access-doctrine",
  "/citation-brief/brand-semantics-infrastructure",
  "/citation-brief/stage-1-entity-resolution",
  "/citation-brief/stage-2-source-authority",
  "/citation-brief/stage-4-freshness",
```

---

**No other changes to the script.** Do not alter any other function, comment, or constant.

---

## §5 ACCEPTANCE CRITERIA — ALL MUST PASS BEFORE DEPLOY

```bash
# A1 — Regenerate JSON (must run after editing the script)
npm run gen:lastmod
# Expected: exit 0
# Expected: output includes "wrote N routes to ..."
# Expected: NO warnings about missing files

# A2 — Brief entries now show git dates (not build timestamp)
# Git dates look like: 2026-05-15T12:34:56+02:00 (with timezone offset, no milliseconds)
# Build timestamps look like: 2026-05-26T09:44:42.858Z (milliseconds + Z)
grep "citation-brief/how-agencies" src/lib/static-route-lastmod.generated.json
# Expected: value with timezone offset format (NOT .858Z or similar)

# A3 — All 8 brief routes present in generated JSON
grep -c "citation-brief" src/lib/static-route-lastmod.generated.json
# Expected: 9 (8 individual briefs + 1 for /citation-brief index)

# A4 — CB#005 present
grep "brand-semantics-infrastructure" src/lib/static-route-lastmod.generated.json
# Expected: one match with a git date

# A5 — CB#006 present
grep "stage-1-entity-resolution" src/lib/static-route-lastmod.generated.json
# Expected: one match with a git date

# A6 — CB#007 present
grep "stage-2-source-authority" src/lib/static-route-lastmod.generated.json
# Expected: one match with a git date

# A7 — Build passes
npm run build
# Expected: exit 0
# Expected: static page count ≥ 53 (no regression)

# A8 — Sitemap lastmod for a brief is a real date, not build timestamp
# (spot-check after build — read the build output or check the generated sitemap)
```

All 8 checks must pass. Any failure = hard stop.

---

## §6 POST-DEPLOY VERIFICATION

```bash
# V1 — Sitemap shows non-trivial lastmod for CB#006 (was previously undefined)
curl -s https://wielegroup.com/sitemap.xml | grep -A2 "stage-1-entity-resolution"
# Expected: <loc> entry present, <lastmod> present with a real date (not absent)

# V2 — Sitemap shows non-trivial lastmod for CB#007
curl -s https://wielegroup.com/sitemap.xml | grep -A2 "stage-2-source-authority"
# Expected: <loc> and <lastmod> both present

# V3 — No regression on live routes
curl -I https://wielegroup.com/citation-brief/stage-4-freshness | head -1
curl -I https://wielegroup.com/citation-brief/stage-1-entity-resolution | head -1
curl -I https://wielegroup.com/citation-brief/stage-2-source-authority | head -1
# Expected: all HTTP/2 200
```

---

## §7 COMMIT + DEPLOY SEQUENCE

```bash
# 1. Regenerate (already done in §5 A1, but run again after any tweaks)
npm run gen:lastmod

# 2. Stage exactly two files
git add \
  scripts/gen-static-route-lastmod.mjs \
  src/lib/static-route-lastmod.generated.json

# 3. Verify diff — review before committing
git diff --cached --stat
# Expected: 2 files changed

# 4. Commit
git commit -m "fix(lastmod): Step 8.5 — citation brief MDX file resolution + CB#005/006/007 routes"

# 5. Tag
git tag phase2-step8-5-lastmod-mirror-2026-05-26

# 6. Push
git push origin main --tags

# 7. Deploy
npm run deploy:cf

# 8. Run §6 verification commands

# 9. IndexNow — no new URLs; skip unless sitemap lastmod changes warrant it
# (sitemap content changed but no new URLs — IndexNow optional)
```

---

## §8 REPORT FORMAT

```
Status: PASS / FAIL
Worker: [worker ID]
Commit: [short SHA]
Tag: phase2-step8-5-lastmod-mirror-2026-05-26
Build: Passed / Failed — [page count]
Gen lastmod warnings: none / [describe]
CB#005 lastmod: [date value from generated JSON]
CB#006 lastmod: [date value from generated JSON]
CB#007 lastmod: [date value from generated JSON]
CB#008 lastmod: [date value from generated JSON]
V1 sitemap CB#006: lastmod present / missing
V2 sitemap CB#007: lastmod present / missing
Issues: none / [describe]
```

---

## §9 ROLLBACK

```bash
git revert HEAD --no-edit
npm run gen:lastmod
git add src/lib/static-route-lastmod.generated.json
git commit -m "revert: Step 8.5 lastmod rollback"
npm run deploy:cf
```
