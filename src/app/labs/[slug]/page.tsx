import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { ArticleCta } from "@/components/labs/article-cta";
import { ArticleMeta } from "@/components/labs/article-meta";
import { ArticleToc } from "@/components/labs/article-toc";
import { JsonLd } from "@/components/json-ld";
import { RelatedSystems } from "@/components/labs/related-systems";
import {
  getAllStaticSlugs,
  getStaticArticleBySlug,
  getStaticArticleToc,
} from "@/lib/labs-static";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  personSchema,
} from "@/lib/schema";

/* ─────────────────────────────────────────────────────────────
   Phase 7.4 fix — explicit static MDX imports.

   Why: dynamic `import("@/content/labs/${slug}.mdx")` doesn't get
   followed by the OpenNext bundler — at runtime in Workers the modules
   aren't in the bundle, the dynamic import returns undefined, the page
   calls notFound() → all 3 article URLs returned 404 in production.

   Static imports force the bundler to track every MDX path. Adding a
   new article = (1) drop .mdx in src/content/labs/, (2) add a static
   import below, (3) add the entry to src/lib/labs-static.ts manifest.
───────────────────────────────────────────────────────────────── */

import AiRecommendationsCompound from "@/content/labs/ai-recommendations-compound.mdx";
import FiveCitationSignals from "@/content/labs/five-citation-signals.mdx";
import SearchIsSplitting from "@/content/labs/search-is-splitting.mdx";

const ARTICLE_COMPONENTS: Record<string, React.ComponentType> = {
  "ai-recommendations-compound": AiRecommendationsCompound,
  "five-citation-signals": FiveCitationSignals,
  "search-is-splitting": SearchIsSplitting,
};

/* ─────────────────────────────────────────────────────────────
   Force-static — defence in depth.

   `generateStaticParams` already triggers SSG, but force-static +
   revalidate=false explicitly tells OpenNext to ship pre-rendered HTML
   via the assets binding, never the runtime function path. This avoids
   any fs-dependent fallback at request time.
───────────────────────────────────────────────────────────────── */

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return getAllStaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getStaticArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/labs/${article.slug}`,
    ogImage: article.ogImage ?? siteConfig.ogImage,
  });
}

export default async function LabsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getStaticArticleBySlug(slug);
  const ArticleContent = ARTICLE_COMPONENTS[slug];

  // If either the manifest entry or the MDX module is missing, the slug
  // is unknown. Both must be present — they're maintained in tandem.
  if (!article || !ArticleContent) notFound();

  const articleUrl = `${siteConfig.url}/labs/${article.slug}`;
  const toc = getStaticArticleToc(slug);

  const articleJsonLd = articleSchema({
    headline: article.title,
    description: article.summary,
    url: articleUrl,
    datePublished: article.lastUpdated,
    dateModified: article.lastUpdated,
    authorName: article.author,
    image: `${siteConfig.url}${article.ogImage ?? siteConfig.ogImage}`,
    articleSection: article.category,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Wiele Labs", url: `${siteConfig.url}/labs` },
    { name: article.title, url: articleUrl },
  ]);
  const faq = article.faq && article.faq.length > 0
    ? faqSchema(article.faq.map((f) => ({ question: f.question, answer: f.answer })))
    : null;
  // Per-route Person schema for the article author. Article schema's
  // nested author is good but a top-level Person carries sameAs +
  // jobTitle + worksFor cleanly for AI engines that index entities.
  const author = personSchema({
    name: article.author,
    jobTitle: "Founder & Principal",
    url: `${siteConfig.url}/about#founder`,
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.x],
  });

  return (
    <>
      <JsonLd schema={articleJsonLd} id={`schema-article-${slug}`} />
      <JsonLd schema={author} id={`schema-author-${slug}`} />
      <JsonLd schema={breadcrumbs} id={`schema-breadcrumb-${slug}`} />
      {faq ? <JsonLd schema={faq} id={`schema-faq-${slug}`} /> : null}

      <article className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Link
            href="/labs"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-silver hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden />
            Wiele Labs
          </Link>

          <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <header className="mb-10">
                <h1 className="text-display-xl text-white text-balance mb-5">
                  {article.title}
                </h1>
                <p className="text-body-lg text-silver">{article.summary}</p>
              </header>

              <ArticleMeta article={article} />

              <div className="article-prose">
                <ArticleContent />
              </div>

              {article.faq && article.faq.length > 0 ? (
                <section className="mt-12 pt-10 border-t border-[var(--color-border-default)]">
                  <h2 className="text-display-md text-white text-balance mb-6">
                    Questions on this thesis.
                  </h2>
                  <Accordion
                    items={article.faq.map((f, i) => ({
                      id: `${slug}-faq-${i}`,
                      question: f.question,
                      answer: f.answer,
                    }))}
                  />
                </section>
              ) : null}

              {article.relatedSystems ? (
                <RelatedSystems slugs={article.relatedSystems} />
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
