/**
 * Onboarding questionnaire — option labels and helper data.
 *
 * The schema (validation) lives in src/lib/validations.ts.
 * The email rendering labels live alongside the Resend functions.
 * This file is the UI-side label map for the wizard form.
 */

export const SERVICE_OPTIONS = [
  {
    value: "brand-marketing",
    title: "Brand Design & Marketing",
    desc: "Positioning, identity, narrative, brand systems",
  },
  {
    value: "web-design",
    title: "Web Design",
    desc: "UX strategy, design systems, conversion engineering",
  },
  {
    value: "advertising",
    title: "Advertising",
    desc: "Paid acquisition, creative testing, attribution",
  },
  {
    value: "seo",
    title: "SEO Services",
    desc: "Technical SEO, content, search authority",
  },
  {
    value: "ai-search",
    title: "AI Search Optimization",
    desc: "GEO + AEO, citation engineering, entity authority",
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

export const BUDGET_TIER_OPTIONS = [
  { value: "launch", label: "Launch — £2,500/mo" },
  { value: "growth", label: "Growth — £6,500/mo" },
  { value: "scale", label: "Scale — £14,000/mo" },
  { value: "enterprise", label: "Enterprise — bespoke" },
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
