/// <reference types="@cloudflare/workers-types" />

// DOM's lib.dom.d.ts declares `CacheStorage` without `.default`; Cloudflare's
// workers-types adds `readonly default: Cache` to the same interface, but the
// DOM declaration wins because tsconfig has `lib: ["dom"]`. Augmenting the
// global here is the narrowest fix — preserves DOM types for the rest of
// the codebase while letting this single file see `caches.default`.
declare global {
  interface CacheStorage {
    readonly default: Cache;
  }
}

/**
 * cf-cache-wrapper.ts — Cloudflare Worker entry that wraps OpenNext's
 * generated `.open-next/worker.js` with an explicit Cloudflare Cache API
 * layer (`caches.default`) for prerendered HTML responses.
 *
 * Why this exists (v3.9.0-xray-supersweep, 2026-05-13):
 *   Pre-fix: Cloudflare's zone-level cache does NOT cache HTML by default,
 *   so every HTML response missed the edge. `x-nextjs-cache: MISS` +
 *   no `cf-cache-status` header at all on `/`, `/audit`, `/pricing`, etc.
 *   Worker re-rendered React on every request.
 *
 *   Post-fix: This wrapper checks `caches.default` for cacheable HTML GETs
 *   first. On HIT, Cloudflare auto-stamps `cf-cache-status: HIT` and the
 *   OpenNext server is bypassed entirely. On MISS, the OpenNext handler
 *   runs, the response is written to the regional cache (via waitUntil),
 *   and the next request from the same data centre HITs.
 *
 * What we cache (allow-list, conservative):
 *   - GET requests only (HEAD also pass-through)
 *   - Status 200 responses with content-type text/html
 *   - x-nextjs-prerender: 1 (OpenNext flags pages that are prerendered ISR;
 *     dynamic routes don't carry this header)
 *   - No request cookies (anonymous navigation only)
 *   - No `_rsc` / `rsc` query parameter (RSC streams must stay dynamic)
 *
 * What we exclude (deny-list, defense in depth even if the allow-list catches it):
 *   - /api/*               (Resend, Turnstile, audit submit — never cache)
 *   - /onboarding          (form intake, may set Set-Cookie in future)
 *   - /_next/data          (data routes — Next 16 internal)
 *   - /_next/image         (image optimisation cache lives elsewhere)
 *   - /__nextjs_*          (dev/diagnostic routes)
 *
 * Cache-Control on cached responses:
 *   `public, max-age=0, s-maxage=300, stale-while-revalidate=86400`
 *   - max-age=0 keeps browser revalidating (so editorial changes aren't
 *     trapped in users' browser caches)
 *   - s-maxage=300 lets CF serve from edge for 5 min
 *   - stale-while-revalidate=86400 lets CF serve stale up to 24h while
 *     refreshing in background
 *
 * Diagnostic header `x-edge-cache: HIT | MISS | BYPASS` is also set on
 * every response so verification curls can grep regardless of CF's own
 * `cf-cache-status` plan-tier visibility.
 */

// The OpenNext-generated worker entry. Path is resolved at wrangler build
// time. The directory is gitignored (`.open-next/`) so this file does not
// exist at git-status check time — it's produced by `opennextjs-cloudflare
// build` in the deploy script before wrangler bundling.
// `@ts-ignore` (not `@ts-expect-error`) because `.open-next/worker.js`
// exists locally between builds but is gitignored — on a fresh CI checkout
// before `opennextjs-cloudflare build` runs, tsc would fail to resolve it.
// `@ts-ignore` tolerates both states; `@ts-expect-error` would error when
// the module IS resolvable. ESLint's ban-ts-comment is suppressed inline
// for the same reason.
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore generated module, resolved at bundle time
import opennextWorker, {
  // @ts-ignore generated re-exports — Durable Object class bindings
  DOQueueHandler,
  // @ts-ignore generated re-exports — Durable Object class bindings
  DOShardedTagCache,
  // @ts-ignore generated re-exports — Durable Object class bindings
  BucketCachePurge,
} from "./.open-next/worker.js";
/* eslint-enable @typescript-eslint/ban-ts-comment */

// Re-export Durable Object classes so wrangler bindings continue to resolve
// against the same class names as before this wrapper was introduced.
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge };

const NO_CACHE_PATH_PREFIXES = [
  "/api/",
  "/onboarding",
  "/_next/data",
  "/_next/image",
  "/__nextjs_",
] as const;

const NO_CACHE_QUERY_PARAMS = ["_rsc", "rsc"] as const;

function isCacheableRequest(request: Request): boolean {
  if (request.method !== "GET") return false;

  const url = new URL(request.url);

  for (const prefix of NO_CACHE_PATH_PREFIXES) {
    if (url.pathname.startsWith(prefix)) return false;
  }

  for (const param of NO_CACHE_QUERY_PARAMS) {
    if (url.searchParams.has(param)) return false;
  }

  // Anonymous navigation only — any cookie skips cache. Marketing site
  // doesn't set first-party cookies on prerendered routes; this guard
  // future-proofs against accidental session/auth cookies appearing later.
  if (request.headers.has("cookie")) return false;

  return true;
}

function isCacheableResponse(response: Response): boolean {
  if (response.status !== 200) return false;

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return false;

  // OpenNext flags prerendered ISR pages with this header. Dynamic SSR
  // routes (Server Action results, form intake responses) don't carry it.
  if (response.headers.get("x-nextjs-prerender") !== "1") return false;

  // Defense in depth — never cache anything that set a cookie
  if (response.headers.has("set-cookie")) return false;

  return true;
}

function stampCacheStatus(response: Response, status: "HIT" | "MISS" | "BYPASS"): Response {
  const headers = new Headers(response.headers);
  headers.set("x-edge-cache", status);
  if (status !== "BYPASS") {
    headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    );
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

interface OpenNextEnv {
  [key: string]: unknown;
}

const handler = {
  async fetch(
    request: Request,
    env: OpenNextEnv,
    ctx: ExecutionContext,
  ): Promise<Response> {
    if (!isCacheableRequest(request)) {
      const response = await opennextWorker.fetch(request, env, ctx);
      return stampCacheStatus(response, "BYPASS");
    }

    const cache = caches.default;
    // Cache key: canonicalise to the URL only (no headers, no cookies — we
    // already filtered cookie-bearing requests upstream)
    const cacheKey = new Request(new URL(request.url).toString(), {
      method: "GET",
      headers: new Headers({ accept: "text/html" }),
    });

    const hit = await cache.match(cacheKey);
    if (hit) {
      return stampCacheStatus(hit, "HIT");
    }

    const fresh = await opennextWorker.fetch(request, env, ctx);

    if (!isCacheableResponse(fresh)) {
      return stampCacheStatus(fresh, "BYPASS");
    }

    const stamped = stampCacheStatus(fresh, "MISS");
    // Cache the stamped copy (with public/s-maxage Cache-Control) so the
    // edge respects the TTL we want, not OpenNext's original s-maxage=60.
    ctx.waitUntil(cache.put(cacheKey, stamped.clone()));
    return stamped;
  },
};

export default handler;
