"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { assetClasses, salesCategories, prepareSalesBrief, type SalesCategory, type SalesIntake } from "@/lib/sales-preparation";
import { clearBriefDraft, saveBriefDraft } from "@/lib/brief-draft";
import { trackPropertyEvent } from "./analytics";
import { Arrow } from "./chrome";
import { RecordReadiness } from "./mandate-fields";
import { mandateCategoryFromSlug, mandateCurrencies, mandateRecords } from "@/schemas/assetMandateIntake";
const plannerTargets = [
 { category: "yachts", hash: "#sales-brief-yachts", label: "Sell a yacht" },
 { category: "classic-cars", hash: "#sales-brief-classic-cars", label: "Sell a classic car" },
] as const;
const examples: Record<SalesCategory, { location: string; particulars: string }> = {
 property: { location: "For example, Swieqi, Malta", particulars: "For example, freehold villa, 240 m² internally, vacant possession" },
 yachts: { location: "For example, Antibes, France", particulars: "For example, 32 m motor yacht, 2017 build, 2023 refit, private use" },
 "classic-cars": { location: "For example, Oxfordshire, UK", particulars: "For example, 1967 right-hand-drive coupé with documented restoration" },
};
const initial:SalesIntake={category:"property",location:"",specification:"",price:"",currency:"EUR",authority:"To confirm",liquidity:"Not assessed",timing:"Exploring options",privacy:"To discuss",evidence:[]};
export function SellerAssetLinks() {
 return <div className="seller-asset-links" role="group" aria-label="Sell a yacht or classic car">
  {plannerTargets.map(({hash, label}) => <a key={hash} className="text-link" href={hash} onClick={() => {
   if (window.location.hash === hash) window.dispatchEvent(new HashChangeEvent("hashchange"));
  }}>{label} <Arrow diagonal/></a>)}
 </div>;
}

