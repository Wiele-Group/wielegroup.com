import { z } from "zod";

/**
 * Form validation schemas — used identically on client (form state)
 * and server (route handler). Single source of truth.
 *
 * Authority: directive §6 Phase 5. All 8 audit fields required —
 * the engine output quality depends on every field being filled.
 * Loosening fields is a Phase 6+ A/B test, not a Phase 5 concession.
 */

export const auditSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(120),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company")
    .max(120),
  website: z
    .string()
    .trim()
    .url("Please enter a valid URL, including https://")
    .max(200),
  industry: z
    .string()
    .trim()
    .min(2, "Please name your industry or niche")
    .max(120),
  market: z
    .string()
    .trim()
    .min(2, "Please name your main market")
    .max(120),
  competitors: z
    .string()
    .trim()
    .min(3, "Please name up to 3 competitors, comma-separated")
    .max(240),
  positioning: z
    .string()
    .trim()
    .min(20, "Tell us in at least 20 characters what you want buyers to choose you for")
    .max(1000, "Keep it under 1000 characters"),
  turnstileToken: z
    .string()
    .min(8, "Please complete the verification")
    .max(2048),
});

export type AuditInput = z.infer<typeof auditSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a sentence")
    .max(4000),
  turnstileToken: z.string().min(8).max(2048),
});

export type ContactInput = z.infer<typeof contactSchema>;

/* ─────────────────────────────────────────────────────────────
   Onboarding questionnaire — full client intake.
   Five sections, only the strategic essentials are required;
   everything else is optional so the client can submit at the
   level of detail they're comfortable with on first pass.
───────────────────────────────────────────────────────────────── */

export const SERVICE_VALUES = [
  "brand-marketing",
  "web-design",
  "advertising",
  "seo",
  "ai-search",
] as const;
export type ServiceValue = (typeof SERVICE_VALUES)[number];

const optionalString = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

export const onboardingSchema = z.object({
  // ── Step 1 — You + Company ──
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  role: optionalString(120),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: optionalString(40),
  company: z.string().trim().min(2, "Please enter your company").max(120),
  website: z
    .string()
    .trim()
    .url("Please enter your website URL, including https://")
    .max(200),
  location: z.string().trim().min(2, "Please enter city / country").max(160),
  industry: optionalString(120),
  companyStage: z
    .enum(["founder", "scaling", "established", "enterprise", ""])
    .optional()
    .or(z.literal("")),
  revenueRange: z
    .enum([
      "lt-500k",
      "500k-2m",
      "2m-10m",
      "10m-50m",
      "50m-plus",
      "prefer-not",
      "",
    ])
    .optional()
    .or(z.literal("")),

  // ── Step 2 — Services interested in ──
  services: z
    .array(z.enum(SERVICE_VALUES))
    .min(1, "Select at least one service"),
  serviceNotes: optionalString(2000),

  // ── Step 3 — Existing presence (for us to audit) ──
  linkedinUrl: optionalString(200),
  instagramHandle: optionalString(100),
  twitterHandle: optionalString(100),
  facebookUrl: optionalString(200),
  tiktokHandle: optionalString(100),
  youtubeUrl: optionalString(200),
  otherChannels: optionalString(500),
  brandAssetsStatus: z
    .enum(["complete", "partial", "none", ""])
    .optional()
    .or(z.literal("")),

  // ── Step 4 — Vision + Market ──
  vision: z
    .string()
    .trim()
    .min(20, "Tell us your direction in at least 20 characters")
    .max(2000),
  primaryGoals: z
    .string()
    .trim()
    .min(10, "What are you trying to achieve?")
    .max(1000),
  targetAudience: z
    .string()
    .trim()
    .min(10, "Who do you serve?")
    .max(1000),
  geographicMarkets: optionalString(500),
  competitors: optionalString(500),
  differentiation: optionalString(1000),
  growthBlockers: optionalString(1000),

  // ── Step 5 — Engagement details ──
  // Budget tier values mirror src/data/pricing.ts tier IDs exactly. Keep in
  // lockstep with src/data/onboarding.ts BUDGET_TIER_OPTIONS and
  // src/lib/resend.ts BUDGET_LABELS. Updated 2026-05-05 v2.5.1-revenue-hygiene.
  budgetTier: z
    .enum([
      "signal-audit",
      "growth-system",
      "authority-engine",
      "wiele-os",
      "not-sure",
      "",
    ])
    .optional()
    .or(z.literal("")),
  timeline: z
    .enum(["asap", "1-3", "3-6", "exploring", ""])
    .optional()
    .or(z.literal("")),
  decisionMakers: optionalString(500),
  hearAboutUs: optionalString(500),
  bestContactMethod: optionalString(300),
  additionalNotes: optionalString(3000),

  // ── Anti-spam ──
  turnstileToken: z
    .string()
    .min(8, "Please complete the verification")
    .max(2048),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
