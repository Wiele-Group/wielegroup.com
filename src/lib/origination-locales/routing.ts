import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const originationIndex = "/origination-protocol";
export const originationUpdated = "2026-11-26";

export function originationPath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + originationIndex;
}

export function originationLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === originationIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === originationIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const originationAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, originationPath(locale)]] : [])),
  "x-default": originationIndex,
};
