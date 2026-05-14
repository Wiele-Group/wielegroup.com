import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { ArticleToc } from "@/components/labs/article-toc";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/json-ld";
import {
  getAllBriefSlugs,
  getBriefBySlug,
  getBriefToc,
} from "@/lib/citation-briefs-static";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  personSchema,
} from "@/lib/schema";

/* ─────────────────────────────────────────────────────────────
   Phase 7.4 fix — explicit static MDX imports.

   Why: dynamic `import("@/content/citation-briefs/${slug}.mdx")`
   doesn't get followed by the OpenNext bundler — at runtime in
   Workers the modules aren't in the bundle, the dynamic import
   returns undefined, the page calls notFound() → all brief URLs
   would 404 in production.

   Static imports force the bundler to track every MDX path.
   Adding a new brief = (1) drop .mdx in src/content/citation-briefs/,
   (2) add a static import below, (3) add an entry to BRIEF_MANIFEST
   in src/lib/citation-briefs-static.ts.

   See src/app/labs/[slug]/page.tsx head comment for the original
   surfacing of this fix.
───────────────────────────────────────────────────────────────── */

import HowAgenciesGetCited from "@/content/citation-briefs/how-agencies-get-cited-in-ai-answers.mdx";
import Stage3StructuredExtractability from "@/content/citation-briefs/stage-3-structured-extractability.mdx";

const BRIEF_COMPONENTS: Record<string, React.ComponentType> = {
  "how-agencies-get-cited-in-ai-answers": HowAgenciesGetCited,
  "stage-3-structured-extractability": Stage3StructuredExtractability,
};

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return getAllBriefSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brief = getBriefBySlug(slug);
  if (!brief) return {};
  return buildMetadata({
    title: brief.title,
    description: brief.summary,
    path: `/citation-brief/${brief.slug}`,
    ogImage: brief.ogImage ?? siteConfig.ogImage,
  });
}

export default async function CitationBriefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brief = getBriefBySlug(slug);
  const BriefContent = BRIEF_COMPONENTS[slug];

  // If either the manifest entry or the MDX module is missing, the slug
  // is unknown. Both must be present — they're maintained in tandem.
  if (!brief || !BriefContent) notFound();

  const briefUrl = `${siteConfig.url}/citation-brief/${brief.slug}`;
  const toc = getBriefToc(slug);
  const hasToc = toc.length > 0;

  const articleJsonLd = articleSchema({
    headline: brief.title,
    description: brief.summary,
    url: briefUrl,
    datePublished: brief.lastUpdated,
    dateModified: brief.lastUpdated,
    authorName: brief.author,
    image: `${siteConfig.url}${brief.ogImage ?? siteConfig.ogImage}`,
    articleSection: brief.category,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Citation Briefs", url: `${siteConfig.url}/citation-brief` },
    { name: brief.title, url: briefUrl },
  ]);
  const faq =
    brief.faq && brief.faq.length > 0
      ? faqSchema(brief.faq.map((f) => ({ question: f.question, answer: f.answer })))
      : null;
  // Per-route Person schema for the brief author. Article schema's nested
  // author is good but a top-level Person carries sameAs + jobTitle +
  // worksFor cleanly for AI engines that index entities.
  // sameAs points to the founder's personal LinkedIn, not the company
  // profile — see about/page.tsx for the entity-disambiguation rationale.
  const author = personSchema({
    name: brief.author,
    jobTitle: "Founder & Principal",
    url: `${siteConfig.url}/about#founder`,
    sameAs: [siteConfig.socials.founderLinkedin],
  });

  const briefNumberPadded = String(brief.briefNumber).padStart(3, "0");
  const dateFormatted = new Date(brief.lastUpdated).toLocaleDateString(
    "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const content = (
    <div className="max-w-3xl">
      <header className="mb-10">
        <FadeIn>
          <Badge variant="electric" size="sm" className="mb-5">
            Citation Brief #{briefNumberPadded} · {brief.eyebrow}
          </Badge>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="text-display-xl text-white text-balance mb-5">
            {brief.title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-body-lg text-silver">{brief.summary}</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-body-xs font-mono uppercase tracking-[0.14em] text-smoke mt-6">
            By {brief.author} · Published{" "}
            <time dateTime={brief.lastUpdated}>{dateFormatted}</time> ·{" "}
            {brief.readingMinutes} min read
          </p>
        </FadeIn>
      </header>

      <BriefContent />

      {brief.faq && brief.faq.length > 0 ? (
        <section className="mb-12 pt-10 border-t border-[var(--color-border-default)]">
          <h2 className="text-display-md text-white text-balance mb-6">
            Questions on this brief.
          </h2>
          <Accordion
            items={brief.faq.map((f, i) => ({
              id: `cb-${briefNumberPadded}-faq-${i}`,
              question: f.question,
              answer: f.answer,
            }))}
          />
        </section>
      ) : null}

      <section className="rounded-[var(--radius-xl)] border border-electric/30 bg-electric/5 p-8 md:p-10">
        <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
          The next step
        </p>
        <h2 className="text-display-md text-white text-balance mb-4">
          Start with a Signal Audit.
        </h2>
        <p className="text-body-lg text-silver mb-6 max-w-2xl">
          A diagnostic that maps your citation graph, entity baseline,
          and authority gaps — plus a 30-day implementation roadmap. The
          fastest way to know where you stand inside the answer economy.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/audit"
            className={buttonStyles({ variant: "primary", size: "lg" })}
          >
            Run a Growth Audit
          </Link>
          <Link
            href="/pricing"
            className={buttonStyles({ variant: "ghost", size: "lg" })}
          >
            See the Citation Score™ subscription
          </Link>
        </div>
      </section>
    </div>
  );

  return (
    <>
      <JsonLd
        schema={articleJsonLd}
        id={`schema-article-cb-${briefNumberPadded}`}
      />
      <JsonLd schema={author} id={`schema-author-cb-${briefNumberPadded}`} />
      <JsonLd
        schema={breadcrumbs}
        id={`schema-breadcrumb-cb-${briefNumberPadded}`}
      />
      {faq ? (
        <JsonLd schema={faq} id={`schema-faq-cb-${briefNumberPadded}`} />
      ) : null}

      <article className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Link
            href="/citation-brief"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-silver hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden />
            Citation Briefs
          </Link>

          {hasToc ? (
            <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">
              {content}
              <ArticleToc entries={toc} />
            </div>
          ) : (
            content
          )}
        </div>
      </article>
    </>
  );
}
