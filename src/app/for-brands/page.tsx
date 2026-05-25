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
  title: "AI Search Visibility for Premium Brands | Wiele Group",
  description:
    "Wiele Group engineers AI search visibility for premium brands — Citation Score, entity trust, answer-engine inclusion, and AI citation monitoring across ChatGPT, Gemini, Perplexity, and Claude.",
  path: "/for-brands",
});

const problemPoints = [
  {
    index: "01",
    body: "Buyers in your category are asking ChatGPT, Gemini, and Perplexity which brand to choose — before they open a browser tab.",
  },
  {
    index: "02",
    body: "Your competitors appear in those answers. You do not. That gap is compounding every month.",
  },
  {
    index: "03",
    body: "The content strategy that built your Google rankings does not automatically earn AI citation — the signals are different.",
  },
  {
    index: "04",
    body: "You have no way to measure whether AI engines are recommending you or displacing you in real time.",
  },
];

const solutionItems = [
  {
    title: "AI Visibility Diagnostic",
    body: "A full engine run across ChatGPT, Gemini, Perplexity, and Claude — citation share, mention strength, source weight, authority gaps, and a 30-day roadmap. Baseline in 14 days.",
  },
  {
    title: "Entity Resolution",
    body: "Whether AI engines can unambiguously identify your brand as a distinct entity is Stage 1 of the citation hierarchy — and the gate every other stage depends on. Most brands fail it silently.",
  },
  {
    title: "Citation Architecture",
    body: "Structured extractability — schema bundle, direct-answer blocks, FAQ architecture, named-author trace — the five engineering changes that make your pages quotable by AI engines.",
  },
  {
    title: "Source Authority Engineering",
    body: "Tier-1 press placement, founder-voice publishing, and knowledge-graph signal building — the compound authority layer that makes AI engines trust and cite your brand over time.",
  },
  {
    title: "AI Visibility Monitoring",
    body: "Monthly citation share tracking against named competitors across four engines. Versioned prompt panel, prioritised action queue, founder-reviewed report. The compounding loop, instrumented.",
  },
  {
    title: "AI-Native Web Architecture",
    body: "Token-first website builds with contractual Core Web Vitals SLAs — the technical substrate that makes a domain citeable by AI engines, not just rankable by search engines.",
  },
];

const audienceItems = [
  "Premium B2B SaaS brands",
  "High-consideration professional services firms",
  "Category-leader consumer brands",
  "PE-backed and VC-backed growth brands",
  "Founders and CMOs losing category share to AI-recommended competitors",
  "Marketing leaders whose agencies do not yet offer AEO or GEO",
  "Brands preparing for AI-search-first buyer journeys",
];

const outcomeItems = [
  {
    title: "Brand appears in AI answers",
    body: "Citation share across ChatGPT, Gemini, Perplexity, and Claude — tracked monthly against a named competitor set. The goal is clear: close the gap, then widen it.",
  },
  {
    title: "Entity trust resolved",
    body: "AI engines unambiguously identify your brand. Schema, knowledge-graph footprint, sameAs disambiguation, and consistent identity signals across authoritative sources.",
  },
  {
    title: "Pages AI engines can quote",
    body: "Structured extractability across your top pages — definitive openers, clean H2/H3 hierarchy, schema bundle, table layouts. The Stage 3 sprint that moves citation share in a quarter.",
  },
  {
    title: "Measurable lift, replayable methodology",
    body: "Every metric in the monthly report is replayable from the citation log. Open methodology. Founder reviews every report. No black-box scoring.",
  },
];

