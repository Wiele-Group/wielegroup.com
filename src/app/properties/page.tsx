import { PropertyCollection } from "@/components/property/property-collection";
import { propertyMetadata } from "@/lib/property";
import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, PageIntro } from "@/components/property/chrome";

const path = "/properties";
const title = "Property Collection & Regional Tenure";
const description = "Malta-based Wiele Investments presents six open fictional property dossiers with dated GBP, EUR, ZAR and USD prices and a tenure guide for the UK, Europe and South Africa.";
export const metadata: Metadata = propertyMetadata(title, description, path);

const regions = [
 {
  name: "United Kingdom",
  types: "Townhouses, flats and residential estates",
  tenure: "In England and Wales, check freehold, leasehold or commonhold. Scotland uses separate title terminology.",
  evidence: "Check the title register and plan. For leasehold, confirm the remaining term, ground rent and service charges.",
  source: ["HM Land Registry", "https://www.gov.uk/get-information-about-property-and-land/search-the-register"],
 },
 {
  name: "Europe / Malta",
  types: "Apartments, villas and agricultural estates",
  tenure: "Use the ownership terms in the local deed. In Malta, ask the notary to check for ground rent (emphyteusis) and any term or conditions.",
  evidence: "Check title, rights over common parts, permitted use and any purchase restrictions in the relevant country.",
  source: ["Malta Joint Office", "https://jointoffice.gov.mt/en/faqs/general-questions/"],
 },
 {
  name: "South Africa",
  types: "Full-title homes, sectional-title units and estates",
  tenure: "A full-title home may occupy its own erf. In a sectional-title scheme, identify the registered section and its share in common property.",
  evidence: "Check the registered deed and plan. For sectional title, review levies, body corporate records and exclusive-use rights.",
  source: ["South African Deeds Registry", "https://www.gov.za/services/services-residents/place-live/get-deeds-registry-information"],
 },
] as const;

export default function Properties() {
 return <>
  <PageIntro path={path} eyebrow="01 / Malta-based global property sales" title="Property, presented with purpose." description="Explore how Wiele presents homes, estates and investment property. The examples are fictional and use AI-created concept images." actions={<>
   <a className="button" href="#listing-examples" data-site-action="property_examples">View property examples</a>
   <Link className="text-link" href="/contact?interest=marketing">Discuss selling</Link>
  </>}/>
  <PropertyCollection/>
  <section className="onboarding-invitation wrap">
   <div><span className="eyebrow">For property owners / Your next step</span><h2>Your property.<br/><em>Its own story.</em></h2><p>Marketing authority, verified particulars, photography, scope and fees are agreed for each instruction.</p></div>
   <Link className="button" href="/contact?interest=marketing">Discuss marketing your property <Arrow diagonal/></Link>
  </section>
  <section className="regional-tenure" aria-labelledby="regional-tenure-title">
   <div className="wrap">
    <span className="eyebrow">03 / UK · Europe/Malta · South Africa</span>
    <h2 id="regional-tenure-title">Regional property classifications <em>&amp; tenure.</em></h2>
    <p className="regional-tenure-intro">Property type describes the asset. Tenure describes the interest recorded in the title or deed. Use the local terms and confirm the documented rights with an appropriately licensed practitioner.</p>
    <div className="regional-tenure-grid">
     {regions.map(({ name, types, tenure, evidence, source }) => <article key={name}>
      <h3>{name}</h3>
      <dl>
       <dt>Property types</dt><dd>{types}</dd>
       <dt>Tenure</dt><dd>{tenure}</dd>
       <dt>Evidence to check</dt><dd>{evidence}</dd>
      </dl>
      <a href={source[1]} className="text-link">{source[0]} <Arrow diagonal/></a>
     </article>)}
    </div>
    <nav className="atlas-paths regional-tenure-links" aria-label="Property guides and services">
     <Link href="/legal-guide"><strong>Cross-border legal guide</strong><span>Check acquisition routes and restrictions. <Arrow diagonal/></span></Link>
     <Link href="/valuations#landed-cost-estimator"><strong>Landed Cost Estimator</strong><span>Compare acquisition costs. <Arrow diagonal/></span></Link>
     <Link href="/malta-maintenance"><strong>Malta property maintenance</strong><span>Explore Wiele-managed care in Malta. <Arrow diagonal/></span></Link>
    </nav>
    <Link className="text-link" href="/asset-taxonomy#property">Explore the full property taxonomy <Arrow diagonal/></Link>
   </div>
  </section>
 </>;
}
