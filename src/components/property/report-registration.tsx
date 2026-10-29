"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { Arrow } from "./chrome";
import { trackPropertyEvent } from "./analytics";

export function ReportRegistration() {
  const [token, setToken] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const onToken = useCallback((value: string) => setToken(value), []);
  const onError = useCallback(() => { setToken(""); setError("Verification needs a moment. Please retry below."); }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!token) { setError("Please complete the security check before registering."); return; }
    const form = new FormData(event.currentTarget);
    setPending(true);
    try {
      const response = await fetch("/api/reports/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), objective: form.get("objective"), updates: form.get("updates") === "yes", website: form.get("website"), token }) });
      const data = await response.json() as { registered?: boolean; error?: string };
      if (!response.ok || !data.registered) throw new Error(data.error || "We could not save your registration. Please try again.");
      trackPropertyEvent("generate_lead", { enquiry_type: "investment_report", report_id: "malta-investment-2026" });
      setRegistered(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not save your registration. Please try again.");
      setToken(""); setWidgetKey(k => k + 1);
    } finally { setPending(false); }
  }

  if (registered) return <div className="report-success" role="status" tabIndex={-1} ref={el => el?.focus()}><span className="eyebrow">Registration complete</span><h2>Your Wiele report.<br /><em>Ready to read.</em></h2><p>Your details have been saved. Download your copy below; access remains available in this browser for 24 hours.</p><a className="button" href="/api/reports/download" download>Download the report <Arrow diagonal /></a><p className="fine-print">If your access expires, return here and register again. This registers your interest; it does not create an account or reserve a property.</p><Link className="text-link" href="/contact?interest=buying">Share a detailed investment brief <Arrow /></Link></div>;
  return <form className="report-form enquiry-form" onSubmit={submit} aria-label="Register to download the investment report" aria-busy={pending}>
    <span className="eyebrow">Your complimentary copy</span><h2>Register your interest.<br /><em>Read the full report.</em></h2>
    <p className="report-form-intro">Enter your name and email to unlock the Wiele Properties PDF. No payment or account password required.</p>
    <div className="form-grid"><div className="form-field"><label htmlFor="report-name">Your name</label><input id="report-name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></div><div className="form-field"><label htmlFor="report-email">Email address</label><input id="report-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div>
    <div className="form-field"><label htmlFor="report-objective">Your property interest <span>(optional)</span></label><select id="report-objective" name="objective" defaultValue="exploring"><option value="exploring">Exploring the Malta market</option><option value="apartment">An investment apartment</option><option value="residence">A residence or luxury property</option><option value="portfolio">An income-producing portfolio</option><option value="consortium">A consortium acquisition</option></select></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="report-website">Leave this empty</label><input id="report-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="report-optin"><input type="checkbox" name="updates" value="yes" /><span>I would also like Wiele Properties market updates and information about property opportunities by email. I can withdraw this choice at any time by emailing admin@wielegroup.com. <strong>Optional; not required to download.</strong></span></label>
    <p className="form-note">We use your details to record your report request and provide download access. Future marketing emails require the separate choice above. Read our <Link href="/privacy">privacy notice</Link>.</p>
    <TurnstileWidget key={widgetKey} onToken={onToken} onError={onError} className="verification-note" />
    {error && <div className="form-message error" role="alert">{error} {!token && <button type="button" onClick={() => { setError(""); setWidgetKey(k => k + 1); }}>Retry verification</button>}</div>}
    <button className="button" type="submit" disabled={pending}>{pending ? "Saving your registration…" : "Register & unlock the report"}<Arrow diagonal /></button>
  </form>;
}
