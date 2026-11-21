import { WieleAlgorithm } from "@/components/property/wiele-algorithm";
import { BuyerAssetDossiers } from "@/components/property/asset-atlas";
import { BuyerBriefQuickStart } from "@/components/property/buyer-brief-quick-start";
import { InvestmentScenario } from "@/components/property/investment-scenario";
import type { Metadata } from "next";
import Link from "next/link";
import { propertyMetadata } from "@/lib/property";
import { Arrow, PageIntro } from "@/components/property/chrome";
export const metadata: Metadata = propertyMetadata("Buy a Residence or Investment Property", "Malta-based property acquisition enquiries for the UK, Europe and South Africa. Start a buyer brief, explore open dossiers and model illustrative rental yields.", "/buying");
const steps = [
 ["01 / Your requirements", "Define the property.", "Country, locality, intended use, purchase budget and currency, essential features and timing give your enquiry a clear starting point."],
 ["02 / The evidence", "Know what to assess.", "Ownership, condition, available documents and acquisition costs matter. For investments, separate collected income, contracted rent and projections."],
 ["03 / The next step", "Confirm the scope.", "Availability, market coverage, fees and the responsible practitioners are confirmed individually. Legal, tax, financing and technical questions need appropriate independent advice."],
];
export default function Buying() {
 return <>
  <PageIntro path="/buying" eyebrow="Malta-based / International property enquiries" title="Your next purchase deserves a clearer perspective." description="Malta-based property brokerage with an international outlook. A home to live in or an asset to invest in: The Wiele Algorithm starts with the purpose behind your purchase, so the conversation stays relevant to you." actions={<><a className="button" href="#buyer-briefs" data-site-action="buyer_brief">Choose your buyer brief</a><Link className="text-link" href="/purchase-guide">Explore purchase routes</Link></>} />
  <aside className="wrap"><Link className="purchase-inline-link" href="/purchase-guide">UK, European and South African property sales process, nationality and document requirements ↗</Link></aside>
  <BuyerBriefQuickStart/>
  <section className="wrap buyer-grid" aria-label="How a property enquiry progresses">{steps.map(([label,title,body]) => <article key={label}><span className="eyebrow">{label}</span><h2>{title}</h2><p>{body}</p></article>)}</section>
  <WieleAlgorithm />
  <section className="buyer-availability buyer-mandate wrap" aria-labelledby="buyer-mandate-title">
   <div>
    <span className="eyebrow">Private acquisition mandates</span>
    <h2 id="buyer-mandate-title">Start with your requirements.</h2>
    <p>Wiele starts with your purchase brief, then discusses geographic scope, availability and the terms of a private acquisition mandate. Market coverage, marketing authority, fees and responsible practitioners are confirmed for each engagement. Appropriately licensed practitioners in the relevant jurisdiction execute transaction documentation.</p>
    <p>Submitting a brief starts a discussion. Availability, reservations and any instruction require separate confirmation.</p>
    <Link className="text-link" href="/contact?interest=consortium">Discuss a property consortium <Arrow diagonal/></Link>
   </div>
   <div className="buyer-open-dossiers">
    <h3>Open property dossiers</h3>
    <p>Read sample prices, specifications and condition notes without registration.</p>
    <p className="listing-disclaimer">Illustrative concept · Not an asset offered for sale. Website imagery includes AI-created concepts.</p>
    <a className="text-link" href="/flagship-examples/cape-villa.html">Read Cape Peninsula Villa <Arrow diagonal/></a>
    <Link className="text-link" href="/properties">Explore the property collection <Arrow diagonal/></Link>
   </div>
  </section>
  <section className="buyer-tools"><details><summary className="wrap">Explore an illustrative property income scenario <span aria-hidden="true">+</span></summary><InvestmentScenario /></details></section>
  <BuyerAssetDossiers/>
 </>;
}
