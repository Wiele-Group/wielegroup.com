import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const researchIndex = "/research";
export const researchUpdated = "2026-11-26";

export function researchPath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + researchIndex;
}

export function researchLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === researchIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === researchIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const researchAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, researchPath(locale)]] : [])),
  "x-default": researchIndex,
};
