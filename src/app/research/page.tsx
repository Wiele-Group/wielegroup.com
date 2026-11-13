import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageIntro, Arrow } from "@/components/property/chrome";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand, propertyMetadata } from "@/lib/property";
import { globalLuxuryReport, investmentReport } from "@/lib/investment-report";

const description = "Cape Town, Europe, Dubai, London and Malta property research from Wiele Investments. Explore our global luxury and Malta reports; register for full PDFs.";
export const metadata: Metadata = propertyMetadata("Property Research & Market Reports", description, "/research");
export default function Research() {
  return <>
    <PageIntro path="/research" eyebrow="Wiele intelligence / The research library" title="A wider view. A clearer perspective." description={description} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Wiele property research", url: `${propertyBrand.url}/research`, mainEntity: { "@type": "ItemList", itemListElement: [globalLuxuryReport, investmentReport].map((report, i) => ({ "@type": "ListItem", position: i + 1, name: report.title, url: propertyBrand.url + report.path })) } }} />
    <section className="research-library wrap" aria-label="Wiele market reports">
      <article className="research-publication research-publication-featured"><Link href={globalLuxuryReport.path} className="research-publication-image"><Image src="/property/global-report-cape-town-20261113.webp" width={1440} height={960} priority sizes="(max-width: 760px) 100vw, 60vw" alt="AI-generated illustration of a fictional Cape Town-inspired coastal villa" /></Link><div className="research-publication-copy"><span className="eyebrow">New / Global luxury / Interim 2026</span><h2><Link href={globalLuxuryReport.path}>Global luxury property.<br /><em>The next perspective.</em></Link></h2><p>From Cape Town to the Mediterranean, London and Dubai. An illustrated look at a more selective luxury market, with Malta and wider global context.</p><p className="research-publication-meta">27 pages · 27 linked sources · Research cutoff 13 November 2026</p><Link className="button" href={globalLuxuryReport.path}>Explore &amp; register <Arrow diagonal /></Link><p className="fine-print">Complimentary PDF after registration. Image: AI-generated illustration, not a photograph of a real property.</p></div></article>
      <article className="research-publication research-publication-secondary"><Link href={investmentReport.path} className="research-publication-image"><Image src="/property/report-research-20261102-cover.jpg" width={840} height={1188} sizes="(max-width: 760px) 70vw, 24vw" alt="Malta Investment Property Report cover with an AI-created architectural concept" /></Link><div className="research-publication-copy"><span className="eyebrow">Malta / 2025 review · 2026 outlook</span><h2><Link href={investmentReport.path}>The Malta<br /><em>investment report.</em></Link></h2><p>Revised 2025 results, dated 2026 observations, income examples and the detail behind a Malta property acquisition.</p><p className="research-publication-meta">16 pages · Updated 2 November 2026</p><Link className="text-link" href={investmentReport.path}>Explore the Malta report <Arrow /></Link><p className="fine-print">Complimentary PDF after registration. Cover imagery: AI-created architectural concept.</p></div></article>
    </section>
  </>;
}
