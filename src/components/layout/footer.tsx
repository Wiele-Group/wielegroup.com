import Link from "next/link";
import { Linkedin, Mail, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { footerColumns } from "@/data/nav";
import { siteConfig } from "@/lib/metadata";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-default)] bg-[var(--color-void)]/50">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Logo width={168} />
            <p className="text-body-sm text-silver max-w-xs">
              {siteConfig.descriptor}.{" "}
              <span className="text-cloud">{siteConfig.tagline}</span>
            </p>
            <p className="text-body-xs text-smoke max-w-xs">
              {siteConfig.legalName} is the premium agency for brand,
              marketing, web, advertising, SEO, and AI search — engineered
              as one integrated growth system.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-body-xs font-semibold uppercase tracking-[0.12em] text-smoke mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-body-sm text-silver hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-[var(--color-border-default)]">
          <p className="text-body-xs text-smoke">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-body-xs">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Wiele on LinkedIn"
              className="inline-flex items-center gap-2 text-smoke hover:text-cloud transition-colors focus-visible:outline-none focus-visible:text-cloud"
            >
              <Linkedin size={14} aria-hidden />
              <span>LinkedIn</span>
            </a>
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Wiele on X"
              className="inline-flex items-center gap-2 text-smoke hover:text-cloud transition-colors focus-visible:outline-none focus-visible:text-cloud"
            >
              <Twitter size={14} aria-hidden />
              <span>X</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label={`Email Wiele at ${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-smoke hover:text-cloud transition-colors focus-visible:outline-none focus-visible:text-cloud"
            >
              <Mail size={14} aria-hidden />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
