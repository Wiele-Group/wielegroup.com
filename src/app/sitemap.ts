import type { MetadataRoute } from "next";
import { getVisibleArticleManifest } from "@/lib/labs-static";
import { siteConfig } from "@/lib/metadata";

// Phase 7.1: explicit static export. OpenNext on Cloudflare Workers was
// re-evaluating this route at runtime in a context where fs reads fail
// silently — articles dropped from sitemap. force-static is defence-in-depth
// alongside the static manifest import (which is the actual fix).
export const dynamic = "force-static";
export const revalidate = false;

/**
 * sitemap.xml — built at compile time from a static route list + the labs
 * article manifest (src/lib/labs-static.ts). The manifest is a TS module
 * the bundler ships with the Worker; no fs access at runtime.
 *
 * Build-time validation (Zod) of MDX frontmatter still runs in
 * src/lib/labs.ts and still fails the build on invalid frontmatter —
 * the safety net is intact. This route just doesn't depend on fs.
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
    /* Agency division landing pages — v2.2 (2026-05-04). High SEO weight:
       these are the four discipline anchors of the full-service positioning. */
    { path: "/marketing-agency", priority: 0.9, changeFrequency: "monthly" },
    { path: "/advertising-agency", priority: 0.9, changeFrequency: "monthly" },
    { path: "/brand-management-agency", priority: 0.9, changeFrequency: "monthly" },
    { path: "/web-design-agency", priority: 0.9, changeFrequency: "monthly" },
    /* Client onboarding wizard — v2.2.1 sitemap-fix. Was missing from
       STATIC_ROUTES even though the route shipped in v2.0; now indexed. */
    { path: "/onboarding", priority: 0.7, changeFrequency: "monthly" },
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

  const articleEntries: MetadataRoute.Sitemap = getVisibleArticleManifest().map(
    ({ slug, lastUpdated }) => ({
      url: `${siteConfig.url}/labs/${slug}`,
      lastModified: new Date(lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...articleEntries];
}
