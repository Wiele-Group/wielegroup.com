/// <reference types="@cloudflare/workers-types" />

/**
 * Ambient declaration for the OpenNext-generated worker module
 * (`.open-next/worker.js`). The file is produced by
 * `npx opennextjs-cloudflare build` and is gitignored, so on a fresh
 * checkout (CI or new clone) tsc cannot resolve the static import in
 * cf-cache-wrapper.ts. This shim makes tsc treat the import as a
 * known module shape — wrangler resolves the real file at bundle time.
 *
 * The wildcard `*` matches any prefix path including relative
 * (`./.open-next/worker.js`) and absolute imports.
 */
declare module "*/.open-next/worker.js" {
  // Permissive signature — the OpenNext worker accepts any incoming request
  // shape from Cloudflare's runtime. Using `unknown` for env+request avoids
  // a clash between workers-types' parameterized `Request<unknown, Cf...>`
  // and DOM's plain `Request` that cf-cache-wrapper sees (because tsconfig
  // includes `lib: ["dom"]`). At bundle time wrangler resolves the real
  // module and any signature mismatch surfaces there.
  const handler: {
    fetch: (request: unknown, env: unknown, ctx: unknown) => Promise<Response>;
  };
  export default handler;
  // The OpenNext-generated worker re-exports three Durable Object classes.
  // We don't need them typed here — they're passed straight through to
  // wrangler's class binding resolver. `unknown` is safer than `any`.
  export const DOQueueHandler: unknown;
  export const DOShardedTagCache: unknown;
  export const BucketCachePurge: unknown;
}
