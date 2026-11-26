"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { MandateCopy } from "@/lib/mandate-locales/copy";
import type { MandateEntry } from "@/lib/mandateRecords";
import { mandateAssetFromHash } from "@/lib/mandate-asset-filter";
import { MandateMap } from "./mandate-map";

const thresholds = [0, 5_000_000, 10_000_000, 25_000_000];
const currencies = ["EUR", "GBP", "CHF", "USD", "ZAR"] as const;
type Currency = (typeof currencies)[number];

const subscribeHash = (listener: () => void) => {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
};
const readHash = () => window.location.hash;
const serverHash = () => "";

export function MandateDesk({ copy, language, entries, rateDate }: { copy: MandateCopy; language: string; entries: MandateEntry[]; rateDate: string }) {
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const [selection, setSelection] = useState<{ hash: string; value: string }>();
  const asset = selection?.hash === hash ? selection.value : mandateAssetFromHash(hash);
  function setAsset(value: string) { setSelection({ hash, value }); }
  const [region, setRegion] = useState("");
  const [minimum, setMinimum] = useState(0);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const euros = (entry: MandateEntry) => entry.price / entry.rates[entry.currency];
  const results = entries
    .map((entry, assetIndex) => ({ ...entry, assetIndex, location: copy.locations[assetIndex] }))
    .filter(entry => (asset === "" || Number(asset) === entry.assetIndex)
      && (region === "" || Number(region) === entry.region) && euros(entry) >= thresholds[minimum]);
  const format = new Intl.NumberFormat(language, { style: "currency", currency, maximumFractionDigits: 0 });
  const compact = new Intl.NumberFormat(language, {
    style: "currency", currency: "EUR", notation: "compact", maximumFractionDigits: 0,
  });
  const thresholdLabels = thresholds.map(value => {
    if (value === 0) return copy.all;
    const amount = compact.format(value);
    return (language === "en-GB" ? amount.toUpperCase() : amount) + "+";
  });

  function reset() {
    setAsset("");
    setRegion("");
    setMinimum(0);
  }

  return (
    <>
      <div className="mandate-filters" role="group" aria-label={copy.filters}>
        <label>{copy.assetClass}<select value={asset} onChange={event => setAsset(event.target.value)}>
          <option value="">{copy.all}</option>
          {copy.assets.map((name, index) => <option key={name} value={index}>{name}</option>)}
        </select></label>
        <label>{copy.region}<select value={region} onChange={event => setRegion(event.target.value)}>
          <option value="">{copy.all}</option>
          {copy.regions.map((name, index) => <option key={name} value={index}>{name}</option>)}
        </select></label>
        <div className="mandate-range">
          <label htmlFor="mandate-minimum">{copy.acquisition}<output htmlFor="mandate-minimum">{thresholdLabels[minimum]}</output></label>
          <input id="mandate-minimum" type="range" min="0" max="3" step="1" value={minimum}
            aria-valuetext={thresholdLabels[minimum]} onChange={event => setMinimum(event.target.valueAsNumber)} />
          <div className="mandate-steps" aria-hidden="true">{thresholdLabels.map(label => <span key={label}>{label}</span>)}</div>
        </div>
        <label>{copy.currency}<select value={currency} onChange={event => setCurrency(event.target.value as Currency)}>
          {currencies.map(code => <option key={code}>{code}</option>)}
        </select></label>
        <div className="mandate-view" role="group" aria-label={copy.view}>
          <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>{copy.grid}</button>
          <button type="button" aria-pressed={view === "map"} onClick={() => setView("map")}>{copy.map}</button>
        </div>
      </div>

      {results.length === 0 ? <div className="mandate-empty">
        <p role="status">{copy.empty}</p><button type="button" onClick={reset}>{copy.reset}</button>
      </div> : view === "map" ? <div className="mandate-map-results">
        <MandateMap label={copy.mapLabel} points={results.map(entry => ({ label: entry.location, point: entry.point }))} />
        <ul>{results.map(entry => <li key={entry.slug}>
          <a href={entry.href} hrefLang="en-GB"><strong>{entry.title}</strong><span>{entry.location}</span>
            <span>{copy.price} · {format.format(euros(entry) * entry.rates[currency])}</span>
          </a>
        </li>)}</ul>
      </div> : <div className="mandate-card-grid">
        {results.map(entry => (
          <article key={entry.slug} className="mandate-card">
            <a className="mandate-card-target" href={entry.href} hrefLang="en-GB">
              <div className="mandate-thumb" data-subject={entry.slug}>
                <div className="mandate-thumb-media">
                  {entry.image ? <Image src={entry.image} alt={copy.alts[entry.assetIndex]} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 33vw" /> :
                    <div className="mandate-arches" aria-hidden="true"><i /><i /><i /></div>}
                </div>
                <span className="mandate-card-overlay" aria-hidden="true">+ {copy.dossier}</span>
              </div>
              <div className="mandate-card-details">
                <p className="mandate-id">{entry.id}</p>
                <h3>{entry.title}</h3>
                <p className="mandate-card-location">{copy.assets[entry.assetIndex]} · {entry.location}</p>
                <dl><dt>{copy.price}</dt><dd>{format.format(euros(entry) * entry.rates[currency])}</dd></dl>
                <span className="mandate-card-link">{copy.dossier} <span aria-hidden="true">↗</span></span>
              </div>
            </a>
          </article>
        ))}
      </div>}
      <p className="mandate-fx">{copy.fx} <time dateTime={rateDate}>{rateDate}</time></p>
    </>
  );
}
