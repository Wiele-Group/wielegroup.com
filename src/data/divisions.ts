/**
 * Agency Division content — four landing pages, one source of truth.
 * Authority: project_agency_division_pages_v1.md (founder spec 2026-05-03)
 * + Brand v2 B4 Chromaglass tier-coded accent rules.
 *
 * Each division ships as: /marketing-agency, /advertising-agency,
 * /brand-management-agency, /web-design-agency. Same component set,
 * data-driven differentiation. Tier accents map per B4 spec:
 *   Marketing  → --color-blue-core   (cool: intelligence, systems)
 *   Advertising → --color-coral-core (warm: craft, demand)
 *   Brand      → --color-chrome-mid  (neutral: precision, authority)
 *   Web        → duality-edge        (both: conversion + experience)
 */

export type DivisionTierAccent = "blue" | "coral" | "chrome" | "duality" | "electric";

export type DivisionTier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  positioning: string;
  outcomes: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
  /**
   * v3.2 — optional case-study proof link rendered beneath the tier CTA.
   * Used on /services/premium-brand-site-system to surface the matching
   * /proof/[slug] engagement archetype per tier. Agency division pages
   * leave this unset and use Division.proofCallout instead.
   */
  proofUrl?: string;
  /**
   * v3.3 — optional cross-SKU link rendered beneath the proofUrl. Used to
   * surface compounding SKUs from a tier card (first use: PBSS Sovereign
   * → AI Visibility Monitoring). Independent of the CTA so the ladder
   * remains the primary action.
   */
  stackWith?: { label: string; href: string };
};

export type DivisionService = {
  num: string;
  title: string;
  body: string;
};

export type DivisionFaq = {
  id: string;
  question: string;
  answer: string;
};

export type Division = {
  id: string;
  slug: string;
  accent: DivisionTierAccent;
  /** Eyebrow shown above the H1. */
  eyebrow: string;
  /** H1 — promise + positioning. */
  headline: string;
  /** Sub-headline — clarifies the offer in one sentence. */
  subhead: string;
  /** Hero CTA — primary action. */
  primaryCta: { label: string; href: string };
  /** Hero CTA — secondary, scrolls or links sibling. */
  secondaryCta: { label: string; href: string };
  /** Six service capabilities — what's actually delivered. */
  services: readonly DivisionService[];
  /** Three-tier sub-pricing ladder for this division. */
  tiers: readonly DivisionTier[];
  /** Three FAQ entries — division-specific objections handled. */
  faqs: readonly DivisionFaq[];
  /** SEO meta. */
  seo: {
    title: string;
    description: string;
  };
  /**
   * v3.2 — optional case-study callout rendered between the services grid
   * and the pricing ladder. Used by agency division pages to surface a
   * single engagement archetype as concrete proof before the tier table.
   * /services/premium-brand-site-system uses per-tier DivisionTier.proofUrl
   * links instead and leaves this unset.
   */
  proofCallout?: {
    eyebrow: string;
    headline: string;
    body: string;
    href: string;
    cta: string;
  };
  /**
   * v3.4.1 — optional deeper-framework callout rendered between the proof
   * callout and the pricing ladder. Surfaces the open methodology document
   * that this SKU is built on (first use: AI Visibility Monitoring →
   * /labs/ai-search-roi-operating-system). Mirrors proofCallout shape so
   * DivisionPage can render with the same component primitives.
   */
  deeperFramework?: {
    eyebrow: string;
    headline: string;
    body: string;
    href: string;
    cta: string;
  };
};

