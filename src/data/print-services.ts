/**
 * Print Production services — standalone offerings.
 * Authority: project_print_services_addition_2026_05_10.md (founder spec
 * 2026-05-10) + CLAUDE_CODE_DIRECTIVE_WEBSITE_UPDATE_v3.9.0_2026-05-10.md.
 *
 * Lives at /services/print-production. Embedded versions appear in
 * Brand Management Agency Brand Growth tier (£3,750/mo) — monthly
 * business cards + branded collateral production included.
 *
 * v3.9.0 (2026-05-11) — competitive UK 2026 startup pricing.
 */

export type PrintService = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  positioning: string;
  details: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const printServices: readonly PrintService[] = [
  {
    id: "business-cards-premium",
    name: "Business Cards",
    price: "£180",
    cadence: "one-off · 500 cards · UK delivery",
    positioning: "Premium business cards on quality stock. The card people keep.",
    details: [
      "500 cards · double-sided · premium 350gsm stock",
      "Letterpress or digital finish · UK manufacture",
      "Bespoke design (one round of revisions)",
      "UK delivery included · 2-week turnaround",
    ],
    cta: { label: "Order business cards", href: "/contact?intent=print&service=business-cards" },
    featured: true,
  },
  {
    id: "stationery-suite",
    name: "Stationery Suite",
    price: "£450",
    cadence: "one-off · UK delivery",
    positioning: "Complete branded stationery system — cards, letterhead, envelopes, compliments slips.",
    details: [
      "500 business cards + 250 letterheads + 250 envelopes + 250 compliments slips",
      "Coordinated stock + finishes",
      "Bespoke design across full suite",
      "UK manufacture + delivery · 3-week turnaround",
    ],
    cta: { label: "Order suite", href: "/contact?intent=print&service=stationery-suite" },
  },
  {
    id: "brand-book-print",
    name: "Brand Book Print Run",
    price: "£950",
    cadence: "one-off · 50 copies",
    positioning: "Bound brand book — for internal teams, partners, and prospect leave-behinds.",
    details: [
      "50 copies · A4 portrait · perfect-bound or saddle-stitched",
      "Premium uncoated stock · up to 48 pages",
      "Design conversion from existing brand guidelines",
      "UK manufacture · 4-week turnaround",
      "Re-orders at scale: POA",
    ],
    cta: { label: "Print brand books", href: "/contact?intent=print&service=brand-book" },
  },
  {
    id: "direct-mail-campaign",
    name: "Direct Mail Campaign",
    price: "POA",
    cadence: "per campaign · 1000+ pieces",
    positioning: "Premium direct mail design + production + dispatch. For high-value B2B targeting.",
    details: [
      "Bespoke design (envelope + insert + response mechanism)",
      "Premium stock + finishes · UK manufacture",
      "Variable data printing (personalisation) supported",
      "Dispatch + fulfilment included",
      "Tracking + response measurement included",
    ],
    cta: { label: "Scope a campaign", href: "/contact?intent=print&service=direct-mail" },
  },
  {
    id: "packaging-production",
    name: "Premium Packaging Design + Print",
    price: "POA",
    cadence: "fixed scope · per project",
    positioning: "Luxury packaging design + production. Boxes, sleeves, branded enclosures.",
    details: [
      "Concept → structural design → production",
      "Specialty finishes: foil, emboss, deboss, soft-touch laminate",
      "UK manufacture · premium materials",
      "Small batches (50+) through to commercial runs",
      "Photography of final asset included",
    ],
    cta: { label: "Scope packaging", href: "/contact?intent=print&service=packaging" },
  },
  {
    id: "large-format-ooh",
    name: "Large Format · OOH · Signage",
    price: "POA",
    cadence: "per project",
    positioning: "Out-of-home, signage, exhibition graphics. Premium production at scale.",
    details: [
      "Billboards, posters, banners, exhibition stands",
      "Signage: interior + exterior · permanent + temporary",
      "Production-grade artwork delivery",
      "UK installation network · POA",
    ],
    cta: { label: "Scope production", href: "/contact?intent=print&service=large-format" },
  },
];

export type PrintFaq = { id: string; question: string; answer: string };

export const printFaqs: readonly PrintFaq[] = [
  {
    id: "international-delivery",
    question: "Do you handle international delivery?",
    answer:
      "Yes. UK-based manufacture with international shipping via courier partners. Quote per region — typically 5-10 working days outside the UK.",
  },
  {
    id: "own-design",
    question: "Can we bring our own design?",
    answer:
      "Yes. We'll quote production-only or design-plus-production. Production-only requires print-ready artwork meeting our supplied specifications.",
  },
  {
    id: "lead-time",
    question: "What's the lead time?",
    answer:
      "Business cards 2 weeks. Stationery suites 3 weeks. Brand book print runs 4 weeks. Custom packaging and direct mail vary — typically 4-8 weeks end-to-end. Rush capacity available at premium.",
  },
  {
    id: "print-retainer",
    question: "Do you offer ongoing print retainers?",
    answer:
      "Yes. Embedded in the Brand Growth tier (£3,750/mo) of the Brand Management Agency — monthly business cards plus branded collateral production included. Larger print volumes can be scoped as a quarterly retainer.",
  },
  {
    id: "sustainability",
    question: "What about sustainability?",
    answer:
      "All UK partners are FSC-certified. Recycled stock options available across every product. Vegetable-based inks standard.",
  },
];
