import type { Metadata } from "next";
import { mandateSummary } from "@/lib/mandateAgreement";
import { propertyMetadata } from "@/lib/property";
import { MandateClauses } from "@/components/seller/MandateAgreement";
import { SellerOnboarding } from "@/components/seller/SellerOnboarding";
import "./onboarding.css";

const path = "/list-asset";
const stripeTestSubscriptionUrl = "https://buy.stripe.com/test_14A28r85t4BA8JOh2abo408";
const earlyLaunchRequest = "I request Wiele to begin algorithmic campaign deployment immediately (within the 14-day statutory cooling-off period) and acknowledge proportionate payment for campaign services rendered prior to any valid consumer withdrawal.";
export const metadata: Metadata = {
  ...propertyMetadata(
    "Seller Onboarding & Marketing Retainer",
    "Malta-based Wiele Investments seller onboarding for property, yachts and classic cars. Review the asset marketing mandate, monthly retainer and buyer-introduction commission.",
    path,
  ),
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type OnboardingParams = { asset?: string | string[]; lead?: string | string[] };

export default async function ListAssetPage({ searchParams }: { searchParams: Promise<OnboardingParams> }) {
  const query = await searchParams;
  const asset = typeof query.asset === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(query.asset) ? query.asset : "";
  const lead = typeof query.lead === "string" && /^lead_[A-Za-z0-9]+$/.test(query.lead) ? query.lead : "";

  return (
    <main className="retainer-onboarding">
      <div className="wrap retainer-onboarding-inner">
        <p className="retainer-onboarding-kicker">Malta · Asset marketing and intelligence</p>
        <h1>Seller onboarding</h1>
        <p className="retainer-onboarding-intro">
          Enter your asset details and review all nine clauses and your Schedule A details before continuing to Stripe Checkout.
        </p>
        <section className="retainer-subscription" aria-labelledby="retainer-subscription-heading">
          <h2 id="retainer-subscription-heading">Marketing retainer subscription</h2>
          <p className="retainer-subscription-price">
            €{mandateSummary.monthlyRetainerEur.toFixed(2)} per month plus applicable VAT
          </p>
          <p>
            The seller mandate covers one asset with a {mandateSummary.minimumTermMonths}-month minimum commitment.
          </p>
          <p>
            Complete the form and accept the mandate to continue to Stripe’s test payment page. Use test
            details. No live payment is taken and no retainer is activated.
          </p>
        </section>
        <SellerOnboarding
          asset={asset}
          lead={lead}
          earlyLaunchRequest={earlyLaunchRequest}
          testSubscriptionUrl={stripeTestSubscriptionUrl}
        >
          <MandateClauses heading="h3" />
        </SellerOnboarding>
      </div>
    </main>
  );
}
