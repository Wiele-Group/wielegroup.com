"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { contactPath } from "@/lib/contact-locales/routing";
import type { HomeLocale } from "@/lib/home-locales/routing";
import type { ValuationCopy } from "@/lib/valuation-locales/types";
import { TransactionEstimator, type MatrixRoute, type ValuationScenario } from "./transaction-estimator";
import { ValuationBrief, type BriefFields } from "./valuation-brief";

export function ValuationWorkspace({ matrix, copy, locale }: { matrix: MatrixRoute[]; copy: ValuationCopy; locale: HomeLocale }) {
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
  <section className="acq-section appraisal-enquiry" id="appraisal-desk" aria-labelledby="valuation-brief-title">
   <div id="valuation-enquiry">
    <h2 id="valuation-brief-title" tabIndex={-1} ref={heading}>{copy.intakeTitle}</h2>
    <p>{copy.intakeIntro}</p>
    <div className="appraisal-actions">
     <Link className="acq-link" href="/about#jonathan-landman">{copy.contact} <span aria-hidden="true">↗</span></Link>
     <a className="acq-link" href="#landed-cost-estimator">{copy.openEstimator} <span aria-hidden="true">↓</span></a>
    </div>
   </div>
   <ValuationBrief fields={fields} setFields={setFields} carried={carried} copy={copy.form} desks={copy.desks} contact={contactPath(locale)}/>
  </section>
  <div className="appraisal-estimator">
   {locale !== "en" && <p className="appraisal-footnote">{copy.estimatorNote}</p>}
   <div lang="en-GB"><TransactionEstimator matrix={matrix} onCarry={carry}/></div>
  </div>
 </>;
}
