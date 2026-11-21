"use client";

import { useEffect, useState, type FormEvent } from "react";
import { convertCurrency, type ReferenceRates } from "@/lib/currency";
import {
 estimateAssets, estimateCurrencies, estimateMarkets, estimateProfiles, estimateSources, estimateTransaction,
 type Estimate, type EstimateAsset, type EstimateCurrency, type EstimateInput, type EstimateMarket, type EstimateProfile,
} from "@/lib/transaction-estimate";

type MatrixRoute = {
 market: EstimateMarket; asset: EstimateAsset; party_profile: EstimateProfile;
 buyer: string; seller: string; anchor: string;
};

const marketLabels = { UK:"UK", "Europe (EU)":"Malta / EU", "South Africa":"South Africa" };
const profileLabels = { Domestic:"Domestic", "EU/EEA cross-border":"EU/EEA", "Other foreign / non-resident":"Non-resident / other foreign" };
const maxAmount = 1_000_000_000;
const sampleFees = { Property:[2500,1200], Yachts:[4000,7500], "Classic Cars":[900,600] } as const;
const moneyFormatter = (currency: EstimateCurrency) => new Intl.NumberFormat("en-GB", {
 style:"currency", currency, currencyDisplay:"code", minimumFractionDigits:2, maximumFractionDigits:2,
});

function Amount({ name, label, currency, required = false }: { name: string; label: string; currency: EstimateCurrency; required?: boolean }) {
 return <label className="form-field">{label} ({currency})
  <input name={name} type="number" min={required ? ".01" : "0"} max={maxAmount} step=".01" inputMode="decimal" required={required}/>
 </label>;
}

