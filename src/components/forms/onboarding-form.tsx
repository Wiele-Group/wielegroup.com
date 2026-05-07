"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { OnboardingThankYou } from "@/components/forms/onboarding-thank-you";
import {
  onboardingSchema,
  type OnboardingInput,
  type ServiceValue,
} from "@/lib/validations";
import {
  BRAND_ASSETS_OPTIONS,
  BUDGET_TIER_OPTIONS,
  COMPANY_STAGE_OPTIONS,
  REVENUE_RANGE_OPTIONS,
  SERVICE_OPTIONS,
  STEP_TITLES,
  TIMELINE_OPTIONS,
} from "@/data/onboarding";
import { cn } from "@/lib/utils";

/**
 * OnboardingForm — five-step client intake wizard.
 *
 * Steps:
 *   1. You & Your Company       (contact + company basics)
 *   2. Services You Want        (multi-select disciplines + notes)
 *   3. Existing Presence        (website + social URLs for our audit)
 *   4. Vision, Goals & Market   (direction + audience + competition)
 *   5. Engagement Details       (budget, timeline, contact prefs)
 *
 * Required fields are validated step-by-step on the Continue click;
 * full-payload validation runs on final Submit. Walks the user back
 * to the failing step on server-side validation rejection.
 *
 * Visual treatment matches brand v2 B3 — glass-strip step panel,
 * platinum primary CTA, electric stepper.
 */

type Errors = Partial<Record<keyof OnboardingInput | "_form", string>>;
type Step = 1 | 2 | 3 | 4 | 5;

type FormState = Omit<OnboardingInput, "turnstileToken">;

const initialState: FormState = {
  name: "",
  role: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  location: "",
  industry: "",
  companyStage: "",
  revenueRange: "",
  services: [],
  serviceNotes: "",
  linkedinUrl: "",
  instagramHandle: "",
  twitterHandle: "",
  facebookUrl: "",
  tiktokHandle: "",
  youtubeUrl: "",
  otherChannels: "",
  brandAssetsStatus: "",
  vision: "",
  primaryGoals: "",
  targetAudience: "",
  geographicMarkets: "",
  competitors: "",
  differentiation: "",
  growthBlockers: "",
  budgetTier: "",
  timeline: "",
  decisionMakers: "",
  hearAboutUs: "",
  bestContactMethod: "",
  additionalNotes: "",
};

const STEP_REQUIRED_FIELDS: Record<Step, ReadonlyArray<keyof FormState>> = {
  1: ["name", "email", "company", "website", "location"],
  2: ["services"],
  3: [],
  4: ["vision", "primaryGoals", "targetAudience"],
  5: [],
};

