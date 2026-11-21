"use client";

import { useId, useRef, useState } from "react";
import type { MandateHandoff } from "@/lib/brief-draft";
import { convertCurrency, type ReferenceRates } from "@/lib/currency";
import {
 alternateUnits, mandateCategories, mandateCurrencies, mandateFields, mandateNames, mandateOptionLabel, mandateRecords,
 mandateSteps, recordsReadiness, roundedAmount, type CurrencyCode, type MandateCategory, type MandateField, type Measure,
} from "@/schemas/assetMandateIntake";

type Numbers = Record<string, string>;
type Units = Partial<Record<Measure, "alternate" | "primary">>;
const defaults: Record<string, string> = { priceDisplayMode:"POA", preferredLanguage:"EN", saleTiming:"Exploring options" };
const marketLabels = ["Within 3 months", "3–6 months", "6–12 months", "Exploring options"];
const measureFor: Record<MandateCategory, Measure> = { PROPERTY:"area", YACHT:"length", CLASSIC_CAR:"distance" };

export function RecordReadiness({ category, records, points = false }: { category: MandateCategory; records: Record<string, boolean>; points?: boolean }) {
 const count = recordsReadiness(category, records);
 return <div className="mandate-readiness" aria-live="polite">
  <p><strong>{points ? `${count.available} / ${count.total}` : `${count.availablePercent}%`}</strong> seller-reported record coverage{!points && ` · ${count.available} of ${count.total} groups held`}</p>
  <meter min={0} max={points ? count.total : 100} value={points ? count.available : count.availablePercent} aria-label="Seller-reported record coverage" aria-valuetext={`${count.available} of ${count.total} groups held`}>{count.availablePercent}%</meter>
  <p className="form-note">{count.verifiedPercent}% independently verified at intake. Wiele confirms documentary evidence separately with the appropriate practitioners.</p>
 </div>;
}

