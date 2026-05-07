/**
 * Static homepage content — drives Problem, Process, Trust preview, Labs preview,
 * Proof preview, ProofStrip. Anything that's a list of strings or short objects
 * lands here so sections stay layout-only.
 */

export const proofStripItems = [
  { label: "Brand Design" },
  { label: "Marketing Strategy" },
  { label: "Web Design" },
  { label: "Advertising" },
  { label: "SEO Services" },
  { label: "AI Search Optimization" },
  { label: "Performance Marketing" },
  { label: "Authority Engineering" },
];

/**
 * Discipline cards — six-pillar showcase that runs after ProofStrip.
 * v2.2 update (2026-05-04): split the legacy "Brand Design & Marketing"
 * card into TWO so each agency-division landing page has a homepage
 * anchor. Order: Brand → Marketing → Web → Advertising → SEO → AI Search.
 *
 * Lead with the universally-recognized agency disciplines (Brand,
 * Marketing, Web, Advertising), then bring in the specialty search /
 * AI disciplines as supporting depth. Frames Wiele as a premium
 * full-service agency where AI search is one engine among many — not
 * the entire identity.
 *
 * Each card carries an `href` — first four route to dedicated agency
 * landing pages, last two to existing systems pages.
 */
export const disciplines = [
  {
    num: "01",
    title: "Brand Management",
    headline: "Premium identity. Strategic narrative. Compounding equity.",
    body:
      "Positioning, identity systems, narrative architecture, and authority engineering for firms competing on perception and trust.",
    capabilities: ["Positioning", "Identity", "Narrative", "Authority"],
    href: "/brand-management-agency",
  },
  {
    num: "02",
    title: "Marketing",
    headline: "Marketing as an operating system, not a campaign list.",
    body:
      "Strategy, audience, content, lifecycle, and ops — engineered as one engine. Every channel compounds the others.",
    capabilities: ["Strategy", "Content", "Lifecycle", "Ops"],
    href: "/marketing-agency",
  },
  {
    num: "03",
    title: "Web Design",
    headline: "Conversion-engineered digital experiences.",
    body:
      "Premium website systems built around UX strategy, design tokens, performance, and AI-extractable structure. Fast, beautiful, built to convert.",
    capabilities: ["UX strategy", "Design systems", "Performance", "Conversion"],
    href: "/web-design-agency",
  },
  {
    num: "04",
    title: "Advertising",
    headline: "Performance media with the craft of a brand agency.",
    body:
      "Full-funnel paid media across Google, Meta, LinkedIn, and emerging surfaces. Creative systems, attribution, and pacing that turn spend into revenue.",
    capabilities: ["Paid media", "Creative testing", "Attribution", "Scaling"],
    href: "/advertising-agency",
  },
  {
    num: "05",
    title: "SEO Services",
    headline: "Technical SEO. Content systems. Search authority.",
    body:
      "Audits, technical foundations, content architecture, link strategy, and entity-level authority engineering. The classical search engine still drives compounding pipeline.",
    capabilities: ["Technical SEO", "Content", "Authority", "Schema"],
    href: "/systems/search",
  },
  {
    num: "06",
    title: "AI Search Optimization",
    headline: "GEO + AEO. Engineered for the answer economy.",
    body:
      "Citation engineering across ChatGPT, Gemini, Perplexity, Claude, Copilot, and the AI overviews. Entity authority, extractable answer assets, recommendation visibility.",
    capabilities: ["GEO", "AEO", "Citation engineering", "Entity authority"],
    href: "/systems/ai-visibility",
  },
] as const;

export const problemPoints = [
  {
    title: "Search is changing. Most brands aren't.",
    body:
      "AI Overviews and answer engines now intercept buyers before they reach your site. Classical SEO alone doesn't show up there.",
  },
  {
    title: "Authority is the new ranking signal.",
    body:
      "Keyword tactics that worked in 2019 are invisible to LLMs. The brands cited are the ones with verifiable, structured authority.",
  },
  {
    title: "Recommendation layers compound for the prepared.",
    body:
      "Brands that engineer citation-readiness now own the cited slot for years. Late entrants compete against compounded incumbents.",
  },
  {
    title: "Generic content is invisible content.",
    body:
      "AI engines surface specific, founder-led, evidence-backed positions. Boilerplate copy is filtered out before it ever gets quoted.",
  },
];

