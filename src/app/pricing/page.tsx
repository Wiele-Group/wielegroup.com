import type { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { RecurringAiVisibilityTiers } from "@/components/sections/recurring-ai-visibility-tiers";
import { JsonLd } from "@/components/json-ld";
import { pricingTiers, tierSchemaPrice } from "@/data/pricing";
import { citationScoreTiers } from "@/data/citation-score";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  productSchema,
  serviceTierSchema,
} from "@/lib/schema";

// v3.8.0 — force-static + 1h ISR. Pricing data ships as a static module
// (`@/data/pricing`); no per-request data fetch. Eliminates CF Workers
// Free CPU exceedance.
export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Premium AI search dominance, with defense built-in",
  description:
    "Six-tier ladder. AI Visibility Defense baked into every tier. Signal Audit £2,500 · Launch £1,950 · Growth £4,500 · Authority £8,500 · Wiele OS £15,000 · Sovereign from £45,000. GBP. 30-day notice.",
  path: "/pricing",
});

const defenseVectors = [
  {
    title: "Prompt-injection surface monitoring",
    body:
      "We map and remediate the owned-channel attack surface where adversaries can plant manipulation instructions an AI engine will ingest.",
  },
  {
    title: "AI crawler access posture",
    body:
      "We audit and manage GPTBot, ClaudeBot, PerplexityBot, GoogleOther access. We make sure every AI engine that decides who gets cited can find you, read you, and trust you.",
  },
  {
    title: "Competitor displacement risk model",
    body:
      "We model who is taking your citation share across 50 buyer-intent queries × 4 engines, and we counter-engineer their authority graph.",
  },
];

const pricingFaq = [
  {
    id: "ai-defense-included",
    question: "Do all Wiele tiers really include AI Visibility Defense?",
    answer:
      "Yes. Every paid tier includes prompt-injection surface monitoring, AI crawler access posture management, and competitor displacement risk modeling. The depth and frequency scale with tier — annual baseline at Launch, real-time embedded at Sovereign.",
  },
  {
    id: "wiele-os-vs-sovereign",
    question: "What's the difference between Wiele OS and Sovereign?",
    answer:
      "Wiele OS embeds a full Wiele team across SEO, GEO, brand, web, and advertising. Sovereign adds founder-led strategy, a dedicated team, real-time AI defense across owned and earned surfaces, and monthly adversarial competitor red-team exercises. Sovereign is bespoke per engagement; Wiele OS is the standard top-tier embedded engagement.",
  },
  {
    id: "ai-defense-built-in",
    question: "Why is AI Visibility Defense built in instead of an add-on?",
    answer:
      "Because AI search has fundamentally changed how brand authority is awarded. Defending your AI visibility is now a foundational requirement, not an optional upsell. Bundling it ensures every Wiele client gets defended regardless of tier.",
  },
  {
    id: "audit-required",
    question: "Do I need to do the Signal Audit before a Growth System engagement?",
    answer:
      "We recommend it for every engagement. £2,500 one-off, 14 days, credited against month one if you continue with a Growth System or above.",
  },
  {
    id: "minimum-commitment",
    question: "What's the minimum commitment?",
    answer:
      "Signal Audit is one-off. Launch and above run on a 90-day initial commitment, then 30-day rolling notice. Sovereign is contracted per engagement scope. We don't require long lock-ins on the standard ladder.",
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
      "No. Wiele's fee and your media spend are separate line items. We recommend Growth System or above before scaling paid acquisition; the audit will tell you when you're ready.",
  },
  {
    id: "custom-scope",
    question: "What if I need a custom scope?",
    answer:
      "Wiele OS and Sovereign are scoped to outcome by default. Growth System and Authority Engine can be scoped against specific outcomes — talk to us about what you're trying to achieve.",
  },
  {
    id: "guarantee",
    question: "Do you guarantee specific outcomes?",
    answer:
      "Authority Engine and above carry an outcome-based AI citation guarantee. Across all tiers, we guarantee the work, the methodology, and the engine measurement. We don't promise specific lift numbers without context — anyone who does is selling something other than methodology.",
  },
  {
    id: "vat",
    question: "Are prices inclusive of VAT?",
    answer:
      "Prices listed exclude VAT. UK clients pay 20% VAT on top. Non-UK clients are invoiced under reverse-charge / zero-rate rules where applicable.",
  },
];

