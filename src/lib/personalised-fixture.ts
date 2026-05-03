import type { AuditInput } from "./validations";
import type { PromptSimulatorFixture } from "@/data/prompt-simulator-fixtures";

/**
 * Build a PromptSimulator fixture personalised to a specific audit
 * submission. Used by the post-submit thank-you state (Phase 5) — the
 * 6th surface for the simulator (build-once-use-six).
 *
 * The user's brand is highlighted via `isWiele: true` (the flag is the
 * "audited brand" indicator semantically, not literally Wiele). Their
 * top competitors are pulled from the comma-separated input.
 *
 * Numbers shown are illustrative — labelled as "engine output preview"
 * in the UI so visitors don't read them as real measurements.
 */
export function buildPersonalisedFixture(input: AuditInput): PromptSimulatorFixture {
  const competitors = parseCompetitors(input.competitors);
  const brand = input.company.trim();

  return {
    id: `personalised-${slug(brand)}`,
    prompt: `Best ${input.industry.toLowerCase()} firms for AI visibility`,
    answer: {
      intro: `For ${input.industry.toLowerCase()} brands competing on AI-cited recommendations, the most surfaced names include`,
      entities: [
        { name: brand, isWiele: true },
        ...competitors.slice(0, 2).map((name) => ({ name })),
      ],
      outro:
        "This is a sample of the engine output you'll receive in your full Signal Audit report — built from your actual prompt surface, not this preview.",
    },
    visibility: {
      score: 47,
      trend: [38, 40, 42, 43, 44, 46, 47],
      delta: 9,
    },
    mentions: [
      ...(competitors[0] ? [{ brand: competitors[0], share: 34 }] : []),
      { brand, share: 28, isWiele: true },
      ...(competitors[1] ? [{ brand: competitors[1], share: 22 }] : []),
      ...(competitors[2] ? [{ brand: competitors[2], share: 16 }] : []),
    ].slice(0, 4),
    citations: {
      percentage: 52,
      sources: [
        { domain: `${slug(input.industry)}-press.example`, count: 9 },
        { domain: "industry-analyst.example", count: 7 },
        { domain: "trade-publication.example", count: 5 },
      ],
    },
    gaps: [
      { label: `Comparison content vs ${competitors[0] ?? "your top competitor"}`, status: "yellow" },
      { label: "Founder narrative depth", status: "red" },
      { label: "Schema + entity engineering", status: "yellow" },
    ],
    nextAction: {
      headline: `Capture the "${input.industry.toLowerCase()}" prompt surface`,
      methodology:
        "Your full Signal Audit report identifies the highest-leverage 30-day move based on your real engine output and gap profile. This is a preview — your actual recommendation will be specific to your market, not this sample.",
    },
  };
}

function parseCompetitors(input: string): string[] {
  return input
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}