/* ─────────────────────────────────────────────────────────────
   1 · Marketing Agency
   Accent: BLUE — intelligence, systems, demand generation
───────────────────────────────────────────────────────────── */
const marketing: Division = {
  id: "marketing-agency",
  slug: "marketing-agency",
  accent: "blue",
  eyebrow: "Marketing Agency",
  headline: "Marketing as an operating system, not a campaign list.",
  subhead:
    "Strategy, audience, content, and growth — engineered as one engine, with AI Visibility Defense built into every layer. We design the system that makes every channel compound, then run it — and defend it from displacement.",
  primaryCta: { label: "Run a Growth Audit", href: "/audit" },
  secondaryCta: { label: "See pricing", href: "#tiers" },
  services: [
    {
      num: "01",
      title: "Strategy & positioning",
      body: "Category positioning, ICP hierarchy, message architecture, and the value proposition you can defend against any competitor.",
    },
    {
      num: "02",
      title: "Audience & demand modelling",
      body: "Buyer-intent maps across organic, paid, AI search, and referral. We make the demand visible before we spend money on it.",
    },
    {
      num: "03",
      title: "Content systems",
      body: "Pillar content, derivative repurposing, and editorial calendars built to compound — not freelance one-offs that vanish in a quarter.",
    },
    {
      num: "04",
      title: "Lifecycle & retention",
      body: "Email, in-product, and CRM lifecycle architecture. We close the loop between acquisition and revenue retention.",
    },
    {
      num: "05",
      title: "Marketing operations",
      body: "Stack consolidation, attribution architecture, dashboards leadership actually reads. Marketing that the CFO trusts.",
    },
    {
      num: "06",
      title: "Quarterly growth reviews",
      body: "Principal-led strategy sessions. We re-cut the system every 90 days against revenue, not vanity.",
    },
  ],
  tiers: [
    {
      id: "marketing-starter",
      name: "Strategy Sprint",
      price: "£3,500",
      cadence: "one-off · 4 weeks",
      positioning: "Diagnose your marketing system. Get the playbook before you commit.",
      outcomes: [
        "Full marketing-system audit",
        "Positioning + ICP refresh",
        "90-day growth roadmap",
        "Stack + attribution gap analysis",
        "1 principal strategy session",
      ],
      cta: { label: "Book the sprint", href: "/contact" },
    },
    {
      id: "marketing-system",
      name: "Marketing System",
      price: "£4,500",
      cadence: "/ month",
      positioning:
        "AI citation share growth target. Run the engine — strategy, content, lifecycle, ops — with AI Visibility Defense built-in.",
      outcomes: [
        "Continuous strategy + execution",
        "AI citation share growth tracking (cross-engine)",
        "Content production + repurposing",
        "Lifecycle email + retention",
        "Bi-weekly strategy reviews",
      ],
      cta: { label: "Book strategy call", href: "/contact?intent=marketing&tier=marketing-system" },
      featured: true,
    },
    {
      id: "marketing-scale",
      name: "Growth Partnership",
      price: "£8,500",
      cadence: "/ month",
      positioning:
        "Embedded principal-level partnership with AI citation guarantee for category-defining brands.",
      outcomes: [
        "Everything in Marketing System",
        "AI citation guarantee (outcome-based)",
        "Embedded fractional CMO",
        "Custom GTM motions + launches",
        "Weekly executive sessions + direct principal line",
      ],
      cta: { label: "Talk to Wiele", href: "/contact?intent=marketing&tier=growth-partnership" },
    },
  ],
  faqs: [
    {
      id: "vs-freelancers",
      question: "Why hire Wiele instead of a freelance team?",
      answer:
        "Freelancers solve tasks. Wiele engineers systems. We design the operating model, then run it — so growth keeps compounding when individual contributors change.",
    },
    {
      id: "industry-fit",
      question: "Do you only work with tech firms?",
      answer:
        "No. We work with any premium B2B or high-consideration consumer brand where the buying decision is researched, not impulsive — SaaS, professional services, fintech, creator economy, modern industrial.",
    },
    {
      id: "ramp-time",
      question: "How fast does the system produce results?",
      answer:
        "First quantified visibility lift inside 30 days. Compound results — pipeline, retention, brand recall — track on a 90-day curve. Anyone promising faster is selling promise, not methodology.",
    },
  ],
  seo: {
    title: "Marketing Agency · Wiele Group · Premium full-service marketing with AI Visibility Defense",
    description:
      "Marketing as an operating system, with AI Visibility Defense built-in. Strategy, content, lifecycle, ops, and AI citation share growth. £3,500 sprint · £4,500/mo system · £8,500/mo partnership. GBP. 30-day notice.",
  },
  proofCallout: {
    eyebrow: "Engagement archetype",
    headline: "Sovereign Cycle 01 — six-month authority engineering.",
    body: "Established premium firm. Citation share moved from 12% to 47% across four answer engines, branded search up 340%, ~£620K influenced pipeline against the modal deal value. Methodology open, engine output verifiable.",
    href: "/proof/sovereign-cycle-01",
    cta: "Read engagement",
  },
};

