/**
 * Onboarding questionnaire — option labels and helper data.
 *
 * The schema (validation) lives in src/lib/validations.ts.
 * The email rendering labels live alongside the Resend functions.
 * This file is the UI-side label map for the wizard form.
 */

export const SERVICE_OPTIONS = [
  {
    value: "brand-management",
    title: "Brand Management",
    desc: "Positioning, identity systems, narrative architecture, authority engineering",
  },
  {
    value: "marketing",
    title: "Marketing",
    desc: "Strategy, audience, content, lifecycle, ops — engineered as one engine",
  },
  {
    value: "web-design",
    title: "Web Design",
    desc: "UX strategy, design systems, performance, conversion architecture",
  },
  {
    value: "advertising",
    title: "Advertising",
    desc: "Paid acquisition across Google, Meta, LinkedIn — creative, attribution, scaling",
  },
  {
    value: "seo",
    title: "SEO Services",
    desc: "Technical SEO, content systems, search authority, schema engineering",
  },
  {
    value: "ai-search",
    title: "AI Search Optimization",
    desc: "GEO + AEO, citation engineering, entity authority, recommendation visibility",
  },
] as const;

export const COMPANY_STAGE_OPTIONS = [
  { value: "founder", label: "Founder / Startup" },
  { value: "scaling", label: "Scaling" },
  { value: "established", label: "Established" },
  { value: "enterprise", label: "Enterprise" },
] as const;

export const REVENUE_RANGE_OPTIONS = [
  { value: "lt-500k", label: "Under £500k" },
  { value: "500k-2m", label: "£500k – £2M" },
  { value: "2m-10m", label: "£2M – £10M" },
  { value: "10m-50m", label: "£10M – £50M" },
  { value: "50m-plus", label: "£50M+" },
  { value: "prefer-not", label: "Prefer not to say" },
] as const;

export const BRAND_ASSETS_OPTIONS = [
  { value: "complete", label: "Have full brand guidelines" },
  { value: "partial", label: "Some brand assets, no formal guidelines" },
  { value: "none", label: "No brand assets — starting fresh" },
] as const;

/**
 * Budget tier options — values mirror src/data/pricing.ts tier IDs exactly.
 * Source of truth: pricing.ts. Update here ONLY when pricing.ts changes,
 * and update src/lib/validations.ts (Zod enum) + src/lib/resend.ts
 * (BUDGET_LABELS map) in lockstep.
 *
 * History:
 *   2026-05-05 v2.5.1-revenue-hygiene — corrected stale labels.
 *   2026-05-06 v3.0-pricing-overhaul — added Launch + Sovereign, repriced
 *   Growth (£4,000 → £4,500) and Authority (£8,000 → £8,500). Six paid
 *   tiers + Signal Audit + "not sure" now mirror the live ladder.
 */
export const BUDGET_TIER_OPTIONS = [
  { value: "signal-audit", label: "Signal Audit — £2,500 one-off" },
  { value: "launch", label: "Launch — £1,950 / mo" },
  { value: "growth-system", label: "Growth System — £4,500 / mo" },
  { value: "authority-engine", label: "Authority Engine — £8,500 / mo" },
  { value: "wiele-os", label: "Wiele OS — £15,000+ / mo" },
  { value: "sovereign", label: "Sovereign — from £45,000 / mo" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-3", label: "1 – 3 months" },
  { value: "3-6", label: "3 – 6 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const STEP_TITLES = [
  "You & Your Company",
  "Services You Want",
  "Existing Presence",
  "Vision, Goals & Market",
  "Engagement Details",
] as const;
