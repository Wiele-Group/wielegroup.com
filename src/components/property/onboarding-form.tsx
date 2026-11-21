"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { propertyBrand } from "@/lib/property";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { onboardingOptions, onboardingFieldLabels, type OnboardingKind } from "@/lib/property-onboarding";
import { trackPropertyEvent } from "./analytics";
import { Arrow } from "./chrome";
import { MandateFields } from "./mandate-fields";
import { readBriefDraft, readMandateHandoff, clearBriefDraft, type MandateHandoff } from "@/lib/brief-draft";
import { mandateCategoryFromSlug, mandateEnquiryRoute, mandateNames, readMandateForm, type MandateCategory } from "@/schemas/assetMandateIntake";

type OptionKey = keyof typeof onboardingOptions;
const investorFields: OptionKey[] = ["structure", "use", "budget", "funding", "eligibility", "timing"];
export function PropertyOnboardingForm({ kind }: { kind: OnboardingKind }) {
  const investor = kind === "investor";
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<MandateCategory>("PROPERTY");
  const [handoff, setHandoff] = useState<MandateHandoff | null>(null);
  const [currencyPending, setCurrencyPending] = useState(false);
  useEffect(() => {
    if (kind !== "seller") return;
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read the browser-only entry point after hydration.
    setCategory(mandateCategoryFromSlug(params.get("asset")));
    if (params.get("brief") !== "prepared") return;
    try {
      const field = formRef.current?.elements.namedItem("message") as HTMLTextAreaElement | null;
      const draft = readBriefDraft(sessionStorage);
      if (field && !field.value && draft) field.value = draft;
      const snapshot = readMandateHandoff(sessionStorage);
      if (snapshot?.asset === params.get("asset")) setHandoff(snapshot);
    } catch { /* An empty notes field still works without browser storage. */ }
  }, [kind]);
  const [token, setToken] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState("");
  const onToken = useCallback((value: string) => setToken(value), []);
  const onError = useCallback(() => { setToken(""); setError("Verification is unavailable. Retry below or contact admin@wielegroup.com."); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (currencyPending) return;
    const form = new FormData(event.currentTarget);
    const mandate = investor ? null : readMandateForm(form);
    if (mandate && !mandate.success) {
      const issue = mandate.error.issues[0];
      const control = event.currentTarget.elements.namedItem(`mandate-${String(issue.path[0])}`);
      if (control instanceof HTMLElement) {
        const step = control.closest("details");
        if (step) step.open = true;
        control.focus();
        const label = control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement ? control.labels?.[0]?.textContent : "";
        setError(label ? `${label.trim()}. ${issue.message}` : issue.message);
      } else setError(issue.message);
      return;
    }
    if (!token) { setError("Please complete the security check before sending."); return; }
    const details = Object.fromEntries([...investorFields, "locality", "residenceCountry"].map(key => [key, form.get(key)]));
    const route = mandate?.success ? mandateEnquiryRoute(mandate.data.assetCategory) : { interest:"buying" };
    const acknowledgement = form.get("acknowledgement") === "on";
    const notes = String(form.get("message") ?? "").trim();
    setPending(true);
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        name: form.get("name"), email: form.get("email"), phone: form.get("phone"),
        ...route, message: investor ? notes : notes || "Initial seller mandate enquiry.",
        website: form.get("website"), token,
        ...(mandate?.success ? { mandate:{ details:mandate.data, acknowledgement } } : { onboarding:{ kind, details, acknowledgement } }),
      }) });
      const data = await response.json() as { ticketId?: string; error?: string };
      if (!response.ok || !data.ticketId) throw new Error(data.error || "Your brief could not be saved. Please try again.");
      trackPropertyEvent("generate_lead", { enquiry_type: route.interest, form_type: `${kind}_onboarding` });
      if (!investor) { try { clearBriefDraft(sessionStorage); } catch { /* The enquiry was already saved. */ } }
      setTicket(data.ticketId);
    } catch (err) { setError(err instanceof Error ? err.message : "Your brief could not be saved. Please try again."); setToken(""); setWidgetKey(key => key + 1); }
    finally { setPending(false); }
  }
  if (ticket) return <div className="form-success" role="status" tabIndex={-1} ref={element => element?.focus()}><span className="eyebrow">{investor ? "Investor" : "Seller"} brief saved</span><h2>A clear starting point.<br /><em>A personal next step.</em></h2><p>Your reference is <strong>{ticket.slice(-8).toUpperCase()}</strong>. Wiele will review your brief and contact you to discuss the appropriate next step.</p><p>This records an initial enquiry. It does not complete identity checks, confirm acquisition eligibility, authorise marketing, reserve an asset or create a service agreement. No payment is requested.</p><Link className="text-link" href={investor ? "/buying" : "/selling"}>Return to {investor ? "the buyer experience" : "the seller experience"} <Arrow /></Link></div>;
  return <form ref={formRef} className="enquiry-form onboarding-form" onInvalidCapture={event => { const step = (event.target as HTMLElement).closest("details"); if (step) step.open = true; }} aria-label={`${investor ? "Investor" : "Seller"} onboarding enquiry`} onSubmit={submit} aria-busy={pending}>
    <fieldset disabled={pending}><legend>01 / Your contact details</legend><div className="form-grid"><div className="form-field"><label htmlFor="onboard-name">Full name</label><input id="onboard-name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></div><div className="form-field"><label htmlFor="onboard-email">Email address</label><input id="onboard-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div><div className="form-grid"><div className="form-field"><label htmlFor="onboard-phone">Phone <span>(optional)</span></label><input id="onboard-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code" /></div>{investor && <div className="form-field"><label htmlFor="onboard-country">Country of residence</label><input id="onboard-country" name="residenceCountry" autoComplete="country-name" required minLength={2} maxLength={80} /></div>}</div></fieldset>
    {investor ? <fieldset disabled={pending}>
      <legend>02 / Your investment brief</legend>
      <div className="form-field"><label htmlFor="onboard-locality">Preferred country and locations</label><input id="onboard-locality" name="locality" required minLength={2} maxLength={160} placeholder="Country and city / region"/></div>
      <div className="form-grid">{investorFields.map(key => <div className="form-field" key={key}>
        <label htmlFor={`onboard-${key}`}>{onboardingFieldLabels[key]}</label><select id={`onboard-${key}`} name={key} required defaultValue=""><option value="" disabled>Select an option</option>{onboardingOptions[key].map(option => <option key={option}>{option}</option>)}</select>
      </div>)}</div>
      <div className="form-field"><label htmlFor="onboard-message">Your priorities and questions</label><textarea id="onboard-message" name="message" required minLength={10} maxLength={3000} aria-describedby="onboard-sensitive"/></div>
      <p id="onboard-sensitive" className="form-note">Do not include identity documents, passport numbers, bank details or tenant personal information. Formal documents are requested separately through an agreed secure process.</p>
    </fieldset> : <>
      <MandateFields key={`${category}-${handoff?.asset ?? ""}`} category={category} selectCategory={setCategory} initial={handoff && mandateCategoryFromSlug(handoff.asset) === category ? handoff : null} pending={pending} onCurrencyPending={setCurrencyPending}/>
      <div className="form-field"><label htmlFor="onboard-message">Additional {mandateNames[category].toLowerCase()} notes (optional)</label><textarea id="onboard-message" name="message" minLength={10} maxLength={3000} aria-describedby="onboard-sensitive"/></div>
      <p id="onboard-sensitive" className="form-note">Keep passport and identity documents, bank details and confidential asset records out of this form. Wiele arranges verification separately through an agreed secure process.</p>
    </>}
    <fieldset disabled={pending}><legend>03 / Before you send</legend><label className="onboarding-acknowledgement"><input type="checkbox" name="acknowledgement" required /><span>I understand this is an initial enquiry. Professional checks and any service terms follow separately. Sending this form does not {investor ? "confirm my eligibility to acquire or let property" : "appoint Wiele or authorise asset advertising"}.</span></label><p className="form-note">We use this brief to respond to your request. No marketing subscription is created. Read our <Link href="/privacy">privacy notice</Link>. The acknowledgement above records your understanding of the process.</p></fieldset>
    <div className="honeypot" aria-hidden="true"><label htmlFor="onboard-website">Leave this empty</label><input id="onboard-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <TurnstileWidget key={widgetKey} onToken={onToken} onError={onError} className="verification-note" />
    {error && <div className="form-message error" role="alert">{error} {!token && <button type="button" onClick={() => { setError(""); setWidgetKey(key => key + 1); }}>Retry verification</button>}</div>}
    <button className="button" type="submit" disabled={pending || currencyPending}>{pending ? "Saving your brief…" : `Send my ${investor ? "investor" : "seller"} brief`}<Arrow diagonal /></button><p className="form-note">Prefer a conversation? <a href={`mailto:${propertyBrand.email}`}>Email Wiele Investments</a>. Keep sensitive documents out of the initial message.</p>
  </form>;
}