export function TransactionEstimator({ matrix }: { matrix: MatrixRoute[] }) {
 const [role, setRole] = useState<EstimateInput["role"]>("Buyer");
 const [asset, setAsset] = useState<EstimateAsset>("Property");
 const [market, setMarket] = useState<EstimateMarket>("UK");
 const [profile, setProfile] = useState<EstimateProfile>("Domestic");
 const [currency, setCurrency] = useState<EstimateCurrency>("GBP");
 const [location, setLocation] = useState("England / Northern Ireland");
 const [route, setRoute] = useState<EstimateInput["route"]>("pending");
 const [propertyBasis, setPropertyBasis] = useState<EstimateInput["propertyBasis"]>("standard");
 const [sellerTax, setSellerTax] = useState<EstimateInput["sellerTax"]>("quote");
 const [fx, setFx] = useState<ReferenceRates | null>(null);
 const [result, setResult] = useState<Estimate | null>(null);
 const [resultError, setResultError] = useState("");

 const property = asset === "Property";
 const buyer = role === "Buyer";
 const eu = market === "Europe (EU)";
 const sa = market === "South Africa";
 const uk = market === "UK";
 const otherEu = eu && location === "Other EU country";
 const localCurrency = uk ? "GBP" : sa ? "ZAR" : "EUR";
 const needsQuotedProperty = property && (otherEu || propertyBasis === "quote");
 const importing = buyer && !property && route === "import";
 const ukCollector = importing && asset === "Classic Cars" && uk && location === "Great Britain";
 const row = matrix.find(r => r.market === market && r.asset === asset && r.party_profile === profile);
 const format = moneyFormatter(currency);
 const allowance = currency === "EUR" || fx
  ? sampleFees[asset].map(value => fx ? Math.round(convertCurrency(value,"EUR",currency,fx.rates)) : value)
  : null;

 useEffect(() => {
  const controller = new AbortController();
  fetch("/api/currency", { signal: controller.signal })
   .then(response => response.ok ? response.json() as Promise<ReferenceRates> : null)
   .then(value => { if (value && !controller.signal.aborted) setFx(value); })
   .catch(() => { /* Local-currency scenarios remain available. */ });
  return () => controller.abort();
 }, []);

 function changeMarket(next: EstimateMarket, nextAsset = asset) {
  setMarket(next);
  setLocation(next === "UK" ? nextAsset === "Property" ? "England / Northern Ireland" : "Great Britain" : next === "Europe (EU)" ? "Malta" : "South Africa");
  setPropertyBasis("standard");
  setRoute("pending");
  setSellerTax("quote");
 }

 function calculate(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const read = (name: string) => {
   const value = form.get(name);
   return typeof value === "string" && value !== "" ? Number(value) : null;
  };
  const price = read("value");
  if (price === null || !Number.isFinite(price) || price <= 0 || price > maxAmount) {
   setResultError("Enter an asset value greater than zero and no greater than one billion.");
   return;
  }
  const useAllowance = form.has("allowance");
  try {
   const estimate = estimateTransaction({
    role, asset, market, currency, value:price, location, propertyBasis, sellerTax, route,
    sdltResidence:(form.get("sdltResidence") ?? "unknown") as EstimateInput["sdltResidence"],
    fees:read("fees") ?? (useAllowance ? allowance?.[0] ?? null : null),
    survey:read("survey") ?? (useAllowance ? allowance?.[1] ?? null : null),
    delivery:read("delivery"), other:read("other"), quotedTax:read("quotedTax"), duty:read("duty"),
    customsValue:read("customsValue"), incidentalVatBase:read("incidentalVatBase"), vatRate:read("vatRate"),
    collector:(form.get("collector") ?? "unknown") as EstimateInput["collector"],
    sacu:(form.get("sacu") ?? "unknown") as EstimateInput["sacu"],
    temporaryFacts:form.has("temporaryFacts"), months:read("months"),
   }, fx);
   const allowanceUsed = useAllowance && allowance && (read("fees") === null || read("survey") === null);
   setResult({ ...estimate, fxDate:estimate.fxDate ?? (allowanceUsed && currency !== "EUR" ? fx?.date : undefined) });
   setResultError("");
  } catch {
   setResult(null);
   setResultError("This scenario could not be calculated. Check the amounts or use the jurisdiction’s local currency.");
  }
 }

 return <section className="transaction-estimator" id="landed-cost-estimator" aria-labelledby="transaction-estimator-title">
  <span className="eyebrow">UK · Europe · South Africa / Transaction planning</span>
  <h2 id="transaction-estimator-title">Total landed cost <em>&amp; net proceeds.</em></h2>
  <p>Compare the costs of buying or the cash proceeds of selling property, a yacht or a classic car. Your entries stay in this browser. No account is required.</p>
  <div className="transaction-workspace">
   <form className="transaction-form" onSubmit={calculate} onChange={() => { setResult(null); setResultError(""); }}>
    <div className="transaction-fields">
     <label className="form-field">Role<select value={role} onChange={e => { setRole(e.target.value as EstimateInput["role"]); setSellerTax("quote"); }}><option>Buyer</option><option>Seller</option></select></label>
     <label className="form-field">Asset category<select value={asset} onChange={e => { const next = e.target.value as EstimateAsset; setAsset(next); changeMarket(market, next); }}>{
      estimateAssets.map(value => <option key={value}>{value}</option>)
     }</select></label>
     <label className="form-field">Asset jurisdiction / destination<select value={market} onChange={e => changeMarket(e.target.value as EstimateMarket)}>{
      estimateMarkets.map(value => <option key={value} value={value}>{marketLabels[value]}</option>)
     }</select></label>
     <label className="form-field">Residency / nationality profile<select value={profile} onChange={e => setProfile(e.target.value as EstimateProfile)}>{
      estimateProfiles.map(value => <option key={value} value={value}>{profileLabels[value]}</option>)
     }</select></label>
     {market !== "South Africa" && <label className="form-field">Applicable territory<select value={location} onChange={e => { setLocation(e.target.value); setSellerTax("quote"); }}>{
      (eu ? ["Malta","Other EU country"] : property ? ["England / Northern Ireland","Scotland","Wales"] : ["Great Britain","Northern Ireland"]).map(value => <option key={value}>{value}</option>)
     }</select></label>}
     <label className="form-field">Price and costs currency<select value={currency} onChange={e => setCurrency(e.target.value as EstimateCurrency)}>{
      estimateCurrencies.map(value => <option key={value}>{value}</option>)
     }</select></label>
    </div>
    <p className="fine-print">The profile selects legal guidance. Tax residence, VAT status and customs eligibility require separate checks. Changing currency clears amounts so they can be re-entered in the new currency.</p>

    <div className="transaction-fields" key={`amounts-${currency}`}>
     <Amount name="value" label="Asset value" currency={currency} required/>
     {buyer && property && !otherEu && <label className="form-field">Acquisition tax basis
      <select value={propertyBasis} onChange={e => setPropertyBasis(e.target.value as EstimateInput["propertyBasis"])}>
       <option value="standard">{sa ? "Transfer duty (sale not subject to VAT)" : eu ? "Standard stamp duty" : "Standard residential purchase"}</option>
       {uk && <option value="additional">Higher / additional dwelling rates apply</option>}
       <option value="quote">Use a local tax quote</option>
      </select>
     </label>}
     {buyer && property && uk && location === "England / Northern Ireland" && propertyBasis !== "quote" && <label className="form-field">Residence under the SDLT test
      <select name="sdltResidence"><option value="unknown">To confirm</option><option value="resident">UK-resident under SDLT rules</option><option value="nonresident">Non-resident surcharge applies</option></select>
     </label>}
     {buyer && !property && <label className="form-field">Customs treatment<select value={route} onChange={e => setRoute(e.target.value as EstimateInput["route"])}>
      <option value="pending">To confirm</option><option value="local">Already in local free circulation</option><option value="import">Permanent import</option>
      {asset === "Yachts" && <option value="temporary">Temporary Admission screening</option>}
     </select></label>}
     {!buyer && <label className="form-field">Tax and withholding at completion<select value={sellerTax} onChange={e => setSellerTax(e.target.value as EstimateInput["sellerTax"])}>
      <option value="quote">Use a local tax quote</option>
      {property && eu && location === "Malta" && <option value="malta">Malta standard 8% transfer-tax scenario</option>}
      {property && sa && <><option value="sa-person">SA non-resident individual · section 35A</option><option value="sa-company">SA non-resident company · section 35A</option><option value="sa-trust">SA non-resident trust · section 35A</option></>}
      <option value="none">Confirmed none due at completion</option>
     </select></label>}
     {((buyer && (needsQuotedProperty || (!property && route === "local"))) || (!buyer && sellerTax === "quote")) && <Amount key={`${role}/${market}/${asset}/${location}/${route}`} name="quotedTax" label={buyer ? "Quoted tax due in addition to price" : "Quoted tax or withholding at completion"} currency={currency}/>}
     {importing && <>
      <Amount name="customsValue" label="Customs value from broker" currency={currency}/>
      <Amount name="duty" label="Customs duty and import levies from broker" currency={currency}/>
      {!sa && <Amount name="incidentalVatBase" label="Additional costs in VAT base" currency={currency}/>}
      {sa && <label className="form-field">SARS import VAT base<select name="sacu">
       <option value="unknown">To confirm</option><option value="outside">10% customs value uplift applies</option><option value="blns">Qualifying BLNS origin and dispatch · no uplift</option>
      </select></label>}
      {ukCollector && <label className="form-field">Collector tariff classification<select name="collector">
       <option value="unknown">To confirm</option><option value="standard">Standard import treatment</option><option value="confirmed">HMRC / broker confirmed heading 9705</option>
      </select></label>}
      <label className="form-field">Locally verified import VAT rate (%)<input name="vatRate" type="number" min="0" max="100" step=".01" inputMode="decimal" placeholder={otherEu || location === "Northern Ireland" ? "Enter destination rate" : "Leave blank for standard rate"}/></label>
     </>}
     {buyer && !property && route === "temporary" && !sa && <>
      <label className="form-field">Planned stay in months<input name="months" type="number" min=".01" max="120" step=".01" inputMode="decimal"/></label>
      <label className="transaction-check"><input name="temporaryFacts" type="checkbox"/>The yacht is registered outside the relevant customs territory, the holder and principal user are established outside it, and the yacht will be used privately and re-exported.</label>
     </>}
     <Amount name="fees" label="Practitioner / legal fees" currency={currency}/>
     <Amount name="survey" label="Survey / inspection" currency={currency}/>
     <Amount name="delivery" label="Transport / delivery / insurance" currency={currency}/>
     <Amount name="other" label={buyer ? "Other costs" : "Commission, debt payoff and other deductions"} currency={currency}/>
    </div>
    {allowance && <label className="transaction-check" key={`allowance-${currency}`}><input name="allowance" type="checkbox"/>Use example allowances for blank practitioner and inspection fields ({format.format(allowance[0])} and {format.format(allowance[1])}). These are planning inputs, not market fee quotes.</label>}
    <p className="fine-print">Enter 0 where a cost is confirmed inapplicable. Blank cost fields remain unpriced. Use {localCurrency} for local tax bands if reference FX is unavailable.</p>
    <button className="button" type="submit">Calculate estimate</button>
    {resultError && <p role="alert">{resultError}</p>}
   </form>

   <div className="transaction-output valuation-converter-panel">
    <div aria-live="polite">
     <h3>Indicative breakdown</h3>
     {result ? <>
      <dl className="transaction-lines">{result.lines.map(line => <div key={line.label}>
       <dt>{line.label}{line.note && <small>{line.note}</small>}</dt>
       <dd>{line.amount === null ? "To confirm" : format.format(line.amount)}</dd>
      </div>)}</dl>
      <div className="valuation-result">
       <span>{result.partial ? "Subtotal using priced items only" : buyer ? "Estimated total landed cost" : "Estimated net seller proceeds"}</span>
       <strong>{format.format(result.total)}</strong>
       {result.partial && <p>Unpriced items are excluded. The final amount may change once those costs are confirmed.</p>}
       {result.fxDate && <span>ECB reference FX · {result.fxDate}. Bank pricing and FX spreads may differ.</span>}
      </div>
      {result.notes.map(note => <p className="fine-print" key={note}>{note}</p>)}
      {!!result.sources.length && <ul className="transaction-sources" aria-label="Official calculation sources">{result.sources.map(key => {
       const [label, href] = estimateSources[key];
       return <li key={key}><a href={href}>{label}</a></li>;
      })}</ul>}
     </> : <p>Enter your scenario to see which costs can be priced and which require a local quote.</p>}
    </div>
    {row && <details className="transaction-route"><summary>Legal checks for this scenario</summary>
     <p>{buyer ? row.buyer : row.seller}</p>
     <a className="text-link" href={`/legal-compliance/cross-border#${row.anchor}`}>Read the cross-border matrix ↗</a>
    </details>}
    <p className="fine-print">Indicative planning estimates only. Tax, customs, relief, fees and eligibility require formal verification by appropriately licensed practitioners in the relevant jurisdiction. Rules reviewed 21 November 2026.</p>
    <noscript><p>The interactive estimate requires JavaScript. <a href="/legal-compliance/cross-border">Read the public compliance matrix</a> or <a href="/contact">discuss a transaction brief</a>.</p></noscript>
   </div>
  </div>
 </section>;
}
