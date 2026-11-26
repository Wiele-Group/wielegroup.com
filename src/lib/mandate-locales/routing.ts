import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";


export const mandateIndex = "/private-mandates";
export const mandateUpdated = "2026-11-26";

export function mandatePath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + mandateIndex;
}

export function mandateLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === mandateIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === mandateIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const mandateAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, mandatePath(locale)]] : [])),
  "x-default": mandateIndex,
};
