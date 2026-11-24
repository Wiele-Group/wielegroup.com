"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { mandateSummary } from "@/lib/mandateAgreement";
import { MandateScheduleA } from "./MandateAgreement";

const assetClasses = [
  ["real_estate", "Real estate"],
  ["yacht", "Yacht"],
  ["classic_car", "Classic car"],
] as const;

const euro = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

function slug(title: string) {
  return title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80).replace(/-+$/, "");
}

export function SellerOnboarding({
  asset, lead, earlyLaunchRequest, testSubscriptionUrl, children,
}: {
  asset: string;
  lead: string;
  earlyLaunchRequest: string;
  testSubscriptionUrl?: string;
  children: ReactNode;
}) {
  const [title, setTitle] = useState("");
  const [assetClass, setAssetClass] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const assetId = asset || slug(title);
  const askingPrice = Number(price);
  const validPrice = /^\d+(?:\.\d{1,2})?$/.test(price) && Number.isFinite(askingPrice)
    && askingPrice > 0 && askingPrice <= Number.MAX_SAFE_INTEGER / 100;
  const assetCategory = assetClasses.find(([value]) => value === assetClass)?.[1];
  const valid = Boolean(
    title.trim() && assetId && assetCategory
    && name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && validPrice,
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accepted || !valid || pending || !event.currentTarget.reportValidity()) return;
    if (testSubscriptionUrl) {
      window.location.assign(testSubscriptionUrl);
      return;
    }

    const immediateLaunchRequested = new FormData(event.currentTarget).has("immediate_launch_requested");
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/retainer/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset_id: assetId,
          asset_title: title.trim(),
          asset_class: assetClass,
          asking_price_eur: askingPrice,
          seller_name: name.trim(),
          seller_email: email.trim(),
          close_lead_id: lead,
          mandate_accepted: true,
          immediate_launch_requested: immediateLaunchRequested,
          mandate_version: mandateSummary.version,
          mandate_accepted_at: new Date().toISOString(),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || typeof data !== "object" || !("checkout_url" in data)
        || typeof data.checkout_url !== "string") {
        const detail = data && typeof data === "object" && "detail" in data ? data.detail : null;
        throw new Error(typeof detail === "string" ? detail : "Stripe Checkout is unavailable. Please try again.");
      }
      const checkout = new URL(data.checkout_url);
      if (checkout.protocol !== "https:" || checkout.username || checkout.password) {
        throw new Error("Stripe Checkout returned an invalid address.");
      }
      window.location.href = checkout.href;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not start Stripe Checkout. Please try again.");
      setPending(false);
    }
  }

  return (
    <form className="retainer-onboarding-form" method="post" onSubmit={submit}>
      <input type="hidden" name="close_lead_id" value={lead} />
      <input type="hidden" name="asset_id" value={assetId} />

      <fieldset onChange={() => setAccepted(false)}>
        <legend>Asset details</legend>
        <div className="retainer-onboarding-fields">
          <label>
            Asset title
            <input name="asset_title" placeholder="Villa Valletta Waterfront" required maxLength={180}
              value={title} onChange={event => setTitle(event.target.value)} />
          </label>
          <label>
            Asset category
            <select name="asset_class" required value={assetClass} onChange={event => setAssetClass(event.target.value)}>
              <option value="">Choose a category</option>
              {assetClasses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label>
            Asking price (€)
            <input name="asking_price_eur" type="number" inputMode="decimal" required min="0.01" step="0.01"
              value={price} onChange={event => setPrice(event.target.value)} aria-describedby="retainer-commission-preview" />
          </label>
          <div className="retainer-commission-preview">
            <span>Gross commission preview at 5%</span>
            <output id="retainer-commission-preview" aria-live="polite">
              {validPrice ? euro.format(askingPrice * mandateSummary.commissionPercent / 100) : "Enter an asking price"}
            </output>
          </div>
        </div>
      </fieldset>

      <fieldset onChange={() => setAccepted(false)}>
        <legend>Seller details</legend>
        <div className="retainer-onboarding-fields">
          <label>
            Full name
            <input name="seller_name" autoComplete="name" required maxLength={150}
              value={name} onChange={event => setName(event.target.value)} />
          </label>
          <label>
            Email address
            <input name="seller_email" type="email" autoComplete="email" required maxLength={254}
              value={email} onChange={event => setEmail(event.target.value)} />
          </label>
        </div>
      </fieldset>

      <section aria-labelledby="retainer-mandate-heading">
        <h2 id="retainer-mandate-heading">{mandateSummary.title}</h2>
        <p className="retainer-mandate-version">
          Version {mandateSummary.version} · Effective {mandateSummary.effectiveDateLabel} · <Link href={mandateSummary.publicPath} className="retainer-mandate-link">Open the full seller retainer terms</Link>
        </p>
        <div className="retainer-mandate-scroll" tabIndex={0} role="region" aria-labelledby="retainer-mandate-heading">
          {children}
        </div>
        <MandateScheduleA heading="h3" values={{
          sellerName: name.trim(),
          sellerEmail: email.trim(),
          assetTitle: title.trim(),
          assetCategory,
          assetReference: assetId,
          askingPrice: validPrice ? euro.format(askingPrice) : undefined,
        }} />
        <label className="retainer-mandate-acceptance">
          <input name="mandate_accepted" type="checkbox" required checked={accepted}
            onChange={event => setAccepted(event.target.checked)} />
          <span>
            I accept clauses 1–9 and Schedule A for the designated asset, including the €599 monthly retainer for this asset plus applicable VAT,
            the three-month minimum commitment, the standard 5% commission on sales to Wiele-introduced buyers with
            100% credit for net retainer payments, and the 12-month tail period.
          </span>
        </label>
        <label className="retainer-mandate-acceptance">
          <input name="immediate_launch_requested" type="checkbox" />
          <span>
            {earlyLaunchRequest} I acknowledge that I lose my right of withdrawal once Wiele has fully
            performed the service, where applicable.
          </span>
        </label>
      </section>

      {error && <p className="retainer-onboarding-error" role="alert">{error}</p>}
      <button className="retainer-onboarding-submit" type="submit" disabled={!valid || !accepted || pending}>
        {testSubscriptionUrl
          ? "Continue to Stripe test payment"
          : (pending ? "Opening Stripe Checkout…" : "Execute Mandate & Proceed to Stripe Checkout")}
      </button>
    </form>
  );
}
