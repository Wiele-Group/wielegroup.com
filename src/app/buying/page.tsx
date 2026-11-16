import { InvestmentScenario } from "@/components/property/investment-scenario";
import type { Metadata } from "next";
import Link from "next/link";
import { propertyMetadata } from "@/lib/property";
import { Arrow, PageIntro } from "@/components/property/chrome";
export const metadata: Metadata = propertyMetadata("Buy a Residence or Investment Property", "Malta-based property brokerage with an international outlook. Discuss a residence or investment property with Wiele, or explore our complementary luxury asset enquiries.", "/buying");
const steps = [
 ["01 / Your requirements", "Define the property.", "Country, locality, intended use, purchase budget and currency, essential features and timing give your enquiry a clear starting point."],
 ["02 / The evidence", "Know what to assess.", "Ownership, condition, available documents and acquisition costs matter. For investments, separate collected income, contracted rent and projections."],
 ["03 / The next step", "Confirm the scope.", "Availability, market coverage, fees and the responsible practitioners are confirmed individually. Legal, tax, financing and technical questions need appropriate independent advice."],
];
export default function Buying() {
 return <>
  <PageIntro path="/buying" eyebrow="Malta-based / International property enquiries" title="Find a property that fits your plans." description="A home to live in or a property to invest in. Start with the location, purpose and priorities behind your purchase. Wiele confirms market coverage and available opportunities for each enquiry." />
  <aside className="wrap"><Link className="purchase-inline-link" href="/purchase-guide">UK, European and South African property sales process, nationality and document requirements ↗</Link></aside>
  <section className="buyer-journeys wrap" aria-label="Choose your property brief">
   <article><span className="eyebrow">Your residence</span><h2>A home for<br /><em>the way you live.</em></h2><p>Tell us where you want to live, your budget and the features that matter: space, layout, outdoor areas, access and surroundings.</p><Link className="button" href="/contact?interest=buying&focus=residence">Discuss a residence <Arrow diagonal /></Link></article>
   <article><span className="eyebrow">Your investment</span><h2>A property.<br /><em>A clear rationale.</em></h2><p>Set out your preferred market, property type, income objectives and holding period. Assess the evidence, operating costs and downside assumptions.</p><Link className="button" href="/contact?interest=buying&focus=income">Discuss an investment <Arrow diagonal /></Link><Link className="text-link" href="/investor-onboarding">Prepare a detailed property brief <Arrow /></Link></article>
  </section>
  <section className="wrap buyer-grid" aria-label="How a property enquiry progresses">{steps.map(([label,title,body]) => <article key={label}><span className="eyebrow">{label}</span><h2>{title}</h2><p>{body}</p></article>)}</section>
  <section className="buyer-availability wrap"><span className="eyebrow">Current availability</span><h2>Start with your requirements.</h2><p>No properties are currently advertised. Website imagery is illustrative. A brief starts a discussion; it does not establish available stock, a reservation or an accepted instruction.</p><Link className="text-link" href="/properties">About the property collection <Arrow /></Link><Link className="text-link" href="/contact?interest=consortium">Discuss a property consortium <Arrow /></Link></section>
  <section className="buyer-tools"><details><summary className="wrap">Explore an illustrative property income scenario <span aria-hidden="true">+</span></summary><InvestmentScenario /></details></section>
  <section className="complementary-enquiries wrap"><div><span className="eyebrow">Beyond property</span><h2>Yachts<br /><em>and classic cars.</em></h2><p>Explore our complementary asset categories and choose an acquisition or sales enquiry.</p></div><Link className="button" href="/luxury-assets">Explore luxury assets <Arrow diagonal /></Link></section>
 </>;
}
