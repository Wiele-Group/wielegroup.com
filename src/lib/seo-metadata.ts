import type { Metadata } from "next";
import { assetGuides } from "./asset-guides";
import { investmentReport } from "./investment-report";
import { mandateSummary } from "./mandateAgreement";
import { defaultOpenGraphImage, propertyBrand, propertyMetadata } from "./property";

export const SITE_URL = propertyBrand.url;
export const valuationsDescription = "Compare indicative landed costs and seller proceeds for property, yachts and classic cars in the UK, Europe and South Africa. Prepare a brief or convert currencies.";
export const researchDescription = "Malta-based Wiele Investments research on property, yachts and classic cars. Read dated observations and register for the global luxury and Malta property reports.";
export const maltaReportDescription = "Malta investment property: revised 2025 results, 2026 prices, sales and financing context. Wiele research updated 2 November 2026; register for the report.";
export const luxuryAssetsTitle = "Yachts & Classic Cars";
export const luxuryAssetsDescription = "Wiele Investments coordinates private yacht and classic-car mandates from Malta. Explore open fictional dossiers and cross-border flag, customs and VAT considerations.";

const reportPage = propertyMetadata("Malta Investment Property Report 2026", maltaReportDescription, investmentReport.path);
const reportImage = { url: "/property/report-research-20261102-social.jpg", width: 1200, height: 630, alt: "Wiele Investments Malta Investment Property Report, 2025 review and 2026 outlook" };

export const PAGE_METADATA = {
  home: propertyMetadata("Global Luxury Asset Brokerage", propertyBrand.description, "/"),
  about: propertyMetadata("Our Global Asset Brokerage", "Malta-based asset brokerage with South African roots. Meet Wiele Investments and discover The Wiele Algorithm for buyers and sellers.", "/about"),
  luxuryAssets: propertyMetadata(luxuryAssetsTitle, luxuryAssetsDescription, "/luxury-assets"),
  classicCars: propertyMetadata(assetGuides["classic-cars"].title, assetGuides["classic-cars"].intro, "/luxury-assets/classic-cars"),
  valuations: propertyMetadata("Asset Valuations, Landed Costs & Seller Proceeds", valuationsDescription, "/valuations"),
  research: propertyMetadata("Market Research & Property Reports", researchDescription, "/research"),
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
  contact: propertyMetadata("Property & Luxury Asset Enquiries", "Contact Jonathan Landman in Swieqi, Malta, about property, yachts or classic cars in the UK, Europe and South Africa. English and Afrikaans by appointment.", "/contact"),
  privacy: propertyMetadata("Privacy Notice", "How Wiele Investments handles international property enquiries and website information.", "/privacy"),
} satisfies Record<string, Metadata>;
