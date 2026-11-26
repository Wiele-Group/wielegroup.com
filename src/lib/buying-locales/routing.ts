import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const buyingIndex = "/buying";
export const buyingUpdated = "2026-11-26";

export function buyingPath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + buyingIndex;
}

export function buyingLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === buyingIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === buyingIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const buyingAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, buyingPath(locale)]] : [])),
  "x-default": buyingIndex,
};
