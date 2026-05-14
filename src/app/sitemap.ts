import type { MetadataRoute } from "next";
import { getVisibleCaseStudyManifest } from "@/lib/case-studies-static";
import { getVisibleArticleManifest } from "@/lib/labs-static";
import { siteConfig } from "@/lib/metadata";
// v3.9.0-xray-supersweep (2026-05-13) — per-route lastmod baked at build
// time by scripts/gen-static-route-lastmod.mjs from git log committer date.
// Was previously `new Date()` evaluated per fetch (OpenNext on Cloudflare
// re-evaluates this route despite force-static), which burned the lastmod
// signal — search engines saw constant churn and discounted it.
import staticRouteLastMod from "@/lib/static-route-lastmod.generated.json";

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
    /* Productized service offers — v3.1 (2026-05-07). Premium Brand Site
       System is the WDA flagship SKU: token-first builds, 5-mode delivery,
       AI revision credits, contractual CWV SLA. High SEO weight — anchor
       page for premium brand site search intent. */
    { path: "/services/premium-brand-site-system", priority: 0.9, changeFrequency: "monthly" },
    /* v3.3 (2026-05-08) — AI Visibility Monitoring retainer.
       First recurring monitoring SKU. Anchor for AI-search monitoring buyer
       intent. Same priority as PBSS (commercial-investigation surface). */
    { path: "/services/ai-visibility-monitoring", priority: 0.9, changeFrequency: "monthly" },
    /* v3.9.0 (2026-05-11) — Print Production standalone offering.
       Vertical-integration revenue stream, embedded in Brand Growth tier.
       Commercial-conversion surface. */
    { path: "/services/print-production", priority: 0.85, changeFrequency: "monthly" },
    /* Client onboarding wizard — v2.2.1 sitemap-fix. Was missing from
       STATIC_ROUTES even though the route shipped in v2.0; now indexed. */
    { path: "/onboarding", priority: 0.7, changeFrequency: "monthly" },
    { path: "/proof", priority: 0.8, changeFrequency: "monthly" },
    /* v3.9.2 (2026-05-13) — Google's Own Proof. Sales-conversion artefact
       built from the 162-page Google Search Central doctrine sweep. 12
       Google-published case studies + 8 verbatim killed-tactic quotes.
       High priority (0.85) — doctrine anchor + outreach-link surface. */
    { path: "/proof/google", priority: 0.85, changeFrequency: "monthly" },
    { path: "/labs", priority: 0.8, changeFrequency: "weekly" },
    /* v3.9.3 (2026-05-14) — Citation Briefs index. Productized Tier-1 play
       from the 2026-05-14 Advertising Canon intake. Each brief is an
       extractable, schema-marked AEO field guide. High priority (0.85) —
       primary citation-bait surface, AI-extraction-tuned. */
    { path: "/citation-brief", priority: 0.85, changeFrequency: "weekly" },
    {
      path: "/citation-brief/how-agencies-get-cited-in-ai-answers",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    { path: "/trust", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    /* Legal — v2.4 holes-plugged (2026-05-05). /privacy + /terms shipped
       substantive copy; noindex removed; safe and useful to index. */
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  // v3.9.1a — the `__build` field was removed from the generated JSON to
  // stop every build from dirtying git. For any route that doesn't have a
  // per-route entry (would only happen if STATIC_ROUTES is edited without
  // re-running `npm run gen:lastmod`), emit no lastModified rather than
  // a fake timestamp — Next's MetadataRoute.Sitemap permits the field to
  // be undefined, and search engines treat absence as "no information"
  // which is the correct signal vs. a misleading constant.
  const lookup = staticRouteLastMod as Record<string, string>;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => {
    const ts = lookup[r.path];
    return {
      url: `${siteConfig.url}${r.path}`,
      lastModified: ts ? new Date(ts) : undefined,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    };
  });

  const articleEntries: MetadataRoute.Sitemap = getVisibleArticleManifest().map(
    ({ slug, lastUpdated }) => ({
      url: `${siteConfig.url}/labs/${slug}`,
      lastModified: new Date(lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  // v3.2 — case-study anchors. Mirrors the /labs enumeration pattern.
  // High priority (0.85) — engagement archetypes are commercial-conversion
  // surfaces, weighted between programme catalogue (0.8) and agency
  // division pages (0.9).
  const caseStudyEntries: MetadataRoute.Sitemap = getVisibleCaseStudyManifest().map(
    ({ slug, lastUpdated }) => ({
      url: `${siteConfig.url}/proof/${slug}`,
      lastModified: new Date(lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }),
  );

  return [...staticEntries, ...articleEntries, ...caseStudyEntries];
}
