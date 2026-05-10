import type { Metadata } from "next";
import { Check, Clock, FileText, Shield, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { AuditForm } from "@/components/forms/audit-form";
import { JsonLd } from "@/components/json-ld";
import { PromptSimulator } from "@/components/sections/prompt-simulator";
import { promptSimulatorFixtures } from "@/data/prompt-simulator-fixtures";
import { auditPreviewSteps } from "@/data/homepage";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  productSchema,
  serviceSchema,
} from "@/lib/schema";

// v3.8.0 — force-static + 1h ISR. Page is presentational; AuditForm is a
// "use client" component so Turnstile + form submission still work after
// hydration. Eliminates per-request SSR CPU on Cloudflare Workers Free
// tier (was hitting the 10ms CPU exceed under sequential load per
// 2026-05-10 XRAY).
export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "AI Visibility Audit — Find out if AI recommends you (and where you're exposed)",
  description:
    "£2,500. 14 days. Visibility score, mention strength, citation readiness, plus prompt-injection surface map, AI crawler posture audit, and competitor displacement risk model.",
  path: "/audit",
});

const measuredSignals = [
  {
    title: "Visibility Score",
    body: "Composite 0–100 score across the answer engines your buyers use, with 7-day trend and delta.",
  },
  {
    title: "Mention Strength",
    body: "Share-of-voice in AI answers vs your top 3 named competitors, weighted by prompt importance.",
  },
  {
    title: "Citation Readiness",
    body: "Percentage of high-intent prompts where you're cited, plus the specific source domains AI engines pull from.",
  },
  {
    title: "Authority Gaps",
    body: "Ranked list of structural authority gaps: schema, comparison hubs, founder narrative, knowledge-graph entities.",
  },
  {
    title: "Next Action",
    body: "Highest-leverage move for the next 30 days, with methodology, scoping note, and expected lift range.",
  },
];

const defenseBlocks = [
  {
    title: "Prompt-Injection Surface Audit",
    headline: "Map your prompt-injection attack surface.",
    body: "Adversaries can plant manipulation instructions inside your FAQ pages, knowledge bases, blog templates, schema markup, and any user-contributed content. When an AI crawler ingests it, your brand becomes an unwitting carrier for misleading content. We map every prompt-injection vector across your owned digital surface and grade each by risk severity.",
    deliverables: [
      "Owned-channel prompt-injection surface map",
      "Risk-ranked vulnerability list with severity score",
      "Per-vector remediation playbook",
    ],
  },
  {
    title: "AI Crawler Access Posture",
    headline: "Verify AI engines can find, read, and trust your site.",
    body: "Most websites silently block the AI crawlers that decide whether a brand gets cited. We audit allow/deny status across GPTBot, ClaudeBot, PerplexityBot, GoogleOther, Bytespider and others; verify your llms.txt presence and structural quality; and review the upstream trust signals AI engines use to weight your citations.",
    deliverables: [
      "Crawler-by-crawler access matrix (allow / deny / partial)",
      "llms.txt audit + recommended canonical structure",
      "Upstream trust signal review (schema, entity graph, third-party citations)",
    ],
  },
  {
    title: "Competitor Displacement Risk Model",
    headline: "See which competitors are taking the citation share that should be yours.",
    body: "Citation share in AI answers is zero-sum. We model who is currently displacing you across your top 50 buyer-intent queries in ChatGPT, Perplexity, Gemini and Claude — and why. We then forecast which competitors are likeliest to displace you next based on authority-graph trajectory.",
    deliverables: [
      "Per-query displacement leaderboard (top 50 queries × 4 engines)",
      "Authority-graph trajectory analysis on top displacers",
      "Counter-displacement priority list",
    ],
  },
];

const wontDoItems = [
  "Black-hat GEO (manipulating AI engines through illegitimate means)",
  "AIO injection (planting attacker payloads into competitors' surfaces)",
  "Citation farming (inflating mentions through low-quality networks)",
  "Prompt-injection-as-offense (weaponising defense techniques against others)",
  "Off-platform trust manipulation (gaming third-party signals)",
];

