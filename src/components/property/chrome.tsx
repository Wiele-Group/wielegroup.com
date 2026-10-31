import Link from "next/link";
import Image from "next/image";
import { propertyBrand, propertyNavigation } from "@/lib/property";
import { PageStructuredData } from "./structured-data";
import { LuxuryMotion } from "./luxury-motion";
import { MobileNavigation } from "./mobile-navigation";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="Wiele Properties Malta home"><Image className="brand-integrated" src={footer ? "/property-identity/option-1/wiele-premium-stacked-charcoal.png" : "/property-identity/premium-platform/wiele-option1-digital.png"} width={footer ? 700 : 360} height={footer ? 520 : 126} alt={`Wiele Properties Malta — ${propertyBrand.tagline}`} priority={!footer} /></Link>;
}
export function Header() {
  return <header className="site-header"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{propertyNavigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><Link href="/contact" className="header-contact">Enquire <Arrow diagonal /></Link><MobileNavigation /></div></header>;
}
function SocialIcon({ name }: { name: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">{name === "facebook" ? <path d="M13.5 22v-9h3l.45-3.5H13.5V7.25c0-1.01.28-1.7 1.73-1.7h1.85V2.42A24.6 24.6 0 0 0 14.38 2C11.7 2 9.86 3.64 9.86 6.65V9.5H7V13h2.86v9h3.64Z" /> : name === "linkedin" ? <><path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9h3.6v12H3.4V9ZM9.4 9h3.45v1.64h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.55V21h-3.6v-5.92c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13V21H9.4V9Z" /></> : <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1.1" /></>}</svg>;
}
export function Footer() {
 return <footer className="site-footer"><div className="footer-top wrap"><div><Brand footer /></div><div><span className="eyebrow">Your property conversation starts here</span><a className="footer-email" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a><a className="footer-whatsapp" href={propertyBrand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {propertyBrand.phone} <Arrow diagonal /></a><nav className="footer-social" aria-label="Wiele Properties social pages">{Object.entries(propertyBrand.social).map(([name,url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" title={`Wiele Properties on ${name === "linkedin" ? "LinkedIn" : name.charAt(0).toUpperCase()+name.slice(1)} (opens in a new tab)`}><SocialIcon name={name} /><span>{name === "linkedin" ? "LinkedIn" : name.charAt(0).toUpperCase()+name.slice(1)}</span></a>)}</nav></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Wiele Group · Malta</span><div><Link href="/investor-onboarding">Investor onboarding</Link><Link href="/seller-onboarding">Seller onboarding</Link><Link href="/legal-compliance">Legal compliance</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Website terms</Link><Link href="/credits">Imagery &amp; credits</Link><LuxuryMotion /></div></div><p className="scope-note wrap">Wiele Properties provides property marketing, buyer introductions and Wiele-managed property maintenance in Malta. Sales documentation is handled by appropriately licensed practitioners. Decorative AI imagery is used for brand atmosphere; it does not depict properties offered for sale.</p></footer>;
}
export function ContactBand() {
 return <section className="contact-band"><div className="wrap band-inner"><div><span className="eyebrow">A personal introduction</span><h2>Your property ambitions.<br /><em>A clear next step.</em></h2></div><Link className="button button-light" href="/contact">Start a conversation <Arrow diagonal /></Link></div></section>;
}
export function PageIntro({ eyebrow, title, description, path }: { eyebrow: string; title: string; description: string; path?: string }) {
 return <section className="page-intro wrap">{path && <PageStructuredData path={path} title={title} description={description} />}<span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></section>;
}
