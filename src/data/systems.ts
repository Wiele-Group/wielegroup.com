/**
 * Systems data — drives the BentoSystem section on the homepage and the
 * /systems IA in Phase 3. Each system has a homepage card + a /systems/<slug>
 * detail page (Phase 3).
 */

export type SystemEntry = {
  id: string;
  /** Route slug under /systems/. Null = lives at /platform (Wiele OS itself). */
  slug: string | null;
  /** Card title. */
  title: string;
  /** One-line bento headline. */
  headline: string;
  /** Card body copy. */
  description: string;
  /** Span on the desktop bento grid. Used by BentoSystem. */
  span?: "1x1" | "2x1" | "1x2" | "2x2";
};

export const systems: readonly SystemEntry[] = [
  {
    id: "ai-visibility",
    slug: "ai-visibility",
    title: "AI Visibility",
    headline: "Map and lift your presence across ChatGPT, Perplexity, Gemini, Copilot.",
    description:
      "Diagnose every prompt your buyer asks. Engineer the citations, comparisons, and entity signals that put you in the answer.",
    span: "2x1",
  },
  {
    id: "search",
    slug: "search",
    title: "Search Authority",
    headline: "Win classical SERPs with technical, on-page, and link-graph engineering.",
    description:
      "Core Web Vitals, schema, content hubs, and authority backlinks — the foundation that compounds before AI engines crawl you.",
    span: "1x1",
  },
  {
    id: "brand-authority",
    slug: "brand-authority",
    title: "Brand Authority",
    headline: "Build the entity, founder, and citation layer AI engines quote.",
    description:
      "Founder narrative, knowledge-graph entities, and editorial-grade thought leadership that becomes the source LLMs cite.",
    span: "1x1",
  },
  {
    id: "web-experience",
    slug: "web-experience",
    title: "Web Experience",
    headline: "Conversion-grade pages that speak to humans and machines fluently.",
    description:
      "Production-grade design systems, AI-extractable content, and conversion architecture — built for speed, accessibility, and citation readiness.",
    span: "1x1",
  },
  {
    id: "revenue-intelligence",
    slug: null,
    title: "Revenue Intelligence",
    headline: "Attribution that ties AI-cited demand back to closed-won pipeline.",
    description:
      "Multi-touch attribution across AI referrals, classical search, and direct demand. Visibility that converts to revenue, not vanity metrics.",
    span: "1x1",
  },
  {
    id: "wiele-os",
    slug: null,
    title: "Wiele OS",
    headline: "The integrated platform that runs all five systems on one engine.",
    description:
      "Continuous AI-visibility tracking, authority engineering, and growth orchestration — one platform, one strategist team, one compounding asset.",
    span: "2x1",
  },
];
