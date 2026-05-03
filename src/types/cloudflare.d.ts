/**
 * Minimal shape declaration for @cloudflare/next-on-pages.
 *
 * The package isn't installed yet — the kv.ts module uses dynamic
 * `import().catch(() => null)` so its absence at runtime falls back
 * to the in-memory KV. This declaration lets TypeScript compile
 * without the package being installed.
 *
 * When Cloudflare Pages deployment lands (Phase 6), install the real
 * package and remove this file — the actual types take over.
 */
declare module "@cloudflare/next-on-pages" {
  export function getRequestContext(): {
    env: Record<string, unknown>;
    cf: unknown;
    ctx: unknown;
  } | null;
}
