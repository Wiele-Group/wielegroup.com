import Link from "next/link";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";
import { Arrow } from "@/components/property/chrome";

export const algorithmSteps = [
  ["01", "Buyer mapping", "Identify the buyer archetype, intended use, decision-maker and advisers. Map asset fit, purchasing capacity, timing and the ownership motivation to test."],
  ["02", "Narrative & provenance", "Build a precise positioning statement around documented rarity, architecture, engineering, history or utility. Assemble the technical, historical and condition evidence needed to support the asking-price discussion."],
  ["03", "Sales channels", "Select a suitable mix of confidential professional introductions, specialist marketplaces and modern digital distribution. Agree pricing visibility, privacy, access, scope and costs before activation."],
  ["04", "Asset production", "Prioritise the evidence dossier, factual teaser and accurate documentary photography. Add plans, film, tours, editorial or private-sale copy where their role justifies the agreed production cost."],
  ["05", "90-day rollout", "Sequence confidential preparation, a controlled launch and an evidence-led market review. Track qualified enquiries, inspections, offers and transaction progress; agree any event, auction route or price adjustment with the seller."],
] as const;

export function WieleAlgorithm({ detailed = false }: { detailed?: boolean }) {
  return <section id="wiele-algorithm" className="wrap process-section wiele-algorithm" aria-labelledby="algorithm-title">
    {detailed && <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${propertyBrand.url}/about#wiele-algorithm`, name: "The Wiele Algorithm", url: `${propertyBrand.url}/about#wiele-algorithm`, description: "Malta-based Wiele Investments’ sole asset sales and marketing process: mandatory asset intake, then buyer mapping, narrative and provenance, sales channels, asset production and a phased 90-day rollout.", inLanguage: "en-GB", author: { "@id": `${propertyBrand.url}/#organization` }, about: { "@id": `${propertyBrand.url}/#organization` }, hasPart: algorithmSteps.map(([position, name, description]) => ({ "@type": "CreativeWork", name, description, position: Number(position) })) }} />}
    <span className="eyebrow">International asset marketing / The Wiele Algorithm</span>
    <h2 id="algorithm-title">A strategy built around<br />your asset.</h2>
    <p className="algorithm-intro">Malta-based Wiele Investments shapes property and luxury asset sales around the asset, its evidence and likely buyers. Provenance, specification, condition and seller objectives determine the proposition and presentation.</p>
    <p className="algorithm-intro">Asset intake comes first: category, valuation context, liquidity, provenance and specifications, location, price and currency, authority, timing and privacy. Missing critical facts are clarified before the strategy. The five steps follow in sequence, with professional judgement and agreed review points.</p>
    {detailed ? <><div className="process-list">{algorithmSteps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <details className="algorithm-example"><summary>How a proposed 90-day sales plan unfolds <span aria-hidden="true">+</span></summary><div><p>The sequence starts after the instruction, evidence, scope and budget are agreed. Timing adapts to the asset; it is not a promised sale deadline.</p><dl>
      <dt>Days 1–30 / Confidential preparation</dt><dd>Confirm authority, asking-price basis, privacy and the evidence dossier. Prepare a factual teaser and approach a suitable shortlist of authorised professional contacts where available. Agree what may be shared and whether pricing stays private.</dd>
      <dt>Days 31–60 / Controlled launch</dt><dd>If appropriate and authorised, release the presentation through selected specialist listings, editorial or digital channels. Keep particulars, pricing and availability consistent; distinguish paid placements from earned coverage.</dd>
      <dt>Days 61–90 / Evidence-led review</dt><dd>Assess qualified buyer response, inspections, offers and obstacles. Consider a private showcase, suitable auction route or revised terms only when justified by evidence and separately agreed with the seller.</dd>
      </dl><p>No existing private-buyer network, portal affiliation, editorial placement or auction acceptance is implied. Channel availability, costs and specialist roles require confirmation for the individual asset.</p></div></details>
      <details className="algorithm-example"><summary>What changes between asset categories <span aria-hidden="true">+</span></summary><div><dl>
      <dt>Property</dt><dd>Title, tenure, planning, condition, occupancy and income evidence shape the dossier. Accurate photography and plans support selected property listings and professional introductions.</dd>
      <dt>Yachts</dt><dd>Builder, dimensions, refit history, maintenance, title and survey evidence shape the brief. Consider appropriate yacht brokers, vessel marketplaces and arranged viewings.</dd>
      <dt>Classic cars</dt><dd>Documented chassis history, originality, restoration and condition support the story. Marque clubs, collector specialists and private sale or vetted auction routes require individual assessment.</dd>
      </dl><p>Channels are selected for the asset and buyer brief. A named platform or specialist is not a Wiele partner unless expressly confirmed.</p></div></details>
      <details className="algorithm-example" data-algorithm-brief><summary>See an illustrative property strategy brief <span aria-hidden="true">+</span></summary><div><p>Illustrative only: an income-producing apartment in Malta. No actual property, buyer, campaign or result is represented.</p><dl>
      <dt>Decision brief</dt><dd>Confirm the owner’s objectives, timing, marketing authority, property condition and available income records.</dd>
      <dt>Buyer hypothesis</dt><dd>Consider income-focused buyers if the lease and income evidence support that proposition. Assess owner-occupier interest only where occupancy and possession terms permit it.</dd>
      <dt>Evidence and presentation</dt><dd>Prepare accurate photographs, a floor plan and documented particulars. Distinguish collected rent, contracted rent and projections; identify costs and missing evidence.</dd>
      <dt>Distribution decision</dt><dd>Select public listings, professional introductions or a confidential campaign according to buyer fit, privacy requirements and the agreed budget.</dd>
      <dt>Review rules</dt><dd>Exposure without qualified enquiries prompts a review of audience, proposition and price. Viewings without credible offers prompt a review of feedback and competing alternatives. Offers without completion prompt a review of terms, funding and documentation.</dd>
      <dt>Owner update</dt><dd>Record the actions taken, qualified enquiries, viewing feedback, offers, obstacles and recommended next step. Agree review checkpoints around the instruction.</dd>
      </dl><p>This example illustrates the method. The actual strategy, deliverables, costs and professional involvement are agreed for each property. No sale date or outcome is guaranteed.</p></div></details></> : <Link className="text-link" data-algorithm-action="learn_more" href="/about#wiele-algorithm">Understand The Wiele Algorithm <Arrow diagonal /></Link>}
    <div className="button-row"><Link className="button" data-algorithm-action="prepare_seller_brief" href="/selling#sales-brief">Prepare a sales brief <Arrow diagonal /></Link></div>
  </section>;
}
