"use client";

import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import Link from "next/link";
import { saveBriefDraft } from "@/lib/brief-draft";
import { currencies, type Currency } from "@/lib/currency";
import { propertyBrand } from "@/lib/property";
import { estimateAssets, type EstimateAsset } from "@/lib/transaction-estimate";
import type { ValuationCopy } from "@/lib/valuation-locales/types";
import type { ValuationScenario } from "./transaction-estimator";

const assetNames = ["Property", "Yachts", "Classic cars"] as const;
const purposes = ["Potential sale", "Potential purchase", "Portfolio review", "Insurance / formal appraisal referral", "Other purpose"] as const;
export type BriefFields = { category: EstimateAsset; location: string; currency: Currency; budget: string; purpose: typeof purposes[number] };

export function ValuationBrief({ fields, setFields, carried, copy, desks, contact }: {
 fields: BriefFields; setFields: Dispatch<SetStateAction<BriefFields>>; carried: ValuationScenario | null;
 copy: ValuationCopy["form"]; desks: ValuationCopy["desks"]; contact: string;
}) {
 const [details, setDetails] = useState("");
 const [error, setError] = useState(false);
 const { category, location, currency, budget, purpose } = fields;
 const assetIndex = estimateAssets.indexOf(category);
 const desk = desks[assetIndex];

 function update<K extends keyof BriefFields>(key: K, value: BriefFields[K]) {
  setFields(current => ({ ...current, [key]: value }));
 }

 function prepare(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const draft = [
   `Indicative valuation enquiry — ${assetNames[assetIndex]}`,
   `Country / locality: ${location.trim()}`,
   `Purpose: ${purpose}`,
   `Preferred currency: ${currency}`,
   ...(budget ? [`Indicative budget or asset value: ${currency} ${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(Number(budget))}`] : []),
   ...(carried?.illustrative ? ["Starting point: illustrative estimator inputs. Confirm any sample figures against the asset."] : []),
   `Asset details: ${details.trim()}`,
   "Please confirm evidence availability, scope, timing, fees and specialist requirements before proceeding.",
  ].join("\n");
  try {
   saveBriefDraft(sessionStorage, draft);
   window.location.assign(contact + "?brief=prepared&interest=general");
  } catch {
   setError(true);
  }
 }

 return <div>
  <noscript><style>{".valuation-brief { display:none }"}</style><p>{copy.noScript} <a className="acq-link" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a></p></noscript>
  <form className="valuation-brief appraisal-form" onSubmit={prepare} aria-label={copy.submit}>
   {carried && <p className="valuation-carried-note" role="status">{carried.illustrative ? copy.example : copy.carried}</p>}
   <div className="appraisal-form-grid">
    <div><label htmlFor="valuation-category">{copy.category}</label>
     <select id="valuation-category" value={category} onChange={event => update("category", event.target.value as EstimateAsset)}>
      {estimateAssets.map((value, index) => <option key={value} value={value}>{desks[index].name}</option>)}
     </select>
    </div>
    <div><label htmlFor="valuation-location">{desk.jurisdiction}</label>
     <input id="valuation-location" value={location} onChange={event => update("location", event.target.value)} required maxLength={160} />
    </div>
    <div><label htmlFor="valuation-purpose">{copy.purpose}</label>
     <select id="valuation-purpose" value={purpose} onChange={event => update("purpose", event.target.value as BriefFields["purpose"])}>
      {purposes.map((value, index) => <option key={value} value={value}>{copy.purposes[index]}</option>)}
     </select>
    </div>
    <div><label htmlFor="valuation-currency">{copy.currency}</label>
     <select id="valuation-currency" value={currency} onChange={event => setFields(current => ({ ...current, currency: event.target.value as Currency, budget: "" }))}>
      {currencies.map(value => <option key={value}>{value}</option>)}
     </select>
    </div>
    <div className="appraisal-budget"><label htmlFor="valuation-budget">{copy.budget}</label>
     <input id="valuation-budget" type="number" min=".01" max="1000000000" step=".01" inputMode="decimal" value={budget} onChange={event => update("budget", event.target.value)} />
    </div>
   </div>
   <div><label htmlFor="valuation-details">{copy.details}</label>
    <p className="appraisal-footnote" id="valuation-hint">{desk.prompt}</p>
    <textarea id="valuation-details" value={details} onChange={event => setDetails(event.target.value)}
     required minLength={10} maxLength={2000} aria-describedby="valuation-hint" />
   </div>
   <p className="appraisal-footnote">{copy.privacy} <Link className="acq-link" href="/privacy">{copy.privacyLink}</Link></p>
   {error && <p role="alert">{copy.failed} <Link className="acq-link" href={contact}>{copy.contact}</Link></p>}
   <button className="acq-button acq-button-primary" type="submit">{copy.submit} <span aria-hidden="true">↗</span></button>
  </form>
 </div>;
}
