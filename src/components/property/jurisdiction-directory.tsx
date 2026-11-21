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
const primaryCorridors = new Set(["malta", "south-africa", "france", "italy", "portugal", "spain"]);

function searchKey(value: string) {
 return value.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export function JurisdictionDirectory({ destinations }: { destinations: Destination[] }) {
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
    <label htmlFor="country-search">Search by country or jurisdiction</label>
    <input id="country-search" ref={search} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="For example, Malta or Scotland" autoComplete="off" aria-controls="jurisdiction-results"/>
   </div>
   <fieldset>
    <legend>Region</legend>
    <div className="buyer-option-group">
     <button type="button" aria-pressed={region === "All"} aria-controls="jurisdiction-results" onClick={() => setRegion("All")}>All</button>
     {jurisdictionRegions.map(option => <button key={option.name} type="button" aria-pressed={region === option.name} aria-controls="jurisdiction-results" onClick={() => setRegion(option.name)}>{option.label}</button>)}
    </div>
   </fieldset>
   <div className="jurisdiction-feedback">
    <p role="status">{results.length ? `${results.length} of ${destinations.length} jurisdictions` : "No matching jurisdictions. Try another country or clear the filters."}</p>
    <button type="button" className="text-link" onClick={() => {setQuery("");setRegion("All");search.current?.focus();}} disabled={!filtered}>Clear filters</button>
   </div>
  </div>
  <nav id="jurisdiction-results" className="jurisdiction-results" data-filtered={filtered} aria-label="Purchase requirements by destination">
   {jurisdictionRegions.map(({name, label}) => {
    const entries = results.filter(destination => destination.group === name);
    if (!entries.length) return null;
    return <div key={name} className="jurisdiction-group" data-region={label}>
     <h3>{name}{name === "United Kingdom" && <span className="corridor-tag">Primary Corridor</span>}</h3>
     <ul>{entries.map(destination => <li key={destination.slug}>
      <Link href={`/purchase-guide/${destination.slug}`}>{destination.name}{primaryCorridors.has(destination.slug) && <span className="corridor-tag">Primary Corridor</span>}</Link>
     </li>)}</ul>
    </div>;
   })}
  </nav>
 </div>;
}
