import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow, ContactBand, PageIntro } from "@/components/property/chrome";
import { StructuredData } from "@/components/property/structured-data";
import { WieleAlgorithm } from "@/components/property/wiele-algorithm";
import { propertyBrand, propertyMetadata } from "@/lib/property";

const description = "The Wiele Algorithm guides Malta-based property, yacht and classic-car mandates across the UK, Europe and South Africa. Explore how Wiele evaluates each brief.";
export const metadata: Metadata = propertyMetadata("The Wiele Algorithm | Asset Brokerage", description, "/wiele-algorithm");
const faqs = [
 { question: "What is The Wiele Algorithm?", answer: "The Wiele Algorithm is Wiele Investments’ own brokerage approach. It connects the individual asset, the buyer’s purpose and the seller’s priorities, supported by considered presentation, relevant conversations and clear next steps." },
 { question: "Why choose Wiele to sell an asset?", answer: "Wiele brings a direct relationship and an asset-specific approach to presentation and buyer conversations. Your objectives and confidentiality preferences shape the proposed engagement. Scope, costs and specialist involvement are explained before an instruction is agreed." },
 { question: "How does Wiele help buyers?", answer: "Your intended use, priorities and questions guide the conversation. Wiele helps clarify the available asset information and the next decisions, with independent practitioners responsible for the legal, tax and technical advice appropriate to your purchase." },
 { question: "Can my sale remain discreet?", answer: "You can discuss a confidential approach from the first conversation. The information that may be shared and the proposed exposure are agreed for the engagement. Discretion can affect reach and must suit your objectives." },
 { question: "Which assets and markets can I discuss?", answer: "Property is Wiele’s core, complemented by yachts and classic cars. Wiele is based in Malta and welcomes enquiries from the UK, Europe and South Africa. Asset availability, geographic coverage and the responsible practitioners are confirmed individually." },
 { question: "Does The Wiele Algorithm guarantee a sale or purchase?", answer: "No. Price, availability, condition, buyer circumstances and legal requirements affect each transaction. Wiele agrees the proposed service and next steps; it does not promise a buyer, sale price, completion date or investment return." },
];
const dimensions = [
  { number: "01", title: "Financial & Currency Readiness", description: "Set out the budget or price expectations, funding position and working currency. Identify where exchange-rate movements and acquisition costs could affect the brief." },
  { number: "02", title: "Cross-Border Jurisdiction Fit", description: "Identify where the asset is located and where it will be used or registered. Flag ownership, tax and registration questions for the appropriate independent practitioners." },
  { number: "03", title: "Asset Utility & Evidence", description: "Compare the intended use with what the available records support, from property tenure and condition to yacht surveys and classic-car provenance." },
  { number: "04", title: "Mandate Alignment & Timing", description: "Agree the priorities, confidentiality preferences and decision deadlines. Flag any dependencies that could affect when the mandate can progress." },
];

const dossiers = [
  { category: "Property", title: "Cape Peninsula Villa", href: "/flagship-examples/cape-villa.html" },
  { category: "Yachts", title: "Ligurian Motor Yacht", href: "/flagship-examples/ligurian-yacht.html" },
  { category: "Classic cars", title: "Oxfordshire Coupé", href: "/flagship-examples/oxfordshire-coupe.html" },
];

