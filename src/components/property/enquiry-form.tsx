"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackPropertyEvent } from "./analytics";
import { Arrow } from "./chrome";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
export function EnquiryForm({ defaultInterest = "general" }: { defaultInterest?: "general" | "maintenance" }) {
 const searchParams = useSearchParams();
 const formRef=useRef<HTMLFormElement>(null);
 useEffect(()=>{
  if(searchParams.get("brief")!=="prepared")return;
  try{const saved=sessionStorage.getItem("wiele-property-brief");if(!saved)return;const value=JSON.parse(saved);const message=formRef.current?.elements.namedItem("message") as HTMLTextAreaElement|null;if(message&&!message.value&&typeof value.draft==="string"&&value.draft.length<=3000&&value.expires>Date.now())message.value=value.draft;sessionStorage.removeItem("wiele-property-brief");}catch{/* The ordinary enquiry remains usable without a saved draft. */}
 },[searchParams]);
 const initialInterest = searchParams.get("interest") || defaultInterest;
 const focus = searchParams.get("focus");
 const market = ["Italy", "Spain", "Dubai", "Cape Town", "London"].find(value => value === searchParams.get("market"));
 const [interest,setInterest] = useState(initialInterest && ["marketing","buying","consortium","general","maintenance"].includes(initialInterest) ? initialInterest : "general");
 const maintenance = interest === "maintenance";
 const briefHint = maintenance ? "Property locality, job list or issue, access arrangements, whether the property is occupied and your preferred timing. Photos can be sent by email." : focus === "income" ? "Income-focused brief: country, locations, currency, purchase-budget range, income objective, holding period and timing." : focus === "residence" ? "Residence brief: country, locations, currency, purchase-budget range, bedrooms, outdoor space, intended use and timing." : "Country, currency, property type, locations, purchase-budget range and timing. For a consortium, outline your role and decision process.";
 const [token,setToken] = useState("");
 const [widgetKey,setWidgetKey] = useState(0);
 const [pending,setPending] = useState(false);
 const [error,setError] = useState("");
 const [ticket,setTicket] = useState("");
 const onToken = useCallback((value:string)=>setToken(value),[]);
 const onError = useCallback(()=>{setToken("");setError("Verification needs a moment. You can retry below or contact us by email.");},[]);
 async function submit(event:React.FormEvent<HTMLFormElement>) {
  event.preventDefault();setError("");
  if (!token) { setError("Please complete the security check before sending.");return; }
  const form = new FormData(event.currentTarget);setPending(true);
  try {
   const response = await fetch("/api/enquiry", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:form.get("name"),email:form.get("email"),phone:form.get("phone"),interest,message:form.get("message"),website:form.get("website"),token})});
   const data = await response.json() as { ticketId?: string; error?: string };
   if(!response.ok || !data.ticketId) throw new Error(data.error || "Your enquiry could not be saved. Please try again or contact us directly.");
   trackPropertyEvent("generate_lead", { enquiry_type: interest });
   setTicket(data.ticketId);
  } catch(err) { setError(err instanceof Error ? err.message : "We couldn’t save your enquiry. Please try again.");setToken("");setWidgetKey(k=>k+1); }
  finally {setPending(false);}
 }
 if(ticket) return <div className="form-success" role="status" tabIndex={-1} ref={el=>el?.focus()}><span className="eyebrow">Enquiry saved</span><h2>Thank you.<br /><em>The conversation starts here.</em></h2><p>Your enquiry has been recorded for Wiele. If you need to follow up, please quote reference <strong>{ticket.slice(-8).toUpperCase()}</strong>.</p><p>{maintenance ? "No maintenance visit, booking or payment obligation has been created. Wiele will contact you about the next step." : "No property reservation, instruction or purchase has been created."}</p><a href="mailto:admin@wielegroup.com" className="text-link" target="_blank" rel="noopener noreferrer">Follow up by email <Arrow /></a></div>;
 return <form ref={formRef} className="enquiry-form" onSubmit={submit} aria-label={maintenance ? "Property maintenance enquiry" : "Property enquiry"} aria-busy={pending}><div className="form-grid"><div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="First and last name" /></div><div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></div></div><div className="form-grid"><div className="form-field"><label htmlFor="phone">Phone <span>(optional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code" /></div><div className="form-field"><label htmlFor="interest">I’d like to discuss</label><select id="interest" name="interest" value={interest} onChange={e=>setInterest(e.target.value)}><option value="general">A general enquiry</option><option value="maintenance">Property maintenance</option><option value="marketing">Selling or marketing my property</option><option value="buying">Buying a property</option><option value="consortium">A consortium acquisition</option></select></div></div><div className="form-field"><label htmlFor="message">{maintenance ? "What needs attention?" : "A little about your enquiry"}</label><textarea id="message" name="message" required minLength={10} maxLength={3000} placeholder={`${!maintenance && market ? `${market} property brief. ` : ""}${briefHint} Do not include bank details or identity documents.`} /></div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div><p className="form-note">We’ll use your details to respond to this enquiry. You won’t be added to a marketing list. Read our <Link href="/privacy">privacy notice</Link>.</p><TurnstileWidget key={widgetKey} onToken={onToken} onError={onError} className="verification-note" />{error && <div className="form-message error" role="alert">{error} {!token && <button type="button" onClick={()=>{setError("");setWidgetKey(k=>k+1);}}>Retry verification</button>}</div>}<button className="button" type="submit" disabled={pending}>{pending ? "Saving your enquiry…" : "Send your enquiry"}<Arrow diagonal /></button></form>;
}
