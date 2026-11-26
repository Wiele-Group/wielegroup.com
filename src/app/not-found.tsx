import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Arrow } from "@/components/property/chrome";

export const metadata: Metadata = {
 title: "Page unavailable",
 description: "Find Wiele Investments’ private mandates, asset desks and contact details.",
 robots: { index: false, follow: true },
};

export default function NotFound() {
 return <>
  <PageIntro eyebrow="Wiele Investments" title="Page unavailable" description="Continue to private mandates, the specialist asset desks or the Client Desk." />
  <div className="wrap not-found-action button-row">
   <Link href="/private-mandates" className="button">Private Mandates <Arrow /></Link>
   <Link href="/luxury-assets" className="text-link">Specialist asset desks <Arrow /></Link>
   <Link href="/contact" className="text-link">Client Desk <Arrow /></Link>
  </div>
 </>;
}
