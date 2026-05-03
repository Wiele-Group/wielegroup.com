import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { pricingTiers } from "@/data/pricing";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Diagnose first, then commit",
  description:
    "Signal Audit £2,500 one-off + Launch £1,500/mo · Growth System £4,000/mo · Authority Engine £8,000/mo · Wiele OS £15,000+/mo. GBP. 30-day notice.",
  path: "/pricing",
});

const pricingFaq = [
  {
    id: "audit-required",
    question: "Do I need to do the Signal Audit before a Growth System engagement?",
    answer:
      "Yes — every engagement starts with the Signal Audit. £2,500 one-off, 14 days, credited against month one if you continue with a Growth System or above.",
  },
  {
    id: "minimum-commitment",
    question: "What's the minimum commitment?",
    answer:
      "Signal Audit is one-off. Growth System and above run on a 90-day initial commitment, then 30-day rolling notice. We don't require long lock-ins.",
  },
  {
    id: "switch-tiers",
    question: "Can I move between tiers?",
    answer:
      "Yes. Move up or down at the start of any month. Scope and deliverables adjust accordingly.",
  },
  {
    id: "ad-spend",
    question: "Is ad spend included in the pricing?",
    answer:
      "No. Wiele's fee and your media spend are separate line items. We recommend Wiele Growth System or above before scaling paid acquisition; the audit will tell you when you're ready.",
  },
  {
    id: "custom-scope",
    question: "What if I need a custom scope?",
    answer:
      "Wiele OS is fully custom by default. Growth System and Authority Engine can be scoped against specific outcomes — talk to us about what you're trying to achieve.",
  },
  {
    id: "guarantee",
    question: "Do you guarantee specific outcomes?",
    answer:
      "We guarantee the work, the methodology, and the engine measurement. We don't guarantee specific lift numbers — anyone who does is selling something other than methodology.",
  },
  {
    id: "vat",
    question: "Are prices inclusive of VAT?",
    answer:
      "Prices listed exclude VAT. UK clients pay 20% VAT on top. Non-UK clients are invoiced under reverse-charge / zero-rate rules where applicable.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Pricing
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Diagnose first. Then commit.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Every Wiele engagement starts with a Signal Audit. From there
                you choose the velocity. GBP. 30-day notice. No long lock-ins.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pricingTiers.map((tier) => (
              <article
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-[var(--radius-lg)] border p-6 md:p-7",
                  "bg-[var(--color-surface-elevated)]",
                  tier.featured
                    ? "border-electric shadow-[var(--shadow-glow-electric)]"
                    : "border-[var(--color-border-default)]",
                )}
              >
                {tier.featured ? (
                  <Badge variant="electric" size="sm" className="absolute -top-2 left-6">
                    Most chosen
                  </Badge>
                ) : null}
                <h2 className="text-heading-md text-white">{tier.name}</h2>
                <div className="mt-3 mb-1">
                  <span className="font-mono text-[1.75rem] leading-none font-semibold text-white">
                    {tier.price}
                  </span>
                </div>
                {tier.oneOff ? (
                  <p className="text-body-xs font-mono text-smoke mb-4">{tier.oneOff}</p>
                ) : (
                  <div className="mb-4" />
                )}
                <p className="text-body-sm text-silver mb-5">{tier.positioning}</p>
                <ul className="flex flex-col gap-2 mb-6">
                  {tier.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-body-sm text-cloud">
                      <Check size={14} className="mt-1 shrink-0 text-electric" aria-hidden />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.cta.href}
                  className={cn(
                    buttonStyles({
                      variant: tier.featured ? "primary" : "ghost",
                      size: "md",
                    }),
                    "mt-auto w-full",
                  )}
                >
                  {tier.cta.label}
                </Link>
              </article>
            ))}
          </Reveal>

          <p className="mt-8 text-body-xs font-mono text-smoke text-center">
            All prices in GBP, exclude VAT. Wiele bills monthly. 30-day notice. No long-term lock-in.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4 text-center">
            Pricing FAQ
          </p>
          <h2 className="text-display-md text-white text-balance text-center mb-10">
            Common questions on tiers, terms, and what&apos;s included.
          </h2>
          <Accordion items={pricingFaq} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
