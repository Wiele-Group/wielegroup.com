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
  return <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="Wiele Properties Malta home"><Image className="brand-integrated" src="/property-identity/integrated/wiele-properties-malta-reverse.png" width={660} height={290} alt={`Wiele Properties Malta — ${propertyBrand.tagline}`} priority={!footer} /></Link>;
}
export function Header() {
  return <header className="site-header"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{propertyNavigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><Link href="/contact" className="header-contact">Enquire <Arrow diagonal /></Link><MobileNavigation /><LuxuryMotion /></div></header>;
}
export function Footer() {
 return <footer className="site-footer"><div className="footer-top wrap"><div><Brand footer /></div><div><span className="eyebrow">Your investment conversation starts here</span><a className="footer-email" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a><a href={propertyBrand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {propertyBrand.phone} <Arrow diagonal /></a></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Wiele Group · Malta</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Website terms</Link><Link href="/credits">Imagery & credits</Link>{Object.entries(propertyBrand.social).map(([name,url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name === "linkedin" ? "LinkedIn" : name.charAt(0).toUpperCase()+name.slice(1)}</a>)}</div></div><p className="scope-note wrap">Wiele Properties provides property marketing and introductions. Sales documentation is handled by appropriately licensed practitioners. Decorative AI imagery is used for brand atmosphere; it does not depict properties offered for sale.</p></footer>;
}
export function ContactBand() {
 return <section className="contact-band"><div className="wrap band-inner"><div><span className="eyebrow">A personal introduction</span><h2>Your property ambitions.<br /><em>A clear next step.</em></h2></div><Link className="button button-light" href="/contact">Start a conversation <Arrow diagonal /></Link></div></section>;
}
export function PageIntro({ eyebrow, title, description, path }: { eyebrow: string; title: string; description: string; path?: string }) {
 return <section className="page-intro wrap">{path && <PageStructuredData path={path} title={title} description={description} />}<span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></section>;
}
