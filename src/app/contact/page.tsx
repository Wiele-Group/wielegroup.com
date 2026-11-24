import { PAGE_METADATA } from "@/lib/seo-metadata";
import Link from "next/link";
import { EnquirySteps } from "@/components/property/personal-introduction";
import { PageIntro, Arrow } from "@/components/property/chrome";
import { EnquiryForm, type EnquiryQuery } from "@/components/property/enquiry-form";
import { StructuredData } from "@/components/property/structured-data";
import { propertyBrand } from "@/lib/property";

export const metadata = PAGE_METADATA.contact;

const consultationZones = [
 { zone: "CET / CEST", market: "Malta & Central Europe" },
 { zone: "GMT / BST", market: "United Kingdom" },
 { zone: "SAST", market: "South Africa" },
];

const faqs = [
 { question: "Does an enquiry create any obligation?", answer: "An initial enquiry is free of obligation. It creates no reservation, purchase, instruction or payment commitment. You decide whether to proceed after discussing the scope and any fees." },
 { question: "How confidential is my enquiry?", answer: "Wiele handles your enquiry in confidence and uses your details to respond. You can request an NDA before sharing sensitive material. Keep bank details, identity documents and confidential ownership records out of this form." },
 { question: "Who handles formal transaction documents?", answer: "Appropriately licensed, independent practitioners in the relevant jurisdiction handle formal contracts, escrow, tax filings and other transaction documents. Wiele can coordinate the introduction." },
];

export default async function Contact({ searchParams }: { searchParams: Promise<EnquiryQuery> }) {
 const { brief, example, interest, focus, market, asset, intent } = await searchParams;
 const query = { brief, example, interest, focus, market, asset, intent };
 return <div className="contact-page">
  <PageIntro path="/contact" eyebrow="Malta-based / Property & luxury asset enquiries" title="Property and luxury asset enquiries" description="Tell us what you want to buy or sell in the UK, Europe or South Africa." />
  <section className="contact-layout wrap" aria-label="Enquiry and contact details">
   <EnquiryForm key={JSON.stringify(query)} query={query} />
   <aside>
    <span className="eyebrow">Your Wiele contact</span>
    <h2>Jonathan<br /><em>Landman.</em></h2>
    <p>Property and premium automotive sales experience in South Africa.</p>
    <Link className="text-link" href="/about#jonathan-landman">Background &amp; experience <Arrow diagonal /></Link>
    <div className="contact-detail"><span>Email</span><a href={`mailto:${propertyBrand.email}`}>{propertyBrand.email} <Arrow diagonal /></a></div>
    <div className="contact-detail"><span>Based in</span><p>{propertyBrand.location}</p></div>
    <div className="contact-detail"><span>Consultation time zones</span>
     <dl className="contact-time-zones">
      {consultationZones.map(({ zone, market }) => <div key={zone}><dt>{zone}</dt><dd>{market}</dd></div>)}
     </dl>
    </div>
    <div className="contact-detail">
     <span>Appointments</span>
     <p>English &amp; Afrikaans by appointment.</p>
     <p lang="af">Navrae en konsultasies is ook in Afrikaans beskikbaar op afspraak.</p>
    </div>
    <div className="contact-detail">
     <span>Direct principal review</span>
     <p>Jonathan personally reviews your enquiry within one business day. An NDA is available on request before you share sensitive information.</p>
    </div>
    <p className="fine-print">Please don’t send identity documents, bank details or confidential ownership records through this form.</p>
    <p className="maintenance-contact-link">For practical property care in Malta, <Link href="/property-maintenance#request-maintenance">request property maintenance <Arrow diagonal /></Link>.</p>
   </aside>
  </section>
  <EnquirySteps />
  <section className="investment-faq wrap contact-faq" id="before-you-submit" aria-labelledby="contact-faq-title">
   <h2 id="contact-faq-title">Before you submit</h2>
   <div className="investment-faq-list">
    {faqs.map(({question, answer}) => <details key={question}>
     <summary>{question}<span aria-hidden="true">+</span></summary>
     <p>{answer}</p>
    </details>)}
   </div>
  </section>
  <StructuredData data={{
   "@context": "https://schema.org", "@type": "FAQPage", "@id": `${propertyBrand.url}/contact#before-you-submit`,
   mainEntity: faqs.map(({question, answer}) => ({
    "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
   })),
  }} />
 </div>;
}
