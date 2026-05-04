import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { PromptSimulator } from "@/components/sections/prompt-simulator";
import type { SystemDetailEntry } from "@/data/systems-detail";
import { siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";

/**
 * The single template all 4 /systems/<slug> pages render through.
 * AI Visibility passes a denser data payload (more case examples,
 * deeper methodology, longer FAQ) — same template, more content.
 *
 * Build-once-use-five contract: Outputs section embeds
 * <PromptSimulator data={system.exampleFixture} animate={false} />.
 *
 * Schema injection: emits Service + FAQPage + BreadcrumbList JSON-LD
 * for every system route, sourced from the same data payload.
 */
export function SystemDetail({ system }: { system: SystemDetailEntry }) {
  const url = `${siteConfig.url}/systems/${system.slug}`;
  const service = serviceSchema({
    name: system.hero.title,
    description: system.hero.subtitle,
    url,
    serviceType: system.hero.title,
  });
  const faq = faqSchema(system.faq.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Systems", url: `${siteConfig.url}/systems` },
    { name: system.hero.title, url },
  ]);

  return (
    <>
      <JsonLd schema={service} id={`schema-service-${system.slug}`} />
      <JsonLd schema={faq} id={`schema-faq-${system.slug}`} />
      <JsonLd schema={breadcrumbs} id={`schema-breadcrumb-${system.slug}`} />

      <SystemHero system={system} />
      <SystemWhatItCovers system={system} />
      <SystemMethodology system={system} />
      <SystemOutputs system={system} />
      <SystemOutcomes system={system} />
      {system.caseExamples ? <SystemCaseExamples system={system} /> : null}
      <SystemFaq system={system} />
      <SystemRelated system={system} />
      <SystemFinalCta />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────────────────────── */

function SystemHero({ system }: { system: SystemDetailEntry }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 ambient-gradient pointer-events-none"
      />
      <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <FadeIn>
            <Badge variant="electric" size="sm" className="mb-5">
              {system.hero.eyebrow}
            </Badge>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-display-xl text-white text-balance mb-5">
              {system.hero.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-body-lg text-silver max-w-2xl">
              {system.hero.subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/audit"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                Run Signal Audit
              </Link>
              <Link
                href="/pricing"
                className={buttonStyles({ variant: "ghost", size: "lg" })}
              >
                See pricing
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   What it covers
───────────────────────────────────────────────────────────────── */

function SystemWhatItCovers({ system }: { system: SystemDetailEntry }) {
  return (
    <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What it covers
            </p>
            <h2 className="text-display-md text-white text-balance">
              {system.whatItCovers.intro}
            </h2>
          </div>
          <Reveal stagger={0.05} className="grid gap-3">
            {system.whatItCovers.capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric"
                >
                  <Check size={12} />
                </span>
                <span className="text-body-md text-cloud">{cap}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Methodology
───────────────────────────────────────────────────────────────── */

function SystemMethodology({ system }: { system: SystemDetailEntry }) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            Methodology
          </p>
          <h2 className="text-display-md text-white text-balance">
            {system.methodology.intro}
          </h2>
        </div>
        <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {system.methodology.steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
            >
              <p className="text-body-xs font-mono text-electric mb-3">
                {step.number}
              </p>
              <h3 className="text-heading-sm text-white mb-2.5">
                {step.title}
              </h3>
              <p className="text-body-sm text-silver">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Outputs — embeds PromptSimulator with animate=false
───────────────────────────────────────────────────────────────── */

function SystemOutputs({ system }: { system: SystemDetailEntry }) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            Outputs
          </p>
          <h2 className="text-display-md text-white text-balance">
            What the engine returns for this system.
          </h2>
          <p className="text-body-md text-silver mt-4">
            Sample engine output · The same panel renders the hero, the audit
            results page, and every Wiele case study.
          </p>
        </div>
        <FadeIn whileInView>
          <PromptSimulator data={system.exampleFixture} animate={false} />
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Outcomes
───────────────────────────────────────────────────────────────── */

function SystemOutcomes({ system }: { system: SystemDetailEntry }) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Outcomes
            </p>
            <h2 className="text-display-md text-white text-balance">
              {system.outcomes.intro}
            </h2>
          </div>
          <Reveal stagger={0.05} className="flex flex-col gap-2.5">
            {system.outcomes.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3"
              >
                <Check size={16} className="mt-0.5 shrink-0 text-electric" aria-hidden />
                <span className="text-body-md text-cloud">{item}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Case examples (optional — AI Visibility only)
───────────────────────────────────────────────────────────────── */

function SystemCaseExamples({ system }: { system: SystemDetailEntry }) {
  if (!system.caseExamples) return null;
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-10">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            Case examples
          </p>
          <h2 className="text-display-md text-white text-balance">
            How this system shows up in real engagements.
          </h2>
        </div>
        <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2">
          {system.caseExamples.map((example) => (
            <Card key={example.sector} variant="default">
              <Badge variant="outline" size="sm" className="mb-3 self-start">
                {example.sector}
              </Badge>
              <CardTitle className="mb-2 text-heading-sm">
                {example.summary.split("—")[0]?.trim() || example.summary}
              </CardTitle>
              <CardContent className="text-silver text-body-sm">
                {example.summary}
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────────── */

function SystemFaq({ system }: { system: SystemDetailEntry }) {
  const items = system.faq.map((f, i) => ({
    id: `faq-${system.slug}-${i}`,
    question: f.question,
    answer: f.answer,
  }));
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4 text-center">
            Frequently asked
          </p>
          <h2 className="text-display-md text-white text-balance text-center mb-10">
            Questions on {system.hero.title}.
          </h2>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Related systems
───────────────────────────────────────────────────────────────── */

function SystemRelated({ system }: { system: SystemDetailEntry }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
          Related systems
        </p>
        <Reveal stagger={0.05} className="grid gap-3 md:grid-cols-3">
          {system.related.map((rel) => (
            <Link
              key={rel.slug}
              href={`/systems/${rel.slug}`}
              className="group flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3.5 transition-[border-color,background-color] hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:border-electric"
            >
              <span className="text-body-md text-cloud group-hover:text-white transition-colors">
                {rel.title}
              </span>
              <ArrowUpRight
                size={16}
                className="text-electric transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Final CTA
───────────────────────────────────────────────────────────────── */

function SystemFinalCta() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-[var(--container-px)] text-center">
        <h2 className="text-display-md text-white text-balance mb-5">
          Diagnose first. Then commit.
        </h2>
        <p className="text-body-lg text-silver mb-8 max-w-xl mx-auto">
          Every Wiele engagement starts with a Signal Audit. £2,500 one-off, 14
          days to delivery, no retainer required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/audit"
            className={buttonStyles({ variant: "primary", size: "lg" })}
          >
            Run a Growth Audit
          </Link>
          <Link
            href="/contact"
            className={buttonStyles({ variant: "ghost", size: "lg" })}
          >
            Book Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
