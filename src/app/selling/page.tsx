import type { Metadata } from "next";
import Image from "next/image";
import { ScrollImage } from "@/components/property/experience-motion";
import Link from "next/link";
import { propertyBrand, propertyMetadata } from "@/lib/property";
import { Arrow, PageIntro } from "@/components/property/chrome";
import { SalesPreparation, SellerAssetLinks } from "@/components/property/sales-preparation";
import { AcquisitionMandates } from "@/components/property/acquisition-mandates";
import { WieleAlgorithm } from "@/components/property/wiele-algorithm";

const path = "/selling";
export const metadata: Metadata = propertyMetadata(
 "Property, Yacht & Classic Car Sales",
 "Malta-based Wiele Investments helps sellers in the UK, Europe and South Africa prepare a sales brief, review records and explore illustrative buyer demand.",
 path,
);

export default function Selling() {
 return <>
  <PageIntro path={path} eyebrow="Malta-based / Property & luxury asset sales" title="Your asset deserves more than a listing."
   description="Malta-based asset brokerage with an international outlook. Prepare the details for a property, yacht or classic car sale and discuss how Wiele presents an asset to relevant buyers."
   actions={<><a className="button" href="#sales-brief-planner" data-site-action="seller_brief">Prepare your sales brief</a><Link className="text-link" href="/contact?interest=marketing">Discuss selling</Link></>}/>
  <SalesPreparation/>
  <AcquisitionMandates/>
  <section className="split-feature seller-presentation wrap">
   <figure>
    <ScrollImage><Image src="/property/wiele-global-villa-20261113.webp" alt="AI-created concept of a fictional coastal villa" fill sizes="(max-width:760px) 100vw,45vw" style={{objectFit:"cover"}}/></ScrollImage>
    <figcaption>Illustrative Dossier Study</figcaption>
   </figure>
   <div>
    <span className="eyebrow">Property sales / A supported presentation</span>
    <h2>Make the presentation count.<br/><em>Keep the purpose clear.</em></h2>
    <p>A property presentation brings together location, tenure, condition, occupancy, planning and energy documentation, costs and material limitations. For income-producing property, distinguish collected income, contracted rent and projections.</p>
    <p>Wiele confirms marketing authority, geographic coverage, scope, fees and responsible practitioners for each engagement. Appropriately licensed practitioners in the relevant jurisdiction execute transaction documentation.</p>
    <p className="listing-disclaimer">Illustrative concept · Not an asset offered for sale. The residence imagery on this page is AI-created.</p>
    <div className="button-row">
     <Link className="button" href="/contact?interest=marketing">Introduce a property <Arrow diagonal/></Link>
     <Link className="text-link" href="/properties#listing-examples">See property listing examples <Arrow diagonal/></Link>
    </div>
    <SellerAssetLinks/>
   </div>
  </section>
  <aside className="wrap"><Link className="purchase-inline-link" href="/purchase-guide">Property sales by country — legal stages, seller documents and buyer nationality checks ↗</Link></aside>
  <WieleAlgorithm detailed/>
  <section className="seller-consultation wrap" aria-labelledby="seller-consultation-title">
   <div>
    <span className="eyebrow">Malta / Seller consultations</span>
    <h2 id="seller-consultation-title">Discuss the sale <em>in confidence.</em></h2>
    <p>Consultations from Malta are available in English and Afrikaans by appointment. Share your asset category, location and preferred time. An initial enquiry creates no instruction or payment obligation.</p>
   </div>
   <div className="seller-consultation-actions">
    <Link className="button" href="/contact?interest=marketing">Request a consultation <Arrow diagonal/></Link>
    <a className="text-link" href={`mailto:${propertyBrand.email}?subject=Wiele%20seller%20consultation`}>{propertyBrand.email} <Arrow diagonal/></a>
    <Link className="text-link" href="/seller-onboarding">Open detailed seller onboarding <Arrow diagonal/></Link>
   </div>
  </section>
 </>;
}
