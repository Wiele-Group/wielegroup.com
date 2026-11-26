import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const valuationsMedia = {
  hero: "/images/valuations/hero-appraisal-study.webp",
  maritime: "/images/valuations/desk-maritime-classification.webp",
  concours: "/images/valuations/desk-concours-provenance.webp",
} as const;

export type ValuationsMediaKey = keyof typeof valuationsMedia;

export function availableValuationsMedia(key: ValuationsMediaKey) {
  const path = valuationsMedia[key];
  return existsSync(join(process.cwd(), "public", path)) ? path : undefined;
}
