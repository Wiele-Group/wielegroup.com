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
   * TODO(2026-08-03): Phase 7 task — remove this entire redirects() block
   * IF AND ONLY IF Google Search Console + Plausible referrer data confirm
   * zero traffic to /services/*, /work, /journal in the prior 30 days.
   * Code that auto-deletes itself in 90 days is a footgun; keep the
   * removal a deliberate human action with verification first.
   */
  async redirects() {
    return [
      { source: "/services/seo", destination: "/systems/search", permanent: true },
      { source: "/services/aeo", destination: "/systems/ai-visibility", permanent: true },
      { source: "/services/geo", destination: "/systems/ai-visibility", permanent: true },
      { source: "/services/marketing", destination: "/systems/brand-authority", permanent: true },
      { source: "/services/advertising", destination: "/systems/brand-authority", permanent: true },
      { source: "/services/web-design", destination: "/systems/web-experience", permanent: true },
      { source: "/services", destination: "/systems", permanent: true },
      { source: "/work", destination: "/proof", permanent: true },
      { source: "/journal", destination: "/labs", permanent: true },
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
