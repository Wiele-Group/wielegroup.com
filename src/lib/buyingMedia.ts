import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const buyingMedia = {
  hero: "/images/buying/hero-private-briefing.webp",
  maritime: "/images/buying/desk-maritime-survey.webp",
  provenance: "/images/buying/desk-provenance-inspection.webp",
} as const;

export type BuyingMediaKey = keyof typeof buyingMedia;

export function availableBuyingMedia(key: BuyingMediaKey) {
  const source = buyingMedia[key];
  return existsSync(join(process.cwd(), "public", source)) ? source : undefined;
}
