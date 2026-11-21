import "server-only";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./chrome";
import { PropertyCollectionFilter, type PropertyRegion } from "./property-collection-filter";
import { exampleHref } from "@/lib/listing-examples";
import { registeredListingExamples } from "@/server/listing-examples";
import taxonomy from "../../../public/reference-data/taxonomy.json";

const regionCodes = new Set(taxonomy.dimensions.find(dimension => dimension.key === "region" && dimension.asset === "all")?.options.map(option => option.value));
const sampleRegions: Record<string, PropertyRegion> = {
 "city-penthouse": "elsewhere",
 "mediterranean-villa": "eu",
 "wine-estate": "eu",
 "coastal-residence": "za",
 "london-townhouse": "uk",
};

// ECB reference rates per euro on 20 November 2026, as used by the flagship dossier.
const rates = { GBP: 0.83735, EUR: 1, ZAR: 19.1987, USD: 1.099 } as const;
const codes = ["GBP", "EUR", "ZAR", "USD"] as const;
type PriceCurrency = typeof codes[number];
const wholeNumber = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });

type Study = {
 title: string;
 location: string;
 categoryLabel: string;
 href: string;
 image: string;
 alt: string;
 currency: PriceCurrency;
 amount: number;
 area: number;
 tenure: string;
 flagship?: boolean;
};

const capeVilla: Study = {
 title: "Cape Peninsula Villa",
 location: "Cape Peninsula · Illustrative location",
 categoryLabel: "Coastal villa",
 href: "/flagship-examples/cape-villa.html",
 image: "/flagship-examples/media/property.webp",
 alt: "AI-created concept of a coastal villa with limestone walls and an Atlantic outlook",
 currency: "ZAR",
 amount: 32_000_000,
 area: 480,
 tenure: "Full title (assumed)",
 flagship: true,
};

function StudyCard({ study }: { study: Study }) {
 const { title, location, categoryLabel, href, image, alt, currency, amount, area, tenure, flagship } = study;
 const titleID = `study-${href.split("/").at(-1)?.replace(".html", "")}`;

 return <>
  <div className="property-study-image">
   <Image src={image} alt={alt} fill sizes={flagship ? "(max-width: 820px) 100vw, 55vw" : "(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"} />
   <span className="listing-example-badge">Illustrative Dossier Study</span>
  </div>
  <div className="property-study-content">
   <div className="property-study-heading">
    <span className="eyebrow">{flagship ? "Flagship dossier" : categoryLabel}</span>
    <h3 id={titleID}>{title}</h3>
    <p>{location}</p>
    <a href={href} className="text-link" aria-describedby={titleID}>Read the open dossier <Arrow diagonal/></a>
   </div>
   <div className="property-study-specs">
    <p>Illustrative asking price</p>
    <dl className="property-study-prices">{codes.map(code => (
     <div key={code}><dt>{code}</dt><dd>{wholeNumber.format(amount / rates[currency] * rates[code])}</dd></div>
    ))}</dl>
    <p className="property-study-rate">ECB reference rates · <time dateTime="2026-11-20">20 Nov 2026</time></p>
    <dl className="property-study-facts">
     <div><dt>Tenure</dt><dd>{tenure}</dd></div>
     <div><dt>Internal area</dt><dd>{wholeNumber.format(area)} m² / {wholeNumber.format(area / 0.09290304)} sq ft</dd></div>
    </dl>
    <div className="property-study-readiness">
     <p>Due-Diligence Readiness <strong>0 / 5</strong></p>
     <div className="dossier-segments" role="meter" aria-label={`${title} due-diligence readiness`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={0} aria-valuetext="0 of 5 checks supported by verified records"><span/><span/><span/><span/><span/></div>
    </div>
   </div>
  </div>
 </>;
}

export function PropertyCollection() {
 const entries = registeredListingExamples.filter(example => example.category === "property").map(example => {
  const area = example.specifications.find(([label]) => label === "Internal area")?.[1].match(/^(\d+(?:\.\d+)?) m²$/);
  const match = example.price.match(/^€([\d,]+)$/);
  const region = sampleRegions[example.slug];
  if (!area || !match || !region || !regionCodes.has(region)) throw new Error(`Missing collection specifications for ${example.slug}`);
  const study = { ...example, href: exampleHref(example.slug), currency: "EUR" as const,
   amount: Number(match[1].replaceAll(",", "")), area: Number(area[1]), tenure: "Interest to confirm" };
  return { id: example.slug, region, content: <StudyCard study={study}/> };
 });

 return <section id="listing-examples" className="listing-showcase property-collection wrap" aria-labelledby="listing-examples-title">
  <div className="listing-showcase-heading">
   <div><span className="eyebrow">02 / Open property dossiers</span><h2 id="listing-examples-title">The property <em>collection.</em></h2></div>
   <div>
    <p>Six open property studies across the UK, Europe, South Africa and Dubai. Prices, specifications and condition notes are available without registration.</p>
    <p className="listing-disclaimer"><strong>Illustrative concept · Not an asset offered for sale.</strong> Each study uses fictional particulars and an AI-created concept image. No records have been independently verified.</p>
   </div>
  </div>
  <PropertyCollectionFilter entries={[{ id: "cape-villa", region: "za", flagship: true, content: <StudyCard study={capeVilla}/> }, ...entries]}/>
  <p className="property-collection-note listing-disclaimer">Conversions are rounded to whole currency units. Bank spreads, fees and taxes are additional. <a className="text-link" href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html">ECB reference rates <Arrow diagonal/></a> <Link className="text-link" href="/imagery-credits">Imagery credits <Arrow diagonal/></Link></p>
 </section>;
}
