"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(10,10,15,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderColor: "var(--elevated-border)" }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight" style={{ letterSpacing: "-0.04em" }}>
          <span className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "linear-gradient(135deg, var(--electric), var(--neon))" }}>W</span>
          WIELE
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium transition-colors" style={{ color: "var(--silver)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--silver)")}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/audit" className="btn-primary text-sm">
            Free AI Audit
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu" style={{ color: "var(--silver)" }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ background: "var(--void)", borderTop: "1px solid var(--elevated-border)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-base font-medium" style={{ color: "var(--cloud)" }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/audit" className="btn-primary text-sm justify-center mt-2" onClick={() => setOpen(false)}>
            Free AI Audit →
          </Link>
        </div>
      )}
    </nav>
  );
}
