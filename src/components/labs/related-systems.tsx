import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { systemsDetail, type SystemSlug } from "@/data/systems-detail";
import type { RelatedSystemSlug } from "@/lib/labs-static";

/**
 * Renders links to the systems referenced in an article's frontmatter.
 * Reuses systemsDetail data so the title + slug stay in sync with /systems/*.
 *
 * Phase 7.4: switched type from LabsFrontmatter (fs-derived) to the
 * runtime-safe RelatedSystemSlug enum from labs-static.ts. Same values,
 * different declaration site — keeps the [slug] page bundle free of
 * fs.readdirSync calls.
 */
export function RelatedSystems({
  slugs,
}: {
  slugs: readonly RelatedSystemSlug[];
}) {
  if (!slugs || slugs.length === 0) return null;
  return (
    <section
      aria-labelledby="related-systems-heading"
      className="mt-12 pt-10 border-t border-[var(--color-border-default)]"
    >
      <h2
        id="related-systems-heading"
        className="text-body-xs font-mono uppercase tracking-[0.14em] text-electric mb-4"
      >
        Related systems
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
        {slugs.map((slug: SystemSlug) => {
          const sys = systemsDetail[slug];
          return (
            <li key={slug}>
              <Link
                href={`/systems/${slug}`}
                className="group flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3.5 transition-[border-color,background-color] hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:border-electric"
              >
                <span className="text-body-md text-cloud group-hover:text-white transition-colors">
                  {sys.hero.title}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-electric transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
