import Link from "next/link";
import { Arrow } from "@/components/property/chrome";

const benefits = [
  { title: "For sellers", headline: "Give your asset a considered advantage.", copy: "A clear proposition, relevant buyer conversations and exposure suited to your objectives. Your asset deserves attention with a purpose.", href: "/selling", action: "Discuss your sale" },
  { title: "For buyers", headline: "Make your next move with a clearer view.", copy: "Your intended use, priorities and questions lead the conversation. Understand the asset and the decisions ahead before making a commitment.", href: "/buying", action: "Discuss your purchase" },
  { title: "Your relationship", headline: "Keep the conversation connected.", copy: "A direct point of contact brings the brief, presentation and next steps together. Scope, fees and specialist involvement are agreed for your engagement.", href: "/contact", action: "Start a conversation" },
];

export function OriginationIntroduction() {
  return <section id="origination-protocol" className="wrap process-section origination-introduction" aria-labelledby="origination-intro-title">
    <span className="eyebrow">Malta-based asset brokerage / Wiele Origination Protocol</span>
    <h2 id="origination-intro-title">A different approach<br /><em>to your next move.</em></h2>
    <p className="origination-intro">An asset has a price. A purchase has a purpose. Wiele Origination Protocol brings both into the same conversation.</p>
    <p className="origination-intro">Wiele Investments’ own brokerage approach connects considered presentation, relevant buyer conversations and clear next steps. Property is our core, complemented by yachts and classic cars. Your objectives shape the engagement.</p>
    <div className="origination-benefits">{benefits.map(item => <article key={item.title}><span className="eyebrow">{item.title}</span><h3>{item.headline}</h3><p>{item.copy}</p><Link className="text-link" href={item.href}>{item.action} <Arrow diagonal /></Link></article>)}</div>
    <div className="button-row"><Link className="button" data-site-action="origination_protocol" href="/origination-protocol">Explore the Origination Protocol <Arrow diagonal /></Link><Link className="text-link" href="/contact">Discuss your next move <Arrow diagonal /></Link></div>
  </section>;
}
