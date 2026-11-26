export const homeLanguages = {
  en: { path: "/", tag: "en-GB", og: "en_GB", name: "English" },
  de: { path: "/de", tag: "de-DE", og: "de_DE", name: "Deutsch" },
  fr: { path: "/fr", tag: "fr-FR", og: "fr_FR", name: "Français" },
  it: { path: "/it", tag: "it-IT", og: "it_IT", name: "Italiano" },
  es: { path: "/es", tag: "es-ES", og: "es_ES", name: "Español" },
} as const;

export type HomeLocale = keyof typeof homeLanguages;

export function isHomeLocale(value: string): value is HomeLocale {
  return Object.hasOwn(homeLanguages, value);
}

export function isHomePath(pathname: string) {
  return Object.values(homeLanguages).some(({ path }) => path === pathname);
}

export const homeAlternates = {
  ...Object.fromEntries(Object.values(homeLanguages).map(({ tag, path }) => [tag, path])),
  "x-default": "/",
};

export const homeUpdated = "2026-11-26";
