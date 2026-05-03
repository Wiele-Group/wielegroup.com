import type { Metadata } from "next";
import { Check, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { AuditForm } from "@/components/forms/audit-form";
import { JsonLd } from "@/components/json-ld";
import { PromptSimulator } from "@/components/sections/prompt-simulator";
import { promptSimulatorFixtures } from "@/data/prompt-simulator-fixtures";
import { auditPreviewSteps } from "@/data/homepage";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema, productSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Signal Audit — Find out if AI recommends you",
  description:
    "£2,500. 14 days. Full Wiele OS engine run for your brand: visibility score, mention strength, citation readiness, gaps, and a 30-day roadmap.",
  path: "/audit",
});

const measuredSignals = [
  {
    title: "Visibility Score",
    body: "Composite 0–100 score across the answer engines your buyers use, with 7-day trend and delta.",
  },
  {
    title: "Mention Strength",
    body: "Share-of-voice in AI answers vs your top 3 named competitors, weighted by prompt importance.",
  },
  {
    title: "Citation Readiness",
    body: "Percentage of high-intent prompts where you're cited, plus the specific source domains AI engines pull from.",
  },
  {
    title: "Authority Gaps",
    body: "Ranked list of structural authority gaps: schema, comparison hubs, founder narrative, knowledge-graph entities.",
  },
  {
    title: "Next Action",
    body: "Highest-leverage move for the next 30 days, with methodology, scoping note, and expected lift range.",
  },
];

const detailSections = [
  {
    title: "How the engine runs",
    body:
      "Wiele OS V3 runs your brand across the prompt surface that matches your buyer profile. It logs mention strength, position, source citations, and gap signals across the major answer engines. Methodology is open for inspection.",
  },
  {
    title: "What you give us",
    body:
      "Brand name, website, market, top 3 competitors, and the buyer profile you sell to. We don't need access to analytics, CRM, or any private data. Public signal is what AI engines see.",
  },
  {
    title: "What we give back",
    body:
      "A 12–16 page engine report, a 30-day implementation roadmap, and one strategy session with a Wiele principal. The report is yours to keep regardless of next steps.",
  },
  {
    title: "Timeline",
    body:
      "14 calendar days from submission. Engine runs take 4–6 days; report drafting and review takes 6–8 days; the strategy session is scheduled inside the second week.",
  },
  {
    title: "What it costs",
    body:
      "£2,500 one-off. No retainer required. Engagement-pricing applies if you decide to continue with a Growth System or above; the £2,500 is credited against month one.",
  },
  {
    title: "Who runs the engine",
    body:
      "Wiele OS V3 is operated by a Wiele strategist, reviewed by a Wiele principal. Output is reviewed before it ships — no auto-generated reports.",
  },
  {
    title: "What the report does NOT include",
    body:
      "Aspirational ranges. Vanity metrics. Generic recommendations. The report is specific to your engine output and your gap profile.",
  },
];

export default function AuditPage() {
  const showcase = promptSimulatorFixtures[0];

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Signal Audit", url: `${siteConfig.url}/audit` },
  ]);
  const product = productSchema({
    name: "Wiele Signal Audit",
    description:
      "Full Wiele OS engine run for your brand. Visibility score, mention strength, citation readiness, gaps, and a 30-day implementation roadmap. 14-day delivery.",
    price: "2500.00",
    priceCurrency: "GBP",
    url: `${siteConfig.url}/audit`,
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-audit" />
      <JsonLd schema={product} id="schema-product-audit" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center">
            <div>
              <FadeIn>
                <Badge variant="electric" size="sm" className="mb-5">
                  Signal Audit · £2,500 · 14 days
                </Badge>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-display-xl text-white text-balance mb-5">
                  Find out if AI recommends you.
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-body-lg text-silver mb-8 max-w-lg">
                  Full Wiele OS engine run for your brand. Five signals,
                  a 30-day roadmap, a strategy session with a Wiele principal.
                  Diagnose first, commit second.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="flex items-center gap-5 text-body-sm text-cloud">
                  <span className="flex items-center gap-2">
                    <Clock size={15} className="text-electric" aria-hidden />
                    14 days
                  </span>
                  <span className="flex items-center gap-2">
                    <FileText size={15} className="text-electric" aria-hidden />
                    Engine report
                  </span>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <PromptSimulator data={showcase} animate={false} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we measure */}
      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What the audit measures
            </p>
            <h2 className="text-display-md text-white text-balance">
              Five signals. One page. The picture AI engines have of you.
            </h2>
          </div>
          <Reveal stagger={0.05} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {measuredSignals.map((s) => (
              <div
                key={s.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <h3 className="text-heading-sm text-white mb-2.5">{s.title}</h3>
                <p className="text-body-sm text-silver">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Process detail (7 sections) */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              How it works, in detail
            </p>
            <h2 className="text-display-md text-white text-balance">
              Seven things to know before you submit.
            </h2>
          </div>
          <Reveal stagger={0.04} className="flex flex-col gap-6">
            {detailSections.map((s, i) => (
              <article key={s.title} className="border-l-2 border-[var(--color-border-default)] pl-5">
                <p className="text-body-xs font-mono text-electric mb-2">
                  0{i + 1}
                </p>
                <h3 className="text-heading-sm text-white mb-2">{s.title}</h3>
                <p className="text-body-md text-silver">{s.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Real audit form — Phase 5 */}
      <section id="audit-form" className="py-16 md:py-20 lg:py-24 scroll-mt-24">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-8">
            <Badge variant="electric" size="sm" className="mb-4">
              Submit your brand
            </Badge>
            <h2 className="text-heading-lg text-white mb-2">
              Run AI Visibility Audit
            </h2>
            <p className="text-body-sm text-silver mb-6">
              Eight fields, two steps, fourteen-day delivery. The engine runs
              once you submit; you receive a full report and a strategy
              session with a Wiele principal.
            </p>
            <AuditForm />
          </div>
        </div>
      </section>

      {/* What you'll receive */}
      <section className="py-16 md:py-20 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What you&apos;ll receive
            </p>
            <h2 className="text-display-md text-white text-balance">
              The 5-step delivery flow.
            </h2>
          </div>
          <Reveal stagger={0.06} className="flex flex-col gap-3 max-w-2xl">
            {auditPreviewSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric"
                >
                  <Check size={12} />
                </span>
                <span className="text-body-md text-cloud">
                  <span className="font-mono text-smoke mr-2">0{i + 1}</span>
                  {step}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
