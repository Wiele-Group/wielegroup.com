import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "AI Search Capability Layer for AEO & GEO Agencies | Wiele Group",
  description:
    "Wiele Group helps AEO and GEO agencies add AI search visibility, citation engineering, answer-engine optimization, and authority systems to their client offer.",
  path: "/for-agencies",
});

const problemPoints = [
  { index: "01", body: "Clients no longer ask only about rankings." },
  {
    index: "02",
    body: "They ask why competitors appear in ChatGPT, Gemini, Perplexity, and AI summaries.",
  },
  {
    index: "03",
    body: "Traditional SEO deliverables do not fully solve AI answer visibility.",
  },
  {
    index: "04",
    body: "Agencies need a repeatable framework for entity trust, citation readiness, source architecture, and answer inclusion.",
  },
];

const solutionItems = [
  {
    title: "AI Visibility Audits",
    body: "Full engine runs across ChatGPT, Gemini, Perplexity, and Claude — visibility score, mention strength, citation rate, authority gaps, and a 30-day action roadmap.",
  },
  {
    title: "Citation Mapping",
    body: "Map which sources AI engines pull from when answering buyer-intent queries in your client's market. Identify gaps, displacers, and citation entry points.",
  },
  {
    title: "Entity and Authority Engineering",
    body: "Structure client brands as trustworthy named entities — knowledge graph signals, schema markup, structured proof, and consistent authority cues across sources.",
  },
  {
    title: "Answer-Asset Architecture",
    body: "Design and build the content assets AI engines extract from: structured FAQs, direct-answer blocks, comparison hubs, and definition pages.",
  },
  {
    title: "Service and Proof-Page Systems",
    body: "Premium service pages and case-study proof pages built to be extractable — schema-first, citation-ready, and answer-engine legible at every layer.",
  },
  {
    title: "Search and AI Conversion Pathways",
    body: "Design conversion funnels that capture buyers arriving from AI-generated answers as well as traditional organic search.",
  },
  {
    title: "Client Reporting Structure",
    body: "Reporting frameworks that show clients AI visibility movement alongside traditional SEO — citation rate, prompt coverage, mention strength, and displacement risk.",
  },
];

const audienceItems = [
  "AEO agencies",
  "GEO agencies",
  "SEO agencies",
  "Performance marketing agencies",
  "Brand strategy agencies",
  "Web design agencies serving premium clients",
  "Consultants serving high-value B2B clients",
];

const deliveryItems = [
  {
    title: "AI Visibility Audit",
    body: "Diagnose where a client stands in AI-generated answers across four engines — visibility score, citation map, authority gaps, defense vectors.",
  },
  {
    title: "GEO Strategy Sprint",
    body: "Map client GEO position, identify citation entry points, and build a 90-day structured visibility roadmap.",
  },
  {
    title: "Citation Readiness System",
    body: "Structured audit and build of the citation-readiness signals that determine whether an AI engine cites a brand.",
  },
  {
    title: "AI Answer Asset Build",
    body: "Design and build the direct-answer content assets AI engines extract from when responding to buyer-intent queries.",
  },
  {
    title: "Authority Architecture",
    body: "Design the full entity and authority layer — schema, knowledge graph signals, structured proof, and third-party citation strategy.",
  },
  {
    title: "Search-to-Call Conversion System",
    body: "Conversion infrastructure for buyers arriving via AI-generated answers — landing pages, CTAs, and intake flows aligned to AI search buyer behaviour.",
  },
  {
    title: "Client AI Visibility Reporting",
    body: "Monthly reporting that tracks AI citation share, prompt coverage, mention strength, and displacement risk in a format clients can act on.",
  },
  {
    title: "Premium Retainer Packaging",
    body: "Agency-ready packaging for AI visibility as a recurring retainer product — scope, pricing model, delivery cadence, and client-facing framing.",
  },
];

const commercialPoints = [
  {
    index: "01",
    body: "Clients are already asking their agencies about AI search — the question is no longer emerging, it is present.",
  },
  {
    index: "02",
    body: "Agencies that package AI visibility as a deliverable first will gain a positioning advantage before the capability becomes a commodity.",
  },
  {
    index: "03",
    body: "AI answer inclusion is becoming a trust layer in buyer decision-making — brands that are cited are evaluated as more authoritative.",
  },
  {
    index: "04",
    body: "The opportunity to productize AI-search expertise exists now, before the market becomes crowded and margins compress.",
  },
];

