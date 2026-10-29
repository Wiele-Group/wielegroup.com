import { StructuredData } from "@/components/property/structured-data";
import { propertyFaqs } from "@/lib/property-faqs";
import { propertyBrand } from "@/lib/property";
import Link from "next/link";
import Image from "next/image";
import { Arrow, ContactBand } from "@/components/property/chrome";

const lifestyles = [
  { image: "apartment-exterior.webp", label: "01 / Income evidence", title: "Start with the income.", caption: "Distinguish collected rent, contracted rent and projected income.", alt: "Contemporary apartment building with glass balconies; illustrative stock photograph, not a Malta property listing", interest: "buying" },
  { image: "modern-malta-interior-concept.webp", label: "02 / Asset fundamentals", title: "Understand the property.", caption: "Assess location, condition, lease terms and future capital requirements.", alt: "AI-created contemporary Malta-inspired interior; not an actual property or listing", interest: "buying" },
  { image: "premium-detail.webp", label: "03 / Investor fit", title: "Define your mandate.", caption: "Match the asset to your budget, income objectives and holding period.", alt: "AI-created limestone and interior material study; not an actual property", interest: "buying" },
];

export default function Home() {
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${propertyBrand.url}/#webpage`, url: `${propertyBrand.url}/`, name: "Malta Investment Real Estate | Wiele Properties", description: propertyBrand.description, inLanguage: "en-GB", isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, mainEntity: propertyFaqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
    <section className="estate-hero" aria-labelledby="home-title">
      <Image className="estate-hero-image" src="/property/modern-malta-apartments-concept.webp" alt="AI-created modern Malta apartment concept; not an actual property or listing" fill sizes="100vw" priority fetchPriority="high" />
      <div className="estate-hero-shade" />
      <div className="estate-hero-content wrap">
        <span className="eyebrow">Investment real estate · Malta</span>
        <h1 id="home-title"><span>Malta Property.</span><br /><em>Global Ambition.</em></h1>
        <p>From your first apartment to your next portfolio.<br />Investment real estate in Malta, shaped around your goals.</p>
        <a className="hero-discover" href="#discover">Discover the Wiele approach <Arrow /></a>
      </div>
      <div className="hero-edition" aria-hidden="true"><span>W</span><span>Malta / A considered perspective</span></div>
      <div className="estate-hero-caption wrap"><span>Malta. A sense of place.</span><span>AI-created architectural concept</span></div>
    </section>

    <div className="journey-bar wrap" aria-label="Start your property enquiry">
      <Link href="/contact?interest=marketing"><span><span className="eyebrow">For property owners</span><strong>Present your investment property.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
      <Link href="/contact?interest=buying"><span><span className="eyebrow">For buyers & investors</span><strong>Share your investment brief.</strong></span><span className="journey-arrow"><Arrow diagonal /></span></Link>
    </div>

    <section id="discover" className="estate-introduction wrap">
      <div><span className="eyebrow">Independent. Individual. Wiele.</span><h2>The asset.<br /><em>The income. The detail.</em></h2></div>
      <div className="estate-introduction-copy"><p className="lead">An investment property needs more than a compelling photograph. Its income, costs and risks need a clear explanation.</p><p>Wiele brings a focused perspective to investment real estate in Malta. Whether you are based on the island or looking from abroad, we connect your property ambitions with an accurate brief, documented information and clear next steps.</p><Link className="text-link" href="/about">Meet Wiele <Arrow /></Link></div>
    </section>

    <section className="estate-lifestyles wrap">
      <div className="estate-section-heading"><div><span className="eyebrow">Apartments. Residences. Investment perspective.</span><h2>Look beyond the asking price.<br /><em>Understand the proposition.</em></h2></div><p>Income objectives. Operating costs. Lease quality.<br />The right questions come before a return claim.</p></div>
      <div className="estate-lifestyle-grid">{lifestyles.map(item => <Link key={item.title} className="estate-lifestyle" href={`/contact?interest=${item.interest}`}><div className="estate-lifestyle-image"><Image src={`/property/${item.image}`} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className="lifestyle-image-label">{item.label}</span><span className="lifestyle-image-arrow"><Arrow diagonal /></span></div><h3>{item.title}</h3><p>{item.caption}</p></Link>)}</div>
      <p className="imagery-note">Apartment photographs: illustrative stock photography, not Malta property listings. Valletta: location photography. No property shown here is offered for sale.</p>
    </section>

    <section className="estate-seller">
      <figure><Image src="/property/premium-detail.webp" alt="AI-created concept of limestone, natural materials and curated interior details" fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>Material study · AI-created</figcaption></figure>
      <div className="estate-seller-copy"><span className="eyebrow">For owners in Malta</span><h2>An income-producing asset.<br /><em>A clear investment case.</em></h2><p>We help owners present the property and the information investors need: income evidence, lease terms, operating costs, condition and material limitations. Marketing scope and any specialist involvement are agreed before work begins.</p><Link className="button button-gold" href="/selling">The seller experience <Arrow diagonal /></Link><span className="seller-small-note">Personal contact. Agreed scope. Clear next steps.</span></div>
    </section>

    <section className="estate-collection wrap"><div><span className="eyebrow">Investment opportunities / Taking shape</span><h2>The first chapter<br /><em>starts with a conversation.</em></h2></div><div><p>No properties are currently advertised. We’re building the collection around verified details and agreed marketing authority.</p><p>Considering an apartment, an income-producing residence or your next portfolio purchase? Share your requirements. No return or availability is implied by an enquiry.</p><Link className="text-link" href="/properties">About the collection <Arrow /></Link></div></section>

    <section className="estate-principles"><div className="wrap"><div className="estate-section-heading"><div><span className="eyebrow">The Wiele approach</span><h2>Considered, from<br /><em>the first conversation.</em></h2></div><Link className="text-link" href="/about">Our perspective <Arrow /></Link></div><div className="estate-principles-grid"><article><span className="eyebrow">01 / Personal</span><h3>A direct relationship.</h3><p>Speak with Jonathan Landman, the person shaping your property’s presentation and your next steps with Wiele.</p></article><article><span className="eyebrow">02 / Purposeful</span><h3>Details with meaning.</h3><p>Clear income definitions, relevant property details and transparent assumptions. Any investment return depends on the asset, costs and circumstances; it is not guaranteed.</p></article><article><span className="eyebrow">03 / Clear</span><h3>Know the next step.</h3><p>Marketing scope and costs agreed before work begins. Transaction documentation handled by appropriately licensed practitioners.</p></article></div></div></section>
    <section className="investment-faq wrap" aria-labelledby="investment-questions"><div><span className="eyebrow">Malta investment real estate / Your questions</span><h2 id="investment-questions">A clearer picture.<br /><em>Before your next move.</em></h2><p>Practical answers for buyers, investors and property owners in Malta and abroad.</p></div><div className="investment-faq-list">{propertyFaqs.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}<Link className="text-link" href="/contact">Discuss your property goals <Arrow /></Link></div></section>
    <section className="home-report wrap"><div><span className="eyebrow">The Wiele Properties report / October 2026</span><h2>Malta.<br /><em>A market in motion.</em></h2><p>Malta investment property: 2025 growth, the 2026 outlook and the detail behind an income-producing asset.</p><Link className="button" href="/malta-investment-report">Explore the report <Arrow diagonal /></Link></div><Link className="home-report-cover" href="/malta-investment-report" aria-label="Explore the Wiele Malta Investment Property Report"><Image src="/property/report-investment-2026-cover.jpg" width={420} height={594} alt="Wiele Properties Malta Investment Property Report cover" /></Link></section>
    <ContactBand />
  </>;
}
