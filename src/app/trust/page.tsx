import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Trust — How Wiele uses AI, handles data, and verifies claims",
  description:
    "AI use disclosed. Human review on every output. Source-level citation. Data handled with care. Claim verification on the record. Responsible automation.",
  path: "/trust",
});

const LAST_REVIEWED = "2026-05-08";

const trustSections = [
  {
    id: "ai-disclosure",
    title: "AI use, disclosed.",
    body:
      "Every Wiele workflow that uses AI is named in the deliverable that ships. We don't hide or downplay AI's role in research, drafting, or analysis — and we don't let AI substitute for the strategic judgement clients pay for. If AI helped produce a slide, a report, or a citation, the methodology section says so.",
  },
  {
    id: "human-review",
    title: "Human review on every output.",
    body:
      "No client deliverable ships without sign-off from a named Wiele principal. AI-drafted text is treated as a draft, not a deliverable. Engine output is reviewed against the source-level citation log before it leaves our hands. The principal listed on the SOW is the same principal whose name attaches to the work.",
  },
  {
    id: "data-handling",
    title: "Data handled with care.",
    body:
      "Lead-capture submissions live in Cloudflare KV in the EU edge. Transactional email is sent via Resend. Marketing analytics is Plausible — cookieless, no cross-site tracking, no fingerprinting. We do not sell, rent, share, or syndicate client data, ever. Client materials covered under NDA are segregated and never used in cross-client model training, ever.",
  },
  {
    id: "security",
    title: "Security commitments.",
    body:
      "Wiele runs on managed infrastructure with TLS in transit, encryption at rest, and access controls scoped to least privilege. Public-facing surfaces are gated by Cloudflare's security stack (WAF, bot protection, DDoS mitigation). We do not currently advertise SOC 2 or ISO 27001 certification — when we hold the audited posture, the badge will appear here with a verifiable link to the report.",
  },
  {
    id: "citation-methodology",
    title: "Source-level citation methodology.",
    body:
      "Every claim, ranking, or competitive assertion in a Wiele deliverable traces back to a public, verifiable source. The Wiele OS engine logs source URLs, retrieval timestamps, and confidence scores per assertion. Methodology is open for inspection on every engagement; a citation log accompanies every report.",
  },
  {
    id: "claim-verification",
    title: "Claim verification on the record.",
    body:
      "Outcome ranges, case-study metrics, and engine deltas in our materials are tied to engine runs we can show. We don't display aspirational ranges, unverifiable client metrics, or before/after numbers without the source data behind them. If a number appears on this site or in a deliverable, the underlying log is available on request to the client it applies to.",
  },
  {
    id: "content-quality",
    title: "Content quality standards.",
    body:
      "All client-facing content is editorially reviewed by a Wiele principal before it ships. Originality is non-negotiable — published work is not paraphrased from competitor pages, AI-rewritten from a single source, or syndicated from public-domain templates. Voice, accuracy, and authority belong to the client and the named author.",
  },
  {
    id: "client-confidentiality",
    title: "Client confidentiality.",
    body:
      "Mutual NDA is the default at the start of every engagement. Client materials, internal data rooms, and conversation context are walled off per client. Where a client agrees to be named in a case study, they review and approve the public framing in writing before publication. Where they don't, the engagement is anonymised and the methodology — not the brand — does the talking.",
  },
  {
    id: "responsible-automation",
    title: "Responsible automation.",
    body:
      "Automation is used to lift the volume of work a strategist can ship — never to replace the strategist. Where automation is in the loop, a named human is accountable for the output. Wiele will not deploy autonomous client-facing agents that act without human review, and will not stand up automation pipelines that bypass the editorial layer described above.",
  },
];

// FAQ schema — the nine commitments are answer-engine-citable. Render
// FAQPage so each commitment becomes a Question/Answer pair AI engines
// can extract directly.
const trustFaqs = trustSections.map((s) => ({
  question: s.title.replace(/\.$/, "?").replace(/^([A-Z])/, (m) => m),
  answer: s.body,
}));

