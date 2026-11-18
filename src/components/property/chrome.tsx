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
  return <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="Wiele Investments global asset brokerage home"><Image className="brand-integrated" src="/property-identity/wiele-investments/wordmark-web.webp" width={560} height={244} alt="Wiele Investments" priority={!footer} /></Link>;
}
export function Header() {
  return <header className="site-header"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{propertyNavigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><Link href="/contact" className="header-contact">Enquire <Arrow diagonal /></Link><MobileNavigation /></div></header>;
}
function SocialIcon({ name }: { name: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">{name === "facebook" ? <path d="M13.5 22v-9h3l.45-3.5H13.5V7.25c0-1.01.28-1.7 1.73-1.7h1.85V2.42A24.6 24.6 0 0 0 14.38 2C11.7 2 9.86 3.64 9.86 6.65V9.5H7V13h2.86v9h3.64Z" /> : <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9h3.6v12H3.4V9ZM9.4 9h3.45v1.64h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.55V21h-3.6v-5.92c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13V21H9.4V9Z" />}</svg>;
}
export function Footer() {
 return <footer className="site-footer"><div className="footer-top wrap"><div><Brand footer /></div><div><span className="eyebrow">General enquiries &amp; registrations</span><a className="footer-email" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a><nav className="footer-social" aria-label="Wiele Investments social pages">{Object.entries(propertyBrand.social).map(([name,url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" title={`Wiele Investments on ${name === "linkedin" ? "LinkedIn" : name.charAt(0).toUpperCase()+name.slice(1)} (opens in a new tab)`}><SocialIcon name={name} /><span>{name === "linkedin" ? "LinkedIn" : name.charAt(0).toUpperCase()+name.slice(1)}</span></a>)}</nav></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Wiele Group · Based in Malta</span><div><Link href="/wiele-algorithm">The Wiele Algorithm</Link><Link href="/about">About Wiele</Link><Link href="/luxury-assets">Luxury assets</Link><Link href="/valuations">Valuations &amp; currency</Link><Link href="/investor-onboarding">Investor onboarding</Link><Link href="/seller-onboarding">Seller onboarding</Link><Link href="/property-maintenance">Malta maintenance</Link><Link href="/purchase-guide">International purchase guide</Link><Link href="/legal-compliance">Malta legal guide</Link><Link href="/articles">Articles</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Website terms</Link><Link href="/credits">Imagery &amp; credits</Link><LuxuryMotion /></div></div><p className="scope-note wrap">Wiele Investments is a Malta-based global asset brokerage. Property is our core business, complemented by yachts and classic cars. Market coverage, availability and the responsible practitioners are confirmed for each enquiry. Wiele-managed property maintenance is a Malta service. Transaction documentation is handled by appropriately licensed practitioners in the relevant jurisdiction. AI-created imagery illustrates the asset categories; it does not depict assets offered for sale.</p></footer>;
}
export function ContactBand() {
 return <section className="contact-band"><div className="wrap band-inner"><div><span className="eyebrow">Global assets. Individual ambitions.</span><h2>Your next chapter.<br /><em>Whatever you have in mind.</em></h2></div><Link className="button button-light" href="/contact">Start a conversation <Arrow diagonal /></Link></div></section>;
}
export function PageIntro({ eyebrow, title, description, path }: { eyebrow: string; title: string; description: string; path?: string }) {
 const scenes: Record<string, { image: string; label: string; ordinal: string }> = {
  "/buying": { image: "wiele-global-apartment-20261113.webp", label: "Interior study · AI-created concept", ordinal: "01 / The buyer perspective" },
  "/selling": { image: "wiele-global-residences-20261113.webp", label: "Architecture study · AI-created concept", ordinal: "02 / The owner perspective" },
  "/about": { image: "wiele-global-villa-20261113.webp", label: "Architectural villa · AI-created concept", ordinal: "03 / Our global perspective" },
  "/properties": { image: "wiele-global-wine-estate-20261113.webp", label: "Wine estate · AI-created concept", ordinal: "04 / The collection" },
 };
 const scene = path ? scenes[path] : undefined;
 return <section className={`page-intro wrap ${scene ? "page-intro-spatial" : ""}`}>
  {path && <PageStructuredData path={path} title={title} description={description} />}
  <div className="page-intro-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
  {scene && <figure className="page-intro-scene"><Image src={`/property/${scene.image}`} alt={`${scene.label}; not a property offered for sale`} fill sizes="(max-width: 760px) 100vw, 40vw" priority /><figcaption>{scene.label}<span>{"Not a property offered for sale"}</span></figcaption><span className="page-intro-ordinal" aria-hidden="true">{scene.ordinal}</span></figure>}
 </section>;
}
