import Link from "next/link";
import { EnquirySteps } from "@/components/property/personal-introduction";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PageIntro, Arrow } from "@/components/property/chrome";
import { propertyBrand, propertyMetadata } from "@/lib/property";
import { EnquiryForm } from "@/components/property/enquiry-form";
export const metadata: Metadata = propertyMetadata("Property & Luxury Asset Enquiries", "Contact Wiele Investments in Malta about buying or selling property, yachts or classic cars. Share your brief or email our company inbox.", "/contact");
export default function Contact() {
 return <div className="contact-page">
  <PageIntro path="/contact" eyebrow="Malta-based / Property & luxury asset enquiries" title="Discuss your brief." description="Malta-based property and luxury asset enquiries for buyers and sellers in the UK, Europe and South Africa. Tell us what you want to buy or sell, where and when." />
  <p className="contact-email-alternative wrap">Prefer email? <a href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a></p>
  <section className="contact-layout wrap">
   <Suspense fallback={<p>Loading the enquiry form… Email <a href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}</a>.</p>}><EnquiryForm /></Suspense>
   <aside><span className="eyebrow">Your Wiele contact</span><h2>Jonathan<br /><em>Landman.</em></h2><p>Property and premium automotive sales experience in South Africa.</p><Link className="text-link" href="/about#jonathan-landman">Background &amp; experience <Arrow diagonal /></Link>
    <div className="contact-detail"><span>Email</span><a href={`mailto:${propertyBrand.email}`}>{propertyBrand.email} <Arrow diagonal /></a></div>
    <div className="contact-detail"><span>Based in</span><p>{propertyBrand.location}</p></div>
    <div className="contact-detail"><span>Appointments</span><p>By appointment only · English &amp; Afrikaans</p></div>
    <p className="fine-print">Please don’t send identity documents, bank details or confidential ownership records through this form.</p>
    <p className="maintenance-contact-link">For practical property care in Malta, <Link href="/property-maintenance#request-maintenance">request property maintenance <Arrow diagonal /></Link>.</p>
   </aside>
  </section><EnquirySteps />
 </div>;
}
