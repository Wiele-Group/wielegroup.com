import Link from "next/link";
import { ArrowRight, Check, Shield } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { cn } from "@/lib/utils";
import type { Division, DivisionTierAccent } from "@/data/divisions";

/**
 * DivisionPage — shared shell for the four agency-division landing pages.
 *
 * Renders: hero (with B4 tier-coded accent) → services grid (6 cells) →
 * 3-tier sub-pricing ladder → FAQ (Accordion) → CTASection.
 *
 * The accent system is data-driven via `division.accent` so the four pages
 * share one visual structure with four distinct visual signatures, per
 * Brand v2 B4 Chromaglass tier rules:
 *
 *   blue     → --color-blue-core   · Marketing
 *   coral    → --color-coral-core  · Advertising
 *   chrome   → --color-chrome-mid  · Brand Management
 *   duality  → gradient-duality    · Web Design / PBSS
 *   electric → --color-electric    · AI Visibility surface (v3.3 AVM)
 */

const accentToken: Record<DivisionTierAccent, {
  /** Inline CSS color value for accents that need exact tokens. */
  border: string;
  /** Eyebrow color CSS var name (without the var()). */
  eyebrow: string;
  /** Capability dot color. */
  dot: string;
  /** Tailwind class to apply tier-accent border on featured card. */
  tierAccentClass: string;
}> = {
  blue: {
    border: "var(--color-blue-core)",
    eyebrow: "var(--color-blue-core)",
    dot: "var(--color-blue-core)",
    tierAccentClass: "tier-accent-blue",
  },
  coral: {
    border: "var(--color-coral-core)",
    eyebrow: "var(--color-coral-core)",
    dot: "var(--color-coral-core)",
    tierAccentClass: "tier-accent-coral",
  },
  chrome: {
    border: "var(--color-chrome-mid)",
    eyebrow: "var(--color-chrome-mid)",
    dot: "var(--color-chrome-mid)",
    tierAccentClass: "tier-accent-chrome",
  },
  duality: {
    border: "var(--gradient-duality-edge)",
    eyebrow: "var(--color-blue-core)",
    dot: "var(--color-coral-core)",
    tierAccentClass: "tier-accent-duality",
  },
  electric: {
    border: "var(--color-electric)",
    eyebrow: "var(--color-electric)",
    dot: "var(--color-electric)",
    tierAccentClass: "tier-accent-electric",
  },
};

