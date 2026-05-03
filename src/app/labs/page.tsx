import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { getAllArticles, getAllCategories } from "@/lib/labs";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Wiele Labs — Field notes from the AI growth frontier",
  description:
    "Strategy, methodology, and field notes on how AI search actually rewards brands. Founder-led writing from Wiele Group.",
  path: "/labs",
});

export default function LabsIndexPage() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Wiele Labs", url: `${siteConfig.url}/labs` },
  ]);
  const blog = blogSchema({
    name: "Wiele Labs",
    url: `${siteConfig.url}/labs`,
    description:
      "Strategy, methodology, and field notes on how AI search actually rewards brands. Founder-led writing from Wiele Group.",
    posts: articles.map((a) => ({
      headline: a.title,
      url: a.url,
      datePublished: a.lastUpdated,
      authorName: a.author,
    })),
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-labs" />
      <JsonLd schema={blog} id="schema-blog-labs" />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 ambient-gradient pointer-events-none"
        />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Wiele Labs
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                Field notes from the AI growth frontier.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Strategy, methodology, and the thesis behind how AI search
                actually rewards brands. Founder-led writing — every article
                reviewed before it ships.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {categories.length > 0 ? (
        <section className="border-t border-[var(--color-border-default)]">
          <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-5">
            <ul className="flex flex-wrap items-center gap-2">
              <li className="text-body-xs font-mono uppercase tracking-[0.14em] text-smoke mr-2">
                Filter
              </li>
              <li>
                <span className="inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-body-xs font-medium bg-electric/10 text-electric-light border border-electric/30">
                  All
                </span>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <span className="inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-body-xs font-medium bg-[var(--color-surface-elevated)] text-silver border border-[var(--color-border-default)]">
                    {cat}
                  </span>
                </li>
              ))}
              <li className="text-body-xs font-mono text-smoke ml-auto">
                Category-filtering UI lands in Phase 6
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          {articles.length === 0 ? (
            <p className="text-body-md text-silver">
              No articles yet — first three land here once the founder review
              clears.
            </p>
          ) : (
            <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/labs/${article.slug}`}
                  className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[18rem] transition-[border-color,background-color] duration-[var(--duration-base)] hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:border-electric"
                >
                  <Badge variant="outline" size="sm" className="mb-4 self-start">
                    {article.category}
                  </Badge>
                  <h2 className="text-heading-md text-white leading-tight mb-3 text-balance">
                    {article.title}
                  </h2>
                  <p className="text-body-sm text-silver flex-1">{article.summary}</p>
                  <div className="mt-5 pt-4 border-t border-[var(--color-border-default)] flex items-center justify-between text-body-xs font-mono">
                    <span className="text-smoke flex items-center gap-1.5">
                      <Clock size={11} aria-hidden />
                      {article.readingMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-1 text-electric">
                      Read note
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
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
