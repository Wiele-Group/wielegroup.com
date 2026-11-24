import { createHmac } from "node:crypto";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { RetainerLedgerCard } from "@/components/seller/RetainerLedgerCard";
import { propertyMetadata } from "@/lib/property";
import { retainerCheckoutCookie, retainerSessionPattern } from "@/lib/retainer-session";
import "./portal.css";

export const dynamic = "force-dynamic";

const path = "/seller/portal";
export const metadata: Metadata = {
  ...propertyMetadata(
    "Seller Retainer Portal",
    "Malta-based Wiele Investments seller portal for subscription dates and asset marketing retainer commission credits.",
    path,
  ),
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type PortalParams = { session_id?: string | string[]; asset?: string | string[] };

async function loadRetainer(sessionId: string, requestedAsset?: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  const signingSecret = process.env.WIELE_INTERNAL_API_SECRET;
  if (!key || !signingSecret) return null;
  const stripe = new Stripe(key, { timeout: 10_000, maxNetworkRetries: 0 });
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["subscription"] });
  if (session.mode !== "subscription" || session.status !== "complete" || session.payment_status !== "paid") {
    return null;
  }

  const subscription = session.subscription;
  if (!subscription || typeof subscription === "string") return null;
  const ledger = subscription.metadata;
  const assetId = ledger.asset_id;
  if (!assetId || session.metadata?.asset_id !== assetId || (requestedAsset && requestedAsset !== assetId)) {
    return null;
  }

  if (subscription.status === "canceled" || subscription.status === "incomplete_expired") {
    return { message: "This retainer has ended." } as const;
  }
  const askingPriceEur = Number(ledger.asking_price_eur);
  const cumulativePaidNetEur = Number(ledger.cumulative_paid_net_eur);
  const minimumTermEndTs = Number(ledger.minimum_term_end_ts);
  const legacyEnd = (subscription as Stripe.Subscription & { current_period_end?: number }).current_period_end;
  const currentPeriodEndTs = legacyEnd || subscription.items?.data?.[0]?.current_period_end || 0;

  if (
    !Number.isFinite(askingPriceEur) || askingPriceEur <= 0 ||
    !Number.isFinite(cumulativePaidNetEur) || cumulativePaidNetEur < 0 ||
    !Number.isSafeInteger(minimumTermEndTs) || minimumTermEndTs <= 0 ||
    !Number.isSafeInteger(currentPeriodEndTs) || currentPeriodEndTs <= 0
  ) {
    return { message: "Your retainer ledger is being prepared. Please check back after Stripe confirms your schedule." } as const;
  }
  return {
    props: {
      assetId,
      assetTitle: ledger.asset_title || assetId,
      askingPriceEur,
      subscriptionId: subscription.id,
      portalToken: createHmac("sha256", signingSecret).update(`${subscription.id}:${assetId}`).digest("hex"),
      cumulativePaidNetEur,
      minimumTermEndTs,
      currentPeriodEndTs,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  } as const;
}

export default async function SellerPortal({ searchParams }: { searchParams: Promise<PortalParams> }) {
  const query = await searchParams;
  const cookieStore = await cookies();
  const checkoutId = typeof query.session_id === "string"
    ? query.session_id
    : cookieStore.get(retainerCheckoutCookie)?.value;
  const asset = typeof query.asset === "string" ? query.asset : undefined;
  // An asset slug selects only the subscription already identified by a paid Checkout session.
  const retainer = checkoutId && retainerSessionPattern.test(checkoutId)
    ? await loadRetainer(checkoutId, asset).catch(() => null)
    : null;

  return (
    <main className="retainer-portal">
      <div className="retainer-portal-inner wrap">
        <h1>Seller retainer portal</h1>
        {retainer?.props ? (
          <RetainerLedgerCard {...retainer.props} />
        ) : (
          <p className="retainer-portal-message">
            {retainer?.message ?? "Open the portal from your confirmed Stripe Checkout session to view your asset’s retainer. Contact Wiele Investments at admin@wielegroup.com if you need help with access."}
          </p>
        )}
      </div>
    </main>
  );
}
