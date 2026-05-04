"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ease, duration as motionDuration } from "@/lib/motion";

export type FadeInProps = {
  children: ReactNode;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Seconds the animation runs. Defaults to motion v1 t4 (0.5 s). */
  duration?: number;
  /** Pixels to translate from on the Y axis. */
  y?: number;
  className?: string;
  /** Start the animation immediately (default), or only when scrolled into view. */
  whileInView?: boolean;
};

/**
 * One-shot fade + lift on mount (or on enter view if whileInView).
 * Respects prefers-reduced-motion: renders the final state instantly.
 *
 * Wiele Motion System v1 — defaults consume centralized tokens from
 * @/lib/motion:
 *   duration → t4 (0.5 s)
 *   ease     → expressive-in
 * Override via props if a specific surface needs a different cadence,
 * but prefer the defaults so the system reads as one cohesive motion.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = motionDuration.t4,
  y = 12,
  className,
  whileInView = false,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y };
  const animate = { opacity: 1, y: 0 };
  const transition = {
    duration: reduce ? 0 : duration,
    delay: reduce ? 0 : delay,
    ease: ease.expressiveIn,
  };

  if (whileInView) {
    return (
      <motion.div
        className={className}
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