const urgencyPoints = [
  {
    index: "01",
    body: "Google AI Mode reaches 75 million daily active users across 40 languages. AI Overviews reach 1.5 billion monthly users. Brands invisible in AI-generated answers are invisible to a growing proportion of buyers.",
  },
  {
    index: "02",
    body: "77% of AI Mode users report deciding faster than with traditional search. 75% decide more confidently. The consideration phase is compressing — brands cited in AI answers win before the buyer reaches your website.",
  },
  {
    index: "03",
    body: "Citation history compounds. Early citation begets later citation. Brands that build the substrate now will be the default recommendation when the AI-search era fully matures.",
  },
  {
    index: "04",
    body: "Your competitors are engineering their AI citation surface. Every month without a baseline diagnostic is a month of compounding displacement you cannot reverse cheaply.",
  },
];

const faqs = [
  {
    question: "What is AI search visibility?",
    answer:
      "AI search visibility is the measure of how often, how strongly, and in which context AI answer engines — ChatGPT, Gemini, Perplexity, Claude, Google AI Overviews — cite or recommend your brand when buyers ask questions in your category. It is distinct from organic search rankings: a brand can rank well on Google and be invisible in AI-generated answers, or vice versa. The signals AI engines use to decide who to cite — entity trust, structured extractability, source authority, freshness, and recommendation history — are different from traditional ranking signals.",
  },
  {
    question: "How is this different from traditional SEO?",
    answer:
      "Traditional SEO is optimised for position in a results list. AI search visibility is optimised for inclusion inside the generated answer — a fundamentally different surface. The five stages of the citation hierarchy (entity resolution, source authority, structured extractability, freshness, recommendation history) require different engineering work, different measurement, and different content architecture than classical SEO. Wiele runs both as one integrated system: SEO authority compounds AEO citation, and AEO citation feeds branded search. The two are not in competition — they are complementary layers.",
  },
  {
    question: "What is the Signal Audit?",
    answer:
      "The Signal Audit is Wiele's entry-point diagnostic — a full engine run across ChatGPT, Gemini, Perplexity, and Claude that produces a citation share baseline, mention strength breakdown, source weight analysis, authority gap report, prompt-injection surface map, AI crawler posture audit, and a prioritised 30-day roadmap. It is a one-off diagnostic at €2,500, delivered in 14 days. The Signal Audit is the recommended first step for any brand that wants to understand its AI visibility before committing to a retainer.",
  },
  {
    question: "What is AI Visibility Monitoring?",
    answer:
      "AI Visibility Monitoring is Wiele's recurring retainer that tracks citation share monthly against a named competitor set across four engines. A versioned panel of buyer-intent prompts runs every month — same prompts, fresh sessions, no personalisation. The output is citation share by engine, source weight breakdown, competitor comparison, a prioritised action queue, and a founder-reviewed report. The methodology is open — every metric is replayable from the citation log. Monitoring starts after a Signal Audit establishes the baseline.",
  },
  {
    question: "What does entity resolution mean for my brand?",
    answer:
      "Entity resolution is whether AI engines can unambiguously identify your brand as a distinct entity — separate from competitors, common nouns, or people sharing the same name. It is Stage 1 of the Five-Stage Citation Hierarchy and the gate every other stage depends on. A brand that fails entity resolution will be cited inconsistently, attributed to wrong sources, or ignored entirely — even if its content is strong. The fix is a three-week engineering sprint: schema sameAs disambiguation, Wikidata filing, founder-voice publishing, and structured third-party citation placement. Read Citation Brief #006 for the full methodology.",
  },
  {
    question: "Do I need a new website to improve AI citation?",
    answer:
      "Not necessarily. The Signal Audit identifies the exact gaps — some brands need content architecture changes (Stage 3 structured extractability) that can be applied to an existing site. Others need the technical substrate rebuilt — token-first architecture, correct schema layer, llms.txt, sitemap, and Core Web Vitals — which is the scope of the Premium Brand Site System. The audit determines which intervention applies. Wiele does not recommend infrastructure rebuilds unless the diagnostic confirms it is the highest-leverage action.",
  },
  {
    question: "What is the first step?",
    answer:
      "The Signal Audit. It is a fixed-scope, fixed-price diagnostic (€2,500, 14-day delivery) that tells you exactly where your brand stands across the four major AI engines, what the gaps are, and what the 30-day roadmap looks like. Most engagements start here. If you want to discuss fit before committing, book a Strategy Call — a scoping conversation with a Wiele principal at no cost.",
  },
  {
    question: "How long until my brand appears in AI answers?",
    answer:
      "Entity resolution wins land first — typically 30–60 days after the Schema and Wikidata layer ships. Structured extractability lift (Stage 3) shows up in the next monthly engine run after the sprint, usually 4–6 weeks. Source authority (Stage 2) compounds over quarters, not weeks. The Signal Audit identifies your Stage 1 status immediately; the 30-day roadmap prioritises the fastest-moving levers for your specific situation.",
  },
];

