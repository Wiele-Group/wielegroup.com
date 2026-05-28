"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface LineGeometry {
  left: number;
  top: number;
  width: number;
  angle: number;
}

// Row-2 vertical centre: row1(200px) + gap(24px) + half row2(100px) = 324px.
// Stable across all container widths — only column widths vary on resize.
const DISC_TOP_PX = 324;

const MODULES = [
  // Left column — brand-layer disciplines
  {
    id: "brand",
    col: 1,
    row: 1,
    num: "01",
    label: "Brand Management",
    blurb: "Strategic identity, narrative architecture, and compounding brand equity.",
    href: "/brand-management-agency",
  },
  {
    id: "marketing",
    col: 1,
    row: 2,
    num: "02",
    label: "Marketing",
    blurb: "Audience, content, lifecycle, and ops engineered as one growth engine.",
    href: "/marketing-agency",
  },
  {
    id: "web",
    col: 1,
    row: 3,
    num: "03",
    label: "Web Design",
    blurb: "Premium digital experiences built around performance and conversion.",
    href: "/web-design-agency",
  },
  // Right column — authority-layer disciplines (paired thematically with left)
  {
    id: "ai",
    col: 3,
    row: 1,
    num: "06",
    label: "AI Search",
    blurb: "GEO + AEO engineered across ChatGPT, Perplexity, Gemini, and AI Overviews.",
    href: "/systems/ai-visibility",
  },
  {
    id: "advertising",
    col: 3,
    row: 2,
    num: "04",
    label: "Advertising",
    blurb: "Full-funnel paid media with the craft and rigour of a brand agency.",
    href: "/advertising-agency",
  },
  {
    id: "seo",
    col: 3,
    row: 3,
    num: "05",
    label: "SEO Services",
    blurb: "Technical SEO, content systems, and entity-level search authority.",
    href: "/systems/search",
  },
] as const;

const PIPELINE = [
  { label: "AI Engines Monitored", value: "6" },
  { label: "Citation Signals", value: "5 Pillars" },
  { label: "Engagement Cycle", value: "Map · Build · Compound" },
  { label: "Disciplines Active", value: "6 Integrated" },
] as const;

/**
 * AuthorityCommand — Phase 4 visual centrepiece.
 *
 * Desktop: 3-column CSS grid (1fr 184px 1fr × 3 rows of 200px, gap 24px).
 * Six chrome-card module cards in the outer columns; an absolutely-positioned
 * OS disc at the grid centre (top: 324px — row1+gap+half-row2). Six 1px signal
 * lines connect each card to the disc via getBoundingClientRect geometry,
 * computed after scroll reveal and on every resize.
 *
 * Scroll reveal: single IntersectionObserver (fires once, then disconnects).
 * prefers-reduced-motion: handled entirely via CSS `motion-safe:` Tailwind
 * variant — no JS needed, no ref-during-render, no setState-in-effect-body.
 *
 * Mobile: flat 2-col chrome-card grid; disc and signal lines not rendered.
 */
