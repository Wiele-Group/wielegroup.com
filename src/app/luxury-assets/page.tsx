import { PAGE_METADATA, luxuryAssetsTitle as title, luxuryAssetsDescription as description } from "@/lib/seo-metadata";
import Image from "next/image";
import { ScrollImage } from "@/components/property/experience-motion";
import Link from "next/link";
import { Arrow, ContactBand } from "@/components/property/chrome";
import { LuxuryDossierCollection } from "@/components/property/luxury-dossier-collection";
import { PageStructuredData, StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";
import { luxuryAssets, luxuryAssetFaqs } from "@/lib/luxury-assets";

const path = "/luxury-assets";
export const metadata = PAGE_METADATA.luxuryAssets;

const sources = {
 flag: "https://www.transport.gov.mt/landing_registration.asp?pageid=2011",
 boats: "https://taxation-customs.ec.europa.eu/document/download/8c62e3be-807f-4607-bb1e-9ff46db7d97e_en?filename=Guidance_pleasure_craft.pdf",
 ukTariff: "https://www.gov.uk/guidance/classifying-vehicles#collectors-vehicles",
 ukVat: "https://www.gov.uk/guidance/how-to-value-goods-for-import-vat",
 euTariff: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A61997CJ0259",
 euVat: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-directive/vat-rates_en",
 itac: "https://itac.org.za/wp-content/uploads/amended-guidelines-for-importation-of-used-or-second-hand-vehicles_.pdf",
 sars: "https://www.sars.gov.za/customs-and-excise/duties-and-taxes/duties-and-taxes-for-importers/",
};

export default function LuxuryAssets() {
 return <div className="luxury-assets-page">
  <PageStructuredData path={path} title={title} description={description} citations={Object.values(sources)}/>
  <StructuredData data={{"@context":"https://schema.org","@type":"FAQPage","@id":`${propertyBrand.url}${path}#faq`,
   mainEntity: luxuryAssetFaqs.map(f => ({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))}}/>

  <section className="luxury-editorial-hero" aria-labelledby="asset-title">
   <div className="luxury-hero-copy">
    <span className="eyebrow">Malta / Private asset brokerage</span>
    <h1 id="asset-title">Yachts and <em>classic cars.</em></h1>
    <p>Private acquisition and sales enquiries across the UK, Europe and South Africa.</p>
    <a className="cinema-button" href="#asset-categories">Explore open dossiers <Arrow diagonal/></a>
   </div>
   <figure>
    <ScrollImage><Image src="/property/malta-harbour.webp" alt="Valletta’s limestone waterfront across the harbour in Malta" fill sizes="(max-width: 760px) 100vw, 55vw" priority/></ScrollImage>
    <figcaption>Valletta waterfront, Malta</figcaption>
   </figure>
  </section>

  <nav className="asset-category-nav luxury-category-nav wrap" aria-label="Luxury asset categories">
   {luxuryAssets.map((asset, i) => <a key={asset.id} href={`#${asset.id}`}><span>0{i + 1}</span>{asset.name}<Arrow diagonal/></a>)}
  </nav>

  <section className="asset-introduction wrap" aria-labelledby="private-mandates-title">
   <div><span className="eyebrow">Private mandates / Yacht and collector enquiries</span><h2 id="private-mandates-title">Start with <em>the brief.</em></h2></div>
   <div>
    <p>Wiele works through private mandates. We start with the asset, the evidence and your objectives. Geographic coverage, availability, marketing authority, scope, fees and responsible practitioners are confirmed individually. Appropriately licensed practitioners in the relevant jurisdiction execute transaction documentation.</p>
    <p className="asset-disclosure"><strong>Illustrative concept · Not an asset offered for sale.</strong> The four open dossiers use fictional specifications, prices and AI-created concept images. Read the full details and condition notes without registration.</p>
    <Link className="text-link" href="/wiele-algorithm">Discover The Wiele Algorithm <Arrow diagonal/></Link>
   </div>
  </section>

  <LuxuryDossierCollection/>

  <section className="luxury-cross-border" aria-labelledby="luxury-cross-border-title">
   <div className="wrap">
    <span className="eyebrow">Malta · UK · EU · South Africa</span>
    <h2 id="luxury-cross-border-title">Cross-border <em>ownership checks.</em></h2>
    <div className="luxury-cross-border-grid">
     <article>
      <h3>Malta flag and yacht VAT</h3>
      <p>Malta registers private and commercial superyachts. Flag registration and EU VAT or Union goods status are separate checks. Review the VAT invoice, import records, movement history and intended use with a marine customs adviser. Temporary Admission is time-limited and subject to eligibility and re-export conditions.</p>
      <div className="luxury-source-links"><a className="text-link" href={sources.flag}>Transport Malta registry <Arrow diagonal/></a><a className="text-link" href={sources.boats}>EU pleasure craft guidance <Arrow diagonal/></a></div>
     </article>
     <article>
      <h3>Cars aged 30 years or more</h3>
      <dl>
       <div><dt>UK</dt><dd>Confirm heading 9705 with HMRC. Age and historically correct condition are part of classification. Qualifying collector’s items can receive reduced import VAT treatment.</dd></div>
       <div><dt>EU</dt><dd>Heading 9705 considers age, original condition, whether the model is still produced and its historical interest. Confirm classification and the applicable import VAT treatment in the member state of import.</dd></div>
       <div><dt>South Africa</dt><dd>Used imports require an ITAC permit. Its vintage route generally starts at 40 years, with a separate route for internationally recognised collector vehicles. Confirm any duty rebate and import VAT with SARS.</dd></div>
      </dl>
      <div className="luxury-source-links">
       <a className="text-link" href={sources.ukTariff}>HMRC classification <Arrow diagonal/></a>
       <a className="text-link" href={sources.ukVat}>UK import VAT <Arrow diagonal/></a>
       <a className="text-link" href={sources.euTariff}>EU collector classification <Arrow diagonal/></a>
       <a className="text-link" href={sources.euVat}>EU VAT framework <Arrow diagonal/></a>
       <a className="text-link" href={sources.itac}>ITAC permit guidance <Arrow diagonal/></a>
       <a className="text-link" href={sources.sars}>SARS duties and VAT <Arrow diagonal/></a>
      </div>
     </article>
    </div>
    <p className="fine-print">Sources reviewed <time dateTime="2026-11-21">21 November 2026</time>. Ask the relevant practitioners to confirm classification, relief, eligibility and costs before committing.</p>
    <div className="button-row luxury-reference-actions">
     <Link className="button" href="/legal-guide">Cross-border legal guide <Arrow diagonal/></Link>
     <Link className="text-link" href="/valuations#landed-cost-estimator">Open the Landed Cost Estimator <Arrow diagonal/></Link>
    </div>
   </div>
  </section>

  <section className="investment-faq wrap" id="faq" aria-labelledby="asset-questions">
   <div><span className="eyebrow">Luxury asset enquiries / Answers</span><h2 id="asset-questions">Before your <em>next move.</em></h2></div>
   <div className="investment-faq-list">
    {luxuryAssetFaqs.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}
    <nav className="luxury-source-links" aria-label="Detailed asset guides">
     <Link className="text-link" href="/luxury-assets/yachts">Yacht acquisition and sales guide <Arrow diagonal/></Link>
     <Link className="text-link" href="/luxury-assets/classic-cars">Classic car acquisition and sales guide <Arrow diagonal/></Link>
    </nav>
   </div>
  </section>
  <ContactBand/>
 </div>;
}
