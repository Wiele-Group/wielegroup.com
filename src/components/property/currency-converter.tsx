"use client";
import { useEffect, useState } from "react";
import { currencies, convertCurrency, type Currency } from "@/lib/currency";
import { fallbackFxRates, type FxRates } from "@/lib/fx-rates";
const labels: Record<Currency,string> = { EUR:"Euro", GBP:"British pound", ZAR:"South African rand", USD:"US dollar", CHF:"Swiss franc", SEK:"Swedish krona", NOK:"Norwegian krone", DKK:"Danish krone", PLN:"Polish złoty", CZK:"Czech koruna" };
export function CurrencyConverter() {
 const [amount,setAmount] = useState("100000"); const [from,setFrom] = useState<Currency>("EUR"); const [to,setTo] = useState<Currency>("GBP");
 const [data, setData] = useState<FxRates | null>(null);
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
 const numeric = Number(amount); const valid = amount.trim()!=="" && Number.isFinite(numeric) && numeric>=0 && numeric<=1e12;
 let result: number|null = from===to && valid ? numeric : null;
 if(data&&valid) {try{result=convertCurrency(numeric,from,to,data.rates);}catch{result=null;}}
 const money = (value:number,code:Currency) => new Intl.NumberFormat("en-GB",{style:"currency",currency:code,currencyDisplay:"code",maximumFractionDigits:2}).format(value);
 return <section className="valuation-converter" id="currency-converter" aria-labelledby="currency-title"><div><span className="eyebrow">UK · Europe · South Africa / Currency</span><h2 id="currency-title">Put the figures<br/><em>in perspective.</em></h2><p>Compare a property or asset budget across currencies. Reference rates are indicative; your bank or broker’s rate and fees will differ.</p></div><div className="valuation-converter-panel"><div className="form-field"><label htmlFor="fx-amount">Amount</label><input id="fx-amount" type="number" inputMode="decimal" min="0" max="1000000000000" step="any" value={amount} onChange={e=>setAmount(e.target.value)} aria-describedby="fx-help" /></div><div className="valuation-currencies"><div className="form-field"><label htmlFor="fx-from">From</label><select id="fx-from" value={from} onChange={e=>setFrom(e.target.value as Currency)}>{currencies.map(c=><option key={c} value={c}>{c} — {labels[c]}</option>)}</select></div><button className="valuation-swap" type="button" aria-label="Swap currencies" onClick={()=>{setFrom(to);setTo(from);}}>⇄</button><div className="form-field"><label htmlFor="fx-to">To</label><select id="fx-to" value={to} onChange={e=>setTo(e.target.value as Currency)}>{currencies.map(c=><option key={c} value={c}>{c} — {labels[c]}</option>)}</select></div></div><div className="valuation-result" aria-live="polite" aria-atomic="true">{!valid ? <p>Enter an amount from 0 to 1 trillion.</p> : result!==null ? <><span>{money(numeric,from)} is approximately</span><strong>{money(result,to)}</strong>{data&&<span>1 {from} = {(data.rates[to]/data.rates[from]).toLocaleString("en-GB",{maximumFractionDigits:6})} {to}</span>}</> : <p>{"Loading reference rates…"}</p>}</div><p className="fine-print" id="fx-help">{data?.degraded ? `Fallback snapshot from ${data.date}. Current rates are temporarily unavailable. ` : data ? `Rate date: ${data.date}. ` : "Loading the latest publication. "}{data?.source ?? "ECB reference rates via Frankfurter"}. No tax, commission, transfer charges or FX spread included. Converting a price does not establish an asset’s value in another market. <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener noreferrer">ECB rate information ↗</a></p></div></section>;
}
