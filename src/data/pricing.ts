/**
 * Pricing tiers — v3.0 (2026-05-06).
 * 6-tier ladder + AI Visibility Defense baked into every paid tier.
 * Currency: GBP. Display: £.
 *
 * AI Defense vectors (scaled by tier depth):
 *   1. Prompt-injection surface monitoring
 *   2. AI crawler access posture
 *   3. Competitor displacement risk model
 *
 * Authority: DIRECTIVE_2026-05-06_v3-pricing-overhaul-and-ai-defense-bakein.md
 */

export type AiDefenseLevel =
  | "baseline"
  | "monitored"
  | "active"
  | "embedded"
  | "real-time";

export type PricingTier = {
  id: string;
  name: string;
  /** Numeric price — formatted at render time. */
  price: number;
  /** Display "from £X" prefix (Sovereign anchor). */
  priceFrom?: boolean;
  cadence: "one-off" | "/month";
  /** Short positioning sentence under the name. */
  positioning: string;
  /** Tier-unique mechanic — e.g. "14-day Pro reverse-trial". */
  differentiator: string;
  /** AI Visibility Defense vectors at this tier's depth. */
  aiDefense: {
    level: AiDefenseLevel;
    features: readonly string[];
  };
  /** 3–5 outcome bullets. */
  outcomes: readonly string[];
  cta: { label: string; href: string };
  /** M-tier sales target — featured visual treatment. */
  featured?: boolean;
  /** Concierge anchor — chrome-bordered, top-row treatment. */
  anchor?: boolean;
  /** Stripe Payment Link — direct hosted Checkout. */
  paymentLinkUrl: string;
  /** Stripe Price ID — for Checkout Session API integration. */
  stripePriceId: string;
};

