import { PAGE_METADATA } from "@/lib/seo-metadata";
import Image from "next/image";
import Link from "next/link";
import { PerspectiveExperience } from "@/components/property/perspective-experience";
import { AssetAtlas, AssetPaths } from "@/components/property/asset-atlas";
import { StructuredData } from "@/components/property/structured-data";
import { Arrow } from "@/components/property/chrome";
import { propertyBrand } from "@/lib/property";
import { MarketPerspective } from "@/components/property/market-perspective";
import { LandedCostPreview } from "@/components/property/landed-cost-preview";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { buildFaqSchema, HOME_AEO_FAQS } from "@/lib/schema-graph";
import { MandateClauses, MandateScheduleA } from "@/components/seller/MandateAgreement";
import { mandateSummary } from "@/lib/mandateAgreement";

export const metadata = PAGE_METADATA.home;

const principles = [
 {number:"01",title:"An individual approach.",copy:"A home, an investment, a yacht or a classic car. The ambition behind it deserves a conversation shaped around you."},
 {number:"02",title:"Confidence in the detail.",copy:"A compelling presentation works best with clear asset information. Understand what is documented, what matters and what needs an independent check."},
 {number:"03",title:"A connected next step.",copy:"A direct point of contact keeps your objectives and next steps in view. Scope, fees and specialist involvement are agreed for your engagement."},
];

const consultationZones = [
 { zone: "CET / CEST", market: "Malta and Central Europe" },
 { zone: "GMT / BST", market: "United Kingdom" },
 { zone: "SAST", market: "South Africa" },
];

export default function Home(){return <div className="editorial-home">
 <StructuredData data={{"@context":"https://schema.org","@type":"WebPage","@id":`${propertyBrand.url}/#webpage`,url:`${propertyBrand.url}/`,name:"Global Luxury Asset Brokerage | Wiele Investments",description:propertyBrand.description,inLanguage:"en-GB",dateModified:"2026-11-25",isPartOf:{"@id":`${propertyBrand.url}/#website`},about:{"@id":`${propertyBrand.url}/#organization`},primaryImageOfPage:{"@type":"ImageObject",contentUrl:`${propertyBrand.url}/property/wiele-global-villa-20261113.webp`,description:"AI-created fictional coastal architectural villa. Not a property for sale.",creditText:"Created with OpenAI image generation for Wiele Investments",width:1672,height:941},hasPart:{"@id":`${propertyBrand.url}/#faq`}}}/>
 <JsonLdGraph includeCore={false} nodes={[{ ...buildFaqSchema(HOME_AEO_FAQS), "@id": `${propertyBrand.url}/#faq`, url: `${propertyBrand.url}/#questions` }]} />
 <PerspectiveExperience afterHero={<AssetAtlas/>}/>

 <AssetPaths/>
 <section id="why-wiele" className="brokerage-why" aria-labelledby="why-wiele-title"><div className="wrap brokerage-why-grid"><div><span className="eyebrow">Why Wiele / The Wiele Algorithm</span><h2 id="why-wiele-title">A listing is only<br/><em>the beginning.</em></h2><p className="brokerage-why-intro">Property at our core. Malta-based Wiele Investments connects the asset, the buyer’s purpose and the seller’s priorities. The Wiele Algorithm brings a considered approach to presentation, relevant conversations and the decisions behind your next move.</p><Link className="text-link" href="/wiele-algorithm">Discover The Wiele Algorithm <Arrow diagonal/></Link><Link className="text-link" href="/about#jonathan-landman">Meet Jonathan Landman <Arrow diagonal/></Link></div><ol className="brokerage-principles">{principles.map(p=><li key={p.number}><span>{p.number}</span><div><h3>{p.title}</h3><p>{p.copy}</p></div></li>)}</ol></div>
 </section>

 <MarketPerspective/>
 <section className="valuation-home wrap" aria-labelledby="valuation-home-title">
  <div><span className="eyebrow">UK · Europe · South Africa / Valuation enquiries</span><h2 id="valuation-home-title">A clearer view<br/><em>of value.</em></h2>
   <p>Compare acquisition costs for property, yachts and classic cars, or prepare a valuation brief with the evidence available.</p>
   <Link href="/valuations#currency-converter" className="text-link">Convert currencies <Arrow diagonal/></Link>
  </div>
  <LandedCostPreview/>
 </section>
 <section id="research" className="brokerage-research wrap" aria-labelledby="research-title"><Link href="/research/global-luxury-property-report-2026" className="brokerage-report-cover" aria-label="Explore the Global Luxury Property Market Report"><Image src="/property/global-report-cover-20261113.jpg" width={621} height={877} sizes="(max-width:760px) 180px, 230px" alt="Global Luxury Property Market Report cover with an AI-created concept of a fictional coastal villa"/><span className="brokerage-report-illustration">Illustrative Dossier Study</span></Link><div><span className="eyebrow">Selected research / International property</span><h2 id="research-title">A wider view<br/><em>of the market.</em></h2><p>Explore the evidence behind global luxury property, from Cape Town and Europe to Dubai, London and Malta. Our illustrated report distinguishes dated observations, attributed forecasts and a conditional outlook.</p><p className="brokerage-report-meta">Research cutoff: 13 November 2026 · 27-page PDF · Registration required · AI-created cover concept</p><Link className="button" href="/research/global-luxury-property-report-2026">Explore the property report <Arrow diagonal/></Link><Link className="text-link" href="/research">Browse the research library <Arrow diagonal/></Link></div></section>
 <section id="questions" className="brokerage-contact" aria-labelledby="brokerage-contact-title"><div className="wrap brokerage-contact-grid"><div><span className="eyebrow">Malta-based / An international conversation</span><h2 id="brokerage-contact-title">Tell us what<br/><em>comes next.</em></h2><p>A property purchase, a sale or a complementary asset enquiry. Start with your objectives and the information available.</p><Link className="button" href="/contact">Start a conversation <Arrow diagonal/></Link><a className="text-link" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email} <Arrow diagonal/></a><div className="consultation-options">
  <h3>Request a consultation</h3>
  <p>Email your preferred date and local time. English and Afrikaans by appointment.</p>
  <ul>{consultationZones.map(({zone, market}) => <li key={zone}><a href={`mailto:${propertyBrand.email}?subject=${encodeURIComponent(`Wiele consultation · ${market} (${zone})`)}`}><strong>{zone}</strong><span>{market}</span><Arrow diagonal/></a></li>)}</ul>
  <p className="fine-print">Keep bank details and identity documents out of your initial enquiry.</p>
 </div></div><div className="brokerage-answers"><span className="eyebrow">Before you enquire</span>{HOME_AEO_FAQS.map(f=><details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div></div></section>
 <section className="legal-copy wrap" aria-labelledby="home-seller-mandate">
  <h2 id="home-seller-mandate">Seller mandate</h2>
  <p><Link href={mandateSummary.publicPath}>Read the {mandateSummary.contractingParty} seller mandate on its own page</Link></p>
  <details>
   <summary>{mandateSummary.title} · {mandateSummary.version}</summary>
   <MandateClauses heading="h3" />
   <MandateScheduleA heading="h3" />
  </details>
 </section>
 </div>}
