import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { getVisibleCaseStudyManifest } from "@/lib/case-studies-static";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Proof — Wiele engagements, methodology, and how case studies are built",
  description:
    "Methodology open. Outcomes named. Every Wiele case study renders the same engine panel as the homepage and audit results — no aspirational ranges, no unverifiable lift numbers.",
  path: "/proof",
});

const programmes = [
  {
    sector: "Premium SaaS",
    headline: "AI Visibility Programme",
    summary:
      "For B2B SaaS companies whose ideal buyers ask AI engines for recommendations before they ever visit a SERP. Twelve-week programme: citation graph audit, entity baseline, founder-voice content, comparison-page system, monthly engine re-runs.",
  },
  {
    sector: "Premium Services",
    headline: "Authority Engine Retainer",
    summary:
      "For consultancies, firms, and advisors who win on reputation. Editorial system, founder-voice writing engine, citation graph maintenance, analyst outreach, monthly engine reporting against named competitor set.",
  },
  {
    sector: "Premium DTC + Luxury",
    headline: "Integrated Growth System",
    summary:
      "For premium consumer brands needing brand, web, advertising, SEO, and AI search to compound rather than cancel. Brand layer, web experience layer, paid acceleration layer, AI visibility substrate — one operating system.",
  },
];

const methodologyNotes = [
  {
    title: "Engine output, not aspirational ranges",
    body:
      "Every metric in a Wiele case study traces back to a real engine run with a logged source. No \"up to 300% lift\" — only what the engine actually returned, with the citation log to prove it.",
  },
  {
    title: "Same panel, real data",
    body:
      "The PromptSimulator panel that animates on the homepage renders here in static mode against the case-study fixture. Marketing IA, product IA, and case-study IA are the same surface — no \"agency view\" vs \"reality.\"",
  },
  {
    title: "Anonymisation when required",
    body:
      "Where NDAs apply, brand names are anonymised but engine output, methodology, and outcomes are still verifiable. Where a client agrees to be named, they review and approve every line of public framing in writing.",
  },
];

export default function ProofPage() {
  const caseStudies = getVisibleCaseStudyManifest();
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Proof", url: `${siteConfig.url}/proof` },
  ]);
  const itemList = itemListSchema({
    name: "Wiele Programme Catalogue + Case Study Anchors",
    items: [
      ...programmes.map((p) => ({
        name: `${p.sector} — ${p.headline}`,
        url: `${siteConfig.url}/proof#${p.sector
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
      })),
      ...caseStudies.map((c) => ({
        name: c.title,
        url: `${siteConfig.url}/proof/${c.slug}`,
      })),
    ],
  });
  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-proof" />
      <JsonLd schema={itemList} id="schema-itemlist-proof" />
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
                Engine output. Methodology open. Founding cohort opening.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Wiele&apos;s first commercial cohort is open. Below: the three
                programme shapes ready for engagement, the methodology that
                runs through every engagement, and the standard against which
                future case studies will be published.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Programme catalogue
            </p>
            <h2 className="text-display-md text-white text-balance">
              Three programme shapes. One operating system underneath.
            </h2>
            <p className="text-body-md text-silver mt-4">
              Each programme runs on the same Wiele Operating System. Engine
              methodology, citation log, and reporting are identical across
              tiers — only the surface area, intensity, and lever count
              differ.
            </p>
          </div>
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-3">
            {programmes.map((p) => (
              <article
                key={p.headline}
                id={p.sector.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[18rem] scroll-mt-24"
              >
                <Badge variant="outline" size="sm" className="mb-4 self-start">
                  {p.sector}
                </Badge>
                <h3 className="text-heading-md text-white leading-tight mb-3">
                  {p.headline}
                </h3>
                <p className="text-body-sm text-silver flex-1">
                  {p.summary}
                </p>
                <div className="mt-5 pt-4 border-t border-[var(--color-border-default)]">
                  <Link
                    href="/audit"
                    className={buttonStyles({ variant: "ghost", size: "sm" })}
                  >
                    Start with a Signal Audit
                  </Link>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        id="case-study-anchors"
        className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Case study anchors
            </p>
            <h2 className="text-display-md text-white text-balance">
              Engagement archetypes — Foundation and Sovereign cycles.
            </h2>
            <p className="text-body-md text-silver mt-4">
              Two engagement archetypes published at the standard above —
              methodology open, engine output verifiable, anonymisation framed
              per the founding-cohort policy. The Foundation cycle is the
              six-week site-system reset. The Sovereign cycle is the
              six-month authority-engineering retainer. Both are the same
              operating system run at different surface area.
            </p>
          </div>
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2">
            {caseStudies.map((cs) => {
              const headline = cs.metricsHeadline[0];
              const isSovereign = cs.tier === "Sovereign";
              return (
                <article
                  key={cs.slug}
                  className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[18rem]"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {isSovereign ? (
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white"
                        style={{ background: "var(--gradient-duality-edge)" }}
                      >
                        {cs.tier}
                      </span>
                    ) : (
                      <Badge variant="electric" size="sm">
                        {cs.tier}
                      </Badge>
                    )}
                    <span className="text-body-xs font-mono uppercase tracking-[0.16em] text-smoke">
                      {cs.sector}
                    </span>
                  </div>
                  <h3 className="text-heading-md text-white leading-tight mb-3">
                    <Link
                      href={`/proof/${cs.slug}`}
                      className="hover:text-electric-light transition-colors"
                    >
                      {cs.title}
                    </Link>
                  </h3>
                  <p className="text-body-sm text-silver mb-4">{cs.summary}</p>
                  {headline ? (
                    <p className="text-body-xs font-mono text-cloud mb-5">
                      <span className="text-smoke">{headline.label}:</span>{" "}
                      {headline.before} → {headline.after} · {headline.window}
                    </p>
                  ) : null}
                  <div className="mt-auto pt-4 border-t border-[var(--color-border-default)]">
                    <Link
                      href={`/proof/${cs.slug}`}
                      className="inline-flex items-center gap-1.5 text-body-sm font-medium text-electric hover:text-electric-light transition-colors"
                    >
                      Read engagement
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                </article>
              );
            })}
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
            <p className="text-body-md text-silver mt-4">
              The standard the founding cohort is being built against — and
              the standard every future case study on this page will meet
              before it&apos;s published.
            </p>
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
          <div className="mt-12 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-3">
              Founding-cohort note
            </p>
            <p className="text-body-md text-silver">
              Wiele is open to its founding cohort now. Engagements that ship
              with full transparency, full methodology disclosure, and
              published outcomes (under the standard above) will be the case
              studies that fill this page. To be considered, run a{" "}
              <Link
                href="/audit"
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                Signal Audit
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                contact us
              </Link>{" "}
              directly.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
