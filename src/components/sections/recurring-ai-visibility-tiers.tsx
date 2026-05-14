import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { FadeIn } from "@/components/motion/fade-in";
import {
  citationScoreTiers,
  formatCitationScorePrice,
  type CitationScoreTier,
} from "@/data/citation-score";
import { cn } from "@/lib/utils";

/**
 * v3.9.4 — Recurring AI Visibility section.
 *
 * Three Citation Score™ subscription tiers (Starter / Pro / Authority),
 * rendered ABOVE the existing one-off pricing ladder on /pricing. Closes
 * the brief → pricing buyer-journey gap from Citation Brief #001 (which
 * deep-links here via #recurring-ai-visibility).
 *
 * Featured tier (Pro) carries the duality-border + Most-Chosen pill,
 * mirroring the StandardTierCard featured treatment in pricing-section.tsx
 * so the visual system stays coherent across both sections.
 */
export function RecurringAiVisibilityTiers() {
  return (
    <section
      id="recurring-ai-visibility"
      className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="max-w-2xl mb-10 md:mb-14">
          <FadeIn>
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Recurring AI Visibility · Citation Score™
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-display-md text-white text-balance">
              Recurring AI Visibility.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-body-lg text-silver mt-5">
              The subscription layer of the Wiele Citation Score™ system —
              tracked citation lift across the engines that decide who gets
              recommended, plus the briefs that compound the authority graph
              month over month. Three tiers. GBP. Monthly. 3-month minimum.
            </p>
          </FadeIn>
        </div>

        <Reveal
          stagger={0.05}
          className="wg-depth-scene grid gap-4 md:grid-cols-3"
        >
          {citationScoreTiers.map((tier) => (
            <CitationScoreTierCard key={tier.slug} tier={tier} />
          ))}
        </Reveal>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/citation-score"
            className="text-body-sm font-medium text-electric hover:text-electric-light underline-offset-4 hover:underline transition-colors"
          >
            See Citation Score™ methodology →
          </Link>
          <p className="text-body-xs font-mono text-smoke text-center">
            All Citation Score™ tiers billed monthly in GBP, exclude VAT.
            3-month minimum term · 30-day cancellation notice.
            <span className="block mt-1 text-[0.6875rem] tracking-[0.08em]">
              Direct Checkout deferred until named-client case studies close — CTA routes to a principal session.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual tier card — mirrors StandardTierCard from
   pricing-section.tsx for visual coherence across both sections.
───────────────────────────────────────────────────────────── */
function CitationScoreTierCard({ tier }: { tier: CitationScoreTier }) {
  return (
    <article
      id={`citation-score-${tier.slug}`}
      data-tier={tier.slug}
      data-featured={tier.featured ? "true" : undefined}
      className={cn(
        "relative flex flex-col p-6 md:p-7 wg-depth-card",
        tier.featured ? "duality-border chrome-card" : "glass-strip",
      )}
    >
      {tier.featured ? (
        <span className="absolute -top-2.5 left-6 px-3 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white bg-electric shadow-[0_4px_18px_rgba(59,130,246,0.35)]">
          Most chosen
        </span>
      ) : null}

      <Badge
        variant={tier.featured ? "electric" : "outline"}
        size="sm"
        className="mb-3 self-start"
      >
        {tier.badgeLabel}
      </Badge>

      <h3 className="text-heading-md text-white text-balance">{tier.name}</h3>

      <div className="mt-3 mb-4">
        <span className="font-mono text-[1.5rem] leading-none font-semibold text-white">
          {formatCitationScorePrice(tier.priceGbp)}
        </span>
      </div>

      <ul className="flex flex-col gap-2 mb-5">
        {tier.inclusions.map((inclusion) => (
          <li
            key={inclusion}
            className="flex items-start gap-2 text-body-sm text-cloud"
          >
            <Check
              size={14}
              className="mt-1 shrink-0 text-electric"
              aria-hidden
            />
            <span>{inclusion}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <Link
          href={tier.ctaHref}
          className={cn(
            buttonStyles({
              variant: tier.featured ? "featured" : "ghost",
              size: "md",
            }),
            "w-full",
          )}
        >
          Talk to Wiele
        </Link>
      </div>
    </article>
  );
}
