import Link from "next/link";
import Image from "next/image";
import { propertyBrand, propertyNavigation } from "@/lib/property";
import { MobileNavigation } from "./mobile-navigation";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="Wiele Property home"><Image className="brand-standard" src={footer ? "/property-identity/editorial/wiele-property-primary-ivory.svg" : "/property-identity/editorial/wiele-property-primary-forest.svg"} width={190} height={78} alt="Wiele Property" priority={!footer} />{!footer && <Image className="brand-reverse" src="/property-identity/editorial/wiele-property-primary-ivory.svg" width={190} height={78} alt="Wiele Property" priority />}</Link>;
}
export function Header() {
  return <header className="site-header"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{propertyNavigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><Link href="/contact" className="header-contact">Let’s talk <Arrow diagonal /></Link><MobileNavigation /></div></header>;
}
export function Footer() {
 return <footer className="site-footer"><div className="footer-top wrap"><div><Brand footer /><p>Property. People. A sense of place.</p></div><div><span className="eyebrow">A conversation starts here</span><a className="footer-email" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a><a href={propertyBrand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {propertyBrand.phone} <Arrow diagonal /></a></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Wiele Group · Malta</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Website terms</Link><Link href="/credits">Imagery & credits</Link></div></div><p className="scope-note wrap">Wiele Property provides property marketing and introductions. Sales documentation is handled by appropriately licensed practitioners. Decorative AI imagery is used for brand atmosphere; it does not depict properties offered for sale.</p></footer>;
}
export function ContactBand() {
 return <section className="contact-band"><div className="wrap band-inner"><div><span className="eyebrow">Your next chapter</span><h2>Good things begin<br />with a conversation.</h2></div><Link className="button button-light" href="/contact">Talk to Wiele <Arrow diagonal /></Link></div></section>;
}
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
 return <section className="page-intro wrap"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></section>;
}
