import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const sellingIndex = "/selling";
export const sellingUpdated = "2026-11-26";

export function sellingPath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + sellingIndex;
}

export function sellingLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === sellingIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === sellingIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const sellingAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, sellingPath(locale)]] : [])),
  "x-default": sellingIndex,
};
