"use client";

import { useState, type ReactNode } from "react";

const regions = [
 { id: "all", label: "All" },
 { id: "uk", label: "UK" },
 { id: "europe", label: "Europe" },
 { id: "za", label: "South Africa" },
 { id: "elsewhere", label: "International" },
] as const;

export type PropertyRegion = "uk" | "eu" | "other-europe" | "za" | "elsewhere";
type Selection = typeof regions[number]["id"];
type Entry = { id: string; region: PropertyRegion; content: ReactNode; flagship?: boolean };

function matches(selection: Selection, region: PropertyRegion) {
 if (selection === "all") return true;
 if (selection === "europe") return region === "eu" || region === "other-europe";
 return selection === region;
}

export function PropertyCollectionFilter({ entries }: { entries: Entry[] }) {
 const [selection, setSelection] = useState<Selection>("all");
 const count = entries.filter(entry => matches(selection, entry.region)).length;

 return <>
  <noscript><style>{".property-filter { display: none }"}</style></noscript>
  <div className="property-filter" role="group" aria-label="Filter sample properties by location">
   {regions.map(({ id, label }) => (
    <button key={id} type="button" aria-pressed={selection === id} aria-controls="property-collection-grid" onClick={() => setSelection(id)}>{label}</button>
   ))}
   <p role="status">{count} {count === 1 ? "dossier" : "dossiers"}</p>
  </div>
  <div id="property-collection-grid" className="property-collection-grid">
   {entries.map(({ id, region, content, flagship }) => (
    <article key={id} className={flagship ? "property-study property-study-flagship" : "property-study"} hidden={!matches(selection, region)}>{content}</article>
   ))}
  </div>
 </>;
}