export const pricingTiers: readonly PricingTier[] = [
  {
    id: "signal-audit",
    name: "Signal Audit",
    price: 2500,
    cadence: "one-off",
    positioning: "Diagnose your AI visibility before you commit to a system.",
    differentiator: "Diagnostic entry — productized one-off",
    aiDefense: {
      level: "baseline",
      features: [
        "Prompt-injection surface map",
        "AI crawler posture audit",
        "Displacement risk snapshot",
      ],
    },
    outcomes: [
      "Full Wiele OS V3 engine run",
      "Prompt-injection surface map + AI crawler posture audit",
      "Displacement risk snapshot across top queries",
      "Authority gap report + 30-day roadmap",
      "Strategy session with a Wiele principal",
    ],
    cta: { label: "Run a Growth Audit", href: "/audit" },
    // v3.9.6 (2026-05-14): contact-first per project memory open loop
    // ("Stripe direct checkout (flip when 5 case studies close)"). The 5
    // buy.stripe.com payment links were deactivated in Stripe during the
    // v3.x dashboard lockdown — leaving them rendered as "Or pay now"
    // links would route Monday-outreach prospects to a dead Stripe page.
    // Blanking the field hides the secondary CTA (component already guards
    // on truthy paymentLinkUrl). Flip back to a live URL when ready to
    // open direct checkout.
    paymentLinkUrl: "",
    stripePriceId: "price_1TT1tkGuLDs0qzh2S85rJ8Fp",
  },
  {
    id: "launch",
    name: "Launch",
    price: 1950,
    cadence: "/month",
    positioning: "Establish your AI Visibility Defense baseline.",
    differentiator: "14-day Pro reverse-trial",
    aiDefense: {
      level: "baseline",
      features: [
        "Annual prompt-injection surface scan",
        "AI crawler access posture monitoring",
        "Quarterly displacement risk report",
      ],
    },
    outcomes: [
      "AI Visibility Defense baseline established",
      "Annual prompt-injection surface scan",
      "AI crawler access posture monitoring",
      "Quarterly displacement risk report",
      "14-day reverse-trial of Pro features",
    ],
    cta: { label: "Start with Launch", href: "/contact?tier=launch" },
    paymentLinkUrl: "", // v3.9.6 — see Signal Audit tier comment above.
    stripePriceId: "price_1TTrrVGuLDs0qzh2MZGJWbT1",
  },
  {
    id: "growth-system",
    name: "Growth System",
    price: 4500,
    cadence: "/month",
    positioning: "Defended visibility on the buyer-intent queries that matter.",
    differentiator: "AI usage credits + cross-engine citation tracking",
    aiDefense: {
      level: "monitored",
      features: [
        "Quarterly prompt-injection surface scan",
        "Monthly AI crawler posture review",
        "Monthly displacement risk model",
      ],
    },
    outcomes: [
      "Defended visibility on top 50 buyer-intent queries",
      "Cross-engine citation tracking (ChatGPT · Perplexity · Gemini · Claude)",
      "Monthly authority asset + comparison page production",
      "Schema, citation, and entity engineering",
      "Quarterly business review with attribution",
    ],
    cta: { label: "Book Strategy Call", href: "/contact?tier=growth-system" },
    featured: true,
    paymentLinkUrl: "", // v3.9.6 — see Signal Audit tier comment above.
    stripePriceId: "price_1TTrrZGuLDs0qzh28535esBR",
  },
  {
    id: "authority-engine",
    name: "Authority Engine",
    price: 8500,
    cadence: "/month",
    positioning:
      "AI citation share that grows quarter on quarter — with a guarantee.",
    differentiator: "AI citation guarantee (outcome-based)",
    aiDefense: {
      level: "active",
      features: [
        "Monthly prompt-injection surface remediation",
        "Continuous AI crawler posture management",
        "Weekly displacement risk + counter-displacement plays",
      ],
    },
    outcomes: [
      "Measurable AI citation share growth quarter-over-quarter",
      "Everything in Growth System",
      "Founder narrative + knowledge-graph engineering",
      "Editorial-grade thought leadership + digital PR",
      "Weekly principal-level strategy",
    ],
    cta: {
      label: "Book Strategy Call",
      href: "/contact?tier=authority-engine",
    },
    paymentLinkUrl: "", // v3.9.6 — see Signal Audit tier comment above.
    stripePriceId: "price_1TTrrcGuLDs0qzh2NOjlxs9x",
  },
  {
    id: "wiele-os",
    name: "Wiele OS",
    price: 15000,
    cadence: "/month",
    positioning:
      "An embedded Wiele team across every growth lever — with defense in every layer.",
    differentiator: "Embedded Wiele team across SEO / GEO / Brand / Web / Ads",
    aiDefense: {
      level: "embedded",
      features: [
        "Continuous prompt-injection defense",
        "Embedded AI crawler posture team",
        "Real-time displacement counter-engineering",
      ],
    },
    outcomes: [
      "Category-defining AI citation dominance + revenue compounding",
      "All five Wiele systems on one engine",
      "Dedicated growth-systems team",
      "Custom platform configuration + private benchmarks",
      "Direct line to Wiele principals",
    ],
    cta: { label: "Talk to Wiele", href: "/contact?tier=wiele-os" },
    paymentLinkUrl: "", // v3.9.6 — see Signal Audit tier comment above.
    stripePriceId: "price_1TT1u0GuLDs0qzh2VQ5jAyZQ",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: 45000,
    priceFrom: true,
    cadence: "/month",
    positioning:
      "Founder-led strategy. Dedicated team. AI engines that default to your authority.",
    differentiator: "Founder-led strategy + dedicated team + bespoke",
    aiDefense: {
      level: "real-time",
      features: [
        "Real-time AI defense across owned + earned surfaces",
        "Dedicated AI defender team",
        "Adversarial competitor red-team monthly",
      ],
    },
    outcomes: [
      "Sovereign brand status: AI engines default to your authority",
      "Real-time AI defense across owned + earned surfaces",
      "Dedicated AI defender team",
      "Adversarial competitor red-team monthly",
      "Founder-level strategic counsel",
    ],
    cta: {
      label: "Book Sovereign Discovery Call",
      href: "/contact?tier=sovereign",
    },
    anchor: true,
    paymentLinkUrl: "", // v3.9.6 — Sovereign was always contact-only; the buy.stripe.com Sovereign payment link existed in Stripe but was never wired to the UI (AnchorTierCard doesn't render this field). Blanking for consistency across the ladder.
    stripePriceId: "price_1TTrs0GuLDs0qzh2y4POM9Sq",
  },
];

/**
 * Format a tier price for display.
 *   formatTierPrice(1950, "/month")             → "£1,950 / mo"
 *   formatTierPrice(2500, "one-off")            → "£2,500"
 *   formatTierPrice(45000, "/month", true)      → "From £45,000 / mo"
 */
export function formatTierPrice(
  price: number,
  cadence: PricingTier["cadence"],
  priceFrom = false,
): string {
  const num = price.toLocaleString("en-GB");
  const suffix = cadence === "/month" ? " / mo" : "";
  return `${priceFrom ? "From " : ""}£${num}${suffix}`;
}

/** Convenience for tier objects. */
export function tierPriceLabel(tier: PricingTier): string {
  return formatTierPrice(tier.price, tier.cadence, tier.priceFrom);
}

/** Schema.org Offer.price string — e.g. "1950.00". */
export function tierSchemaPrice(tier: PricingTier): string {
  return tier.price.toFixed(2);
}
