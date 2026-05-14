import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  personSchema,
} from "@/lib/schema";

/**
 * Citation Brief #001 — published 2026-05-14.
 *
 * Productized AEO methodology asset. Targets the decision query:
 *   "how do agencies / premium brands get cited by ChatGPT, Perplexity,
 *   Google AI Overviews, Gemini, Copilot, and Claude?"
 *
 * Owned frameworks introduced here:
 *   1. The Five-Stage Citation Hierarchy
 *   2. Map. Build. Compound. process (canonical Wiele methodology)
 *   3. Wiele Citation Score™ (referenced — full SKU details on /pricing)
 *
 * Schema: Article + Person (author) + Breadcrumb + FAQPage.
 */

const TITLE =
  "How premium agencies get cited by ChatGPT, Perplexity, and Google AI Overviews";
const SUMMARY =
  "The Five-Stage Citation Hierarchy AI answer engines use, the signals that move the needle, and how to engineer for inclusion. Citation, not clicks.";
const PUBLISHED = "2026-05-14";
const SLUG = "how-agencies-get-cited-in-ai-answers";
const URL_CANONICAL = `${siteConfig.url}/citation-brief/${SLUG}`;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: SUMMARY,
  path: `/citation-brief/${SLUG}`,
});

export const dynamic = "force-static";
export const revalidate = false;

const faq = [
  {
    question: "What is a Citation Brief?",
    answer:
      "A Wiele Citation Brief is a single-topic field guide engineered to be cited by AI answer engines. Each brief is extractable, schema-marked, and ties one decision-stage query to one methodology Wiele owns. Briefs are the top-of-funnel asset in the Wiele Citation Score™ subscription.",
  },
  {
    question: "Which AI engines use this methodology?",
    answer:
      "The Five-Stage Citation Hierarchy applies across ChatGPT, Perplexity, Google AI Overviews, Gemini, Microsoft Copilot, Claude, and the emerging answer surfaces. Specific weights vary by engine; the five stages are universal.",
  },
  {
    question: "Is this the same as classical SEO?",
    answer:
      "No. Classical SEO targets blue-link rankings. Answer Engine Optimization (AEO) targets recommendation inclusion inside the answer itself. Wiele engineers both, run as one integrated system — classical SEO compounds AEO and vice versa.",
  },
  {
    question: "How long until a brand starts being cited?",
    answer:
      "Entity-resolution wins land first, typically 30–60 days after Map. Citation-history compounds visibly from month three. The Wiele Citation Score™ tracks lift month over month against a named competitor set.",
  },
  {
    question: "Can Wiele guarantee citation inclusion?",
    answer:
      "No agency can. Citation is probabilistic — engines weigh hundreds of signals. Wiele engineers all five stages so probability tilts decisively toward inclusion, and publishes engine-run methodology so claims are verifiable. See /trust for the standard.",
  },
  {
    question: "What does engagement with Wiele typically look like?",
    answer:
      "Most engagements start with a Signal Audit — a diagnostic that maps the citation graph, entity baseline, authority gaps, and a 30-day roadmap. From there, retainers run on the Map. Build. Compound. rhythm.",
  },
  {
    question: "Is this brief the full methodology?",
    answer:
      "This brief is the framework + applied tactics. Full implementation runs through a Wiele engagement — the Citation Score™ subscription instruments the lift; the Authority Engine retainer executes month-over-month.",
  },
  {
    question: "Who wrote this brief?",
    answer:
      "Jonathan Landman, founder of Wiele Group. Every Wiele brief carries a named author and a review trace at /trust. Founder voice is one of the five citation signals Wiele engineers for.",
  },
];

