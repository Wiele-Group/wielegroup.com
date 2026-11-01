"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { BriefInput } from "@/lib/property-brief";
import { Arrow } from "./chrome";
type BriefResult={summary:string;questions:string[];draft:string;mode:"ai"|"guided"};
export function BriefAssistant({goal}:{goal:BriefInput["goal"]}) {
 const [open,setOpen]=useState(false);
 const [property,setProperty]=useState<BriefInput["property"]>("Apartment");
 const [location,setLocation]=useState<BriefInput["location"]>("Open to locations");
 const [budget,setBudget]=useState<BriefInput["budget"]>("To discuss");
 const [timing,setTiming]=useState<BriefInput["timing"]>("Exploring options");
 const [result,setResult]=useState<BriefResult|null>(null);
 const [busy,setBusy]=useState(false),[error,setError]=useState("");
 const request=useRef<AbortController|null>(null);
 useEffect(()=>()=>request.current?.abort(),[]);
 function edit() {request.current?.abort();setBusy(false);setResult(null);setError("");}
 async function prepare() {
  request.current?.abort();const controller=new AbortController();request.current=controller;
  setBusy(true);setError("");setResult(null);
  try {
   const response=await fetch("/api/property-brief",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({goal,property,location,budget,timing}),signal:controller.signal});
   const data=await response.json() as Partial<BriefResult>&{error?:string};if(!response.ok||typeof data.summary!=="string"||typeof data.draft!=="string"||!Array.isArray(data.questions)||!data.questions.every(q=>typeof q==="string")||(data.mode!=="ai"&&data.mode!=="guided"))throw new Error(data.error||"Please try again.");setResult({summary:data.summary,draft:data.draft,questions:data.questions,mode:data.mode});
  }catch(e){if(!controller.signal.aborted)setError(e instanceof Error?e.message:"Please try again.");}
  finally{if(!controller.signal.aborted)setBusy(false);}
 }
 function carryBrief() {
  if(!result)return;
  try{sessionStorage.setItem("wiele-property-brief",JSON.stringify({draft:result.draft,interest:goal==="marketing"?"marketing":goal==="maintenance"?"maintenance":"buying",expires:Date.now()+30*60*1000}));}catch{/* Draft remains readable if browser storage is unavailable. */}
 }
 return <div className="brief-assistant"><button className="brief-assistant-toggle" type="button" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>Prepare my property brief <span aria-hidden="true">{open?"−":"+"}</span></button>{open&&<div className="brief-assistant-body"><p>Choose your preferences. We’ll organise a starting brief and questions for your conversation with Jonathan.</p><div className="brief-selects"><label>Property<select value={property} onChange={e=>{edit();setProperty(e.target.value as BriefInput["property"]);}}>{["Apartment","Residence","Portfolio","To discuss"].map(v=><option key={v}>{v}</option>)}</select></label><label>Preferred area<select value={location} onChange={e=>{edit();setLocation(e.target.value as BriefInput["location"]);}}>{["Open to locations","Swieqi / St Julian’s","Sliema / Gżira","Central Malta","Northern Malta","Southern Malta","Gozo"].map(v=><option key={v}>{v}</option>)}</select></label>{goal!=="marketing"&&goal!=="maintenance"&&<label>Purchase budget<select value={budget} onChange={e=>{edit();setBudget(e.target.value as BriefInput["budget"]);}}>{["To discuss","Under €300,000","€300,000–€600,000","€600,000–€1,000,000","Above €1,000,000"].map(v=><option key={v}>{v}</option>)}</select></label>}<label>Timing<select value={timing} onChange={e=>{edit();setTiming(e.target.value as BriefInput["timing"]);}}>{["Exploring options","Within 3 months","3–6 months","6–12 months"].map(v=><option key={v}>{v}</option>)}</select></label></div><p className="brief-privacy">Only these selections are processed by Cloudflare AI. No name, contact details or documents are requested here. <Link href="/privacy">Privacy</Link>.</p><button className="button" type="button" disabled={busy} onClick={prepare}>{busy?"Preparing your brief…":"Organise my brief"}<Arrow diagonal /></button>{error&&<p role="alert" className="brief-error">{error}</p>}{result&&<div className="brief-result" role="status"><span className="eyebrow">{result.mode==="ai"?"AI-assisted preparation":"Guided preparation"} · review before enquiring</span><p className="brief-summary">{result.summary}</p><ul>{result.questions.map(q=><li key={q}>{q}</li>)}</ul><p className="brief-privacy">This prepares a conversation. It does not assess eligibility, recommend a property or guarantee a return.</p><Link className="text-link" onClick={carryBrief} href={`/contact?interest=${goal==="marketing"?"marketing":goal==="maintenance"?"maintenance":"buying"}&brief=prepared`}>Use this brief in my enquiry<Arrow diagonal /></Link></div>}</div>}</div>;
}
