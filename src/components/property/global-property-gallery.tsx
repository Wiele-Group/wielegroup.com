import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./chrome";

const inspirations = [
  { place: "Italy", title: "Estates among the vines.", image: "italy", alt: "AI-created Italy-inspired traditional stone wine estate with terracotta roofs and vineyards", type: "Traditional wine estates" },
  { place: "Spain", title: "A different pace of life.", image: "spain", alt: "AI-created Spain-inspired villa combining contemporary glazing with traditional arches and a private pool", type: "Modern & Mediterranean villas" },
  { place: "Dubai", title: "A city. A new perspective.", image: "apartment", alt: "AI-created luxury city penthouse and skyline, used as an international apartment design concept", type: "Luxury apartments & penthouses" },
  { place: "Cape Town", title: "Architecture meets the ocean.", image: "villa", alt: "AI-created Cape Town-inspired contemporary coastal villa with warm stone and expansive glazing", type: "Coastal architectural homes" },
  { place: "London", title: "Character that endures.", image: "london", alt: "AI-created London-inspired traditional stone townhouse with classical detailing and sash windows", type: "Distinctive traditional residences" },
];

export function GlobalPropertyGallery() {
  return <section className="cinema-destinations cinema-wrap" aria-labelledby="global-inspiration-title">
    <div className="cinema-destinations-heading"><span className="cinema-eyebrow">An international point of view</span><h2 id="global-inspiration-title">Modern vision.<br /><em>Timeless character.</em></h2><p>From city apartments to coastal villas and wine estates. A visual expression of the places and property styles that inspire Wiele’s global outlook.</p><small>Architectural inspiration · AI-created concepts · No properties currently advertised</small></div>
    {inspirations.map(item => <figure className="cinema-destination" key={item.place}><Link href={`/contact?interest=buying&market=${encodeURIComponent(item.place)}`} aria-label={`Discuss your ${item.place} property brief`}><Image src={`/property/wiele-global-${item.image}-20261113.webp`} alt={item.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" /><span className="cinema-image-arrow"><Arrow diagonal /></span></Link><figcaption><span className="cinema-eyebrow">{item.place} / {item.type}</span><h3>{item.title}</h3><small>Inspired by {item.place} · AI-created concept, not a location photograph or property for sale</small></figcaption></figure>)}
    <div className="cinema-destinations-heading"><Link className="cinema-text-link" href="/contact?interest=buying">Tell us where you want to buy <Arrow diagonal /></Link></div>
  </section>;
}
