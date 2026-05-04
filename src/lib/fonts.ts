import { Geist, Geist_Mono } from "next/font/google";

/**
 * Brand v2 — Midnight Platinum / Tech Premium (B3).
 * Single Geist family across display + body for cohesive, premium feel.
 * Geist Mono reserved for code, data, technical accents.
 *
 * Replaced (2026-05-04): Inter + JetBrains_Mono → Geist + Geist_Mono.
 * Authority: Founder selection "B3" — see project_brand_v2_doctrine.md.
 */

export const fontSans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
});
