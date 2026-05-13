import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/schema";

// v3.9.2 — /proof/google ships "Google's Own Proof" sales artefact.
//   - 12 Google-published case studies with quantified lifts.
//   - 8 verbatim Google quotes killing median-agency tactics.
//   - Sourced from the 162-page Google Search Central doctrine sweep
//     (2026-05-13). Substrate file: /memory/reference_google_search_central_master_doctrine.md
//   - Page is the foundation of doctrine-amplified outreach (Variant C of
//     the 100-prospect campaign links here).
//   - Author Entity Chain shipped: Article schema with Person author +
//     sameAs LinkedIn per Wiele Brand Kit.
//   - AI-max robots applied site-wide via buildMetadata (also v3.9.2).
export const dynamic = "force-static";
export const revalidate = false;

const PUBLISHED = "2026-05-13";

export const metadata: Metadata = buildMetadata({
  title: "Google's Own Proof — 12 published case studies + verbatim doctrine",
  description:
    "Wiele OS is built from Google's own 162-page published doctrine. Twelve Google-published case studies tied to specific structured-data interventions — Saramin 2×, Jobrapido 3×, MX Player 3×, Monster India +94%, ZipRecruiter 4.5× conversion, Eventbrite +100%, Rakuten 1.5× time-on-site — plus the eight verbatim Google quotes killing the tactics most agencies still bill for.",
  path: "/proof/google",
});

type CaseStudy = {
  company: string;
  country: string;
  industry: string;
  result: string;
  schema: string;
  href: string;
};

const caseStudies: CaseStudy[] = [
  {
    company: "Saramin",
    country: "South Korea",
    industry: "Jobs / Recruitment",
    result: "2× organic Search traffic",
    schema: "Job Posting structured data",
    href: "https://developers.google.com/search/case-studies/saramin-case-study",
  },
  {
    company: "Jobrapido",
    country: "Italy",
    industry: "Jobs / Aggregator",
    result: "3× organic traffic",
    schema: "Job Posting structured data",
    href: "https://developers.google.com/search/case-studies/jobrapido-case-study",
  },
  {
    company: "MX Player",
    country: "India",
    industry: "Video streaming",
    result: "3× organic traffic",
    schema: "VideoObject markup",
    href: "https://developers.google.com/search/case-studies/mx-case-study",
  },
  {
    company: "Monster India",
    country: "India",
    industry: "Jobs / Recruitment",
    result: "+94% organic traffic",
    schema: "Job Posting structured data",
    href: "https://developers.google.com/search/case-studies/monster-india-case-study",
  },
  {
    company: "ZipRecruiter",
    country: "USA",
    industry: "Jobs / Recruitment",
    result: "4.5× conversion rate",
    schema: "Job Posting structured data",
    href: "https://developers.google.com/search/case-studies/ziprecruiter-case-study",
  },
  {
    company: "Eventbrite",
    country: "USA",
    industry: "Events / Ticketing",
    result: "+100% traffic",
    schema: "Event structured data",
    href: "https://developers.google.com/search/case-studies/eventbrite-case-study",
  },
  {
    company: "Rakuten",
    country: "Japan",
    industry: "Ecommerce",
    result: "1.5× time-on-site",
    schema: "Ecommerce structured data + UX",
    href: "https://developers.google.com/search/case-studies/rakuten-case-study",
  },
  {
    company: "Vidio",
    country: "Indonesia",
    industry: "Video streaming",
    result: "Increased video clicks",
    schema: "VideoObject markup",
    href: "https://developers.google.com/search/case-studies/vidio-case-study",
  },
  {
    company: "Vimeo",
    country: "USA",
    industry: "Video hosting",
    result: "Improved Video SEO for customers",
    schema: "Video SEO features",
    href: "https://developers.google.com/search/case-studies/vimeo-case-study",
  },
  {
    company: "Cross-Regional Publishers",
    country: "Global",
    industry: "News / Publishing",
    result: "Reach more audience",
    schema: "Video SEO features",
    href: "https://developers.google.com/search/case-studies/cross-regional-video-seo-case-study",
  },
  {
    company: "Multi-publisher Discover study",
    country: "Global",
    industry: "News / Publishing",
    result: "Improved CTR + visits",
    schema: "Large images in Google Discover",
    href: "https://developers.google.com/search/case-studies/large-images-case-study",
  },
  {
    company: "Wix",
    country: "Global",
    industry: "Website builder / SaaS",
    result: "Generated user value",
    schema: "Multiple Google APIs",
    href: "https://developers.google.com/search/case-studies/wix-case-study",
  },
];

