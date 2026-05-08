import type { TocEntry } from "./labs-toc";

/**
 * Static case-study manifest — hand-maintained, bundled into every build.
 *
 * Authority: V3-2-CASE-STUDIES-DIRECTIVE.md (2026-05-08).
 *
 * Mirrors src/lib/labs-static.ts exactly. Same OpenNext-safety pattern as
 * /labs/[slug]: dynamic MDX imports + fs reads fail silently in the
 * Cloudflare Workers runtime, so the [slug] page renders from this static
 * TS manifest plus explicit MDX imports. See labs-static.ts for the full
 * Phase 7.4 history of why this is load-bearing.
 *
 * Adding a new case study:
 *   1. Drop the .mdx into src/content/case-studies/
 *   2. Add a static import in src/app/proof/[slug]/page.tsx
 *   3. Add an entry to CASE_STUDY_MANIFEST below — must match the .mdx
 *      frontmatter exactly
 *   4. Add the slug to CASE_STUDY_TOC if you want a TOC sidebar
 *
 * Anonymisation discipline: until named-client wins close and clients
 * agree to public framing in writing, anchors are presented as engagement
 * archetypes (anonymised: true). Methodology is real, engine outputs are
 * real engine runs against archetype prompt panels — the standard
 * documented on /proof.
 */

export type CaseStudyTier = "Foundation" | "Authority" | "Sovereign";

export type CaseStudyMetric = {
  label: string;
  before: string;
  after: string;
  window: string;
};

export type CaseStudyFaq = {
  question: string;
  answer: string;
};

export type CaseStudyRelatedSystemSlug =
  | "ai-visibility"
  | "search"
  | "brand-authority"
  | "web-experience";

export type CaseStudyManifestEntry = {
  slug: string;
  title: string;
  summary: string;
  tier: CaseStudyTier;
  /** Display label for the tier price + cadence (e.g. "£18,000 fixed-fee · 6-week sprint"). */
  tierPriceLabel: string;
  /** Sector category — not enforced as enum; manifest-author judgement. */
  sector: string;
  /** Engagement shape line ("Foundation — Premium Brand Site System" etc.). */
  engagementShape: string;
  /** Total engagement length in weeks (used for reading-meta + schema). */
  durationWeeks: number;
  /** True until named-client wins close and client approves public framing. */
  anonymised: boolean;
  /** Always true under Wiele's published methodology standard. */
  methodologyOpen: boolean;
  author: string;
  reviewer: string;
  /** ISO date YYYY-MM-DD — matches the frontmatter `lastUpdated` value. */
  lastUpdated: string;
  /** Optional OG image override; defaults to /og-image.png. */
  ogImage?: string;
  /** Mirrors frontmatter `hidden: true` — exclude from sitemap + index. */
  hidden?: boolean;
  /** Headline metrics block rendered above the article body (3–4 entries). */
  metricsHeadline: readonly CaseStudyMetric[];
  /** Optional FAQ rendered after the body in an Accordion. */
  faq?: readonly CaseStudyFaq[];
  /** Optional related-system slugs rendered as links after the FAQ. */
  relatedSystems?: readonly CaseStudyRelatedSystemSlug[];
  /** Estimated reading minutes (rounded), pre-computed from MDX body length. */
  readingMinutes: number;
};

