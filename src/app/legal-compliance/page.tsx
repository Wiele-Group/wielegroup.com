import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ContactBand } from "@/components/property/chrome";
import { PageStructuredData, StructuredData } from "@/components/property/structured-data";
import { propertyBrand, propertyMetadata } from "@/lib/property";
import { complianceFaqs, complianceSources, investorRoutes, type ComplianceSource } from "@/lib/property-compliance";

const description = "Malta property investment legal guide: EU and non-EU buyers, third-country nationals and corporations. Understand AIP, SDAs, ownership and due-diligence checks.";
const title = "Malta Property Investment: Legal Compliance & FAQs";
export const metadata: Metadata = {
  ...propertyMetadata(title, description, "/legal-compliance"),
  openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name, title: `${title} | Wiele Properties`, description, url: "/legal-compliance", images: [{ url: "/property/og-legal-compliance-20261031.jpg", width: 1200, height: 630, alt: "Wiele Properties — Malta property investment legal guide. EU, non-EU, TCN and corporate buyers. Typographic brand artwork." }] },
  twitter: { card: "summary_large_image", title: `${title} | Wiele Properties`, description, images: ["/property/og-legal-compliance-20261031.jpg"] },
};
function SourceLinks({ sources }: { sources: readonly ComplianceSource[] }) {
  return <ul className="compliance-source-links" aria-label="Official sources">{sources.map(key => <li key={key}><a href={complianceSources[key].url} target="_blank" rel="noopener noreferrer">{complianceSources[key].label}<span className="sr-only"> (opens in a new tab)</span> <Arrow diagonal /></a></li>)}</ul>;
}
const checks = [
  ["The buyer", "Confirm citizenship, residence status, joint purchasers and ownership or control of the purchasing vehicle."],
  ["The property", "Ask your notary and warranted perit to check title, ground rent, burdens, plans, condition and permitted use."],
  ["The funds", "Prepare the source-of-funds evidence, borrowing terms, signing authority and full acquisition budget."],
  ["The intended use", "Check acquisition conditions, residential or tourism permissions, ongoing obligations and the exit plan."],
];
export default function LegalCompliance() {
  return <>
    <PageStructuredData path="/legal-compliance" title={title} description={description} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${propertyBrand.url}/legal-compliance#questions`, url: `${propertyBrand.url}/legal-compliance#questions`, inLanguage: "en-GB", mainEntity: complianceFaqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
    <section className="compliance-hero wrap" aria-labelledby="compliance-title">
      <div><span className="eyebrow">Malta property investment / Legal compliance guide</span><h1 id="compliance-title">A considered investment.<br /><em>A clear legal route.</em></h1><p>Before the purchase, understand the permissions. A practical starting point for EU investors, non-EU buyers, third-country nationals and corporations considering property in Malta.</p><div className="button-row"><a className="button" href="#investor-routes">Find your investor route <Arrow /></a><a className="text-link" href="#compliance-questions">Read the FAQs <Arrow /></a></div><span className="compliance-reviewed">Content reviewed <time dateTime="2026-10-31">31 October 2026</time> · Official sources linked below</span></div>
      <aside className="compliance-brief" aria-label="Your investment decision"><span className="eyebrow">Before you commit</span><p className="compliance-brief-title">The buyer.<br />The property.<br /><em>The intended use.</em></p><p>These three facts shape the questions your independent advisers need to answer.</p><a className="text-link" href="#purchase-checks">Prepare your purchase brief <Arrow diagonal /></a></aside>
    </section>
    <div className="compliance-notice wrap"><p><strong>General information for your purchase brief.</strong> This guide is not a legal opinion or confirmation of eligibility. Rules, permit conditions and personal circumstances differ. Have an independent Maltese notary or advocate confirm the route for your transaction before signing or paying a deposit.</p></div>
    <nav className="compliance-jump wrap" aria-label="Investor categories">{investorRoutes.map(item => <a key={item.id} href={`#${item.id}`}><span>{item.number}</span>{item.label}<Arrow diagonal /></a>)}</nav>
    <section id="investor-routes" className="compliance-routes wrap" aria-labelledby="investor-routes-title"><header><span className="eyebrow">Malta property acquisition / Know your position</span><h2 id="investor-routes-title">Different circumstances.<br /><em>Specific requirements.</em></h2><p>Nationality is the starting point. Residence, the purchasing structure, the exact property and its intended use complete the picture.</p></header><div>{investorRoutes.map(item => <article id={item.id} className="compliance-route" key={item.id}><div><span className="eyebrow">{item.number} / {item.label}</span><h3>{item.title}</h3></div><div><p>{item.answer}</p><p>{item.detail}</p><SourceLinks sources={item.sources} /></div></article>)}</div></section>
    <section id="purchase-checks" className="compliance-checks" aria-labelledby="purchase-checks-title"><div className="wrap"><header><span className="eyebrow">Malta investment due diligence / A practical brief</span><h2 id="purchase-checks-title">Four checks.<br /><em>Before the next step.</em></h2><p>Bring the available information to the appropriate professional. A purchase permission, a clear title and a lawful income use each need their own assessment.</p></header><ol>{checks.map(([heading,body],i) => <li key={heading}><span className="eyebrow">0{i + 1}</span><h3>{heading}</h3><p>{body}</p></li>)}</ol><p className="compliance-documents-note">Start your Wiele enquiry with your property goals, location, budget and proposed purchasing structure. Keep passports, residence cards and bank documents for the secure process agreed with your appointed professional.</p></div></section>
    <section className="investment-faq wrap compliance-faq" aria-labelledby="compliance-questions"><div><span className="eyebrow">Malta property investment / Legal FAQs</span><h2 id="compliance-questions">The questions<br /><em>before the commitment.</em></h2><p>Clear starting answers for local and international buyers. Expand each question for the relevant guidance and official source.</p><Link href="/buying" className="text-link">Explore the buyer experience <Arrow /></Link></div><div>{complianceFaqs.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p>{item.sources.length > 0 && <SourceLinks sources={item.sources} />}</details>)}</div></section>
    <section className="compliance-official wrap" aria-labelledby="official-sources-title"><div><span className="eyebrow">Malta legislation &amp; competent authorities</span><h2 id="official-sources-title">Read the source.<br /><em>Confirm the application.</em></h2><p>The links below support this guide. Current legislation, individual permit conditions and advice on your transaction take precedence over a general summary. No regulatory approval of Wiele is implied.</p></div><SourceLinks sources={Object.keys(complianceSources) as ComplianceSource[]} /></section>
    <section className="onboarding-invitation wrap"><div><span className="eyebrow">Malta property / Your next step</span><h2>Prepare your brief.</h2><p>Start with the facts and see which documents to gather.</p></div><div className="button-row"><Link className="button" href="/investor-onboarding">Investor onboarding <Arrow diagonal /></Link><Link className="text-link" href="/seller-onboarding">Seller onboarding <Arrow /></Link></div></section>
    <ContactBand />
  </>;
}
