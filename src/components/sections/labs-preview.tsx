import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { labsPreviewArticles } from "@/data/homepage";

export function LabsPreview() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[var(--color-obsidian)]/40">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Wiele Labs
            </p>
            <h2 className="text-display-lg text-white text-balance">
              Field notes from the AI growth frontier.
            </h2>
            <p className="text-body-lg text-silver mt-5">
              The strategy, the methodology, and the thesis behind how AI search
              actually rewards brands.
            </p>
          </div>
          <Link
            href="/labs"
            className={buttonStyles({ variant: "ghost", size: "md" })}
          >
            All field notes
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>

        <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-3">
          {labsPreviewArticles.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 min-h-[14rem] transition-[border-color,background-color] duration-[var(--duration-base)] hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:border-electric"
            >
              <Badge variant="outline" size="sm" className="mb-4 self-start">
                {article.eyebrow}
              </Badge>
              <h3 className="text-heading-sm text-white leading-tight mb-3 text-balance">
                {article.title}
              </h3>
              <p className="text-body-sm text-silver flex-1">{article.summary}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-medium text-electric">
                Read note
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
