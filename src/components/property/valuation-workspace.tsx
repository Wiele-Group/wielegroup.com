"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { TransactionEstimator, type MatrixRoute, type ValuationScenario } from "./transaction-estimator";
import { CurrencyConverter } from "./currency-converter";
import { ValuationBrief, type BriefFields } from "./valuation-brief";

export function ValuationWorkspace({ matrix }: { matrix: MatrixRoute[] }) {
 const heading = useRef<HTMLHeadingElement>(null);
 const [fields, setFields] = useState<BriefFields>({
  category: "Property", location: "", currency: "EUR", budget: "", purpose: "Potential sale",
 });
 const [carried, setCarried] = useState<ValuationScenario | null>(null);

 function carry(scenario: ValuationScenario) {
  const location = scenario.market === "UK" ? `${scenario.location}, UK` : scenario.location;
  setFields({
   category: scenario.asset, location, currency: scenario.currency, budget: String(scenario.value),
   purpose: scenario.role === "Buyer" ? "Potential purchase" : "Potential sale",
  });
  setCarried(scenario);
  requestAnimationFrame(() => heading.current?.focus());
 }

 return <>
  <TransactionEstimator matrix={matrix} onCarry={carry}/>
  <CurrencyConverter/>
  <section className="valuation-enquiry-section" id="valuation-enquiry" aria-labelledby="valuation-brief-title">
   <div>
    <span className="eyebrow">Your starting point / A short brief</span>
    <h2 id="valuation-brief-title" tabIndex={-1} ref={heading}>Tell us about<br/><em>the asset.</em></h2>
    <p>Prepare the essentials, then add your contact details and send the enquiry on the next page. Jonathan Landman is your initial Wiele contact. Specialist responsibilities are agreed separately.</p>
    <Link className="text-link" href="/about#jonathan-landman">Background &amp; experience ↗</Link>
   </div>
   <ValuationBrief fields={fields} setFields={setFields} carried={carried}/>
  </section>
 </>;
}