type KilledTactic = {
  tactic: string;
  quote: string;
};

const killedTactics: KilledTactic[] = [
  {
    tactic: "Meta keywords",
    quote:
      "Has no effect on indexing and ranking at all.",
  },
  {
    tactic: "AI mass content",
    quote:
      "Scaled Content Abuse — many pages generated for the primary purpose of manipulating search rankings and not helping users, no matter how it's created.",
  },
  {
    tactic: "Parasite SEO on Forbes / HuffPost-style host sites",
    quote:
      "Site Reputation Abuse — third-party content published on a host site mainly because of that host's already-established ranking signals.",
  },
  {
    tactic: "E-E-A-T as a ranking factor",
    quote: "No, it's not.",
  },
  {
    tactic: "AMP as a ranking lever",
    quote: "AMP itself isn't a ranking factor.",
  },
  {
    tactic: "GEO infrastructure / llms.txt / AI-specific schema",
    quote:
      "No additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary. No special schema.org structured data that you need to add.",
  },
  {
    tactic: 'Featured snippet "optimisation" tools',
    quote:
      "You can't [mark a page as featured snippet]. Google systems determine whether a page would make a good featured snippet for a user's search request.",
  },
  {
    tactic: "Guaranteed rankings",
    quote: "No one can guarantee a #1 ranking on Google.",
  },
];

const methodCards = [
  {
    step: "Map",
    body: "Audit current state against Google's 162-page doctrine. Quantify exposure to deprecated tactics. Identify citation gaps.",
  },
  {
    step: "Build",
    body: "Ship the substrate Google rewards: Author Entity Chain, structured-data stack, AI-extractable answer blocks, crawl-hygiene baseline.",
  },
  {
    step: "Compound",
    body: "Quarterly refresh against the Google doctrine. Citation tracker as longitudinal proof. Authority that grows over time.",
  },
];

