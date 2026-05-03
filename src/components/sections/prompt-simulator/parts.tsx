"use client";

import { ArrowUpRight, Quote } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import {
  type CitationSource,
  type GapItem,
  type MentionRow,
  type Sparkline,
} from "@/data/prompt-simulator-fixtures";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Shared signal-card frame
───────────────────────────────────────────────────────────────── */

export function SignalCard({
  index,
  visible,
  label,
  children,
  className,
}: {
  index: number;
  visible: boolean;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-index={index}
      data-visible={visible}
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3.5",
        "transition-[opacity,transform,border-color] duration-[420ms] ease-[var(--ease-emphasized)]",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none",
        className,
      )}
    >
      <p className="text-[0.625rem] uppercase tracking-[0.14em] text-smoke font-mono mb-1.5">
        {label}
      </p>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Visibility score + sparkline
───────────────────────────────────────────────────────────────── */

function scoreColor(score: number): string {
  if (score >= 60) return "var(--color-success)";
  if (score >= 30) return "var(--color-warning)";
  return "var(--color-danger)";
}

export function ScoreDial({
  score,
  trend,
  delta,
}: {
  score: number;
  trend: Sparkline;
  delta: number;
}) {
  const color = scoreColor(score);
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const range = Math.max(max - min, 1);
  const points = trend
    .map((v, i) => {
      const x = (i / (trend.length - 1)) * 100;
      const y = 24 - ((v - min) / range) * 22;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-mono text-[2rem] leading-none font-semibold"
            style={{ color }}
          >
            {score}
          </span>
          <span className="font-mono text-body-xs text-smoke">/100</span>
        </div>
        <p
          className={cn(
            "mt-1 text-body-xs font-mono",
            delta >= 0 ? "text-success" : "text-danger",
          )}
        >
          {delta >= 0 ? "+" : ""}
          {delta}% · 7d
        </p>
      </div>
      <svg
        viewBox="0 0 100 26"
        preserveAspectRatio="none"
        className="h-10 w-24 shrink-0"
        aria-hidden
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          points={points}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mention strength bars (share of voice)
───────────────────────────────────────────────────────────────── */

export function MentionBars({ rows }: { rows: MentionRow[] }) {
  const max = Math.max(...rows.map((r) => r.share));
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((row) => {
        const width = `${(row.share / max) * 100}%`;
        return (
          <div key={row.brand} className="flex items-center gap-2">
            <span
              className={cn(
                "w-[7.5rem] truncate text-body-xs font-mono tracking-tight",
                row.isWiele ? "text-electric-light font-semibold" : "text-cloud",
              )}
            >
              {row.brand}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-[var(--color-surface-glass)] overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-[600ms] ease-[var(--ease-emphasized)]",
                  row.isWiele ? "bg-electric" : "bg-steel",
                )}
                style={{ width }}
              />
            </div>
            <span className="w-8 text-right text-body-xs font-mono text-silver">
              {row.share}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Citation readiness — % + collapsed source list
───────────────────────────────────────────────────────────────── */

export function CitationCard({
  percentage,
  sources,
}: {
  percentage: number;
  sources: CitationSource[];
}) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="font-mono text-[1.5rem] leading-none font-semibold text-white">
          {percentage}
        </span>
        <span className="font-mono text-body-xs text-smoke">% ready</span>
      </div>
      <ul className="flex flex-col gap-1">
        {sources.slice(0, 3).map((src) => (
          <li
            key={src.domain}
            className="flex items-center justify-between gap-2 text-body-xs"
          >
            <span className="font-mono text-cloud truncate">
              <Quote
                size={10}
                className="inline mr-1.5 -translate-y-px text-smoke"
                aria-hidden
              />
              {src.domain}
            </span>
            <span className="font-mono text-smoke">{src.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Authority gaps — count + RYG dots
───────────────────────────────────────────────────────────────── */

const dotColor: Record<GapItem["status"], string> = {
  green: "var(--color-success)",
  yellow: "var(--color-warning)",
  red: "var(--color-danger)",
};

export function GapDots({ gaps }: { gaps: GapItem[] }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="font-mono text-[1.5rem] leading-none font-semibold text-white">
          {gaps.length}
        </span>
        <span className="font-mono text-body-xs text-smoke">flagged</span>
      </div>
      <div className="flex flex-col gap-1">
        {gaps.map((gap, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: dotColor[gap.status] }}
            />
            <span className="text-body-xs text-cloud truncate">{gap.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Next-action recommendation with methodology tooltip
───────────────────────────────────────────────────────────────── */

export function NextActionCard({
  headline,
  methodology,
}: {
  headline: string;
  methodology: string;
}) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  return (
    <div className="relative">
      <button
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-[var(--radius-sm)]"
      >
        <span className="text-body-sm text-white font-medium leading-snug">
          {headline}
        </span>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-electric transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </button>
      {open ? (
        <div
          role="tooltip"
          id={tooltipId}
          className="absolute right-0 bottom-[calc(100%+0.5rem)] z-10 w-72 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-graphite)] p-3 text-body-xs text-cloud shadow-[var(--shadow-lg)]"
        >
          {methodology}
        </div>
      ) : null}
    </div>
  );
}
