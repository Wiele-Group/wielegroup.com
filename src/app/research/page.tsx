import { PAGE_METADATA, researchDescription as description } from "@/lib/seo-metadata";
import Link from "next/link";
import Image from "next/image";
import { PageIntro, Arrow } from "@/components/property/chrome";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";
import { globalLuxuryReport, investmentReport } from "@/lib/investment-report";
import { propertyMarket } from "@/lib/property-market";

const path = "/research";
export const metadata = PAGE_METADATA.research;

const publications = [
 {
  report: globalLuxuryReport,
  label: "Global luxury / Interim 2026",
  title: "Global luxury property.",
  emphasis: "The next perspective.",
  intro: "An illustrated review of Cape Town, Europe, Dubai, London and Malta, with a conditional outlook for 2027–2030.",
  cover: "/property/global-report-cover-20261113.jpg", width: 621, height: 877,
  alt: "Global Luxury Property Market Report cover with an AI-created Cape Town-inspired coastal villa",
  pages: 27,
  observations: [
   { period: "H1 2026", copy: "Across 30 prime residential markets, Savills recorded average capital growth of 0.6% and rental growth of 1.1%.", source: "Savills world cities index", url: "https://www.savills.com/research_articles/255800/393831-0" },
   { period: "H1 2026", copy: "Savills recorded prime capital values up 4.7% in Cape Town and 3.3% in Lisbon, in nominal local currency.", source: "Savills regional comparison", url: "https://www.savills.com/research_articles/255800/393850-0" },
   { period: "September 2026", copy: "Knight Frank’s prime central London index was down 2.0% year on year and up 0.3% over the quarter.", source: "Knight Frank London index", url: "https://www.knightfrank.co.uk/research/article/2026/10/no-news-has-been-good-news-for-the-prime-london-market" },
  ],
 },
 {
  report: investmentReport,
  label: "Malta / 2025 review · 2026 outlook",
  title: "The Malta",
  emphasis: "investment report.",
  intro: "Revised 2025 results, dated 2026 observations and worked examples of the costs behind a Malta property acquisition.",
  cover: "/property/report-research-20261102-cover.jpg", width: 1012, height: 1432,
  alt: "Malta Investment Property Report cover with an AI-created modern apartment concept",
  pages: 16,
  observations: [
   { period: "2025 annual average", copy: "Malta’s national house-price index rose 6.0%, compared with 6.7% growth in 2024.", source: "Eurostat annual house-price index", url: propertyMarket.sources.annualPrices },
   { period: "Q2 2026", copy: "The NSO’s national residential property price index rose 6.9% year on year and 1.6% quarter on quarter.", source: "NSO price index", url: propertyMarket.sources.prices },
   { period: "September 2026", copy: "The NSO recorded 974 final deeds, down 11.5% year on year. A deed can cover more than one property.", source: "NSO transaction release", url: propertyMarket.sources.transactions },
  ],
 },
];

