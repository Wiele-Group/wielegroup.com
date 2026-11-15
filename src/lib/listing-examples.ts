import examples from "@/data/listing-examples.json";
export const listingExamples = examples;
export const listingConsentVersion = "listings-2026-11-15-v1";
export function findListingExample(slug: string) { return listingExamples.find(e => e.slug === slug); }
export const exampleDisclosure = "Illustrative example — not for sale";
export function exampleHref(slug: string) { return `/listing-examples/${slug}`; }
export function exampleSellerHref(example: typeof examples[number]) {
  return `${example.seller}&example=${encodeURIComponent(example.slug)}`;
}
