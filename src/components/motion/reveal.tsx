"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { ease, duration as motionDuration } from "@/lib/motion";

export type RevealProps = {
  children: ReactNode;
  /** Stagger between children, in seconds. Defaults to motion v1 6-element rule (0.06 s). */
  stagger?: number;
  /** Initial delay before the first child animates. */
  delay?: number;
  /** Pixels to translate from on the Y axis. */
  y?: number;
  className?: string;
};

/**
 * Staggered fade + lift on enter view. Each direct child animates in turn.
 * Respects prefers-reduced-motion: renders all children in their final state instantly.
 *
 * Wiele Motion System v1 — defaults consume centralized tokens from
 * @/lib/motion:
 *   duration  → t4 (0.5 s)
 *   ease      → expressive-in
 *   stagger   → 0.06 s (motion v1 rule for ≤5 children; consumers passing
 *               6+ children should pass stagger={0.04} per the spec)
 */
export function Reveal({
  children,
  stagger = 0.06,
  delay = 0,
  y = 16,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const childArray = Children.toArray(children);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  const itemVariants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : motionDuration.t4,
        ease: ease.expressiveIn,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      {childArray.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
