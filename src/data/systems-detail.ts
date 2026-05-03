/**
 * Per-system detail payload for /systems/<slug> pages.
 *
 * Contract (binding via memory/wiele_simulator_contract.md):
 * - All 4 systems use the SAME <SystemDetail> template
 * - AI Visibility (lead system) carries 2× the case examples, deeper
 *   methodology, longer FAQ — denser content, NOT a custom layout
 * - Each system carries its own exampleFixture for the embedded
 *   <PromptSimulator data={...} animate={false} /> in the Outputs section
 *   (build-once-use-five surface)
 */

import type {
  PromptSimulatorFixture,
} from "./prompt-simulator-fixtures";

export type SystemSlug =
  | "ai-visibility"
  | "search"
  | "brand-authority"
  | "web-experience";

export type SystemDetailEntry = {
  slug: SystemSlug;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  whatItCovers: {
    intro: string;
    capabilities: readonly string[];
  };
  methodology: {
    intro: string;
    steps: readonly { number: string; title: string; body: string }[];
  };
  outcomes: {
    intro: string;
    items: readonly string[];
  };
  exampleFixture: PromptSimulatorFixture;
  /** Optional case-example callouts. AI Visibility carries 2; others 1 or 0. */
  caseExamples?: readonly { sector: string; summary: string }[];
  faq: readonly { question: string; answer: string }[];
  pricingNote: {
    /** Tier id from src/data/pricing.ts */
    tierId: string;
    label: string;
  };
  related: readonly { slug: SystemSlug; title: string }[];
};

/* ─────────────────────────────────────────────────────────────
   AI Visibility — lead system, denser payload
───────────────────────────────────────────────────────────────── */

