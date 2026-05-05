"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonStyles } from "@/components/ui/button";
import { primaryNav, ctaLink } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the drawer on route change. React 19 prefers calculating during
  // render over an effect — store the last seen pathname and reset state
  // when it changes. https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  // Subtle backdrop opacity bump after first 24px of scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        scrolled
          ? "bg-[rgba(11,13,16,0.78)] backdrop-blur-[14px] border-b border-[var(--color-border-subtle)]"
          : "bg-[rgba(11,13,16,0.4)] backdrop-blur-[8px] border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo width={92} className="md:hidden" priority />
            <Logo width={124} className="hidden md:block" priority />
          </div>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7"
          >
            {primaryNav.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-body-sm font-medium tracking-[0.005em] transition-colors duration-[var(--duration-fast)]",
                    active
                      ? "text-white"
                      : "text-silver hover:text-white focus-visible:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href={ctaLink.href}
              className={cn(
                buttonStyles({ variant: "primary", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              {ctaLink.label}
            </Link>

            <button
              type="button"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-cloud hover:text-white hover:bg-[var(--color-surface-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div
          id="mobile-drawer"
          className="lg:hidden fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 bg-[var(--color-void)] overflow-y-auto"
        >
          <nav
            aria-label="Primary mobile"
            className="flex flex-col gap-1 px-[var(--container-px)] py-6"
          >
            {primaryNav.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-3 px-3 rounded-[var(--radius-md)] text-heading-sm font-medium transition-colors",
                    active
                      ? "text-white bg-[var(--color-surface-elevated)]"
                      : "text-cloud hover:bg-[var(--color-surface-elevated)] hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={ctaLink.href}
              className={cn(
                buttonStyles({ variant: "primary", size: "lg" }),
                "mt-4 w-full",
              )}
            >
              {ctaLink.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
