import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageStructuredData, StructuredData } from "@/components/property/structured-data";
import { ReportRegistration } from "@/components/property/report-registration";
import { Arrow } from "@/components/property/chrome";
import { propertyBrand, propertyMetadata } from "@/lib/property";
import { globalLuxuryReport as report } from "@/lib/investment-report";

const description = "Cape Town luxury property, Europe, Dubai, London and Malta: a 27-page Wiele market report with trends and a conditional 2027–2030 outlook. Register for the PDF.";
const image = "/property/global-report-social-20261113.jpg";
export const metadata: Metadata = {
  ...propertyMetadata("Global Luxury Property Market Report 2026", description, report.path),
  openGraph: { ...propertyMetadata("Global Luxury Property Market Report 2026", description, report.path).openGraph, images: [{ url: image, width: 1200, height: 630, alt: "Wiele Global Luxury Property Market Report; AI-created fictional coastal villa illustration" }] },
  twitter: { card: "summary_large_image", title: "Global Luxury Property Report | Wiele Investments", description, images: [image] },
};
const regions = [
  ["Cape Town", "Prime momentum, local scarcity and the international buyer’s currency exposure.", "cape-town"],
  ["Europe", "Mediterranean cities, Monaco, mountain homes and distinctive destination property.", "europe"],
  ["London", "Repricing, signs of stability and the importance of entry price and ownership costs.", "london"],
  ["Dubai", "Trophy sales, cooling conditions and the different risks of ready and off-plan homes.", "dubai"],
  ["Malta", "National market evidence, prime search priorities and the limits of luxury-segment data.", "malta"],
];
export default function GlobalLuxuryReport() {
  return <>
    <PageStructuredData path={report.path} title={report.title} description={description} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Report", "@id": `${propertyBrand.url}${report.path}#report`, name: report.title, headline: "Global Luxury Property Market: Interim 2026 and Outlook 2027–2030", description, datePublished: report.published, dateModified: report.updated, inLanguage: "en-GB", author: { "@id": `${propertyBrand.url}/#organization` }, publisher: { "@id": `${propertyBrand.url}/#organization` }, url: propertyBrand.url + report.path, image: propertyBrand.url + image, numberOfPages: 27, isAccessibleForFree: true, conditionsOfAccess: "Complimentary PDF after name and email registration. Optional marketing consent is separate. Download access lasts 24 hours in the registering browser.", spatialCoverage: ["Cape Town", "Europe", "Dubai", "London", "Malta"].map(name => ({ "@type": "Place", name })) }} />
    <section className="report-hero wrap" aria-labelledby="global-report-title">
      <div className="report-hero-copy"><Link href="/research" className="text-link">Research library <Arrow /></Link><span className="eyebrow">Global luxury property / Interim 2026</span><h1 id="global-report-title">A world of property.<br /><em>A more selective era.</em></h1><p className="report-subtitle">Global Luxury Property Market Report</p><p>From Cape Town and Europe to Dubai, London and Malta. A 27-page illustrated report on market trends, changing buyer priorities and the forces shaping the next cycle.</p><a href="#register" className="button">Register for your copy <span aria-hidden="true">↓</span></a><span className="report-edition-note">Complimentary PDF · 27 linked sources · Research cutoff 13 November 2026</span></div>
      <figure className="report-cover-display"><Image src="/property/global-report-cover-20261113.jpg" width={621} height={877} priority alt="Global Luxury Property Market Report cover with an AI-generated fictional coastal villa" /><figcaption>Wiele Investments research. AI-generated architectural illustration; not a photograph of a real property.</figcaption></figure>
    </section>
    <section className="report-inside wrap"><div><span className="eyebrow">Inside the report</span><h2>Read the market.<br /><em>Understand the difference.</em></h2><p>Luxury property moves at different speeds across countries, cities and individual streets. This edition examines those differences without turning a national index into a promise for one home.</p><p>Observed results, attributed forecasts and conditional scenarios are clearly separated. The wider perspective includes selected US and Asia Pacific markets.</p><a className="text-link" href="#register">Access the complete report <Arrow /></a></div><div><ol><li><span>01</span><div><strong>Current market evidence</strong><p>A common-period prime-city comparison and focused analysis of the core markets.</p></div></li><li><span>02</span><div><strong>The changing luxury home</strong><p>Branded residences, service, longevity, adaptable spaces and climate resilience.</p></div></li><li><span>03</span><div><strong>The cost behind the address</strong><p>Acquisition friction, ownership costs, currency exposure and transparent sensitivities.</p></div></li><li><span>04</span><div><strong>Outlook for 2027–2030</strong><p>Conditional base, upside and downside paths, with assumptions and evidence limits.</p></div></li></ol></div></section>
    <section className="global-report-regions wrap" aria-labelledby="global-regions-title"><header><span className="eyebrow">Five market perspectives</span><h2 id="global-regions-title">From the Atlantic.<br /><em>To the Mediterranean. And beyond.</em></h2></header><div className="global-report-region-grid">{regions.map(([name, summary, key]) => <article key={key}><figure><Image src={`/property/global-report-${key}-20261113.webp`} width={1440} height={960} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" alt={`AI-generated fictional architectural illustration for the ${name} market chapter`} /><figcaption>AI-generated illustration; not a real property.</figcaption></figure><h3>{name}</h3><p>{summary}</p></article>)}</div></section>
    <section id="register" className="report-registration wrap" aria-label="Register for the global luxury property report"><div><span className="eyebrow">Your complimentary edition</span><h2>A wider view.<br /><em>Ready to read.</em></h2><p>Register with your name and email to download the complete illustrated PDF. Access remains available in the same browser for 24 hours.</p><p>Marketing updates are a separate, optional choice. No payment or account password is required.</p><p className="fine-print">An interim 2026 edition, researched to 13 November 2026. This is selected-market commentary, not a global census, individual valuation or legal, tax or financing advice. The 2027–2030 outlook is conditional; the images depict fictional architectural scenes.</p></div><ReportRegistration reportId={report.id} /></section>
  </>;
}
