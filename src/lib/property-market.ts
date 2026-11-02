// Observation dates and publication dates are separate. Evidence is retained in docs/research-2026-11-02.
export const propertyMarket = {
  reviewed: "2026-11-02",
  reviewedLabel: "2 November 2026",
  sources: {
    prices: "https://nso.gov.mt/residential-property-price-index-rppi-q2-2026/",
    transactions: "https://nso.gov.mt/residential-property-transactions-september-2026/",
    permits: "https://nso.gov.mt/residential-building-permits-q2-2026/",
    annualPrices: "https://ec.europa.eu/eurostat/databrowser/view/prc_hpi_a/default/table?lang=en",
    policy: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html",
    octoberDecision: "https://www.centralbankmalta.org/en/news/14/2026/11420",
    economy: "https://www.centralbankmalta.org/site/Publications/Economic-Update/2026/Update-10-26.pdf",
    europe: "https://www.savills.com/research_articles/254204/394882-0/market-in-minutes--european-investment-nowcast---q3-2026-preliminary-results",
  },
  indicators: [
    { value: "6.0%", label: "Annual-average house-price growth", period: "2025 compared with 2024", note: "National nominal index; an individual property can perform differently.", source: "annualPrices", publisher: "Eurostat · 1 October 2026 vintage" },
    { value: "6.9%", label: "Quarterly annual house-price growth", period: "Q2 2026 compared with Q2 2025", note: "Transaction-based national index, rather than asking prices or rental returns.", source: "prices", publisher: "NSO · 1 October 2026" },
    { value: "974", label: "Registered final deeds", period: "September 2026 · down 11.5% year on year", note: "Registration count; a deed may include more than one property.", source: "transactions", publisher: "NSO · 9 October 2026" },
    { value: "2.50%", label: "ECB deposit facility rate", period: "Effective 16 September 2026; held 29 October", note: "Euro-area policy rate. A Maltese mortgage quotation has its own terms and fees.", source: "policy", publisher: "ECB · current policy-rate table" },
    { value: "3,126", label: "New dwellings approved", period: "Q2 2026 · up 3.3% year on year", note: "A development pipeline measure; approvals are not completed or occupied homes.", source: "permits", publisher: "NSO · 20 August 2026" },
    { value: "13,351", label: "Final deeds in the 2025 review", period: "Full year 2025 · up 5.98% on 2024", note: "Calculated from the retained October workbook; replaces the original January total. Fresh download blocked on review.", source: "transactions", publisher: "NSO · 9 October 2026 workbook" },
  ],
} as const;
