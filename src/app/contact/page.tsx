import { ClientDesk, contactMetadata } from "@/components/contact/client-desk";
import type { EnquiryQuery } from "@/components/property/enquiry-form";

export const metadata = contactMetadata("en");

export default async function ContactPage({ searchParams }: { searchParams: Promise<EnquiryQuery> }) {
 return <ClientDesk locale="en" query={await searchParams}/>;
}
