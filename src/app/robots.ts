import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

/**
 * robots.txt — allow all reputable crawlers including AI crawlers.
 *
 * v3.8.0 (2026-05-10) — XRAY restoration. Comment-only AI-crawler welcome
 * was promoted to explicit per-bot allow rules. Some AI crawlers ignore
 * universal-* groups when checking for explicit identity rules; explicit
 * allows make AEO/GEO posture unambiguous.
 *
 * Disallow only the always-private surfaces (/api/*).
 * Sitemap and host are referenced explicitly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Universal default
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicit AI bot welcome (per AEO/GEO doctrine)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