export const processSteps = [
  {
    label: "01",
    title: "Map",
    body:
      "Diagnose your AI visibility, citation graph, and authority gaps across the prompt surface that matters to your buyer.",
  },
  {
    label: "02",
    title: "Build",
    body:
      "Engineer content, schema, comparison hubs, and authority assets that AI engines cite — and humans convert from.",
  },
  {
    label: "03",
    title: "Compound",
    body:
      "Visibility, citations, and demand compound month over month. The asset gets stronger; the moat gets deeper.",
  },
];

export const auditPreviewSteps = [
  "Submit your brand, market, and 3 competitors",
  "Wiele OS runs the engine across answer-engine prompts",
  "Score, mention, citation, gap, and action signals returned",
  "30-day implementation roadmap delivered",
  "1 strategy session with a Wiele principal",
];

export const trustPoints = [
  {
    title: "AI use, disclosed.",
    body: "Every workflow that uses AI is named. No black-box claims.",
  },
  {
    title: "Human review on every output.",
    body: "Wiele principals review and own every deliverable before it ships.",
  },
  {
    title: "Source-level citation.",
    body: "Claims trace to public, verifiable sources. Methodology open for inspection.",
  },
  {
    title: "Data handled with care.",
    body: "GDPR-aligned, region-aware. Client data stays inside agreed boundaries.",
  },
  {
    title: "Claim verification, on the record.",
    body: "Outcomes shown are tied to real engine runs, not aspirational ranges.",
  },
  {
    title: "Responsible automation.",
    body: "Automation lifts work; it does not replace the strategist judgement clients pay for.",
  },
];

/**
 * Homepage Labs preview cards — slugs match src/content/labs/*.mdx files.
 * Three founder-voice articles, full body copy live as of v2.4
 * (2026-05-05 holes-plugged sweep). Reviewer + lastUpdated tracked
 * in each MDX frontmatter.
 */
export const labsPreviewArticles = [
  {
    title: "Why AI recommendations compound where SEO doesn't",
    summary:
      "The asymmetry between classical search and AI-cited recommendation, and the compounding loop that makes early movers nearly uncatchable.",
    eyebrow: "Strategy",
    href: "/labs/ai-recommendations-compound",
    placeholder: true,
  },
  {
    title: "The five signals that decide whether ChatGPT cites you",
    summary:
      "Inside the citation function: how answer engines triangulate authority, freshness, and entity clarity to choose what to quote.",
    eyebrow: "Methodology",
    href: "/labs/five-citation-signals",
    placeholder: true,
  },
  {
    title: "Search is splitting in two: classical and inferred",
    summary:
      "Why winning on Google won't be enough by 2027 — and what the Wiele engine measures that classical SEO tools can't see.",
    eyebrow: "Field notes",
    href: "/labs/search-is-splitting",
    placeholder: true,
  },
];

export const proofPlaceholders = [
  {
    sector: "Premium SaaS",
    headline: "AI Visibility Programme",
    summary:
      "Twelve-week programme: citation graph audit, entity baseline, founder-voice content, comparison-page system, monthly engine re-runs.",
  },
  {
    sector: "Premium Services",
    headline: "Authority Engine Retainer",
    summary:
      "Editorial system, founder-voice writing engine, citation graph maintenance, analyst outreach, monthly engine reporting against a named competitor set.",
  },
  {
    sector: "Premium DTC + Luxury",
    headline: "Integrated Growth System",
    summary:
      "Brand layer, web experience layer, paid acceleration layer, AI visibility substrate — six disciplines run as one operating system.",
  },
];
