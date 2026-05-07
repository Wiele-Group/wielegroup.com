import Link from "next/link";
import { Check, Shield } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import {
  pricingTiers,
  tierPriceLabel,
  type PricingTier,
} from "@/data/pricing";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  /**
   * Show the section's own heading block ("Pricing" eyebrow + display
   * heading + intro paragraph). Default true (used on the home page).
   * Set false when the surrounding page already has a hero — e.g.
   * /pricing renders its own h1 above this section.
   */
  showHeading?: boolean;
};

/**
 * v3.0 layout (2026-05-06):
 *   Sovereign anchor row (single chrome-bordered card, top)
 *   Standard 5-tier grid (lg:grid-cols-5)
 *
 * AI Visibility Defense badge sits on every paid tier; Signal Audit
 * carries a "Defense baseline included" variant. The 3-vector list
 * renders inline beneath the price block (no JS toggle — render in SSR
 * so AI crawlers see it on first byte).
 */
export function PricingSection({ showHeading = true }: PricingSectionProps = {}) {
  const anchorTier = pricingTiers.find((t) => t.anchor);
  const standardTiers = pricingTiers.filter((t) => !t.anchor);

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        {showHeading ? (
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Pricing
            </p>
            <h2 className="text-display-lg text-white text-balance">
              Premium AI search dominance — with defense built-in.
            </h2>
            <p className="text-body-lg text-silver mt-5">
              Every paid tier ships with AI Visibility Defense as standard:
              prompt-injection surface monitoring, AI crawler posture
              management, and competitor displacement counter-engineering.
              Tier depth scales the team and the frequency.
            </p>
          </div>
        ) : null}

        {anchorTier ? (
          <div className="mb-6">
            <AnchorTierCard tier={anchorTier} />
          </div>
        ) : null}

        <Reveal
          stagger={0.05}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
        >
          {standardTiers.map((tier) => (
            <StandardTierCard key={tier.id} tier={tier} />
          ))}
        </Reveal>

        <p className="mt-8 text-body-xs font-mono text-smoke text-center">
          All prices in GBP, exclude VAT. Wiele bills monthly. 30-day notice. No long-term lock-in.
          <span className="block mt-1 text-[0.6875rem] tracking-[0.08em]">
            Self-serve checkout via Stripe. SCA-compliant. Secured payments.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Standard tier card — 5 in the main grid
───────────────────────────────────────────────────────────── */
function StandardTierCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      id={tier.id}
      data-tier={tier.id}
      data-featured={tier.featured ? "true" : undefined}
      className={cn(
        "relative flex flex-col p-6 md:p-7",
        tier.featured ? "duality-border chrome-card" : "glass-strip",
      )}
    >
      {tier.featured ? (
        <span
          className="absolute -top-2.5 left-6 px-3 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white bg-electric shadow-[0_4px_18px_rgba(59,130,246,0.35)]"
        >
          Most chosen
        </span>
      ) : null}

      <h3 className="text-heading-md text-white text-balance min-h-[2.6em]">{tier.name}</h3>

      <div className="mt-3 mb-1">
        <span className="font-mono text-[1.5rem] leading-none font-semibold text-white">
          {tierPriceLabel(tier)}
        </span>
      </div>

      <DefenseBadge level={tier.aiDefense.level} />

      <p className="text-body-sm text-silver mt-3 mb-2">{tier.positioning}</p>
      <p className="text-body-xs font-mono text-smoke italic mb-4">
        {tier.differentiator}
      </p>

      <ul className="flex flex-col gap-2 mb-5">
        {tier.outcomes.map((outcome) => (
          <li
            key={outcome}
            className="flex items-start gap-2 text-body-sm text-cloud"
          >
            <Check
              size={14}
              className="mt-1 shrink-0 text-electric"
              aria-hidden
            />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>

      <DefenseVectors features={tier.aiDefense.features} />

      <div className="mt-auto flex flex-col gap-2.5 pt-5">
        <Link
          href={tier.cta.href}
          className={cn(
            buttonStyles({
              variant: tier.featured ? "featured" : "ghost",
              size: "md",
            }),
            "w-full",
          )}
        >
          {tier.cta.label}
        </Link>
        {tier.paymentLinkUrl ? (
          <a
            href={tier.paymentLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-plausible-event-name="Pay Now Click"
            data-plausible-event-tier={tier.id}
            className="text-center text-body-xs font-mono uppercase tracking-[0.12em] text-silver hover:text-electric hover:underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:text-electric focus-visible:underline"
          >
            Or pay now <span aria-hidden>→</span>
            <span className="sr-only">
              {" "}
              (opens Stripe checkout in a new tab)
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sovereign anchor card — full-width chrome-bordered row
───────────────────────────────────────────────────────────── */
function AnchorTierCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      id={tier.id}
      data-tier={tier.id}
      data-anchor="true"
      className="relative duality-border chrome-card p-7 md:p-9 lg:p-10"
    >
      <span
        className="absolute -top-2.5 left-7 px-3 py-1 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white"
        style={{ background: "var(--gradient-duality-edge)" }}
      >
        Concierge anchor · By application
      </span>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10 items-start">
        <div>
          <h3 className="text-display-md text-white tracking-tight">{tier.name}</h3>
          <div className="mt-2 mb-3">
            <span className="font-mono text-[2rem] leading-none font-semibold text-white">
              {tierPriceLabel(tier)}
            </span>
          </div>
          <DefenseBadge level={tier.aiDefense.level} />
          <p className="text-body-lg text-cloud mt-4 mb-2 max-w-2xl">
            {tier.positioning}
          </p>
          <p className="text-body-sm font-mono text-smoke italic mb-5">
            {tier.differentiator}
          </p>

          <ul className="flex flex-col gap-2 mb-2">
            {tier.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-2 text-body-md text-cloud"
              >
                <Check
                  size={15}
                  className="mt-1 shrink-0 text-electric"
                  aria-hidden
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <DefenseVectors features={tier.aiDefense.features} compact={false} />

          <Link
            href={tier.cta.href}
            className={cn(buttonStyles({ variant: "featured", size: "lg" }), "w-full")}
          >
            {tier.cta.label}
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shared sub-components
───────────────────────────────────────────────────────────── */
function DefenseBadge({ level }: { level: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full border border-electric/30 bg-electric/5">
      <Shield size={11} className="text-electric" aria-hidden />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-electric">
        AI Visibility Defense built-in · {level}
      </span>
    </div>
  );
}

function DefenseVectors({
  features,
  compact = true,
}: {
  features: readonly string[];
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-electric/20 bg-electric/5",
        compact ? "px-3 py-2.5" : "px-4 py-3.5",
      )}
    >
      <p
        className={cn(
          "font-mono uppercase tracking-[0.14em] text-electric mb-1.5",
          compact ? "text-[0.625rem]" : "text-[0.6875rem]",
        )}
      >
        AI Visibility Defense
      </p>
      <ul className="flex flex-col gap-1">
        {features.map((feat) => (
          <li
            key={feat}
            className={cn(
              "flex items-start gap-1.5 text-cloud leading-snug",
              compact ? "text-[0.75rem]" : "text-body-sm",
            )}
          >
            <span aria-hidden className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-electric" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