export function SalesPreparation(){
 const [input,setInput]=useState(initial),[show,setShow]=useState(false),[error,setError]=useState("");
 const title=useRef<HTMLHeadingElement>(null),started=useRef(false);
 const details=useRef<HTMLDetailsElement>(null), categoryField=useRef<HTMLSelectElement>(null);
 const guidance = examples[input.category];

 useEffect(() => {
  let animation: number;
  function focusPlanner() {
   const hash = window.location.hash;
   const target = plannerTargets.find(option => option.hash === hash);
   if (!target && hash !== "#sales-brief" && hash !== "#sales-brief-planner") return;
   if (details.current) details.current.open = true;
   if (target) {
    setInput(current => current.category === target.category ? current : {
     ...current, category: target.category, evidence: [], specification: "", price: "",
    });
    setShow(false);
    setError("");
   }
   cancelAnimationFrame(animation);
   animation = requestAnimationFrame(() => categoryField.current?.focus({ preventScroll: true }));
  }
  const initialFrame = requestAnimationFrame(focusPlanner);
  window.addEventListener("hashchange", focusPlanner);
  return () => {
   cancelAnimationFrame(initialFrame);
   cancelAnimationFrame(animation);
   window.removeEventListener("hashchange", focusPlanner);
  };
 }, []);

 const category = mandateCategoryFromSlug(input.category);
 const checks = Object.entries(mandateRecords[category]);
 const records = Object.fromEntries(checks.map(([key,label]) => [key, input.evidence.includes(label)]));
 const asset=assetClasses[input.category],plan=prepareSalesBrief(input, checks.map(([, label]) => label));
 const detailedHref = `/seller-enquiry?asset=${input.category}&brief=prepared#start-onboarding`;
 function transferDetailed(event: React.MouseEvent<HTMLAnchorElement>) {
  try { saveBriefDraft(sessionStorage, plan.draft, undefined, { asset:input.category, location:input.location, currency:input.currency, available:Object.keys(records).filter(key => records[key]) }); trackPropertyEvent("seller_preparation",{action:"transfer"}); }
  catch { event.preventDefault(); setError("Your browser could not transfer the brief. Copy your draft, then open the detailed seller form."); }
 }
 function update<K extends keyof SalesIntake>(key:K,value:SalesIntake[K]){if(!started.current){trackPropertyEvent("seller_preparation",{action:"start"});started.current=true;}setInput(current=>({...current,[key]:value,...(key==="category"?{evidence:[],specification:"",price:""}: {})}));setShow(false);setError("");}
 function prepare(e:React.FormEvent){e.preventDefault();setShow(true);trackPropertyEvent("seller_preparation",{action:"review"});requestAnimationFrame(()=>title.current?.focus());}
 function transfer(){try{saveBriefDraft(sessionStorage,plan.draft);trackPropertyEvent("seller_preparation",{action:"transfer"});window.location.assign(input.category==="property"?"/contact?interest=marketing&brief=prepared":`/contact?interest=luxury-assets&asset=${input.category}&intent=offer&brief=prepared`);}catch{setError("Your browser could not transfer the brief. Copy the preparation text below into the contact form.");}}
 return <section className="sales-preparation wrap" id="sales-brief-planner" aria-labelledby="sales-preparation-title">
 <span className="sales-planner-anchor" id="sales-brief"/>
 {plannerTargets.map(target => <span key={target.hash} className="sales-planner-anchor" id={target.hash.slice(1)}/>)}
 <header><span className="eyebrow">Malta-based asset sales / Your enquiry</span><h2 id="sales-preparation-title">Your asset.<br/><em>Your starting point.</em></h2><p>Organise your property, yacht or classic-car sales brief. Gather the practical details for a focused first conversation with Wiele.</p></header><details className="sales-preparation-open" ref={details}><summary>Prepare my sales brief <span aria-hidden="true">+</span></summary><noscript><style>{".sales-preparation-open > form { display:none }"}</style><p className="sales-preparation-note">To discuss an asset without JavaScript, email <a href="mailto:admin@wielegroup.com">admin@wielegroup.com</a> with its category, location and your sale objectives. Keep bank details and identity documents out of the message.</p></noscript><form onSubmit={prepare} aria-label="Prepare your asset sales brief"><div className="sales-preparation-fields"><div className="form-field"><label htmlFor="sales-category">Asset category</label><select id="sales-category" ref={categoryField} value={input.category} aria-describedby="sales-category-note" onChange={e=>update("category",e.target.value as SalesCategory)}>{salesCategories.map(key=><option key={key} value={key}>{assetClasses[key].name}</option>)}</select><p className="form-note" id="sales-category-note">Changing category clears the particulars, asking price and selected records.</p></div><div className="form-field"><label htmlFor="sales-location">Country and locality, if known</label><input id="sales-location" value={input.location} onChange={e=>update("location",e.target.value)} maxLength={120} placeholder={guidance.location} autoComplete="off"/></div><div className="form-field"><label htmlFor="sales-authority">Your relationship to the asset</label><select id="sales-authority" value={input.authority} onChange={e=>update("authority",e.target.value)}>{["To confirm","Owner","Authorised representative","Exploring on behalf of an owner"].map(x=><option key={x}>{x}</option>)}</select></div><div className="form-field"><label htmlFor="sales-privacy">Preferred sales visibility</label><select id="sales-privacy" value={input.privacy} onChange={e=>update("privacy",e.target.value)}>{["To discuss","Confidential first","Public marketing considered"].map(x=><option key={x}>{x}</option>)}</select></div><div className="form-field"><label htmlFor="sales-currency">Asking-price currency</label><select id="sales-currency" value={input.currency} onChange={e=>update("currency",e.target.value)}>{mandateCurrencies.map(x=><option key={x}>{x}</option>)}</select></div><div className="form-field"><label htmlFor="sales-price">Asking price or range, if set</label><input id="sales-price" value={input.price} onChange={e=>update("price",e.target.value)} maxLength={60} placeholder="Leave blank if the asking price is not set" autoComplete="off"/><Link className="text-link seller-estimate-link" href="/valuations#landed-cost-estimator">Estimate net seller proceeds &amp; jurisdictional deductions <Arrow diagonal/></Link></div><div className="form-field"><label htmlFor="sales-liquidity">Your view of the market</label><select id="sales-liquidity" value={input.liquidity} onChange={e=>update("liquidity",e.target.value)}>{["Not assessed","High demand / low supply","Niche collector market","Time-sensitive sale"].map(x=><option key={x}>{x}</option>)}</select></div><div className="form-field"><label htmlFor="sales-timing">Your sale timing</label><select id="sales-timing" value={input.timing} onChange={e=>update("timing",e.target.value)}>{["Exploring options","Within 3 months","3–6 months","Time-sensitive"].map(x=><option key={x}>{x}</option>)}</select></div></div><div className="form-field"><label htmlFor="sales-specification">Asset particulars, if available</label><p className="form-note" id="sales-specification-help">{asset.specification}. Summarise the facts; do not include identifiers or confidential records.</p><textarea id="sales-specification" value={input.specification} onChange={e=>update("specification",e.target.value)} maxLength={500} placeholder={guidance.particulars} aria-describedby="sales-specification-help"/></div><fieldset className="sales-evidence"><legend>Records on file / {asset.name}</legend><p>Select the groups you hold. For a live mandate, Wiele checks supporting records and marketing authority with the appropriate practitioners.</p>{checks.map(([, item])=><label key={item}><input type="checkbox" checked={input.evidence.includes(item)} onChange={e=>update("evidence",e.target.checked?[...input.evidence,item]:input.evidence.filter(x=>x!==item))}/><span>{item}</span></label>)}<RecordReadiness category={category} records={records} points/></fieldset><p className="sales-preparation-note">This planner works in your browser. It does not contact buyers, upload records, assess value or send an enquiry. Your selections are transferred only if you choose to use the brief. Keep identity and banking documents out of public forms. <Link href="/privacy">Privacy notice</Link>.</p><button className="button" type="submit">Review my preparation <Arrow diagonal/></button></form>{show&&<article className="sales-preparation-result" aria-labelledby="sales-result-title"><span className="eyebrow">Your preparation / {asset.name}</span><h3 id="sales-result-title" tabIndex={-1} ref={title}>A clear starting point.</h3><p>Your answers are self-described, not verified. Wiele will discuss your objectives, the information available and an appropriate next step.</p><div className="sales-result-columns"><section><h4>Clarify first</h4><ol>{plan.questions.map(q=><li key={q}>{q}</li>)}</ol></section><section><h4>Information to prepare</h4><ul>{plan.missing.map(x=><li key={x}>{x}</li>)}</ul>{!plan.missing.length&&<p>You marked each information group available. Documentary review is still required.</p>}</section></div><details><summary>Read your enquiry draft <span aria-hidden="true">+</span></summary><pre className="sales-draft">{plan.draft}</pre></details><p className="sales-preparation-note">Using the brief makes it available in this browser tab for 30 minutes after your latest edit in the enquiry form, or until saved or discarded. You can edit it before sending. No instruction, reservation or payment obligation is created.</p>{error&&<p role="alert">{error} <Link href="/contact">Open the contact form</Link></p>}<div className="button-row"><button className="button" type="button" onClick={transfer}>Review in the enquiry form <Arrow diagonal/></button><Link className="text-link" href={detailedHref} onClick={transferDetailed}>Continue to the detailed seller form <Arrow diagonal/></Link><button className="text-link" type="button" onClick={()=>{setInput(initial);setShow(false);started.current=false;setError("");try{clearBriefDraft(sessionStorage);}catch{}}}>Clear preparation</button></div></article>}</details></section>;
}
