import { PAGE_METADATA } from "@/lib/seo-metadata";
import Link from "next/link";
import { Arrow, PageIntro } from "@/components/property/chrome";
import { MandateClauses, MandateScheduleA } from "@/components/seller/MandateAgreement";
import { mandateSummary } from "@/lib/mandateAgreement";

export const metadata = PAGE_METADATA.sellerRetainerTerms;

export default function SellerRetainerTerms() {
  return (
    <>
      <PageIntro
        path={mandateSummary.publicPath}
        eyebrow="Wiele Investments / Seller retainer"
        title={mandateSummary.title}
        description="Terms for the marketing and buyer introduction of one designated property, yacht or classic car."
      />
      <article className="legal-copy wrap">
        <p>
          Effective date <time dateTime={mandateSummary.effectiveDate}>{mandateSummary.effectiveDateLabel}</time>
          {" · "}Version {mandateSummary.version}
        </p>
        <MandateClauses heading="h2" />
        <MandateScheduleA heading="h2" />
        <p>
          For retainer questions and cancellation requests, email{" "}
          <a href={`mailto:${mandateSummary.cancellationEmail}`}>{mandateSummary.cancellationEmail}</a>.
        </p>
        <Link className="text-link" href="/list-asset">Return to seller onboarding <Arrow diagonal /></Link>
      </article>
    </>
  );
}
