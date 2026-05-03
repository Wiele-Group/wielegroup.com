import type { TocEntry } from "@/lib/labs-toc";
import { cn } from "@/lib/utils";

/**
 * Sticky article TOC. Server component — TOC is extracted at build time
 * from the MDX source, so the rendered list ships in the static HTML.
 * Anchors line up with mdx-components.tsx slugify() (and rehype-slug).
 */
export function ArticleToc({ entries }: { entries: readonly TocEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pl-6 border-l border-[var(--color-border-default)]">
        <p className="text-body-xs font-mono uppercase tracking-[0.14em] text-smoke mb-3">
          On this page
        </p>
        <ul className="flex flex-col gap-2">
          {entries.map((entry) => (
            <li key={`${entry.level}-${entry.slug}`}>
              <a
                href={`#${entry.slug}`}
                className={cn(
                  "block text-body-sm transition-colors leading-snug",
                  entry.level === 2 ? "text-cloud" : "text-silver pl-3",
                  "hover:text-electric focus-visible:outline-none focus-visible:text-electric",
                )}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
