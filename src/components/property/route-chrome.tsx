"use client";

import { useEffect, type ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeLanguages } from "@/lib/home-locales/routing";
import { navigationFor, siteLocale, sitePath } from "@/lib/site-navigation";

export function LocalizedRouteLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = siteLocale(usePathname()) ?? "en";
  return <Link {...props} href={sitePath(href, locale)} />;
}

export function DesktopNavigation() {
  const pathname = usePathname();
  const locale = siteLocale(pathname) ?? "en";
  const nav = navigationFor(locale);
  return (
    <nav className="desktop-nav" lang={homeLanguages[locale].tag} aria-label={nav.label}>
      {nav.items.slice(0, 4).map(item => (
        <Link key={item.key} href={item.href} aria-current={pathname === item.href ? "page" : undefined}
          hrefLang={item.key === "/about" ? "en-GB" : homeLanguages[locale].tag}>{item.label}</Link>
      ))}
    </nav>
  );
}

export function ClientDeskLink({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = siteLocale(pathname) ?? "en";
  const contact = navigationFor(locale).items[4];
  return <Link href={contact.href} className="header-contact" lang={homeLanguages[locale].tag}
    aria-current={pathname === contact.href ? "page" : undefined}>{contact.label}{children}</Link>;
}

export function IllustrationScope() {
  return siteLocale(usePathname()) ? null : <> Illustrative Dossier Study badges identify AI-created concepts. These images illustrate fictional assets, and no depicted asset is offered for sale.</>;
}

export function DocumentLanguage() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = homeLanguages[siteLocale(pathname) ?? "en"].tag;
  }, [pathname]);
  return null;
}


const skipLabels = {
  en: "Skip to content",
  de: "Zum Inhalt springen",
  fr: "Aller au contenu",
  it: "Vai al contenuto",
  es: "Ir al contenido",
} as const;

export function SkipToContent() {
  const locale = siteLocale(usePathname()) ?? "en";
  return <a lang={homeLanguages[locale].tag} className="skip-link" href="#main">{skipLabels[locale]}</a>;
}
