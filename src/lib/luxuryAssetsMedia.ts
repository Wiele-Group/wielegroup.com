import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const luxuryAssetsMedia = {
  hero: "/images/luxury-assets/hero-tangible-triad.webp",
  estate: "/images/luxury-assets/desk-prime-estate.webp",
  yacht: "/images/luxury-assets/desk-superyacht-profile.webp",
  collector: "/images/luxury-assets/desk-collector-chassis.webp",
} as const;

export type LuxuryAssetsMediaKey = keyof typeof luxuryAssetsMedia;

export function availableLuxuryAssetsMedia(key: LuxuryAssetsMediaKey) {
  const src = luxuryAssetsMedia[key];
  return existsSync(join(process.cwd(), "public", src)) ? src : undefined;
}
