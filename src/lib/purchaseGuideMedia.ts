import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const purchaseGuideMedia = {
  hero: "/images/purchase-guide/hero-settlement-study.webp",
  coastal: "/images/purchase-guide/corridor-coastal-conveyance.webp",
  maritime: "/images/purchase-guide/corridor-maritime-registry.webp",
} as const;

export type PurchaseGuideMediaKey = keyof typeof purchaseGuideMedia;

export function availablePurchaseGuideMedia(key: PurchaseGuideMediaKey) {
  const path = purchaseGuideMedia[key];
  return existsSync(join(process.cwd(), "public", path)) ? path : undefined;
}
