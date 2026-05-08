import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ShieldCheck, User } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArticleCta } from "@/components/labs/article-cta";
import { ArticleToc } from "@/components/labs/article-toc";
import { JsonLd } from "@/components/json-ld";
import { RelatedSystems } from "@/components/labs/related-systems";
import {
  type CaseStudyManifestEntry,
  type CaseStudyTier,
  getAllStaticCaseStudySlugs,
  getStaticCaseStudyBySlug,
  getStaticCaseStudyToc,
} from "@/lib/case-studies-static";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  caseStudySchema,
  faqSchema,
  personSchema,
} from "@/lib/schema";

/* ─────────────────────────────────────────────────────────────
   v3.2 — explicit static MDX imports (mirrors /labs/[slug] Phase 7.4
   pattern). Dynamic `import("@/content/case-studies/${slug}.mdx")`
   is not bundler-traceable under OpenNext: at runtime in Workers the
   modules aren't in the bundle, the dynamic import returns undefined,
   the page calls notFound() and the URL 404s.

   Adding a new case study = (1) drop .mdx in src/content/case-studies/,
   (2) add a static import below, (3) add the entry to the manifest in
   src/lib/case-studies-static.ts.
───────────────────────────────────────────────────────────────── */

import FoundationCycle01 from "@/content/case-studies/foundation-cycle-01.mdx";
import SovereignCycle01 from "@/content/case-studies/sovereign-cycle-01.mdx";

const CASE_STUDY_COMPONENTS: Record<string, React.ComponentType> = {
  "foundation-cycle-01": FoundationCycle01,
  "sovereign-cycle-01": SovereignCycle01,
};

/* ─────────────────────────────────────────────────────────────
   Force-static — defence in depth.
   Ships pre-rendered HTML via the assets binding, never the runtime
   function path. Avoids any fs-dependent fallback at request time.
───────────────────────────────────────────────────────────────── */

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return getAllStaticCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getStaticCaseStudyBySlug(slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.title,
    description: cs.summary,
    path: `/proof/${cs.slug}`,
    ogImage: cs.ogImage ?? siteConfig.ogImage,
  });
}

/* ─────────────────────────────────────────────────────────────
   Tier accent map — B4 Chromaglass tier-coded badges + metric chips.
   Foundation → electric · Authority → chrome · Sovereign → duality.
───────────────────────────────────────────────────────────────── */

const TIER_ACCENT: Record<
  CaseStudyTier,
  {
    badgeVariant: "electric" | "outline";
    badgeStyle?: React.CSSProperties;
    metricBorder: string;
    metricLabel: string;
  }
> = {
  Foundation: {
    badgeVariant: "electric",
    metricBorder: "border-[var(--color-border-default)]",
    metricLabel: "text-electric",
  },
  Authority: {
    badgeVariant: "outline",
    metricBorder: "border-[var(--color-chrome-mid)]/40",
    metricLabel: "text-[var(--color-chrome-hi)]",
  },
  Sovereign: {
    badgeVariant: "outline",
    badgeStyle: {
      background: "var(--gradient-duality-edge)",
      color: "var(--color-white)",
      borderColor: "transparent",
    },
    metricBorder: "border-[var(--color-border-default)]",
    metricLabel: "text-[var(--color-chrome-hi)]",
  },
};

/* ─────────────────────────────────────────────────────────────
   Service schema input — maps tier → priced Service the case study
   is proof for. Anonymised author per /proof methodology standard.
───────────────────────────────────────────────────────────────── */

