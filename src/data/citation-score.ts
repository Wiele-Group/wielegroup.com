/**
 * Citation Score™ subscription tiers — v3.9.4 (2026-05-14).
 *
 * Founder-approved via Directive v3.9.3 AMENDMENT A:
 *   docs/directives/v3-9-3-AMENDMENT-A-citation-score-approved-2026-05-14.md
 *
 * Three recurring AI Visibility SKUs (Starter / Pro / Authority) — the
 * subscription layer that productizes Wiele Citation Score™. These sit
 * ABOVE the existing one-off / project pricing ladder (`@/data/pricing`)
 * under the heading "Recurring AI Visibility" on /pricing.
 *
 * Currency: GBP. Cadence: monthly only. Minimum term: 3 months (Stage-5
 * Recommendation-History compounding loop needs the seeding window).
 *
 * CTAs route through /contact?tier=… for principal-mediated close until
 * 5 named-client case studies land; direct Checkout is deferred. Stripe
 * products + recurring GBP prices were created via MCP at deploy time:
 *   Starter   → prod_UVyMwHsUCKJhG4 · price_1TWwQBGuLDs0qzh2qDxsT6EE
 *   Pro       → prod_UVyMrlf2sWVsI7 · price_1TWwQEGuLDs0qzh2C8Uh8Lgx
 *   Authority → prod_UVyMIUmkOZbqTp · price_1TWwQIGuLDs0qzh2nmFZhqtg
 */

export type CitationScoreTierSlug = "starter" | "pro" | "authority";

export type CitationScoreTier = {
  slug: CitationScoreTierSlug;
  /** Full SKU name including the ™ symbol, e.g. "Citation Score™ Starter". */
  name: string;
  /** Monthly price in GBP, integer. Formatted at render. */
  priceGbp: number;
  /** Tier badge label, e.g. "Starter" / "Pro" / "Authority". */
  badgeLabel: string;
  /** Verbatim inclusions list — copy-locked by founder per AMENDMENT A. */
  inclusions: readonly string[];
  /** Page CTA destination — principal-mediated until direct Checkout phase. */
  ctaHref: string;
  /** Schema.org Service.serviceType. */
  schemaServiceType: string;
  /** One-sentence Schema.org Service.description. */
  schemaDescription: string;
  /** Marks the visually-highlighted middle tier (founder-recommended). */
  featured?: boolean;
};

export const citationScoreTiers: readonly CitationScoreTier[] = [
  {
    slug: "starter",
    name: "Citation Score™ Starter",
    priceGbp: 2000,
    badgeLabel: "Starter",
    inclusions: [
      "1 brand tracked",
      "Up to 3 named competitors",
      "5 answer engines: ChatGPT · Perplexity · Google AI Overviews · Gemini · Copilot",
      "Monthly engine run",
      "Quarterly Citation Brief written for your domain (you publish on your site)",
      "Self-serve Citation Score™ dashboard",
    ],
    ctaHref: "/contact?tier=starter",
    schemaServiceType: "AI Citation Monitoring Subscription",
    schemaDescription:
      "Monthly AI citation tracking across 5 answer engines for 1 brand and 3 competitors, with a quarterly Citation Brief written for your domain and a self-serve Citation Score™ dashboard.",
  },
  {
    slug: "pro",
    name: "Citation Score™ Pro",
    priceGbp: 4000,
    badgeLabel: "Pro",
    inclusions: [
      "1 brand tracked",
      "Up to 6 named competitors",
      "8 answer engines: all Starter engines + Claude · Grok · You.com",
      "Weekly engine run",
      "Quarterly Citation Brief co-published on wielegroup.com (your brand inherits Wiele's domain authority)",
      "Quarterly principal QBR call",
    ],
    ctaHref: "/contact?tier=pro",
    schemaServiceType: "AI Citation Monitoring Subscription",
    schemaDescription:
      "Weekly AI citation tracking across 8 answer engines for 1 brand and 6 competitors, with a quarterly Citation Brief co-published on wielegroup.com and a quarterly principal QBR call.",
    featured: true,
  },
  {
    slug: "authority",
    name: "Citation Score™ Authority",
    priceGbp: 6000,
    badgeLabel: "Authority",
    inclusions: [
      "1 brand tracked",
      "Up to 10 named competitors",
      "All 10 answer engines: all Pro engines + Brave Search · DeepSeek",
      "Weekly engine run",
      "Monthly Citation Brief co-published on wielegroup.com (12 per year — deepest authority compounding)",
      "Monthly principal session",
      "Founder voice writing assist",
    ],
    ctaHref: "/contact?tier=authority",
    schemaServiceType: "AI Citation Monitoring Subscription",
    schemaDescription:
      "Weekly AI citation tracking across all 10 answer engines for 1 brand and 10 competitors, with a monthly Citation Brief co-published on wielegroup.com, monthly principal sessions, and founder voice writing assist.",
  },
];

/** Format a Citation Score™ tier price — always GBP, always /mo. */
export function formatCitationScorePrice(priceGbp: number): string {
  return `£${priceGbp.toLocaleString("en-GB")} / mo`;
}
