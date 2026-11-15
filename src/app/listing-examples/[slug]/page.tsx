import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { findListingExample, exampleHref, exampleDisclosure } from "@/lib/listing-examples";
import { propertyMetadata, propertyBrand } from "@/lib/property";
import { listingCookie, validListingAccess, type ListingEnvironment } from "@/server/listing-access";
import { PageStructuredData, StructuredData } from "@/components/property/structured-data";
import { ListingRegistration } from "@/components/property/listing-registration";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const e = findListingExample((await params).slug); if (!e) return {};
 const description = `Malta-based ${e.categoryLabel.toLowerCase()} brokerage example: ${e.title}. Register to view this fictional presentation. AI-created image; not for sale.`;
 const base = propertyMetadata(`${e.title} — Register to View`, description, exampleHref(e.slug));
 return { ...base, robots: { index: false, follow: true, googleBot: { index: false, follow: true } }, openGraph: { ...base.openGraph, images: [{ url: e.image, alt: e.alt }] }, twitter: { ...base.twitter, images: [e.image] } };
}
export default async function ListingExample({ params }: Props) {
 const e = findListingExample((await params).slug); if (!e) notFound();
 const token = (await cookies()).get(listingCookie)?.value ?? "";
 let allowed = false;
 try { const env = getCloudflareContext().env as unknown as ListingEnvironment; allowed = !!env.REPORT_ACCESS_SECRET && await validListingAccess(env.REPORT_ACCESS_SECRET, token); } catch { /* Access fails closed. */ }
 if (allowed) { const { RegisteredListingExample } = await import("@/components/property/registered-listing-example"); return <RegisteredListingExample slug={e.slug}/>; }
 const path = exampleHref(e.slug);
 return <div className="example-detail-page"><PageStructuredData path={path} title={`${e.title} — Register to View`} description={`Malta-based ${e.categoryLabel.toLowerCase()} brokerage example. Registration required; fictional asset, not for sale.`}/>
 <StructuredData data={{ "@context": "https://schema.org", "@type": "WebPage", "@id": `${propertyBrand.url}${path}#registration`, url: `${propertyBrand.url}${path}`, name: `${e.title} — Listing access`, isAccessibleForFree: false, conditionsOfAccess: "Complimentary listing access after name and email registration. Access lasts 30 days in this browser. Optional marketing consent is separate." }}/>
 <div className="example-notice"><div className="wrap"><strong>{exampleDisclosure}</strong><span>Registration required to view prices, specifications and full listing details.</span></div></div>
 <header className="example-heading wrap"><Link className="text-link" href={`${e.back}#listing-examples`}>← Back to the collection</Link><span className="eyebrow">Malta-based brokerage / {e.categoryLabel}</span><h1>{e.title}</h1><p>{e.location}</p></header>
 <figure className="example-hero wrap"><div><Image src={e.image} alt={e.alt} fill sizes="(max-width:760px) 100vw, 90vw" priority/></div><figcaption>AI-created illustrative concept · Fictional asset, not for sale</figcaption></figure>
 <section id="register" className="article-gate listing-registration-gate wrap"><div><span className="eyebrow">Wiele listings / Registered access</span><h2>A closer look.<br/><em>Starts here.</em></h2><p>Register to view prices, specifications, full descriptions, records and condition information across the listing examples.</p><p>Complimentary access lasts 30 days in this browser. No password or payment is required. Marketing updates are optional.</p><p className="listing-disclaimer">These are fictional presentations for prospective sellers. Registration does not create a reservation, purchase, brokerage instruction or payment obligation, and does not verify your email address or buyer status.</p></div><ListingRegistration slug={e.slug}/></section></div>;
}
