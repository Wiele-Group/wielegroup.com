import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/labs";
import { siteConfig } from "@/lib/metadata";

/**
 * sitemap.xml — built at compile time from a static route list + the labs
 * filesystem. Hidden articles (`hidden: true` in frontmatter) are filtered
 * out by getAllArticles() before they reach this file.
 *
 * Same pattern as selectFixture(date): pure function, build-time evaluated,
 * no runtime surprises (founder reinforcement #5 from Phase 4 brief).
 */

type Priority = number;
type Frequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const STATIC_ROUTES: { path: string; priority: Priority; changeFrequency: Frequency }[] =
  [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/audit", priority: 0.95, changeFrequency: "monthly" },
    { path: "/platform", priority: 0.9, changeFrequency: "monthly" },
    { path: "/systems", priority: 0.9, changeFrequency: "monthly" },
    { path: "/systems/ai-visibility", priority: 0.9, changeFrequency: "monthly" },
    { path: "/systems/search", priority: 0.85, changeFrequency: "monthly" },
    { path: "/systems/brand-authority", priority: 0.85, changeFrequency: "monthly" },
    { path: "/systems/web-experience", priority: 0.85, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/proof", priority: 0.8, changeFrequency: "monthly" },
    { path: "/labs", priority: 0.8, changeFrequency: "weekly" },
    { path: "/trust", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: article.url,
    lastModified: new Date(article.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
