import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, Database, Layers, LineChart, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { PromptSimulator } from "@/components/sections/prompt-simulator";
import { systemsDetail } from "@/data/systems-detail";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Platform — The AI growth system for brands that need to be chosen",
  description:
    "Wiele OS runs all four growth systems on one engine: AI Visibility, Search Authority, Brand Authority, Web Experience. Continuous monitoring, dedicated strategists, attribution back to revenue.",
  path: "/platform",
});

const modules = [
  {
    icon: Layers,
    title: "Five integrated systems",
    body: "AI Visibility, Search, Brand Authority, Web Experience, Revenue Intelligence — orchestrated as one engine, not five disconnected services.",
  },
  {
    icon: Cpu,
    title: "Engine layer",
    body: "Wiele OS V3 runs continuous prompt-surface scans across the major AI engines. Mention strength, citation, gaps — refreshed monthly.",
  },
  {
    icon: Database,
    title: "Data layer",
    body: "Engine results, citation graph, content asset register, and attribution traces stored in one structured warehouse you can audit.",
  },
  {
    icon: Users,
    title: "Human strategist layer",
    body: "Wiele principals review every output. Automation lifts the work; it does not replace the judgement clients pay for.",
  },
  {
    icon: LineChart,
    title: "Attribution",
    body: "AI-cited demand traced back to closed-won pipeline. Methodology open for inspection, not black-boxed.",
  },
  {
    icon: ShieldCheck,
    title: "Governance",
    body: "AI use disclosed. Data residency respected. Outputs reviewed before they ship. The trust layer is part of the platform, not a footnote.",
  },
];

export default function PlatformPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Platform", url: `${siteConfig.url}/platform` },
  ]);
  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-platform" />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div aria-hidden className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-20">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Wiele OS
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                The AI growth system for brands that need to be chosen.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Wiele OS runs all four growth systems on one engine.
                Continuous monitoring, dedicated strategist team, attribution
                back to revenue. Built for brands that compete on being
                recommended, not just ranked.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/audit" className={buttonStyles({ variant: "primary", size: "lg" })}>
                  Run AI Visibility Audit
                </Link>
                <Link href="/contact" className={buttonStyles({ variant: "ghost", size: "lg" })}>
                  Talk to Wiele
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Architecture
            </p>
            <h2 className="text-display-md text-white text-balance">
              How the platform fits together.
            </h2>
          </div>
          <Reveal stagger={0.05} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
                >
                  <Icon size={20} className="text-electric mb-4" aria-hidden />
                  <h3 className="text-heading-sm text-white mb-2.5">{m.title}</h3>
                  <p className="text-body-sm text-silver">{m.body}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Output examples
            </p>
            <h2 className="text-display-md text-white text-balance">
              Engine output, sample run.
            </h2>
            <p className="text-body-md text-silver mt-4">
              The same panel renders across the homepage hero, every system
              detail page, every case study, and the audit results page.
            </p>
          </div>
          <FadeIn whileInView>
            <PromptSimulator
              data={systemsDetail["ai-visibility"].exampleFixture}
              animate={false}
            />
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
