import type { TocEntry } from "./labs-toc";

/**
 * Static article manifest — hand-maintained, bundled into every build.
 *
 * History:
 * - Phase 7.1 (sitemap fix): added slug + lastUpdated for runtime-safe
 *   sitemap enumeration (OpenNext fs reads fail silently in Workers).
 * - Phase 7.4 (labs/<slug> 404 fix): extended with FULL article metadata
 *   so the [slug] page can render without any fs dependency at runtime.
 *
 * Why this exists:
 * `src/lib/labs.ts` reads `src/content/labs/*.mdx` from disk via
 * fs.readdirSync/readFileSync at build time. That works for `npm run build`
 * (Next.js Node runtime, e.g. /labs index page generation) but FAILS in the
 * OpenNext Workers runtime — fs reads return empty/undefined, the [slug]
 * page calls notFound(), all 3 article URLs return 404 in production.
 *
 * The fix: encode the article identity + metadata layer as a TS module
 * the bundler tree-shakes and ships. Build-time Zod validation in
 * `src/lib/labs.ts` (called from /labs index page generation) still runs
 * and still fails the build on invalid frontmatter — the safety net is
 * intact. This module is just the runtime-safe data the [slug] page needs.
 *
 * Adding a new article:
 *   1. Drop the .mdx into src/content/labs/
 *   2. Add a static import in src/app/labs/[slug]/page.tsx
 *   3. Add an entry to ARTICLE_MANIFEST below — must match the .mdx
 *      frontmatter exactly (build-time Zod validation will fail if not)
 *   4. Add the slug to ARTICLE_TOC if you want a TOC sidebar (optional)
 *
 * Removing an article:
 *   1. Delete the .mdx
 *   2. Remove the entry below (or set hidden: true)
 *   3. Remove the static import in src/app/labs/[slug]/page.tsx
 */

export type ArticleCategory =
  | "Strategy"
  | "Methodology"
  | "Field notes"
  | "Founder thesis";

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type RelatedSystemSlug =
  | "ai-visibility"
  | "search"
  | "brand-authority"
  | "web-experience";

export type ArticleManifestEntry = {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  author: string;
  reviewer: string;
  /** ISO date YYYY-MM-DD — matches the frontmatter `lastUpdated` value. */
  lastUpdated: string;
  /** Optional OG image override; defaults to /og-image.png. */
  ogImage?: string;
  /** Mirrors frontmatter `hidden: true` — exclude from sitemap + index. */
  hidden?: boolean;
  /** Optional FAQ rendered after the body in an Accordion. */
  faq?: readonly ArticleFaq[];
  /** Optional related-system slugs rendered as links after the FAQ. */
  relatedSystems?: readonly RelatedSystemSlug[];
  /** Estimated reading minutes (rounded), pre-computed from MDX body length. */
  readingMinutes: number;
};

export const ARTICLE_MANIFEST: readonly ArticleManifestEntry[] = [
  {
    slug: "ai-recommendations-compound",
    title: "Why AI recommendations compound where SEO doesn't",
    summary:
      "The asymmetry between classical search and AI-cited recommendation, and the compounding loop that makes early movers nearly uncatchable in the AI search era.",
    category: "Strategy",
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-03",
    readingMinutes: 4,
    faq: [
      {
        question: "Doesn't classical SEO compound too?",
        answer:
          "Classical SEO compounds via authority and link graphs — slowly, expensively, and with diminishing returns once a category has stabilised. AI citation graphs compound differently: each citation by an answer engine is a vote of confidence the next prompt sees, and the citation function is recency-sensitive. That means newcomers on the classical surface fight against decades of incumbent backlinks, while newcomers on the inferred surface can earn citation share inside a quarter — provided the citation signals are engineered.",
      },
      {
        question: "How long until the compounding shows in revenue?",
        answer:
          "On Wiele engagements the typical curve is: engine deltas (citation share, prompt coverage, entity strength) move inside 90 days; attributable pipeline lift shows up around month six as the AI surface starts feeding qualified buyers into the funnel; the structural moat — where competitors can't dislodge you economically — solidifies around month eighteen. Faster on niche categories with weak incumbents, slower on saturated categories where reputation is decades deep.",
      },
      {
        question: "Can a late entrant catch up?",
        answer:
          "Sometimes — rarely cheaply. A late entrant can close the gap when the incumbent's citation graph is stale (no fresh founder voice, weak entity hygiene, no comparison surface), or when the category is shifting fast enough that recency outweighs cumulative authority. More often, the incumbent's compounding makes catch-up economically unattractive: the late entrant has to outspend on content, outpublish on authority, and outbid on attention all at once. That's the moat.",
      },
    ],
    relatedSystems: ["ai-visibility", "brand-authority"],
  },
  {
    slug: "five-citation-signals",
    title: "The five signals that decide whether ChatGPT cites you",
    summary:
      "Inside the citation function. How answer engines triangulate authority, freshness, and entity clarity to choose what to quote — and what brands can engineer against each signal.",
    category: "Methodology",
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-03",
    readingMinutes: 5,
    faq: [
      {
        question: "Are these five signals weighted equally?",
        answer:
          "No — and the weighting drifts by engine and prompt class. Entity clarity is closer to a hard prerequisite: if the engine can't disambiguate who you are, the other four signals never enter the calculation. Source authority and recency are heavyweights once entity is solved. Founder voice and structured extractability are tiebreakers — they decide which of two equally credible sources gets cited first. Wiele engages all five because the weights shift; betting on the wrong one ages badly.",
      },
      {
        question: "How do you measure each signal in practice?",
        answer:
          "The Wiele OS engine runs a fixed prompt panel against each target buyer query, captures every cited source, and scores the brand on each signal: entity clarity (does the engine name the brand correctly?), source authority (is the brand cited as an expert source?), recency (is fresh content surfacing?), founder voice (is named-author content being quoted?), and extractability (are answer blocks structured for direct quotation?). Methodology and source-level citation logging is documented at /trust.",
      },
      {
        question: "Which signal is the highest-leverage to start with?",
        answer:
          "For most brands: entity clarity. It's the structural prerequisite the other four lean on, and the most common failure mode in AI search audits — the brand exists, ranks classically, and still gets misnamed or omitted because the entity graph never crystallised. Fixing entity clarity (canonical naming, schema, founder linkage, knowledge-graph consistency) is fast, cheap, and unlocks the rest of the system. Skip it and the engine work that follows under-performs.",
      },
    ],
    relatedSystems: ["ai-visibility", "search", "brand-authority"],
  },
  {
    slug: "search-is-splitting",
    title: "Search is splitting in two: classical and inferred",
    summary:
      "Why winning on Google won't be enough by 2027. The architectural split between classical search and AI inference, and what the Wiele engine measures that classical SEO tools can't see.",
    category: "Field notes",
    author: "Jonathan Landman",
    reviewer: "Jonathan Landman",
    lastUpdated: "2026-05-03",
    readingMinutes: 4,
    faq: [
      {
        question: "Is classical search going away?",
        answer:
          "No. The two surfaces are splitting, not collapsing. Classical search continues to serve transactional, navigational, and known-brand queries — buyers who know what they want and want a link to click. AI inference is taking the considered, comparative, and recommendation queries — buyers who want an answer rather than ten options. The mistake is treating either surface as the whole market. Different intent classes, different surfaces, different optimisation systems. Build for both.",
      },
      {
        question: "Which buyers are in the inferred-search bucket?",
        answer:
          "Considered B2B buyers, technical buyers, founders evaluating tools or partners, and high-AOV consumer categories where the buyer wants a recommendation rather than a list of links. Anyone whose research process used to involve reading five blog posts and asking three peers now opens an answer engine first. Consumer transactional intent (buy, book, find-near-me) still skews classical. Anything that involves reasoning, comparing, or trusting a recommendation is moving inferred.",
      },
      {
        question: "What do classical SEO tools miss?",
        answer:
          "Classical tools (Ahrefs, Semrush, similar) measure the classical surface accurately and have spent two decades getting good at it. What they don't see is the inferred surface — they can't tell you whether ChatGPT, Perplexity, or Gemini is quoting your content, citing your competitor, or omitting both. That visibility requires running the actual prompt panel against the actual engines and logging citation outputs. Wiele's engine does this; classical SEO tooling doesn't.",
      },
    ],
    relatedSystems: ["ai-visibility", "search"],
  },
];