const faqs = [
  {
    question: "What is an AI-search capability layer?",
    answer:
      "An AI-search capability layer is the operating system, audit framework, strategy methodology, and delivery assets an agency uses to produce AI visibility outcomes for clients. Wiele OS is that layer — it provides the engine, the architecture, the audit system, and the execution frameworks agencies need to deliver AEO and GEO without building the full system internally.",
  },
  {
    question: "Is this for AEO/GEO agencies or end clients?",
    answer:
      "Wiele OS is available to both agencies and end clients directly. For agencies, the positioning is capability layer: Wiele provides the strategy, audit frameworks, and delivery architecture that agencies apply to client work. For direct clients, Wiele operates as the delivery partner. The same operating system serves both engagement types.",
  },
  {
    question: "Can Wiele support white-label or partner delivery?",
    answer:
      "Partner and white-label delivery arrangements are discussed on a case-by-case basis. The starting point is a Strategy Call where we assess the agency's client base, delivery model, and capability gaps.",
  },
  {
    question: "How is this different from traditional SEO?",
    answer:
      "Traditional SEO is optimised for search engine ranking pages. AI-search visibility is optimised for the answer itself: whether an AI engine cites a brand, recommends a service, or includes a brand in a generated answer. The technical surface is different — entity trust, citation architecture, structured extractability. The measurement is different — citation rate, mention strength, prompt coverage. And the content strategy is different — direct-answer assets, schema depth, structured proof.",
  },
  {
    question: "Does this replace our existing SEO team?",
    answer:
      "No. AI-search capability extends what an SEO team can deliver, it does not replace it. Organic search rankings remain important. Wiele OS adds the AEO and GEO layer — citation architecture, answer-asset builds, and AI visibility reporting — that sit alongside traditional SEO deliverables.",
  },
  {
    question: "What is the first step?",
    answer:
      "The first step is a Strategy Call or an AI Visibility Audit. A Strategy Call is a scoping conversation with a Wiele principal about your agency's client base, capability gaps, and delivery model. An AI Visibility Audit is the diagnostic — a full engine run on a client brand that surfaces visibility score, citation readiness, authority gaps, and a 30-day roadmap.",
  },
];

