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
