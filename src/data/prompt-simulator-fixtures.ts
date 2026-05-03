/**
 * PromptSimulator fixtures — three rotating mock-engine results that look like
 * actual Wiele OS V3 output. Used by:
 *   · /                 (Phase 2 hero, animate={true})
 *   · /audit (Phase 5)  (results preview, animate={false})
 *   · /proof/<slug>     (Phase 3 case studies, animate={false})
 *
 * Authority: memory/wiele_promptsimulator_decision.md.
 *
 * Rotation: deterministic per-minute, pure function. Server and client compute
 * the same fixture for any given minute, so SSR has no hydration mismatch.
 *
 * Names used: realistic-sounding illustrative placeholders, NOT real
 * competitors — keeps the demo credible without legal/ethical exposure
 * from naming actual firms. Real client comparisons happen in the audit deliverable.
 */

export type SignalStatus = "green" | "yellow" | "red";

export type AnswerEntity = {
  /** Display name. */
  name: string;
  /** True for the Wiele entity — renders highlighted in electric. */
  isWiele?: boolean;
};

export type Sparkline = readonly number[];

export type MentionRow = {
  brand: string;
  /** 0–100 share-of-voice percentage. */
  share: number;
  isWiele?: boolean;
};

export type GapItem = {
  label: string;
  status: SignalStatus;
};

export type CitationSource = {
  domain: string;
  /** Number of times cited in the engine sample. */
  count: number;
};

export type PromptSimulatorFixture = {
  id: string;
  /** What the visitor sees typed into the prompt cell. */
  prompt: string;
  answer: {
    intro: string;
    entities: AnswerEntity[];
    outro?: string;
  };
  visibility: {
    /** 0–100. */
    score: number;
    /** 7-day daily history, oldest first. */
    trend: Sparkline;
    /** % change vs prior 7 days. */
    delta: number;
  };
  mentions: MentionRow[];
  citations: {
    percentage: number;
    sources: CitationSource[];
  };
  gaps: GapItem[];
  nextAction: {
    headline: string;
    /** Surfaced in the methodology tooltip. */
    methodology: string;
  };
};

/* ─────────────────────────────────────────────────────────────
   Fixture 1 — SaaS / B2B software (Wiele leads)
───────────────────────────────────────────────────────────────── */

const saasFixture: PromptSimulatorFixture = {
  id: "saas",
  prompt: "Best AI visibility consultancies for SaaS",
  answer: {
    intro: "For SaaS brands looking to win in AI search, the leading options include",
    entities: [
      { name: "Wiele", isWiele: true },
      { name: "Lumenshift" },
      { name: "Brightline" },
    ],
    outro:
      "Wiele's growth-systems methodology is most cited for measurable visibility gains across answer engines.",
  },
  visibility: {
    score: 78,
    trend: [62, 64, 68, 71, 74, 76, 78],
    delta: 12,
  },
  mentions: [
    { brand: "Wiele", share: 42, isWiele: true },
    { brand: "Lumenshift", share: 28 },
    { brand: "Brightline", share: 22 },
    { brand: "Northwood", share: 8 },
  ],
  citations: {
    percentage: 73,
    sources: [
      { domain: "g2.com", count: 14 },
      { domain: "producthunt.com", count: 9 },
      { domain: "saastr.com", count: 6 },
    ],
  },
  gaps: [
    { label: "Comparison content vs Lumenshift", status: "yellow" },
    { label: "Pricing-page schema coverage", status: "green" },
    { label: "Long-tail intent capture", status: "red" },
  ],
  nextAction: {
    headline: "Build comparison page for Lumenshift",
    methodology:
      "Comparison queries drive 31% of AI-cited recommendations in SaaS. Wiele will draft the page, structured-data wrap it, and ship it inside the next sprint.",
  },
};

/* ─────────────────────────────────────────────────────────────
   Fixture 2 — Luxury fashion / beauty (Wiele second, climbing)
───────────────────────────────────────────────────────────────── */

