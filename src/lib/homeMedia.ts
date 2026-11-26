import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const homeMedia = {
  hero: "/images/home/hero-palazzo-twilight.webp",
  architecture: "/images/home/triptych-architecture.webp",
  maritime: "/images/home/triptych-maritime.webp",
  automotive: "/images/home/triptych-automotive.webp",
  cape: "/images/home/dossier-cover-cape.webp",
  ligurian: "/images/home/dossier-cover-ligurian.webp",
  oxfordshire: "/images/home/dossier-cover-oxfordshire.webp",
} as const;

export type HomeMediaKey = keyof typeof homeMedia;

export const homeSocialFallback = "/images/home/private-treaty-social.png";

export function availableHomeMedia(key: HomeMediaKey) {
  const src = homeMedia[key];
  return existsSync(join(process.cwd(), "public", src)) ? src : undefined;
}
