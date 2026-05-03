import Link from "next/link";
import { siteConfig } from "@/lib/metadata";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "SEO", href: "/services/seo" },
      { label: "AEO", href: "/services/aeo" },
      { label: "GEO", href: "/services/geo" },
      { label: "Advertising", href: "/services/advertising" },
      { label: "Web Design", href: "/services/web-design" },
      { label: "Marketing", href: "/services/marketing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Journal", href: "/journal" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: siteConfig.socials.linkedin },
      { label: "X / Twitter", href: siteConfig.socials.x },
      { label: "hello@wielegroup.com", href: "mailto:hello@wielegroup.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--elevated-border)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-4" style={{ letterSpacing: "-0.04em" }}>
              <span className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs" style={{ background: "linear-gradient(135deg, var(--electric), var(--neon))" }}>W</span>
              WIELE
            </Link>
            <p className="text-body-sm" style={{ color: "var(--smoke)" }}>
              {siteConfig.tagline}
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--white)" }}>{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm transition-colors" style={{ color: "var(--smoke)" }} >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid var(--elevated-border)" }}>
          <p className="text-body-sm" style={{ color: "var(--smoke)" }}>
            © {new Date().getFullYear()} Wiele Group. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-body-sm" style={{ color: "var(--smoke)" }}>Privacy</Link>
            <Link href="/terms" className="text-body-sm" style={{ color: "var(--smoke)" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