/* ─────────────────────────────────────────────────────────────
   2 · Advertising Agency
   Accent: CORAL — craft, demand capture, performance
───────────────────────────────────────────────────────────── */
const advertising: Division = {
  id: "advertising-agency",
  slug: "advertising-agency",
  accent: "coral",
  eyebrow: "Advertising Agency",
  headline: "Performance advertising with the craft of a brand agency.",
  subhead:
    "Paid media, creative testing, and conversion engineering — run by operators, with AI Visibility Defense across the funnel. A brand-strong ad outperforms a polished generic ten times out of ten — and a defended brand outperforms an exposed one even further.",
  primaryCta: { label: "Audit ad spend", href: "/audit" },
  secondaryCta: { label: "See pricing", href: "#tiers" },
  services: [
    {
      num: "01",
      title: "Channel strategy",
      body: "Google, Meta, LinkedIn, YouTube, programmatic — sequenced for the buying journey, not bought because the platform calls them growth channels.",
    },
    {
      num: "02",
      title: "Creative engineering",
      body: "Hooks, angles, ad concepts. Performance creative that's also brand-on-tone — because forgettable ads are the most expensive kind.",
    },
    {
      num: "03",
      title: "Audience modelling",
      body: "Lookalike laddering, custom audiences, lifecycle exclusions. Spend lands in front of buyers, not your existing customer list.",
    },
    {
      num: "04",
      title: "Conversion tracking",
      body: "First-party tracking, server-side tagging, attribution that survives cookie deprecation. We measure what's real, not what's reported.",
    },
    {
      num: "05",
      title: "Landing-page systems",
      body: "Ad-LP coherence, instant-load builds, conversion architecture. The ad and the page work as one asset.",
    },
    {
      num: "06",
      title: "Weekly optimisation",
      body: "Live creative testing, bid pacing, budget reallocation. Operator-led, not algorithm-prayed.",
    },
  ],
  tiers: [
    {
      id: "advertising-audit",
      name: "Spend Audit",
      price: "£3,500",
      cadence: "one-off · 3 weeks",
      positioning: "Diagnose what's working, what's leaking, what to fix before scaling spend.",
      outcomes: [
        "Full audit across active channels",
        "Creative + targeting + tracking review",
        "Wasted-spend quantification",
        "30-day optimisation roadmap",
        "Principal review session",
      ],
      cta: { label: "Book the audit", href: "/contact" },
    },
    {
      id: "advertising-management",
      name: "Performance Engine",
      price: "£4,500",
      cadence: "/ month + media spend",
      positioning:
        "Guaranteed CPL ceiling. Full-stack paid acquisition with AI Visibility Defense across creative, tracking, and landing surface.",
      outcomes: [
        "Guaranteed CPL ceiling (outcome-based)",
        "Up to 3 active channels",
        "Continuous creative production",
        "Server-side tracking + attribution",
        "Bi-weekly strategy reviews",
      ],
      cta: { label: "Book strategy call", href: "/contact?intent=advertising&tier=performance-engine" },
      featured: true,
    },
    {
      id: "advertising-scale",
      name: "Scale Partnership",
      price: "£8,500",
      cadence: "/ month + media spend",
      positioning:
        "Embedded performance team with ROAS floor commitment for brands scaling past £100k/mo media.",
      outcomes: [
        "ROAS floor commitment (outcome-based)",
        "Everything in Performance Engine",
        "Up to 6 active channels",
        "Dedicated creative team + custom attribution",
        "Weekly executive performance review",
      ],
      cta: { label: "Talk to Wiele", href: "/contact?intent=advertising&tier=scale-partnership" },
    },
  ],
  faqs: [
    {
      id: "spend-included",
      question: "Is media spend included in the fee?",
      answer:
        "No. Wiele's fee and your media spend are separate line items. We don't take a percentage of spend — that incentivises overspending. Flat retainer aligns us to performance, not budget.",
    },
    {
      id: "min-spend",
      question: "Is there a minimum ad spend to work with you?",
      answer:
        "We recommend £20k/mo minimum to make the engagement economically rational for both sides. Below that, the Spend Audit + DIY playbook is the better-fit move.",
    },
    {
      id: "creative",
      question: "Do you produce the creative or do we?",
      answer:
        "We produce. Continuous creative testing is the fastest path to scale, and outsourcing it back to an in-house team breaks the velocity. We embed your brand voice via the Brand Management agency engagement when it runs alongside.",
    },
  ],
  seo: {
    title: "Advertising Agency · Wiele Group · Performance with brand craft + AI Visibility Defense",
    description:
      "Performance advertising done with brand craft, with AI Visibility Defense across creative + tracking. Guaranteed CPL ceiling. £3,500 audit · £4,500/mo engine · £8,500/mo scale. GBP. 30-day notice.",
  },
  proofCallout: {
    eyebrow: "Engagement archetype",
    headline: "Sovereign Cycle 01 — full-stack authority engineering.",
    body: "Six-month concierge engagement with paid acceleration, citation graph engineering, comparison-page system, and monthly engine reporting against a named competitor set. Citation share 12% → 47%, featured snippet captures 0/12 → 8/12.",
    href: "/proof/sovereign-cycle-01",
    cta: "Read engagement",
  },
};

