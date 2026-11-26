"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const jurisdictionRegions = [
 { name: "United Kingdom", label: "UK" },
 { name: "European Union", label: "EU" },
 { name: "Other Europe", label: "Other Europe" },
 { name: "South Africa", label: "South Africa" },
] as const;
type Region = typeof jurisdictionRegions[number]["name"];
type Destination = { slug: string; name: string; group: string };
type Labels = {
 country: string;
 placeholder: string;
 corridor: string;
 all: string;
 clear: string;
 results: string;
 noResults: string;
 primary: string;
 regions: readonly [string, string, string, string];
 navigation: string;
};
const primaryCorridors = new Set(["malta", "south-africa", "france", "italy", "portugal", "spain"]);

function searchKey(value: string) {
 return value.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export function JurisdictionDirectory({ destinations, labels }: { destinations: Destination[]; labels: Labels }) {
 const search = useRef<HTMLInputElement>(null);
 const [query, setQuery] = useState("");
 const [region, setRegion] = useState<Region | "All">("All");
 const term = searchKey(query);
 const filtered = region !== "All" || term !== "";
 const results = destinations.filter(destination =>
  (region === "All" || region === destination.group) &&
  (searchKey(destination.name).includes(term) ||
   ((term === "uk" || term === "united kingdom") && destination.group === "United Kingdom"))
 );

 return <div className="jurisdiction-directory">
  <noscript><style>{".jurisdiction-controls { display: none }"}</style></noscript>
  <div className="jurisdiction-controls">
   <div className="jurisdiction-search">
    <label htmlFor="country-search">{labels.country}</label>
    <input id="country-search" ref={search} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={labels.placeholder} autoComplete="off" aria-controls="jurisdiction-results"/>
   </div>
   <fieldset>
    <legend>{labels.corridor}</legend>
    <div className="buyer-option-group">
     <button type="button" aria-pressed={region === "All"} aria-controls="jurisdiction-results" onClick={() => setRegion("All")}>{labels.all}</button>
     {jurisdictionRegions.map((option, index) => <button key={option.name} type="button" aria-pressed={region === option.name} aria-controls="jurisdiction-results" onClick={() => setRegion(option.name)}>{labels.regions[index]}</button>)}
    </div>
   </fieldset>
   <div className="jurisdiction-feedback">
    <p role="status">{results.length ? labels.results.replace("{shown}", String(results.length)).replace("{total}", String(destinations.length)) : labels.noResults}</p>
    <button type="button" className="text-link" onClick={() => {setQuery("");setRegion("All");search.current?.focus();}} disabled={!filtered}>{labels.clear}</button>
   </div>
  </div>
  <nav id="jurisdiction-results" className="jurisdiction-results" data-filtered={filtered} aria-label={labels.navigation}>
   {jurisdictionRegions.map(({name, label}, index) => {
    const entries = results.filter(destination => destination.group === name);
    if (!entries.length) return null;
    return <div key={name} className="jurisdiction-group" data-region={label}>
     <h3>{labels.regions[index]}{name === "United Kingdom" && <span className="corridor-tag">{labels.primary}</span>}</h3>
     <ul>{entries.map(destination => <li key={destination.slug}>
      <Link href={`/purchase-guide/${destination.slug}`} hrefLang="en-GB"><span lang="en-GB">{destination.name}</span>{primaryCorridors.has(destination.slug) && <span className="corridor-tag">{labels.primary}</span>}</Link>
     </li>)}</ul>
    </div>;
   })}
  </nav>
 </div>;
}