export default function GoogleOwnProofPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Proof", url: `${siteConfig.url}/proof` },
    { name: "Google's Own Proof", url: `${siteConfig.url}/proof/google` },
  ]);

  const article = articleSchema({
    headline:
      "Google's Own Proof — 12 published case studies + verbatim doctrine",
    description:
      "Twelve Google-published case studies tied to specific structured-data interventions. Eight verbatim Google quotes killing median-agency tactics. Sourced from the 162-page Google Search Central doctrine sweep.",
    url: `${siteConfig.url}/proof/google`,
    datePublished: `${PUBLISHED}T08:00:00+00:00`,
    dateModified: `${PUBLISHED}T08:00:00+00:00`,
    authorName: siteConfig.founder,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    articleSection: "Doctrine",
  });

  const caseList = itemListSchema({
    name: "Google-published case studies cited on this page",
    items: caseStudies.map((c) => ({
      name: `${c.company} — ${c.result}`,
      url: c.href,
    })),
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-proof-google" />
      <JsonLd schema={article} id="schema-article-proof-google" />
      <JsonLd schema={caseList} id="schema-itemlist-proof-google" />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 ambient-gradient pointer-events-none"
        />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Google&apos;s Own Proof
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Google publishes the proof. We productise the discipline.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Wiele OS is built from Google&apos;s own 162-page published
                doctrine. Below: twelve Google-published case studies tied to
                specific structured-data interventions — and the eight
                verbatim Google quotes that kill the tactics most agencies
                still bill for.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-body-sm text-steel max-w-2xl mt-4">
                Sources verified against{" "}
                <a
                  href="https://developers.google.com/search/case-studies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric hover:text-electric-light underline underline-offset-4"
                >
                  developers.google.com/search/case-studies
                </a>{" "}
                — accessed 2026-05-13. Doctrine refresh quarterly (next
                2026-08-01).
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Case studies — published by Google
            </p>
            <h2 className="text-display-md text-white text-balance">
              Twelve case studies. Quantified results. Sourced to Google.
            </h2>
            <p className="text-body-md text-silver mt-4">
              Every row below is a Google-published case study. Every result
              is Google&apos;s own number. Every intervention is a
              Google-recommended structured-data discipline. Follow any link
              to read the original on developers.google.com.
            </p>
          </div>
          <Reveal stagger={0.04}>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-default)]">
              <table className="w-full text-left">
                <thead className="bg-[var(--color-surface-elevated)]">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-body-xs font-mono uppercase tracking-[0.12em] text-electric"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-body-xs font-mono uppercase tracking-[0.12em] text-electric"
                    >
                      Industry
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-body-xs font-mono uppercase tracking-[0.12em] text-electric"
                    >
                      Result
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-body-xs font-mono uppercase tracking-[0.12em] text-electric"
                    >
                      Intervention
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudies.map((c) => (
                    <tr
                      key={c.company}
                      className="border-t border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                    >
                      <td className="px-4 py-4 align-top">
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-electric-light font-medium"
                        >
                          {c.company}
                        </a>
                        <div className="text-body-xs text-steel mt-0.5">
                          {c.country}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top text-body-sm text-silver">
                        {c.industry}
                      </td>
                      <td className="px-4 py-4 align-top text-body-sm text-electric font-medium">
                        {c.result}
                      </td>
                      <td className="px-4 py-4 align-top text-body-sm text-silver">
                        {c.schema}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Median agencies sell tactics Google has publicly killed
            </p>
            <h2 className="text-display-md text-white text-balance">
              Eight verbatim quotes. Eight industry-standard tactics. Zero
              Google support.
            </h2>
            <p className="text-body-md text-silver mt-4">
              Wiele OS replaces the dead tactics with citation engineering,
              entity strength, and concept fan-out coverage — the disciplines
              Google itself rewards in the twelve case studies above.
            </p>
          </div>
          <Reveal stagger={0.04} className="grid gap-4 md:grid-cols-2">
            {killedTactics.map((k) => (
              <article
                key={k.tactic}
                className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <Badge variant="outline" size="sm" className="mb-3 self-start">
                  {k.tactic}
                </Badge>
                <blockquote className="text-body-md text-white leading-snug border-l-2 border-electric pl-4">
                  &ldquo;{k.quote}&rdquo;
                </blockquote>
                <p className="text-body-xs text-steel mt-3 font-mono uppercase tracking-[0.1em]">
                  — Google Search Central documentation
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              The Method
            </p>
            <h2 className="text-display-md text-white text-balance">
              Map. Build. Compound.
            </h2>
            <p className="text-body-md text-silver mt-4">
              One operating system. Three disciplines. Sourced to Google,
              applied with AI citation architecture awareness.
            </p>
          </div>
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-3">
            {methodCards.map((m) => (
              <article
                key={m.step}
                className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[14rem]"
              >
                <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-3">
                  {m.step}
                </p>
                <p className="text-body-sm text-silver">{m.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-3xl">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Citation, not clicks.
            </p>
            <h2 className="text-display-md text-white text-balance mb-5">
              Want the productised playbook?
            </h2>
            <p className="text-body-md text-silver mb-8 max-w-2xl">
              Wiele OS is the perpetual-licence productised methodology built
              on Google&apos;s own substrate. For agencies: resellable IP
              modules — your client roster gets the doctrine, you keep the
              margin. For premium brands: implementation + monitoring.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/audit"
                className={buttonStyles({ variant: "primary", size: "md" })}
              >
                Run the AI Visibility Audit
              </Link>
              <Link
                href="/proof"
                className={buttonStyles({ variant: "ghost", size: "md" })}
              >
                See engagement archetypes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