export default function ForAgenciesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "For Agencies", url: `${siteConfig.url}/for-agencies` },
  ]);

  const service = serviceSchema({
    name: "AI Search Capability Layer for AEO and GEO Agencies",
    description:
      "Wiele Group helps agencies add AI search visibility, AEO, GEO, citation engineering, and authority systems to their client offer.",
    url: `${siteConfig.url}/for-agencies`,
    serviceType: "AI Search Capability Layer",
    offerCatalog: {
      name: "Agency AI visibility capabilities",
      items: [
        { name: "AI Visibility Audit", description: "Full engine run across four answer engines. Visibility score, citation map, authority gaps, defense vectors." },
        { name: "GEO Strategy Sprint", description: "GEO position map and 90-day structured visibility roadmap." },
        { name: "Citation Readiness System", description: "Audit and build of citation-readiness signals." },
        { name: "AI Answer Asset Build", description: "Direct-answer content assets AI engines extract from." },
        { name: "Authority Architecture", description: "Entity and authority layer — schema, knowledge graph, structured proof." },
        { name: "Search-to-Call Conversion System", description: "Conversion infrastructure for AI-search buyers." },
        { name: "Client AI Visibility Reporting", description: "Monthly AI citation and visibility reporting." },
        { name: "Premium Retainer Packaging", description: "Agency-ready packaging for AI visibility as a recurring product." },
      ],
    },
  });

  const faqJsonLd = faqSchema(faqs);

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-for-agencies" />
      <JsonLd schema={service} id="schema-service-for-agencies" />
      <JsonLd schema={faqJsonLd} id="schema-faq-for-agencies" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                For AEO &amp; GEO Agencies
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                AI Search Capability Layer for AEO &amp; GEO Agencies
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver mb-8 max-w-2xl">
                AEO and GEO agencies are being asked to solve a new problem: how to
                make clients visible inside AI-generated answers. Wiele Group gives
                agencies the strategy, citation architecture, audit system, and
                authority frameworks to deliver that capability with precision.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Book Strategy Call
                </Link>
                <Link
                  href="/audit"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  Start AI Visibility Audit
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Direct Answer Block */}
      <section className="py-12 md:py-16 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <FadeIn whileInView>
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Direct answer
            </p>
            <h2 className="text-display-md text-white text-balance mb-5">
              What is Wiele Group for agencies?
            </h2>
            <p className="text-body-lg text-silver leading-relaxed">
              Wiele Group is a premium AI-search capability layer for agencies that need
              to deliver AEO, GEO, citation engineering, AI visibility audits, and
              authority systems for their clients without building the entire operating
              model from scratch.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              The problem
            </p>
            <h2 className="text-display-md text-white text-balance">
              The agency market has changed
            </h2>
          </div>
          <Reveal stagger={0.06} className="flex flex-col gap-5">
            {problemPoints.map((point) => (
              <article key={point.index} className="border-l-2 border-[var(--color-border-default)] pl-5">
                <p className="text-body-xs font-mono text-electric mb-2">{point.index}</p>
                <p className="text-body-md text-silver">{point.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              The capability layer
            </p>
            <h2 className="text-display-md text-white text-balance">
              Wiele OS gives agencies the missing capability layer
            </h2>
          </div>
          <Reveal stagger={0.05} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutionItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <h3 className="text-heading-sm text-white mb-2.5">{item.title}</h3>
                <p className="text-body-sm text-silver">{item.body}</p>
              </div>
            ))}
          </Reveal>
          <p className="text-body-sm text-silver mt-8">
            Entity and Authority Engineering in depth:{" "}
            <Link
              href="/citation-brief/stage-1-entity-resolution"
              className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
            >
              Read Citation Brief #006 — Stage 1 Entity Resolution →
            </Link>
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
            <div>
              <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                Audience
              </p>
              <h2 className="text-display-md text-white text-balance">
                Built for agencies that need AI-search capability now
              </h2>
            </div>
            <Reveal stagger={0.05} className="flex flex-col gap-2">
              {audienceItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-3"
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric"
                  >
                    <Check size={12} />
                  </span>
                  <span className="text-body-md text-cloud">{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* What Agencies Can Deliver */}
      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Deliverables
            </p>
            <h2 className="text-display-md text-white text-balance">
              What your agency can deliver with Wiele
            </h2>
          </div>
          <Reveal stagger={0.04} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deliveryItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[var(--radius-lg)] border border-electric/30 bg-[var(--color-surface-elevated)] p-5"
              >
                <div className="inline-flex items-center mb-3 px-2.5 py-1 rounded-full border border-electric/30 bg-electric/5">
                  <span className="font-mono text-[0.6125rem] uppercase tracking-[0.12em] text-electric">
                    Deliverable
                  </span>
                </div>
                <h3 className="text-heading-sm text-white mb-2">{item.title}</h3>
                <p className="text-body-sm text-silver">{item.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Commercial Logic */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Urgency
            </p>
            <h2 className="text-display-md text-white text-balance">
              Why agencies should not wait
            </h2>
          </div>
          <Reveal stagger={0.06} className="flex flex-col gap-5">
            {commercialPoints.map((point) => (
              <article key={point.index} className="border-l-2 border-electric/40 pl-5">
                <p className="text-body-xs font-mono text-electric mb-2">{point.index}</p>
                <p className="text-body-md text-silver">{point.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Wiele OS */}
      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="rounded-[var(--radius-xl)] border border-electric/30 bg-[var(--color-surface-elevated)] p-6 md:p-8">
            <Badge variant="electric" size="sm" className="mb-4">
              Wiele OS
            </Badge>
            <h2 className="text-heading-lg text-white mb-3">
              Wiele OS for serious agency capability builds
            </h2>
            <p className="text-body-md text-silver mb-4">
              Wiele OS starts from €15,000 / mo for agencies ready to build serious
              AI-search delivery capability. Engagements cover strategy, operating
              architecture, audit systems, execution frameworks, and visibility assets
              — the full operating layer an agency needs to deliver AI search
              visibility at scale.
            </p>
            <p className="text-body-sm text-smoke">
              Wiele OS is intended for agencies committed to making AI search
              visibility a core part of their offer. The first step is a Strategy
              Call to assess fit and scope.
            </p>
          </div>
        </div>
      </section>

      {/* Internal links — service pages */}
      <section className="py-12 md:py-16 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-6">
            Go deeper
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/services/ai-visibility-monitoring"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">AI Visibility Monitoring</h3>
              <p className="text-body-sm text-silver">Monthly citation share tracking for your clients across ChatGPT, Gemini, Perplexity, and Claude — the recurring retainer that stacks with every delivery tier.</p>
            </Link>
            <Link
              href="/services/premium-brand-site-system"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Premium Brand Site System</h3>
              <p className="text-body-sm text-silver">The Wiele web design flagship — AI-Search-Native architecture, contractual Core Web Vitals SLA. The Foundation Build clients need before monitoring lands.</p>
            </Link>
            <Link
              href="/citation-brief/stage-1-entity-resolution"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Citation Brief #006 — Entity Resolution</h3>
              <p className="text-body-sm text-silver">How AI engines learn which brands to trust — the Stage 1 deep-dive and methodology behind the Citation Readiness System you deliver to clients.</p>
            </Link>
            <Link
              href="/pricing"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Pricing</h3>
              <p className="text-body-sm text-silver">Signal Audit through Sovereign — the full Wiele pricing ladder, including agency engagement tiers.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Questions
            </p>
            <h2 className="text-display-md text-white text-balance">
              Frequently asked questions
            </h2>
          </div>
          <Reveal stagger={0.05} className="flex flex-col gap-5">
            {faqs.map((faq, i) => (
              <article
                key={i}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <h3 className="text-heading-sm text-white mb-3">{faq.question}</h3>
                <p className="text-body-md text-silver">{faq.answer}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection />
    </>
  );
}
