import Link from "next/link";
import { Arrow } from "./chrome";

const profiles = [
 {
  category:"01 / Property", title:"Cape Peninsula residence", score:94,
  geography:"Cape Peninsula, South Africa", budget:"ZAR 20m–26m", timing:"3–6 months",
  brief:"Primary residence with freehold title, three or more bedrooms, practical year-round access and documented planning approvals. Structural inspection and municipal records are priorities.",
 },
 {
  category:"02 / Yachts", title:"Western Mediterranean motor yacht", score:91,
  geography:"Western Mediterranean, EU", budget:"EUR 6.5m–8.5m", timing:"6–12 months",
  brief:"Private-use motor yacht, 27–34 m, four guest cabins and documented maintenance. Berth dimensions, survey scope and customs status would need review.",
 },
 {
  category:"03 / Classic cars", title:"UK-based collector coupé", score:88,
  geography:"United Kingdom", budget:"GBP 150k–250k", timing:"3–6 months",
  brief:"A right-hand-drive post-war grand tourer with continuous ownership history, marque records and inspection access. The buyer would consider adjacent model years and documented restoration.",
 },
] as const;

export const illustrativeMandatesDescription = "Explore three fictional acquisition scenarios for South African property, Mediterranean yachts and UK classic cars.";

export function AcquisitionMandates() {
 return <section className="acquisition-mandates wrap" id="acquisition-mandates" aria-labelledby="acquisition-mandates-title">
  <span className="eyebrow">Illustrative demand profiles / Off-market sales</span>
  <h2 id="acquisition-mandates-title">Anonymized acquisition mandates.</h2>
  <p>{illustrativeMandatesDescription} Each example shows how an active mandate could be presented. The profiles and scores use synthetic inputs. They represent no current buyers, verified funds or active instructions.</p>
  <div className="acquisition-mandates-grid">
   {profiles.map(profile => <article key={profile.category}>
    <span className="eyebrow">{profile.category}</span>
    <h3>{profile.title}</h3>
    <p className="mandate-score">Illustrative Match Score <strong>{profile.score}/100</strong></p>
    <p>{profile.brief}</p>
    <dl>
     <div><dt>Target market</dt><dd>{profile.geography}</dd></div>
     <div><dt>Example budget</dt><dd>{profile.budget}</dd></div>
     <div><dt>Example timeline</dt><dd>{profile.timing}</dd></div>
    </dl>
   </article>)}
  </div>
  <p className="fine-print">Scores were calculated using the Wiele Algorithm and rounded to the nearest whole point for display. Matching depends on the asset being considered and the available evidence. A score does not establish authority to act or a commitment to buy.</p>
  <Link className="text-link" href="/contact">Discuss an off-market asset <Arrow diagonal/></Link>
 </section>;
}
