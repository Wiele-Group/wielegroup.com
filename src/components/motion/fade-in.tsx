"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type FadeInProps = {
  children: ReactNode;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Seconds the animation runs. */
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
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
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
    ease: [0.2, 0, 0, 1] as const,
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
