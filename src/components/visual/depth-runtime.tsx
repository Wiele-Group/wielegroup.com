"use client";

import { useEffect } from "react";

/**
 * v3.5.0 depth runtime — single client island that attaches 3D tilt
 * to every `.wg-depth-card` element on the page.
 *
 * Behavior:
 *   - Desktop only (>=769px). Mobile keeps cards flat for tap clarity.
 *   - Skipped entirely under prefers-reduced-motion.
 *   - mousemove drives rotateX/rotateY via inline transform; mouseleave
 *     resets. Inline style overrides the chrome-card hover lift on
 *     desktop, which is intentional — depth tilt replaces it.
 *
 * Class-driven discovery — no per-component wiring. Add `wg-depth-card`
 * to any element (typically inside a `wg-depth-scene` perspective parent)
 * to opt in.
 */
export function DepthRuntime() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    if (reduceMotion || !isDesktop) return;

    const cards = document.querySelectorAll<HTMLElement>(".wg-depth-card");
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (((event.clientY - rect.top) - cy) / cy) * -4;
        const ry = (((event.clientX - rect.left) - cx) / cx) * 4;
        card.style.transform = `translate3d(0, -6px, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.008)`;
      };
      const onLeave = () => {
        card.style.transform = "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
