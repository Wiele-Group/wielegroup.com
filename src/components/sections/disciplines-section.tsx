import Link from "next/link";
import { ArrowUpRight, Shield } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { disciplines } from "@/data/homepage";
import { cn } from "@/lib/utils";

/**
 * DisciplinesSection — six-pillar full-service showcase.
 *
 * v2.2 (2026-05-04): Brand Design & Marketing split into TWO cards
 * (Brand Management + Marketing) so each discipline links to its own
 * agency landing page or systems page. 6-card grid: 2 rows × 3 cols.
 *
 * Positioning purpose: this is the section that prevents the homepage
 * reading as "AI visibility shop." It establishes Wiele Group as a
 * premium full-service marketing agency where AI search is one engine
 * among many. Sits directly after ProofStrip — first scroll past hero
 * anchors the full discipline range.
 *
 * Visual treatment:
 *   - Six chrome-card surfaces (B4 Chromaglass primitive).
 *   - Each card is a Next.js Link → its agency or systems page.
 *   - Hover: card lifts + signal-blue border glow (motion v1 t3 expressive).
 *   - Arrow indicator slides on hover for affordance.
 *
 * Anchor: id="disciplines" — Hero secondary CTA scrolls here.
 */
export function DisciplinesSection() {
  return (
    <section
      id="disciplines"
      className="relative py-20 md:py-28 lg:py-32 bg-[var(--color-void)]/70"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
            The agency
          </p>
          <h2 className="text-display-lg text-white text-balance">
            Six disciplines. One operating system.
          </h2>
          <p className="text-body-lg text-silver mt-5 max-w-2xl">
            Brand, marketing, web, advertising, SEO, and AI search optimization
            — engineered as one integrated system. Premium firms hire Wiele
            when they want every growth lever moving in the same direction.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 rounded-full border border-electric/30 bg-electric/5">
            <Shield size={13} className="text-electric" aria-hidden />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-electric">
              AI Visibility Defense across all 6
            </span>
          </div>
        </div>

        <Reveal
          stagger={0.05}
          className="wg-depth-scene grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]"
        >
          {disciplines.map((discipline) => (
            <Link
              key={discipline.num}
              href={discipline.href}
              aria-label={`${discipline.title} — ${discipline.headline}`}
              className={cn(
                "group relative flex flex-col p-6 md:p-7 chrome-card wg-depth-card",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]",
              )}
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-body-xs text-smoke tracking-[0.18em]">
                  {discipline.num}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="text-smoke transition-[transform,color] duration-[var(--motion-t2)] ease-[var(--ease-productive)] group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
              <h3 className="text-heading-md text-white mb-2 leading-tight tracking-tight">
                {discipline.title}
              </h3>
              <p className="text-body-md text-cloud mb-3 leading-snug">
                {discipline.headline}
              </p>
              <p className="text-body-sm text-silver mb-5 leading-relaxed">
                {discipline.body}
              </p>
              <ul className="mt-auto flex flex-wrap gap-1.5">
                {discipline.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-silver border border-[var(--color-border-subtle)] rounded-full px-2.5 py-1"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </Reveal>

        <p className="mt-10 text-body-sm text-smoke max-w-2xl">
          Each discipline is engineered to compound the others. Brand sharpens
          conversion. SEO feeds advertising. AI search amplifies authority.
          Web design captures the demand the system creates. One team, one
          standard, one outcome.
        </p>
      </div>
    </section>
  );
}
