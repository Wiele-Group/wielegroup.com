import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./chrome";
import { exampleDisclosure, exampleHref, listingExamples } from "@/lib/listing-examples";

export function ListingExamples({ category, compact = false }: { category?: string; compact?: boolean }) {
 const examples = category ? listingExamples.filter(e => e.category === category) : listingExamples.filter(e => e.category !== "property");
 return <section className={`listing-showcase wrap${compact ? " listing-showcase-single" : ""}`} id="listing-examples" aria-labelledby="listing-examples-title">
  <div className="listing-showcase-heading"><div><span className="eyebrow">Malta-based brokerage / Seller presentation examples</span><h2 id="listing-examples-title">Your asset.<br/><em>Presented with purpose.</em></h2></div><div><p>See how a {category === "property" ? "property" : "specialist asset"} could be presented through Wiele. Explore the example presentation, from the first impression to the detail behind it.</p><p className="listing-disclaimer">Fictional assets, sample prices and specifications. AI-created concept imagery. These examples are not sale instructions, valuations or available inventory.</p></div></div>
  <div className="listing-example-grid">{examples.map(e => <article className="listing-example-card" key={e.slug}>
   <Link className="listing-card-image" href={exampleHref(e.slug)} aria-label={`View ${e.title} listing example`}><Image src={e.image} alt={e.alt} fill sizes={compact ? "(max-width:760px) 100vw, 52vw" : "(max-width:760px) 100vw, 50vw"}/><span className="listing-example-badge">{exampleDisclosure}</span></Link>
   <div className="listing-card-copy"><span className="eyebrow">{e.categoryLabel} / {e.location}</span><h3><Link href={exampleHref(e.slug)}>{e.title}</Link></h3><p className="listing-card-price">{e.price}<small>Fictional asking price · Not a valuation</small></p><dl className="listing-card-facts">{e.summary.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><Link className="text-link" href={exampleHref(e.slug)}>Explore the listing example <Arrow diagonal/></Link></div>
  </article>)}</div>
 </section>;
}