const detailSections = [
  {
    title: "How the engine runs",
    body:
      "Wiele OS V3 runs your brand across the prompt surface that matches your buyer profile. It logs mention strength, position, source citations, gap signals, prompt-injection vectors, AI crawler access posture, and displacement leaderboards across the major answer engines. Methodology is open for inspection.",
  },
  {
    title: "What you give us",
    body:
      "Brand name, website, market, top 3 competitors, and the buyer profile you sell to. We don't need access to analytics, CRM, or any private data. Public signal is what AI engines see — and it's what attackers see too.",
  },
  {
    title: "What we give back",
    body:
      "A 16–22 page engine report, a 30-day implementation roadmap, a per-vector remediation playbook, and one strategy session with a Wiele principal. The report is yours to keep regardless of next steps.",
  },
  {
    title: "Timeline",
    body:
      "14 calendar days from submission. Engine runs take 4–6 days; defense vector mapping takes 3–4 days; report drafting and review takes 4–6 days; the strategy session is scheduled inside the second week.",
  },
  {
    title: "What it costs",
    body:
      "£2,500 one-off. No retainer required. Engagement-pricing applies if you decide to continue with a Launch tier or above; the £2,500 is credited against month one.",
  },
  {
    title: "Who runs the engine",
    body:
      "Wiele OS V3 is operated by a Wiele strategist, reviewed by a Wiele principal. Output is reviewed before it ships — no auto-generated reports.",
  },
  {
    title: "What the report does NOT include",
    body:
      "Aspirational ranges. Vanity metrics. Generic recommendations. The report is specific to your engine output, your defense surface, and your gap profile.",
  },
];

