import type { Metadata } from "next";
import { homeSocialFallback } from "./homeMedia";
import { homeCopy } from "./home-locales";
import { homeAlternates, homeLanguages, type HomeLocale } from "./home-locales/routing";
import { propertyBrand } from "./property";

export function homeMetadata(locale: HomeLocale): Metadata {
  const copy = homeCopy[locale];
  const { path, og } = homeLanguages[locale];
  const title = `${copy.title} | ${propertyBrand.name}`;
  const preview = { url: homeSocialFallback, width: 1200, height: 630, alt: copy.socialAlt };
  return {
    title: { absolute: title },
    description: copy.description,
    alternates: { canonical: path, languages: homeAlternates },
    openGraph: {
      type: "website", url: path, locale: og, siteName: propertyBrand.name,
      alternateLocale: Object.values(homeLanguages).map(language => language.og).filter(tag => tag !== og),
      title, description: copy.description, images: [preview],
    },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [preview] },
  };
}
