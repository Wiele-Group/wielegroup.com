"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { currencies, convertCurrency, type Currency } from "@/lib/currency";
import { fallbackFxRates, type FxRates } from "@/lib/fx-rates";
import { mandateSummary } from "@/lib/mandateAgreement";
import { mandateFeeAmounts } from "@/lib/mandate-fees";
import type { ValuationCopy } from "@/lib/valuation-locales/types";

export const ecbRatesUrl = "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html";

function rate(from: Currency, to: Currency, snapshot: FxRates | null) {
 if (from === to) return 1;
 return snapshot ? convertCurrency(1, from, to, snapshot.rates) : null;
}

export function CurrencyConverter({ copy, language }: { copy: ValuationCopy["ledger"]; language: string }) {
 const [amount, setAmount] = useState("100000");
 const [from, setFrom] = useState<Currency>("EUR");
 const [to, setTo] = useState<Currency>("GBP");
 const [data, setData] = useState<FxRates | null>(null);
 const [months, setMonths] = useState<number>(mandateSummary.minimumTermMonths);
 const [malta, setMalta] = useState(false);

 useEffect(() => {
  const controller = new AbortController();
  fetch("/api/fx-rates", { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(6000)]) })
   .then(async response => {
    if (!response.ok) throw new Error("Rates request failed");
    const value: FxRates = await response.json();
    if (!currencies.every(code => Number.isFinite(value.rates?.[code]) && value.rates[code] > 0)) throw new Error("Incomplete rates");
    if (!controller.signal.aborted) setData(value);
   })
   .catch(() => { if (!controller.signal.aborted) setData(fallbackFxRates); });
  return () => controller.abort();
 }, []);

 const numeric = Number(amount);
 const valid = amount.trim() !== "" && Number.isFinite(numeric) && numeric >= 0 && numeric <= 1e12;
 const cross = rate(from, to, data);
 const fromToEur = rate(from, "EUR", data);
 const eurToDisplay = rate("EUR", to, data);
 const gross = valid && cross !== null ? numeric * cross : null;
 const fees = valid && !malta && fromToEur !== null && eurToDisplay !== null
  ? mandateFeeAmounts(Math.round(numeric * fromToEur * 100), months, mandateSummary)
  : null;
 const money = (value: number, currency: Currency = to) =>
  new Intl.NumberFormat(language, { style: "currency", currency, currencyDisplay: "code" }).format(value);
 const percent = new Intl.NumberFormat(language, { style: "percent" }).format(mandateSummary.commissionPercent / 100);
 const monthFee = money(mandateSummary.monthlyRetainerEur, "EUR");
 const inDisplay = (cents: number) => cents / 100 * (eurToDisplay ?? 1);
 const feeRows = fees && gross !== null ? [
  ["commission", `${copy.commission} · ${percent}`, money(inDisplay(fees.gross))],
  ["monthly", copy.monthly, to === "EUR" ? monthFee : `${monthFee} · ${money(inDisplay(mandateSummary.monthlyRetainerEur * 100))}`],
  ["paid", copy.paid, money(inDisplay(fees.retainer))],
  ["credit", copy.credit, money(inDisplay(fees.credit))],
  ["closing", copy.closing, money(inDisplay(fees.closing))],
  ["at-closing", copy.atClosing, money(gross - inDisplay(fees.closing))],
  ["after-retainer", copy.afterRetainer, money(gross - inDisplay(fees.total))],
 ] : [];

 return (
  <section className="acq-section appraisal-parity" id="currency-converter" aria-labelledby="currency-title">
   <div className="acq-heading"><h2 id="currency-title">{copy.title}</h2><p>{copy.intro}</p></div>
   <div className="appraisal-ledger">
    <div className="appraisal-fx">
     <label htmlFor="fx-amount">{copy.amount}</label>
     <input id="fx-amount" type="number" inputMode="decimal" min={0} max={1e12} step="any"
      value={amount} onChange={event => setAmount(event.target.value)} aria-invalid={(!valid && amount !== "") || undefined} />
     <div className="appraisal-currencies">
      <div>
       <label htmlFor="fx-from">{copy.from}</label>
       <select id="fx-from" value={from} onChange={event => setFrom(event.target.value as Currency)}>
        {currencies.map(code => <option key={code}>{code}</option>)}
       </select>
      </div>
      <button type="button" className="acq-button acq-button-plain appraisal-swap" aria-label={copy.swap}
       onClick={() => { setFrom(to); setTo(from); }}>⇄</button>
      <div>
       <label htmlFor="fx-to">{copy.to}</label>
       <select id="fx-to" value={to} onChange={event => setTo(event.target.value as Currency)}>
        {currencies.map(code => <option key={code}>{code}</option>)}
       </select>
      </div>
     </div>
     <div className="appraisal-quote" aria-live="polite">
      {gross !== null && cross !== null ? <>
       <p>{money(numeric, from)}</p>
       <strong>{money(gross)}</strong>
       <p>1 {from} = {cross.toLocaleString(language, { maximumFractionDigits: 6 })} {to}</p>
      </> : <p>{valid ? copy.loading : copy.invalid}</p>}
     </div>
     <p className="appraisal-rate-status" role="status">
      {data ? <>{data.degraded ? copy.fallback : copy.rateDate} · <time dateTime={data.date}>{data.date}</time></> : copy.loading}
     </p>
     <p className="appraisal-footnote">{copy.basis} <a className="acq-link" href={ecbRatesUrl}>{copy.ecb} <span aria-hidden="true">↗</span></a></p>
    </div>
    <div className="appraisal-proceeds">
     <h3>{copy.summary}</h3>
     <div className="appraisal-scope-fields">
      <div>
       <label htmlFor="fx-mandate-scope">{copy.eligibility}</label>
       <select id="fx-mandate-scope" value={malta ? "malta" : "standard"} onChange={event => setMalta(event.target.value === "malta")}>
        <option value="standard">{copy.standard}</option><option value="malta">{copy.malta}</option>
       </select>
      </div>
      {!malta && <div>
       <label htmlFor="fx-retainer-months">{copy.months}</label>
       <select id="fx-retainer-months" value={months} onChange={event => setMonths(Number(event.target.value))}>
        {Array.from({ length: 13 - mandateSummary.minimumTermMonths }, (_, index) => index + mandateSummary.minimumTermMonths)
         .map(month => <option key={month} value={month}>{month} {copy.monthUnit}</option>)}
       </select>
      </div>}
     </div>
     <div aria-live="polite">
      <dl className="appraisal-proceeds-rows">
       {gross !== null && <div><dt>{copy.gross}</dt><dd data-amount="gross">{money(gross)}</dd></div>}
       {feeRows.map(([key, label, value]) => <div key={key}><dt>{label}</dt><dd data-amount={key}>{value}</dd></div>)}
      </dl>
      <p className="appraisal-footnote">{malta ? copy.maltaNote : copy.conditions}</p>
     </div>
     <Link href={mandateSummary.publicPath} className="acq-link">{mandateSummary.version} <span aria-hidden="true">↗</span></Link>
    </div>
   </div>
  </section>
 );
}
