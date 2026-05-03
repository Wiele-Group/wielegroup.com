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
import { getAllSlugs, getArticleBySlug } from "@/lib/labs";
import { getArticleToc } from "@/lib/labs-toc";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";

/**
 * Static map of MDX module loaders — Next.js bundles each at build time.
 * Adding a new article is a 4-line change here + a new .mdx file in
 * src/content/labs/. Frontmatter Zod validation catches mismatches.
 */
const articleModules = {
  "ai-recommendations-compound": () =>
    import("@/content/labs/ai-recommendations-compound.mdx"),
  "five-citation-signals": () =>
    import("@/content/labs/five-citation-signals.mdx"),
  "search-is-splitting": () => import("@/content/labs/search-is-splitting.mdx"),
} as const;

type KnownSlug = keyof typeof articleModules;

function isKnownSlug(slug: string): slug is KnownSlug {
  return slug in articleModules;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
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
  const article = getArticleBySlug(slug);
  if (!article || !isKnownSlug(slug)) notFound();

  const { default: ArticleContent } = await articleModules[slug]();
  const toc = getArticleToc(slug);

  const articleJsonLd = articleSchema({
    headline: article.title,
    description: article.summary,
    url: article.url,
    datePublished: article.lastUpdated,
    dateModified: article.lastUpdated,
    authorName: article.author,
    image: `${siteConfig.url}${article.ogImage ?? siteConfig.ogImage}`,
    articleSection: article.category,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Wiele Labs", url: `${siteConfig.url}/labs` },
    { name: article.title, url: article.url },
  ]);
  const faq = article.faq && article.faq.length > 0 ? faqSchema(article.faq) : null;

  return (
    <>
      <JsonLd schema={articleJsonLd} id={`schema-article-${slug}`} />
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
