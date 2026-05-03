import { proofStripItems } from "@/data/homepage";
import { MarqueeRail } from "@/components/visual/marquee-rail";

/**
 * ProofStrip — capability rail under the hero.
 *
 * Phase 9 visual upgrade: replaced the static pill row with a
 * `<MarqueeRail />` (infinite scroll, pauses on hover/focus, flattens
 * to a wrapped grid for `prefers-reduced-motion: reduce`).
 *
 * Data shape (`proofStripItems`) is unchanged. This is purely a
 * presentation upgrade — same items, same tokens, motion added.
 */
export function ProofStrip() {
  return <MarqueeRail items={proofStripItems} ariaLabel="Capability strip" />;
}
