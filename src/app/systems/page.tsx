import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { systemsDetailList } from "@/data/systems-detail";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Systems — Growth systems for the AI search era",
  description:
    "Wiele runs as four integrated systems on one engine: AI Visibility, Search Authority, Brand Authority, Web Experience. The systems make each other stronger.",
  path: "/systems",
});

export default function SystemsIndexPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Systems", url: `${siteConfig.url}/systems` },
  ]);
  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-systems" />
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 ambient-gradient pointer-events-none"
        />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-20">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Wiele Systems
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Growth systems for the AI search era.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Four integrated systems on one engine. Each is independently
                valuable; together they compound. AI Visibility leads, the
                others reinforce it.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/audit"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Run AI Visibility Audit
                </Link>
                <Link
                  href="/platform"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  See the platform
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Reveal stagger={0.07} className="grid gap-4 md:grid-cols-2">
            {systemsDetailList.map((system, i) => (
              <Link
                key={system.slug}
                href={`/systems/${system.slug}`}
                className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-7 min-h-[16rem] transition-[border-color,background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-emphasized)] hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:border-electric"
              >
                <Badge
                  variant={i === 0 ? "electric" : "outline"}
                  size="sm"
                  className="mb-4 self-start"
                >
                  {i === 0 ? "Lead system" : `System 0${i + 1}`}
                </Badge>
                <h2 className="text-heading-lg text-white mb-3 leading-tight">
                  {system.hero.title}
                </h2>
                <p className="text-body-md text-cloud mb-3">
                  {system.whatItCovers.intro}
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-body-sm font-medium text-electric">
                  Explore the system
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-3xl">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Old agency vs Wiele
            </p>
            <h2 className="text-display-md text-white text-balance mb-6">
              Why we don&apos;t separate SEO, AEO, and brand into different teams.
            </h2>
            <p className="text-body-lg text-silver">
              The brands that win the AI search era engineer authority,
              visibility, and experience as one compounding asset. Wiele is
              built around that single thesis.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
