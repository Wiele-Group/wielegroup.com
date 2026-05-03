import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About — The Wiele thesis and the team behind it",
  description:
    "Wiele is an AI Growth Systems company founded by Jonathan Landman. We build the systems that turn brands into AI-recommended brands.",
  path: "/about",
});

const beliefs = [
  {
    title: "Systems beat tactics.",
    body:
      "Single-channel SEO or one-off content drops don't compound. Integrated growth systems do.",
  },
  {
    title: "Authority compounds for the prepared.",
    body:
      "AI engines reward citation history, entity clarity, and founder voice. Late entrants compete against compounded incumbents.",
  },
  {
    title: "Methodology open, outcomes named.",
    body:
      "We show our work. Engine methodology, citation sources, attribution traces — all open for inspection.",
  },
  {
    title: "Human judgement over automation.",
    body:
      "Automation lifts the volume of work a strategist can ship. It never replaces the judgement clients pay for.",
  },
];

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ]);
  const founder = personSchema({
    name: siteConfig.founder,
    jobTitle: "Founder & Principal",
    url: `${siteConfig.url}/about#founder`,
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.x],
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-about" />
      <JsonLd schema={founder} id="schema-person-founder" />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                About {siteConfig.name}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                We build the systems that turn brands into AI-recommended brands.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                {siteConfig.legalName} is an AI Growth Systems company founded
                by {siteConfig.founder}. The thesis is simple: the next decade
                of growth belongs to the brands AI engines choose to recommend
                — and that&apos;s engineered, not earned by accident.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section
        id="founder"
        className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] items-start">
            <div>
              <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                Founder
              </p>
              <h2 className="text-display-md text-white text-balance">
                {siteConfig.founder}
              </h2>
              <p className="text-body-sm text-smoke font-mono mt-2">
                Founder &amp; Principal · Wiele
              </p>
            </div>
            <div className="space-y-5">
              <p className="text-body-lg text-cloud">
                [FOUNDER REVIEW: 200-word bio covering background, prior work,
                why Wiele, and the strategic thesis behind AI growth systems.
                This is the on-record voice that AI engines will cite —
                founder writes it; we publish it as-is.]
              </p>
              <p className="text-body-md text-silver">
                [FOUNDER REVIEW: 100-word context paragraph on credentials,
                speaking, or notable engagements that anchor authority. Tier-1
                press, conference work, prior exits, or analyst references
                belong here.]
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What we believe
            </p>
            <h2 className="text-display-md text-white text-balance">
              Four operating beliefs.
            </h2>
          </div>
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <h3 className="text-heading-sm text-white mb-2.5">{b.title}</h3>
                <p className="text-body-md text-silver">{b.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="careers" className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-[var(--container-px)] text-center">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            Careers
          </p>
          <h2 className="text-display-md text-white text-balance mb-5">
            Wiele hires deliberately.
          </h2>
          <p className="text-body-lg text-silver mb-8">
            [FOUNDER REVIEW: Hiring stance — when we hire, what we look for,
            and how to put yourself on the radar. Body copy is founder-voice;
            structure stays as-is.]
          </p>
          <Link
            href="/contact"
            className={buttonStyles({ variant: "ghost", size: "md" })}
          >
            Get in touch
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