const marineSources = [
 ["Transport Malta registry", "https://www.transport.gov.mt/landing_registration.asp?pageid=2011"],
 ["EU pleasure craft guidance", "https://taxation-customs.ec.europa.eu/document/download/8c62e3be-807f-4607-bb1e-9ff46db7d97e_en?filename=Guidance_pleasure_craft.pdf"],
] as const;
const collectorSources = [
 ["HMRC vehicle classification", "https://www.gov.uk/guidance/classifying-vehicles#collectors-vehicles"],
 ["EU collector classification", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A61997CJ0259"],
 ["ITAC import permits", "https://itac.org.za/wp-content/uploads/amended-guidelines-for-importation-of-used-or-second-hand-vehicles_.pdf"],
] as const;
const tools = [
 { title: "Market articles", copy: "Read dated analysis and research notes.", href: "/articles" },
 { title: "27-Entry Cross-Border Matrix", copy: "Compare legal and tax checkpoints by market and asset.", href: "/legal-guide" },
 { title: "Total Landed Cost Estimator", copy: "Model acquisition costs or seller proceeds.", href: "/valuations#landed-cost-estimator" },
] as const;

export default function Research() {
 return <>
  <PageIntro path={path} eyebrow="Wiele intelligence / The research library" title="Market research and property reports" description={description}/>
  <StructuredData data={{
   "@context": "https://schema.org", "@type": "CollectionPage", name: "Wiele market research", url: propertyBrand.url + path,
   dateModified: "2026-11-21",
   citation: [...publications.flatMap(publication => publication.observations.map(item => item.url)),
    ...marineSources.map(([,url]) => url), ...collectorSources.map(([,url]) => url)],
   mainEntity: { "@type": "ItemList", itemListElement: publications.map(({ report }, i) => ({ "@type": "ListItem", position: i + 1, name: report.title, url: propertyBrand.url + report.path })) },
  }}/>

  <section className="research-library research-open-library wrap" aria-label="Wiele market reports">
   {publications.map(publication => <article className="research-publication" key={publication.report.id} aria-labelledby={`${publication.report.id}-title`}>
    <figure className="research-cover-frame">
     <Link href={publication.report.path} className="research-publication-image" aria-label={`Explore ${publication.report.title}`}>
      <Image src={publication.cover} width={publication.width} height={publication.height}
       sizes="(max-width: 760px) 60vw, 25vw" alt={publication.alt}/>
      <span className="atlas-image-note">Illustrative Dossier Study</span>
     </Link>
    </figure>
    <div className="research-publication-copy">
     <span className="eyebrow">{publication.label}</span>
     <h2 id={`${publication.report.id}-title`}>{publication.title}<br/><em>{publication.emphasis}</em></h2>
     <p>{publication.intro}</p>
     <p className="research-publication-meta"><span>{publication.pages} pages</span><span>Research cutoff <time dateTime={publication.report.updated}>{publication.report.updatedLabel}</time></span></p>
     <section className="research-observations" aria-labelledby={`${publication.report.id}-observations`}>
      <h3 id={`${publication.report.id}-observations`}>Dated Key Observations</h3>
      <ul>{publication.observations.map(item => <li key={item.url}><strong>{item.period}.</strong> {item.copy}
       <a className="research-observation-source text-link" href={item.url}>{item.source} <Arrow diagonal/></a>
      </li>)}</ul>
     </section>
     <Link className="button" href={`${publication.report.path}#register`}>Register for the {publication.pages}-page PDF <Arrow diagonal/></Link>
     <p className="fine-print">Illustrative concept · Not an asset offered for sale. Cover imagery is AI-created.</p>
    </div>
   </article>)}
  </section>

  <section className="research-asset-intelligence" id="asset-intelligence" aria-labelledby="research-asset-title">
   <div className="wrap">
    <span className="eyebrow">Beyond property / Cross-border fundamentals</span>
    <h2 id="research-asset-title">Yachts and <em>classic cars.</em></h2>
    <div className="research-asset-grid">
     <article>
      <span className="eyebrow">01 / Yachts</span>
      <h3>Malta flag and EU VAT</h3>
      <p>Malta registers eligible private and commercial yachts. Flag registration, EU VAT and Union goods status require separate checks. Ask for registration, VAT and import records and verify the vessel’s movement history. Temporary Admission has eligibility, use and re-export conditions.</p>
      <div className="research-asset-sources">{marineSources.map(([label,url]) => <a className="text-link" key={url} href={url}>{label} <Arrow diagonal/></a>)}</div>
     </article>
     <article>
      <span className="eyebrow">02 / Classic cars</span>
      <h3>Provenance and collector classification</h3>
      <p>Start with chassis and engine identity, restoration history and ownership records. For cars aged 30 years or more, UK and EU collector classification under heading 9705 depends on evidence including condition and historical character. Confirm the applicable duty and import VAT locally. South Africa applies separate permit and rebate rules.</p>
      <div className="research-asset-sources">{collectorSources.map(([label,url]) => <a className="text-link" key={url} href={url}>{label} <Arrow diagonal/></a>)}</div>
     </article>
    </div>
    <div className="button-row research-asset-actions">
     <Link className="button" href="/luxury-assets">Explore yachts and classic cars <Arrow diagonal/></Link>
     <Link className="text-link" href="/legal-guide">Cross-border legal guide <Arrow diagonal/></Link>
    </div>
   </div>
  </section>

  <section className="research-tools wrap" aria-labelledby="research-tools-title">
   <h2 id="research-tools-title">Market Notes &amp; Analytical Tools</h2>
   <nav className="atlas-paths" aria-label="Market notes and analytical tools">
    {tools.map(tool => <Link key={tool.href} href={tool.href}><strong>{tool.title}</strong><span>{tool.copy}<Arrow diagonal/></span></Link>)}
   </nav>
  </section>

  <section className="research-consultation wrap" aria-labelledby="research-consultation-title">
   <div>
    <span className="eyebrow">Malta / Consultations</span>
    <h2 id="research-consultation-title">Request a Bespoke Market <em>or Valuation Brief</em></h2>
    <p>Tell us the asset, market and decision you’re preparing for. Consultations from Malta are available in English and Afrikaans by appointment. Scope, fees and any independent specialist involvement are agreed for each engagement.</p>
   </div>
   <div className="research-consultation-actions">
    <Link className="button" href="/contact?interest=general">Request a consultation <Arrow diagonal/></Link>
    <a className="text-link" href={`mailto:${propertyBrand.email}?subject=Wiele%20market%20or%20valuation%20brief`}>{propertyBrand.email} <Arrow diagonal/></a>
   </div>
  </section>
 </>;
}