export default function ForBrandsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "For Brands", url: `${siteConfig.url}/for-brands` },
  ]);

  const service = serviceSchema({
    name: "AI Search Visibility for Premium Brands",
    description:
      "Wiele Group engineers AI search visibility for premium brands — entity trust, citation architecture, answer-engine monitoring, and AI-native web infrastructure across ChatGPT, Gemini, Perplexity, and Claude.",
    url: `${siteConfig.url}/for-brands`,
    serviceType: "AI Search Visibility",
    offerCatalog: {
      name: "Brand AI visibility services",
      items: [
        { name: "Signal Audit", description: "Full engine run across four AI engines — citation share, authority gaps, 30-day roadmap. €2,500 one-off, 14-day delivery." },
        { name: "AI Visibility Monitoring", description: "Monthly citation share tracking against named competitors across ChatGPT, Gemini, Perplexity, and Claude." },
        { name: "Entity Resolution Sprint", description: "Three-week engineering sprint that resolves brand entity across AI engine knowledge graphs." },
        { name: "Citation Architecture Build", description: "Structured extractability — schema bundle, direct-answer blocks, FAQ architecture, named-author trace." },
        { name: "Premium Brand Site System", description: "Token-first AI-native website build with contractual Core Web Vitals SLA." },
        { name: "Authority Engine Retainer", description: "Compounding authority layer — editorial, digital PR, founder-voice publishing, knowledge-graph engineering." },
      ],
    },
  });

  const faqJsonLd = faqSchema(faqs);

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-for-brands" />
      <JsonLd schema={service} id="schema-service-for-brands" />
      <JsonLd schema={faqJsonLd} id="schema-faq-for-brands" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="electric" size="sm" className="mb-5">
                For Premium Brands
              </Badge>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-display-xl text-white text-balance mb-5">
                AI search visibility engineered for brands that need to be chosen
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-silver mb-8 max-w-2xl">
                Buyers in your category are asking ChatGPT, Gemini, Perplexity,
                and Claude for recommendations — before they open a browser tab.
                Wiele engineers the citation architecture, entity trust, and
                authority signals that determine whether those answers include you
                or your competitors.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/audit" className={buttonStyles({ variant: "primary", size: "lg" })}>
                  Start AI Visibility Audit
                </Link>
                <Link href="/contact" className={buttonStyles({ variant: "ghost", size: "lg" })}>
                  Book Strategy Call
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="py-12 md:py-16 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <FadeIn whileInView>
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Direct answer
            </p>
            <h2 className="text-display-md text-white text-balance mb-5">
              What does Wiele Group do for brands?
            </h2>
            <p className="text-body-lg text-silver leading-relaxed">
              Wiele Group engineers AI search visibility for premium brands — the
              entity trust, citation architecture, and answer-engine monitoring that
              determine whether AI systems cite your brand when buyers ask for
              recommendations in your category.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              The problem
            </p>
            <h2 className="text-display-md text-white text-balance">
              Search has changed. Most brands have not.
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

      {/* Capability layer */}
      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              What Wiele engineers
            </p>
            <h2 className="text-display-md text-white text-balance">
              Six disciplines. One compounding system.
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
            Entity Resolution in depth:{" "}
            <Link
              href="/citation-brief/stage-1-entity-resolution"
              className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
            >
              Read Citation Brief #006 — Stage 1 Entity Resolution →
            </Link>
          </p>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
            <div>
              <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
                Audience
              </p>
              <h2 className="text-display-md text-white text-balance">
                Built for brands losing category share in AI-generated answers
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

      {/* Outcomes */}
      <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Outcomes
            </p>
            <h2 className="text-display-md text-white text-balance">
              What brands achieve with Wiele
            </h2>
          </div>
          <Reveal stagger={0.04} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomeItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[var(--radius-lg)] border border-electric/30 bg-[var(--color-surface-elevated)] p-5"
              >
                <div className="inline-flex items-center mb-3 px-2.5 py-1 rounded-full border border-electric/30 bg-electric/5">
                  <span className="font-mono text-[0.6125rem] uppercase tracking-[0.12em] text-electric">
                    Outcome
                  </span>
                </div>
                <h3 className="text-heading-sm text-white mb-2">{item.title}</h3>
                <p className="text-body-sm text-silver">{item.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Urgency */}
      <section className="py-16 md:py-20 lg:py-24 bg-[var(--color-obsidian)]/40">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="mb-10">
            <p className="text-body-xs font-mono uppercase tracking-[0.16em] text-electric mb-4">
              Why now
            </p>
            <h2 className="text-display-md text-white text-balance">
              The window to compound first is open. It will not stay open.
            </h2>
          </div>
          <Reveal stagger={0.06} className="flex flex-col gap-5">
            {urgencyPoints.map((point) => (
              <article key={point.index} className="border-l-2 border-electric/40 pl-5">
                <p className="text-body-xs font-mono text-electric mb-2">{point.index}</p>
                <p className="text-body-md text-silver">{point.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Entry point — Signal Audit */}
      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)]">
          <div className="rounded-[var(--radius-xl)] border border-electric/30 bg-[var(--color-surface-elevated)] p-6 md:p-8">
            <Badge variant="electric" size="sm" className="mb-4">
              Start here
            </Badge>
            <h2 className="text-heading-lg text-white mb-3">
              Signal Audit — baseline in 14 days
            </h2>
            <p className="text-body-md text-silver mb-4">
              The Signal Audit is a fixed-scope, fixed-price diagnostic at €2,500.
              A full engine run across ChatGPT, Gemini, Perplexity, and Claude —
              citation share baseline, mention strength, authority gaps,
              prompt-injection surface map, AI crawler posture, and a prioritised
              30-day roadmap. Delivered in 14 days.
            </p>
            <p className="text-body-sm text-smoke mb-6">
              Not ready to commit? Book a Strategy Call first — a scoping
              conversation with a Wiele principal at no cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/audit" className={buttonStyles({ variant: "primary", size: "md" })}>
                Start AI Visibility Audit
              </Link>
              <Link href="/contact" className={buttonStyles({ variant: "ghost", size: "md" })}>
                Book Strategy Call
              </Link>
            </div>
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
              <p className="text-body-sm text-silver">Monthly citation share tracking against named competitors across four engines.</p>
            </Link>
            <Link
              href="/services/premium-brand-site-system"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Premium Brand Site System</h3>
              <p className="text-body-sm text-silver">Token-first AI-native website builds with contractual Core Web Vitals SLAs.</p>
            </Link>
            <Link
              href="/citation-brief/stage-1-entity-resolution"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Citation Brief #006 — Entity Resolution</h3>
              <p className="text-body-sm text-silver">How AI engines learn which brands to trust — the Stage 1 deep-dive.</p>
            </Link>
            <Link
              href="/pricing"
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 hover:border-electric/40 transition-colors"
            >
              <h3 className="text-heading-sm text-white mb-1.5">Pricing</h3>
              <p className="text-body-sm text-silver">Signal Audit through Sovereign — the full Wiele pricing ladder.</p>
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

      <CTASection />
    </>
  );
}