export default function AlgorithmPage() {
 return <div className="algorithm-showcase">
  <PageIntro path="/wiele-algorithm" eyebrow="Malta-based asset brokerage / The Wiele Algorithm" title="A listing is only the beginning." description="Your asset. Their ambition. One considered conversation. Discover Wiele Investments’ own approach to your next property, yacht or classic-car sale or purchase." />
  <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${propertyBrand.url}/wiele-algorithm#questions`, mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }} />
  <section className="algorithm-statement wrap" aria-labelledby="algorithm-statement-title"><div><span className="eyebrow">The Wiele Algorithm</span><h2 id="algorithm-statement-title">Built around the asset.<br /><em>Focused on your next move.</em></h2></div><div><p>An advert introduces an asset. The decisions around it deserve equal attention.</p><p>Wiele brings the presentation, the buyer conversation and the next step into a connected engagement. For sellers, that means a considered proposition and exposure aligned with your objectives. For buyers, it means a discussion shaped around what the asset needs to do for you.</p><p>South African roots. A Malta base. An international outlook. A direct relationship throughout the agreed engagement.</p><div className="button-row"><Link className="button" href="/selling#sales-brief">I have an asset to sell <Arrow diagonal /></Link><Link className="text-link" href="/buying">I am planning a purchase <Arrow diagonal /></Link></div></div></section>
  <figure className="algorithm-image wrap"><Image src="/property/wiele-global-residences-20261113.webp" width={1672} height={941} sizes="(max-width:760px) 100vw, 1200px" alt="AI-created architectural residence concept illustrating Wiele’s property focus; not a property offered for sale" /><figcaption><span className="algorithm-study-badge">Illustrative Dossier Study · AI-created concept</span><span>Not an asset offered for sale.</span></figcaption><div className="algorithm-image-line" aria-hidden="true">Individual assets.<br /><em>Individual ambitions.</em></div></figure>
  <section className="algorithm-editorial wrap" aria-labelledby="algorithm-dimensions-title">
   <span className="eyebrow">The Wiele Algorithm / Mandate assessment</span>
   <h2 id="algorithm-dimensions-title">Four dimensions of a mandate.</h2>
   <p>Wiele assesses property, yacht and classic-car briefs across four dimensions to identify what is clear, what needs checking and what to discuss next.</p>
   <ol className="algorithm-dimension-grid" role="list">
    {dimensions.map(({ number, title, description }) => (
     <li key={number}>
      <span className="eyebrow-index" aria-hidden="true">{number} / 04</span>
      <h3>{title}</h3>
      <p>{description}</p>
     </li>
    ))}
   </ol>
  </section>
  <section className="algorithm-editorial wrap" aria-labelledby="algorithm-placement-title">
   <span className="eyebrow">UK · Europe · South Africa / Buyer reach</span>
   <h2 id="algorithm-placement-title">Confidentiality vs. targeted reach.</h2>
   <p>From Malta, Wiele agrees what can be shared, with whom and when, before approaching buyers in the relevant markets.</p>
   <div className="algorithm-placement-grid">
    <article>
     <h3>Private Off-Market Placement</h3>
     <p>For owners prioritising discretion, Wiele agrees what to disclose at each stage and limits circulation to selected buyer conversations. Restricted circulation can narrow the pool of prospective buyers.</p>
    </article>
    <article>
     <h3>Targeted Direct-to-Buyer Mandates</h3>
     <p>When an owner authorises broader outreach, Wiele focuses on relevant buyer requirements in the UK, Europe and South Africa. Market selection follows the asset, the agreed mandate and the scope Wiele can support.</p>
    </article>
   </div>
  </section>
  <section className="algorithm-editorial wrap" aria-labelledby="algorithm-resources-title">
   <span className="eyebrow">The Wiele Algorithm / Tools &amp; examples</span>
   <h2 id="algorithm-resources-title">Prepare your brief. <em>Inspect the evidence.</em></h2>
   <div className="algorithm-resource-grid">
    <div>
     <h3>Interactive tools</h3>
     <ul className="algorithm-resource-list" role="list">
      <li><Link className="text-link" href="/#property-brief">Interactive Brief Builder <Arrow diagonal /></Link><p>Your brief choices stay in your browser until you submit an enquiry.</p></li>
      <li><Link className="text-link" href="/valuations#landed-cost-estimator">Total Landed Cost Estimator <Arrow diagonal /></Link><p>Explore indicative acquisition costs or net seller proceeds.</p></li>
     </ul>
    </div>
    <div>
     <h3>Open flagship dossiers</h3>
     <p>Inspect the published specifications, assumptions and evidence gaps. These fictional examples are open without registration and offer no assets for sale.</p>
     <ul className="algorithm-resource-list" role="list">
      {dossiers.map(({ category, title, href }) => <li key={href}><Link className="text-link" href={href}><span className="eyebrow-index">{category}</span>{title} <Arrow diagonal /></Link></li>)}
     </ul>
    </div>
   </div>
   <details className="algorithm-language-note">
    <summary><span className="eyebrow-index">AF</span> <span lang="af">Oor Die Wiele-algoritme</span></summary>
    <div lang="af">
     <p>Wiele Investments is in Malta gevestig en ontvang navrae oor eiendom, seiljagte en klassieke motors in die Verenigde Koninkryk, Europa en Suid-Afrika. Ons bespreek jou begroting en geldeenheid, die toepaslike jurisdiksie, die beoogde gebruik en beskikbare dokumentasie, asook jou doelwitte en tydsraamwerk.</p>
     <p>Ons spreek vooraf af watter inligting met voornemende kopers gedeel mag word. Konsultasies in Afrikaans en Engels is op afspraak beskikbaar.</p>
    </div>
   </details>
  </section>
  <WieleAlgorithm detailed showcase />
  <section className="investment-faq wrap" id="questions"><div><span className="eyebrow">The Wiele Algorithm / Your questions</span><h2>A clearer view.<br /><em>Before you begin.</em></h2></div><div className="investment-faq-list">{faqs.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div></section>
  <ContactBand />
 </div>;
}
