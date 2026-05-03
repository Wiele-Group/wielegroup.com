import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { labsPreviewArticles } from "@/data/homepage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Wiele Labs — Field notes from the AI growth frontier",
  description:
    "Strategy, methodology, and the thesis behind how AI search actually rewards brands. MDX-powered article hub launching in Phase 4.",
  path: "/labs",
});

export default function LabsIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
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
                actually rewards brands. The full MDX article hub launches in
                Phase 4 — these are the first three pieces in the queue.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-3">
            {labsPreviewArticles.map((article) => (
              <article
                key={article.title}
                className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[16rem]"
              >
                <Badge variant="outline" size="sm" className="mb-4 self-start">
                  {article.eyebrow}
                </Badge>
                <h2 className="text-heading-sm text-white leading-tight mb-3 text-balance">
                  {article.title}
                </h2>
                <p className="text-body-sm text-silver flex-1">{article.summary}</p>
                <div className="mt-5 pt-4 border-t border-[var(--color-border-default)]">
                  <span className="text-body-xs font-mono text-warning">
                    [ARTICLE PENDING — Phase 4 MDX ship]
                  </span>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
