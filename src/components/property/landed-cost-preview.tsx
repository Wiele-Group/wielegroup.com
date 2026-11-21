"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { estimateCurrencies, type EstimateCurrency } from "@/lib/transaction-estimate";
import { Arrow } from "./chrome";

export function LandedCostPreview() {
 const [currency, setCurrency] = useState<EstimateCurrency>("EUR");
 const [subtotal, setSubtotal] = useState<number | null>(null);
 const [available, setAvailable] = useState(false);

 function calculate(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const amounts = new FormData(event.currentTarget);
  setSubtotal(Number(amounts.get("price")) + Number(amounts.get("costs")));
 }

 return <section className="landed-preview" aria-labelledby="landed-preview-title">
  <h3 id="landed-preview-title">Cross-Border Landed Cost Preview</h3>
  <p>Add the purchase price and any known taxes, fees and delivery costs in one currency. Unpriced items are excluded.</p>
  <form hidden={!available} ref={node => { if (node && !available) setAvailable(true); }} onSubmit={calculate} onChange={() => setSubtotal(null)}>
   <div className="landed-preview-fields">
    <label className="form-field">Currency
     <select value={currency} onChange={event => setCurrency(event.target.value as EstimateCurrency)}>
      {estimateCurrencies.map(code => <option key={code}>{code}</option>)}
     </select>
    </label>
    <label className="form-field" key={`price-${currency}`}>Purchase price
     <input name="price" type="number" inputMode="decimal" min=".01" max="1000000000" step=".01" required/>
    </label>
    <label className="form-field" key={`costs-${currency}`}>Known costs (optional)
     <input name="costs" type="number" inputMode="decimal" min="0" max="1000000000" step=".01"/>
    </label>
   </div>
   <button className="button" type="submit">Calculate subtotal</button>
   <div className="landed-preview-result" aria-live="polite">
    {subtotal !== null && <p>Priced subtotal <strong>{new Intl.NumberFormat("en-GB", { style: "currency", currency, currencyDisplay: "code" }).format(subtotal)}</strong></p>}
   </div>
  </form>
  <p className="fine-print">Planning figures only. The full estimator uses dated reference rates when converting currencies. Confirm tax, customs and fees with appropriately licensed practitioners.</p>
  <Link href="/valuations#landed-cost-estimator" className="text-link">Open the full estimator <Arrow diagonal/></Link>
 </section>;
}
