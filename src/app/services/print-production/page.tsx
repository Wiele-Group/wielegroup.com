import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { printServices, printFaqs } from "@/data/print-services";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  serviceTierSchema,
} from "@/lib/schema";

// v3.9.0 — force-static + 1h ISR per v3.8.0 pattern. Static data module,
// no fs access, suitable for CF Workers Free.
export const dynamic = "force-static";
export const revalidate = 3600;

const HERO_IMAGE = {
  src: "/images/agencies/wiele-print-production-hero-letterpress-cards.png",
  alt: "Wiele Print Production — premium letterpress business cards photographed dimensionally with electric-blue rim lighting on obsidian, representing tech-meets-craft print production.",
  width: 1920,
  height: 1080,
} as const;

export const metadata: Metadata = buildMetadata({
  title: "Print Production · Premium letterpress, brand books, OOH",
  description:
    "Premium print engineered to the same standard as the digital brand. Business cards from £180. Stationery suites from £450. Brand book print runs from £950. Packaging, OOH, direct mail. UK manufacture · curated partners · designed by Wiele.",
  path: "/services/print-production",
  ogImage: HERO_IMAGE.src,
});

const WHY_VECTORS = [
  {
    num: "01",
    title: "Same standard as the brand work",
    body:
      "Print is brand expression in physical form — not a separate craft sub-contracted to the cheapest bidder. Same designers, same standards, same accountability.",
  },
  {
    num: "02",
    title: "UK manufacture · curated partners",
    body:
      "Every print partner vetted for premium stock, finish quality, environmental responsibility, and on-time delivery. We hold the supplier relationship; you hold the brand.",
  },
  {
    num: "03",
    title: "Designed by Wiele, executed end-to-end",
    body:
      "Concept → design → spec → production → quality check → delivery. One accountable team across the full chain. You sign off the proof; we own the rest.",
  },
] as const;

