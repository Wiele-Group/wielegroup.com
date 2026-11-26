"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { homeLanguages } from "@/lib/home-locales/routing";
import { navigationFor, siteLocale } from "@/lib/site-navigation";

/** Native disclosure keeps navigation usable before hydration or without JS. */
export function MobileNavigation() {
  const pathname = usePathname();
  const locale = siteLocale(pathname) ?? "en";
  const nav = navigationFor(locale);
  const container = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = container.current;
    if (!menu) return;
    const close = () => { menu.open = false; };
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.open) return;
      close();
      menu.querySelector("summary")?.focus();
    };
    const outside = (event: PointerEvent) => {
      if (!menu.contains(event.target as Node)) close();
    };
    const leave = (event: FocusEvent) => {
      if (!menu.contains(event.relatedTarget as Node | null)) close();
    };
    // A menu opened at tablet width must not reappear after resizing back.
    const desktop = window.matchMedia("(min-width: 1181px)");
    const resize = () => { if (desktop.matches) close(); };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    menu.addEventListener("focusout", leave);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
      menu.removeEventListener("focusout", leave);
      desktop.removeEventListener("change", resize);
    };
  }, [pathname]);

  return <details className="mobile-navigation" lang={homeLanguages[locale].tag} ref={container} key={pathname}>
    <summary className="menu-toggle"><span className="menu-label-open">{nav.open}</span><span className="menu-label-close">{nav.close}</span><span className="menu-symbol" aria-hidden="true">+</span></summary>
    <nav id="mobile-links" lang={homeLanguages[locale].tag} aria-label={nav.label}>
      {nav.items.map(item => (
        <Link key={item.key} href={item.href} aria-current={pathname === item.href ? "page" : undefined}
          onClick={() => { if (container.current) container.current.open = false; }}>
          <span>{item.label}</span><span className="navigation-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </nav>
  </details>;
}
