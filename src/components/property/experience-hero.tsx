import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./chrome";

/** One property-led opening; the primary journey requires no animation or client state. */
export function ExperienceHero() {
 return <section className="brokerage-hero" aria-labelledby="home-title">
  <div className="brokerage-hero-copy"><span className="eyebrow">Malta-based / Global asset brokerage</span><h1 id="home-title"><span>Exceptional property.</span><em>Global perspective.</em></h1><p className="brokerage-hero-description">Property is at the heart of Wiele. Discuss your next purchase, investment or sale with a global asset brokerage based in Malta.</p><div className="brokerage-hero-actions"><Link className="button" href="/contact?interest=buying" data-property-journey="buyer">Discuss a purchase <Arrow diagonal/></Link><Link className="text-link" href="/contact?interest=marketing" data-property-journey="seller">Sell your property <Arrow diagonal/></Link></div><span className="brokerage-signature">South African roots. Global perspective.</span></div>
  <figure className="brokerage-hero-image"><Image src="/property/wiele-global-villa-20261113.webp" alt="AI-created concept of a coastal architectural villa; not an actual property or property for sale" fill sizes="(max-width:760px) 100vw, 54vw" priority fetchPriority="high"/><figcaption>Architectural study · AI-created concept<br/><span>Not a property offered for sale</span></figcaption></figure>
 </section>;
}
