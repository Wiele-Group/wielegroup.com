import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

/**
 * robots.txt — allow all reputable crawlers including AI crawlers
 * (OAI-SearchBot, PerplexityBot, ClaudeBot, Claude-Web, Googlebot-Extended).
 *
 * Disallow only the always-private surfaces (/api/* in Phase 5).
 * Sitemap and llms.txt are referenced explicitly so crawlers find them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
