"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { saveBriefDraft } from "@/lib/brief-draft";
import { Arrow } from "./chrome";

const purposes = ["Residence", "Investment"] as const;
const markets = [
 { label: "UK", name: "United Kingdom" },
 { label: "Europe", name: "Europe" },
 { label: "South Africa", name: "South Africa" },
] as const;

export function BuyerBriefQuickStart() {
 const [purpose, setPurpose] = useState<typeof purposes[number]>("Residence");
 const [market, setMarket] = useState<typeof markets[number]>(markets[0]);
 const [transferFailed, setTransferFailed] = useState(false);
 const brief = `Property acquisition\nPurpose: ${purpose}\nPreferred market: ${market.name}`;
 const contact = "/contact?interest=buying";

 function carry(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  try {
   saveBriefDraft(sessionStorage, brief);
  } catch {
   event.preventDefault();
   setTransferFailed(true);
  }
 }

 return <section id="buyer-briefs" className="buyer-quick-start wrap" aria-labelledby="buyer-quick-title">
  <div>
   <span className="eyebrow">Buyer brief / Quick start</span>
   <h2 id="buyer-quick-title">Prepare a detailed <em>property brief.</em></h2>
   <p>Choose a purpose and market. Add your preferred locality, budget and priorities when you review your enquiry.</p>
   <Link className="text-link" href="/investor-onboarding">Explore the full buyer onboarding guide <Arrow diagonal/></Link>
  </div>
  <div className="buyer-quick-panel">
   <noscript><style>{".buyer-quick-controls{display:none}"}</style><p><a className="text-link" href={contact}>Open the property enquiry form <Arrow diagonal/></a></p></noscript>
   <div className="buyer-quick-controls">
    <fieldset>
     <legend>Purchase purpose</legend>
     <div className="buyer-option-group">{purposes.map(option => <button type="button" key={option} aria-pressed={purpose === option} onClick={() => {setPurpose(option);setTransferFailed(false);}}>{option}</button>)}</div>
    </fieldset>
    <fieldset>
     <legend>Preferred market</legend>
     <div className="buyer-option-group">{markets.map(option => <button type="button" key={option.label} aria-pressed={market === option} onClick={() => {setMarket(option);setTransferFailed(false);}}>{option.label}</button>)}</div>
    </fieldset>
    <p className="buyer-quick-privacy">Your selections stay in this browser until you submit the enquiry.</p>
    <Link href={`${contact}&brief=prepared`} className="button" onClick={carry}>Review in the enquiry form <Arrow diagonal/></Link>
    {transferFailed && <div className="buyer-quick-fallback">
     <p role="alert">Your browser could not transfer the brief. Copy it before opening the enquiry form.</p>
     <label className="form-field">Prepared brief<textarea readOnly rows={3} value={brief}/></label>
     <Link href={contact} className="text-link">Open the enquiry form <Arrow diagonal/></Link>
    </div>}
   </div>
  </div>
 </section>;
}
