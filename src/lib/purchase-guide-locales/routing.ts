import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const purchaseGuideIndex = "/purchase-guide";
export const purchaseGuideUpdated = "2026-11-26";

export function purchaseGuidePath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + purchaseGuideIndex;
}

export function purchaseGuideLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === purchaseGuideIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === purchaseGuideIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const purchaseGuideAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, purchaseGuidePath(locale)]] : [])),
  "x-default": purchaseGuideIndex,
};
