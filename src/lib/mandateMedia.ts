import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const mandateMedia = {
  "cape-villa": "/images/mandates/thumb-cape-villa.webp",
  "ligurian-yacht": "/images/mandates/thumb-ligurian-yacht.webp",
  "oxfordshire-coupe": "/images/mandates/thumb-oxfordshire-coupe.webp",
} as const;

export type MandateSlug = keyof typeof mandateMedia;

export function availableMandateMedia(slug: MandateSlug) {
  const src = mandateMedia[slug];
  return existsSync(join(process.cwd(), "public", src)) ? src : undefined;
}
