import { homeLanguages, isHomeLocale, type HomeLocale } from "@/lib/home-locales/routing";

const localizedRoutes = [
  "/", "/private-mandates", "/origination-protocol", "/valuations", "/contact", "/buying", "/selling",
  "/luxury-assets", "/purchase-guide", "/research",
] as const;

const navigationLabels = {
  en: ["Private Mandates", "Origination", "Valuations", "The Firm", "Client Desk", "Menu", "Close", "Main navigation"],
  de: ["Private Mandate", "Käuferansprache", "Bewertungen", "Das Haus", "Kundenservice", "Menü", "Schließen", "Hauptnavigation"],
  fr: ["Mandats privés", "Origination", "Évaluations", "La Maison", "Service clients", "Menu", "Fermer", "Navigation principale"],
  it: ["Mandati privati", "Origination", "Valutazioni", "La società", "Servizio clienti", "Menu", "Chiudi", "Navigazione principale"],
  es: ["Mandatos privados", "Originación", "Valoraciones", "La firma", "Atención al cliente", "Menú", "Cerrar", "Navegación principal"],
} as const;

const primaryPaths = ["/private-mandates", "/origination-protocol", "/valuations", "/about", "/contact"] as const;

export function siteLocale(pathname: string): HomeLocale | undefined {
  const [, prefix, segment, extra] = pathname.split("/");
  if (prefix && prefix !== "en" && isHomeLocale(prefix) && extra === undefined &&
      localizedRoutes.some(path => path === (segment ? `/${segment}` : "/"))) return prefix;
  return localizedRoutes.some(path => path === pathname) ? "en" : undefined;
}

export function sitePath(path: string, locale: HomeLocale) {
  if (locale === "en" || !localizedRoutes.some(route => route === path)) return path;
  return path === "/" ? homeLanguages[locale].path : homeLanguages[locale].path + path;
}

export function navigationFor(locale: HomeLocale) {
  const labels = navigationLabels[locale];
  return {
    items: primaryPaths.map((path, index) => ({ href: sitePath(path, locale), label: labels[index], key: path })),
    open: labels[5], close: labels[6], label: labels[7],
  };
}
