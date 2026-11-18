import Link from "next/link";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";
import { Arrow } from "@/components/property/chrome";

const benefits = [
  { title: "For sellers", headline: "Give your asset a considered advantage.", copy: "A clear proposition, relevant buyer conversations and exposure suited to your objectives. Your asset deserves attention with a purpose.", href: "/selling", action: "Discuss your sale" },
  { title: "For buyers", headline: "Make your next move with a clearer view.", copy: "Your intended use, priorities and questions lead the conversation. Understand the asset and the decisions ahead before making a commitment.", href: "/buying", action: "Discuss your purchase" },
  { title: "Your relationship", headline: "Keep the conversation connected.", copy: "A direct point of contact brings the brief, presentation and next steps together. Scope, fees and specialist involvement are agreed for your engagement.", href: "/contact", action: "Start a conversation" },
];

export function WieleAlgorithm({ detailed = false, showcase = false }: { detailed?: boolean; showcase?: boolean }) {
  return <section id="wiele-algorithm" className="wrap process-section wiele-algorithm" aria-labelledby="algorithm-title">
    {detailed && <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${propertyBrand.url}/wiele-algorithm#approach`, name: "The Wiele Algorithm", url: `${propertyBrand.url}/wiele-algorithm`, description: "Malta-based asset brokerage shaped around the individual asset and the person behind the next move. Wiele Investments’ own approach connects considered presentation, relevant buyer conversations and clear next steps.", inLanguage: "en-GB", author: { "@id": `${propertyBrand.url}/#organization` }, about: { "@id": `${propertyBrand.url}/#organization` } }} />}
    <span className="eyebrow">Malta-based asset brokerage / The Wiele Algorithm</span>
    <h2 id="algorithm-title">A different approach<br /><em>to your next move.</em></h2>
    <p className="algorithm-intro">An asset has a price. A purchase has a purpose. The Wiele Algorithm brings both into the same conversation.</p>
    <p className="algorithm-intro">Wiele Investments’ own brokerage approach connects considered presentation, relevant buyer conversations and clear next steps. Property is our core, complemented by yachts and classic cars. Your objectives shape the engagement.</p>
    {detailed && <div className="algorithm-benefits">{benefits.map(item => <article key={item.title}><span className="eyebrow">{item.title}</span><h3>{item.headline}</h3><p>{item.copy}</p><Link className="text-link" href={item.href}>{item.action} <Arrow diagonal /></Link></article>)}</div>}
    <div className="button-row"><Link className="button" data-algorithm-action="learn_more" href={showcase ? "/selling#sales-brief" : "/wiele-algorithm"}>{showcase ? "Introduce your asset" : "Discover The Wiele Algorithm"} <Arrow diagonal /></Link><Link className="text-link" href="/contact">Discuss your next move <Arrow diagonal /></Link></div>
  </section>;
}
