/**
 * Static article manifest — hand-maintained, bundled into every build.
 *
 * Why this exists:
 * `src/lib/labs.ts` reads `src/content/labs/*.mdx` from disk via fs.readdirSync
 * at build time. That works for `npm run build` (Next.js Node runtime) and for
 * `/labs/[slug]` static page generation (also build-time). But OpenNext on
 * Cloudflare Workers re-evaluates `app/sitemap.ts` at runtime in a context
 * where the MDX content files aren't in the bundle's filesystem — fs reads
 * silently return empty, sitemap drops to 14 URLs.
 *
 * Phase 7.1 evidence: local sitemap.xml.body had 17 URLs; production
 * /sitemap.xml on the Workers deploy returned 14. The 3 missing entries were
 * the labs articles.
 *
 * The fix: encode the article identity layer as a TS module the bundler
 * tree-shakes and ships. Frontmatter validation in `src/lib/labs.ts` still
 * runs at build time and STILL fails the build if any MDX has invalid
 * frontmatter — that safety net is intact. This module is just the
 * runtime-safe slug + lastUpdated index for the sitemap.
 *
 * Adding a new article:
 *   1. Drop the .mdx into src/content/labs/
 *   2. Add an entry to ARTICLE_MANIFEST below
 *   3. Build will fail loudly if frontmatter doesn't match Zod schema
 *
 * Removing an article:
 *   1. Delete the .mdx
 *   2. Remove the entry below (or set hidden: true)
 */

export type ArticleManifestEntry = {
  slug: string;
  /** ISO date YYYY-MM-DD — matches the frontmatter `lastUpdated` value. */
  lastUpdated: string;
  /** Mirrors frontmatter `hidden: true` — exclude from sitemap + index. */
  hidden?: boolean;
};

export const ARTICLE_MANIFEST: readonly ArticleManifestEntry[] = [
  { slug: "ai-recommendations-compound", lastUpdated: "2026-05-03" },
  { slug: "five-citation-signals", lastUpdated: "2026-05-03" },
  { slug: "search-is-splitting", lastUpdated: "2026-05-03" },
];

export function getVisibleArticleManifest(): readonly ArticleManifestEntry[] {
  return ARTICLE_MANIFEST.filter((a) => !a.hidden);
}
