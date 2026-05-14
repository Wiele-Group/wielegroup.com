import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { aboutPageSchema, breadcrumbSchema, personSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About — The Wiele thesis and the team behind it",
  description:
    "Wiele Group engineers brands AI engines cite. Six disciplines — brand, marketing, web, ads, SEO, AI search — as one operating system. Founded by Jonathan Landman.",
  path: "/about",
});

const beliefs = [
  {
    title: "Systems beat tactics.",
    body:
      "Single-channel SEO or one-off content drops don't compound. Integrated growth systems do. Six disciplines pulling in the same direction is worth more than six agencies pulling in six.",
  },
  {
    title: "Authority compounds for the prepared.",
    body:
      "AI engines reward citation history, entity clarity, and founder voice. Brands that build the substrate now compete against compounded incumbents in 24 months.",
  },
  {
    title: "Methodology open, outcomes named.",
    body:
      "We show our work. Engine methodology, citation sources, attribution traces — all open for inspection. Aspirational ranges and unverifiable lift numbers belong to other agencies.",
  },
  {
    title: "Human judgement over automation.",
    body:
      "Automation lifts the volume of work a strategist can ship. It never replaces the judgement clients pay for. Every client deliverable is owned by a named human at Wiele.",
  },
];

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ]);
  // v3.9.3 — entity-disambiguation fix. Person.sameAs must point to the
  // FOUNDER's personal profiles, not the company's. The previous values
  // (company LinkedIn + company X) confused knowledge-graph reconciliation
  // because the Person and the Organization shared sameAs targets. Now
  // Person resolves to the personal LinkedIn and the Organization keeps
  // its own company-profile sameAs separately.
  const founder = personSchema({
    name: siteConfig.founder,
    jobTitle: "Founder & Principal",
    url: `${siteConfig.url}/about#founder`,
    sameAs: [siteConfig.socials.founderLinkedin],
  });
  const aboutPage = aboutPageSchema({
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/about`,
    description:
      `${siteConfig.legalName} is a premium marketing agency founded by ${siteConfig.founder}. Six disciplines — brand, marketing, web, advertising, SEO, AI search — engineered as one integrated growth system for premium firms.`,
    aboutPersonName: siteConfig.founder,
  });

  return (
    <>
      <JsonLd schema={aboutPage} id="schema-aboutpage" />
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
                Premium marketing, engineered as one integrated system.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                {siteConfig.legalName} is the premium agency for firms who want
                every growth lever pulling in the same direction. Brand,
                marketing, web design, advertising, SEO, and AI search
                optimization — six disciplines, one operating system,
                engineered by {siteConfig.founder}.
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
                Founder &amp; Principal · {siteConfig.name}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonStyles({ variant: "ghost", size: "sm" })}
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.socials.x}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonStyles({ variant: "ghost", size: "sm" })}
                >
                  X
                </a>
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-body-lg text-cloud">
                {siteConfig.founder} founded {siteConfig.legalName} on a single
                thesis: in the AI search era, premium growth requires every
                discipline to compound — not six disconnected agencies billing
                the same client. Brand sets the narrative. Web converts the
                visit. Advertising accelerates the demand. SEO captures the
                intent. AI search decides whether the brand gets named at all.
                Run separately, they cancel each other out. Run as one
                operating system, they compound.
              </p>
              <p className="text-body-md text-silver">
                Wiele is the integrated alternative. The Wiele Operating System
                is the substrate underneath every engagement — a single source
                of truth for positioning, content, citation graphs, conversion
                pathways, and reporting. The same engine that powers a Signal
                Audit on day one is the engine that runs an Authority Engine
                retainer on month twelve. Methodology is open; outcomes are
                named; aspirational language is forbidden.
              </p>
              <p className="text-body-md text-silver">
                {siteConfig.founder.split(" ")[0]} writes the founder voice that
                AI engines cite at{" "}
                <Link
                  href="/labs"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  /labs
                </Link>{" "}
                and ships the trust commitments at{" "}
                <Link
                  href="/trust"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  /trust
                </Link>
                . The fastest way to engage with the thesis in person is to run
                a{" "}
                <Link
                  href="/audit"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  Signal Audit
                </Link>
                .
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
          <p className="text-body-lg text-silver mb-4">
            We hire when a discipline has a real client load that earns a
            full-time seat. Senior strategists, principal designers, and
            engineering leads who care about systems over deliverables. No
            generalists, no juniors-on-trial, no commodity rates.
          </p>
          <p className="text-body-md text-smoke mb-8">
            If you want to be on the radar before a seat opens, send a note —
            written work, a portfolio, or a thesis on where AI search is going.
            We read every one and respond when fit emerges.
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
