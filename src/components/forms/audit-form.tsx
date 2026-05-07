"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { AuditThankYou } from "@/components/forms/audit-thank-you";
import { auditSchema, type AuditInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

/**
 * Audit form — progressive disclosure (4 + 4 fields), every field
 * required. Calls /api/audit on submit; transitions to AuditThankYou
 * on 202.
 *
 * Authority: directive §6 Phase 5, founder reinforcement #4 + #6 +
 * one-do-not (all 8 fields required, no optionality, progressive
 * disclosure OK).
 */

type FieldErrors = Partial<Record<keyof AuditInput | "_form", string>>;

const STEP_1_FIELDS = ["name", "email", "company", "website"] as const;

const initialState: Omit<AuditInput, "turnstileToken"> = {
  name: "",
  email: "",
  company: "",
  website: "",
  industry: "",
  market: "",
  competitors: "",
  positioning: "",
};

export function AuditForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ runId: string; input: AuditInput } | null>(null);

  const update =
    <K extends keyof typeof values>(key: K) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validateStep1 = useCallback(() => {
    const partial = STEP_1_FIELDS.reduce<Record<string, string>>(
      (acc, field) => {
        acc[field] = values[field];
        return acc;
      },
      {},
    );
    const result = auditSchema.partial({
      industry: true,
      market: true,
      competitors: true,
      positioning: true,
      turnstileToken: true,
    }).safeParse(partial);
    if (result.success) return true;
    const next: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof AuditInput;
      if (STEP_1_FIELDS.includes(field as (typeof STEP_1_FIELDS)[number])) {
        next[field] = issue.message;
      }
    }
    setErrors(next);
    return false;
  }, [values]);

  const handleContinue = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!turnstileToken) {
      setErrors({ _form: "Please complete the verification before submitting" });
      return;
    }

    const payload: AuditInput = { ...values, turnstileToken };
    const parsed = auditSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof AuditInput;
        next[field] = issue.message;
      }
      setErrors(next);
      // If the failing field is in step 1, walk the user back.
      const inStep1 = parsed.error.issues.some((i) =>
        STEP_1_FIELDS.includes(i.path[0] as (typeof STEP_1_FIELDS)[number]),
      );
      if (inStep1) setStep(1);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        runId?: string;
        error?: string;
        issues?: { field: string; message: string }[];
      };

      if (res.status === 202 && data.runId) {
        setSuccess({ runId: data.runId, input: parsed.data });
        return;
      }
      if (res.status === 400 && data.issues) {
        const next: FieldErrors = {};
        for (const issue of data.issues) {
          next[issue.field as keyof AuditInput] = issue.message;
        }
        setErrors(next);
        setStep(1);
        return;
      }
      if (res.status === 403) {
        setErrors({
          _form: data.error ?? "Verification failed. Please reload and try again.",
        });
        return;
      }
      setErrors({
        _form:
          "Submission could not be processed right now. Email us directly at admin@wielegroup.com — we'll handle it manually.",
      });
    } catch (err) {
      console.error("[audit-form] network failure", err);
      setErrors({
        _form:
          "Network issue. Email us directly at admin@wielegroup.com — we'll handle it manually.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <AuditThankYou input={success.input} runId={success.runId} />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <Stepper current={step} />

      {step === 1 ? (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Your name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              error={errors.name}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              error={errors.email}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Company"
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={update("company")}
              error={errors.company}
              required
            />
            <Input
              label="Website"
              name="website"
              type="url"
              placeholder="https://"
              value={values.website}
              onChange={update("website")}
              error={errors.website}
              required
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button type="button" size="lg" onClick={handleContinue}>
              Continue <ArrowRight size={15} aria-hidden />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Industry / niche"
              name="industry"
              value={values.industry}
              onChange={update("industry")}
              error={errors.industry}
              required
            />
            <Input
              label="Main market"
              name="market"
              placeholder="e.g. UK, EU, North America"
              value={values.market}
              onChange={update("market")}
              error={errors.market}
              required
            />
          </div>
          <Input
            label="Primary competitors"
            name="competitors"
            placeholder="Up to 3, comma-separated"
            hint="The brands you most often lose deals to or share buyer attention with."
            value={values.competitors}
            onChange={update("competitors")}
            error={errors.competitors}
            required
          />
          <Textarea
            label="What do you want buyers to choose you for?"
            name="positioning"
            rows={4}
            value={values.positioning}
            onChange={update("positioning")}
            error={errors.positioning}
            required
          />

          <div className="mt-2">
            <TurnstileWidget
              onToken={setTurnstileToken}
              onError={() => setTurnstileToken(null)}
              className="min-h-[64px]"
            />
          </div>

          {errors._form ? (
            <p
              role="alert"
              className="text-body-sm text-danger bg-[rgba(255,77,77,0.08)] border border-danger/30 rounded-[var(--radius-md)] px-4 py-3"
            >
              {errors._form}
            </p>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              type="submit"
              size="lg"
              disabled={submitting || !turnstileToken}
              className={cn(submitting && "cursor-progress")}
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" aria-hidden />
                  Submitting…
                </>
              ) : (
                "Submit audit · £2,500"
              )}
            </Button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className={buttonStyles({ variant: "ghost", size: "lg" })}
              disabled={submitting}
            >
              <ArrowLeft size={15} aria-hidden /> Back
            </button>
          </div>
          <p className="text-body-xs font-mono text-smoke mt-1">
            Submission goes to the Wiele engine queue. You&apos;ll receive a
            confirmation email immediately and the full report within 14 days.
          </p>
        </div>
      )}
    </form>
  );
}

function Stepper({ current }: { current: 1 | 2 }) {
  return (
    <ol className="flex items-center gap-3 mb-2" aria-label="Form progress">
      {[1, 2].map((step) => (
        <li key={step} className="flex items-center gap-2">
          <span
            aria-current={step === current ? "step" : undefined}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-body-xs font-mono font-semibold",
              step < current
                ? "bg-success text-[var(--color-void)]"
                : step === current
                  ? "bg-electric text-white"
                  : "bg-[var(--color-surface-elevated)] text-smoke border border-[var(--color-border-default)]",
            )}
          >
            {step}
          </span>
          <span
            className={cn(
              "text-body-xs font-mono",
              step === current ? "text-white" : "text-smoke",
            )}
          >
            {step === 1 ? "Your details" : "Audit context"}
          </span>
          {step === 1 ? (
            <span aria-hidden className="block w-6 h-px bg-[var(--color-border-default)] ml-1" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
