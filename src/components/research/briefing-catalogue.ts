import { articles, articlesPath } from "@/lib/articles";
import { globalLuxuryReport, investmentReport } from "@/lib/investment-report";
import { propertyMarket } from "@/lib/property-market";
import { purchaseGuideUpdated } from "@/lib/purchase-guide-locales/routing";
import type { BriefingKey, Corridor, Desk } from "@/lib/research-locales/types";
import type { ResearchMediaKey } from "@/lib/researchMedia";

type Source = readonly [label: string, url: string];
type BriefingCopy = { copyKey: BriefingKey } | { copyKey?: undefined; fallback: { title: string; abstract: string } };

type Briefing = BriefingCopy & {
  id: string;
  href: string;
  desk: Desk;
  corridors: readonly Corridor[];
  date: string;
  minutes: number;
  media?: Exclude<ResearchMediaKey, "hero">;
  sources?: readonly Source[];
  report?: { pages: number; cutoff: string };
  localized?: true;
};

const allCorridors = ["uk", "europe", "southern-africa"] as const;
const countryGuideDate = "2026-11-15";

export const leadBriefing: Briefing = {
  id: globalLuxuryReport.id, copyKey: "global", href: globalLuxuryReport.path,
  desk: "estate", corridors: allCorridors, date: globalLuxuryReport.published, minutes: 5, media: "corridor",
  report: { pages: 27, cutoff: globalLuxuryReport.updated },
  sources: [
    ["Savills · World Cities Prime Residential Index", "https://www.savills.com/research_articles/255800/393831-0"],
    ["Savills · Europe, Middle East and Africa", "https://www.savills.com/research_articles/255800/393850-0"],
    ["Knight Frank · Prime London", "https://www.knightfrank.co.uk/research/article/2026/10/no-news-has-been-good-news-for-the-prime-london-market"],
  ],
};

export const otherBriefings: Briefing[] = [
  {
    id: investmentReport.id, copyKey: "malta", href: investmentReport.path, desk: "estate",
    corridors: ["europe"], date: investmentReport.published, minutes: 5,
    report: { pages: 16, cutoff: investmentReport.updated },
    sources: [
      ["Eurostat · House price index", propertyMarket.sources.annualPrices],
      ["NSO Malta · Residential property price index", propertyMarket.sources.prices],
      ["NSO Malta · Residential property transactions", propertyMarket.sources.transactions],
    ],
  },
  {
    id: "yacht-registry", copyKey: "yacht", href: "/purchase-guide/assets/yachts", desk: "yachts",
    corridors: allCorridors, date: countryGuideDate, minutes: 4,
    sources: [
      ["Transport Malta", "https://www.transport.gov.mt/landing_registration.asp?pageid=2011"],
      ["European Commission · Pleasure craft", "https://taxation-customs.ec.europa.eu/document/download/8c62e3be-807f-4607-bb1e-9ff46db7d97e_en?filename=Guidance_pleasure_craft.pdf"],
    ],
  },
  {
    id: "collector-provenance", copyKey: "collector", href: "/purchase-guide/assets/vehicles", desk: "automobiles",
    corridors: allCorridors, date: countryGuideDate, minutes: 4, media: "provenance",
    sources: [
      ["HMRC · Vehicle classification", "https://www.gov.uk/guidance/classifying-vehicles#collectors-vehicles"],
      ["EUR-Lex · Collector classification", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A61997CJ0259"],
      ["ITAC · Vehicle import permits", "https://itac.org.za/wp-content/uploads/amended-guidelines-for-importation-of-used-or-second-hand-vehicles_.pdf"],
    ],
  },
  {
    id: "cross-border-settlement", copyKey: "settlement", href: "/purchase-guide", desk: "governance",
    corridors: allCorridors, date: purchaseGuideUpdated, minutes: 6, localized: true,
  },
  ...articles.map((article): Briefing => ({
    id: article.slug,
    ...(article.slug === "malta-short-let-investment-2026"
      ? { copyKey: "shortLets" as const }
      : { fallback: { title: article.title, abstract: article.excerpt } }),
    href: `${articlesPath}/${article.slug}`,
    desk: "estate",
    corridors: ["europe"],
    date: article.date,
    minutes: article.readingMinutes,
  })),
];

export const briefings = [leadBriefing, ...otherBriefings];
