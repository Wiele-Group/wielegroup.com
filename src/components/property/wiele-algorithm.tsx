import Link from "next/link";
import { Arrow } from "@/components/property/chrome";

export const algorithmSteps = [
  ["01", "Assess", "Establish the property facts, competing alternatives, seller objectives and sale constraints. Separate documented information from assumptions."],
  ["02", "Identify", "Rank likely buyer groups by intended use, property fit, budget, funding readiness and timing. Each asset starts with a fresh assessment."],
  ["03", "Position", "Develop a supported price approach, a clear proposition and the information buyers need to assess the opportunity."],
  ["04", "Activate", "Select presentation and marketing channels suited to the property and likely buyers. Agree the scope and costs before launch."],
  ["05", "Review", "Follow qualified enquiries, viewings, offers and progress towards completion separately. Review feedback and evidence before changing the plan."],
] as const;

export function WieleAlgorithm({ detailed = false }: { detailed?: boolean }) {
  return <section id="wiele-algorithm" className="wrap process-section wiele-algorithm" aria-labelledby="algorithm-title">
    <span className="eyebrow">Malta property marketing / The Wiele Algorithm</span>
    <h2 id="algorithm-title">A strategy built around<br />your property.</h2>
    <p className="algorithm-intro">Your property, your objectives and your likely buyers shape the plan. Wiele assesses the market evidence, identifies suitable buyer groups and selects the message, presentation and marketing channels for your property.</p>
    <p className="algorithm-intro">Enquiries, viewing feedback and offers inform the next decision. The Wiele Algorithm is our research-led decision process, guided by professional judgement.</p>
    {detailed ? <><div className="process-list">{algorithmSteps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <details className="algorithm-example"><summary>See an illustrative property strategy brief <span aria-hidden="true">+</span></summary><div><p>Illustrative only: an income-producing apartment in Malta. No actual property, buyer, campaign or result is represented.</p><dl>
      <dt>Decision brief</dt><dd>Confirm the owner’s objectives, timing, marketing authority, property condition and available income records.</dd>
      <dt>Buyer hypothesis</dt><dd>Consider income-focused buyers if the lease and income evidence support that proposition. Assess owner-occupier interest only where occupancy and possession terms permit it.</dd>
      <dt>Evidence and presentation</dt><dd>Prepare accurate photographs, a floor plan and documented particulars. Distinguish collected rent, contracted rent and projections; identify costs and missing evidence.</dd>
      <dt>Distribution decision</dt><dd>Select public listings, professional introductions or a confidential campaign according to buyer fit, privacy requirements and the agreed budget.</dd>
      <dt>Review rules</dt><dd>Exposure without qualified enquiries prompts a review of audience, proposition and price. Viewings without credible offers prompt a review of feedback and competing alternatives. Offers without completion prompt a review of terms, funding and documentation.</dd>
      <dt>Owner update</dt><dd>Record the actions taken, qualified enquiries, viewing feedback, offers, obstacles and recommended next step. Agree review checkpoints around the instruction.</dd>
      </dl><p>This example illustrates the method. The actual strategy, deliverables, costs and professional involvement are agreed for each property. No sale date or outcome is guaranteed.</p></div></details></> : <Link className="text-link" href="/about#wiele-algorithm">Understand The Wiele Algorithm <Arrow diagonal /></Link>}
    <div className="button-row"><Link className="button" href="/contact?interest=marketing">Discuss your property <Arrow diagonal /></Link></div>
  </section>;
}
