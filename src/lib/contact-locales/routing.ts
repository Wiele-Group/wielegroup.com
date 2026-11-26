import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const contactIndex = "/contact";
export const contactUpdated = "2026-11-26";

export function contactPath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + contactIndex;
}

export function contactLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === contactIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === contactIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const contactAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, contactPath(locale)]] : [])),
  "x-default": contactIndex,
};
