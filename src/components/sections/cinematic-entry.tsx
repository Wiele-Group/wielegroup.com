"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ease, duration as motionDuration } from "@/lib/motion";

/**
 * CinematicEntry — full-viewport brand entry sequence.
 *
 * 2026-05-04 PM (founder direction): the landing page must be a visual
 * entry point. The 3D Chromaglass W mark with motion is the cinematic
 * first impression. Conversion engine (PromptSimulator) lives in the
 * second viewport via the existing <HeroSection> below.
 *
 * Sequence (≈ 2.6 s on first paint, all values from Wiele Motion v1):
 *   T+000  void backdrop (gradient already paints from globals.css)
 *   T+150  ambient glow rises from center
 *   T+400  3D Chromaglass W fades in + scales 0.92 → 1.00, ease expressiveIn, t5 (700 ms)
 *   T+1100 'wiele' wordmark slides up + fades in, t4 (500 ms)
 *   T+1500 tagline slides up + fades in, t4 (500 ms)
 *   T+2300 scroll indicator pulses in, t3 (300 ms)
 *
 * LCP candidate: the 3D W mark (intended). Asset is the 512.png (~211 KB
 * raw → ~80-130 KB after Next.js WebP optimisation), displayed at max
 * 384 px wide. priority=true so it preloads.
 *
 * Reduced motion: skip every transition; render the final composition
 * instantly. Brand still reads, no sequence runs.
 */
export function CinematicEntry() {
  const reduce = useReducedMotion();

  // Phase orchestration. delayChildren cascades each layer into view.
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0 : 0.15,
        staggerChildren: reduce ? 0 : 0.35,
      },
    },
  };

  // Glow halo behind the mark — soft radial that pulses in.
  const glowVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reduce ? 0 : motionDuration.t5,
        ease: ease.expressiveIn,
      },
    },
  };

  // The W mark itself — scale + opacity reveal.
  const markVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 8 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : motionDuration.t5,
        ease: ease.expressiveIn,
      },
    },
  };

  // Wordmark — slide up + fade.
  const wordmarkVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : motionDuration.t4,
        ease: ease.expressiveIn,
      },
    },
  };

  // Tagline — same cadence as wordmark, one staggerChildren tick later.
  const taglineVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : motionDuration.t4,
        ease: ease.expressiveIn,
      },
    },
  };

  // Scroll indicator — anticipate easing for a subtle "alive" pulse.
  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : motionDuration.t3,
        ease: ease.anticipate,
        delay: reduce ? 0 : 0.4,
      },
    },
  };

  return (
    <section
      aria-labelledby="cinematic-entry-heading"
      className="relative isolate flex min-h-[100dvh] w-full items-center justify-center overflow-hidden"
    >
      {/* Layered backdrop: vertical → radial → grid texture (subtle) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 1100px 700px at 50% 45%, #1A2540 0%, #0C1220 65%, #070B14 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-pattern opacity-[0.18]" />

      {/* Subtle bichromatic ambient (blue top-right, coral bottom-left) — chromaglass signature */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle 600px at 78% 22%, rgba(59,130,246,0.10) 0%, transparent 65%), radial-gradient(circle 700px at 22% 78%, rgba(240,133,102,0.08) 0%, transparent 65%)",
        }}
      />

      <motion.div
        className="relative flex flex-col items-center gap-6 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Glow halo behind mark */}
        <motion.div
          aria-hidden
          variants={glowVariants}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] h-[420px] w-[420px] rounded-full -z-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(91,171,255,0.22) 0%, rgba(240,133,102,0.10) 35%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* The chromaglass W mark — LCP candidate */}
        <motion.div variants={markVariants} className="select-none">
          <Image
            src="/brand/wiele-3d-chromaglass-512.png"
            alt="Wiele Group — Chromaglass W mark"
            width={512}
            height={512}
            priority
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 384px"
            className="h-auto w-[240px] sm:w-[320px] lg:w-[384px] drop-shadow-[0_24px_80px_rgba(59,130,246,0.25)]"
          />
        </motion.div>

        {/* Lowercase wordmark with bichromatic chrome gradient */}
        <motion.h1
          id="cinematic-entry-heading"
          variants={wordmarkVariants}
          className="font-mono text-[clamp(3rem,9vw,6rem)] font-light tracking-[-0.04em] leading-none"
          style={{
            background:
              "linear-gradient(135deg, #5BABFF 0%, #EEF2F8 50%, #FFC2A0 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          wiele
        </motion.h1>

        {/* Tagline — chrome-mid mono register */}
        <motion.p
          variants={taglineVariants}
          className="font-mono text-body-xs uppercase tracking-[0.32em] text-[var(--color-chrome-mid)]"
        >
          The agency operating system
        </motion.p>

        {/* Scroll indicator — bottom of viewport */}
        <motion.div
          variants={scrollIndicatorVariants}
          className="absolute bottom-[-22vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.32em] text-[var(--color-chrome-lo)]">
            Scroll
          </span>
          <motion.div
            animate={
              reduce
                ? { y: 0 }
                : {
                    y: [0, 6, 0],
                    transition: {
                      duration: 1.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    },
                  }
            }
          >
            <ChevronDown
              size={18}
              className="text-[var(--color-chrome-lo)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
