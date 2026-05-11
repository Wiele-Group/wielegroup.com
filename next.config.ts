import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  /**
   * MDX files live under src/content/labs/ and are imported by the article
   * route. We do NOT add "mdx" to pageExtensions — keeps MDX off the
   * filesystem-routing path and away from accidental URL exposure.
   */
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Phase 7.2: HSTS + CSP added so SSR/ISR routes get them too.
          // public/_headers (Workers Static Assets) only applies to static
          // files (/llms.txt, /favicon.ico, /fonts/*, /brand/*). The OpenNext
          // server handler serves SSR routes (/, /audit, etc.) — those need
          // headers from next.config.ts to be set.
          //
          // Note: Cloudflare Workers strips HSTS from workers.dev responses
          // (asserting HSTS for *.workers.dev would lock every Worker on the
          // platform). HSTS will fire correctly on the custom domain
          // wielegroup.com once attached (Phase 7.2 founder action).
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' https://plausible.io https://challenges.cloudflare.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https:; " +
              "font-src 'self'; " +
              "connect-src 'self' https://plausible.io https://challenges.cloudflare.com; " +
              "frame-src https://challenges.cloudflare.com; " +
              "frame-ancestors 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "object-src 'none'",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  /**
   * Phase 3 IA cutover — 9 permanent redirects from legacy IA to new IA.
   * Authority: directive §6 Phase 3 + memory/feedback_cutover_discipline.md.
   *
   * v3.0.3 (2026-05-06) — appended 15 redirects for retired pre-v2.0
   * Monolith URLs flagged by Google Search Console as 404. Specific paths
   * are listed BEFORE catch-alls so the existing /services/* specific
   * rules above win over the new /services/:path* catch-all (Next.js
   * matches the first rule in source order).
   *
   * v3.8.0 (2026-05-10) — XRAY L99 restoration. Two additions:
   *   1. www.wielegroup.com → wielegroup.com host catch-all (apex canonical
   *      lock; resolves GSC 24-page "alternate canonical" duplication).
   *   2. ~25 legacy URL redirects from XRAY 404 list (engagement archetypes,
   *      i18n stubs, retired campaign URLs).
   * The host catch-all is first; path matching runs after host normalization.
   *
   * TODO(2026-08-03): Phase 7 task — remove the Phase 3 IA cutover block
   * IF AND ONLY IF Google Search Console + Plausible referrer data confirm
   * zero traffic to /services/*, /work, /journal in the prior 30 days.
   * The v3.0.3 Monolith block can be reviewed for removal in 2027 once
   * GSC confirms zero crawl attempts on those paths for 12 months.
   */
  async redirects() {
    return [
      // v3.8.0 — APEX CANONICAL LOCK. Host-based redirects run FIRST so
      // www.wielegroup.com/<anything> normalizes to wielegroup.com/<anything>
      // before any path-specific rule below matches.
      //
      // Bug: Next.js / OpenNext leaves the literal `:path*` placeholder in
      // the destination when the source captures empty (the bare `/`).
      // Workaround: split into an exact-match `/` rule + a one-or-more
      // wildcard, so the root request gets a hardcoded destination and
      // the wildcard's `:path*` always has at least one segment to expand.
      {
        source: "/",
        has: [{ type: "host", value: "www.wielegroup.com" }],
        destination: "https://wielegroup.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.wielegroup.com" }],
        destination: "https://wielegroup.com/:path+",
        permanent: true,
      },

      // Phase 3 IA cutover — preserved
      { source: "/services/seo", destination: "/systems/search", permanent: true },
      { source: "/services/aeo", destination: "/systems/ai-visibility", permanent: true },
      { source: "/services/geo", destination: "/systems/ai-visibility", permanent: true },
      { source: "/services/marketing", destination: "/systems/brand-authority", permanent: true },
      { source: "/services/advertising", destination: "/systems/brand-authority", permanent: true },
      { source: "/services/web-design", destination: "/systems/web-experience", permanent: true },
      { source: "/services", destination: "/systems", permanent: true },
      { source: "/work", destination: "/proof", permanent: true },
      { source: "/journal", destination: "/labs", permanent: true },

      // v3.0.3 Monolith retirement — specific paths
      { source: "/engines/answer-engineering", destination: "/systems/ai-visibility", permanent: true },
      { source: "/engines/citation-ledger", destination: "/labs/five-citation-signals", permanent: true },
      { source: "/engines/proof.html", destination: "/proof", permanent: true },
      { source: "/work.html", destination: "/proof", permanent: true },
      { source: "/journal/citation-ledger-q2-2026", destination: "/labs/five-citation-signals", permanent: true },
      { source: "/chatgpt-seo", destination: "/audit", permanent: true },
      { source: "/claude-seo", destination: "/audit", permanent: true },
      { source: "/imprint", destination: "/privacy", permanent: true },
      { source: "/enterprise/portal.html", destination: "/pricing", permanent: true },
      { source: "/es", destination: "/", permanent: true },

      // v3.5.2 (2026-05-09) — SUPERSWEEP fix #4: legacy SEO-equity recovery.
      // 15 paths confirmed 404ing via live curl 2026-05-09 SUPERSWEEP.
      // Some (/method, /founder) were in the v1 wiele-edge-seo sitemap =
      // high-probability past-indexed paths. Others are standard agency
      // URL patterns external sites would naturally link to.
      // Specific paths only — no catch-alls in this block.
      { source: "/blog", destination: "/labs", permanent: true },
      { source: "/case-studies", destination: "/proof", permanent: true },
      { source: "/portfolio", destination: "/proof", permanent: true },
      { source: "/our-work", destination: "/proof", permanent: true },
      { source: "/our-services", destination: "/systems", permanent: true },
      { source: "/resources", destination: "/labs", permanent: true },
      { source: "/digital-marketing", destination: "/systems", permanent: true },
      { source: "/brand-strategy", destination: "/systems/brand-authority", permanent: true },
      { source: "/seo", destination: "/systems/search", permanent: true },
      { source: "/content", destination: "/systems", permanent: true },
      { source: "/ppc", destination: "/advertising-agency", permanent: true },
      { source: "/strategy", destination: "/systems", permanent: true },
      { source: "/agency", destination: "/systems", permanent: true },
      { source: "/method", destination: "/systems", permanent: true },
      { source: "/founder", destination: "/about", permanent: true },

      // v3.8.0 (2026-05-10) — XRAY L99 legacy-URL recovery.
      // 70 paths surfaced by GSC "Not found (404)" on 2026-05-10.
      // Specifics first so wildcards below don't swallow them. Where a
      // directive-specified destination conflicted with a prior commercial
      // routing (/chatgpt-seo → /audit, /imprint → /privacy), the prior
      // routing is preserved per "fix-forward, never reopen" discipline.
      // Conflicts surfaced in v3.8.0 report-back for founder review.

      // Legacy product divisions
      { source: "/enterprise", destination: "/pricing#sovereign", permanent: true },
      { source: "/catalyst", destination: "/pricing", permanent: true },
      { source: "/sovereign", destination: "/pricing#sovereign", permanent: true },

      // Legacy services (different prefix from /services/*)
      { source: "/service-seo", destination: "/systems/search", permanent: true },
      { source: "/service-geo", destination: "/systems/ai-visibility", permanent: true },
      { source: "/service-ledger", destination: "/systems", permanent: true },
      { source: "/services/authority", destination: "/systems/brand-authority", permanent: true },

      // Engines (specific) → platform; existing /engines/answer-engineering
      // and /engines/citation-ledger above still win due to source order.
      { source: "/engines", destination: "/platform", permanent: true },

      // Anonymised engagement archetypes — directly to /proof
      // (avoids 2-hop via /case-studies → /proof)
      { source: "/case-obelisk", destination: "/proof", permanent: true },
      { source: "/case-verdant", destination: "/proof", permanent: true },
      { source: "/case-northward-coe.html", destination: "/proof", permanent: true },

      // Legacy AI-search content paths (preserve existing /chatgpt-seo, /claude-seo above)
      { source: "/state-of-ai-search", destination: "/labs", permanent: true },
      { source: "/best-geo-agencies-2026", destination: "/labs", permanent: true },
      { source: "/chatgpt-seo-vs-traditional-seo", destination: "/labs", permanent: true },
      { source: "/ai-search-seo", destination: "/labs", permanent: true },
      { source: "/geo", destination: "/systems/ai-visibility", permanent: true },

      // Contact unification — book-a-call → diagnostic offer
      { source: "/book-a-call", destination: "/audit", permanent: true },

      // i18n stubs (existing /es, /es/:path* preserved below; /fr/de/nl/en new)
      { source: "/fr", destination: "/", permanent: true },
      { source: "/de", destination: "/", permanent: true },
      { source: "/nl", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: true },

      // v3.0.3 Monolith retirement — catch-alls (must be last so specific rules win)
      // v3.8.0 — /engines/:path* destination updated /systems → /platform per XRAY directive.
      { source: "/engines/:path*", destination: "/platform", permanent: true },
      { source: "/journal/:path*", destination: "/labs", permanent: true },
      { source: "/enterprise/:path*", destination: "/pricing", permanent: true },
      { source: "/es/:path*", destination: "/", permanent: true },
      // v3.8.0 — additional legacy wildcards
      { source: "/catalyst/:path*", destination: "/pricing", permanent: true },
      { source: "/sovereign/:path*", destination: "/pricing#sovereign", permanent: true },
      { source: "/blog/:path*", destination: "/labs", permanent: true },
      { source: "/essay/:path*", destination: "/proof", permanent: true },
      { source: "/fr/:path*", destination: "/", permanent: true },
      { source: "/de/:path*", destination: "/", permanent: true },
      { source: "/nl/:path*", destination: "/", permanent: true },
      // v3.1 (2026-05-07) — negative-lookahead carve-out so live productized
      // SKU pages are not swallowed by the Monolith catch-all.
      // v3.3 (2026-05-08) — added ai-visibility-monitoring carve-out.
      // v3.9.0 (2026-05-11) — added print-production carve-out.
      // New /services/* SKUs must be appended to the negative-lookahead
      // alternation below (pipe-separated, anchored with $).
      { source: "/services/:slug((?!premium-brand-site-system|ai-visibility-monitoring$|print-production$).+)", destination: "/systems", permanent: true },
    ];
  },
};

/**
 * MDX wrapper. Plugins are passed as string identifiers because Turbopack
 * (Next 16 default) requires loader options to be JSON-serialisable across
 * the worker boundary — function references won't pass through.
 *
 * Heading slugification is already handled by mdx-components.tsx slugify(),
 * so rehype-slug isn't strictly required for anchor links to work; kept
 * here for crawler-friendly id attributes if/when re-enabled.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}]],
  },
});

export default withMDX(nextConfig);