/**
 * Pre-computed TOC for each article — extracted once at build/maintenance time
 * from the MDX h2/h3 headings. Slugs match the slugify() in mdx-components.tsx.
 *
 * Why static: src/lib/labs-toc.ts uses fs.readFileSync at runtime to extract
 * TOC from MDX source. That fails on Workers same as the article fs reads.
 * Encoding here makes the TOC runtime-safe.
 */
export const ARTICLE_TOC: Readonly<Record<string, readonly TocEntry[]>> = {
  "ai-recommendations-compound": [
    { level: 2, text: "The classical SEO compounding curve", slug: "the-classical-seo-compounding-curve" },
    { level: 2, text: "How AI citation compounding actually works", slug: "how-ai-citation-compounding-actually-works" },
    { level: 3, text: "The three reinforcement loops", slug: "the-three-reinforcement-loops" },
    { level: 2, text: "Why late movers struggle to catch up", slug: "why-late-movers-struggle-to-catch-up" },
    { level: 2, text: "What this means for budget allocation", slug: "what-this-means-for-budget-allocation" },
  ],
  "five-citation-signals": [
    { level: 2, text: "Signal one — entity clarity", slug: "signal-one-entity-clarity" },
    { level: 2, text: "Signal two — citation history", slug: "signal-two-citation-history" },
    { level: 2, text: "Signal three — source weight", slug: "signal-three-source-weight" },
    { level: 2, text: "Signal four — freshness", slug: "signal-four-freshness" },
    { level: 2, text: "Signal five — founder voice", slug: "signal-five-founder-voice" },
    { level: 2, text: "What this means for execution order", slug: "what-this-means-for-execution-order" },
  ],
  "search-is-splitting": [
    { level: 2, text: "The classical surface", slug: "the-classical-surface" },
    { level: 2, text: "The inferred surface", slug: "the-inferred-surface" },
    { level: 3, text: "Where the surfaces overlap", slug: "where-the-surfaces-overlap" },
    { level: 2, text: "What classical SEO tools can't see", slug: "what-classical-seo-tools-cant-see" },
    { level: 2, text: "How to think about the split as a budget decision", slug: "how-to-think-about-the-split-as-a-budget-decision" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Public API — runtime-safe (no fs dependency)
───────────────────────────────────────────────────────────────── */

export function getVisibleArticleManifest(): readonly ArticleManifestEntry[] {
  return ARTICLE_MANIFEST.filter((a) => !a.hidden);
}

export function getStaticArticleBySlug(
  slug: string,
): ArticleManifestEntry | undefined {
  return ARTICLE_MANIFEST.find((a) => a.slug === slug && !a.hidden);
}

export function getStaticArticleToc(slug: string): readonly TocEntry[] {
  return ARTICLE_TOC[slug] ?? [];
}

export function getAllStaticSlugs(): readonly string[] {
  return getVisibleArticleManifest().map((a) => a.slug);
}
