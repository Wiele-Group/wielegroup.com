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
    cta: { label: "Run AI Visibility Audit", href: "/audit" },
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
  },
];