const hierarchy = [
  {
    stage: "01",
    name: "Entity Resolution",
    summary:
      "Does the engine know what — and who — you are?",
    body:
      "AI engines resolve queries to entities, not strings. If your brand is ambiguous (shared name, weak knowledge graph footprint, no Organization or Person schema, missing sameAs links), the engine cannot deterministically cite you. Entity resolution is the floor; everything above it depends on this stage being clean.",
  },
  {
    stage: "02",
    name: "Source Authority",
    summary:
      "Does the engine trust your domain as a primary source?",
    body:
      "Authority is a weighted blend of domain trust signals, external mentions (especially Tier-1 publications and authoritative databases), structured citations to your work, and the founder's named-author presence. Authority is slow to build, slow to lose — which is precisely why early movers compound a moat.",
  },
  {
    stage: "03",
    name: "Structured Extractability",
    summary:
      "Can the engine pull a clean answer block from your page?",
    body:
      "Engines reward pages that hand them an extractable answer: a short, definitive opening paragraph; clear H2/H3 hierarchy; FAQPage and HowTo schema where applicable; tables and lists that map directly to query intent. Pages that hide the answer three scrolls deep get skipped.",
  },
  {
    stage: "04",
    name: "Freshness",
    summary:
      "Is the content recent enough to survive the engine's recency filter?",
    body:
      "Most answer engines apply a recency weight, especially on commercial and time-sensitive queries. Pages that ship a clear lastModified, get re-indexed via IndexNow, and demonstrate ongoing update cadence pass the filter. Stale evergreen content quietly drops from the recommendation set even when it ranks classically.",
  },
  {
    stage: "05",
    name: "Recommendation History",
    summary:
      "Has the engine cited you before — and how does that loop compound?",
    body:
      "Engines that have cited a source before are statistically more likely to cite it again. This is the compounding loop and the reason early citation matters disproportionately. Every accepted citation strengthens the next one. Late entrants compete against incumbents who have been compounding for cycles.",
  },
] as const;

