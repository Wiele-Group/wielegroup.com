import Link from "next/link";
import Image from "next/image";
import { ExperienceHero } from "@/components/property/experience-hero";
import { InvestmentScenario } from "@/components/property/investment-scenario";
import { StructuredData } from "@/components/property/structured-data";
import { Arrow, ContactBand } from "@/components/property/chrome";
import { propertyFaqs } from "@/lib/property-faqs";
import { propertyBrand } from "@/lib/property";

const perspectives = [
  { number: "01", title: "Your next investment.", subtitle: "For buyers & investors", image: "premium-interior.webp", description: "A first apartment. An income-producing asset. A wider portfolio. Start with the brief that matters to you.", href: "/buying", action: "The buyer perspective", alt: "AI-created interior concept with natural materials and contemporary furniture" },
  { number: "02", title: "Your property's potential.", subtitle: "For property owners", image: "modern-malta-apartments-concept.webp", description: "Present your asset with a clear story, considered photography and the information a buyer needs to assess it.", href: "/selling", action: "The owner perspective", alt: "AI-created contemporary limestone apartment façade concept" },
];

export default function Home() {
  return <div className="cinema-home">
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${propertyBrand.url}/#webpage`, url: `${propertyBrand.url}/`, name: "Malta Investment Real Estate | Wiele Investments", description: propertyBrand.description, inLanguage: "en-GB", isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, mainEntity: propertyFaqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
    <ExperienceHero />
    <div className="cinema-index"><span>Rooted in Malta. Looking beyond.</span><nav aria-label="On this page"><a href="#perspectives">Your perspective <span>01</span></a><a href="#research">The intelligence <span>02</span></a><a href="#malta">A sense of place <span>03</span></a></nav></div>

    <section id="discover" className="cinema-intro cinema-wrap">
      <div className="cinema-section-label"><span>01 / A considered approach</span><span>Independent. Individual. Wiele.</span></div>
      <div className="cinema-intro-grid"><h2>Look beyond<br />the <em>address.</em></h2><div><p className="cinema-lead">The asset. The income.<br />The detail that makes the difference.</p><p>A property is a place. An investment is a decision. Wiele brings the two into focus through property marketing, buyer introductions and a clear understanding of your goals.</p><p>Based in Swieqi, Malta. For local and international buyers, investors and property owners.</p><Link className="cinema-text-link" href="/about">Discover our approach <Arrow diagonal /></Link></div></div>
    </section>

    <section id="perspectives" className="cinema-perspectives cinema-wrap">
      <div className="cinema-section-label"><span>Choose your perspective</span><span>Malta / Property & possibility</span></div>
      <div className="cinema-property-grid">{perspectives.map(item => <article className="cinema-property" key={item.number}><Link className="cinema-property-image" href={item.href} aria-label={item.action}><Image src={`/property/${item.image}`} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /><span className="cinema-image-number">{item.number}</span><span className="cinema-image-arrow"><Arrow diagonal /></span><span className="cinema-image-caption">AI-created concept · not a property for sale</span></Link><div className="cinema-property-copy"><span className="cinema-eyebrow">{item.subtitle}</span><h3><Link href={item.href}>{item.title}</Link></h3><p>{item.description}</p><Link className="cinema-text-link" href={item.href}>{item.action}<Arrow diagonal /></Link></div></article>)}</div>
      <div className="cinema-availability"><div><span className="cinema-status-dot" /><span>The collection is taking shape.</span><small>No properties are currently advertised.</small></div><Link href="/properties">About the collection <Arrow /></Link></div>
    </section>

    <section id="research" className="cinema-research"><div className="cinema-wrap cinema-research-grid"><div className="cinema-research-copy"><span className="cinema-eyebrow">02 / The Wiele intelligence</span><h2>More than<br />a <em>first impression.</em></h2><p>Understand the market behind the address. Explore the evidence, the operating detail and the questions worth asking before your next property decision.</p><Link className="cinema-button" href="/malta-investment-report">Explore the Malta report <Arrow diagonal /></Link><Link className="cinema-text-link" href="/articles">Read Wiele Articles <Arrow diagonal /></Link><span className="cinema-research-note">Malta investment real estate / Research & perspectives</span></div><Link className="cinema-publication" href="/malta-investment-report" aria-label="Read the Malta Investment Property Report"><span className="cinema-publication-ring" aria-hidden="true" /><Image src="/property/report-research-20261102-cover.jpg" width={420} height={594} alt="Wiele Malta Investment Property Report, November 2026 edition" /><span className="cinema-publication-caption">The Malta perspective <Arrow diagonal /></span></Link></div></section>

    <section id="malta" className="cinema-place"><Image src="/property/malta-harbour.webp" alt="Valletta waterfront and dome across the harbour in Malta, photographed by Ludovica Dri" fill sizes="100vw" /><div className="cinema-place-shade" /><div className="cinema-place-copy"><span className="cinema-eyebrow">03 / An island. A world of perspective.</span><h2>Small island.<br /><em>Wider horizons.</em></h2><p>The harbour. The limestone. The streets behind the waterfront. Place is part of every property decision.</p><Link className="cinema-button" href="/contact?interest=buying">Tell us where you see yourself <Arrow diagonal /></Link></div><span className="cinema-place-credit">Valletta, Malta · Ludovica Dri / Unsplash · location photograph</span></section>

    <section className="cinema-process cinema-wrap"><div className="cinema-section-label"><span>Clarity, from the first conversation</span><span>Malta / The Wiele approach</span></div><div className="cinema-process-grid"><h2>Your ambition.<br /><em>A clear direction.</em></h2><div>{[
      ["01", "Start with your brief.", "Your priorities, preferred locations, budget and timing give the conversation a clear direction."],
      ["02", "Look at the evidence.", "Separate the property story from the supporting facts: income, costs, condition and material limitations."],
      ["03", "Define the next step.", "Agree the scope, introductions and specialist involvement. Sales documentation is handled by appropriately licensed practitioners."],
    ].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

    <InvestmentScenario />
    <section className="cinema-care cinema-wrap"><figure><Image src="/property/premium-detail.webp" alt="AI-created material study of limestone and natural interior details" fill sizes="(max-width: 760px) 100vw, 45vw" /><figcaption>Material study · AI-created concept</figcaption></figure><div><span className="cinema-eyebrow">For the property you already own</span><h2>Care for<br />what <em>comes next.</em></h2><p>From a single repair to a considered refresh. Wiele-managed property maintenance in Malta, with the work, access and charges agreed around your property.</p><Link className="cinema-text-link" href="/property-maintenance">Explore property maintenance <Arrow diagonal /></Link></div></section>
    <section className="investment-faq wrap" aria-labelledby="investment-questions"><div><span className="eyebrow">Malta investment property / Your questions</span><h2 id="investment-questions">A clearer picture.<br /><em>Before your next move.</em></h2><p>Practical answers for buyers, investors and property owners in Malta and abroad.</p></div><div className="investment-faq-list">{propertyFaqs.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}<Link className="text-link" href="/contact">Discuss your property goals <Arrow /></Link></div></section>
    <ContactBand />
  </div>;
}
