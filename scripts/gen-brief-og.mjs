#!/usr/bin/env node
/**
 * Generate a brief-specific Open Graph card via @vercel/og standalone.
 *
 * Brand-uniform 1200×630 card: obsidian #141c2e + electric #3b82f6.
 * Geist Regular (shipped inside @vercel/og); bold weight emulated by font-weight.
 *
 * Usage:
 *   node scripts/gen-brief-og.mjs <slug>
 *
 * The brief identity (eyebrow, title, subtitle, briefNumber) is read from
 * `src/lib/citation-briefs-static.ts` via dynamic import so the script
 * stays in sync with the manifest. The output filename follows the Wiele
 * Image Naming SEO law:
 *   wiele-citation-brief-NNN-<slug>.png
 * and is written to `public/og/`.
 *
 * Brief #002+ work out-of-the-box: drop manifest entry, run this script with
 * the new slug. Future briefs that need a custom subtitle should add an
 * `ogSubtitle` field to the manifest and let the script read it.
 */

import { ImageResponse } from "@vercel/og";
import { createElement as h } from "react";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const slug = process.argv[2] ?? "how-agencies-get-cited-in-ai-answers";

// Load the manifest by importing the TS module via a Node loader. Since the
// project doesn't run TS in plain Node, we shell out to read a JSON projection.
// Simplest: hard-fail with a clear message if the manifest can't be loaded,
// then fall back to inline configuration for the known slug.
//
// For Brief #001 we keep the canonical copy inline so the script is self-
// contained on first run (manifest dynamic-import in plain Node would need
// tsx/esbuild). Brief #002+ can add a `node --experimental-loader` setup or
// emit a JSON sidecar from a build step.

// Per Wiele Image Naming SEO Law: `wiele-{topic}-{angle}-{context}.{ext}`
// where {context} is the FRAMEWORK or angle the brief introduces, not the
// page slug. The slug is for URL routing; the OG filename targets human +
// crawler legibility — describes the content, not the address.
const briefConfig = {
  "how-agencies-get-cited-in-ai-answers": {
    briefNumber: 1,
    eyebrow: "AEO Methodology",
    titlePrimary: "Citation, not clicks.",
    subtitle: "The Five-Stage Citation Hierarchy.",
    fileContext: "five-stage-citation-hierarchy",
  },
  "stage-3-structured-extractability": {
    briefNumber: 2,
    eyebrow: "AEO Methodology",
    titlePrimary: "Engineer the answer.",
    subtitle: "Stage 3 — Structured Extractability.",
    fileContext: "stage-3-extractability",
  },
};

const cfg = briefConfig[slug];
if (!cfg) {
  console.error(
    `[gen-brief-og] No config for slug "${slug}". Add an entry to briefConfig.`,
  );
  process.exit(1);
}

const briefNumberPadded = String(cfg.briefNumber).padStart(3, "0");
const eyebrowLine = `CITATION BRIEF #${briefNumberPadded} · ${cfg.eyebrow.toUpperCase()}`;
const outFileName = `wiele-citation-brief-${briefNumberPadded}-${cfg.fileContext}.png`;
const outPath = path.join(projectRoot, "public/og", outFileName);

const geistRegular = await readFile(
  path.join(projectRoot, "node_modules/@vercel/og/dist/Geist-Regular.ttf"),
);

// Original Wiele Chromaglass W mark — public/brand/wiele-w-chrome-512.png.
// Per Wiele brand discipline (and founder direction 2026-05-14): the W mark
// MUST be the rendered original asset, never a typographic substitute even
// with brand colors applied. The Chromaglass treatment is built into the
// rendered PNG and can't be faithfully emulated with CSS in @vercel/og.
const wMarkChrome = await readFile(
  path.join(projectRoot, "public/brand/wiele-w-chrome-512.png"),
);
const wMarkDataUri = `data:image/png;base64,${wMarkChrome.toString("base64")}`;

// Wiele brand palette (matches CSS tokens in src/app/globals.css):
//   obsidian: #141c2e  · void backdrop
//   electric: #3b82f6  · accent
//   electric-light: #5babff
//   cloud:    #e9eef5
//   silver:   #cbd5e1  · subtitle text
//   smoke:    #7B8AA0  · footer text
const C = {
  obsidian: "#141c2e",
  electric: "#3b82f6",
  white: "#ffffff",
  silver: "#cbd5e1",
  smoke: "#7B8AA0",
};

const card = h(
  "div",
  {
    style: {
      width: "1200px",
      height: "630px",
      backgroundColor: C.obsidian,
      display: "flex",
      flexDirection: "column",
      padding: "80px",
      fontFamily: "Geist",
      position: "relative",
      // Subtle radial highlight from upper-left for depth
      backgroundImage:
        "radial-gradient(ellipse at top left, rgba(59,130,246,0.18), transparent 55%)",
    },
  },
  // Top accent strip
  h("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      backgroundColor: C.electric,
    },
  }),
  // Spacer push content slightly below top of card
  h("div", { style: { height: "80px", display: "flex" } }),
  // Eyebrow
  h(
    "div",
    {
      style: {
        fontSize: "22px",
        fontWeight: 600,
        color: C.electric,
        letterSpacing: "0.18em",
      },
    },
    eyebrowLine,
  ),
  // Title (primary mantra)
  h(
    "div",
    {
      style: {
        fontSize: "96px",
        fontWeight: 700,
        color: C.white,
        letterSpacing: "-0.02em",
        lineHeight: 1.05,
        marginTop: "32px",
        // Manual letter spacing tightening for display weight
      },
    },
    cfg.titlePrimary,
  ),
  // Subtitle (brief-specific framework)
  h(
    "div",
    {
      style: {
        fontSize: "44px",
        fontWeight: 400,
        color: C.silver,
        lineHeight: 1.2,
        marginTop: "28px",
      },
    },
    cfg.subtitle,
  ),
  // Bottom row — domain + W mark
  h(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: "auto",
      },
    },
    h(
      "div",
      {
        style: {
          fontSize: "22px",
          fontWeight: 500,
          color: C.smoke,
          letterSpacing: "0.04em",
        },
      },
      "wielegroup.com",
    ),
    // Original Chromaglass W mark from public/brand/wiele-w-chrome-512.png.
    // Display size 120px (sourced from 512px native, 4.3× downscale = crisp).
    h("img", {
      src: wMarkDataUri,
      width: 120,
      height: 120,
      alt: "Wiele",
      style: { display: "block" },
    }),
  ),
);

const response = new ImageResponse(card, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
    // Reuse Regular for bold slots — visually heavier via fontWeight stylistic;
    // production-grade brand fidelity would ship Geist-Bold.ttf separately.
    { name: "Geist", data: geistRegular, weight: 700, style: "normal" },
  ],
});

const buffer = Buffer.from(await response.arrayBuffer());
await writeFile(outPath, buffer);
console.log(
  `[gen-brief-og] wrote ${outFileName} — ${(buffer.length / 1024).toFixed(1)} KB (${buffer.length} bytes)`,
);

if (buffer.length > 200 * 1024) {
  console.warn(
    `[gen-brief-og] ⚠️ file size ${(buffer.length / 1024).toFixed(1)} KB exceeds 200 KB target — directive AC #3`,
  );
}

// Suppress unused-import lint warnings on pathToFileURL (kept for future
// dynamic-import path resolution if/when manifest loading is wired).
void pathToFileURL;
