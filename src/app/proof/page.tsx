import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { proofPlaceholders } from "@/data/homepage";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Proof — Wiele engagements, engine output, before and after",
  description:
    "Every Wiele case study renders the same engine panel as the homepage and audit results. Methodology open. Outcomes named. Live in Phase 3.",
  path: "/proof",
});

const methodologyNotes = [
  {
    title: "Engine output, not aspirational ranges",
    body:
      "Every metric in a case study traces back to a real Wiele OS engine run with a logged source. We don't show \"up to 300% lift\" — we show what the engine actually returned.",
  },
  {
    title: "Same panel, real data",
    body:
      "The PromptSimulator panel that animates on the homepage renders here in static mode with the case-study fixture. Marketing IA = product IA = case-study IA.",
  },
  {
    title: "Anonymisation when required",
    body:
      "Where NDAs apply, brand names are anonymised but engine output, methodology, and outcomes are still verifiable.",
  },
];

export default function ProofPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Proof", url: `${siteConfig.url}/proof` },
  ]);
  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-proof" />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Proof
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Engine output. Real engagements. Methodology open.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Every Wiele case study renders the same engine panel you see on
                the homepage — applied to a real brand, real prompt surface,
                real before/after.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-3">
            {proofPlaceholders.map((proof) => (
              <article
                key={proof.headline}
                className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[18rem]"
              >
                <Badge variant="outline" size="sm" className="mb-4 self-start">
                  {proof.sector}
                </Badge>
                <h2 className="text-heading-md text-white leading-tight mb-3">
                  {proof.headline}
                </h2>
                <p className="text-body-sm text-silver flex-1">
                  [CASE STUDY PENDING — fixture data shape only]{" "}
                  {proof.summary}
                </p>
                <div className="mt-5 pt-4 border-t border-[var(--color-border-default)]">
                  <span className="text-body-xs font-mono text-warning">
                    Awaiting client sign-off
                  </span>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Methodology notes
            </p>
            <h2 className="text-display-md text-white text-balance">
              How Wiele case studies are built.
            </h2>
          </div>
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-3">
            {methodologyNotes.map((n) => (
              <div
                key={n.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <h3 className="text-heading-sm text-white mb-2.5">{n.title}</h3>
                <p className="text-body-sm text-silver">{n.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
