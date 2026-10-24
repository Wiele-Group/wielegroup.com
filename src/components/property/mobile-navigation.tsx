"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { propertyNavigation } from "@/lib/property";
export function MobileNavigation() {
 const [open, setOpen] = useState(false);
 const container = useRef<HTMLDivElement>(null);
 useEffect(() => {
  if (!open) return;
  function dismiss(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); container.current?.querySelector("button")?.focus(); } }
  function outside(event: PointerEvent) { if (!container.current?.contains(event.target as Node)) setOpen(false); }
  document.addEventListener("keydown", dismiss); document.addEventListener("pointerdown", outside);
  return () => { document.removeEventListener("keydown", dismiss); document.removeEventListener("pointerdown", outside); };
 }, [open]);
 return <div className="mobile-navigation" ref={container}><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-links" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>{open && <nav id="mobile-links" aria-label="Mobile navigation">{propertyNavigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Get in touch</Link></nav>}</div>;
}
