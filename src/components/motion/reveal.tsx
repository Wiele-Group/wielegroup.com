"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";

export type RevealProps = {
  children: ReactNode;
  /** Stagger between children, in seconds. */
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
 */
export function Reveal({
  children,
  stagger = 0.08,
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
      transition: { duration: reduce ? 0 : 0.5, ease: [0.2, 0, 0, 1] as const },
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
