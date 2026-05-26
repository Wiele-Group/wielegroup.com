/**
 * Productized Service Offers — premium SKUs under Wiele agency divisions.
 * Authority: project_wiele_design_blueprint_filed.md (founder spec 2026-05-07)
 * + project_v3_pricing_overhaul_shipped.md (v3.0 pricing ladder)
 * + V3-3-AI-VISIBILITY-MONITORING-DIRECTIVE.md (2026-05-08).
 *
 * Each service ships at /services/{slug}. Re-uses the Division type
 * + DivisionPage component for layout consistency, schema generation,
 * and B4 Chromaglass tier-coded accents.
 *
 * 1 · Premium Brand Site System
 *     The productized Web Design Agency flagship.
 *     Token-first architecture · 5-mode delivery · AI revision credits
 *     · contractual Core Web Vitals SLA. Lifted from Wiele Design v1
 *     blueprint as immediate-revenue agency value (vs Year-2 SaaS build).
 *
 * 2 · AI Visibility Monitoring (v3.3 — 2026-05-08)
 *     The first Wiele recurring monitoring SKU. Lite €2.5K · Standard
 *     €4K · Pro €6K /mo. Compounds with every Authority and Sovereign
 *     retainer. Source-of-truth: SOP at _OPERATIONS/
 *     ai-visibility-monitoring-sop/ v1.0.
 */

import type { Division } from "./divisions";

