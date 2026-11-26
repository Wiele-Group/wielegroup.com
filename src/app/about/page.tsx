import { PAGE_METADATA } from "@/lib/seo-metadata";
import { OriginationIntroduction } from "@/components/property/origination-introduction";
import { propertyBrand } from "@/lib/property";
import Image from "next/image";
import Link from "next/link";
import { BrokerProfile } from "@/components/property/broker-profile";
import { EnquirySteps } from "@/components/property/personal-introduction";
import { ContactBand, PageIntro } from "@/components/property/chrome";

export const metadata = PAGE_METADATA.about;

export default function About() {
  return (
    <>
      <PageIntro path="/about" eyebrow="Malta-based / Hybrid online brokerage"
        title="About Wiele Investments" description={PAGE_METADATA.about.description ?? ""} />
      <div className="about-direct-contact wrap">
        <span>English &amp; Afrikaans · By appointment</span>
        <a href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a>
      </div>
      <BrokerProfile />
      <OriginationIntroduction />
      <EnquirySteps />
      <section className="split-feature wrap">
        <figure>
          <Image src="/property/wiele-global-apartment-20261113.webp"
            alt="AI-created luxury city penthouse concept; not an actual property or listing" fill sizes="(max-width: 760px) 100vw, 45vw" />
          <figcaption>Luxury apartment · AI-created concept</figcaption>
        </figure>
        <div>
          <span className="eyebrow">A direct relationship</span>
          <h2>One conversation.<br /><em>A clear point of contact.</em></h2>
          <p>Wiele Investments operates under Wiele Group, with its base in Malta and roots in South Africa. As a hybrid online brokerage, we combine digital asset presentation with direct client correspondence and introduce buyers and sellers within an agreed mandate.</p>
          <p>Our proprietary <Link href="/origination-protocol">Origination Protocol</Link> guides how we prepare an asset dossier, identify suitable buyer markets and approach qualified principals across the United Kingdom, Continental Europe, the Mediterranean and Southern Africa.</p>
          <p>From first contact, we build a brief around the seller, the buyer and the asset. We establish who can act, what the mandate covers and what evidence is available. Buyer nationality, asset location and asset class help us identify which eligibility, licensing, tax, title, registry and provenance questions need independent review.</p>
          <p>Qualified practitioners verify the evidence and advise on the applicable rules. Appointed attorneys and bankers handle final sale documents and settlement. Maltese immovable property mandates require separate handling through an appropriately licensed intermediary. Wiele-managed property maintenance is available in Malta.</p>
          <p>We distinguish collected income, contracted rent and projections. Obtain advice on legal structure and financing from a qualified adviser in the relevant jurisdiction.</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
