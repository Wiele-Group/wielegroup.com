import Image from "next/image";
import Link from "next/link";
import { PerspectiveExperience } from "@/components/property/perspective-experience";
import { AssetAtlas, AssetPaths } from "@/components/property/asset-atlas";
import { StructuredData } from "@/components/property/structured-data";
import { Arrow } from "@/components/property/chrome";
import { propertyBrand } from "@/lib/property";
import { MarketPerspective } from "@/components/property/market-perspective";
import { propertyFaqs } from "@/lib/property-faqs";

const homeFaqs = propertyFaqs.filter(f => ["What is Wiele?", "Is Wiele focused only on Malta?", "How do I start an enquiry?"].includes(f.question));
const principles = [
 {number:"01",title:"An individual approach.",copy:"A home, an investment, a yacht or a classic car. The ambition behind it deserves a conversation shaped around you."},
 {number:"02",title:"Confidence in the detail.",copy:"A compelling presentation works best with clear asset information. Understand what is documented, what matters and what needs an independent check."},
 {number:"03",title:"A connected next step.",copy:"A direct point of contact keeps your objectives and next steps in view. Scope, fees and specialist involvement are agreed for your engagement."},
];

const flagshipDossiers = [
 { name: "Cape Peninsula Villa", category: "Property", href: "/flagship-examples/cape-villa.html" },
 { name: "Ligurian Motor Yacht", category: "Yachts", href: "/flagship-examples/ligurian-yacht.html" },
 { name: "Oxfordshire Coupé", category: "Classic Cars", href: "/flagship-examples/oxfordshire-coupe.html" },
];

export default function Home(){return <div className="editorial-home">
 <StructuredData data={{"@context":"https://schema.org","@type":"WebPage","@id":`${propertyBrand.url}/#webpage`,url:`${propertyBrand.url}/`,name:"Global Luxury Asset Brokerage | Wiele Investments",description:propertyBrand.description,inLanguage:"en-GB",dateModified:"2026-11-21",isPartOf:{"@id":`${propertyBrand.url}/#website`},about:{"@id":`${propertyBrand.url}/#organization`},primaryImageOfPage:{"@type":"ImageObject",contentUrl:`${propertyBrand.url}/property/wiele-global-villa-20261113.webp`,description:"AI-created fictional coastal architectural villa. Not a property for sale.",creditText:"Created with OpenAI image generation for Wiele Investments",width:1672,height:941},hasPart:{"@id":`${propertyBrand.url}/#faq`}}}/>
 <StructuredData data={{"@context":"https://schema.org","@type":"FAQPage","@id":`${propertyBrand.url}/#faq`,url:`${propertyBrand.url}/#questions`,name:"Wiele property and asset enquiries",mainEntity:homeFaqs.map(f=>({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))}}/>
 <PerspectiveExperience afterHero={<AssetAtlas/>}/>

 <AssetPaths/>
 <section id="why-wiele" className="brokerage-why" aria-labelledby="why-wiele-title"><div className="wrap brokerage-why-grid"><div><span className="eyebrow">Why Wiele / The Wiele Algorithm</span><h2 id="why-wiele-title">A listing is only<br/><em>the beginning.</em></h2><p className="brokerage-why-intro">Property at our core. Malta-based Wiele Investments connects the asset, the buyer’s purpose and the seller’s priorities. The Wiele Algorithm brings a considered approach to presentation, relevant conversations and the decisions behind your next move.</p><Link className="text-link" href="/wiele-algorithm">Discover The Wiele Algorithm <Arrow diagonal/></Link><Link className="text-link" href="/about#jonathan-landman">Meet Jonathan Landman <Arrow diagonal/></Link></div><ol className="brokerage-principles">{principles.map(p=><li key={p.number}><span>{p.number}</span><div><h3>{p.title}</h3><p>{p.copy}</p></div></li>)}</ol></div>
  <div className="wrap brokerage-dossiers">
   <h3 id="flagship-dossiers-title">Open-Access Illustrative Dossiers (No Registration Required)</h3>
   <nav className="atlas-paths" aria-labelledby="flagship-dossiers-title">
    {flagshipDossiers.map(dossier => (
     <a href={dossier.href} key={dossier.href}>
      <span className="atlas-path-number">{dossier.category}</span>
      <strong>{dossier.name}</strong>
      <span>View dossier <Arrow diagonal/></span>
     </a>
    ))}
   </nav>
  </div>
 </section>

 <MarketPerspective/>
 <section className="valuation-home wrap" aria-labelledby="valuation-home-title"><div><span className="eyebrow">UK · Europe · South Africa / Valuation enquiries</span><h2 id="valuation-home-title">A clearer view<br/><em>of value.</em></h2></div><div><p>Property, yachts and classic cars. Prepare a valuation brief, explore the evidence needed for an indicative estimate and compare budgets with dated currency reference rates.</p><Link href="/valuations" className="text-link">Explore valuations <Arrow diagonal/></Link><Link href="/valuations#currency-converter" className="text-link">Convert currencies <Arrow diagonal/></Link></div></section>
 <section id="research" className="brokerage-research wrap" aria-labelledby="research-title"><Link href="/research/global-luxury-property-report-2026" className="brokerage-report-cover" aria-label="Explore the Global Luxury Property Market Report"><Image src="/property/global-report-cover-20261113.jpg" width={621} height={877} sizes="(max-width:760px) 180px, 230px" alt="Global Luxury Property Market Report cover with a fictional coastal villa"/><span className="brokerage-report-illustration">Illustrative study · AI concept</span></Link><div><span className="eyebrow">Selected research / International property</span><h2 id="research-title">A wider view<br/><em>of the market.</em></h2><p>Explore the evidence behind global luxury property, from Cape Town and Europe to Dubai, London and Malta. Our illustrated report distinguishes dated observations, attributed forecasts and a conditional outlook.</p><p className="brokerage-report-meta">Research cutoff: 13 November 2026 · 27-page PDF · Registration required</p><Link className="button" href="/research/global-luxury-property-report-2026">Explore the property report <Arrow diagonal/></Link><Link className="text-link" href="/research">Browse the research library <Arrow diagonal/></Link></div></section>
 <section id="questions" className="brokerage-contact" aria-labelledby="brokerage-contact-title"><div className="wrap brokerage-contact-grid"><div><span className="eyebrow">Malta-based / An international conversation</span><h2 id="brokerage-contact-title">Tell us what<br/><em>comes next.</em></h2><p>A property purchase, a sale or a complementary asset enquiry. Start with your objectives and the information available.</p><Link className="button" href="/contact">Start a conversation <Arrow diagonal/></Link><a className="text-link" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email} <Arrow diagonal/></a><p className="brokerage-contact-note">Based in Malta · Working across UK, Europe &amp; South Africa · English &amp; Afrikaans by appointment</p></div><div className="brokerage-answers"><span className="eyebrow">Before you enquire</span>{homeFaqs.map(f=><details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div></div></section>
 </div>}
