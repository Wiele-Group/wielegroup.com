/**
 * Productized Service Offers — premium SKUs under Wiele agency divisions.
 * Authority: project_wiele_design_blueprint_filed.md (founder spec 2026-05-07)
 * + project_v3_pricing_overhaul_shipped.md (v3.0 pricing ladder).
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
      price: "£18,000",
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
      price: "£14,000",
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
      price: "£45,000",
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
      "Token-first architecture · 5-mode delivery · AI revision credits · contractual Core Web Vitals SLA. Premium brand websites built to compound, not decay. £18k Foundation · £14k/mo Authority · £45k/mo Sovereign. Built on Next.js + Cloudflare. AI-Search-Native by default.",
  },
};

export const services: readonly Division[] = [premiumBrandSiteSystem];

export function getServiceBySlug(slug: string): Division | undefined {
  return services.find((s) => s.slug === slug);
}
