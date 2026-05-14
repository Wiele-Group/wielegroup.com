import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { getVisibleBriefManifest } from "@/lib/citation-briefs-static";

/**
 * v3.9.3 — Wiele Citation Brief index.
 *
 * Productized Tier-1 play from the 2026-05-14 Advertising Canon intake.
 * Each brief is a single-topic, extractable, schema-marked guide answering
 * a buyer-decision query inside AI answer engines. Briefs are the primary
 * top-of-funnel citation asset in the Wiele Citation Score™ subscription.
 *
 * Architecture: this page is the index. Each individual brief lives at
 * /citation-brief/[slug]/page.tsx as a static route. Brief identity +
 * metadata lives in src/lib/citation-briefs-static.ts (the manifest is
 * the single source of truth — this index and the dynamic route both
 * read from it). Mirrors the labs/[slug] + labs-static pattern.
 */

export const metadata: Metadata = buildMetadata({
  title: "Citation Briefs — Wiele field guides for AI answer engines",
  description:
    "Wiele Citation Briefs: extractable field guides covering how AI answer engines decide what to cite. Methodology open. Citation, not clicks.",
  path: "/citation-brief",
});

export const dynamic = "force-static";
export const revalidate = false;

export default function CitationBriefIndexPage() {
  const briefs = getVisibleBriefManifest();
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Citation Briefs", url: `${siteConfig.url}/citation-brief` },
  ]);
  const webPage = webPageSchema({
    name: "Wiele Citation Briefs",
    url: `${siteConfig.url}/citation-brief`,
    description:
      "Wiele Citation Briefs are extractable field guides covering how AI answer engines decide what to cite. Engineered for inclusion inside ChatGPT, Perplexity, Google AI Overviews, Gemini, and Copilot.",
    dateModified: "2026-05-14",
  });
  const itemList = itemListSchema({
    name: "Wiele Citation Brief catalogue",
    items: briefs.map((b) => ({
      url: `${siteConfig.url}/citation-brief/${b.slug}`,
      name: b.title,
    })),
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-citation-brief" />
      <JsonLd schema={webPage} id="schema-webpage-citation-brief" />
      <JsonLd schema={itemList} id="schema-itemlist-citation-brief" />

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Wiele Citation Briefs
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Field guides for the answer economy.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Each brief answers one decision-stage question buyers
                ask inside ChatGPT, Perplexity, Google AI Overviews,
                Gemini, and Copilot. Extractable. Schema-marked.
                Methodology open. Built to be cited.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {briefs.map((b) => (
              <Link
                key={b.slug}
                href={`/citation-brief/${b.slug}`}
                className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[18rem] transition-[border-color,background-color] duration-[var(--duration-base)] hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:border-electric"
              >
                <Badge variant="outline" size="sm" className="mb-4 self-start">
                  {b.eyebrow}
                </Badge>
                <h2 className="text-heading-md text-white leading-tight mb-3 text-balance">
                  {b.title}
                </h2>
                <p className="text-body-sm text-silver flex-1">{b.summary}</p>
                <div className="mt-5 pt-4 border-t border-[var(--color-border-default)] flex items-center justify-between text-body-xs font-mono">
                  <span className="text-smoke">{b.readingMinutes} min read</span>
                  <span className="inline-flex items-center gap-1 text-electric">
                    Read brief
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
