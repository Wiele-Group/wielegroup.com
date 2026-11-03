import { MarketContext } from "@/components/property/market-context";
import { InvestmentInformation } from "@/components/property/investment-information";
import { ExperienceHero } from "@/components/property/experience-hero";
import { PerspectiveGallery } from "@/components/property/perspective-gallery";
import { InvestmentScenario } from "@/components/property/investment-scenario";
import { IntentConcierge } from "@/components/property/intent-concierge";
import { ComplianceIntroduction } from "@/components/property/compliance-introduction";
import { MaintenanceIntroduction } from "@/components/property/maintenance-introduction";
import { PersonalIntroduction } from "@/components/property/personal-introduction";
import { StructuredData } from "@/components/property/structured-data";
import { propertyFaqs } from "@/lib/property-faqs";
import { propertyBrand } from "@/lib/property";
import Link from "next/link";
import Image from "next/image";
import { Arrow, ContactBand } from "@/components/property/chrome";

export default function Home() {
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${propertyBrand.url}/#webpage`, url: `${propertyBrand.url}/`, name: "Malta Investment Real Estate | Wiele Properties", description: propertyBrand.description, inLanguage: "en-GB", isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, mainEntity: propertyFaqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
    <ExperienceHero />

    <div className="journey-bar wrap" aria-label="Start your property enquiry">
      <Link href="/contact?interest=marketing"><span><span className="eyebrow">For property owners</span><strong>Present your investment property.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
      <Link href="/contact?interest=buying"><span><span className="eyebrow">For buyers & investors</span><strong>Share your investment brief.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
    </div>

    <section id="discover" className="estate-introduction wrap">
      <div><span className="eyebrow">Independent. Individual. Wiele.</span><h2>The asset.<br /><em>The income. The detail.</em></h2></div>
      <div className="estate-introduction-copy"><p className="lead">An investment property needs more than a compelling photograph. Its income, costs and risks need a clear explanation.</p><p>Wiele brings a focused perspective to investment real estate in Malta. Whether you are based on the island or looking from abroad, we connect your property ambitions with an accurate brief, documented information and clear next steps.</p><Link className="text-link" href="/about">Meet Wiele <Arrow /></Link></div>
    </section>

    <InvestmentInformation />
    <PersonalIntroduction />
    <IntentConcierge />

    <section className="home-report wrap"><div><span className="eyebrow">The Wiele Properties report / Updated November 2026</span><h2>Malta.<br /><em>A market in motion.</em></h2><p>Malta investment property: revised 2025 results, the latest 2026 evidence and the detail behind an income-producing asset.</p><Link className="button" href="/malta-investment-report">Explore the report <Arrow diagonal /></Link></div><div className="report-object-stage"><span className="report-stage-label" aria-hidden="true">The Wiele perspective</span><Link className="home-report-cover" href="/malta-investment-report" aria-label="Explore the Wiele Malta Investment Property Report"><span className="report-object"><Image src="/property/report-research-20261102-cover.jpg" width={420} height={594} alt="Wiele Properties Malta Investment Property Report cover" /></span><span className="report-object-caption" aria-hidden="true">Explore the report <Arrow diagonal /></span></Link></div></section>
    <section className="home-articles-link wrap"><span className="eyebrow">Malta investment property / Articles</span><h2>The income. The operation.<br/><em>The opportunity.</em></h2><p>Research on income-producing real estate, established going concerns and properties with potential. Our latest article examines Malta short lets and the 2026 operating rules.</p><Link className="text-link" href="/articles">Explore Wiele Articles <Arrow diagonal /></Link></section>
    <MarketContext />
    <PerspectiveGallery />
    <InvestmentScenario />

    <section className="estate-seller">
      <figure><Image src="/property/premium-detail.webp" alt="AI-created concept of limestone, natural materials and curated interior details" fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>Material study · AI-created</figcaption></figure>
      <div className="estate-seller-copy"><span className="eyebrow">For owners in Malta</span><h2>An income-producing asset.<br /><em>A clear investment case.</em></h2><p>We help owners present the property and the information investors need: income evidence, lease terms, operating costs, condition and material limitations. Marketing scope and any specialist involvement are agreed before work begins.</p><Link className="button button-gold" href="/selling">The seller experience <Arrow diagonal /></Link><span className="seller-small-note">Personal contact. Agreed scope. Clear next steps.</span></div>
    </section>


    <section className="estate-collection wrap"><div><span className="eyebrow">Investment opportunities / Taking shape</span><h2>The first chapter<br /><em>starts with a conversation.</em></h2></div><div><p>No properties are currently advertised. We’re building the collection around verified details and agreed marketing authority.</p><p>Considering an apartment, an income-producing residence or your next portfolio purchase? Share your requirements. No return or availability is implied by an enquiry.</p><Link className="text-link" href="/properties">About the collection <Arrow /></Link></div></section>

    <section className="malta-place wrap" aria-labelledby="malta-place-title"><div className="malta-place-heading"><span className="eyebrow">Malta property / A sense of place</span><h2 id="malta-place-title">The setting is part of the decision.</h2><p>From the waterfront to the streets behind it. A property brief starts with the places, surroundings and everyday requirements that matter to you.</p></div><div className="malta-place-images"><figure><Image src="/property/malta-harbour.webp" alt="Valletta skyline and waterfront in Malta" width={1800} height={1800} sizes="(max-width: 760px) 100vw, 60vw" /><figcaption>Valletta waterfront · photograph by Ludovica Dri</figcaption></figure><figure><Image src="/property/valletta-balconies.webp" alt="Traditional enclosed Maltese balconies on limestone buildings" width={1000} height={723} sizes="(max-width: 760px) 100vw, 35vw" /><figcaption>Traditional Maltese balconies · photograph by Intrepid</figcaption></figure></div><div className="malta-place-foot"><span>Location photography · not properties offered for sale</span><Link className="text-link" href="/credits">Photography credits <Arrow /></Link></div></section>
    <MaintenanceIntroduction />
    <section className="investment-faq wrap" aria-labelledby="investment-questions"><div><span className="eyebrow">Malta investment real estate / Your questions</span><h2 id="investment-questions">A clearer picture.<br /><em>Before your next move.</em></h2><p>Practical answers for buyers, investors and property owners in Malta and abroad.</p></div><div className="investment-faq-list">{propertyFaqs.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}<Link className="text-link" href="/contact">Discuss your property goals <Arrow /></Link></div></section>

    <ComplianceIntroduction />
    <ContactBand />
  </>;
}