export function DivisionPage({ division }: { division: Division }) {
  const accent = accentToken[division.accent];
  const accordionItems = division.faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <FadeIn>
              <p
                className="text-body-xs font-mono uppercase tracking-[0.16em] mb-5"
                style={{ color: accent.eyebrow }}
              >
                {division.eyebrow}
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                {division.headline}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl mb-8">
                {division.subhead}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={division.primaryCta.href}
                  className={buttonStyles({
                    variant: division.accent === "duality" ? "featured" : "primary",
                    size: "lg",
                  })}
                >
                  {division.primaryCta.label}
                </Link>
                <Link
                  href={division.secondaryCta.href}
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  {division.secondaryCta.label}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[var(--color-void)]/50">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p
              className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4"
              style={{ color: accent.eyebrow }}
            >
              Capabilities
            </p>
            <h2 className="text-display-md text-white text-balance">
              Six engines. One operating system.
            </h2>
          </div>

          <Reveal
            stagger={0.05}
            className="wg-depth-scene grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {division.services.map((s) => (
              <article
                key={s.num}
                className="relative flex flex-col p-6 md:p-7 chrome-card wg-depth-card"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-body-xs text-smoke tracking-[0.18em]">
                    {s.num}
                  </span>
                  <span
                    aria-hidden
                    className="block h-1 w-1 rounded-full"
                    style={{ background: accent.dot }}
                  />
                </div>
                <h3 className="text-heading-md text-white mb-2 leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="text-body-sm text-silver leading-relaxed">
                  {s.body}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Divider variant={division.accent === "duality" ? "duality" : "chrome"} />

      {/* ── Proof callout (v3.2 — single engagement archetype) ──── */}
      {division.proofCallout ? (
        <section className="py-12 md:py-14 bg-[var(--color-obsidian)]/30">
          <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-7 md:p-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p
                  className="text-body-xs font-mono uppercase tracking-[0.16em] mb-3"
                  style={{ color: accent.eyebrow }}
                >
                  {division.proofCallout.eyebrow}
                </p>
                <h2 className="text-heading-lg text-white text-balance mb-2">
                  {division.proofCallout.headline}
                </h2>
                <p className="text-body-md text-silver max-w-2xl">
                  {division.proofCallout.body}
                </p>
              </div>
              <Link
                href={division.proofCallout.href}
                className={buttonStyles({ variant: "ghost", size: "md" })}
              >
                {division.proofCallout.cta}
                <ArrowRight size={14} className="ml-1.5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Deeper framework callout (v3.4.1 — open methodology link) ─ */}
      {division.deeperFramework ? (
        <section className="py-12 md:py-14">
          <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-7 md:p-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p
                  className="text-body-xs font-mono uppercase tracking-[0.16em] mb-3"
                  style={{ color: accent.eyebrow }}
                >
                  {division.deeperFramework.eyebrow}
                </p>
                <h2 className="text-heading-lg text-white text-balance mb-2">
                  {division.deeperFramework.headline}
                </h2>
                <p className="text-body-md text-silver max-w-2xl">
                  {division.deeperFramework.body}
                </p>
              </div>
              <Link
                href={division.deeperFramework.href}
                className={buttonStyles({ variant: "ghost", size: "md" })}
              >
                {division.deeperFramework.cta}
                <ArrowRight size={14} className="ml-1.5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Pricing ladder ──────────────────────────────────────── */}
      <section id="tiers" className="py-20 md:py-28">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p
              className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4"
              style={{ color: accent.eyebrow }}
            >
              Pricing
            </p>
            <h2 className="text-display-md text-white text-balance">
              Diagnose first. Then commit.
            </h2>
            <p className="text-body-md text-silver mt-4">
              Three engagement tiers. GBP. 30-day notice. No long lock-ins.
            </p>
          </div>

          <Reveal
            stagger={0.06}
            className="wg-depth-scene grid gap-4 md:grid-cols-3"
          >
            {division.tiers.map((tier) => {
              const isFeatured = !!tier.featured;
              return (
                <article
                  key={tier.id}
                  data-tier={tier.id}
                  data-featured={isFeatured ? "true" : undefined}
                  className={cn(
                    "relative flex flex-col p-6 md:p-7 wg-depth-card",
                    isFeatured
                      ? "duality-border chrome-card"
                      : "chrome-card",
                  )}
                >
                  {isFeatured ? (
                    <span
                      className="absolute -top-2.5 left-6 px-3 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white"
                      style={{ background: "var(--gradient-duality-edge)" }}
                    >
                      Most chosen
                    </span>
                  ) : null}
                  <h3 className="text-heading-md text-white">{tier.name}</h3>
                  <div className="mt-3 mb-1">
                    <span className="font-mono text-[1.75rem] leading-none font-semibold text-white">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-body-xs font-mono text-smoke mb-3">
                    {tier.cadence}
                  </p>
                  <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-electric/30 bg-electric/5">
                    <Shield size={11} className="text-electric" aria-hidden />
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-electric">
                      AI Visibility Defense built-in
                    </span>
                  </div>
                  <p className="text-body-sm text-silver mb-5">
                    {tier.positioning}
                  </p>

                  <ul className="flex flex-col gap-2 mb-6">
                    {tier.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2 text-body-sm text-cloud"
                      >
                        <Check
                          size={14}
                          className="mt-1 shrink-0"
                          style={{ color: accent.dot }}
                          aria-hidden
                        />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={tier.cta.href}
                      className={cn(
                        buttonStyles({
                          variant: isFeatured ? "featured" : "ghost",
                          size: "md",
                        }),
                        "w-full",
                      )}
                    >
                      {tier.cta.label}
                    </Link>
                    {tier.proofUrl ? (
                      <Link
                        href={tier.proofUrl}
                        className="mt-3 inline-flex items-center gap-1.5 text-body-xs font-mono uppercase tracking-[0.12em] text-silver hover:text-electric transition-colors"
                      >
                        See engagement archetype
                        <ArrowRight size={12} aria-hidden />
                      </Link>
                    ) : null}
                    {tier.stackWith ? (
                      <Link
                        href={tier.stackWith.href}
                        className="mt-2 inline-flex items-center gap-1.5 text-body-xs font-mono uppercase tracking-[0.12em] text-silver hover:text-electric transition-colors"
                      >
                        {tier.stackWith.label}
                        <ArrowRight size={12} aria-hidden />
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </Reveal>

          <p className="mt-8 text-body-xs font-mono text-smoke text-center">
            All prices in GBP, exclude VAT. 30-day notice. No long-term lock-in.
          </p>
        </div>
      </section>

      <Divider />

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <p
            className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4 text-center"
            style={{ color: accent.eyebrow }}
          >
            FAQ
          </p>
          <h2 className="text-display-md text-white text-balance text-center mb-10">
            Common questions about {division.eyebrow.toLowerCase()}.
          </h2>
          <Accordion items={accordionItems} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