export default function PricingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Pricing", url: `${siteConfig.url}/pricing` },
  ]);
  const faq = faqSchema(pricingFaq.map((f) => ({ question: f.question, answer: f.answer })));

  // One Product schema per one-off pricing tier. Numeric price comes off
  // the tier object — no string-parsing needed in v3.
  const products = pricingTiers.map((tier) =>
    productSchema({
      name: `Wiele ${tier.name}`,
      description: tier.positioning,
      price: tierSchemaPrice(tier),
      priceCurrency: "GBP",
      url: `${siteConfig.url}/pricing#${tier.id}`,
    }),
  );

  // v3.9.4 — Service schemas for Citation Score™ recurring tiers.
  // `serviceTierSchema(recurring: true)` emits the UnitPriceSpecification
  // block with billingDuration P1M that the directive AC #2 requires.
  const citationScoreServiceSchemas = citationScoreTiers.map((tier) =>
    serviceTierSchema({
      name: tier.name,
      description: tier.schemaDescription,
      serviceType: tier.schemaServiceType,
      price: String(tier.priceGbp),
      priceCurrency: "GBP",
      url: `${siteConfig.url}/pricing#citation-score-${tier.slug}`,
      recurring: true,
    }),
  );

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-pricing" />
      <JsonLd schema={faq} id="schema-faq-pricing" />
      {products.map((product, i) => (
        <JsonLd
          key={pricingTiers[i].id}
          schema={product}
          id={`schema-product-${pricingTiers[i].id}`}
        />
      ))}
      {citationScoreServiceSchemas.map((service, i) => (
        <JsonLd
          key={citationScoreTiers[i].slug}
          schema={service}
          id={`schema-citation-score-${citationScoreTiers[i].slug}`}
        />
      ))}

      {/* ── Hero ──────────────────────────────────────────────── */}
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
                Premium AI search dominance — with defense built-in.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Every Wiele tier includes AI Visibility Defense — prompt-injection
                surface monitoring, AI crawler posture management, and
                competitor displacement counter-engineering. Defend your
                authority. Compound your revenue.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Why every Wiele engagement defends your AI visibility ── */}
      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              AI Visibility Defense · Built-in
            </p>
            <h2 className="text-display-md text-white text-balance mb-5">
              Why every Wiele engagement defends your AI visibility.
            </h2>
            <div className="text-body-md text-silver max-w-2xl space-y-4">
              <p>
                AI search is now the front door. ChatGPT, Perplexity, Gemini,
                and Claude decide which brands get cited — and which are
                silently displaced. Most agencies optimize for visibility. We
                engineer for visibility AND defense.
              </p>
              <p>
                Every Wiele tier includes three defense vectors as standard,
                not as an upsell:
              </p>
            </div>
          </div>

          <Reveal stagger={0.05} className="grid gap-4 md:grid-cols-3">
            {defenseVectors.map((v) => (
              <div
                key={v.title}
                className="rounded-[var(--radius-lg)] border border-electric/25 bg-[var(--color-surface-elevated)] p-6"
              >
                <h3 className="text-heading-sm text-white mb-2.5">{v.title}</h3>
                <p className="text-body-sm text-silver">{v.body}</p>
              </div>
            ))}
          </Reveal>

          <p className="mt-8 text-body-sm text-smoke max-w-3xl">
            Tier depth scales the frequency and the team. The defense is
            non-negotiable.
          </p>
        </div>
      </section>

      {/* ── v3.9.4 — Citation Score™ subscription tiers (3, GBP/mo) ── */}
      {/* Positioned ABOVE the one-off ladder per AMENDMENT A §3'.
          Anchor #recurring-ai-visibility carries Brief #001 deep-link. */}
      <RecurringAiVisibilityTiers />

      {/* ── 6-tier ladder + Sovereign anchor ───────────────────── */}
      <PricingSection showHeading={false} />

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4 text-center">
            Pricing FAQ
          </p>
          <h2 className="text-display-md text-white text-balance text-center mb-10">
            Common questions on tiers, defense, and what&apos;s included.
          </h2>
          <Accordion items={pricingFaq} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
