"use client";

import { useState } from "react";
import Link from "next/link";
import { mandateFeeAmounts } from "@/lib/mandate-fees";
import type { SellingCopy } from "@/lib/selling-locales/types";

type CalculatorTerms = {
  monthlyRetainerEur: number;
  minimumTermMonths: number;
  commissionPercent: number;
  netRetainerCreditPercent: number;
  version: string;
  publicPath: string;
};

export function RetainerCalculator({ copy, language, terms }: {
  copy: SellingCopy["calculator"]; language: string; terms: CalculatorTerms;
}) {
  const [rawValue, setRawValue] = useState("5000000");
  const [duration, setDuration] = useState(terms.minimumTermMonths);
  const [malta, setMalta] = useState(false);
  const money = new Intl.NumberFormat(language, { style: "currency", currency: "EUR" });
  const saleCents = Math.round(Number(rawValue) * 100);
  const validValue = saleCents >= 100 && saleCents <= 100_000_000_000;
  const { retainer, gross, credit, closing, total } = mandateFeeAmounts(validValue ? saleCents : 0, duration, terms);
  const results = [
    [copy.retainer, retainer], [copy.gross, gross], [copy.credit, credit],
    [copy.closing, closing], [copy.total, total],
  ] as const;
  return (
    <div className="seller-calculator">
      <h3>{copy.title}</h3>
      <p>{copy.note}</p>
      <div className="seller-calculator-fields">
        <label>{copy.mandateType}
          <select value={malta ? "malta" : "standard"} onChange={event => setMalta(event.target.value === "malta")}>
            <option value="standard">{copy.eligible}</option>
            <option value="malta">{copy.malta}</option>
          </select>
        </label>
        {!malta && <>
          <label htmlFor="seller-sale-value">{copy.value}</label>
          <input id="seller-sale-value" type="number" inputMode="decimal" min="1" max="1000000000" step="any"
            value={rawValue} aria-invalid={!validValue || undefined} onChange={event => setRawValue(event.currentTarget.value)} />
          <div className="seller-duration">
            <label htmlFor="seller-duration">{copy.duration}</label>
            <output htmlFor="seller-duration">{duration} {copy.months}</output>
            <input id="seller-duration" type="range" min={terms.minimumTermMonths} max="12" step="1" value={duration}
              aria-valuetext={`${duration} ${copy.months}`} onChange={event => setDuration(event.currentTarget.valueAsNumber)} />
            <span aria-hidden="true">{terms.minimumTermMonths} {copy.months}</span>
            <span aria-hidden="true">12 {copy.months}</span>
          </div>
        </>}
      </div>
      <div aria-live="polite">
        {malta ? <p className="seller-calculator-message">{copy.maltaNotice}</p> :
          !validValue ? <p className="seller-calculator-message">{copy.invalid}</p> : (
            <dl className="seller-results">
              {results.map(([label, cents]) => <div key={label}><dt>{label}</dt><dd>{money.format(cents / 100)}</dd></div>)}
            </dl>
          )}
      </div>
      <p className="seller-calculator-version">{copy.excluded} · <Link href={terms.publicPath}>{terms.version}</Link></p>
    </div>
  );
}
