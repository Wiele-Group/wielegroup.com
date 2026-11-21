import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findListingExample, exampleHref } from "@/lib/listing-examples";
import { propertyMetadata } from "@/lib/property";
import { RegisteredListingExample } from "@/components/property/registered-listing-example";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sample = findListingExample((await params).slug);
  if (!sample) return {};
  const description = `${sample.location.split(" · ")[0]} ${sample.categoryLabel.toLowerCase()} example from Wiele Investments. Explore the sample price, specifications and records. Fictional asset with AI-created imagery.`;
  const base = propertyMetadata(`${sample.title} — Fictional listing example`, description, exampleHref(sample.slug));
  return { ...base, robots: { index: false, follow: true }, openGraph: { ...base.openGraph, images: [{ url: sample.image, alt: sample.alt }] }, twitter: { ...base.twitter, images: [sample.image] } };
}
export default async function ListingExample({ params }: Props) {
  const sample = findListingExample((await params).slug);
  if (!sample) notFound();
  return <RegisteredListingExample slug={sample.slug}/>;
}