function buildCaseStudyServiceInput(cs: CaseStudyManifestEntry) {
  const headlineMetric = cs.metricsHeadline[0];
  const reviewBody = headlineMetric
    ? `${headlineMetric.label}: ${headlineMetric.before} → ${headlineMetric.after} (${headlineMetric.window}).`
    : cs.summary;
  return {
    serviceName: `Wiele Premium Brand Site System — ${cs.tier}`,
    serviceUrl: `${siteConfig.url}/services/premium-brand-site-system`,
    caseStudyUrl: `${siteConfig.url}/proof/${cs.slug}`,
    description: cs.summary,
    ratingValue: 5,
    reviewCount: 1,
    reviewBody,
    authorName: cs.anonymised
      ? "Wiele engagement archetype"
      : cs.author,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getStaticCaseStudyBySlug(slug);
  const CaseStudyContent = CASE_STUDY_COMPONENTS[slug];

  // Manifest entry + MDX module are maintained in tandem; either missing
  // means the slug is unknown.
  if (!cs || !CaseStudyContent) notFound();

  const caseStudyUrl = `${siteConfig.url}/proof/${cs.slug}`;
  const toc = getStaticCaseStudyToc(slug);
  const accent = TIER_ACCENT[cs.tier];

  const articleJsonLd = articleSchema({
    headline: cs.title,
    description: cs.summary,
    url: caseStudyUrl,
    datePublished: cs.lastUpdated,
    dateModified: cs.lastUpdated,
    authorName: cs.author,
    image: `${siteConfig.url}${cs.ogImage ?? siteConfig.ogImage}`,
    articleSection: `Case study — ${cs.tier}`,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Proof", url: `${siteConfig.url}/proof` },
    { name: cs.title, url: caseStudyUrl },
  ]);
  const author = personSchema({
    name: cs.author,
    jobTitle: "Founder & Principal",
    url: `${siteConfig.url}/about#founder`,
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.x],
  });
  const faq =
    cs.faq && cs.faq.length > 0
      ? faqSchema(
          cs.faq.map((f) => ({ question: f.question, answer: f.answer })),
        )
      : null;
  const service = caseStudySchema(buildCaseStudyServiceInput(cs));

  const formattedDate = new Date(cs.lastUpdated).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd schema={articleJsonLd} id={`schema-article-${slug}`} />
      <JsonLd schema={author} id={`schema-author-${slug}`} />
      <JsonLd schema={breadcrumbs} id={`schema-breadcrumb-${slug}`} />
      <JsonLd schema={service} id={`schema-service-${slug}`} />
      {faq ? <JsonLd schema={faq} id={`schema-faq-${slug}`} /> : null}

      <article className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Link
            href="/proof"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-silver hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden />
            Proof
          </Link>

          <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {accent.badgeStyle ? (
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.1em]"
                      style={accent.badgeStyle}
                    >
                      {cs.tier}
                    </span>
                  ) : (
                    <Badge variant={accent.badgeVariant} size="sm">
                      {cs.tier}
                    </Badge>
                  )}
                  <span className="text-body-xs font-mono uppercase tracking-[0.16em] text-smoke">
                    {cs.engagementShape}
                  </span>
                </div>
                <h1 className="text-display-xl text-white text-balance mb-5">
                  {cs.title}
                </h1>
                <p className="text-body-lg text-silver">{cs.summary}</p>
              </header>

              {/* Article-meta row — author, reviewer, reading time, last-updated */}
              <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border-default)]">
                <span className="flex items-center gap-1.5 text-body-xs font-mono text-silver">
                  <User size={12} aria-hidden />
                  {cs.author}
                </span>
                <span className="flex items-center gap-1.5 text-body-xs font-mono text-silver">
                  <ShieldCheck size={12} aria-hidden />
                  Reviewed by {cs.reviewer}
                </span>
                <span className="flex items-center gap-1.5 text-body-xs font-mono text-silver">
                  <Clock size={12} aria-hidden />
                  {cs.readingMinutes} min read
                </span>
                <span className="text-body-xs font-mono text-smoke ml-auto">
                  Updated {formattedDate}
                </span>
              </div>

              {/* Tier-priced label + anonymisation note */}
              <div className="mb-10 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5">
                <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-2">
                  Engagement
                </p>
                <p className="text-body-md text-white mb-2">
                  {cs.tierPriceLabel}
                </p>
                {cs.anonymised ? (
                  <p className="text-body-sm text-silver">
                    Anonymised engagement archetype. Methodology and engine
                    output are real engine runs against archetype prompt
                    panels. See{" "}
                    <Link
                      href="/proof"
                      className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                    >
                      /proof methodology
                    </Link>{" "}
                    for the standard.
                  </p>
                ) : null}
              </div>

              {/* Metrics-headline block — before / after / window per row */}
              {cs.metricsHeadline.length > 0 ? (
                <section className="mb-12">
                  <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                    Engine output
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {cs.metricsHeadline.map((m) => (
                      <div
                        key={m.label}
                        className={`rounded-[var(--radius-lg)] border ${accent.metricBorder} bg-[var(--color-surface-elevated)] p-5`}
                      >
                        <p
                          className={`text-body-xs font-mono uppercase tracking-[0.12em] ${accent.metricLabel} mb-3`}
                        >
                          {m.label}
                        </p>
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-body-sm">
                          <span className="text-smoke">Before</span>
                          <span className="text-silver">{m.before}</span>
                          <span className="text-smoke">After</span>
                          <span className="text-white font-medium">
                            {m.after}
                          </span>
                          <span className="text-smoke">Window</span>
                          <span className="text-silver">{m.window}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="article-prose">
                <CaseStudyContent />
              </div>

              {cs.faq && cs.faq.length > 0 ? (
                <section className="mt-12 pt-10 border-t border-[var(--color-border-default)]">
                  <h2 className="text-display-md text-white text-balance mb-6">
                    Questions on this engagement.
                  </h2>
                  <Accordion
                    items={cs.faq.map((f, i) => ({
                      id: `${slug}-faq-${i}`,
                      question: f.question,
                      answer: f.answer,
                    }))}
                  />
                </section>
              ) : null}

              {cs.relatedSystems ? (
                <RelatedSystems slugs={cs.relatedSystems} />
              ) : null}

              <ArticleCta />
            </div>

            <ArticleToc entries={toc} />
          </div>
        </div>
      </article>
    </>
  );
}
