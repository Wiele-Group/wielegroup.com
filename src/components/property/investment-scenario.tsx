"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Arrow } from "./chrome";

const presets = {
 GBP: { price: 1_500_000, rent: 5_000, acquisition: 150_000, costs: 12_000, vacancy: 5 },
 EUR: { price: 1_200_000, rent: 4_000, acquisition: 100_000, costs: 10_000, vacancy: 5 },
 ZAR: { price: 15_000_000, rent: 55_000, acquisition: 1_600_000, costs: 120_000, vacancy: 5 },
 USD: { price: 2_000_000, rent: 8_500, acquisition: 130_000, costs: 20_000, vacancy: 5 },
};
type ScenarioCurrency = keyof typeof presets;
const currencies = ["GBP", "EUR", "ZAR", "USD"] as const;
const percent = (value: number) => `${value.toFixed(2)}%`;

export function InvestmentScenario() {
 const id = useId();
 const [currency, setCurrency] = useState<ScenarioCurrency>("EUR");
 const [values, setValues] = useState(presets.EUR);
 const [downside, setDownside] = useState(false);
 const formatter = new Intl.NumberFormat("en-GB", {style: "currency", currency, maximumFractionDigits: 0});
 const money = (value: number) => formatter.format(value);
 const scheduled = values.rent * (downside ? .9 : 1) * 12;
 const vacancy = scheduled * values.vacancy / 100;
 const effective = scheduled - vacancy;
 const operating = effective - values.costs;
 const basis = values.price + values.acquisition;
 const gross = scheduled / values.price * 100;
 const operatingYield = operating / basis * 100;
 const scale = currency === "ZAR" ? 10 : 1;
 const fields = [
  { key: "price", label: "Purchase price", min: 100_000 * scale, max: 6_000_000 * scale, step: 10_000 * scale, format: money },
  { key: "rent", label: "Projected monthly rent", min: 500 * scale, max: 30_000 * scale, step: 50 * scale, format: money },
  { key: "acquisition", label: "Acquisition costs & initial works", min: 0, max: 1_200_000 * scale, step: 1_000 * scale, format: money },
  { key: "costs", label: "Annual operating costs", min: 0, max: 150_000 * scale, step: 250 * scale, format: money },
  { key: "vacancy", label: "Vacancy allowance", min: 0, max: 30, step: 1, format: (value: number) => `${value}%` },
 ] as const;

 function reset(nextCurrency: ScenarioCurrency) {
  setCurrency(nextCurrency);
  setValues(presets[nextCurrency]);
  setDownside(false);
 }

 return <section className="investment-scenario" aria-labelledby={`${id}-title`}>
  <div className="wrap scenario-heading">
   <span className="eyebrow">Investment property / Explore the assumptions</span>
   <h2 id={`${id}-title`}>The headline.<br/><em>And the reality.</em></h2>
   <p>Adjust projected rent, vacancy and operating costs to compare gross yield on price with operating yield on total acquisition cost.</p>
  </div>
  <noscript><style>{".investment-scenario .scenario-controls { display: none } .investment-scenario .scenario-layout { grid-template-columns: minmax(0, 1fr) }"}</style><p className="wrap scenario-static-note">The euro example below uses a €1,200,000 purchase price, €100,000 in acquisition costs and works, €4,000 monthly rent, 5% vacancy and €10,000 in annual operating costs. Enable JavaScript to adjust the assumptions.</p></noscript>
  <div className="wrap scenario-layout">
   <div className="scenario-controls">
    <fieldset className="scenario-currency">
     <legend>Scenario currency</legend>
     <div className="buyer-option-group">{currencies.map(code => <button type="button" key={code} aria-pressed={currency === code} onClick={() => {if (currency !== code) reset(code);}}>{code}</button>)}</div>
    </fieldset>
    <p className="scenario-assumption-label">Illustrative prime-property assumptions · 21 November 2026</p>
    <p className="scenario-preset-note">Each currency loads its own hypothetical preset. Use the <Link href="/valuations#currency-converter">dated currency converter</Link> for exchange-rate comparisons.</p>
    {fields.map(field => <div className="scenario-field" key={field.key}>
     <label htmlFor={`${id}-${field.key}`}>{field.label}<output htmlFor={`${id}-${field.key}`} aria-live="off">{field.format(values[field.key])}</output></label>
     <input id={`${id}-${field.key}`} aria-label={field.label} type="range" min={field.min} max={field.max} step={field.step} value={values[field.key]} aria-valuetext={field.format(values[field.key])} onChange={event => setValues(current => ({...current, [field.key]: Number(event.target.value)}))}/>
     {field.key === "acquisition" && <Link className="text-link scenario-estimator-link" href="/valuations#landed-cost-estimator">Estimate SDLT, stamp duty or transfer duty <Arrow diagonal/></Link>}
    </div>)}
    <div className="scenario-actions">
     <button type="button" aria-pressed={downside} onClick={() => setDownside(value => !value)}>Test 10% lower rent <span aria-hidden="true">{downside ? "−" : "+"}</span></button>
     <button type="button" onClick={() => reset(currency)}>Reset</button>
    </div>
   </div>
   <div className="scenario-result">
    <div className="scenario-result-top"><span className="eyebrow">{downside ? "Lower-rent illustration" : "Your illustrative scenario"}</span></div>
    <div className="scenario-yields" aria-live="polite">
     <div><span>Gross yield on price</span><strong>{percent(gross)}</strong><small>Scheduled annual rent ÷ purchase price</small></div>
     <div><span>Operating yield on total cost</span><strong>{percent(operatingYield)}</strong><small>Operating income ÷ price, costs &amp; initial works</small></div>
    </div>
    <div className="scenario-income-graphic" role="img" aria-label={`Scheduled annual rent ${money(scheduled)}, vacancy ${money(vacancy)}, operating costs ${money(values.costs)}, operating income ${money(operating)}`}>
     <span style={{width: `${Math.max(0, operating) / Math.max(scheduled, 1) * 100}%`}}/>
     <i style={{width: `${Math.min(values.costs, effective) / Math.max(scheduled, 1) * 100}%`}}/>
     <b style={{width: `${values.vacancy}%`}}/>
    </div>
    <dl className="scenario-ledger">
     <div><dt>Scheduled annual rent</dt><dd>{money(scheduled)}</dd></div>
     <div><dt>Less vacancy allowance</dt><dd>−{money(vacancy)}</dd></div>
     <div><dt>Less operating costs</dt><dd>−{money(values.costs)}</dd></div>
     <div><dt>Annual operating income</dt><dd>{money(operating)}</dd></div>
     <div><dt>Total price, costs &amp; initial works</dt><dd>{money(basis)}</dd></div>
    </dl>
    <p className="scenario-note">Hypothetical rent and costs for planning. This illustration is neither a property offer, a valuation nor a forecast. It excludes financing, income tax and future capital expenditure. Actual costs and acquisition eligibility require property-specific advice. Returns are not guaranteed.</p>
    <Link className="text-link" href="/contact?interest=buying&focus=income">Discuss an income-led brief <Arrow diagonal/></Link>
   </div>
  </div>
 </section>;
}
