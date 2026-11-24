"use client";
import Image from "next/image";
import { ScrollImage } from "./experience-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Arrow } from "./chrome";
import { propertyBrand } from "@/lib/property";
import { saveBriefDraft } from "@/lib/brief-draft";
import { trackPropertyEvent } from "./analytics";

const categories = [
 {id:"property",name:"Property",image:"/property/wiele-global-villa-20261113.webp",alt:"AI-created coastal architectural villa"},
 {id:"yachts",name:"Yachts",image:"/luxury-assets/wiele-yachts-20261113.webp",alt:"AI-created motor yacht concept"},
 {id:"classic-cars",name:"Classic cars",image:"/luxury-assets/wiele-classic-cars-20261113.webp",alt:"AI-created classic grand touring car concept"},
] as const;
type Category = typeof categories[number]["id"];

export function PerspectiveExperience({ afterHero }: { afterHero?: ReactNode }) {
 const stepTitle=useRef<HTMLHeadingElement>(null);
 const [category,setCategory]=useState<Category>("property");
 const [briefStarted,setBriefStarted]=useState(false);
 const [objectiveOutlined,setObjectiveOutlined]=useState(false);
 const [specifics,setSpecifics]=useState<Record<string,string>>({});
 const [step,setStep]=useState(0);
 const previousStep = useRef(step);
 useEffect(() => {
  if (previousStep.current === step) return;
  previousStep.current = step;
  const heading = stepTitle.current;
  if (!heading) return;

  heading.focus({ preventScroll: true });
  const { top, bottom } = heading.getBoundingClientRect();
  const headerEdge = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
  const bannerEdge = document.querySelector(".analytics-consent")?.getBoundingClientRect().top ?? window.innerHeight;
  // Reserve the six pixels occupied by the outline and its offset.
  const topInset = Math.max(0, headerEdge) + 6;
  const bottomEdge = bannerEdge - 6;
  const offset = top < topInset ? top - topInset : Math.max(0, bottom - bottomEdge);
  if (offset) window.scrollBy({ top: offset, behavior: "auto" });
 }, [step]);
 const [intent,setIntent]=useState("acquire");
 const [purpose,setPurpose]=useState("residence");
 const [country,setCountry]=useState("");
 const [currency,setCurrency]=useState("EUR");
 const [budget,setBudget]=useState("");
 const [timing,setTiming]=useState("Exploring options");
 const [transferError,setTransferError]=useState(false);
 const asset=categories.find(a=>a.id===category)!;
 const scene=categories[0];
 const stage=step+1;
 const readiness=Number(briefStarted)+Number(objectiveOutlined || !!country.trim())+
  Number(!!budget.trim() || timing!=="Exploring options" || !!specifics[category]?.trim());
 const property=category==="property";
 const specificLabel=category==="yachts"?(intent==="offer"?"Yacht model, year and available records":"Cruising area, size and guests"):category==="classic-cars"?"Model, era and provenance priorities":intent==="offer"?"Property type, condition and occupancy":purpose==="income"?"Property type and investment objectives":"Property type and essential features";
 const specificHint=category==="yachts"?"For example, Mediterranean cruising for 8 guests":category==="classic-cars"?"For example, 1960s grand tourer with documented history":"For example, villa with 3 bedrooms, or an income-producing building";
 function startBrief(){if(!briefStarted)trackPropertyEvent("brief_start",{asset_category:category});setBriefStarted(true);}
 function changeStep(next:number){startBrief();if(next===2)setObjectiveOutlined(true);setStep(next);trackPropertyEvent("brief_step",{step:String(next+1),asset_category:category,intent});}
 function chooseBrief(id:Category){setCategory(id);setTransferError(false);if(!briefStarted)trackPropertyEvent("brief_start",{asset_category:id});setBriefStarted(true);}
 const interest=property?(intent==="offer"?"marketing":"buying"):"luxury-assets";
 const query=new URLSearchParams({interest,...(property?intent==="acquire"?{focus:purpose}:{}:{asset:category,intent})});
 const directHref=`/contact?${query.toString()}`;
 const draft=[`Asset: ${asset.name}.`, `Objective: ${intent==="offer"?"Introduce an asset for sale":property&&purpose==="income"?"Acquire an investment property":"Acquire an asset"}.`,...(property&&intent==="acquire"?[`Property purpose: ${purpose==="income"?"Investment":"Residence"}.`]:[]),`Country or location: ${country.trim()||"To discuss"}.`,`${intent==="offer"?"Asking price, if set":"Purchase budget"}: ${budget.trim()?`${currency} ${budget.trim()}`:"To discuss"}.`,`Timing: ${timing}.`,...(specifics[category]?.trim()?[`${specificLabel}: ${specifics[category].trim()}`]:[])].join("\n");
 function carry(event:MouseEvent<HTMLAnchorElement>) {
  try { saveBriefDraft(sessionStorage,draft,undefined,intent==="offer" ? { asset:category, location:country.trim(), currency } : undefined);setTransferError(false);trackPropertyEvent("brief_transfer",{asset_category:category,intent}); }
  catch { event.preventDefault();setTransferError(true);trackPropertyEvent("brief_storage_error",{asset_category:category}); }
 }
 return <>
  <section className="perspective-hero mandate-hero" aria-labelledby="home-title">
   <figure className="perspective-scene"><ScrollImage><source type="image/webp" srcSet={`${scene.image.replace(".webp","-640.webp")} 640w, ${scene.image.replace(".webp","-1024.webp")} 1024w, ${scene.image} 1672w`} sizes="100vw"/><Image key={scene.id} src={scene.image} alt={scene.alt} fill loading="eager" fetchPriority="high" sizes="100vw"/></ScrollImage><figcaption>AI-created concept · Illustrative scene</figcaption></figure>
   <div className="perspective-grid" aria-hidden="true"><span/><span/><span/></div>
   <div className="perspective-topline"><span>Malta-based / Global luxury asset brokerage</span><span>WIELE / PERSPECTIVE 01</span></div>
   <div className="perspective-copy"><span className="perspective-kicker">South African roots. Global perspective.</span><h1 id="home-title">Exceptional assets.<br/><em>Individual ambition.</em></h1><p>Property, yachts and classic cars. For buyers and sellers in the UK, Europe and South Africa. Based in Malta.</p><div className="perspective-actions"><a className="button" href="#property-brief" onClick={startBrief}>Build your asset brief <Arrow diagonal/></a><a className="perspective-direct" href="#asset-atlas">Explore open dossiers <Arrow diagonal/></a></div></div>
  </section>
  {afterHero}
  <section id="property-brief" className="perspective-builder" aria-labelledby="perspective-brief-title">
   <div className="perspective-builder-heading"><div><span className="eyebrow">Wiele / Interactive brief</span><h2 id="perspective-brief-title">Your next move.<br/><em>In focus.</em></h2></div><p>Turn your preferences into a starting brief. No account required. Your choices stay in this browser until you submit an enquiry.</p></div>
   <div className="perspective-mobile-summary" aria-label="Current brief summary"><strong>{asset.name} · {intent==="offer"?"Sale":property?purpose==="income"?"Investment":"Residence":"Acquisition"}</strong><span>{country.trim()||"Location to discuss"} · {budget.trim()?`${currency} ${budget.trim()}`:"Budget to discuss"} · {timing}</span><span>Wiele Algorithm readiness · {readiness} of 3 brief areas</span></div>
   <div className="perspective-workspace">
    <div className="perspective-controls"><ol className="perspective-steps" aria-label="Brief preparation steps">{["Asset","Objective","Priorities"].map((s,i)=><li key={s}><button type="button" disabled={i>step} aria-current={i===step?"step":undefined} onClick={()=>{changeStep(i);setTransferError(false);}}><span>0{i+1}</span>{s}</button></li>)}</ol>
     <div className="perspective-step-panel" key={step}>
      {step===0&&<><span className="eyebrow">01 / Choose your asset</span><h3 ref={stepTitle} tabIndex={-1}>What do you have in mind?</h3><div className="perspective-asset-choices">{categories.map(a=><button key={a.id} type="button" aria-pressed={category===a.id} onClick={()=>chooseBrief(a.id)}>{a.name}<span aria-hidden="true">{category===a.id?"●":"↗"}</span></button>)}</div><p className="perspective-helper">Property is our core business. Complementary assets follow their own acquisition and sales requirements.</p></>}
      {step===1&&<><span className="eyebrow">02 / Set the objective</span><h3 ref={stepTitle} tabIndex={-1}>What would you like to do?</h3><div className="perspective-intent-choices">{[["acquire","Acquire an asset"],["offer","Introduce an asset for sale"]].map(([value,label])=><button key={value} type="button" aria-pressed={intent===value} onClick={()=>setIntent(value)}>{label}<span aria-hidden="true">{intent===value?"●":"○"}</span></button>)}</div>{property&&intent==="acquire"&&<label className="perspective-field">Property purpose<select value={purpose} onChange={e=>setPurpose(e.target.value)}><option value="residence">A residence</option><option value="income">An investment property</option></select></label>}<label className="perspective-field">Country or preferred location (optional)<input value={country} maxLength={80} onChange={e=>setCountry(e.target.value)} placeholder="For example, Malta or Cape Town" autoComplete="off"/></label></>}
      {step===2&&<><span className="eyebrow">03 / Define your priorities</span><h3 ref={stepTitle} tabIndex={-1}>The numbers. The timing.</h3><div className="perspective-budget"><label className="perspective-field">Currency<select value={currency} onChange={e=>setCurrency(e.target.value)}>{["EUR","GBP","USD","ZAR","AED"].map(c=><option key={c}>{c}</option>)}</select></label><label className="perspective-field">{intent==="offer"?"Asking price, if set":"Budget range"} (optional)<input value={budget} maxLength={60} onChange={e=>setBudget(e.target.value)} placeholder="For example, 1m–2m" autoComplete="off"/></label></div><label className="perspective-field">Your timing<select value={timing} onChange={e=>setTiming(e.target.value)}>{["Exploring options","Within 3 months","3–6 months","6–12 months","To discuss"].map(t=><option key={t}>{t}</option>)}</select></label><label className="perspective-field">{specificLabel} (optional)<input value={specifics[category]||""} maxLength={240} onChange={e=>setSpecifics(current=>({...current,[category]:e.target.value}))} placeholder={specificHint} autoComplete="off"/></label><p className="perspective-helper">This organises your preferences. It does not search inventory, value an asset or assess acquisition eligibility.</p></>}
     </div>
     <div className="perspective-step-actions">{step>0&&<button className="perspective-back" type="button" onClick={()=>changeStep(step-1)}>← Back</button>}{step<2?<button className="button" type="button" onClick={()=>changeStep(step+1)}>Continue <Arrow/></button>:<Link className="button" href={`${directHref}&brief=prepared`} onClick={carry}>Review in the enquiry form <Arrow diagonal/></Link>}</div>
    </div>
    <aside className="perspective-preview" aria-labelledby="mandate-preview-title">
     <div className="perspective-preview-top"><h3 id="mandate-preview-title">Editorial Mandate Dossier Preview</h3><span>0{stage} / 03</span></div><div className="perspective-preview-image"><ScrollImage><source type="image/webp" srcSet={`${asset.image.replace(".webp","-640.webp")} 640w, ${asset.image.replace(".webp","-1024.webp")} 1024w, ${asset.image} 1672w`} sizes="(max-width:760px) 100vw, 40vw"/><Image src={asset.image} alt={asset.alt} fill sizes="(max-width:760px) 100vw, 40vw"/></ScrollImage><span>Illustrative Dossier Study</span></div><div className="perspective-preview-copy"><span className="eyebrow">{intent==="offer"?"For sale / Your brief":"Acquisition / Your brief"}</span><h4>{asset.name}.<br/><em>{country.trim()||"Your location."}</em></h4>
     <p className="mandate-image-disclosure">AI-created concept · Illustrative concept · Not an asset offered for sale</p>
     <div className="preview-readiness">
      <p>Wiele Algorithm readiness <strong aria-live="polite">{readiness} / 3</strong></p>
      <progress max={3} value={readiness} aria-label="Wiele Algorithm brief areas outlined"/>
      <p>Asset, objective and priorities outlined. Verification takes place separately.</p>
     </div><dl><div><dt>Objective</dt><dd>{intent==="offer"?"Introduce for sale":property?purpose==="income"?"Investment property":"Residence":"Acquisition"}</dd></div><div><dt>{intent==="offer"?"Asking price":"Budget"}</dt><dd>{budget.trim()?`${currency} ${budget.trim()}`:"To discuss"}</dd></div><div><dt>Timing</dt><dd>{timing}</dd></div></dl>{specifics[category]?.trim()&&<p className="perspective-specific-summary"><strong>{specificLabel}</strong><br/>{specifics[category]}</p>}<p>Coverage, availability, scope, fees and responsible practitioners are confirmed individually.</p></div></aside>
   </div>
   {transferError&&<div className="perspective-transfer" role="alert"><p>Your browser could not transfer the brief. Copy it below, then open the enquiry form.</p><label>Your prepared brief<textarea readOnly value={draft}/></label><Link className="text-link" href={directHref}>Open the enquiry form <Arrow/></Link></div>}
   <div className="perspective-builder-footer">{intent === "offer" && <Link className="text-link" href={`/seller-enquiry?asset=${category}&brief=prepared#start-onboarding`} onClick={carry}>Open the detailed seller brief <Arrow diagonal/></Link>}<p>Prefer a conversation? <Link href="/contact">Enquire directly <Arrow diagonal/></Link></p><Link href="/privacy">How your information is handled</Link></div>
   <noscript>
    <style>{".perspective-workspace, .perspective-mobile-summary, .perspective-builder-footer { display: none }"}</style>
    <p>The interactive builder requires JavaScript. <a href={`mailto:${propertyBrand.email}`}>Email Wiele Investments</a> with an outline. Keep identity documents and banking details out of your message.</p>
   </noscript>
  </section>
 </>;
}