export default function AuditPage() {
  const showcase = promptSimulatorFixtures[0];

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "AI Visibility Audit", url: `${siteConfig.url}/audit` },
  ]);
  const product = productSchema({
    name: "Wiele AI Visibility Audit",
    description:
      "Full Wiele OS engine run for your brand. Visibility, mention, citation, gaps, plus prompt-injection surface map, AI crawler posture audit, and competitor displacement risk model. 14-day delivery.",
    price: "2500.00",
    priceCurrency: "GBP",
    url: `${siteConfig.url}/audit`,
  });
  const service = serviceSchema({
    name: "Wiele AI Visibility Audit",
    description:
      "Brand visibility and AI-search exposure audit covering five visibility signals plus three defense vectors: prompt-injection surface map, AI crawler access posture, and competitor displacement risk model.",
    url: `${siteConfig.url}/audit`,
    serviceType: "AI Visibility Audit",
    offerCatalog: {
      name: "AI Visibility Audit components",
      items: [
        { name: "Visibility Score", description: "Composite 0–100 score across answer engines, 7-day trend." },
        { name: "Mention Strength", description: "Share-of-voice vs named competitors, prompt-weighted." },
        { name: "Citation Readiness", description: "High-intent prompt citation rate + source domain inventory." },
        { name: "Authority Gaps", description: "Ranked structural gaps across schema, hubs, narrative, entities." },
        { name: "Next Action", description: "Highest-leverage 30-day move with methodology and lift range." },
        { name: "Prompt-Injection Surface Audit", description: "Owned-channel attack-surface map + per-vector remediation." },
        { name: "AI Crawler Access Posture", description: "Crawler matrix + llms.txt audit + trust signal review." },
        { name: "Competitor Displacement Risk Model", description: "Per-query displacement leaderboard + counter-displacement plan." },
      ],
    },
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-audit" />
      <JsonLd schema={product} id="schema-product-audit" />
      <JsonLd schema={service} id="schema-service-audit" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center">
            <div>
              <FadeIn>
                <Badge variant="electric" size="sm" className="mb-5">
                  AI Visibility Audit · £2,500 · 14 days
                </Badge>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-display-xl text-white text-balance mb-5">
                  Find out if AI recommends you — and where you&apos;re exposed.
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-body-lg text-silver mb-8 max-w-lg">
                  Five visibility signals, three defense vectors, a 30-day
                  roadmap, and a strategy session with a Wiele principal.
                  Diagnose first, defend second, commit third.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="flex items-center gap-5 text-body-sm text-cloud">
                  <span className="flex items-center gap-2">
                    <Clock size={15} className="text-electric" aria-hidden />
                    14 days
                  </span>
                  <span className="flex items-center gap-2">
                    <FileText size={15} className="text-electric" aria-hidden />
                    Engine + defense report
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield size={15} className="text-electric" aria-hidden />
                    Defense baseline
                  </span>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <PromptSimulator data={showcase} animate={false} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we measure (5 signals) */}
      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What the audit measures · Visibility
            </p>
            <h2 className="text-display-md text-white text-balance">
              Five signals. One page. The picture AI engines have of you.
            </h2>
          </div>
          <Reveal stagger={0.05} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {measuredSignals.map((s) => (
              <div
                key={s.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <h3 className="text-heading-sm text-white mb-2.5">{s.title}</h3>
                <p className="text-body-sm text-silver">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Defense vectors (3 NEW blocks) */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What the audit defends · AI Visibility Defense
            </p>
            <h2 className="text-display-md text-white text-balance">
              Three vectors. Defended at every tier — diagnosed in the audit.
            </h2>
          </div>
          <Reveal stagger={0.05} className="grid gap-5 md:grid-cols-3">
            {defenseBlocks.map((b) => (
              <article
                key={b.title}
                className="rounded-[var(--radius-lg)] border border-electric/30 bg-[var(--color-surface-elevated)] p-6 md:p-7"
              >
                <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full border border-electric/30 bg-electric/5">
                  <Shield size={11} className="text-electric" aria-hidden />
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-electric">
                    {b.title}
                  </span>
                </div>
                <h3 className="text-heading-md text-white mb-3 leading-tight tracking-tight">
                  {b.headline}
                </h3>
                <p className="text-body-sm text-silver mb-5 leading-relaxed">
                  {b.body}
                </p>
                <p className="text-body-xs font-mono uppercase tracking-[0.14em] text-smoke mb-2">
                  Deliverables
                </p>
                <ul className="flex flex-col gap-1.5">
                  {b.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-body-sm text-cloud"
                    >
                      <Check
                        size={13}
                        className="mt-1 shrink-0 text-electric"
                        aria-hidden
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Asymmetric positioning — what we won't do */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-coral-core)]/40 bg-[var(--color-surface-elevated)] p-6 md:p-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <ShieldOff size={16} className="text-coral-core" aria-hidden style={{ color: "var(--color-coral-core)" }} />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em]" style={{ color: "var(--color-coral-core)" }}>
                Asymmetric defense · What we won&apos;t do
              </span>
            </div>
            <h2 className="text-heading-lg text-white mb-3">
              Defense, not offense. We protect — we never weaponise.
            </h2>
            <p className="text-body-md text-silver mb-5">
              The same techniques that defend a brand can be turned against
              competitors. We refuse the offense side of the line. Wiele will
              never:
            </p>
            <ul className="flex flex-col gap-2">
              {wontDoItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-body-sm text-cloud"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "var(--color-coral-core)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process detail (7 sections) */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              How it works, in detail
            </p>
            <h2 className="text-display-md text-white text-balance">
              Seven things to know before you submit.
            </h2>
          </div>
          <Reveal stagger={0.04} className="flex flex-col gap-6">
            {detailSections.map((s, i) => (
              <article key={s.title} className="border-l-2 border-[var(--color-border-default)] pl-5">
                <p className="text-body-xs font-mono text-electric mb-2">
                  0{i + 1}
                </p>
                <h3 className="text-heading-sm text-white mb-2">{s.title}</h3>
                <p className="text-body-md text-silver">{s.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Real audit form — Phase 5 */}
      <section id="audit-form" className="py-16 md:py-20 lg:py-24 scroll-mt-24">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-8">
            <Badge variant="electric" size="sm" className="mb-4">
              Submit your brand
            </Badge>
            <h2 className="text-heading-lg text-white mb-2">
              Run a Growth Audit
            </h2>
            <p className="text-body-sm text-silver mb-6">
              Eight fields, two steps, fourteen-day delivery. The engine runs
              once you submit; you receive a full report (visibility + defense)
              and a strategy session with a Wiele principal.
            </p>
            <AuditForm />
          </div>
        </div>
      </section>

      {/* What you'll receive */}
      <section className="py-16 md:py-20 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What you&apos;ll receive
            </p>
            <h2 className="text-display-md text-white text-balance">
              The 5-step delivery flow.
            </h2>
          </div>
          <Reveal stagger={0.06} className="flex flex-col gap-3 max-w-2xl">
            {auditPreviewSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric"
                >
                  <Check size={12} />
                </span>
                <span className="text-body-md text-cloud">
                  <span className="font-mono text-smoke mr-2">0{i + 1}</span>
                  {step}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Disclaimer footer (binding, required) */}
      <section className="py-8 md:py-10 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <p className="text-body-xs font-mono text-smoke text-center italic">
            This is a brand visibility and AI-search exposure audit, not an
            information-security or network penetration audit.
          </p>
        </div>
      </section>
    </>
  );
}
