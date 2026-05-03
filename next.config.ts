import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
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
   * `permanent: true` returns HTTP 308 (preserves request method) and signals
   * to crawlers + Search Console that the move is canonical, not temporary.
   *
   * Map (binding):
   *   /services                 → /systems
   *   /services/seo             → /systems/search
   *   /services/aeo             → /systems/ai-visibility
   *   /services/geo             → /systems/ai-visibility
   *   /services/marketing       → /systems/brand-authority
   *   /services/advertising     → /systems/brand-authority
   *   /services/web-design      → /systems/web-experience
   *   /work                     → /proof
   *   /journal                  → /labs
   *
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

export default nextConfig;