/* ─────────────────────────────────────────────────────────────
   3 · Brand Management Agency
   Accent: CHROME — precision, authority, premium positioning
───────────────────────────────────────────────────────────── */
const brand: Division = {
  id: "brand-management-agency",
  slug: "brand-management-agency",
  accent: "chrome",
  eyebrow: "Brand Management Agency",
  headline: "Brand as a precision instrument. Built to last decades, not quarters.",
  subhead:
    "Positioning, narrative, and perception control engineered for category authority — with AI Visibility Defense protecting every owned channel from displacement and prompt-injection drift. Premium firms hire us when they need to move from known to chosen — and stay chosen.",
  primaryCta: { label: "Audit your brand", href: "/audit" },
  secondaryCta: { label: "See pricing", href: "#tiers" },
  services: [
    {
      num: "01",
      title: "Category positioning",
      body: "Define the category you compete in, the position you hold inside it, and the language you defend at the boardroom level.",
    },
    {
      num: "02",
      title: "Narrative architecture",
      body: "Founder story, company story, product story — engineered to ladder. The narrative every press release, deck, and homepage drafts from.",
    },
    {
      num: "03",
      title: "Visual identity systems",
      body: "Logo, type, colour, motion, photography — designed as one coherent system, documented as a living guideline a team can actually use.",
    },
    {
      num: "04",
      title: "Voice & tone",
      body: "Written-voice guidelines, register controls, the difference between sounding professional and sounding like you. Built so every writer on your team produces in-brand work.",
    },
    {
      num: "05",
      title: "Authority engineering",
      body: "Press, podcasts, panels, op-eds. Earned-media placements that compound brand authority and feed AI-search citation surface.",
    },
    {
      num: "06",
      title: "Brand stewardship",
      body: "Quarterly perception reviews. We watch how the market actually receives your brand — surveys, sentiment, search behaviour — and tune the system.",
    },
  ],
  tiers: [
    {
      id: "brand-audit",
      name: "Positioning Audit",
      price: "£4,000",
      cadence: "one-off · 4 weeks",
      positioning: "Diagnose your brand's market position before investing in identity work.",
      outcomes: [
        "Competitor positioning map",
        "Narrative + voice audit",
        "Visual identity assessment",
        "Authority surface review",
        "Strategic recommendations brief",
      ],
      cta: { label: "Book the audit", href: "/contact" },
    },
    {
      id: "brand-system",
      name: "Brand System",
      price: "£4,500",
      cadence: "/ month",
      positioning:
        "Branded query lift target. Continuous positioning, narrative, identity, and AI authority stewardship.",
      outcomes: [
        "Branded query lift target (outcome-based)",
        "Quarterly positioning reviews",
        "Continuous narrative + voice work",
        "Visual identity stewardship",
        "Authority placement programme + bi-weekly reviews",
      ],
      cta: { label: "Book strategy call", href: "/contact?intent=brand&tier=brand-system" },
      featured: true,
    },
    {
      id: "brand-rebrand",
      name: "Brand Rebirth",
      price: "£45,000+",
      cadence: "fixed scope · 12-16 weeks",
      positioning: "Full brand rebuild — positioning, identity, system — for category repositioning.",
      outcomes: [
        "Full brand strategy + positioning",
        "Complete visual identity build",
        "Voice + narrative architecture",
        "Brand guideline + asset system",
        "Launch + activation programme",
      ],
      cta: { label: "Scope a rebrand", href: "/contact" },
    },
  ],
  faqs: [
    {
      id: "vs-design-studio",
      question: "How is this different from a brand design studio?",
      answer:
        "Studios deliver assets. We manage the system. The visual identity is one output among many — what we maintain is the strategic position, the narrative, the perception, and the authority surface across years.",
    },
    {
      id: "rebrand-timing",
      question: "When does a brand need a rebirth versus stewardship?",
      answer:
        "Rebirth when the position shifts (new market, new product, post-merger, post-funding). Stewardship when the position is right but the execution drifts. The Positioning Audit makes the call.",
    },
    {
      id: "with-marketing",
      question: "Do we need both Brand Management and Marketing Agency?",
      answer:
        "Often, yes. Brand Management defines what the company stands for; Marketing Agency turns that into demand. Both run in parallel for maximum compound effect — but either works standalone.",
    },
  ],
  seo: {
    title: "Brand Management Agency · Wiele Group · Category authority + AI Visibility Defense",
    description:
      "Brand as a precision instrument, with AI Visibility Defense protecting every owned channel. Branded query lift target. £4,000 audit · £4,500/mo system · £45k+ rebrand. GBP.",
  },
  proofCallout: {
    eyebrow: "Engagement archetype",
    headline: "Sovereign Cycle 01 — register coherence across every owned surface.",
    body: "Established firm losing the AI-comparison shortlist. Six-month brand authority engineering: tier-1 placement, founder-voice content engine, comparison-page system, register coherence pass. Citation share 12% → 47%, branded search +340%, founder-name search overtook firm name as primary entry point.",
    href: "/proof/sovereign-cycle-01",
    cta: "Read engagement",
  },
};

