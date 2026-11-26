import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const sellingMedia = {
  hero: "/images/selling/hero-mandate-salon.webp",
  craft: "/images/selling/craft-editorial-presentation.webp",
  corridor: "/images/selling/corridor-cross-border-reach.webp",
} as const;

export type SellingMediaKey = keyof typeof sellingMedia;

export function availableSellingMedia(key: SellingMediaKey) {
  const src = sellingMedia[key];
  return existsSync(join(process.cwd(), "public", src)) ? src : undefined;
}