export function OnboardingForm() {
  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    intakeId: string;
    input: OnboardingInput;
  } | null>(null);

  const update =
    <K extends keyof FormState>(key: K) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value as FormState[K];
      setValues((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const toggleService = (service: ServiceValue) => {
    setValues((prev) => {
      const next = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: next };
    });
    if (errors.services) setErrors((prev) => ({ ...prev, services: undefined }));
  };

  const validateStep = useCallback(
    (currentStep: Step): boolean => {
      const required = STEP_REQUIRED_FIELDS[currentStep];
      const next: Errors = {};
      let ok = true;
      for (const field of required) {
        const value = values[field];
        if (field === "services") {
          if (!Array.isArray(value) || value.length === 0) {
            next.services = "Select at least one service";
            ok = false;
          }
          continue;
        }
        if (typeof value !== "string" || value.trim().length === 0) {
          next[field] = "Required";
          ok = false;
        }
      }
      // Soft URL check on website on step 1
      if (currentStep === 1 && values.website && !isValidUrl(values.website)) {
        next.website = "Please enter a valid URL, including https://";
        ok = false;
      }
      setErrors(next);
      return ok;
    },
    [values],
  );

  const handleContinue = () => {
    if (validateStep(step)) {
      setStep((prev) => (Math.min(prev + 1, 5) as Step));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((prev) => (Math.max(prev - 1, 1) as Step));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!turnstileToken) {
      setErrors({ _form: "Please complete the verification before submitting" });
      return;
    }

    const payload: OnboardingInput = { ...values, turnstileToken };
    const parsed = onboardingSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof OnboardingInput;
        next[field] = issue.message;
      }
      setErrors(next);
      // Walk back to the earliest failing step
      const firstFailingStep = findFirstFailingStep(parsed.error.issues);
      if (firstFailingStep) setStep(firstFailingStep);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        intakeId?: string;
        error?: string;
        issues?: { field: string; message: string }[];
      };

      if (res.status === 202 && data.intakeId) {
        setSuccess({ intakeId: data.intakeId, input: parsed.data });
        return;
      }
      if (res.status === 400 && data.issues) {
        const next: Errors = {};
        for (const issue of data.issues) {
          next[issue.field as keyof OnboardingInput] = issue.message;
        }
        setErrors(next);
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
      console.error("[onboarding-form] network failure", err);
      setErrors({
        _form: "Network issue. Email us directly at admin@wielegroup.com.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <OnboardingThankYou input={success.input} intakeId={success.intakeId} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <Stepper current={step} />

      <div className="glass-strip p-6 md:p-8 grid gap-5">
        {step === 1 ? <Step1 values={values} update={update} errors={errors} /> : null}
        {step === 2 ? (
          <Step2
            values={values}
            update={update}
            errors={errors}
            toggleService={toggleService}
          />
        ) : null}
        {step === 3 ? <Step3 values={values} update={update} errors={errors} /> : null}
        {step === 4 ? <Step4 values={values} update={update} errors={errors} /> : null}
        {step === 5 ? (
          <Step5
            values={values}
            update={update}
            errors={errors}
            setTurnstileToken={setTurnstileToken}
          />
        ) : null}
      </div>

      {errors._form ? (
        <p
          role="alert"
          className="text-body-sm text-danger bg-[rgba(255,77,77,0.08)] border border-danger/30 rounded-[var(--radius-md)] px-4 py-3"
        >
          {errors._form}
        </p>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className={buttonStyles({ variant: "ghost", size: "lg" })}
            disabled={submitting}
          >
            <ArrowLeft size={15} aria-hidden /> Back
          </button>
        ) : (
          <div />
        )}
        {step < 5 ? (
          <Button type="button" size="lg" onClick={handleContinue}>
            Continue <ArrowRight size={15} aria-hidden />
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={submitting || !turnstileToken}>
            {submitting ? (
              <>
                <Loader2 size={15} className="animate-spin" aria-hidden />
                Submitting…
              </>
            ) : (
              "Submit onboarding"
            )}
          </Button>
        )}
      </div>

      <p className="text-body-xs font-mono text-smoke">
        A Wiele principal reviews every submission personally. You&apos;ll
        receive a confirmation email immediately and a strategic response
        inside one business day.
      </p>
    </form>
  );
}

/* ─── Stepper ─── */

function Stepper({ current }: { current: Step }) {
  return (
    <ol className="flex items-center gap-1 md:gap-3 mb-2 overflow-x-auto" aria-label="Form progress">
      {([1, 2, 3, 4, 5] as Step[]).map((step) => (
        <li key={step} className="flex items-center gap-2 shrink-0">
          <span
            aria-current={step === current ? "step" : undefined}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-body-xs font-mono font-semibold",
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
              "text-body-xs font-mono hidden md:inline",
              step === current ? "text-white" : "text-smoke",
            )}
          >
            {STEP_TITLES[step - 1]}
          </span>
          {step < 5 ? (
            <span aria-hidden className="block w-4 md:w-6 h-px bg-[var(--color-border-default)] ml-1" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* ─── Step components ─── */

type StepProps = {
  values: FormState;
  update: <K extends keyof FormState>(
    key: K,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Errors;
};

function StepHeading({ num, title, lead }: { num: string; title: string; lead: string }) {
  return (
    <header className="mb-2">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">
        Step {num}
      </p>
      <h2 className="text-heading-lg text-white tracking-tight mb-1">{title}</h2>
      <p className="text-body-sm text-silver">{lead}</p>
    </header>
  );
}

function Step1({ values, update, errors }: StepProps) {
  return (
    <>
      <StepHeading
        num="01 / 05"
        title="You & Your Company"
        lead="The basics — who's filling this out, and what we should know about your firm."
      />
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
          label="Role / title"
          name="role"
          autoComplete="organization-title"
          value={values.role ?? ""}
          onChange={update("role")}
          error={errors.role}
          placeholder="Founder, CEO, CMO, etc."
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
        <Input
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone ?? ""}
          onChange={update("phone")}
          error={errors.phone}
          placeholder="Optional"
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Location"
          name="location"
          placeholder="City, Country"
          value={values.location}
          onChange={update("location")}
          error={errors.location}
          required
        />
        <Input
          label="Industry / niche"
          name="industry"
          value={values.industry ?? ""}
          onChange={update("industry")}
          error={errors.industry}
          placeholder="SaaS, hospitality, professional services…"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Company stage"
          name="companyStage"
          value={values.companyStage ?? ""}
          onChange={update("companyStage")}
          options={COMPANY_STAGE_OPTIONS}
        />
        <SelectField
          label="Annual revenue range"
          name="revenueRange"
          value={values.revenueRange ?? ""}
          onChange={update("revenueRange")}
          options={REVENUE_RANGE_OPTIONS}
        />
      </div>
    </>
  );
}

function Step2({
  values,
  errors,
  update,
  toggleService,
}: StepProps & { toggleService: (s: ServiceValue) => void }) {
  return (
    <>
      <StepHeading
        num="02 / 05"
        title="Services You Want"
        lead="Select every discipline you'd like Wiele to engage on. Pick one or all five."
      />
      <fieldset className="grid gap-3">
        <legend className="sr-only">Services interested in</legend>
        {SERVICE_OPTIONS.map((opt) => {
          const checked = values.services.includes(opt.value);
          return (
            <label
              key={opt.value}
              className={cn(
                "flex items-start gap-4 p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all duration-[var(--duration-fast)]",
                checked
                  ? "border-electric bg-[rgba(74,158,255,0.08)]"
                  : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]",
              )}
            >
              <input
                type="checkbox"
                name="services"
                value={opt.value}
                checked={checked}
                onChange={() => toggleService(opt.value)}
                className="mt-1 h-4 w-4 accent-electric"
              />
              <span className="grid gap-0.5">
                <span className="text-body-md font-medium text-white">
                  {opt.title}
                </span>
                <span className="text-body-sm text-silver">{opt.desc}</span>
              </span>
            </label>
          );
        })}
        {errors.services ? (
          <p className="text-body-sm text-danger">{errors.services}</p>
        ) : null}
      </fieldset>
      <Textarea
        label="Anything specific you want to flag about these services?"
        name="serviceNotes"
        rows={4}
        value={values.serviceNotes ?? ""}
        onChange={update("serviceNotes")}
        error={errors.serviceNotes}
        placeholder="E.g. priorities, what you've tried before, urgency…"
      />
    </>
  );
}

function Step3({ values, update, errors }: StepProps) {
  return (
    <>
      <StepHeading
        num="03 / 05"
        title="Existing Presence"
        lead="Share the URLs and handles you want us to audit. The more we can see, the sharper our strategic read."
      />
      <Input
        label="LinkedIn URL"
        name="linkedinUrl"
        value={values.linkedinUrl ?? ""}
        onChange={update("linkedinUrl")}
        error={errors.linkedinUrl}
        placeholder="https://linkedin.com/company/…"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Instagram handle"
          name="instagramHandle"
          value={values.instagramHandle ?? ""}
          onChange={update("instagramHandle")}
          error={errors.instagramHandle}
          placeholder="@yourbrand"
        />
        <Input
          label="Twitter / X handle"
          name="twitterHandle"
          value={values.twitterHandle ?? ""}
          onChange={update("twitterHandle")}
          error={errors.twitterHandle}
          placeholder="@yourbrand"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="TikTok handle"
          name="tiktokHandle"
          value={values.tiktokHandle ?? ""}
          onChange={update("tiktokHandle")}
          error={errors.tiktokHandle}
          placeholder="@yourbrand"
        />
        <Input
          label="YouTube URL"
          name="youtubeUrl"
          value={values.youtubeUrl ?? ""}
          onChange={update("youtubeUrl")}
          error={errors.youtubeUrl}
          placeholder="https://youtube.com/@…"
        />
      </div>
      <Input
        label="Facebook URL"
        name="facebookUrl"
        value={values.facebookUrl ?? ""}
        onChange={update("facebookUrl")}
        error={errors.facebookUrl}
        placeholder="https://facebook.com/…"
      />
      <Textarea
        label="Other channels we should review"
        name="otherChannels"
        rows={3}
        value={values.otherChannels ?? ""}
        onChange={update("otherChannels")}
        error={errors.otherChannels}
        placeholder="Press, podcasts, other social, marketplace listings…"
      />
      <SelectField
        label="Brand assets — do you have brand guidelines?"
        name="brandAssetsStatus"
        value={values.brandAssetsStatus ?? ""}
        onChange={update("brandAssetsStatus")}
        options={BRAND_ASSETS_OPTIONS}
      />
    </>
  );
}

function Step4({ values, update, errors }: StepProps) {
  return (
    <>
      <StepHeading
        num="04 / 05"
        title="Vision, Goals & Market"
        lead="The strategic picture. The sharper this is, the sharper the strategy we send back."
      />
      <Textarea
        label="Your vision — where do you want this engagement to take you?"
        name="vision"
        rows={5}
        value={values.vision}
        onChange={update("vision")}
        error={errors.vision}
        required
        placeholder="What does winning look like in 12–24 months?"
      />
      <Textarea
        label="Primary goals for this engagement"
        name="primaryGoals"
        rows={3}
        value={values.primaryGoals}
        onChange={update("primaryGoals")}
        error={errors.primaryGoals}
        required
        placeholder="E.g. lead generation, brand authority, repositioning, market share…"
      />
      <Textarea
        label="Target audience — who do you serve?"
        name="targetAudience"
        rows={3}
        value={values.targetAudience}
        onChange={update("targetAudience")}
        error={errors.targetAudience}
        required
        placeholder="Buyer profile, role, industry, company size, pain points…"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Geographic markets you serve"
          name="geographicMarkets"
          value={values.geographicMarkets ?? ""}
          onChange={update("geographicMarkets")}
          error={errors.geographicMarkets}
          placeholder="UK, EU, US, global…"
        />
        <Input
          label="Top 3 competitors"
          name="competitors"
          value={values.competitors ?? ""}
          onChange={update("competitors")}
          error={errors.competitors}
          placeholder="Comma-separated"
        />
      </div>
      <Textarea
        label="What differentiates you from them?"
        name="differentiation"
        rows={3}
        value={values.differentiation ?? ""}
        onChange={update("differentiation")}
        error={errors.differentiation}
        placeholder="Optional but valuable — what's your unfair advantage?"
      />
      <Textarea
        label="What's your biggest growth blocker right now?"
        name="growthBlockers"
        rows={3}
        value={values.growthBlockers ?? ""}
        onChange={update("growthBlockers")}
        error={errors.growthBlockers}
        placeholder="Where you're stuck — visibility, conversion, brand, sales motion, ops…"
      />
    </>
  );
}

function Step5({
  values,
  update,
  errors,
  setTurnstileToken,
}: StepProps & {
  setTurnstileToken: (token: string | null) => void;
}) {
  return (
    <>
      <StepHeading
        num="05 / 05"
        title="Engagement Details"
        lead="The practical shape of working together. Everything here is optional — useful, not required."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Budget tier you're considering"
          name="budgetTier"
          value={values.budgetTier ?? ""}
          onChange={update("budgetTier")}
          options={BUDGET_TIER_OPTIONS}
        />
        <SelectField
          label="Timeline"
          name="timeline"
          value={values.timeline ?? ""}
          onChange={update("timeline")}
          options={TIMELINE_OPTIONS}
        />
      </div>
      <Input
        label="Decision-makers involved"
        name="decisionMakers"
        value={values.decisionMakers ?? ""}
        onChange={update("decisionMakers")}
        error={errors.decisionMakers}
        placeholder="Names, roles, who needs to sign off"
      />
      <Input
        label="How did you hear about Wiele?"
        name="hearAboutUs"
        value={values.hearAboutUs ?? ""}
        onChange={update("hearAboutUs")}
        error={errors.hearAboutUs}
        placeholder="Referral, search, social, event…"
      />
      <Input
        label="Best way to reach you"
        name="bestContactMethod"
        value={values.bestContactMethod ?? ""}
        onChange={update("bestContactMethod")}
        error={errors.bestContactMethod}
        placeholder="Email, phone, time zone preferences…"
      />
      <Textarea
        label="Anything else we should know?"
        name="additionalNotes"
        rows={4}
        value={values.additionalNotes ?? ""}
        onChange={update("additionalNotes")}
        error={errors.additionalNotes}
        placeholder="Context, constraints, opportunities, expectations…"
      />

      <div className="mt-2">
        <TurnstileWidget
          onToken={setTurnstileToken}
          onError={() => setTurnstileToken(null)}
          className="min-h-[64px]"
        />
      </div>
    </>
  );
}

/* ─── SelectField primitive — matches Input label styling ─── */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-body-sm text-cloud font-medium">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-default)] text-cloud rounded-[var(--radius-md)] px-3 py-2.5 text-body-sm focus-visible:outline-none focus-visible:border-electric focus-visible:ring-2 focus-visible:ring-electric/30"
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ─── Helpers ─── */

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function findFirstFailingStep(
  issues: ReadonlyArray<{ path: ReadonlyArray<string | number> }>,
): Step | null {
  const FIELD_TO_STEP: Record<string, Step> = {};
  (Object.keys(STEP_REQUIRED_FIELDS) as unknown as Step[]).forEach((step) => {
    for (const field of STEP_REQUIRED_FIELDS[step]) {
      FIELD_TO_STEP[field as string] = step;
    }
  });
  for (const issue of issues) {
    const field = issue.path[0] as string;
    const step = FIELD_TO_STEP[field];
    if (step) return step;
  }
  return null;
}
