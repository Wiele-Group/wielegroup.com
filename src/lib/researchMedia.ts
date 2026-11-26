import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const researchMedia = {
  hero: "/images/research/hero-intelligence-archive.webp",
  corridor: "/images/research/briefing-corridor-liquidity.webp",
  provenance: "/images/research/briefing-provenance-ledger.webp",
} as const;

export type ResearchMediaKey = keyof typeof researchMedia;

export function availableResearchMedia(key: ResearchMediaKey) {
  const path = researchMedia[key];
  return existsSync(join(process.cwd(), "public", path)) ? path : undefined;
}
