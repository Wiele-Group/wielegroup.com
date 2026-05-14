// COGNITIVE PRE-FLIGHT (v3.9.4): Cowan 4-chunk rule — max 4 visible items per vertical list per viewport. /L99 binding.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

/* ─────────────────────────────────────────────────────────────
   Phase 7.4 fix — explicit static MDX import.

   The Citation Score™ methodology page imports its MDX body
   statically (mirrors labs/[slug] + citation-brief/[slug] pattern).
   Dynamic import is forbidden under OpenNext/Workers — the bundler
   doesn't follow `import("@/content/citation-score/...")` and the
   page would 404 in production.
───────────────────────────────────────────────────────────────── */

import Methodology from "@/content/citation-score/methodology.mdx";

export const dynamic = "force-static";
export const revalidate = false;

const PAGE_TITLE =
  "Citation Score™ methodology — how Wiele measures AI citation lift";
const PAGE_DESCRIPTION =
  "The Wiele Citation Score™ methodology — four-section framework (Engine Coverage · On-Page Extractability · Citation Velocity · Recommendation History) with the Prototype Match sub-metric and Stage 0 Self-Evidence gate.";
const PAGE_PATH = "/citation-score";
const PAGE_PUBLISHED = "2026-05-14";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  ogImage: siteConfig.ogImage,
});

export default function CitationScoreMethodologyPage() {
  const pageUrl = `${siteConfig.url}${PAGE_PATH}`;

  const article = articleSchema({
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: pageUrl,
    datePublished: PAGE_PUBLISHED,
    dateModified: PAGE_PUBLISHED,
    authorName: "Jonathan Landman",
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    articleSection: "Citation Score Methodology",
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Citation Score™ methodology", url: pageUrl },
  ]);

  return (
    <>
      <JsonLd schema={article} id="schema-article-citation-score-methodology" />
      <JsonLd
        schema={breadcrumbs}
        id="schema-breadcrumb-citation-score-methodology"
      />

      <article className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Link
            href="/pricing#recurring-ai-visibility"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-silver hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden />
            Citation Score™ subscription
          </Link>

          <div className="max-w-3xl">
            <header className="mb-10">
              <FadeIn>
                <Badge variant="electric" size="sm" className="mb-5">
                  Methodology · v3.9.4
                </Badge>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-display-xl text-white text-balance mb-5">
                  Citation Score™ methodology.
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-body-lg text-silver">
                  Four components — Engine Coverage, On-Page Extractability,
                  Citation Velocity, and Recommendation History. The metric
                  layer above the Five-Stage Citation Hierarchy.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-body-xs font-mono uppercase tracking-[0.14em] text-smoke mt-6">
                  By Jonathan Landman · Published{" "}
                  <time dateTime={PAGE_PUBLISHED}>14 May 2026</time> · v3.9.4
                </p>
              </FadeIn>
            </header>

            <Methodology />

            <section className="rounded-[var(--radius-xl)] border border-electric/30 bg-electric/5 p-8 md:p-10">
              <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                The next step
              </p>
              <h2 className="text-display-md text-white text-balance mb-4">
                Instrument the lift.
              </h2>
              <p className="text-body-lg text-silver mb-6 max-w-2xl">
                The Citation Score™ subscription runs the engine panel
                month over month and surfaces the four-component score
                against your named competitor set. Three tiers, monthly
                in GBP, three-month minimum.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pricing#recurring-ai-visibility"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  See Citation Score™ subscription
                </Link>
                <Link
                  href="/citation-brief/how-agencies-get-cited-in-ai-answers"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  Read the Five-Stage Citation Hierarchy
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