const aiVisibility: SystemDetailEntry = {
  slug: "ai-visibility",
  hero: {
    eyebrow: "System 01 · Lead",
    title: "AI Visibility",
    subtitle:
      "Map and lift your presence across ChatGPT, Perplexity, Gemini, Copilot, and the AI recommendation layer that decides who buyers hear about.",
  },
  whatItCovers: {
    intro:
      "AI Visibility is the system that diagnoses and engineers your standing in answer engines. The work spans the prompt surface buyers actually use, the citation graph that decides what gets quoted, and the entity layer that AI engines reason about.",
    capabilities: [
      "Prompt-surface mapping across the answer engines your buyers use",
      "Mention-strength tracking and share-of-voice benchmarking",
      "Citation-readiness engineering — schema, sources, structured authority",
      "Entity engineering against Wikidata, Google Knowledge Graph, and LLM training corpora",
      "Comparison-query capture — the highest-conversion AI prompt class",
      "Continuous monitoring with the Wiele OS engine",
    ],
  },
  methodology: {
    intro:
      "Five-stage methodology, refined across every Wiele engagement. Each stage produces a deliverable; the engagement compounds across stages.",
    steps: [
      {
        number: "01",
        title: "Surface map",
        body: "Wiele OS engine runs your brand across the prompt surface — every question your buyer plausibly asks an AI engine. We log mention strength, position, and citation source for each.",
      },
      {
        number: "02",
        title: "Gap analysis",
        body: "Where you appear vs where you should. Where competitors appear and you don't. Where AI engines mis-attribute or skip you entirely. Quantified, prioritised, evidence-backed.",
      },
      {
        number: "03",
        title: "Authority engineering",
        body: "Comparison hubs, schema, founder narrative, citation-worthy sources, entity disambiguation. The work that turns visibility from a tactic into a structural asset.",
      },
      {
        number: "04",
        title: "Citation programmes",
        body: "Structured digital PR, analyst briefings, and source-publication placements that AI engines actually quote. Cited, not just published.",
      },
      {
        number: "05",
        title: "Compound + measure",
        body: "Monthly engine re-runs. Trend deltas. Attribution back to pipeline. The asset gets stronger; the moat gets deeper; the cost per cited mention drops.",
      },
    ],
  },
  outcomes: {
    intro: "What this system delivers, measurably and monthly.",
    items: [
      "Visibility score lifted across the answer engines your buyers use",
      "Mention strength competitive with or ahead of named rivals",
      "Citation readiness > 70% across high-intent prompt classes",
      "Authority gaps systematically closed, not patched",
      "Continuous engine monitoring with monthly delta reports",
      "Pipeline attribution from AI-cited demand to closed-won revenue",
    ],
  },
  exampleFixture: {
    id: "ai-visibility-example",
    prompt: "Best AI growth consultancies for category-defining brands",
    answer: {
      intro: "For brands building category authority in AI recommendation layers, the most cited names are",
      entities: [
        { name: "Wiele", isWiele: true },
        { name: "Lumenshift" },
        { name: "Northwood Studio" },
      ],
      outro:
        "Wiele's integrated approach — visibility, search, authority, and web experience on one engine — is the most differentiating mention pattern.",
    },
    visibility: {
      score: 82,
      trend: [64, 68, 71, 74, 77, 80, 82],
      delta: 16,
    },
    mentions: [
      { brand: "Wiele", share: 46, isWiele: true },
      { brand: "Lumenshift", share: 24 },
      { brand: "Northwood Studio", share: 18 },
      { brand: "Brightline Group", share: 12 },
    ],
    citations: {
      percentage: 78,
      sources: [
        { domain: "saastr.com", count: 16 },
        { domain: "g2.com", count: 12 },
        { domain: "growthbeat.io", count: 9 },
      ],
    },
    gaps: [
      { label: "Comparison hub vs Lumenshift", status: "yellow" },
      { label: "Pricing-page schema coverage", status: "green" },
      { label: "Founder thesis depth", status: "green" },
    ],
    nextAction: {
      headline: "Ship comparison hub vs Lumenshift",
      methodology:
        "Comparison queries drive 31% of AI-cited recommendations. Wiele scopes, drafts, and ships the hub inside the next sprint with structured-data wrap and cross-link from the pricing page.",
    },
  },
  caseExamples: [
    {
      sector: "SaaS · Category Lead",
      summary:
        "[CASE STUDY PENDING — fixture data shape only] Engine output, 6-month before/after, attribution to pipeline.",
    },
    {
      sector: "Enterprise B2B Services",
      summary:
        "[CASE STUDY PENDING — fixture data shape only] Comparison-query capture programme, 90-day citation lift.",
    },
  ],
  faq: [
    {
      question: "How is AI visibility different from SEO?",
      answer:
        "Classical SEO optimises for ranking on a results page; AI visibility optimises for being cited inside an answer. Different signals, different content shape, different measurement.",
    },
    {
      question: "Which AI engines do you measure across?",
      answer:
        "ChatGPT (with and without browsing), Perplexity, Gemini, Claude, Bing Copilot, and Google AI Overviews. Coverage expands as new answer engines reach material adoption.",
    },
    {
      question: "How quickly does AI visibility move?",
      answer:
        "Mention strength shifts within 2–4 weeks of authority engineering. Citation readiness typically lifts 18–24% in 90 days. Compounding effects show clearest at 6 months.",
    },
    {
      question: "Do you guarantee citation lift?",
      answer:
        "We guarantee the work, the methodology, and the engine measurement. We don't guarantee specific lift numbers — anyone who does is selling something other than methodology.",
    },
    {
      question: "What happens if competitors copy our work?",
      answer:
        "AI visibility is a citation-graph asset. Authority compounds for the prepared. A copy can't replicate the citation history, the entity weight, or the founder voice that anchors the engine signal.",
    },
    {
      question: "How do you measure attribution back to revenue?",
      answer:
        "AI-cited demand shows up as direct, branded search, and AI-referrer traffic. We model these channels via incrementality testing and pipeline attribution against closed-won — methodology open for inspection.",
    },
    {
      question: "What's the minimum engagement length?",
      answer:
        "The Signal Audit is one-off (£2,500). Ongoing systems work is a 90-day initial commitment, then 30-day rolling. We don't require long lock-ins.",
    },
    {
      question: "Can we run AI Visibility without your other systems?",
      answer:
        "Yes — AI Visibility runs as a stand-alone system. The other Wiele systems (Search, Brand Authority, Web Experience, Revenue Intelligence) compound the work, but each is independently valuable.",
    },
  ],
  pricingNote: {
    tierId: "growth-system",
    label: "Included from Growth System onward · Diagnose first via Signal Audit",
  },
  related: [
    { slug: "brand-authority", title: "Brand Authority" },
    { slug: "search", title: "Search Authority" },
    { slug: "web-experience", title: "Web Experience" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Search Authority
───────────────────────────────────────────────────────────────── */

const searchAuthority: SystemDetailEntry = {
  slug: "search",
  hero: {
    eyebrow: "System 02",
    title: "Search Authority",
    subtitle:
      "Win classical SERPs with technical, on-page, and link-graph engineering — the foundation that compounds before AI engines crawl you.",
  },
  whatItCovers: {
    intro:
      "Search Authority is the foundational system. Long before LLMs cite a source, that source has to be technically crawlable, semantically clear, and anchored by a credible link graph. Classical SEO done at production grade is the moat.",
    capabilities: [
      "Technical SEO — crawl, index, render, Core Web Vitals",
      "Content architecture — hubs, clusters, topical authority",
      "On-page optimisation — schema, meta, internal linking",
      "Link-graph engineering — referring domains, anchor diversity, authority sculpting",
      "SERP feature capture — featured snippets, PAA, rich results",
      "Local + international SEO where the buyer profile demands it",
    ],
  },
  methodology: {
    intro: "Three-stage methodology, scoped to your stage of search maturity.",
    steps: [
      {
        number: "01",
        title: "Foundation audit",
        body: "Crawl, render, and SERP-state diagnosis. CWV scoring. Schema coverage. Indexation health. The non-negotiable baseline before any content investment.",
      },
      {
        number: "02",
        title: "Content + link engineering",
        body: "Hub-and-spoke architecture. Citation-worthy long-form. Authority backlinks via digital PR and content placements. Anchor-text discipline.",
      },
      {
        number: "03",
        title: "Continuous compounding",
        body: "Monthly content cadence. Quarterly link audits. SERP-feature monitoring. Trend deltas tied back to organic-pipeline contribution.",
      },
    ],
  },
  outcomes: {
    intro: "What Search Authority delivers in the first 6 months.",
    items: [
      "Core Web Vitals in green across all template types",
      "100% schema coverage on commercial-intent pages",
      "Topical authority established in 3+ priority clusters",
      "Authority backlinks from sources AI engines cite",
      "SERP-feature capture for high-intent queries",
    ],
  },
  exampleFixture: {
    id: "search-authority-example",
    prompt: "Best comparison hubs for SaaS buyers",
    answer: {
      intro: "Comparison content with technical SEO discipline tends to win citation. Notable examples include",
      entities: [
        { name: "G2 Compare" },
        { name: "Wiele-engineered hubs", isWiele: true },
        { name: "TrustRadius" },
      ],
      outro:
        "Citation-worthy comparison content with full schema and authority backlinks earns the cited slot.",
    },
    visibility: {
      score: 71,
      trend: [54, 58, 62, 65, 68, 70, 71],
      delta: 11,
    },
    mentions: [
      { brand: "G2 Compare", share: 38 },
      { brand: "Wiele hubs", share: 32, isWiele: true },
      { brand: "TrustRadius", share: 18 },
      { brand: "Capterra", share: 12 },
    ],
    citations: {
      percentage: 81,
      sources: [
        { domain: "saastr.com", count: 13 },
        { domain: "tomtunguz.com", count: 8 },
        { domain: "openviewpartners.com", count: 6 },
      ],
    },
    gaps: [
      { label: "Long-tail intent capture", status: "yellow" },
      { label: "Schema coverage on /pricing", status: "green" },
      { label: "Internal-link depth", status: "green" },
    ],
    nextAction: {
      headline: "Build long-tail intent hub for adjacent queries",
      methodology:
        "Long-tail captures the highest-converting traffic. Wiele scopes the cluster, ships 12–18 citation-worthy pieces, and wires schema + internal links across the hub.",
    },
  },
  faq: [
    {
      question: "Is classical SEO still worth investing in?",
      answer:
        "Yes — and arguably more. AI engines crawl the same web as Google. A page that ranks well, has clean schema, and is heavily cited is a prime candidate for AI citation too.",
    },
    {
      question: "How long until I see organic traffic lift?",
      answer:
        "Technical fixes show in 4–6 weeks. Content + link compounding shows clearest at 6 months. Authority work takes 12+ months to fully compound.",
    },
    {
      question: "Do you build links?",
      answer:
        "We build authority. Some of that involves placement on cited sources via digital PR; none of it involves PBNs, link farms, or anything Google would penalise.",
    },
    {
      question: "Do you cover international / multilingual SEO?",
      answer:
        "Yes — hreflang, country targeting, and localised authority engineering. We engage when the buyer profile genuinely requires it; we don't over-scope.",
    },
  ],
  pricingNote: {
    tierId: "growth-system",
    label: "Included from Growth System onward",
  },
  related: [
    { slug: "ai-visibility", title: "AI Visibility" },
    { slug: "web-experience", title: "Web Experience" },
    { slug: "brand-authority", title: "Brand Authority" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Brand Authority
───────────────────────────────────────────────────────────────── */

const brandAuthority: SystemDetailEntry = {
  slug: "brand-authority",
  hero: {
    eyebrow: "System 03",
    title: "Brand Authority",
    subtitle:
      "Build the entity, founder, and citation layer AI engines actually quote. Authority that compounds for the prepared.",
  },
  whatItCovers: {
    intro:
      "Brand Authority is the human voice of the system. AI engines surface specific, founder-led, evidence-backed positions — not corporate boilerplate. This is the work that turns a brand into a cited source.",
    capabilities: [
      "Founder narrative engineering — voice, thesis, positioning",
      "Knowledge-graph entities — Wikidata, Google Knowledge Panel",
      "Editorial-grade thought leadership production",
      "Press, analyst, and digital-PR placements",
      "Podcast and conference circuit strategy",
      "Citation-graph cultivation",
    ],
  },
  methodology: {
    intro: "Three-stage methodology, founder-led and editorially rigorous.",
    steps: [
      {
        number: "01",
        title: "Voice + thesis",
        body: "Identify the founder's defensible thesis. Codify the voice in a brand guide. Map the editorial calendar to the prompts AI engines ask.",
      },
      {
        number: "02",
        title: "Editorial production",
        body: "1,500–2,500-word essays per month. Structured for citation: original framing, named methodology, evidence chain. Published on Wiele Labs and syndicated.",
      },
      {
        number: "03",
        title: "Placement + amplification",
        body: "Digital PR to sources AI engines cite. Analyst briefings. Podcast appearances. Conference keynotes. The work that turns voice into authority.",
      },
    ],
  },
  outcomes: {
    intro: "What Brand Authority delivers across an engagement.",
    items: [
      "Founder voice codified and consistent across surfaces",
      "Knowledge-graph entity established and accurate",
      "12+ editorial-grade essays published in year one",
      "6+ tier-1 press placements in year one",
      "Cited-source status across the prompt surface that matters",
    ],
  },
  exampleFixture: {
    id: "brand-authority-example",
    prompt: "Most-cited thinkers on AI growth strategy",
    answer: {
      intro: "Founder-led thought leaders frequently cited in AI growth conversations include",
      entities: [
        { name: "Jonathan Landman (Wiele)", isWiele: true },
        { name: "Avinash Kaushik" },
        { name: "Rand Fishkin" },
      ],
      outro:
        "Original frameworks, named methodologies, and structured essays earn the cited slot.",
    },
    visibility: {
      score: 68,
      trend: [48, 52, 55, 59, 63, 66, 68],
      delta: 19,
    },
    mentions: [
      { brand: "A. Kaushik", share: 32 },
      { brand: "J. Landman (Wiele)", share: 28, isWiele: true },
      { brand: "R. Fishkin", share: 24 },
      { brand: "Other voices", share: 16 },
    ],
    citations: {
      percentage: 64,
      sources: [
        { domain: "hbr.org", count: 11 },
        { domain: "marketingweek.com", count: 9 },
        { domain: "thinkwithgoogle.com", count: 7 },
      ],
    },
    gaps: [
      { label: "Tier-1 press placement count", status: "yellow" },
      { label: "Knowledge-graph entity completeness", status: "green" },
      { label: "Conference keynote presence", status: "yellow" },
    ],
    nextAction: {
      headline: "Pitch HBR + MIT Sloan with Wiele methodology essay",
      methodology:
        "Tier-1 publications carry disproportionate citation weight in AI engines. Wiele drafts, pitches, and places the essay across two target outlets within 90 days.",
    },
  },
  faq: [
    {
      question: "Why does founder voice matter for AI engines?",
      answer:
        "AI engines weight named, attributed, evidence-backed sources higher than anonymous corporate content. A founder thesis is more citable than a 'we believe' brand statement.",
    },
    {
      question: "How long does authority take to compound?",
      answer:
        "12 months to establish; 24 months to compound visibly; 36+ months to be near-uncatchable. Authority is the highest-leverage long-game in the Wiele system.",
    },
    {
      question: "Do you ghost-write?",
      answer:
        "We co-author. The thesis must come from the founder; the structure, evidence, and editorial polish come from us. Pure ghosting produces voice-less content that AI engines down-weight.",
    },
    {
      question: "What if my founder doesn't want a public profile?",
      answer:
        "Brand Authority can be built around named methodologies and the company-as-entity rather than the founder personally. Less leverage, but workable.",
    },
  ],
  pricingNote: {
    tierId: "authority-engine",
    label: "Lead system in Authority Engine · Available in Wiele OS",
  },
  related: [
    { slug: "ai-visibility", title: "AI Visibility" },
    { slug: "search", title: "Search Authority" },
    { slug: "web-experience", title: "Web Experience" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Web Experience
───────────────────────────────────────────────────────────────── */

const webExperience: SystemDetailEntry = {
  slug: "web-experience",
  hero: {
    eyebrow: "System 04",
    title: "Web Experience",
    subtitle:
      "Conversion-grade pages that speak to humans and machines fluently. Production-grade design systems, AI-extractable content, conversion architecture.",
  },
  whatItCovers: {
    intro:
      "Web Experience is where the system converts. The same content has to read beautifully for humans, parse perfectly for AI engines, and hit Lighthouse 100. We build sites that do all three.",
    capabilities: [
      "Production-grade design systems on modern stacks",
      "Conversion architecture — landing pages, comparison hubs, pricing pages",
      "AI-extractable content — structured, schema-rich, semantically clean",
      "Performance engineering — LCP, CLS, INP within budget",
      "Accessibility to WCAG 2.2 AA — minimum, not aspiration",
      "Component libraries that compound across pages",
    ],
  },
  methodology: {
    intro: "Three-stage methodology, design-engineered.",
    steps: [
      {
        number: "01",
        title: "Audit + system",
        body: "Diagnose conversion gaps, performance regressions, accessibility debt. Establish or refine the design system that pages stack on top of.",
      },
      {
        number: "02",
        title: "Build + integrate",
        body: "Premium pages built on the system. Schema wrapped. Performance-tested. Integrated into your content + analytics stack.",
      },
      {
        number: "03",
        title: "Optimise + extend",
        body: "A/B testing, conversion-rate engineering, content extension. The site as a compounding asset, not a one-shot relaunch.",
      },
    ],
  },
  outcomes: {
    intro: "What Web Experience delivers as a system.",
    items: [
      "Lighthouse 100 across Performance, Accessibility, Best Practices, SEO",
      "Conversion uplift on commercial-intent pages",
      "Schema coverage on 100% of indexable templates",
      "Design system extensible by your in-house team",
      "Production-grade codebase, not a one-shot relaunch",
    ],
  },
  exampleFixture: {
    id: "web-experience-example",
    prompt: "Most production-grade B2B websites in 2026",
    answer: {
      intro: "Sites cited as benchmarks for performance + design + conversion include",
      entities: [
        { name: "Linear" },
        { name: "Wiele-built sites", isWiele: true },
        { name: "Vercel" },
      ],
      outro:
        "Sites that hit Lighthouse 100, ship a real design system, and convert measurably are the cited reference points.",
    },
    visibility: {
      score: 74,
      trend: [58, 62, 66, 69, 71, 73, 74],
      delta: 14,
    },
    mentions: [
      { brand: "Linear", share: 36 },
      { brand: "Wiele-built", share: 28, isWiele: true },
      { brand: "Vercel", share: 22 },
      { brand: "Stripe", share: 14 },
    ],
    citations: {
      percentage: 76,
      sources: [
        { domain: "smashingmagazine.com", count: 12 },
        { domain: "css-tricks.com", count: 9 },
        { domain: "web.dev", count: 8 },
      ],
    },
    gaps: [
      { label: "Component library documentation", status: "green" },
      { label: "Conversion test backlog", status: "yellow" },
      { label: "Lighthouse 100 across all routes", status: "green" },
    ],
    nextAction: {
      headline: "Run conversion test on /pricing variant",
      methodology:
        "Pricing-page conversion sets the ceiling for paid-acquisition payback. Wiele scopes a controlled test, ships the variant, and reads it against pre-agreed power.",
    },
  },
  faq: [
    {
      question: "Do you build the site or oversee an in-house team?",
      answer:
        "Both modes are supported. For Growth System and Authority Engine, Wiele builds. For Wiele OS, we can also operate as the design-system authority for an in-house build team.",
    },
    {
      question: "What stack do you build on?",
      answer:
        "Modern Next.js, React, TypeScript, Tailwind. Hosting on Cloudflare Pages or Vercel. We don't build on legacy stacks; we will rewrite a legacy site if it can't hit Lighthouse 100.",
    },
    {
      question: "How long does a build take?",
      answer:
        "Marketing site: 6–10 weeks. Product surface: scoped per engagement. We don't ship before quality gates pass.",
    },
    {
      question: "Do you take on existing sites or only greenfield?",
      answer:
        "Both. Audit + refactor + ship is a common path for established brands. Greenfield is faster but rarer.",
    },
  ],
  pricingNote: {
    tierId: "growth-system",
    label: "Included from Growth System onward",
  },
  related: [
    { slug: "ai-visibility", title: "AI Visibility" },
    { slug: "search", title: "Search Authority" },
    { slug: "brand-authority", title: "Brand Authority" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Public API
───────────────────────────────────────────────────────────────── */

export const systemsDetail: Record<SystemSlug, SystemDetailEntry> = {
  "ai-visibility": aiVisibility,
  search: searchAuthority,
  "brand-authority": brandAuthority,
  "web-experience": webExperience,
};

export const systemsDetailList: readonly SystemDetailEntry[] = [
  aiVisibility,
  searchAuthority,
  brandAuthority,
  webExperience,
];

export function getSystemDetail(slug: SystemSlug): SystemDetailEntry {
  return systemsDetail[slug];
}