/* ─────────────────────────────────────────────────────────────
   4 · Web Design Agency
   Accent: DUALITY — conversion + experience, both forces
───────────────────────────────────────────────────────────── */
const web: Division = {
  id: "web-design-agency",
  slug: "web-design-agency",
  accent: "duality",
  eyebrow: "Web Design Agency",
  headline: "Websites engineered to convert. Designed to be remembered.",
  subhead:
    "Premium digital experiences built on Next.js + Cloudflare, with AI Visibility Defense built into every owned surface. Conversion architecture, design systems, performance engineering, AI-extractable content — shipped fast, owned forever, defended continuously.",
  primaryCta: { label: "Scope a project", href: "/contact" },
  secondaryCta: { label: "See pricing", href: "#tiers" },
  services: [
    {
      num: "01",
      title: "Conversion strategy",
      body: "Information architecture, page-flow design, CTA hierarchy — engineered against the funnel, not the trend deck.",
    },
    {
      num: "02",
      title: "Visual design systems",
      body: "Premium design systems with token grids, motion specs, accessibility built-in. Documented so your team can extend without breaking the system.",
    },
    {
      num: "03",
      title: "Engineering",
      body: "Next.js + TypeScript + Tailwind + Cloudflare Workers. Production-grade builds with the performance and the polish — no compromise.",
    },
    {
      num: "04",
      title: "Performance engineering",
      body: "LCP under 2.5s. CLS under 0.05. Lighthouse 90+ across the board. We build to the metrics search engines and AI agents reward.",
    },
    {
      num: "05",
      title: "CMS architecture",
      body: "Sanity, Contentful, MDX-native, or custom — chosen for the team that maintains it, not the agency that ships it.",
    },
    {
      num: "06",
      title: "Continuous improvement",
      body: "Post-launch testing, conversion optimisation, design-system extension. Sites stop being projects and become products.",
    },
  ],
  tiers: [
    {
      id: "web-landing",
      name: "Landing System",
      price: "£12,000+",
      cadence: "fixed scope · 4-6 weeks",
      positioning: "High-conversion campaign or product landing system. Single site, fast ship.",
      outcomes: [
        "Conversion strategy + IA",
        "Design system foundation",
        "Production build (Next.js + CF)",
        "Performance + a11y QA",
        "Launch + 30-day optimisation",
      ],
      cta: { label: "Scope the project", href: "/contact" },
    },
    {
      id: "web-build",
      name: "Site Rebuild",
      price: "£35,000+",
      cadence: "fixed scope · 8-12 weeks",
      positioning:
        "Conversion rate floor. Full premium-stack rebuild with AI-extractable architecture and AI Visibility Defense surface monitoring.",
      outcomes: [
        "Conversion rate floor (outcome-based)",
        "Full IA + conversion architecture",
        "Complete design system + AI-extractable content layer",
        "Production build (15-30 routes)",
        "Launch + 90-day optimisation + AI crawler posture audit",
      ],
      cta: { label: "Scope a rebuild", href: "/contact?intent=web&tier=site-rebuild" },
      featured: true,
    },
    {
      id: "web-platform",
      name: "Platform Build",
      price: "£75,000+",
      cadence: "fixed scope · 12-20 weeks",
      positioning: "Full digital-platform build: marketing site + product surfaces + dashboards.",
      outcomes: [
        "Everything in Site Rebuild",
        "Authenticated product surfaces",
        "Dashboard + admin builds",
        "Stripe / billing integration",
        "Embedded engineering team",
      ],
      cta: { label: "Talk to Wiele", href: "/contact" },
    },
  ],
  faqs: [
    {
      id: "tech-stack",
      question: "Why Next.js + Cloudflare instead of WordPress / Webflow?",
      answer:
        "Performance, ownership, and longevity. Premium brands need sites that feel premium, score top of Lighthouse, and don't become someone else's hostage. Next.js + Cloudflare delivers all three. We migrate from WP / Webflow / Framer regularly.",
    },
    {
      id: "ongoing",
      question: "Do you maintain the site after launch?",
      answer:
        "Optionally. Many clients pair the build with a Marketing System retainer for ongoing optimisation. For pure technical stewardship, we offer a fixed monthly maintenance plan separately — ask in scoping.",
    },
    {
      id: "design-control",
      question: "Can we direct the design or do you?",
      answer:
        "Both. We lead because that's what you hired us for, but the design system is documented and yours from day one. Your team extends, your team owns. No agency lock-in.",
    },
  ],
  seo: {
    title: "Web Design Agency · Wiele Group · Premium digital builds with AI Visibility Defense",
    description:
      "Premium digital experiences with AI Visibility Defense built into every owned surface. Conversion rate floor. Next.js + Cloudflare. £12k landing · £35k rebuild · £75k+ platform. Performance-first.",
  },
  proofCallout: {
    eyebrow: "Engagement archetype",
    headline: "Foundation Cycle 01 — Premium Brand Site System six-week reset.",
    body: "Boutique premium services firm. Legacy WordPress estate replaced with token-first Next.js + Cloudflare build, schema substrate, entity hygiene, AI Defense headers. AI citation 0 → 3 of 4 engines at 60 days, branded search +180%, 7 inbound qualified enquiries in first 30 days against zero in trailing ninety.",
    href: "/proof/foundation-cycle-01",
    cta: "Read engagement",
  },
};

export const divisions: readonly Division[] = [marketing, advertising, brand, web];

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug);
}