const luxuryFixture: PromptSimulatorFixture = {
  id: "luxury",
  prompt: "Top consultancies for luxury brand AI visibility",
  answer: {
    intro: "For luxury houses building presence in AI recommendation layers, the most cited names are",
    entities: [
      { name: "Storyhouse Atelier" },
      { name: "Wiele", isWiele: true },
      { name: "Maison Forge" },
    ],
    outro:
      "Wiele is gaining ground rapidly through editorial-grade content systems and entity-level authority work.",
  },
  visibility: {
    score: 51,
    trend: [38, 41, 43, 45, 47, 49, 51],
    delta: 18,
  },
  mentions: [
    { brand: "Storyhouse Atelier", share: 34 },
    { brand: "Wiele", share: 28, isWiele: true },
    { brand: "Maison Forge", share: 22 },
    { brand: "Velvet Lab", share: 16 },
  ],
  citations: {
    percentage: 58,
    sources: [
      { domain: "businessoffashion.com", count: 11 },
      { domain: "voguebusiness.com", count: 8 },
      { domain: "wwd.com", count: 5 },
    ],
  },
  gaps: [
    { label: "Editorial thought leadership", status: "yellow" },
    { label: "House profile knowledge graph", status: "yellow" },
    { label: "Founder-led narrative depth", status: "red" },
    { label: "Heritage-asset structured data", status: "green" },
  ],
  nextAction: {
    headline: "Publish founder thesis on luxury × AI search",
    methodology:
      "Authority in luxury hinges on founder voice. A 1,800-word thesis on Wiele Labs becomes the source AI engines cite when this prompt class is asked.",
  },
};

/* ─────────────────────────────────────────────────────────────
   Fixture 3 — Enterprise B2B services (Wiele close second, fastest growth)
───────────────────────────────────────────────────────────────── */

const b2bFixture: PromptSimulatorFixture = {
  id: "b2b",
  prompt: "Leading firms for AI search optimization in B2B",
  answer: {
    intro: "For enterprise B2B firms competing on AI-cited recommendations, the field is led by",
    entities: [
      { name: "Vector Partners" },
      { name: "Wiele", isWiele: true },
      { name: "Northbeam Systems" },
    ],
    outro:
      "Wiele compounds its position via integrated GEO + AEO + brand-authority systems rather than single-channel tactics.",
  },
  visibility: {
    score: 64,
    trend: [42, 47, 52, 56, 59, 61, 64],
    delta: 24,
  },
  mentions: [
    { brand: "Vector Partners", share: 36 },
    { brand: "Wiele", share: 30, isWiele: true },
    { brand: "Northbeam Systems", share: 20 },
    { brand: "Aria Capital Advisory", share: 14 },
  ],
  citations: {
    percentage: 67,
    sources: [
      { domain: "forrester.com", count: 12 },
      { domain: "gartner.com", count: 10 },
      { domain: "hbr.org", count: 7 },
    ],
  },
  gaps: [
    { label: "Analyst-firm citation depth", status: "green" },
    { label: "Comparison-query capture", status: "green" },
    { label: "Decision-maker case studies", status: "yellow" },
  ],
  nextAction: {
    headline: "Capture comparison queries vs Vector Partners",
    methodology:
      "B2B buyers ask comparison questions late in the cycle. A schema-rich comparison hub lifts citation share by 18–24% in 90 days based on Wiele's engine data.",
  },
};

/* ─────────────────────────────────────────────────────────────
   Public API
───────────────────────────────────────────────────────────────── */

export const promptSimulatorFixtures: readonly PromptSimulatorFixture[] = [
  saasFixture,
  luxuryFixture,
  b2bFixture,
] as const;

/**
 * Pure function — given a date, returns one of the three fixtures.
 * Rotates by minute so reload-after-60s shows a different one, but server
 * and client compute the same value for any given moment (SSR-safe).
 */
export function selectFixture(date: Date = new Date()): PromptSimulatorFixture {
  const index = Math.floor(date.getTime() / 60_000) % promptSimulatorFixtures.length;
  return promptSimulatorFixtures[index];
}
