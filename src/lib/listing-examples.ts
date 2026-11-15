import examples from "@/data/listing-examples.json";
export const listingExamples = examples;
export const exampleDisclosure = "Illustrative example — not for sale";
export function exampleHref(slug: string) { return `/listing-examples/${slug}`; }
export function exampleSellerHref(example: typeof examples[number]) {
  return `${example.seller}&example=${encodeURIComponent(example.slug)}`;
}
