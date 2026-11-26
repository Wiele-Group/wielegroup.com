"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { saveBriefDraft } from "@/lib/brief-draft";
import { en } from "@/lib/buying-locales/en";
import type { BriefCopy, BriefKey } from "@/lib/buying-locales/types";

const contact = "/contact?interest=buying";
const routes = [
  contact,
  "/contact?interest=luxury-assets&asset=yachts&intent=acquire",
  "/contact?interest=luxury-assets&asset=classic-cars&intent=acquire",
];

const fieldOptions = {
  role: "roles", asset: "assets", corridor: "corridors", capital: "capital", horizon: "horizons",
} as const;

const fieldsByStep: readonly (readonly BriefKey[])[] = [["role", "asset"], ["corridor", "capital", "horizon"]];
const allFields = fieldsByStep.flat();
const draftLabels: Record<BriefKey, string> = {
  role: "Representation", asset: "Asset", corridor: "Target corridor", capital: "Capital allocation", horizon: "Timing",
};

export function AcquisitionBrief({ copy, correspondencePath, language }: { copy: BriefCopy; correspondencePath: string; language: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Partial<Record<BriefKey, number>>>({});
  const [transferFailed, setTransferFailed] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  const reviewing = step === fieldsByStep.length;
  const contactPath = routes[selected.asset ?? 0].replace(/^\/contact/, correspondencePath);
  const draft = ["Private acquisition brief", ...allFields.map(field =>
    `${draftLabels[field]}: ${en.brief[fieldOptions[field]][selected[field] ?? -1] ?? ""}`
  )].join("\n");

  useEffect(() => {
    if (hasNavigated.current) heading.current?.focus();
  }, [step]);

  function changeStep(next: number) {
    hasNavigated.current = true;
    setTransferFailed(false);
    setStep(next);
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reviewing) {
      changeStep(step + 1);
      return;
    }

    try {
      saveBriefDraft(sessionStorage, draft);
    } catch {
      setTransferFailed(true);
      return;
    }
    setTransferring(true);
    router.push(contactPath + "&brief=prepared");
  }

  return (
    <div className="acq-brief-panel">
      <noscript><style>{".acq-brief-form{display:none}"}</style></noscript>
      <form className="acq-brief-form" onSubmit={advance} aria-label={copy.title} aria-busy={transferring}>
        <ol className="acq-progress">
          {copy.steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{label}
          </li>)}
        </ol>
        <h3 ref={heading} tabIndex={-1}>{copy.steps[step]}</h3>
        {reviewing ? (
          <dl className="acq-review">
            {allFields.map(field => <div key={field}><dt>{copy.fields[field]}</dt>
              <dd>{copy[fieldOptions[field]][selected[field] ?? -1]}</dd></div>)}
          </dl>
        ) : (
          <div className="acq-brief-fields" key={step}>
            {fieldsByStep[step].map(field => (
              <label key={field}>{copy.fields[field]}
                <select className={field === "capital" ? "acq-capital" : undefined} required
                  value={selected[field] ?? ""} onChange={event => {
                    const value = event.target.value;
                    setSelected(current => ({ ...current, [field]: value === "" ? undefined : Number(value) }));
                  }}>
                  <option value="" disabled>{copy.choose}</option>
                  {copy[fieldOptions[field]].map((option, index) => <option key={option} value={index}>{option}</option>)}
                </select>
              </label>
            ))}
          </div>
        )}
        <div className="acq-brief-actions">
          {step > 0 && <button className="acq-button acq-button-plain" type="button" disabled={transferring}
            onClick={() => changeStep(step - 1)}>{copy.back}</button>}
          <button className="acq-button acq-button-primary" type="submit" disabled={transferring}>
            {reviewing ? copy.handoff : copy.next} <span aria-hidden="true">↗</span>
          </button>
        </div>
        {transferFailed && <div className="acq-transfer-fallback">
          <p role="alert">{copy.failed}</p>
          <label>{copy.prepared}<textarea readOnly value={draft} rows={6} dir="ltr" lang="en-GB" /></label>
        </div>}
      </form>
      <p className="acq-privacy">{copy.privacy}</p>
      <Link className="acq-link" href={contactPath} hrefLang={language}>{copy.plainForm} <span aria-hidden="true">↗</span></Link>
    </div>
  );
}
