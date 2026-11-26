import type { Metadata } from "next";
import { assetGuides } from "./asset-guides";
import { investmentReport } from "./investment-report";
import { mandateSummary } from "./mandateAgreement";
import { defaultOpenGraphImage, propertyBrand, propertyMetadata } from "./property";

export const SITE_URL = propertyBrand.url;
export const maltaReportDescription = "Malta investment property: revised 2025 results, 2026 prices, sales and financing context. Wiele research updated 2 November 2026; register for the report.";

const reportPage = propertyMetadata("Malta Investment Property Report 2026", maltaReportDescription, investmentReport.path);
const reportImage = { url: "/property/malta-report-social-20261126.jpg", width: 1200, height: 630, alt: "Wiele Investments Malta Investment Property Report, 2025 review and 2026 outlook" };

export const PAGE_METADATA = {
  about: propertyMetadata("About Our Hybrid Online Brokerage", "Wiele Investments is a Malta-based hybrid online brokerage for prime real estate, superyachts and collector automobiles, focused on bespoke marketing and strategy.", "/about"),
  classicCars: propertyMetadata(assetGuides["classic-cars"].title, assetGuides["classic-cars"].intro, "/luxury-assets/classic-cars"),
  maltaReport: {
    ...reportPage,
    openGraph: {
      ...reportPage.openGraph,
      type: "article",
      publishedTime: investmentReport.published,
      modifiedTime: investmentReport.updated,
      images: [reportImage, defaultOpenGraphImage],
    },
    twitter: { ...reportPage.twitter, images: [{ url: reportImage.url, alt: reportImage.alt }] },
  },
  listAsset: {
    ...propertyMetadata("Seller Onboarding & Marketing Retainer", "Malta-based Wiele Investments seller onboarding for property, yachts and classic cars. Review the asset marketing mandate, monthly retainer and buyer-introduction commission.", "/list-asset"),
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  },
  sellerRetainerTerms: propertyMetadata(mandateSummary.title, "Wiele Investments’ Malta asset marketing and brokerage mandate. Read all nine clauses, including the per-asset retainer, commission, cancellation and Schedule A.", mandateSummary.publicPath),
  privacy: propertyMetadata("Privacy Notice", "How Wiele Investments handles private enquiries, correspondence and website information. Updated 26 November 2026.", "/privacy"),
} satisfies Record<string, Metadata>;
