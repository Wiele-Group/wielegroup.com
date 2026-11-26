import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

export const luxuryAssetsIndex = "/luxury-assets";
export const luxuryAssetsUpdated = "2026-11-26";

export function luxuryAssetsPath(locale: HomeLocale) {
  return (locale === "en" ? "" : homeLanguages[locale].path) + luxuryAssetsIndex;
}

export function luxuryAssetsLocaleForPath(pathname: string): HomeLocale | undefined {
  if (pathname === luxuryAssetsIndex) return "en";
  const [, locale, route, extra] = pathname.split("/");
  if (!extra && route === luxuryAssetsIndex.slice(1) && isHomeLocale(locale) && locale !== "en") return locale;
}

export const luxuryAssetsAlternates = {
  ...Object.fromEntries(Object.entries(homeLanguages).flatMap(([locale, { tag }]) =>
    isHomeLocale(locale) ? [[tag, luxuryAssetsPath(locale)]] : [])),
  "x-default": luxuryAssetsIndex,
};
