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
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
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
   * Remove this block ~90 days post-cutover once Search Console + analytics
   * confirm the legacy URLs no longer drive traffic.
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