export default function CitationBrief001Page() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Citation Briefs", url: `${siteConfig.url}/citation-brief` },
    { name: TITLE, url: URL_CANONICAL },
  ]);
  const article = articleSchema({
    headline: TITLE,
    description: SUMMARY,
    url: URL_CANONICAL,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    authorName: siteConfig.founder,
    articleSection: "AEO methodology",
  });
  const author = personSchema({
    name: siteConfig.founder,
    jobTitle: "Founder & Principal",
    url: `${siteConfig.url}/about#founder`,
    sameAs: [siteConfig.socials.founderLinkedin],
  });
  const faqJsonLd = faqSchema(faq);

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-cb-001" />
      <JsonLd schema={article} id="schema-article-cb-001" />
      <JsonLd schema={author} id="schema-author-cb-001" />
      <JsonLd schema={faqJsonLd} id="schema-faq-cb-001" />

      <article className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Link
            href="/citation-brief"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-silver hover:text-electric transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden />
            Citation Briefs
          </Link>

          <div className="max-w-3xl">
            <header className="mb-10">
              <FadeIn>
                <Badge variant="electric" size="sm" className="mb-5">
                  Citation Brief #001 · AEO methodology
                </Badge>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-display-xl text-white text-balance mb-5">
                  {TITLE}
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-body-lg text-silver">{SUMMARY}</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-body-xs font-mono uppercase tracking-[0.14em] text-smoke mt-6">
                  By {siteConfig.founder} · Published{" "}
                  <time dateTime={PUBLISHED}>14 May 2026</time> · 12 min read
                </p>
              </FadeIn>
            </header>

            {/* The 60-second answer — extractable opening block */}
            <section className="mb-12 rounded-[var(--radius-lg)] border border-electric/30 bg-electric/5 p-6 md:p-8">
              <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                The 60-second answer
              </p>
              <p className="text-body-lg text-cloud mb-4">
                AI answer engines decide what to cite using five stacked
                signals: <strong className="text-white">entity resolution,
                source authority, structured extractability, freshness,</strong>
                {" "}and <strong className="text-white">recommendation
                history</strong>. Brands that engineer all five compound a
                citation moat — every accepted citation makes the next one
                more probable. Classical SEO targets rankings; AEO targets
                inclusion inside the answer itself.
              </p>
              <p className="text-body-md text-silver">
                The work is structural, not promotional. Run the diagnostic,
                fix the substrate, ship the citation assets, and the engines
                start recommending you within 30–60 days for entity wins and
                three months for compounding citation history.
              </p>
            </section>

            {/* Why classical SEO doesn't get you cited */}
            <section className="mb-14">
              <h2 className="text-display-md text-white text-balance mb-5">
                Why classical SEO doesn&apos;t get you cited.
              </h2>
              <p className="text-body-md text-silver mb-4">
                Classical SEO was engineered for a discovery model that no
                longer dominates buyer journeys. The model was: rank in
                position 1–3, capture the click, convert on-site. The new
                model is: the engine answers the question, names a brand,
                and the buyer arrives pre-qualified — or doesn&apos;t arrive
                at all.
              </p>
              <p className="text-body-md text-silver mb-4">
                Ranking and citation use different functions. A page can
                rank #1 organically and not be cited inside the AI Overview
                that appears above it. A different page — sometimes from a
                lower-traffic domain — wins the citation because it nailed
                entity clarity, schema extractability, and named-author
                authority. The blue link is no longer the unit of victory.
                The cited slot is.
              </p>
              <p className="text-body-md text-silver">
                This is why classical SEO agencies underperform on AEO:
                their toolchain measures the wrong outcome. Wiele
                instruments the citation directly — every brief, every
                engine run, every monthly delta is tracked against a named
                competitor set inside the{" "}
                <Link
                  href="/pricing"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  Wiele Citation Score™
                </Link>
                {" "}subscription.
              </p>
            </section>

            {/* The Five-Stage Citation Hierarchy */}
            <section className="mb-14">
              <h2 className="text-display-md text-white text-balance mb-5">
                The Five-Stage Citation Hierarchy.
              </h2>
              <p className="text-body-md text-silver mb-8">
                Each stage stacks on the one below it. Skip a stage and the
                stages above silently underperform. Wiele engineers all five
                in sequence on every engagement.
              </p>
              <Reveal stagger={0.06} className="grid gap-4">
                {hierarchy.map((h) => (
                  <div
                    key={h.stage}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6 md:p-7"
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <p className="text-body-xs font-mono text-electric">
                        {h.stage}
                      </p>
                      <h3 className="text-heading-md text-white">{h.name}</h3>
                    </div>
                    <p className="text-body-md text-cloud mb-3 italic">
                      {h.summary}
                    </p>
                    <p className="text-body-md text-silver">{h.body}</p>
                  </div>
                ))}
              </Reveal>
            </section>

            {/* What agencies typically miss */}
            <section className="mb-14">
              <h2 className="text-display-md text-white text-balance mb-5">
                What agencies typically miss.
              </h2>
              <p className="text-body-md text-silver mb-4">
                Five recurring failure patterns Wiele sees in pre-engagement
                Signal Audits across premium agencies and B2B firms:
              </p>
              <ul className="space-y-3 text-body-md text-silver list-disc pl-6">
                <li>
                  <strong className="text-white">No Person schema for the
                  founder.</strong> The Organization is named, but the human
                  whose voice the engines should attribute writing to is
                  invisible to the knowledge graph. Founder-voice authority
                  evaporates at the entity-resolution stage.
                </li>
                <li>
                  <strong className="text-white">FAQ and HowTo schema
                  missing.</strong> Pages carry the right content but skip
                  the structured-data wrappers that hand the engine a
                  pre-extracted answer block. Engines pass over them in
                  favour of competitors who served the answer on a plate.
                </li>
                <li>
                  <strong className="text-white">Same sameAs on Person and
                  Organization.</strong> Founder Person schema points at the
                  company LinkedIn instead of the personal one. The
                  knowledge graph cannot disambiguate the human from the
                  brand. Two entities collapse into one — and citation
                  attribution gets diluted.
                </li>
                <li>
                  <strong className="text-white">No IndexNow distribution.</strong>
                  Sites rely on Google and Bing to discover updates on their
                  own crawl cadence. Days or weeks of delay where a fresh
                  page should already be eligible for citation.
                </li>
                <li>
                  <strong className="text-white">Generic positioning.</strong>
                  The page says everything every other agency says.
                  Engines reward specificity, named frameworks, and
                  founder-voice points of view. Boilerplate is filtered out
                  before it&apos;s ever quoted.
                </li>
              </ul>
            </section>

            {/* How to engineer for citation */}
            <section className="mb-14">
              <h2 className="text-display-md text-white text-balance mb-5">
                How to engineer for citation.
              </h2>
              <p className="text-body-md text-silver mb-4">
                Wiele runs every engagement on a three-stage rhythm. The
                rhythm is canonical — it&apos;s the same engine that powers a
                Signal Audit on day one and an Authority Engine retainer on
                month twelve.
              </p>
              <ol className="space-y-4 text-body-md text-silver list-decimal pl-6">
                <li>
                  <strong className="text-white">Map.</strong> Diagnose AI
                  visibility, citation graph, and authority gaps across the
                  prompt surface that matters to your buyer. Output: a
                  baseline citation score against a named competitor set,
                  plus a 30-day implementation roadmap.{" "}
                  <Link
                    href="/audit"
                    className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                  >
                    Start with a Signal Audit
                  </Link>
                  .
                </li>
                <li>
                  <strong className="text-white">Build.</strong> Engineer
                  the content, schema, comparison hubs, founder-voice
                  articles, Citation Briefs, and authority assets that AI
                  engines cite — and humans convert from. Output: a
                  shipping cadence that lifts every stage of the hierarchy.{" "}
                  <Link
                    href="/systems/ai-visibility"
                    className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                  >
                    See the AI Visibility system
                  </Link>
                  .
                </li>
                <li>
                  <strong className="text-white">Compound.</strong>
                  Visibility, citations, and demand compound month over
                  month. The asset gets stronger; the moat gets deeper. The
                  Citation Score™ subscription instruments the lift; the
                  Authority Engine retainer executes the cadence.{" "}
                  <Link
                    href="/proof"
                    className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                  >
                    See programme shapes
                  </Link>
                  .
                </li>
              </ol>
            </section>

            {/* Methodology & sources */}
            <section className="mb-14">
              <h2 className="text-display-md text-white text-balance mb-5">
                Methodology &amp; sources.
              </h2>
              <p className="text-body-md text-silver mb-3">
                Citation behaviour observed across longitudinal runs of the
                Wiele AI Citation Tracker dataset (private, anonymised).
                Engine-specific guidance cross-referenced with each
                provider&apos;s public documentation:
              </p>
              <ul className="space-y-2 text-body-md text-silver list-disc pl-6">
                <li>
                  Google Search Central — Structured data (FAQPage, HowTo,
                  Article, Person, Organization)
                </li>
                <li>
                  Google AI Overviews — robots-meta-tag opt-in (max-snippet,
                  max-image-preview)
                </li>
                <li>
                  IndexNow Protocol — fast notification surface for Bing,
                  Yandex, Seznam, Naver, Yep
                </li>
                <li>
                  Schema.org — Person sameAs and Organization sameAs entity
                  reconciliation
                </li>
                <li>
                  Wiele Branding Canon 2026-05-14 — CBBE Pyramid, BAV Four
                  Pillars, Brand Value Chain
                </li>
                <li>
                  Wiele Advertising Canon 2026-05-14 — Reeves USP, Steel
                  Account Planning, Hackley IMC
                </li>
              </ul>
              <p className="text-body-sm text-smoke mt-5">
                The Wiele standard is full methodology transparency. Every
                claim above is reproducible from public sources or Wiele&apos;s
                instrumented engine-run dataset. Engagement clients receive
                the named-competitor lift trace inside the Citation Score™
                dashboard.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-12 pt-10 border-t border-[var(--color-border-default)]">
              <h2 className="text-display-md text-white text-balance mb-6">
                Questions on this brief.
              </h2>
              <Accordion
                items={faq.map((f, i) => ({
                  id: `cb-001-faq-${i}`,
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </section>

            {/* CTA */}
            <section className="rounded-[var(--radius-xl)] border border-electric/30 bg-electric/5 p-8 md:p-10">
              <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                The next step
              </p>
              <h2 className="text-display-md text-white text-balance mb-4">
                Start with a Signal Audit.
              </h2>
              <p className="text-body-lg text-silver mb-6 max-w-2xl">
                A diagnostic that maps your citation graph, entity baseline,
                and authority gaps — plus a 30-day implementation roadmap.
                The fastest way to know where you stand inside the answer
                economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/audit"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Run a Growth Audit
                </Link>
                <Link
                  href="/pricing"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  See the Citation Score™ subscription
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
