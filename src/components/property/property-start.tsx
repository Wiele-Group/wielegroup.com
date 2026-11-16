import Link from "next/link";
import { Arrow } from "./chrome";

const journeys = [
 { number: "01", title: "A place to call yours.", label: "Buy a residence", body: "Define the country, location and way you want to live. Start with your priorities, purchase budget and timing.", href: "/contact?interest=buying&focus=residence", action: "Share a residence brief", event: "residence" },
 { number: "02", title: "An investment to assess.", label: "Invest in property", body: "Put the income, costs and risks in context. Tell us your property requirements, funding position and holding period.", href: "/contact?interest=buying&focus=income", action: "Share an investment brief", event: "investment" },
 { number: "03", title: "A property to bring to market.", label: "Sell your property", body: "Start with your property, its location and your objectives. Explore a marketing strategy shaped around the evidence.", href: "/contact?interest=marketing", action: "Discuss your property", event: "seller" },
 { number: "04", title: "A wider world of assets.", label: "Yachts & classic cars", body: "Beyond property: explore yachts and classic cars. Share an acquisition brief or introduce an asset for sale.", href: "/luxury-assets", action: "Explore luxury assets", event: "luxury-assets" },
];

export function PropertyStart() {
  return <section id="discover" className="property-start cinema-wrap" aria-labelledby="property-start-title">
    <div className="cinema-section-label"><span>Malta-based / Global asset brokerage</span><span>Your starting point</span></div>
    <div className="property-start-heading"><h2 id="property-start-title">Your ambition.<br /><em>A clear first step.</em></h2><div><p>Property is at the heart of Wiele. From a first residence to an investment portfolio, start with your ambitions. Explore yachts and classic cars through our complementary luxury asset categories.</p><p className="property-start-status"><strong>Current availability</strong> No properties, yachts or classic cars are currently advertised. Availability, country coverage and specialist involvement are confirmed for each enquiry.</p></div></div>
    <div className="property-start-grid">{journeys.map(journey => <Link className="property-start-card" href={journey.href} key={journey.event} data-property-journey={journey.event}><span className="property-start-label"><span>{journey.number} / {journey.label}</span><Arrow diagonal /></span><h3>{journey.title}</h3><p>{journey.body}</p><span className="property-start-action">{journey.action}<Arrow diagonal /></span></Link>)}</div>
    <div className="property-start-evidence"><span className="cinema-eyebrow">What informs the next step</span><ul><li>Property particulars &amp; material limitations</li><li>Income basis &amp; costs, where relevant</li><li>Scope, charges &amp; practitioner involvement</li></ul><Link className="cinema-text-link" href="/about#wiele-algorithm">How Wiele approaches your property <Arrow diagonal /></Link></div>
  </section>;
}
