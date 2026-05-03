"use client";

import { useReducedMotion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  type AnswerEntity,
  type PromptSimulatorFixture,
} from "@/data/prompt-simulator-fixtures";
import { cn } from "@/lib/utils";
import {
  CitationCard,
  GapDots,
  MentionBars,
  NextActionCard,
  ScoreDial,
  SignalCard,
} from "./parts";

/* ─────────────────────────────────────────────────────────────
   Animation timing — all values in milliseconds.
   12-second cycle: type → think → answer → reveal cards → hold → reset.
───────────────────────────────────────────────────────────────── */

const TIMING = {
  typing: 2400,
  thinkingEnd: 3200,
  intro: 4800,
  outro: 6800,
  cards: 7800,
  cycle: 12000,
} as const;

const CARD_STAGGER = 200;

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────── */

export type PromptSimulatorProps = {
  data: PromptSimulatorFixture;
  /** Run the 12s loop. False = render the final state instantly (used by /audit and /proof). */
  animate?: boolean;
  className?: string;
};

export function PromptSimulator({
  data,
  animate = true,
  className,
}: PromptSimulatorProps) {
  const reducedMotion = useReducedMotion();
  const isStatic = !animate || !!reducedMotion;
  const [elapsed, setElapsed] = useState<number>(isStatic ? TIMING.cycle : 0);

  // Reset elapsed when isStatic flips (e.g., user toggles prefers-reduced-motion).
  // Using "store previous value" pattern instead of useEffect setState cascade.
  const [prevStatic, setPrevStatic] = useState(isStatic);
  if (isStatic !== prevStatic) {
    setPrevStatic(isStatic);
    setElapsed(isStatic ? TIMING.cycle : 0);
  }

  useEffect(() => {
    if (isStatic) return;

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const e = (now - start) % TIMING.cycle;
      setElapsed(e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isStatic]);

  // Derived progress states.
  const typedChars = isStatic
    ? data.prompt.length
    : Math.min(
        data.prompt.length,
        Math.floor((elapsed / TIMING.typing) * data.prompt.length),
      );
  const typedText = data.prompt.slice(0, typedChars);
  const cursorVisible = !isStatic && elapsed < TIMING.typing;
  const showThinking =
    !isStatic && elapsed >= TIMING.typing && elapsed < TIMING.thinkingEnd;
  const showIntro = isStatic || elapsed >= TIMING.thinkingEnd;
  const showOutro = isStatic || elapsed >= TIMING.intro;
  const cardsShown = isStatic
    ? 5
    : elapsed < TIMING.outro
      ? 0
      : Math.min(
          5,
          Math.floor((elapsed - TIMING.outro) / CARD_STAGGER) + 1,
        );

  return (
    <div
      className={cn(
        "relative w-full",
        "rounded-[var(--radius-xl)] border border-[var(--color-border-default)]",
        "bg-[var(--color-obsidian)] overflow-hidden",
        // Phase 9 visual upgrade: cinematic composite shadow
        // (inset highlight + electric ring + drop + soft glow). Replaces
        // the prior `shadow-lg` + conditional `shadow-glow-electric`
        // combo — `.glow-edge` is richer and always on. See globals.css.
        "glow-edge",
        className,
      )}
    >
      {/* Faint top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"
      />

      <div className="grid md:grid-cols-[3fr_2fr] divide-y md:divide-y-0 md:divide-x divide-[var(--color-border-default)]">
        {/* LEFT — prompt cell + answer panel */}
        <div className="flex flex-col">
          <PromptCell typedText={typedText} cursorVisible={cursorVisible} />
          <AnswerPanel
            data={data}
            showThinking={showThinking}
            showIntro={showIntro}
            showOutro={showOutro}
          />
        </div>

        {/* RIGHT — 5 signal cards */}
        <div className="p-4 md:p-5 flex flex-col gap-2.5 bg-[rgba(255,255,255,0.015)]">
          <SignalCard index={0} visible={cardsShown >= 1} label="Visibility Score">
            <ScoreDial
              score={data.visibility.score}
              trend={data.visibility.trend}
              delta={data.visibility.delta}
            />
          </SignalCard>

          <SignalCard index={1} visible={cardsShown >= 2} label="Mention Strength">
            <MentionBars rows={data.mentions} />
          </SignalCard>

          <SignalCard index={2} visible={cardsShown >= 3} label="Citation Readiness">
            <CitationCard
              percentage={data.citations.percentage}
              sources={data.citations.sources}
            />
          </SignalCard>

          <SignalCard index={3} visible={cardsShown >= 4} label="Authority Gaps">
            <GapDots gaps={data.gaps} />
          </SignalCard>

          <SignalCard
            index={4}
            visible={cardsShown >= 5}
            label="Next Action"
            className="bg-[rgba(99,102,241,0.05)] border-[rgba(99,102,241,0.25)]"
          >
            <NextActionCard
              headline={data.nextAction.headline}
              methodology={data.nextAction.methodology}
            />
          </SignalCard>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Prompt cell — search-input row with typewriter
───────────────────────────────────────────────────────────────── */

function PromptCell({
  typedText,
  cursorVisible,
}: {
  typedText: string;
  cursorVisible: boolean;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-border-default)] px-5 py-4 bg-[rgba(255,255,255,0.02)]">
      <Search size={16} className="text-smoke shrink-0" aria-hidden />
      <p
        className="font-mono text-body-sm text-cloud min-h-[1.25rem] truncate"
        aria-label="Prompt"
      >
        {typedText}
        <span
          aria-hidden
          className={cn(
            "inline-block ml-0.5 w-[1px] h-[0.95em] -mb-[2px] bg-electric",
            cursorVisible ? "animate-pulse" : "opacity-0",
          )}
        />
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Answer panel — line-by-line reveal with aria-live
───────────────────────────────────────────────────────────────── */

function AnswerPanel({
  data,
  showThinking,
  showIntro,
  showOutro,
}: {
  data: PromptSimulatorFixture;
  showThinking: boolean;
  showIntro: boolean;
  showOutro: boolean;
}) {
  return (
    <div
      className="flex-1 px-5 py-5 min-h-[14rem] flex flex-col"
      aria-live="polite"
    >
      {/* Engine label */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={12} className="text-electric" aria-hidden />
        <span className="text-[0.625rem] uppercase tracking-[0.14em] text-smoke font-mono">
          Wiele Engine
        </span>
      </div>

      {/* Thinking spinner */}
      <div
        aria-hidden
        className={cn(
          "flex items-center gap-1.5 mb-3 transition-opacity duration-[200ms]",
          showThinking ? "opacity-100" : "opacity-0 absolute pointer-events-none",
        )}
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-electric animate-bounce [animation-delay:-0.3s]" />
        <span className="block h-1.5 w-1.5 rounded-full bg-electric animate-bounce [animation-delay:-0.15s]" />
        <span className="block h-1.5 w-1.5 rounded-full bg-electric animate-bounce" />
      </div>

      {/* Intro + entities */}
      <p
        className={cn(
          "text-body-md text-cloud leading-relaxed mb-3",
          "transition-[opacity,transform] duration-[420ms] ease-[var(--ease-emphasized)]",
          showIntro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        )}
      >
        {data.answer.intro}{" "}
        <span className="inline-flex flex-wrap items-baseline gap-x-1">
          {data.answer.entities.map((entity, i) => (
            <EntityChip
              key={entity.name}
              entity={entity}
              isLast={i === data.answer.entities.length - 1}
            />
          ))}
        </span>
        .
      </p>

      {/* Outro */}
      {data.answer.outro ? (
        <p
          className={cn(
            "text-body-sm text-silver leading-relaxed",
            "transition-[opacity,transform] duration-[420ms] ease-[var(--ease-emphasized)]",
            showOutro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
          )}
        >
          {data.answer.outro}
        </p>
      ) : null}
    </div>
  );
}

function EntityChip({
  entity,
  isLast,
}: {
  entity: AnswerEntity;
  isLast: boolean;
}) {
  return (
    <>
      <span
        className={cn(
          entity.isWiele
            ? "font-semibold text-electric-light bg-[rgba(99,102,241,0.10)] px-1.5 py-0.5 rounded-[var(--radius-sm)] border border-[rgba(99,102,241,0.25)]"
            : "text-cloud",
        )}
      >
        {entity.name}
      </span>
      {!isLast ? <span className="text-smoke">,</span> : null}
    </>
  );
}