export default function TrustPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Trust", url: `${siteConfig.url}/trust` },
  ]);
  const webPage = webPageSchema({
    name: "Trust — How Wiele uses AI, handles data, and verifies claims",
    url: `${siteConfig.url}/trust`,
    description:
      "Nine commitments that define how Wiele uses AI, handles client data, and verifies the claims in our work.",
    datePublished: "2026-05-03",
    dateModified: LAST_REVIEWED,
  });
  const faq = faqSchema(trustFaqs);

  return (
    <>
      <JsonLd schema={webPage} id="schema-webpage-trust" />
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-trust" />
      <JsonLd schema={faq} id="schema-faq-trust" />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                Trust
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                AI-native, not AI-opaque.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver max-w-2xl">
                Nine commitments that define how Wiele uses AI, handles client
                data, and verifies the claims in our work. The trust layer is
                part of the platform, not a footnote.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-5 text-body-xs font-mono uppercase tracking-[0.16em] text-smoke">
                Last reviewed · {LAST_REVIEWED}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <Reveal stagger={0.04} className="flex flex-col gap-8">
            {trustSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="flex items-start gap-3 mb-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-electric"
                    aria-hidden
                  />
                  <h2 className="text-heading-lg text-white text-balance">
                    {section.title}
                  </h2>
                </div>
                <p className="text-body-md text-silver pl-8">
                  {section.body}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Methodology disclosure: AI Visibility Monitoring (v3.3) ──
            Source-of-truth: SOP §12 at _OPERATIONS/ai-visibility-monitoring-sop/
            12-methodology-disclosure.md (v1.0, 2026-05-08). Verbatim under
            the "Public-facing copy" heading. Cross-referenced from
            /services/ai-visibility-monitoring and every monthly report PDF. */}
      <section
        id="ai-visibility-monitoring"
        className="scroll-mt-24 py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]"
      >
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <Reveal stagger={0.04} className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-electric"
                aria-hidden
              />
              <div className="flex flex-col gap-2">
                <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric">
                  Methodology · AI Visibility Monitoring
                </p>
                <h2 className="text-heading-lg text-white text-balance">
                  How Wiele measures AI visibility.
                </h2>
              </div>
            </div>

            <div className="pl-8 flex flex-col gap-6 text-body-md text-silver">
              <p>
                Wiele&apos;s AI Visibility Monitoring retainer reports four core
                metrics: citation share, prompt coverage, source weight
                distribution, and named competitor citation share (Standard and
                Pro tiers). These metrics are measured directly from engine
                output. They are not modelled, projected, or interpolated.
                Every number in every monthly report is replayable from the
                citation log Wiele maintains for the client.
              </p>

              <div>
                <h3 className="text-heading-sm text-white mb-2">The four engines</h3>
                <p>
                  Every monthly run executes against ChatGPT, Gemini,
                  Perplexity, and Claude — accessed via their public web
                  applications, in fresh sessions, with no logged-in
                  personalisation. The web app is what buyers see; the API can
                  return different output. The web app run is what the retainer
                  measures.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">The prompt panel</h3>
                <p>
                  Each client has a versioned prompt panel — 25 prompts (Lite),
                  60 prompts (Standard), or 100 prompts (Pro). Prompts span
                  branded queries, commercial-investigation queries, comparison
                  queries, service-specific queries, local queries where
                  applicable, and methodology queries. The panel is signed off
                  by the client at kickoff and re-reviewed at each Quarterly
                  Business Review. Mid-quarter changes are forbidden because
                  they break month-over-month comparability.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">
                  Citation share, defined
                </h3>
                <p>
                  Citation share is the percentage of panel prompts in which
                  the client brand appears in the engine response, measured
                  per engine, per month. It is reported per engine and as a
                  four-engine average. It is not reported as a single combined
                  &ldquo;AI ranking&rdquo; — there is no such number. The four
                  engines have four citation functions, and collapsing them
                  loses signal that drives action.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">
                  Source weight, defined
                </h3>
                <p>
                  Not every citation carries equal weight. Wiele scores
                  citations into four tiers — tier-1 (named press,
                  peer-reviewed venues, recognised analyst firms, regulatory
                  and government sources), tier-2 (credible secondary
                  publications, named-author blogs, established forums),
                  tier-3 (general web, anonymous content, content farms), and
                  owned (the client&apos;s first-party content or the
                  founder&apos;s owned surfaces). The taxonomy is maintained by
                  founder and reviewed quarterly. Updates are logged with date
                  and reason.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">
                  Measured lift vs modelled attribution
                </h3>
                <p>
                  Citation share, prompt coverage, source weight distribution,
                  branded search volume (pulled from Google Search Console),
                  and featured snippet captures are{" "}
                  <strong className="text-white">measured lift</strong> —
                  directly observable in engine output or in Search Console.
                  Influenced pipeline (in Standard and Pro reporting where the
                  client provides CRM access) is{" "}
                  <strong className="text-white">modelled attribution</strong>{" "}
                  — opportunities the client&apos;s CRM tags as having an
                  AI-surface or organic-search touchpoint in the buying
                  journey. The distinction is named explicitly in every report.
                  The two answer different questions.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">
                  What Wiele does not promise
                </h3>
                <p>
                  Wiele does not guarantee specific citation share outcomes.
                  Engine algorithms drift. Competitors ship work. New entrants
                  enter the panel. The retainer commits to producing the
                  cycle — engine runs, citation logs, action queues, monthly
                  reports, and quarterly reviews — at the documented standard.
                  Outcomes are measured against the prior baseline, reported
                  honestly, and acted on through the next month&apos;s queue.
                </p>
                <p className="mt-3">
                  Wiele does not predict future citation share. The retainer
                  reports observed lift. Forecasting is a Sovereign concierge
                  service.
                </p>
                <p className="mt-3">
                  Wiele does not aggregate the four engines into a single
                  &ldquo;score.&rdquo; Single-number rankings destroy the
                  per-engine signal that drives action.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">Audit posture</h3>
                <p>
                  Every client has access to read the citation log that
                  underpins their reports — on request. If a number in any
                  report cannot be replayed from the log, the report is wrong
                  and Wiele rebuilds it. This standard is not a value-add; it
                  is the floor.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">
                  Engine algorithm field notes
                </h3>
                <p>
                  Wiele tracks observed shifts in citation behaviour across the
                  four engines and publishes notable portfolio-wide shifts in
                  client reports as engine algorithm field notes. Where Wiele
                  believes a shift is engine-wide rather than client-specific,
                  this distinction is named explicitly. Field notes inform
                  panel construction at the next quarterly review.
                </p>
              </div>

              <div>
                <h3 className="text-heading-sm text-white mb-2">Tier scope</h3>
                <p>
                  The Lite, Standard, and Pro tiers differ in panel size, run
                  cadence (Lite/Standard monthly; Pro bi-weekly), competitor
                  tracking depth (Standard 3, Pro 5), featured snippet tracking
                  (Pro only), modelled influenced pipeline (Standard light,
                  Pro full), and action queue depth (3, 5, or 10 actions per
                  month). Methodology rigour is identical across tiers. A Lite
                  client receives the same standard of work; they receive less
                  of it.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/services/ai-visibility-monitoring"
                  className="inline-flex items-center gap-1.5 text-body-sm font-mono uppercase tracking-[0.12em] text-electric hover:text-white transition-colors"
                >
                  See the AI Visibility Monitoring retainer →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)] text-center">
          <p className="text-body-md text-silver mb-5">
            Have a specific question about how we handle data, AI use, or
            client confidentiality?
          </p>
          <Link
            href="/contact"
            className={buttonStyles({ variant: "ghost", size: "md" })}
          >
            Talk to Wiele
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