export function MandateFields({ category, selectCategory, pending, onCurrencyPending, initial }: {
 category: MandateCategory; selectCategory: (value: MandateCategory) => void; pending: boolean; onCurrencyPending: (pending: boolean) => void; initial: MandateHandoff | null;
}) {
 const uid = useId();
 const definitions = mandateFields(category);
 const [numbers, setNumbers] = useState<Numbers>({});
 const canonicalMeasurements = useRef<Numbers>({});
 const [units, setUnits] = useState<Units>({});
 const [answers, setAnswers] = useState<Record<string, string>>(defaults);
 const [records, setRecords] = useState<Record<string, boolean>>(() => Object.fromEntries((initial?.available ?? []).map(key => [key,true])));
 const [currency, setCurrency] = useState<CurrencyCode>(() => mandateCurrencies.find(code => code === initial?.currency) ?? "EUR");
 const [rateDate, setRateDate] = useState("");
 const [fxStatus, setFxStatus] = useState("");
 const [fetching, setFetching] = useState(false);
 const measure = measureFor[category];
 const config = alternateUnits[measure];
 const priceMode = answers.priceDisplayMode;
 const numericFields = definitions.filter(([, field]) => field.kind === "money" || field.kind === "number");

 function setAnswer(key: string, value: string) {
  setAnswers(previous => ({ ...previous, [key]:value }));
 }

 function changeUnit(next: "primary" | "alternate") {
  const previous = units[measure] ?? "primary";
  if (previous === next) return;
  setNumbers(entries => {
   const updated = { ...entries };
   for (const [key, field] of numericFields) {
    const canonical = canonicalMeasurements.current[key];
    if (field.measure === measure && canonical) {
     updated[key] = next === "primary" ? canonical : String(roundedAmount(Number(canonical) / config.factor, 8));
    }
   }
   return updated;
  });
  setUnits(previousUnits => ({ ...previousUnits, [measure]:next }));
 }

 async function changeCurrency(next: CurrencyCode) {
  if (next === currency || fetching) return;
  const keys = numericFields.filter(([key, field]) => field.kind === "money" && numbers[key]?.trim() && Number.isFinite(Number(numbers[key]))).map(([key]) => key);
  setFxStatus("");
  if (!keys.length) { setCurrency(next); setRateDate(""); return; }
  setFetching(true);
  onCurrencyPending(true);
  try {
   const response = await fetch("/api/currency", { signal:AbortSignal.timeout(10000) });
   if (!response.ok) throw new Error("Rates unavailable");
   const data = await response.json() as ReferenceRates;
   const exchange = convertCurrency(1,currency,next,data.rates);
   const amounts = Object.fromEntries(keys.map(key => [key, String(roundedAmount(Number(numbers[key]) * exchange, 2))]));
   setNumbers(previous => ({ ...previous, ...amounts }));
   setCurrency(next);
   setRateDate(data.date);
   setFxStatus(`Amounts converted using ECB reference rates dated ${data.date}. Bank rates may differ.`);
  } catch {
   setFxStatus("Reference rates are unavailable. Your amounts remain in the original currency.");
  } finally {
   setFetching(false);
   onCurrencyPending(false);
  }
 }

 function changeNumber(key: string, field: MandateField, value: string) {
  if (field.measure) canonicalMeasurements.current[key] = value && units[field.measure] === "alternate"
   ? String(roundedAmount(Number(value) * alternateUnits[field.measure].factor, 8)) : value;
  setNumbers(previous => ({ ...previous, [key]:value }));
 }

 function hidden(key: string) {
  if (key === "askingPrice") return priceMode === "POA";
  if (key === "guidePriceUpper") return priceMode !== "GUIDE_RANGE";
  if (key === "unexpiredLeaseYears") return answers.tenureType !== "LEASEHOLD";
  if (key === "berthLeaseExpiryYear") return answers.berthIncludedOrTransferable !== "true";
  if (key === "isSpecialDesignatedAreaMalta") return answers.jurisdiction !== "EU_MALTA";
  return false;
 }

 function renderField(key: string, field: MandateField) {
  const id = `${uid}-${key}`;
  const name = `mandate-${key}`;
  const unit = field.measure ? alternateUnits[field.measure][units[field.measure] ?? "primary"] : field.kind === "money" ? currency : "";
  const label = key === "askingPrice" && priceMode === "GUIDE_RANGE" ? "Lower guide price" : field.label;
  const attrs = { id, name, "aria-describedby": field.help ? `${id}-help` : undefined };
  return <div className="form-field" key={key}>
   <label htmlFor={id}>{label}{unit && ` (${unit})`}{(field.required || key === "askingPrice" || key === "guidePriceUpper") && " · required"}</label>
   {key === "currency"
    ? <select {...attrs} value={currency} disabled={fetching} onChange={e => void changeCurrency(e.target.value as CurrencyCode)}>{mandateCurrencies.map(code => <option key={code}>{code}</option>)}</select>
    : field.kind === "choice" || field.kind === "boolean" || key === "saleTiming"
     ? <select {...attrs} value={answers[key] ?? ""} onChange={e => setAnswer(key,e.target.value)}>
      <option value="">{field.required ? "Select an option" : "To confirm / not applicable"}</option>
      {(key === "saleTiming" ? marketLabels : field.options ?? ["true","false"]).map(value => <option key={value} value={value}>{value === "true" ? "Yes" : value === "false" ? "No" : key === "saleTiming" ? value : mandateOptionLabel(value)}</option>)}
     </select>
     : field.kind === "number" || field.kind === "money"
      ? <input {...attrs} inputMode={field.integer ? "numeric" : "decimal"} type="number" step={field.integer ? "1" : "any"} value={numbers[key] ?? ""} disabled={field.kind === "money" && fetching} onChange={e => changeNumber(key,field,e.target.value)}/>
      : field.kind === "list" || (field.max ?? 0) > 140
       ? <textarea {...attrs} maxLength={field.kind === "list" ? 1200 : field.max} rows={3} placeholder={field.kind === "list" ? "Separate entries by commas or new lines" : undefined}/>
       : <input {...attrs} maxLength={field.max} autoComplete="off" defaultValue={key === "assetLocation" ? initial?.location : undefined} placeholder={key === "assetLocation" ? "Country and locality only" : undefined}/>}
   {field.help && <p className="form-note" id={`${id}-help`}>{field.help}</p>}
  </div>;
 }

 return <fieldset disabled={pending} className="mandate-fields">
  <legend>Asset specification and readiness</legend>
  <label className="form-field mandate-category">Asset category
   <select name="mandateCategory" value={category} disabled={fetching} onChange={e => selectCategory(e.target.value as MandateCategory)}>
    {mandateCategories.map(key => <option key={key} value={key}>{mandateNames[key]}</option>)}
   </select>
  </label>
  <p className="form-note">Start with the asset location and proposed timing. Choose the category first. Changing it clears the specification fields. Leave unknown particulars blank. Do not include identity documents, bank details, exact storage addresses or confidential identifiers.</p>
  {mandateSteps.map((title,index) => <details className="mandate-step" key={title} open={index === 0 ? true : undefined}>
   <summary>{title}</summary>
   {index === 1 && <label className="form-field mandate-unit">{config.label}
    <select name={`unit-${measure}`} value={units[measure] ?? "primary"} onChange={e => changeUnit(e.target.value as "alternate" | "primary")}>
     <option value="primary">{config.primary}</option><option value="alternate">{config.alternate}</option>
    </select>
   </label>}
   <div className="mandate-grid">{definitions.filter(([key, field]) => field.step === index && !hidden(key)).map(([key, field]) => renderField(key,field))}</div>
   {index === 2 && <div className="mandate-records">
    <h3>Records held on file</h3>
    <p className="form-note">Tick the records you can produce for separate review. No document upload is required.</p>
    {Object.entries(mandateRecords[category]).map(([key,label]) => <label className="onboarding-acknowledgement" key={key}>
     <input type="checkbox" name={`record-${key}`} checked={records[key] ?? false} onChange={e => setRecords(previous => ({ ...previous, [key]:e.target.checked }))}/><span>{label}</span>
    </label>)}
    <RecordReadiness category={category} records={records}/>
   </div>}
   {index === 3 && <><input type="hidden" name="mandate-referenceRateDate" value={rateDate}/><p className="form-note" aria-live="polite">{fetching ? "Checking dated reference rates…" : fxStatus || "The selected currency applies to every monetary field. Switching currency converts entered amounts using dated reference rates when available."}</p></>}
  </details>)}
 </fieldset>;
}
