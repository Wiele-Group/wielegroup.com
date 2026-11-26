import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const valuationsIndex = "/valuations";
export const valuationsUpdated = "2026-11-26";

export function valuationsPath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + valuationsIndex;
}

export function valuationsLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === valuationsIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === valuationsIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const valuationsAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, valuationsPath(locale)]] : [])),
  "x-default": valuationsIndex,
};
