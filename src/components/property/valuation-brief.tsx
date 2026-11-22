"use client";

import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import Link from "next/link";
import { saveBriefDraft } from "@/lib/brief-draft";
import { estimateAssets, estimateCurrencies, type EstimateAsset, type EstimateCurrency } from "@/lib/transaction-estimate";
import type { ValuationScenario } from "./transaction-estimator";

const prompts: Record<EstimateAsset, { label: string; hint: string; placeholder: string }> = {
 Property: {
  label: "Property",
  hint: "Include property type, locality, tenure, internal and land area, condition and occupancy.",
  placeholder: "For example, a freehold villa with 240 m² of internal space, recently refurbished and vacant.",
 },
 Yachts: {
  label: "Yachts",
  hint: "Include builder, model, year, length, location, engine hours, refit or survey history and known VAT status.",
  placeholder: "For example, a 2017 motor yacht, 32 m LOA, 2,000 engine hours and a recent hull survey. VAT status to confirm.",
 },
 "Classic Cars": {
  label: "Classic cars",
  hint: "Include make, model, year, steering side, condition, originality, restoration and documented provenance.",
  placeholder: "For example, a 1967 right-hand-drive coupé, 48,200 miles indicated, with service records and restoration invoices.",
 },
};
const purposes = ["Potential sale", "Potential purchase", "Portfolio review", "Insurance / formal appraisal referral", "Other purpose"] as const;
export type BriefFields = {category: EstimateAsset; location: string; currency: EstimateCurrency; budget: string; purpose: typeof purposes[number]};

export function ValuationBrief({ fields, setFields, carried }: {
 fields: BriefFields; setFields: Dispatch<SetStateAction<BriefFields>>; carried: ValuationScenario | null;
}) {
 const [details, setDetails] = useState("");
 const [error, setError] = useState("");
 const { category, location, currency, budget, purpose } = fields;
 const prompt = prompts[category];
 const href = "/contact?brief=prepared&interest=general";

 function update<K extends keyof BriefFields>(key: K, value: BriefFields[K]) {
  setFields(current => ({ ...current, [key]: value }));
 }

 function prepare(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const draft = [
   `Indicative valuation enquiry — ${prompt.label}`,
   `Country / locality: ${location.trim()}`,
   `Purpose: ${purpose}`,
   ...(budget ? [`Indicative budget or asset value: ${currency} ${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(Number(budget))}`] : []),
   ...(carried?.illustrative ? ["Starting point: illustrative estimator inputs. Confirm any sample figures against the asset."] : []),
   `Asset details: ${details.trim()}`,
   "Please confirm evidence availability, scope, timing, fees and specialist requirements before proceeding.",
  ].join("\n");
  try {
   saveBriefDraft(sessionStorage, draft);
   window.location.assign(href);
  } catch {
   setError("Your browser could not transfer the brief. Copy your details into our contact form or email admin@wielegroup.com.");
  }
 }

 return <div>
  <noscript><style>{".valuation-brief { display:none }"}</style><p>Enable JavaScript to prepare a valuation brief here, or <a className="text-link" href="mailto:admin@wielegroup.com">email Wiele Investments</a>.</p></noscript>
  <form className="valuation-brief" onSubmit={prepare} aria-label="Prepare a valuation enquiry">
   {carried && <p className="valuation-carried-note" role="status">{carried.illustrative
    ? "Illustrative example carried into the brief. Replace sample figures with your own before sending."
    : "Scenario carried into the brief. Review the jurisdiction and asset amount before sending."}</p>}
   <div className="valuation-form-grid">
    <div className="form-field"><label htmlFor="valuation-category">Asset category</label>
     <select id="valuation-category" value={category} onChange={e => update("category", e.target.value as EstimateAsset)}>
      {estimateAssets.map(value => <option key={value} value={value}>{prompts[value].label}</option>)}
     </select>
    </div>
    <div className="form-field"><label htmlFor="valuation-location">Country and locality</label>
     <input id="valuation-location" value={location} onChange={e => update("location", e.target.value)} required maxLength={160} placeholder="For example: Cape Town, South Africa"/>
    </div>
    <div className="form-field"><label htmlFor="valuation-purpose">Purpose</label>
     <select id="valuation-purpose" value={purpose} onChange={e => update("purpose", e.target.value as BriefFields["purpose"])}>{purposes.map(value => <option key={value}>{value}</option>)}</select>
    </div>
    <div className="form-field"><label htmlFor="valuation-currency">Currency</label>
     <select id="valuation-currency" value={currency} onChange={e => setFields(current => ({...current, currency: e.target.value as EstimateCurrency, budget: ""}))}>
      {estimateCurrencies.map(value => <option key={value}>{value}</option>)}
     </select>
    </div>
    <div className="form-field"><label htmlFor="valuation-budget">Indicative budget or asset value (optional)</label>
     <input id="valuation-budget" type="number" min=".01" max="1000000000" step=".01" inputMode="decimal" value={budget} onChange={e => update("budget", e.target.value)}/>
    </div>
   </div>
   <div className="form-field">
    <label htmlFor="valuation-details">About the asset</label>
    <p className="form-note" id="valuation-hint">{prompt.hint}</p>
    <textarea id="valuation-details" value={details} onChange={e => setDetails(e.target.value)} required minLength={10} maxLength={2000} placeholder={prompt.placeholder} aria-describedby="valuation-hint"/>
   </div>
   <p className="fine-print">Your entries stay in this browser tab until you send the enquiry. A prepared draft remains available for up to 30 minutes after the latest contact-form edit, or until sent or discarded. Keep bank details, identity documents, VINs, serial numbers and confidential ownership records out of the enquiry. <Link href="/privacy">Privacy notice</Link>.</p>
   {error && <p role="alert">{error} <Link href="/contact">Open the contact form</Link></p>}
   <button className="button" type="submit">Prepare my valuation enquiry ↗</button>
  </form>
 </div>;
}
