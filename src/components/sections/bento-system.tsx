import Link from "next/link";
import { ArrowUpRight, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { servicesBento, type ServiceBentoEntry } from "@/data/services-bento";
import { cn } from "@/lib/utils";

/**
 * Map stripVariant → CSS class string.
 * All classes exist in globals.css — no new tokens.
 */
function stripClass(variant: ServiceBentoEntry["stripVariant"]): string {
  switch (variant) {
    case "duality": return "glass-strip glass-strip-duality";
    case "neon":    return "glass-strip glass-strip-neon";
    case "pulse":   return "glass-strip glass-strip-pulse";
    case "coral":   return "glass-strip glass-strip-coral";
    default:        return "glass-strip";
  }
}

/**
 * AI Search featured card (type="service", id="ai-search").
 * Receives the full AI_SEARCH_TAGS inline — six signal categories, no trimming.
 */
const AI_SEARCH_TAGS = [
  "GEO",
  "AEO",
  "Citation Engineering",
  "Entity Authority",
  "Query Ecosystems",
  "Conversion Pathways",
] as const;

function AiSearchCard({ entry }: { entry: ServiceBentoEntry }) {
  return (
    <Link
      href={entry.href ?? "/systems/ai-visibility"}
      aria-label={`${entry.title} — ${entry.headline}`}
      className={cn(
        "group relative flex flex-col h-full p-6 md:p-8",
        stripClass(entry.stripVariant),
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]",
      )}
    >
      {/* Header: badges + arrow */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="pulse" size="sm">
            {entry.eyebrow}
          </Badge>
          <Badge variant="electric" size="sm">
            AI Visibility Defense
          </Badge>
        </div>
        <ArrowUpRight
          size={16}
          aria-hidden
          className={cn(
            "shrink-0 mt-0.5 text-smoke",
            "transition-[transform,color] duration-[var(--motion-t2)] ease-[var(--ease-productive)]",
            "group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          )}
        />
      </div>
      <h3 className="text-heading-lg text-[var(--color-chrome-hi)] mb-2 leading-tight tracking-tight">
        {entry.title}
      </h3>
      <p className="text-body-md text-cloud mb-3 leading-snug">
        {entry.headline}
      </p>
      <p className="text-body-sm text-silver mb-6 leading-relaxed flex-1">
        {entry.body}
      </p>
      {/* Full GEO / AEO tag set — electric-tinted pills */}
      <ul
        className="mt-auto flex flex-wrap gap-1.5"
        aria-label="AI Search Optimization capabilities"
      >
        {AI_SEARCH_TAGS.map((tag) => (
          <li
            key={tag}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-blue-hi)] border border-[rgba(59,130,246,0.28)] bg-[rgba(59,130,246,0.06)] rounded-full px-2.5 py-1"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}

/**
 * Wiele OS anchor card (type="os").
 * Horizontal layout on md+, Shield badge, duality sweep.
 */
function WieleOsCard({ entry }: { entry: ServiceBentoEntry }) {
  return (
    <Link
      href={entry.href ?? "/platform"}
      aria-label={`Wiele OS — ${entry.headline}`}
      className={cn(
        "group relative flex flex-col md:flex-row md:items-center gap-6",
        "h-full p-6 md:p-8",
        stripClass(entry.stripVariant),
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]",
      )}
    >
      {/* Copy block */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="neon" size="sm">
            {entry.eyebrow}
          </Badge>
          <ArrowUpRight
            size={16}
            aria-hidden
            className={cn(
              "shrink-0 text-smoke md:hidden",
              "transition-[transform,color] duration-[var(--motion-t2)] ease-[var(--ease-productive)]",
              "group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            )}
          />
        </div>
        <h3 className="text-heading-lg text-white mb-2 leading-tight tracking-tight">
          {entry.title}
        </h3>
        <p className="text-body-md text-cloud mb-3 leading-snug">
          {entry.headline}
        </p>
        <p className="text-body-sm text-silver leading-relaxed">
          {entry.body}
        </p>
      </div>

      {/* Right column: shield + desktop arrow */}
      <div className="shrink-0 flex flex-col items-start md:items-center gap-4">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric/30 bg-electric/5"
          aria-label="AI Visibility Defense built into Wiele OS"
        >
          <Shield size={12} className="text-electric" aria-hidden />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-electric whitespace-nowrap">
            AI Visibility Defense
          </span>
        </div>
        <ArrowUpRight
          size={16}
          aria-hidden
          className={cn(
            "hidden md:block text-smoke",
            "transition-[transform,color] duration-[var(--motion-t2)] ease-[var(--ease-productive)]",
            "group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          )}
        />
      </div>
    </Link>
  );
}

/**
 * Standard service / signal card (type="service" | "signal").
 * Null-href signal tiles render a <div> instead of <Link>.
 */
function ServiceCard({ entry }: { entry: ServiceBentoEntry }) {
  const isSignal = entry.type === "signal";
  const tagClass = isSignal
    ? "font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-coral-core)] border border-[rgba(240,133,102,0.28)] bg-[rgba(240,133,102,0.06)] rounded-full px-2.5 py-1"
    : "font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-silver border border-[var(--color-border-subtle)] rounded-full px-2.5 py-1";

  const inner = (
    <>
      <div className="flex items-start justify-between mb-5">
        <Badge variant={isSignal ? "pulse" : "outline"} size="sm">
          {entry.eyebrow}
        </Badge>
        {entry.href && (
          <ArrowUpRight
            size={15}
            aria-hidden
            className={cn(
              "shrink-0 text-smoke",
              "transition-[transform,color] duration-[var(--motion-t2)] ease-[var(--ease-productive)]",
              "group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            )}
          />
        )}
      </div>
      <h3 className="text-heading-md text-white mb-2 leading-tight tracking-tight">
        {entry.title}
      </h3>
      <p className="text-body-sm text-cloud mb-4 leading-snug flex-1">
        {entry.headline}
      </p>
      <ul
        className="mt-auto flex flex-wrap gap-1.5"
        aria-label={`${entry.title} capabilities`}
      >
        {entry.tags.map((tag) => (
          <li key={tag} className={tagClass}>
            {tag}
          </li>
        ))}
      </ul>
    </>
  );

  const sharedClass = cn(
    "group relative flex flex-col h-full p-6 md:p-7",
    stripClass(entry.stripVariant),
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]",
  );

  if (!entry.href) {
    return <div className={sharedClass}>{inner}</div>;
  }

  return (
    <Link
      href={entry.href}
      aria-label={`${entry.title} — ${entry.headline}`}
      className={sharedClass}
    >
      {inner}
    </Link>
  );
}

/**
 * BentoSystem — Phase 3: data-driven Bento Services / Wiele OS.
 *
 * Driven by `services-bento.ts`. Layout (3-column desktop):
 *   Row 1: AI Search (md:col-span-2) · Brand
 *   Row 2: Marketing · Web · Advertising
 *   Row 3: SEO (lg:col-span-2) · Query Ecosystems signal
 *   Row 4: WIELE OS (col-span-full)
 *
 * col-span classes are on the FadeIn motion.div (the actual CSS grid item),
 * NOT on inner Link/div children — this is what makes col-span resolve
 * correctly. FadeIn renders <motion.div className={className}>children</motion.div>.
 * Using Reveal would wrap each child in an anonymous motion.div, silently
 * breaking col-span resolution.
 *
 * Server component — no "use client" at this layer. FadeIn is the only
 * client boundary.
 *
 * Constraints (binding):
 *   - No new CSS tokens. All vars are existing B4 Chromaglass tokens.
 *   - No fake metrics, client results, or testimonials.
 *   - No new npm dependencies.
 *   - systems.ts untouched (drives RelatedSystems in labs/proof).
 *   - prefers-reduced-motion respected via FadeIn + glass-strip CSS.
 */
export function BentoSystem() {
  return (
    <section
      className="py-20 md:py-28 lg:py-32 bg-[var(--color-void)]/50"
      aria-labelledby="bento-os-heading"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">

        {/* ── Section header ──────────────────────────────────────── */}
        <FadeIn whileInView>
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              The operating system
            </p>
            <h2
              id="bento-os-heading"
              className="text-display-lg text-white text-balance"
            >
              Six disciplines. One operating system.
            </h2>
            <p className="text-body-lg text-silver mt-5 max-w-2xl">
              Brand, marketing, web, advertising, SEO, and AI search —
              engineered as one integrated growth architecture.
            </p>
          </div>
        </FadeIn>

        {/* ── Bento grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {servicesBento.map((entry, i) => {
            // Stagger delay: 0.05 per card, capped at 0.35
            const delay = Math.min(i * 0.05, 0.35);
            // colSpan empty string → no extra className needed
            const colSpanClass = entry.colSpan || undefined;

            return (
              <FadeIn
                key={entry.id}
                whileInView
                delay={delay}
                className={colSpanClass}
              >
                {entry.type === "os" ? (
                  <WieleOsCard entry={entry} />
                ) : entry.id === "ai-search" ? (
                  <AiSearchCard entry={entry} />
                ) : (
                  <ServiceCard entry={entry} />
                )}
              </FadeIn>
            );
          })}
        </div>

        {/* ── Closing compound line ────────────────────────────────── */}
        <FadeIn whileInView delay={0.1}>
          <p className="mt-10 text-body-sm text-smoke max-w-2xl">
            Each discipline compounds the others. Brand sharpens conversion.
            SEO feeds advertising. AI search amplifies authority. Web design
            captures the demand the system creates. One team, one standard,
            one outcome.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