export default function PrintProductionPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "Print Production", url: `${siteConfig.url}/services/print-production` },
  ]);

  const service = serviceSchema({
    name: "Wiele Print Production",
    description:
      "Premium printed brand materials — letterpress business cards, stationery, brand books, packaging, OOH, direct mail. UK manufacture, curated partners, designed by Wiele.",
    url: `${siteConfig.url}/services/print-production`,
    serviceType: "Print Production and Branded Collateral",
  });

  const faq = faqSchema(
    printFaqs.map((f) => ({ question: f.question, answer: f.answer })),
  );

  // Only emit tier-schema for items with a numeric price. POA items have
  // no machine-readable offer to advertise.
  const tierSchemas = printServices
    .filter((s) => /\d/.test(s.price))
    .map((s) =>
      serviceTierSchema({
        name: `Wiele Print Production — ${s.name}`,
        description: s.positioning,
        serviceType: "Print Production",
        price: s.price.replace(/[^\d]/g, "") + ".00",
        priceCurrency: "GBP",
        url: `${siteConfig.url}/services/print-production#${s.id}`,
        recurring: false,
      }),
    );

  const accordionItems = printFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-print-production" />
      <JsonLd schema={service} id="schema-service-print-production" />
      <JsonLd schema={faq} id="schema-faq-print-production" />
      {tierSchemas.map((s, i) => (
        <JsonLd
          key={printServices[i].id}
          schema={s}
          id={`schema-service-tier-${printServices[i].id}`}
        />
      ))}

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="max-w-3xl">
              <FadeIn>
                <p
                  className="text-body-xs font-mono uppercase tracking-[0.16em] mb-5"
                  style={{ color: "var(--color-chrome-mid)" }}
                >
                  Print Production
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-display-xl text-white text-balance mb-5">
                  Premium print, engineered to the same standard as the brand it carries.
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-body-lg text-silver max-w-2xl mb-8">
                  Letterpress business cards, bound brand books, stationery suites, packaging,
                  direct mail, and out-of-home. UK manufacture through curated print partners.
                  Designed by Wiele, executed end-to-end.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="#services"
                    className={buttonStyles({ variant: "primary", size: "lg" })}
                  >
                    See print services
                  </Link>
                  <Link
                    href="/contact?intent=print"
                    className={buttonStyles({ variant: "ghost", size: "lg" })}
                  >
                    Talk to Wiele
                  </Link>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.1}>
              <div
                className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)]"
                data-print-hero="print-production"
              >
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  width={HERO_IMAGE.width}
                  height={HERO_IMAGE.height}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── First-100-words direct answer (AEO/GEO) ─────────────── */}
      <section className="py-12 md:py-14 bg-[var(--color-obsidian)]/30">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <FadeIn whileInView>
            <p className="text-body-lg text-cloud leading-relaxed">
              Wiele Print Production delivers premium printed brand materials for
              category-defining firms. From letterpress business cards to bound brand
              books to OOH campaigns, every output is engineered to the same precision
              standard as the digital brand work that surrounds it. UK-manufactured.
              Premium stock. Considered finishes. Designed by Wiele, produced through
              curated print partners, delivered to your door.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Why Wiele print ─────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p
              className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4"
              style={{ color: "var(--color-chrome-mid)" }}
            >
              Why Wiele print
            </p>
            <h2 className="text-display-md text-white text-balance">
              Print held to the brand standard. Not the cheapest standard.
            </h2>
          </div>

          <Reveal
            stagger={0.06}
            className="wg-depth-scene grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {WHY_VECTORS.map((v) => (
              <article
                key={v.num}
                className="relative flex flex-col p-6 md:p-7 chrome-card wg-depth-card"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-body-xs text-smoke tracking-[0.18em]">
                    {v.num}
                  </span>
                  <span
                    aria-hidden
                    className="block h-1 w-1 rounded-full"
                    style={{ background: "var(--color-chrome-mid)" }}
                  />
                </div>
                <h3 className="text-heading-md text-white mb-2 leading-tight tracking-tight">
                  {v.title}
                </h3>
                <p className="text-body-sm text-silver leading-relaxed">
                  {v.body}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── Services grid ────────────────────────────────────────── */}
      <section id="services" className="py-20 md:py-28">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p
              className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4"
              style={{ color: "var(--color-chrome-mid)" }}
            >
              Services
            </p>
            <h2 className="text-display-md text-white text-balance">
              Six print products. One standard.
            </h2>
            <p className="text-body-md text-silver mt-4">
              UK manufacture. GBP. Custom and large-format quoted bespoke.
            </p>
          </div>

          <Reveal
            stagger={0.05}
            className="wg-depth-scene grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {printServices.map((p) => {
              const isFeatured = !!p.featured;
              return (
                <article
                  key={p.id}
                  id={p.id}
                  data-print-service={p.id}
                  data-featured={isFeatured ? "true" : undefined}
                  className={`relative flex flex-col p-6 md:p-7 wg-depth-card ${
                    isFeatured ? "duality-border chrome-card" : "chrome-card"
                  }`}
                >
                  {isFeatured ? (
                    <span
                      className="absolute -top-2.5 left-6 px-3 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white"
                      style={{ background: "var(--gradient-duality-edge)" }}
                    >
                      Most ordered
                    </span>
                  ) : null}
                  <h3 className="text-heading-md text-white">{p.name}</h3>
                  <div className="mt-3 mb-1">
                    <span className="font-mono text-[1.75rem] leading-none font-semibold text-white">
                      {p.price}
                    </span>
                  </div>
                  <p className="text-body-xs font-mono text-smoke mb-4">
                    {p.cadence}
                  </p>
                  <p className="text-body-sm text-silver mb-5">{p.positioning}</p>

                  <ul className="flex flex-col gap-2 mb-6">
                    {p.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-body-sm text-cloud"
                      >
                        <Check
                          size={14}
                          className="mt-1 shrink-0"
                          style={{ color: "var(--color-chrome-mid)" }}
                          aria-hidden
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={p.cta.href}
                      className={`${buttonStyles({
                        variant: isFeatured ? "featured" : "ghost",
                        size: "md",
                      })} w-full`}
                    >
                      {p.cta.label}
                    </Link>
                  </div>
                </article>
              );
            })}
          </Reveal>

          <p className="mt-8 text-body-xs font-mono text-smoke text-center">
            All prices in GBP, exclude VAT and delivery outside the UK.
            Recurring print included in Brand Growth (£3,750/mo).
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="/brand-management-agency#tiers"
              className="inline-flex items-center gap-1.5 text-body-xs font-mono uppercase tracking-[0.12em] text-silver hover:text-electric transition-colors"
            >
              <ShieldCheck size={12} aria-hidden />
              See Brand Growth tier
              <ArrowRight size={12} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <p
            className="text-body-xs font-mono uppercase tracking-[0.16em] mb-4 text-center"
            style={{ color: "var(--color-chrome-mid)" }}
          >
            FAQ
          </p>
          <h2 className="text-display-md text-white text-balance text-center mb-10">
            Common questions about print production.
          </h2>
          <Accordion items={accordionItems} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