/* ─────────────────────────────────────────────────────────────
   1 · Premium Brand Site System
   Accent: DUALITY — conversion + experience, both forces
   Anchor under Web Design Agency division.
───────────────────────────────────────────────────────────── */
const premiumBrandSiteSystem: Division = {
  id: "premium-brand-site-system",
  slug: "premium-brand-site-system",
  accent: "duality",
  eyebrow: "Premium Brand Site System",
  headline: "The website is not the product. The system is.",
  subhead:
    "Token-first architecture, AI-native delivery, contractual Core Web Vitals SLAs — built to compound, not decay. Most agencies hand you a beautiful site that drifts the moment they leave. Wiele hands you the operating system underneath it. Owned by you. Defended by us. Designed to outlast every refresh cycle.",
  primaryCta: { label: "Book a Strategic Review", href: "/contact?intent=premium-brand-site-system" },
  secondaryCta: { label: "See pricing", href: "#tiers" },
  services: [
    {
      num: "01",
      title: "Token-first architecture",
      body: "Colors, typography, spacing, radius, motion — all live as design tokens, not hardcoded styles. New pages don't break the system. Brand drift is mathematically impossible. Six months in, your site looks as deliberate as the day it launched.",
    },
    {
      num: "02",
      title: "Five-mode delivery framework",
      body: "Structure · Design · Content · Data · Publish. Every build progresses through five gated modes, each with its own client deliverable and sign-off. You always know what's shipping. No black box. No agency mystery.",
    },
    {
      num: "03",
      title: "AI-Search-Native engineering",
      body: "Built to be cited by ChatGPT, Gemini, Perplexity, and Claude — not just ranked on Google. Schema.org enforcement, llms.txt automation, AI-extractable content blocks, citation-engineered content layer. The site competes in the discovery model that's actually emerging.",
    },
    {
      num: "04",
      title: "AI revision credits",
      body: "AI is a resource you own, not magic happening behind the curtain. Every retainer includes metered credits — copy rewrites, section regenerations, image generation, SEO audits. Visible, measurable, accountable. The opposite of black-box agency hours.",
    },
    {
      num: "05",
      title: "Contractual Core Web Vitals SLA",
      body: "LCP ≤ 2.5s. INP ≤ 200ms. CLS ≤ 0.1. WCAG 2.2 AA. SEO completeness gate — meta, schema, alt text, heading hierarchy, sitemap, llms.txt all green before launch. Most agencies don't measure these. We sign for them.",
    },
    {
      num: "06",
      title: "Owned forever, defended continuously",
      body: "Next.js + Cloudflare. No platform lock-in. Your team inherits structure, not chaos — token system, component library, design documentation, deployment pipeline, all yours from day one. We then defend the surface against AI-search displacement on retainer.",
    },
  ],
  tiers: [
    {
      id: "pbss-foundation",
      name: "Foundation Build",
      price: "€18,000",
      cadence: "fixed scope · 6-8 weeks",
      positioning:
        "Token system + 8-12 page production build + AI-Search-Native architecture + CWV SLA-backed launch. The system installed.",
      outcomes: [
        "Token-first design system foundation",
        "5-mode delivery (Structure → Publish)",
        "8-12 page Next.js + Cloudflare production build",
        "AI-Search-Native content layer + llms.txt + schema.org",
        "Contractual CWV SLA launch (LCP / INP / CLS / WCAG / SEO)",
      ],
      cta: { label: "Scope the foundation", href: "/contact?intent=premium-brand-site-system&tier=foundation" },
      proofUrl: "/proof/foundation-cycle-01",
    },
    {
      id: "pbss-authority",
      name: "Authority Retainer",
      price: "€14,000",
      cadence: "/ month",
      positioning:
        "Full agency partnership. Continuous evolution, multi-property scope, 1,200 AI revision credits, performance and AI-defense monitoring. The system run for you.",
      outcomes: [
        "1,200 AI revision credits / month",
        "80 section regenerations · 40 page builds · 60 image generations",
        "Continuous CWV + SEO monitoring (live SLA)",
        "AI Visibility Defense — citation tracking, prompt-injection surface audit",
        "Conversion optimisation + design-system extension",
      ],
      cta: { label: "Talk about the retainer", href: "/contact?intent=premium-brand-site-system&tier=authority" },
      featured: true,
      // No Authority-specific anchor yet — directs to /proof index per V3-2 §4.5.
      proofUrl: "/proof",
    },
    {
      id: "pbss-sovereign",
      name: "Sovereign Concierge",
      price: "€45,000",
      cadence: "/ month",
      positioning:
        "Founder-level access. Unlimited AI revision credits. Private AI routing. Embedded brand-defense engineering. Reserved for premium brands operating at category-leader scale.",
      outcomes: [
        "Unlimited AI revision credits",
        "Private AI routing (no shared infrastructure)",
        "Embedded brand-defense engineering team",
        "Multi-domain + multi-language scope",
        "Direct founder access · 24-hour response SLA",
      ],
      cta: { label: "Apply for Sovereign", href: "/contact?intent=premium-brand-site-system&tier=sovereign" },
      proofUrl: "/proof/sovereign-cycle-01",
      // v3.3 — surfaces the AI Visibility Monitoring retainer as the
      // compounding monitoring layer for Sovereign clients. Per V3.3 §4.7.
      stackWith: { label: "Stack with AI Visibility Monitoring", href: "/services/ai-visibility-monitoring" },
    },
  ],
  faqs: [
    {
      id: "vs-webflow-framer",
      question: "Why Wiele instead of Webflow, Framer, or a freelance build?",
      answer:
        "Webflow and Framer hand you a template-shop build on someone else's platform. Freelancers hand you a custom site with no system underneath. Wiele hands you a token-first design system, AI-Search-Native architecture, and a contractual performance guarantee — built on Next.js + Cloudflare, owned by you, defended on retainer. The difference shows up six months in, when the others have started decaying.",
    },
    {
      id: "cwv-sla",
      question: "What happens if the site misses a Core Web Vitals SLA?",
      answer:
        "It doesn't ship. Period. Every Wiele build runs Lighthouse + axe-core gates as the final pre-launch step. If LCP > 2.5s, INP > 200ms, CLS > 0.1, or any WCAG 2.2 AA failure shows, the build is held until corrected. Once live, retainer clients get continuous monitoring with same-week remediation if a regression appears.",
    },
    {
      id: "ai-credits",
      question: "What are AI revision credits and why do they matter?",
      answer:
        "AI is now the most expensive variable cost in any premium agency build. Most agencies hide that cost in their hourly rate. Wiele meters it: 1 inline rewrite = 1 credit, 1 section regeneration = 5, 1 page rebuild = 15, 1 image generation = 10. You see exactly what AI is producing for you each month. It's the operating model SaaS will run on by 2027 — we're running it now.",
    },
  ],
  seo: {
    title: "Premium Brand Site System · Wiele Group · Token-first builds with contractual CWV SLA",
    description:
      "Token-first architecture · 5-mode delivery · AI revision credits · contractual Core Web Vitals SLA. Premium brand websites built to compound, not decay. €18k Foundation · €14k/mo Authority · €45k/mo Sovereign. Built on Next.js + Cloudflare. AI-Search-Native by default.",
  },
  directAnswer: {
    eyebrow: "Direct answer",
    headline: "What is the Wiele Premium Brand Site System?",
    body: "The Premium Brand Site System is Wiele's flagship web design and engineering SKU — a token-first, AI-Search-Native production build on Next.js and Cloudflare, backed by a contractual Core Web Vitals SLA. It delivers the technical substrate that makes a brand citeable by ChatGPT, Gemini, Perplexity, and Claude — not just ranked on Google. Three engagement shapes: Foundation Build at €18,000 fixed-fee over 6–8 weeks, Authority Retainer at €14,000 per month for continuous evolution, and Sovereign Concierge at €45,000 per month for category-leader brands requiring private AI routing and embedded brand-defense engineering.",
  },
  audienceItems: [
    "Premium B2B brands replacing legacy WordPress or Webflow estates",
    "Founders and CMOs whose sites are invisible to AI-generated answers",
    "Category-leader firms preparing for AI-search-first buyer journeys",
    "Brands requiring contractual performance guarantees (LCP · INP · CLS · WCAG 2.2 AA)",
    "Marketing and brand agencies delivering AI-native web builds for premium clients",
    "Multi-domain, multi-language brands operating at Sovereign scale",
  ],
  deeperFramework: {
    eyebrow: "Methodology",
    headline: "Built on the Wiele AI Search ROI Operating System.",
    body: "The Foundation Build installs the technical substrate the ROI Operating System runs on: entity reconciliation, schema layer, llms.txt, sitemap, IndexNow, Core Web Vitals tuning. The Authority Retainer runs the editorial engine and visibility compounding loop. Read the full operating system to understand what you are buying — every deliverable ladders back to it.",
    href: "/labs/ai-search-roi-operating-system",
    cta: "Read the operating system",
  },
  internalLinks: [
    {
      label: "AI Visibility Audit",
      description: "One-shot diagnostic: where your brand stands today across ChatGPT, Gemini, Perplexity, and Claude — with a gap analysis and 30-day roadmap. The recommended entry point before scoping a Foundation Build.",
      href: "/audit",
    },
    {
      label: "For Premium Brands",
      description: "How Wiele engineers AI visibility for premium brands directly — entity trust, citation architecture, answer-engine monitoring. The Foundation Build installs the technical substrate this page describes.",
      href: "/for-brands",
    },
    {
      label: "For AEO & GEO Agencies",
      description: "How Wiele Group works as a capability layer for agencies. The Premium Brand Site System is the flagship build SKU within the agency delivery stack.",
      href: "/for-agencies",
    },
    {
      label: "AI Visibility Monitoring",
      description: "The recurring retainer that defends the citation surface after the Foundation Build ships. Monthly engine runs, citation share tracking, named-competitor comparison, action queue. Stack with any tier.",
      href: "/services/ai-visibility-monitoring",
    },
    {
      label: "Web Design Agency",
      description: "The Wiele Web Design Agency overview — engagement shapes, philosophy, and the full scope of what we build. The Premium Brand Site System is the productized SKU from this division.",
      href: "/web-design-agency",
    },
    {
      label: "Pricing",
      description: "Full Wiele pricing ladder — Signal Audit through Sovereign. The Foundation Build and Authority Retainer live inside the six-tier ladder. See how the tiers stack.",
      href: "/pricing",
    },
    {
      label: "Stage 1 — Entity Resolution",
      description:
        "The technical substrate of the Foundation Build installs the entity layer first: schema sameAs, structured identity signals, llms.txt, knowledge-graph footprint. Understand Stage 1 before scoping the build.",
      href: "/citation-brief/stage-1-entity-resolution",
    },
    {
      label: "Stage 3 — Structured Extractability",
      description:
        "How AI engines decide whether your content is safe to quote. The Foundation Build engineers the extractability layer — schema markup, answer blocks, heading hierarchy, citation-ready prose. Understand Stage 3 to understand what the build delivers.",
      href: "/citation-brief/stage-3-structured-extractability",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   2 · AI Visibility Monitoring
   Accent: ELECTRIC — AI visibility surface, citation engineering register
   The first Wiele recurring monitoring SKU. Compounds with every
   Authority and Sovereign retainer. Audit ≠ Monitoring (catalog clarity
   discipline encoded in SOP §09 — Audit is one-shot entry SKU,
   Monitoring is recurring retention SKU).
   Source-of-truth: /Wiele Group Operations/_OPERATIONS/ai-visibility-monitoring-sop/ v1.0
───────────────────────────────────────────────────────────── */
const aiVisibilityMonitoring: Division = {
  id: "ai-visibility-monitoring",
  slug: "ai-visibility-monitoring",
  accent: "electric",
  eyebrow: "AI Visibility Monitoring",
  headline: "Citations compound. We measure what compounds.",
  subhead:
    "The first Wiele recurring monitoring retainer. Every month, your brand is tracked across ChatGPT, Gemini, Perplexity, and Claude — citation share, prompt coverage, source weight, named-competitor share, branded search lift. Methodology open. Every metric replayable from the citation log. Founder reviews every report. The compounding loop, instrumented.",
  primaryCta: { label: "Start AI Visibility Audit", href: "/audit" },
  secondaryCta: { label: "Book Strategy Call", href: "/contact" },
  services: [
    {
      num: "01",
      title: "Four-engine monthly run",
      body: "ChatGPT, Gemini, Perplexity, Claude — fresh sessions, no logged-in personalisation, full panel run within a 48-hour window. The web app is what buyers see; the web app is what we measure. Every output captured verbatim, every citation logged with source URL, source weight tier, mention type, and timestamp.",
    },
    {
      num: "02",
      title: "Versioned prompt panel",
      body: "25 prompts (Lite), 60 (Standard), or 100 (Pro). Branded · commercial-investigation · comparison · service-specific · local · methodology. Signed off by you at kickoff, re-reviewed every quarter. Mid-quarter changes forbidden — comparability is the product.",
    },
    {
      num: "03",
      title: "Citation share + source weight",
      body: "Citation share per engine, per month, four-engine average. Source weight tiered (tier-1 named press · tier-2 credible secondary · tier-3 general web · owned). Ten tier-3 citations are not equivalent to one tier-1 citation. Most monitoring services don't make the distinction. We do.",
    },
    {
      num: "04",
      title: "Named competitor tracking",
      body: "3 competitors (Standard) or 5 (Pro). Their citation share against the same panel, same engines, same month. The firm is in relative terms with named competitors, not absolute terms with the engines. Whether you're winning depends on whether the share gap is closing or widening.",
    },
    {
      num: "05",
      title: "Action queue, prioritised by score",
      body: "Top 3 actions (Lite), 5 (Standard), 10 (Pro · 8 you execute · 2 we execute). Every action scored on Impact × Confidence × Effort_inverse. Every action ties to a specific signal in this month's run. Every action ships with a spec (Standard + Pro). No filler. No generic 'publish more content' recommendations.",
    },
    {
      num: "06",
      title: "Founder-reviewed monthly report + QBR",
      body: "Every monthly report reviewed and signed by the founder before send. Closing paragraph is founder's actual read of the month — not marketing. Quarterly Business Review (60 min Standard, 90 min Pro) reads the quarter at altitude and decides compound / expand / restructure. Lite gets a quarterly summary appended to month-three report.",
    },
  ],
  tiers: [
    {
      id: "avm-lite",
      name: "Lite",
      price: "€2,500",
      cadence: "/ month",
      positioning:
        "Boutique premium services firms ready to compound visibility. 25-prompt panel, four engines monthly, top 3 actions, 30-min monthly review. The retainer floor.",
      outcomes: [
        "25-prompt panel · branded + commercial-investigation",
        "4 engines (ChatGPT · Gemini · Perplexity · Claude) · monthly run",
        "Citation share + prompt coverage + source weight",
        "Branded search trend (Search Console)",
        "Action queue · top 3 actions · client executes",
        "Monthly PDF report · founder-signed · 30-min review call",
      ],
      cta: { label: "Start with Lite", href: "/contact?intent=ai-visibility-monitoring&tier=lite" },
      proofUrl: "/proof/foundation-cycle-01",
    },
    {
      id: "avm-standard",
      name: "Standard",
      price: "€4,000",
      cadence: "/ month",
      positioning:
        "Established firms in active competitive battles. 60 prompts across 3-5 categories, 3 named competitors tracked, modelled influenced pipeline, live dashboard, quarterly QBR. The modal Wiele Monitoring tier.",
      outcomes: [
        "60-prompt panel · 3-5 categories",
        "3 named competitors · citation share comparison",
        "Live Looker Studio dashboard · read-only client access",
        "Modelled influenced pipeline (light) · CRM-tagged",
        "Action queue · top 5 · spec doc per action · client executes",
        "60-min Quarterly Business Review with founder",
      ],
      cta: { label: "Talk about Standard", href: "/contact?intent=ai-visibility-monitoring&tier=standard" },
      featured: true,
      proofUrl: "/proof/sovereign-cycle-01",
    },
    {
      id: "avm-pro",
      name: "Pro",
      price: "€6,000",
      cadence: "/ month",
      positioning:
        "Category-leader firms in fast-moving competitive surfaces. 100 prompts, bi-weekly engine runs, 5 competitors, featured snippet tracking, full influenced pipeline modelling, 2 Wiele-executed quick wins per month, 90-min founder time, Slack channel. The instrumented edge.",
      outcomes: [
        "100-prompt panel · full category surface",
        "Bi-weekly engine runs · 5 named competitors tracked",
        "Featured snippet capture tracking (10-15 flagged queries)",
        "Full influenced pipeline modelling · win rate vs other inbound",
        "Action queue · top 10 · 8 client + 2 Wiele-executed quick wins",
        "90-min Quarterly Business Review · 90-min ad-hoc founder time · Slack channel",
      ],
      cta: { label: "Apply for Pro", href: "/contact?intent=ai-visibility-monitoring&tier=pro" },
      proofUrl: "/proof/sovereign-cycle-01",
    },
  ],
  faqs: [
    {
      id: "audit-vs-monitoring",
      question: "How is Monitoring different from your AI Visibility Audit?",
      answer:
        "Audit is one-shot — a single point-in-time diagnosis of where your brand sits in AI engine output today, with a gap analysis. Audit identifies the gap. Monitoring closes it month over month. The Audit is the entry SKU; Monitoring is the retention SKU. Most clients run an Audit first, then move into Monitoring once the gap is mapped. The two are not interchangeable and not bundled — clear ladder.",
    },
    {
      id: "what-not-included",
      question: "What does Monitoring NOT do?",
      answer:
        "It does not run paid media, write or publish content on your behalf, rebuild your website, handle digital PR outreach, or guarantee specific citation share outcomes. Authority retainer is the SKU for editorial + citation-graph engineering; Foundation is for site rebuilds; Sovereign is for full-stack authority including PR. Monitoring measures, prioritises action, and reports. Tier integrity protects the entire ladder.",
    },
    {
      id: "methodology-open",
      question: "Can I audit your methodology?",
      answer:
        "Yes. Every metric in every monthly report is replayable from the citation log we maintain for your account — on request. The full methodology is published at wielegroup.com/trust. We track four engines via their public web apps in fresh sessions, log every output verbatim, score citations into four source-weight tiers, and report measured lift (citation share, prompt coverage, source weight, branded search) separately from modelled attribution (influenced pipeline). The standard isn't a value-add; it's the floor.",
    },
  ],
  seo: {
    title: "AI Visibility Monitoring · Wiele Group · Recurring retainer for ChatGPT, Gemini, Perplexity, Claude citation tracking",
    description:
      "Recurring monitoring across ChatGPT, Gemini, Perplexity, and Claude. Citation share, source weight, named competitor tracking, action queue, monthly founder-signed report, quarterly business review. Methodology open — every metric replayable. Lite €2,500/mo · Standard €4,000/mo · Pro €6,000/mo. 6-month minimum.",
  },
  deeperFramework: {
    eyebrow: "Open methodology",
    headline: "Built on the Wiele AI Search ROI Operating System.",
    body: "This monitoring retainer is the recurring SKU layer of an integrated framework: 6-layer KPI taxonomy, dashboard architecture, ROI templates, productization sequence, quarterly compound/expand/restructure decision, 36-month roadmap, risk register. Read the full operating system before you engage — every metric in the monthly report ladders back to it.",
    href: "/labs/ai-search-roi-operating-system",
    cta: "Read the operating system",
  },
  directAnswer: {
    eyebrow: "Direct answer",
    headline: "What is AI Visibility Monitoring?",
    body: "AI Visibility Monitoring is a recurring retainer that tracks where a brand appears, disappears, or gets cited inside AI-generated answers across ChatGPT, Gemini, Perplexity, and Claude. Every month, a structured panel of buyer-intent prompts runs across all four engines. The output is a citation share score, source weight breakdown, named-competitor comparison, prioritised action queue, and a founder-signed report. The methodology is open — every metric is replayable from the citation log.",
  },
  audienceItems: [
    "AEO and GEO agencies monitoring AI visibility for clients",
    "SEO agencies expanding into answer-engine deliverables",
    "Premium B2B firms in competitive AI-search categories",
    "Brand and marketing agencies building AI visibility reporting",
    "Founders and marketing leads who need to know where they stand in AI answers",
    "Businesses preparing for AI-search-first buyer journeys",
  ],
  internalLinks: [
    {
      label: "AI Visibility Audit",
      description: "One-shot diagnostic: where your brand stands today across four AI engines, with a gap analysis and 30-day roadmap. The recommended entry point before committing to Monitoring.",
      href: "/audit",
    },
    {
      label: "For AEO & GEO Agencies",
      description: "How Wiele Group works as an AI-search capability layer for agencies — including the strategy, audit frameworks, and delivery architecture for client work.",
      href: "/for-agencies",
    },
    {
      label: "For Premium Brands",
      description: "AI search visibility engineered for brands that need to appear in AI-generated answers — entity trust, citation architecture, and monthly monitoring.",
      href: "/for-brands",
    },
    {
      label: "Pricing",
      description: "Full Wiele pricing ladder — Signal Audit, Launch, Growth, Authority, Wiele OS, Sovereign. Monitoring is the recurring layer that stacks with every tier.",
      href: "/pricing",
    },
    {
      label: "Premium Brand Site System",
      description: "The Wiele web design flagship — AI-Search-Native architecture, contractual Core Web Vitals SLA. Stack with Monitoring for the full visibility-plus-defence system.",
      href: "/services/premium-brand-site-system",
    },
    {
      label: "Stage 1 — Entity Resolution",
      description:
        "The foundation of AI citation — whether engines can unambiguously identify your brand as a distinct entity. AI Visibility Monitoring tracks the signals that confirm entity resolution landed and measures citation lift month over month.",
      href: "/citation-brief/stage-1-entity-resolution",
    },
    {
      label: "Stage 4 — Freshness",
      description:
        "Why AI engines prefer maintained sources — the five freshness signals, the content decay curve, and the two-track maintenance cadence. AI Visibility Monitoring tracks freshness signals monthly and surfaces decay before it costs citation share.",
      href: "/citation-brief/stage-4-freshness",
    },
  ],
};

export const services: readonly Division[] = [premiumBrandSiteSystem, aiVisibilityMonitoring];

export function getServiceBySlug(slug: string): Division | undefined {
  return services.find((s) => s.slug === slug);
}
