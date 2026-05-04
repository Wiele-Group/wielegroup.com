/**
 * Wiele Motion System v1 — Framer Motion presets.
 * Authority: /Wiele Group Operations/wiele-motion-system-v1.md (2026-05-04).
 *
 * Use these presets in client components instead of inline transition objects.
 * Token grid: t1=100, t2=200, t3=300, t4=500, t5=700ms.
 * Easings: productive (UI default), expressiveIn (entries), expressiveOut (exits),
 * anticipate (signal moments only — featured CTAs, success).
 *
 * Linear easing is BANNED except for progress bars + skeletons.
 */

import type { Transition, Variants } from "framer-motion";

/* ── Easing curves ─────────────────────────────────────────────── */
export const ease = {
  productive: [0.4, 0.0, 0.2, 1] as const,
  expressiveIn: [0.32, 0.72, 0, 1] as const,
  expressiveOut: [0.16, 1, 0.3, 1] as const,
  anticipate: [0.68, -0.6, 0.32, 1.6] as const,
} as const;

/* ── Duration tokens (seconds, Framer-native) ──────────────────── */
export const duration = {
  t1: 0.1,
  t2: 0.2,
  t3: 0.3,
  t4: 0.5,
  t5: 0.7,
} as const;

/* ── Reveal — default IntersectionObserver entry ───────────────── */
export const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: duration.t4, ease: ease.expressiveIn } satisfies Transition,
};

/* ── Hero reveal — slower, more emphasis ───────────────────────── */
export const heroReveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: duration.t5,
    ease: ease.expressiveIn,
    delay: 0.1,
  } satisfies Transition,
};

/* ── Stagger container — pair with `staggerChild` on children ──── */
export const staggerContainer = (count: number = 4): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: count > 5 ? 0.04 : 0.06,
      delayChildren: 0.05,
    },
  },
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.t4, ease: ease.expressiveIn } as Transition,
  },
};

/* ── Hover lift — premium subtler than generic systems ─────────── */
export const hoverLift = {
  whileHover: { y: -2, scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { duration: duration.t2, ease: ease.productive } satisfies Transition,
};

export const hoverCard = {
  whileHover: { y: -4, scale: 1.015 },
  transition: { duration: duration.t3, ease: ease.expressiveIn } satisfies Transition,
};

/* ── Modal / dialog ────────────────────────────────────────────── */
export const modalEnter = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: duration.t3, ease: ease.expressiveIn } satisfies Transition,
};

/* ── Page transition (use with AnimatePresence) ────────────────── */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: duration.t4, ease: ease.expressiveIn } satisfies Transition,
};

/* ── Toast — anticipate curve for signal moments ───────────────── */
export const toastSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: duration.t3, ease: ease.anticipate } satisfies Transition,
};
