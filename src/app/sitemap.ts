import type { MetadataRoute } from "next";
import { MANDATE_EFFECTIVE_DATE } from "@/lib/mandateAgreement";
import jurisdictions from "@/data/purchase-jurisdictions.json";
import assets from "@/data/purchase-assets.json";
import { homeAlternates, homeLanguages, homeUpdated, type HomeLocale } from "@/lib/home-locales/routing";
import { buyingAlternates, buyingPath, buyingUpdated } from "@/lib/buying-locales/routing";
import { sellingAlternates, sellingPath, sellingUpdated } from "@/lib/selling-locales/routing";
import { luxuryAssetsAlternates, luxuryAssetsPath, luxuryAssetsUpdated } from "@/lib/luxury-assets-locales/routing";
import { originationAlternates, originationPath, originationUpdated } from "@/lib/origination-locales/routing";
import { contactAlternates, contactPath, contactUpdated } from "@/lib/contact-locales/routing";
import { valuationsAlternates, valuationsPath, valuationsUpdated } from "@/lib/valuation-locales/routing";
import { researchAlternates, researchPath, researchUpdated } from "@/lib/research-locales/routing";
import { purchaseGuideAlternates, purchaseGuidePath, purchaseGuideUpdated } from "@/lib/purchase-guide-locales/routing";
import { mandatePath, mandateAlternates, mandateUpdated } from "@/lib/mandate-locales/routing";
import { propertyBrand } from "@/lib/property";
export default function sitemap(): MetadataRoute.Sitemap {
 const homeEntries: MetadataRoute.Sitemap = Object.values(homeLanguages).map(({ path }) => ({
  url: propertyBrand.url + path,
  lastModified: homeUpdated,
  changeFrequency: "monthly",
  priority: path === "/" ? 1 : 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(homeAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const otherEntries: MetadataRoute.Sitemap = ["/luxury-assets/yachts", "/luxury-assets/classic-cars", "/research/global-luxury-property-report-2026", "/investor-onboarding", "/seller-enquiry", "/property-maintenance", "/legal-compliance", "/legal-compliance/cross-border", "/asset-taxonomy", "/malta-investment-report", "/articles", "/articles/malta-short-let-investment-2026", "/about", "/privacy", "/terms", "/terms/seller-retainer", "/credits", ...jurisdictions.map(j => `/purchase-guide/${j.slug}`), ...assets.map(a => `/purchase-guide/assets/${a.slug}`)].map(path => ({ url: propertyBrand.url + path, lastModified: ["/about", "/privacy", "/investor-onboarding", "/property-maintenance"].includes(path) ? "2026-11-26" : ["/malta-investment-report", "/seller-enquiry"].includes(path) ? "2026-11-25" : ["/terms", "/terms/seller-retainer"].includes(path) ? MANDATE_EFFECTIVE_DATE : ["/credits", "/legal-compliance", "/legal-compliance/cross-border", "/asset-taxonomy", "/luxury-assets/yachts", "/luxury-assets/classic-cars"].includes(path) ? "2026-11-21" : path.startsWith("/purchase-guide") ? "2026-11-18" : "2026-11-16", changeFrequency: "monthly", priority: 0.7 }));
 const mandateEntries: MetadataRoute.Sitemap = (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + mandatePath(locale), lastModified: mandateUpdated, changeFrequency: "weekly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(mandateAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const buyingEntries: MetadataRoute.Sitemap = (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + buyingPath(locale), lastModified: buyingUpdated, changeFrequency: "monthly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(buyingAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const sellingEntries: MetadataRoute.Sitemap = (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + sellingPath(locale), lastModified: sellingUpdated, changeFrequency: "monthly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(sellingAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const deskEntries: MetadataRoute.Sitemap = (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + luxuryAssetsPath(locale), lastModified: luxuryAssetsUpdated, changeFrequency: "monthly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(luxuryAssetsAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const purchaseGuideEntries: MetadataRoute.Sitemap = (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + purchaseGuidePath(locale), lastModified: purchaseGuideUpdated, changeFrequency: "monthly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(purchaseGuideAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const researchEntries: MetadataRoute.Sitemap = (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + researchPath(locale), lastModified: researchUpdated, changeFrequency: "monthly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(researchAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const valuationEntries: MetadataRoute.Sitemap = (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + valuationsPath(locale), lastModified: valuationsUpdated, changeFrequency: "monthly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(valuationsAlternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 }));
 const deskProtocolEntries: MetadataRoute.Sitemap = ([
  { path: originationPath, updated: originationUpdated, alternates: originationAlternates },
  { path: contactPath, updated: contactUpdated, alternates: contactAlternates },
 ]).flatMap(route => (Object.keys(homeLanguages) as HomeLocale[]).map(locale => ({
  url: propertyBrand.url + route.path(locale), lastModified: route.updated, changeFrequency: "monthly", priority: 0.7,
  alternates: { languages: Object.fromEntries(Object.entries(route.alternates).map(([language, target]) => [language, propertyBrand.url + target])) },
 })));
 return [...homeEntries, ...mandateEntries, ...buyingEntries, ...sellingEntries, ...deskEntries, ...purchaseGuideEntries, ...researchEntries, ...valuationEntries, ...deskProtocolEntries, ...otherEntries];
}