export function AuthorityCommand() {
  const stageRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);

  // Six individual refs — one per module card (avoids array-ref callback during render)
  const cardRef0 = useRef<HTMLAnchorElement>(null);
  const cardRef1 = useRef<HTMLAnchorElement>(null);
  const cardRef2 = useRef<HTMLAnchorElement>(null);
  const cardRef3 = useRef<HTMLAnchorElement>(null);
  const cardRef4 = useRef<HTMLAnchorElement>(null);
  const cardRef5 = useRef<HTMLAnchorElement>(null);

  const [lines, setLines] = useState<LineGeometry[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const computeLines = useCallback(() => {
    if (!stageRef.current || !discRef.current) return;
    const sr = stageRef.current.getBoundingClientRect();
    if (sr.width === 0) return; // stage hidden (display:none on mobile)
    const dr = discRef.current.getBoundingClientRect();
    const discCx = dr.left + dr.width / 2 - sr.left;
    const discCy = dr.top + dr.height / 2 - sr.top;

    const refs = [cardRef0, cardRef1, cardRef2, cardRef3, cardRef4, cardRef5];
    const computed: LineGeometry[] = [];
    for (const cr of refs) {
      if (!cr.current) continue;
      const r = cr.current.getBoundingClientRect();
      const cx = r.left + r.width / 2 - sr.left;
      const cy = r.top + r.height / 2 - sr.top;
      const dx = discCx - cx;
      const dy = discCy - cy;
      computed.push({
        left: cx,
        top: cy,
        width: Math.hypot(dx, dy),
        angle: (Math.atan2(dy, dx) * 180) / Math.PI,
      });
    }
    setLines(computed);
  }, []);

  // Scroll reveal — setRevealed(true) lives inside the IO callback (not effect body)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Recompute signal lines after reveal and on every resize
  useEffect(() => {
    if (!revealed) return;
    computeLines();
    window.addEventListener("resize", computeLines);
    return () => window.removeEventListener("resize", computeLines);
  }, [revealed, computeLines]);

  // Map from MODULES index to the corresponding ref
  const cardRefs = [cardRef0, cardRef1, cardRef2, cardRef3, cardRef4, cardRef5];

  return (
    <section
      aria-labelledby="authority-command-heading"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Ambient radial accent centred on the grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 50% 50%, rgba(59,130,246,0.065) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-body-xs uppercase tracking-[0.16em] text-electric">
            Wiele OS
          </p>
          <h2
            id="authority-command-heading"
            className="text-balance text-display-lg text-white"
          >
            One operating system. Six channels of authority.
          </h2>
          <p className="mt-4 max-w-xl text-body-lg text-silver">
            Brand, marketing, web, advertising, SEO, and AI search engineered
            as one integrated command architecture. Every channel signals the
            others.
          </p>
        </div>

        {/* ── Desktop stage: 3-col grid + OS disc + signal lines ── */}
        <div
          ref={stageRef}
          className="relative hidden gap-6 lg:grid"
          style={{
            gridTemplateColumns: "1fr 184px 1fr",
            gridTemplateRows: "200px 200px 200px",
          }}
        >
          {/* 1px decorative signal lines from each card toward the OS disc */}
          {revealed &&
            lines.map((line, i) => (
              <div
                key={i}
                aria-hidden
                className="pointer-events-none absolute motion-safe:transition-[background] motion-safe:duration-300"
                style={{
                  left: line.left,
                  top: line.top,
                  width: line.width,
                  height: 1,
                  transformOrigin: "left center",
                  transform: `translateY(-0.5px) rotate(${line.angle}deg)`,
                  background: `linear-gradient(90deg, rgba(91,171,255,${hovered === MODULES[i].id ? 0.5 : 0.22}) 0%, rgba(91,171,255,0) 85%)`,
                  transitionTimingFunction: "var(--ease-productive)",
                }}
              />
            ))}

          {/* Six module cards — explicitly placed in outer grid columns */}
          {MODULES.map((mod, i) => (
            <Link
              key={mod.id}
              href={mod.href}
              ref={cardRefs[i]}
              aria-label={`${mod.label} — ${mod.blurb}`}
              onMouseEnter={() => setHovered(mod.id)}
              onMouseLeave={() => setHovered(null)}
              className="chrome-card group relative flex flex-col p-6 motion-safe:transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]"
              style={{
                gridColumn: mod.col,
                gridRow: mod.row,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : "translateY(10px)",
                transitionDuration: "500ms",
                transitionDelay: `${i * 0.07}s`,
                transitionTimingFunction: "var(--ease-expressive-in)",
              }}
            >
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-mono text-body-xs tracking-[0.18em] text-smoke">
                  {mod.num}
                </span>
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="text-smoke transition-[transform,color] duration-[var(--motion-t2)] ease-[var(--ease-productive)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric"
                />
              </div>
              <h3 className="mb-2 text-heading-sm leading-tight tracking-tight text-white">
                {mod.label}
              </h3>
              <p className="text-body-sm leading-relaxed text-silver">
                {mod.blurb}
              </p>
            </Link>
          ))}

          {/* OS disc — absolutely positioned at the grid's centre */}
          <div
            ref={discRef}
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:transition-opacity"
            style={{
              top: DISC_TOP_PX,
              width: 184,
              height: 184,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 38% 32%, rgba(91,171,255,0.20) 0%, rgba(59,130,246,0.08) 42%, rgba(7,11,20,0.96) 70%)",
              border: "1px solid rgba(91,171,255,0.18)",
              boxShadow:
                "0 0 48px rgba(59,130,246,0.12), 0 0 96px rgba(59,130,246,0.05), inset 0 1px 0 rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: revealed ? 1 : 0,
              transitionDuration: "700ms",
              transitionDelay: "0.28s",
              transitionTimingFunction: "var(--ease-expressive-in)",
            }}
          >
            {/* Inner concentric ring */}
            <div
              style={{
                position: "absolute",
                inset: 18,
                borderRadius: "50%",
                border: "1px solid rgba(91,171,255,0.08)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                color: "var(--color-electric)",
                marginBottom: 5,
              }}
            >
              Wiele
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--color-chrome-mid)",
                fontWeight: 600,
              }}
            >
              OS
            </span>
          </div>
        </div>

        {/* ── Mobile: flat 2-col grid — no disc, no signal lines ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {MODULES.map((mod) => (
            <Link
              key={`m-${mod.id}`}
              href={mod.href}
              className="chrome-card group flex flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]"
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-mono text-body-xs tracking-[0.18em] text-smoke">
                  {mod.num}
                </span>
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="text-smoke transition-[transform,color] duration-[var(--motion-t2)] ease-[var(--ease-productive)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric"
                />
              </div>
              <h3 className="mb-1.5 text-heading-sm leading-tight tracking-tight text-white">
                {mod.label}
              </h3>
              <p className="text-body-sm leading-relaxed text-silver">
                {mod.blurb}
              </p>
            </Link>
          ))}
        </div>

        {/* ── Authority pipeline stat strip ── */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PIPELINE.map((item) => (
            <div
              key={item.label}
              className="flex flex-col rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-glass)] px-5 py-4"
            >
              <span className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-smoke">
                {item.label}
              </span>
              <span className="text-heading-sm leading-tight text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── CTA row ── */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/audit" className="btn-primary">
            Run a Signal Audit
            <ArrowUpRight size={16} aria-hidden />
          </Link>
          <Link href="/platform" className="btn-ghost">
            Explore Wiele OS
          </Link>
        </div>
      </div>
    </section>
  );
}
