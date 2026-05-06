"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";

type FieldErrors = Partial<Record<keyof ContactInput | "_form", string>>;

export function ContactForm() {
  const [values, setValues] = useState<Omit<ContactInput, "company_website">>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const update =
    <K extends keyof typeof values>(key: K) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    // Honeypot read via FormData so dumb bots that auto-fill the DOM input
    // (without firing React state updates) still trip the trap on submit.
    const formData = new FormData(event.currentTarget);
    const honeypot = (formData.get("company_website") as string | null) ?? "";

    const payload: ContactInput = { ...values, company_website: honeypot };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof ContactInput] = issue.message;
      }
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ticketId?: string;
        success?: boolean;
        error?: string;
        issues?: { field: string; message: string }[];
      };

      if (res.status === 202 && data.ticketId) {
        setSuccess(data.ticketId);
        return;
      }
      if (res.status === 200 && data.success) {
        // Honeypot tripped server-side. Real users effectively never land here
        // (hidden + aria-hidden + autoComplete=off prevents browser autofill);
        // showing success keeps parity with the silent-success philosophy.
        setSuccess("delivered");
        return;
      }
      if (res.status === 400 && data.issues) {
        const next: FieldErrors = {};
        for (const issue of data.issues) {
          next[issue.field as keyof ContactInput] = issue.message;
        }
        setErrors(next);
        return;
      }
      setErrors({
        _form:
          "Submission could not be processed right now. Email us directly at hello@wielegroup.com.",
      });
    } catch (err) {
      console.error("[contact-form] network failure", err);
      setErrors({ _form: "Network issue. Email us directly at hello@wielegroup.com." });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-success/30 bg-[rgba(55,214,122,0.05)] p-6 md:p-7">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={22} className="shrink-0 text-success mt-0.5" aria-hidden />
          <div>
            <h2 className="text-heading-lg text-white mb-2">Message sent.</h2>
            <p className="text-body-md text-cloud">
              We respond inside one business day. If it&apos;s urgent, email
              hello@wielegroup.com directly.
            </p>
            <p className="text-body-xs font-mono text-smoke mt-3">
              Reference: {success}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
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
      <Input
        label="Company"
        name="company"
        autoComplete="organization"
        value={values.company ?? ""}
        onChange={update("company")}
        error={errors.company}
      />
      <Textarea
        label="What would you like to discuss?"
        name="message"
        rows={5}
        value={values.message}
        onChange={update("message")}
        error={errors.message}
        required
      />

      {/* Honeypot — hidden from real users, dumb bots auto-fill name-pattern
          fields. Field name resembles a URL slot to lure crawlers; positioning
          + aria-hidden + autoComplete=off prevents real-user interaction. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {errors._form ? (
        <p
          role="alert"
          className="text-body-sm text-danger bg-[rgba(255,77,77,0.08)] border border-danger/30 rounded-[var(--radius-md)] px-4 py-3"
        >
          {errors._form}
        </p>
      ) : null}

      <div className="flex justify-end mt-2">
        <Button type="submit" size="md" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
