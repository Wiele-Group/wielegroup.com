/**
 * Pricing tiers — directive §2 row 9 (binding).
 * Currency: GBP. Display: £.
 */

export type PricingTier = {
  id: string;
  name: string;
  /** Price line — formatted string, never inferred from cents. */
  price: string;
  /** Optional one-off add-on shown beneath the recurring price. */
  oneOff?: string;
  /** Short positioning sentence under the name. */
  positioning: string;
  /** 4–5 outcome bullets. */
  outcomes: readonly string[];
  cta: { label: string; href: string };
  /** Highlighted as the recommended tier. */
  featured?: boolean;
  /**
   * Stripe Payment Link URL — direct hosted Checkout for self-serve buy.
   * Created 2026-05-03 via Stripe MCP. UI may use this for a secondary
   * "Pay now" button or to replace the qualify-first CTA when ready.
   * Source of truth: memory/reference_stripe_state.md.
   */
  paymentLinkUrl?: string;
  /** Stripe Price ID — for future Checkout Session API integration. */
  stripePriceId?: string;
};

export const pricingTiers: readonly PricingTier[] = [
  {
    id: "signal-audit",
    name: "Signal Audit",
    price: "£2,500",
    oneOff: "+ Launch £1,500 / mo",
    positioning: "Diagnose your AI visibility before you commit to a system.",
    outcomes: [
      "Full Wiele OS V3 engine run across your prompt surface",
      "Mention strength + citation readiness scoring",
      "Authority gap report with prioritised actions",
      "30-day implementation roadmap",
      "1 strategy session with a Wiele principal",
    ],
    cta: { label: "Run a Growth Audit", href: "/audit" },
    paymentLinkUrl: "https://buy.stripe.com/4gMdR91JL0iieuK8FZao80k",
    stripePriceId: "price_1TT1tkGuLDs0qzh2S85rJ8Fp",
  },
  {
    id: "growth-system",
    name: "Growth System",
    price: "£4,000 / mo",
    positioning: "Compound AI visibility, citations, and search authority monthly.",
    outcomes: [
      "Continuous AI-visibility tracking across answer engines",
      "Monthly authority asset + comparison page production",
      "Schema, citation, and entity engineering",
      "Quarterly business review with attribution",
    ],
    cta: { label: "Book Strategy Call", href: "/contact" },
    featured: true,
    paymentLinkUrl: "https://buy.stripe.com/cNi5kDdst7KKfyOcWfao80m",
    stripePriceId: "price_1TT1tsGuLDs0qzh2No2y4ugT",
  },
  {
    id: "authority-engine",
    name: "Authority Engine",
    price: "£8,000 / mo",
    positioning: "Founder-led editorial systems for category-defining brands.",
    outcomes: [
      "Everything in Growth System",
      "Founder narrative + knowledge-graph engineering",
      "Editorial-grade thought leadership production",
      "Press, podcast, and digital-PR placements",
      "Weekly principal-level strategy",
    ],
    cta: { label: "Book Strategy Call", href: "/contact" },
    paymentLinkUrl: "https://buy.stripe.com/7sY7sL6012qqgCS6xRao80n",
    stripePriceId: "price_1TT1txGuLDs0qzh2dhusBcrd",
  },
  {
    id: "wiele-os",
    name: "Wiele OS",
    price: "£15,000+ / mo",
    positioning: "The integrated AI-growth platform run by a dedicated strategist team.",
    outcomes: [
      "All five Wiele systems on one engine",
      "Dedicated growth-systems team",
      "Custom platform configuration + private benchmarks",
      "Direct line to Wiele principals",
      "Enterprise security + governance",
    ],
    cta: { label: "Talk to Wiele", href: "/contact" },
    paymentLinkUrl: "https://buy.stripe.com/3cIdR94VX2qq2M28FZao80o",
    stripePriceId: "price_1TT1u0GuLDs0qzh2VQ5jAyZQ",
  },
];

/**
 * Standalone "Launch" tier (£1,500/mo) — currently bundled into Signal Audit
 * tier as a oneOff add-on. If/when promoted to its own tier card on /pricing:
 *   - Stripe Price ID: price_1TT1toGuLDs0qzh20rkjZeP3
 *   - Payment Link: https://buy.stripe.com/7sY8wPagh2qq2M24pJao80l
 */
