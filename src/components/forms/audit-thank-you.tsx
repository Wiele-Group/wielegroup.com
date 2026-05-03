"use client";

import Link from "next/link";
import { Calendar, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { PromptSimulator } from "@/components/sections/prompt-simulator";
import type { AuditInput } from "@/lib/validations";
import { buildPersonalisedFixture } from "@/lib/personalised-fixture";
import { siteConfig } from "@/lib/metadata";

/**
 * Post-submit conversion surface — the 6th surface for the
 * PromptSimulator (build-once-use-six). Renders:
 *  · animated success badge
 *  · personalised PromptSimulator (animate=false) with the user's
 *    brand highlighted as the audited entity
 *  · 14-day timeline
 *  · upsell bar: 7-day delivery £4,000 (Phase 5 conversion lever)
 */
export function AuditThankYou({
  input,
  runId,
}: {
  input: AuditInput;
  runId: string;
}) {
  const fixture = buildPersonalisedFixture(input);

  return (
    <div className="space-y-8">
      <div className="rounded-[var(--radius-xl)] border border-success/30 bg-[rgba(55,214,122,0.05)] p-6 md:p-7">
        <div className="flex items-start gap-3">
          <CheckCircle2
            size={22}
            className="shrink-0 text-success mt-0.5"
            aria-hidden
          />
          <div>
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-success mb-1.5">
              Submission received
            </p>
            <h2 className="text-heading-lg text-white mb-2">
              Engine running for{" "}
              <span className="text-electric">{input.company}</span>.
            </h2>
            <p className="text-body-sm text-cloud">
              Your full report arrives in your inbox within 14 days. Below
              is a sample of the engine output structure you&apos;ll receive
              — built from your actual prompt surface.
            </p>
            <p className="text-body-xs font-mono text-smoke mt-3">
              Reference: {runId}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-3 inline-flex items-center gap-1.5">
          <Sparkles size={12} aria-hidden /> Engine output preview
        </p>
        <PromptSimulator data={fixture} animate={false} />
        <p className="text-body-xs font-mono text-smoke mt-3">
          Sample numbers · Your actual report shows your real engine signal
        </p>
      </div>

      <Timeline />

      <UpsellBar />

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={`mailto:${siteConfig.email}?subject=Audit ${runId} — follow-up`}
          className={buttonStyles({ variant: "ghost", size: "md" })}
        >
          <Mail size={15} aria-hidden /> Email us
        </a>
        <Link href="/labs" className={buttonStyles({ variant: "ghost", size: "md" })}>
          Read Wiele Labs while you wait
        </Link>
      </div>
    </div>
  );
}

function Timeline() {
  const steps = [
    { label: "Submitted", state: "done" as const, sub: "Today" },
    { label: "Engine run", state: "active" as const, sub: "Days 1–6" },
    { label: "Report drafted", state: "pending" as const, sub: "Days 7–12" },
    { label: "Strategy session", state: "pending" as const, sub: "Day 14" },
  ];
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5">
      <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-smoke mb-4">
        Delivery timeline · 14 days
      </p>
      <ol className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step) => (
          <li key={step.label} className="flex flex-col gap-1">
            <span
              className={`block h-1 rounded-full ${
                step.state === "done"
                  ? "bg-success"
                  : step.state === "active"
                    ? "bg-electric"
                    : "bg-[var(--color-border-default)]"
              }`}
              aria-hidden
            />
            <p className="text-body-sm font-medium text-white">{step.label}</p>
            <p className="text-body-xs font-mono text-smoke">{step.sub}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function UpsellBar() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-electric/30 bg-[rgba(99,102,241,0.06)] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Badge variant="electric" size="sm" className="mb-2">
            Faster delivery
          </Badge>
          <p className="text-body-md text-white">
            Want this in 7 days instead of 14?
          </p>
          <p className="text-body-sm text-silver">
            Upgrade to express delivery — £4,000, includes a 60-minute
            strategy session in week one with a Wiele principal.
          </p>
        </div>
        <Link
          href={`/contact?ref=audit-${encodeURIComponent("upsell-7day")}#form`}
          className={buttonStyles({ variant: "primary", size: "md" })}
        >
          <Calendar size={15} aria-hidden /> Book a call
        </Link>
      </div>
    </div>
  );
}
