"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { Arrow } from "./chrome";
import { trackPropertyEvent } from "./analytics";
export function ListingRegistration({slug}:{slug:string}) {
  const router=useRouter();
  const [token,setToken]=useState("");
  const [widgetKey,setWidgetKey]=useState(0);
  const [pending,setPending]=useState(false);
  const [error,setError]=useState("");
  const [registered,setRegistered]=useState(false);
  const onToken=useCallback((value:string)=>setToken(value),[]);
  const onError=useCallback(()=>{setToken("");setError("Verification needs a moment. Please retry below.");},[]);
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();setError("");
    if (!token) {setError("Please complete the security check before registering.");return;}
    const form=new FormData(event.currentTarget);setPending(true);
    try {
      const response=await fetch("/api/listings/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:form.get("name"),email:form.get("email"),updates:form.get("updates")==="yes",website:form.get("website"),token,listing:slug})});
      const data=await response.json() as {registered?:boolean;error?:string};
      if (!response.ok || !data.registered) throw new Error(data.error||"We could not save your registration. Please try again.");
      trackPropertyEvent("generate_lead",{enquiry_type:"listing_registration",listing_id:slug});
      setRegistered(true);router.refresh();
    } catch(err) {setError(err instanceof Error?err.message:"We could not save your registration. Please try again.");setToken("");setWidgetKey(k=>k+1);}
    finally {setPending(false);}
  }
  if (registered) return <div className="report-success" role="status" tabIndex={-1} ref={el=>el?.focus()}><span className="eyebrow">Registration complete</span><h2>Your Wiele Listings.<br/><em>Ready to view listings.</em></h2><p>Your details have been saved. Opening your listing now.</p><a className="button" href={`/listing-examples/${slug}`}>View listing <Arrow/></a></div>;
  return <form method="post" action="/api/listings/register" className="report-form enquiry-form listing-form" onSubmit={submit} aria-label="Register to view Wiele listings" aria-busy={pending}>
    <span className="eyebrow">Complimentary listing access</span><h2>Register once.<br/><em>Explore with perspective.</em></h2><p className="report-form-intro">Your name and email unlock all Wiele Listings in this browser for 30 days. No payment or password required.</p>
    <div className="form-grid"><div className="form-field"><label htmlFor="listing-name">Your name</label><input id="listing-name" name="name" autoComplete="name" minLength={2} maxLength={100} required/></div><div className="form-field"><label htmlFor="listing-email">Email address</label><input id="listing-email" name="email" type="email" autoComplete="email" maxLength={254} required/></div></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="listing-website">Leave this empty</label><input id="listing-website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <label className="report-optin"><input type="checkbox" name="updates" value="yes"/><span>I would also like Wiele Investments market updates and information about property opportunities by email. I can withdraw this choice at any time by emailing admin@wielegroup.com. <strong>Optional; not required to view listings.</strong></span></label>
    <p className="form-note">We use your details to record your request and provide listing access. This does not create an account or verify ownership of your email address. Read our <Link href="/privacy">privacy notice</Link>.</p>
    <TurnstileWidget key={widgetKey} onToken={onToken} onError={onError} className="verification-note" size="compact"/>
    {error&&<div className="form-message error" role="alert">{error} {!token&&<button type="button" onClick={()=>{setError("");setWidgetKey(k=>k+1);}}>Retry verification</button>}</div>}
    <button className="button" type="submit" disabled={pending}>{pending?"Saving your registration…":"Register & view listings"}<Arrow diagonal/></button>
  </form>;
}