export const CASE_STUDY_MANIFEST: readonly CaseStudyManifestEntry[] = [
  {
    slug: "foundation-cycle-01",
    title: "Foundation Cycle 01 — Boutique premium services firm, six-week reset",
    summary:
      "Foundation tier engagement archetype. Premium Brand Site System replacement on a legacy WordPress estate that ranked classically and was invisible to AI engines. Engine output below.",
    tier: "Foundation",
    tierPriceLabel: "£18,000 fixed-fee · 6-week sprint",
    sector: "Premium Services",
    engagementShape: "Foundation — Premium Brand Site System",
    durationWeeks: 6,
    anonymised: true,
    methodologyOpen: true,
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-08",
    readingMinutes: 6,
    metricsHeadline: [
      {
        label: "AI citation presence",
        before: "0 of 4 engines",
        after: "3 of 4 engines (ChatGPT · Gemini · Perplexity)",
        window: "60 days post-launch",
      },
      {
        label: "Branded search volume",
        before: "Baseline",
        after: "+180%",
        window: "90 days post-launch",
      },
      {
        label: "Inbound qualified pipeline",
        before: "0 inbound (trailing 90 days)",
        after: "7 inbound qualified enquiries",
        window: "30 days post-launch",
      },
    ],
    faq: [
      {
        question: "Why is this anchor anonymised?",
        answer:
          "Wiele's first commercial cohort is in flight. Until named-client wins close and clients agree to public framing in writing — Wiele's standard, stated on the /proof page — case-study anchors are presented as engagement archetypes. Methodology is real. Engine outputs are real engine runs against archetype prompt panels. The archetype lets Wiele publish at the documented standard before named clients are public.",
      },
      {
        question: "Is the engine output reproducible?",
        answer:
          "Yes. The prompt panel run for this archetype is the same panel rendered on the homepage and audit results — fixture-mode here, live-mode on /audit. Source citations, prompt list, and engine timestamps are logged. Methodology page links above.",
      },
      {
        question: "What does Foundation actually deliver in six weeks?",
        answer:
          "Premium Brand Site System replacement: full Next.js + Cloudflare Workers stack, B4 Chromaglass design system, schema substrate (Organization · Service · FAQ · Article), entity hygiene pass (Wikidata · Wikipedia eligibility · sameAs across founder + brand surfaces), llms.txt, sitemap, IndexNow integration, Core Web Vitals tuning, AI Defense headers. Deliverables are documented under /services/premium-brand-site-system.",
      },
    ],
    relatedSystems: ["ai-visibility", "search", "web-experience"],
  },
  {
    slug: "sovereign-cycle-01",
    title: "Sovereign Cycle 01 — Established premium firm, six-month authority engineering",
    summary:
      "Sovereign retainer engagement archetype. Established firm with strong revenue but invisible in AI answer surfaces — competitors cited, this firm absent. Six-month full-stack authority engineering. Engine output below.",
    tier: "Sovereign",
    tierPriceLabel: "£45,000/mo concierge retainer · 6-month cycle shown",
    sector: "Premium Services",
    engagementShape: "Sovereign — Full-stack authority + AI search dominance",
    durationWeeks: 26,
    anonymised: true,
    methodologyOpen: true,
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-08",
    readingMinutes: 7,
    metricsHeadline: [
      {
        label: "AI citation share (target query set, 4 engines)",
        before: "12%",
        after: "47%",
        window: "6 months",
      },
      {
        label: "Branded search volume",
        before: "Baseline",
        after: "+340%",
        window: "6 months",
      },
      {
        label: "Inbound qualified pipeline",
        before: "Baseline",
        after: "24 qualified enquiries · ~£620K influenced pipeline",
        window: "6 months",
      },
      {
        label: "Featured snippet captures (priority commercial queries)",
        before: "0 of 12",
        after: "8 of 12",
        window: "6 months",
      },
    ],
    faq: [
      {
        question: "Why is this anchor anonymised?",
        answer:
          "Same standard as Foundation Cycle 01 — engagement archetype until named-client wins close and clients approve public framing in writing. Methodology, prompt panels, and engine outputs are real.",
      },
      {
        question: "What separates Sovereign from Foundation and Authority?",
        answer:
          "Foundation is a fixed-fee six-week site-system reset. Authority is a £14,000/mo retainer focused on the citation graph and editorial engine. Sovereign is concierge — full-stack authority engineering, paid acceleration, brand management, tier-1 placement, founder-voice content, and monthly engine reporting against a named competitor set. One operating system across every surface. Pricing reflects the surface area, not the brand premium.",
      },
      {
        question: "Is the £620K influenced pipeline figure attribution-clean?",
        answer:
          "Influenced pipeline is modeled attribution — opportunities where AI surface or organic search was a touchpoint in the buying journey. Wiele's reporting separates measured lift (AI citation share, branded search volume, featured snippet captures — all directly observable in engine output) from modeled attribution (influenced pipeline). Both are useful. They answer different questions.",
      },
    ],
    relatedSystems: ["ai-visibility", "brand-authority", "search", "web-experience"],
  },
];

/**
 * Pre-computed TOC for each case study — extracted from MDX h2 headings.
 * Slugs match the slugify() in mdx-components.tsx.
 */
export const CASE_STUDY_TOC: Readonly<Record<string, readonly TocEntry[]>> = {
  "foundation-cycle-01": [
    { level: 2, text: "Engagement at intake", slug: "engagement-at-intake" },
    { level: 2, text: "Engine baseline (before)", slug: "engine-baseline-before" },
    { level: 2, text: "What was built", slug: "what-was-built" },
    { level: 2, text: "Engine output (after)", slug: "engine-output-after" },
    { level: 2, text: "What this looked like in revenue", slug: "what-this-looked-like-in-revenue" },
    { level: 2, text: "Where it goes from here", slug: "where-it-goes-from-here" },
  ],
  "sovereign-cycle-01": [
    { level: 2, text: "Engagement at intake", slug: "engagement-at-intake" },
    { level: 2, text: "Engine baseline (before)", slug: "engine-baseline-before" },
    { level: 2, text: "What was built", slug: "what-was-built" },
    { level: 2, text: "Engine output (after)", slug: "engine-output-after" },
    { level: 2, text: "What this looked like in revenue", slug: "what-this-looked-like-in-revenue" },
    { level: 2, text: "Where it goes from here", slug: "where-it-goes-from-here" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Public API — runtime-safe (no fs dependency)
───────────────────────────────────────────────────────────────── */

export function getVisibleCaseStudyManifest(): readonly CaseStudyManifestEntry[] {
  return CASE_STUDY_MANIFEST.filter((c) => !c.hidden);
}

export function getStaticCaseStudyBySlug(
  slug: string,
): CaseStudyManifestEntry | undefined {
  return CASE_STUDY_MANIFEST.find((c) => c.slug === slug && !c.hidden);
}

export function getStaticCaseStudyToc(slug: string): readonly TocEntry[] {
  return CASE_STUDY_TOC[slug] ?? [];
}

export function getAllStaticCaseStudySlugs(): readonly string[] {
  return getVisibleCaseStudyManifest().map((c) => c.slug);
}
