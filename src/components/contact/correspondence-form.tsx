"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { trackPropertyEvent } from "@/components/property/analytics";
import type { EnquiryQuery } from "@/components/property/enquiry-form";
import { clearBriefDraft, readBriefDraft, saveBriefDraft, summariseBriefDraft } from "@/lib/brief-draft";
import { correspondenceAssets, correspondenceCorridors, correspondenceDesks, correspondenceRoles } from "@/lib/contact-locales/correspondence";
import type { ContactCopy } from "@/lib/contact-locales/copy";
import { listingExamples } from "@/lib/listing-examples";
import { propertyBrand } from "@/lib/property";

type Desk = typeof correspondenceDesks[number];

function initialDesk(query: EnquiryQuery): Desk {
 if (query.interest === "marketing" || query.intent === "offer" || query.example) return "seller";
 if (query.interest === "buying" || query.interest === "luxury-assets") return "acquisition";
 return "counsel";
}

export function CorrespondenceForm({ copy, query }: { copy: ContactCopy; query: EnquiryQuery }) {
 const [desk, setDesk] = useState<Desk>(() => initialDesk(query));
 const example = listingExamples.find(item => item.slug === query.example);
 const [asset, setAsset] = useState<string>(() => {
  if (correspondenceAssets.some(value => value === query.asset)) return String(query.asset);
  if (example?.category === "classic-cars" || example?.category === "yachts") return example.category;
  return query.interest === "marketing" || query.interest === "buying" || example ? "property" : "";
 });
 const [draft, setDraft] = useState<string | null>(null);
 const message = useRef<HTMLTextAreaElement>(null);
 const prepared = query.brief === "prepared";
 const [token, setToken] = useState("");
 const [widget, setWidget] = useState(0);
 const [pending, setPending] = useState(false);
 const [error, setError] = useState("");
 const [ticket, setTicket] = useState("");
 const summary = draft ? summariseBriefDraft(draft) : [];

 useEffect(() => {
  if (!prepared || !message.current || message.current.value) return;
  const saved = readBriefDraft(sessionStorage);
  if (!saved) return;
  message.current.value = saved;
  // eslint-disable-next-line react-hooks/set-state-in-effect -- Restore the browser-local draft after hydration.
  setDraft(saved);
  const first = saved.split("\n")[0];
  if (first.startsWith("Indicative valuation enquiry")) {
   setDesk("valuation");
   if (first.endsWith(" — Yachts")) setAsset("yachts");
   else if (first.endsWith(" — Classic cars")) setAsset("classic-cars");
   else if (first.endsWith(" — Property")) setAsset("property");
  } else if (first === "Private acquisition brief") setDesk("acquisition");
 }, [prepared]);

 const onToken = useCallback((value: string) => setToken(value), []);
 const onError = useCallback(() => { setToken(""); setError(copy.error); }, [copy.error]);

 async function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!token || pending) return;
  setError("");
  setPending(true);
  const data = new FormData(event.currentTarget);
  const assetIntent = desk === "seller" ? "offer" : "acquire";
  const luxury = (asset === "yachts" || asset === "classic-cars") && (desk === "seller" || desk === "acquisition");
  const interest = luxury ? "luxury-assets" : desk === "seller" ? "marketing" : desk === "acquisition" ? "buying"
   : desk === "counsel" && query.interest === "consortium" ? "consortium"
   : desk === "counsel" && query.interest === "maintenance" ? "maintenance" : "general";
  try {
   const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: data.get("name"), email: data.get("email"), phone: data.get("phone"), interest,
     ...(luxury ? { assetCategory: asset, assetIntent } : {}), message: data.get("message"), website: data.get("website"), token,
     correspondence: { desk, role: data.get("role"), corridor: data.get("corridor"), asset },
    }) });
   const payload = await response.json() as { ticketId?: string };
   if (!response.ok || !payload.ticketId) throw new Error(copy.error);
   trackPropertyEvent("generate_lead", { enquiry_type: interest, ...(luxury ? { asset_category: asset, asset_intent: assetIntent } : {}) });
   try { clearBriefDraft(sessionStorage); } catch { /* Receipt depends on server storage. */ }
   setDraft(null);
   setTicket(payload.ticketId);
  } catch {
   setError(copy.error);
   setToken("");
   setWidget(value => value + 1);
  } finally { setPending(false); }
 }

 const position = correspondenceDesks.indexOf(desk);
 const market = ["Italy", "Spain", "Dubai", "Cape Town", "London"].find(value => value === query.market);
 const initialMessage = example ? `I would like to discuss marketing my asset using a presentation like the ${example.title} example.` : undefined;
 const defaultCorridor = market === "London" ? "United Kingdom" : market === "Cape Town" ? "Southern Africa"
  : market === "Italy" || market === "Spain" ? "Continental Europe" : "";

 if (ticket) return <div className="desk-glass correspondence-form" role="status" tabIndex={-1} ref={node => node?.focus()}>
  <h3>{copy.thanks}</h3><p>{copy.receipt} <strong>{ticket.slice(-8).toUpperCase()}</strong></p>
 </div>;

 return <form className="desk-glass correspondence-form" onSubmit={submit} action="/api/enquiry" method="post"
  aria-label={copy.formTitle} aria-busy={pending}>
  <fieldset><legend>{copy.pick}</legend>
   <div className="desk-choice">{correspondenceDesks.map((value,index) => <label key={value}>
    <input name="correspondence-desk" type="radio" value={value} checked={desk === value} onChange={() => setDesk(value)}
     aria-controls="correspondence-guidance"/><span>{copy.desks[index]}</span>
   </label>)}</div>
  </fieldset>
  <p id="correspondence-guidance" aria-live="polite">{copy.hints[position]} {market && <strong>{market}</strong>}</p>
  {draft !== null && <div className="correspondence-draft">
   <p role="status">{copy.attach}</p>
   {summary.length > 0 && <dl lang="en-GB">{summary.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
   <button className="acq-button acq-button-plain" type="button" onClick={() => {
    try { clearBriefDraft(sessionStorage); } catch { /* The visible draft can still be cleared. */ }
    if (message.current) message.current.value = "";
    setDraft(null);
   }}>{copy.discard}</button>
  </div>}
  <div className="correspondence-fields">
   <label>{copy.name}<input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label>
   <label>{copy.role}<select name="role" defaultValue="" required>
    <option value="" disabled>{copy.choose}</option>{correspondenceRoles.map((value,index) => <option key={value} value={value}>{copy.roles[index]}</option>)}
   </select></label>
   <label>{copy.corridor}<select name="corridor" defaultValue={defaultCorridor} required>
    <option value="" disabled>{copy.choose}</option>{correspondenceCorridors.map((value,index) => <option key={value} value={value}>{copy.corridors[index]}</option>)}
   </select></label>
   <label>{copy.asset}<select name="asset" value={asset} onChange={event => setAsset(event.target.value)} required>
    <option value="" disabled>{copy.choose}</option>{correspondenceAssets.map((value,index) => <option key={value} value={value}>{copy.assets[index]}</option>)}
   </select></label>
   <label>{copy.email}<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
   <label>{copy.phone}<input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
  </div>
  <label>{copy.note}<textarea name="message" ref={message} defaultValue={initialMessage} minLength={10} maxLength={3000}
   required aria-describedby="correspondence-guidance correspondence-privacy"
   onChange={event => { if (prepared && draft !== null) {
    try { saveBriefDraft(sessionStorage, event.target.value); setDraft(event.target.value); } catch { setDraft(null); }
   } }}/></label>
  <div className="honeypot" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off"/></div>
  <p id="correspondence-privacy">{copy.privateNote} <Link className="acq-link" href="/privacy">{copy.privacy}</Link></p>
  <noscript><p>{copy.noJs} <a href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a></p></noscript>
  <TurnstileWidget key={widget} className="verification-note" onToken={onToken} onError={onError}/>
  {error && <div role="alert"><p>{error}</p>{!token && <button type="button" className="acq-button acq-button-plain"
   onClick={() => { setError(""); setWidget(value => value + 1); }}>{copy.retry}</button>}</div>}
  <button type="submit" className="acq-button acq-button-primary" disabled={pending || !token}>
   {pending ? copy.sending : copy.send}<span aria-hidden="true">↗</span>
  </button>
 </form>;
}
