"use client";

import { useState, type ReactNode } from "react";
import { corridorKeys, deskKeys, type Corridor, type Desk, type ResearchCopy } from "@/lib/research-locales/types";

type Entry = { id: string; desk: Desk; corridors: readonly Corridor[]; lead: boolean; card: ReactNode };
type Labels = Pick<ResearchCopy, "desk" | "corridor" | "all" | "allCorridors" | "desks" | "corridors" | "results" | "empty">;

export function BriefingFilter({ entries, labels }: { entries: Entry[]; labels: Labels }) {
  const [desk, setDesk] = useState<Desk | "all">("all");
  const [corridor, setCorridor] = useState<Corridor | "all">("all");
  const matches = ({ desk: entryDesk, corridors }: Entry) =>
    (desk === "all" || entryDesk === desk) && (corridor === "all" || corridors.includes(corridor));
  const count = entries.filter(matches).length;

  return (
    <>
      <noscript><style>{".research-filter { display: none !important; }"}</style></noscript>
      <div className="research-filter">
        <fieldset>
          <legend>{labels.desk}</legend>
          <div className="research-options">
            {(["all", ...deskKeys] as const).map(key => (
              <label key={key}>
                <input type="radio" name="briefing-desk" value={key} checked={desk === key}
                  onChange={() => setDesk(key)} aria-controls="briefing-results" />
                <span>{key === "all" ? labels.all : labels.desks[key]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="research-corridor">
          <span>{labels.corridor}</span>
          <select value={corridor} onChange={event => setCorridor(event.target.value as Corridor | "all")} aria-controls="briefing-results">
            <option value="all">{labels.allCorridors}</option>
            {corridorKeys.map(key => <option key={key} value={key}>{labels.corridors[key]}</option>)}
          </select>
        </label>
        <p className="research-count" role="status">{labels.results.replace("{count}", String(count))}</p>
      </div>
      <div className="research-results" id="briefing-results">
        {entries.map(entry => (
          <div key={entry.id} className={entry.lead ? "research-result research-result-lead" : "research-result"}
            data-desk={entry.desk} hidden={!matches(entry)}>{entry.card}</div>
        ))}
        {!count && <p className="research-empty">{labels.empty}</p>}
      </div>
    </>
  );
}
