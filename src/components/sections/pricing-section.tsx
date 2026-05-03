import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { pricingTiers } from "@/data/pricing";
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

export function PricingSection({ showHeading = true }: PricingSectionProps = {}) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        {showHeading ? (
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Pricing
            </p>
            <h2 className="text-display-lg text-white text-balance">
              Start with a Signal Audit. Scale into the system.
            </h2>
            <p className="text-body-lg text-silver mt-5">
              Diagnose first, commit second. Every engagement starts with the
              audit; from there, you choose the velocity.
            </p>
          </div>
        ) : null}

        <Reveal
          stagger={0.06}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {pricingTiers.map((tier) => (
            <article
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-[var(--radius-lg)] border p-6 md:p-7",
                "bg-[var(--color-surface-elevated)]",
                tier.featured
                  ? "border-electric shadow-[var(--shadow-glow-electric)]"
                  : "border-[var(--color-border-default)]",
              )}
            >
              {tier.featured ? (
                <Badge
                  variant="electric"
                  size="sm"
                  className="absolute -top-2 left-6"
                >
                  Most chosen
                </Badge>
              ) : null}
              <h3 className="text-heading-md text-white">{tier.name}</h3>
              <div className="mt-3 mb-1">
                <span className="font-mono text-[1.75rem] leading-none font-semibold text-white">
                  {tier.price}
                </span>
              </div>
              {tier.oneOff ? (
                <p className="text-body-xs font-mono text-smoke mb-4">
                  {tier.oneOff}
                </p>
              ) : (
                <div className="mb-4" />
              )}
              <p className="text-body-sm text-silver mb-5">{tier.positioning}</p>

              <ul className="flex flex-col gap-2 mb-6">
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

              <div className="mt-auto flex flex-col gap-2.5">
                <Link
                  href={tier.cta.href}
                  className={cn(
                    buttonStyles({
                      variant: tier.featured ? "primary" : "ghost",
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
                    className="text-center text-body-xs font-mono uppercase tracking-[0.12em] text-smoke hover:text-electric transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:text-electric"
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
