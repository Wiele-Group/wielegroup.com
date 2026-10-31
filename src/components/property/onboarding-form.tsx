"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { onboardingOptions, onboardingFieldLabels, type OnboardingKind } from "@/lib/property-onboarding";
import { trackPropertyEvent } from "./analytics";
import { Arrow } from "./chrome";

type OptionKey = keyof typeof onboardingOptions;
const investorFields: OptionKey[] = ["structure", "use", "budget", "funding", "eligibility", "timing"];
const sellerFields: OptionKey[] = ["authority", "propertyType", "tenure", "occupancy", "epc", "planning", "timing"];
export function PropertyOnboardingForm({ kind }: { kind: OnboardingKind }) {
  const investor = kind === "investor";
  const [token, setToken] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState("");
  const onToken = useCallback((value: string) => setToken(value), []);
  const onError = useCallback(() => { setToken(""); setError("Verification is unavailable. Retry below or contact admin@wielegroup.com."); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!token) { setError("Please complete the security check before sending."); return; }
    const form = new FormData(event.currentTarget);
    const keys = [...(investor ? investorFields : sellerFields), "locality", ...(investor ? ["residenceCountry"] : [])];
    const details = Object.fromEntries(keys.map(key => [key, form.get(key)]));
    setPending(true);
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        name: form.get("name"), email: form.get("email"), phone: form.get("phone"),
        interest: investor ? "buying" : "marketing", message: form.get("message"), website: form.get("website"), token,
        onboarding: { kind, details, acknowledgement: form.get("acknowledgement") === "on" },
      }) });
      const data = await response.json() as { ticketId?: string; error?: string };
      if (!response.ok || !data.ticketId) throw new Error(data.error || "Your brief could not be saved. Please try again.");
      trackPropertyEvent("generate_lead", { enquiry_type: investor ? "buying" : "marketing", form_type: `${kind}_onboarding` });
      setTicket(data.ticketId);
    } catch (err) { setError(err instanceof Error ? err.message : "Your brief could not be saved. Please try again."); setToken(""); setWidgetKey(key => key + 1); }
    finally { setPending(false); }
  }
  if (ticket) return <div className="form-success" role="status" tabIndex={-1} ref={element => element?.focus()}><span className="eyebrow">{investor ? "Investor" : "Seller"} brief saved</span><h2>A clear starting point.<br /><em>A personal next step.</em></h2><p>Your reference is <strong>{ticket.slice(-8).toUpperCase()}</strong>. Wiele will review your brief and contact you to discuss the appropriate next step.</p><p>This records an initial enquiry. It does not complete identity checks, confirm acquisition eligibility, authorise marketing, reserve a property or create a service agreement. No payment is requested.</p><Link className="text-link" href={investor ? "/buying" : "/selling"}>Return to {investor ? "the buyer experience" : "the seller experience"} <Arrow /></Link></div>;
  return <form className="enquiry-form onboarding-form" aria-label={`${investor ? "Investor" : "Seller"} onboarding enquiry`} onSubmit={submit} aria-busy={pending}>
    <fieldset disabled={pending}><legend>01 / Your contact details</legend><div className="form-grid"><div className="form-field"><label htmlFor="onboard-name">Full name</label><input id="onboard-name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></div><div className="form-field"><label htmlFor="onboard-email">Email address</label><input id="onboard-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div><div className="form-grid"><div className="form-field"><label htmlFor="onboard-phone">Phone / WhatsApp <span>(optional)</span></label><input id="onboard-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code" /></div>{investor && <div className="form-field"><label htmlFor="onboard-country">Country of residence</label><input id="onboard-country" name="residenceCountry" autoComplete="country-name" required minLength={2} maxLength={80} /></div>}</div></fieldset>
    <fieldset disabled={pending}><legend>02 / {investor ? "Your investment brief" : "Your property brief"}</legend><div className="form-field"><label htmlFor="onboard-locality">{investor ? "Preferred Malta / Gozo localities" : "Property locality in Malta / Gozo"}</label><input id="onboard-locality" name="locality" required minLength={2} maxLength={160} placeholder={investor ? "For example: Swieqi, Sliema, Gozo — or open to advice" : "Locality only; no full address needed at this stage"} /></div><div className="form-grid">{(investor ? investorFields : sellerFields).map(key => <div className="form-field" key={key}><label htmlFor={`onboard-${key}`}>{onboardingFieldLabels[key]}</label><select id={`onboard-${key}`} name={key} required defaultValue=""><option value="" disabled>Select an option</option>{onboardingOptions[key].map(option => <option key={option} value={option}>{option}</option>)}</select></div>)}</div><div className="form-field"><label htmlFor="onboard-message">{investor ? "Your priorities and questions" : "Property details and known issues"}</label><textarea id="onboard-message" name="message" required minLength={10} maxLength={3000} aria-describedby="onboard-sensitive" placeholder={investor ? "Property preferences, goals, joint purchasers or company structure, and anything your adviser is still reviewing." : "Approximate size, asking-price expectations, leases, known defects or disputes, and any existing agency instruction. Separate collected rent from projected income."} /></div><p id="onboard-sensitive" className="form-note">Do not include passport or ID numbers, dates of birth, bank details, identity documents or tenant personal information. Formal documents are requested separately through an agreed secure process.</p></fieldset>
    <fieldset disabled={pending}><legend>03 / Before you send</legend><label className="onboarding-acknowledgement"><input type="checkbox" name="acknowledgement" required /><span>I understand this is an initial enquiry. Professional checks and any service terms follow separately. Sending this form does not {investor ? "confirm my eligibility to acquire or let property" : "appoint Wiele or authorise property advertising"}.</span></label><p className="form-note">We use this brief to respond to your request. No marketing subscription is created. Read our <Link href="/privacy">privacy notice</Link>. The acknowledgement above records your understanding of the process.</p></fieldset>
    <div className="honeypot" aria-hidden="true"><label htmlFor="onboard-website">Leave this empty</label><input id="onboard-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <TurnstileWidget key={widgetKey} onToken={onToken} onError={onError} className="verification-note" />
    {error && <div className="form-message error" role="alert">{error} {!token && <button type="button" onClick={() => { setError(""); setWidgetKey(key => key + 1); }}>Retry verification</button>}</div>}
    <button className="button" type="submit" disabled={pending}>{pending ? "Saving your brief…" : `Send my ${investor ? "investor" : "seller"} brief`}<Arrow diagonal /></button><p className="form-note">Prefer a conversation? <a href="mailto:admin@wielegroup.com">Email Jonathan Landman</a> or <a href="https://wa.me/35699320474" target="_blank" rel="noopener noreferrer">use WhatsApp</a>. Keep sensitive documents out of the initial message.</p>
  </form>;
}
