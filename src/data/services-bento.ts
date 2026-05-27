/**
 * Services Bento data — drives the BentoSystem section on the homepage
 * (Phase 3 upgrade: Bento Services / Wiele OS).
 *
 * Layout (3-column desktop bento):
 *   Row 1: [AI Search — 2 cols, FEATURED] [Brand Management]
 *   Row 2: [Marketing] [Web Design] [Advertising]
 *   Row 3: [SEO — 2 cols] [Query Ecosystems signal]
 *   Row 4: [WIELE OS — full width anchor card]
 *
 * Col-span classes are Tailwind-responsive strings applied directly to
 * the FadeIn motion.div wrapper (the actual grid item) so CSS grid
 * col-span resolves correctly.
 *
 * Separate from systems.ts, which drives /systems/* detail pages and
 * RelatedSystems widgets in labs/proof routes — do not merge.
 */

export type ServiceBentoEntry = {
  id: string;
  /** "service" = agency discipline  |  "signal" = capability tile  |  "os" = platform anchor */
  type: "service" | "signal" | "os";
  title: string;
  /** Badge label — eyebrow above title */
  eyebrow: string;
  headline: string;
  body: string;
  tags: readonly string[];
  href: string | null;
  /**
   * Responsive Tailwind col-span classes applied to the grid-item wrapper.
   * Empty string = no extra classes (single column).
   */
  colSpan: string;
  /** Matches glass-strip variant naming in globals.css / card.tsx */
  stripVariant: "default" | "neon" | "pulse" | "coral" | "duality";
};

export const servicesBento: readonly ServiceBentoEntry[] = [
  {
    id: "ai-search",
    type: "service",
    title: "AI Search Optimization",
    eyebrow: "GEO · AEO",
    headline: "Engineered for the answer economy.",
    body: "Citation engineering across ChatGPT, Gemini, Perplexity, Claude, Copilot, and AI Overviews. Entity authority, extractable answer assets, and recommendation visibility — built to compound month over month.",
    tags: ["GEO", "AEO", "Citation Engineering", "Entity Authority"],
    href: "/systems/ai-visibility",
    colSpan: "md:col-span-2",
    stripVariant: "duality",
  },
  {
    id: "brand",
    type: "service",
    title: "Brand Management",
    eyebrow: "Service",
    headline: "Premium identity. Strategic narrative. Compounding equity.",
    body: "Positioning, identity systems, and narrative architecture for firms competing on perception, trust, and authority.",
    tags: ["Positioning", "Identity", "Narrative"],
    href: "/brand-management-agency",
    colSpan: "",
    stripVariant: "default",
  },
  {
    id: "marketing",
    type: "service",
    title: "Marketing",
    eyebrow: "Service",
    headline: "Marketing as an operating system, not a campaign list.",
    body: "Strategy, audience, content, lifecycle, and ops — engineered as one engine where every channel compounds the others.",
    tags: ["Strategy", "Content", "Lifecycle"],
    href: "/marketing-agency",
    colSpan: "",
    stripVariant: "default",
  },
  {
    id: "web",
    type: "service",
    title: "Web Design",
    eyebrow: "Service",
    headline: "Conversion-engineered digital experiences.",
    body: "Premium website systems built around UX strategy, design tokens, performance, and AI-extractable structure — fast, beautiful, built to convert.",
    tags: ["UX Strategy", "Design Systems", "Performance"],
    href: "/web-design-agency",
    colSpan: "",
    stripVariant: "default",
  },
  {
    id: "advertising",
    type: "service",
    title: "Advertising",
    eyebrow: "Service",
    headline: "Performance media with the craft of a brand agency.",
    body: "Full-funnel paid media across Google, Meta, LinkedIn, and emerging surfaces. Creative systems, attribution, and pacing that turn spend into revenue.",
    tags: ["Paid Media", "Attribution", "Scaling"],
    href: "/advertising-agency",
    colSpan: "",
    stripVariant: "default",
  },
  {
    id: "seo",
    type: "service",
    title: "SEO Services",
    eyebrow: "Service",
    headline: "Technical SEO. Content systems. Search authority.",
    body: "Audits, technical foundations, content architecture, link strategy, and entity-level authority engineering. The classical search engine still drives compounding pipeline.",
    tags: ["Technical SEO", "Content Architecture", "Schema"],
    href: "/systems/search",
    colSpan: "lg:col-span-2",
    stripVariant: "default",
  },
  {
    id: "signal-query",
    type: "signal",
    title: "Query Ecosystems",
    eyebrow: "Signal layer",
    headline: "Map and own the query surface.",
    body: "Every buyer prompt is a touchpoint. We map the full query ecosystem and engineer conversion pathways from search to recommendation to revenue.",
    tags: ["Query Ecosystems", "Conversion Pathways", "Prompt Surface"],
    href: null,
    colSpan: "",
    stripVariant: "coral",
  },
  {
    id: "wiele-os",
    type: "os",
    title: "WIELE OS",
    eyebrow: "Platform",
    headline: "A connected operating system for brand, web, search, advertising, and AI visibility.",
    body: "Designed so every digital asset compounds toward authority, attribution, and revenue.",
    tags: ["Integrated", "Compounding", "Full-stack"],
    href: "/platform",
    colSpan: "col-span-full",
    stripVariant: "duality",
  },
] as const;
