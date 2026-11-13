import { GlobalPropertyGallery } from "@/components/property/global-property-gallery";
import { WieleAlgorithm } from "@/components/property/wiele-algorithm";
import Link from "next/link";
import Image from "next/image";
import { ExperienceHero } from "@/components/property/experience-hero";
import { InvestmentScenario } from "@/components/property/investment-scenario";
import { StructuredData } from "@/components/property/structured-data";
import { Arrow, ContactBand } from "@/components/property/chrome";
import { propertyFaqs } from "@/lib/property-faqs";
import { propertyBrand } from "@/lib/property";
import cinematicImages from "../../public/property/global-image-metadata-20261113.json";

const perspectives = [
  { number: "01", title: "Your next address.", subtitle: "For buyers & investors", image: "wiele-global-apartment-20261113.webp", description: "A city apartment. An architectural villa. A wine estate. Tell us where you want to buy and what matters to you.", href: "/buying", action: "The buyer perspective", alt: "AI-created luxury penthouse with a landscaped terrace and international city outlook" },
  { number: "02", title: "Your property's potential.", subtitle: "For property owners", image: "wiele-global-residences-20261113.webp", description: "A strategy built around your property, likely buyers and market evidence. Discover The Wiele Algorithm.", href: "/selling", action: "The owner perspective", alt: "AI-created contemporary luxury residences with planted balconies" },
];

export default function Home() {
  return <div className="cinema-home">
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${propertyBrand.url}/#faq`, url: `${propertyBrand.url}/`, name: "Global Property Sales | Wiele Investments", description: propertyBrand.description, inLanguage: "en-GB", isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, mainEntity: propertyFaqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
    <StructuredData data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${propertyBrand.url}/#webpage`, url: `${propertyBrand.url}/`, name: "Global Property Sales | Wiele Investments", description: propertyBrand.description, inLanguage: "en-GB", dateModified: "2026-11-13", isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, primaryImageOfPage: { "@id": `${propertyBrand.url}/property/wiele-global-villa-20261113.webp#image` }, hasPart: { "@id": `${propertyBrand.url}/#faq` } },
      ...cinematicImages.map(image => ({ "@type": "ImageObject", "@id": `${propertyBrand.url}/property/${image.file}#image`, contentUrl: `${propertyBrand.url}/property/${image.file}`, name: image.title, description: image.description, caption: image.description, creditText: image.creator, creator: { "@type": image.creator === "Ludovica Dri" ? "Person" : "Organization", name: image.creator }, width: image.width, height: image.height, isPartOf: { "@id": `${propertyBrand.url}/#webpage` } })),
    ] }} />
    <ExperienceHero />
    <div className="cinema-index"><span>South African roots. Global perspective.</span><nav aria-label="On this page"><a href="#perspectives">Your perspective <span>01</span></a><a href="#research">The intelligence <span>02</span></a><a href="#world">A wider world <span>03</span></a></nav></div>

    <section id="discover" className="cinema-intro cinema-wrap">
      <div className="cinema-section-label"><span>01 / A considered approach</span><span>Independent. Individual. Wiele.</span></div>
      <div className="cinema-intro-grid"><h2>Look beyond<br />the <em>address.</em></h2><div><p className="cinema-lead">A home. An investment.<br />A new part of the world.</p><p>Where you live and where you own property can be different places. Wiele brings an international outlook to property sales, connecting your ambitions with a considered property brief.</p><p>Our South African roots shape our story. Malta is our base. Global property sales is our direction — for buyers, investors and owners looking across borders.</p><Link className="cinema-text-link" href="/about">Discover our approach <Arrow diagonal /></Link></div></div>
    </section>

    <section id="perspectives" className="cinema-perspectives cinema-wrap">
      <div className="cinema-section-label"><span>Choose your perspective</span><span>International property / Individual ambitions</span></div>
      <div className="cinema-property-grid">{perspectives.map(item => <article className="cinema-property" key={item.number}><Link className="cinema-property-image" href={item.href} aria-label={item.action}><Image src={`/property/${item.image}`} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /><span className="cinema-image-number">{item.number}</span><span className="cinema-image-arrow"><Arrow diagonal /></span><span className="cinema-image-caption">AI-created concept · not a property for sale</span></Link><div className="cinema-property-copy"><span className="cinema-eyebrow">{item.subtitle}</span><h3><Link href={item.href}>{item.title}</Link></h3><p>{item.description}</p><Link className="cinema-text-link" href={item.href}>{item.action}<Arrow diagonal /></Link></div></article>)}</div>
      <div className="cinema-availability"><div><span className="cinema-status-dot" /><span>The collection is taking shape.</span><small>No properties are currently advertised.</small></div><Link href="/properties">About the collection <Arrow /></Link></div>
    </section>

    <section id="research" className="cinema-research"><div className="cinema-wrap cinema-research-grid"><div className="cinema-research-copy"><span className="cinema-eyebrow">02 / The Wiele intelligence</span><h2>More than<br />a <em>first impression.</em></h2><p>From Cape Town and Europe to Dubai, London and Malta. Explore our illustrated global luxury property report, with current market evidence, changing buyer priorities and a conditional outlook for 2027–2030.</p><Link className="cinema-button" href="/research/global-luxury-property-report-2026">Explore the global report <Arrow diagonal /></Link><Link className="cinema-text-link" href="/research">Browse Wiele research <Arrow diagonal /></Link><span className="cinema-research-note">27-page illustrated PDF / Registration required</span></div><Link className="cinema-publication" href="/research/global-luxury-property-report-2026" aria-label="Explore the Global Luxury Property Market Report"><span className="cinema-publication-ring" aria-hidden="true" /><Image src="/property/global-report-cover-20261113.jpg" width={621} height={877} alt="Global Luxury Property Market Report cover; AI-created fictional coastal villa" /><span className="cinema-publication-caption">The global perspective <Arrow diagonal /></span></Link></div></section>

    <section id="world" className="cinema-place"><Image src="/property/wiele-global-wine-estate-20261113.webp" alt="AI-created private wine estate with contemporary architecture, vineyards and a mountain backdrop" fill sizes="100vw" /><div className="cinema-place-shade" /><div className="cinema-place-copy"><span className="cinema-eyebrow">03 / A world of possibility</span><h2>Where do you<br /><em>see yourself?</em></h2><p>City living. A coastal retreat. A private estate among the vines. Your next chapter starts with the place you want to be.</p><Link className="cinema-button" href="/contact?interest=buying">Tell us where you see yourself <Arrow diagonal /></Link></div><span className="cinema-place-credit">Private wine estate · AI-created concept · not a property for sale</span></section>

    <GlobalPropertyGallery />
    <WieleAlgorithm />

    <InvestmentScenario />
    <section className="investment-faq wrap" aria-labelledby="investment-questions"><div><span className="eyebrow">Global property sales / Your questions</span><h2 id="investment-questions">A clearer picture.<br /><em>Before your next move.</em></h2><p>Practical answers about Wiele, international enquiries and the next step for your property ambitions.</p></div><div className="investment-faq-list">{propertyFaqs.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}<Link className="text-link" href="/contact">Discuss your property goals <Arrow /></Link></div></section>
    <ContactBand />
  </div>;
}
