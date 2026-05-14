import {
  AnswerEngineStrip,
  AuditPreview,
  BentoSystem,
  CinematicEntry,
  CTASection,
  DisciplinesSection,
  HeroSection,
  HorizonStrip,
  LabsPreview,
  PricingSection,
  ProblemSection,
  ProcessSteps,
  ProofSection,
  ProofStrip,
  TrustSectionPreview,
} from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  personSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/metadata";

/**
 * ISR — re-generate the homepage every 60 seconds at the edge so the
 * minute-rotating fixture in HeroSection actually rotates between
 * deploys. Scope is `/` only; other routes stay fully static. Adding
 * `revalidate` elsewhere is a wasted runtime cost — Labs articles
 * change on git push (which redeploys), system pages are content
 * stable, audit/contact are dynamic on submit, sitemap is rebuilt.
 *
 * Authority: founder reinforcement #3 from Phase 6 brief (binding scope).
 */
export const revalidate = 60;

/**
 * Homepage — 12-section blueprint per CLAUDE_CODE_HANDOFF §9.
 * Header + Footer live in src/app/layout.tsx so they wrap every route.
 */
export default function HomePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
  ]);

  // v3.8.0 — top-level Person schema for the founder. organizationSchema
  // already carries `founder` as a PersonRef (name+url only); this richer
  // Person entity carries jobTitle + worksFor + sameAs (personal LinkedIn),
  // which is what entity-reconciliation pipelines (Wikidata, AI knowledge
  // graphs) actually consume to disambiguate the person from the brand.
  // v3.9.3 — sameAs sourced from siteConfig.socials.founderLinkedin (DRY).
  const founderPerson = personSchema({
    name: "Jonathan B. Landman",
    jobTitle: "Founder",
    url: `${siteConfig.url}/about#founder`,
    sameAs: [siteConfig.socials.founderLinkedin],
  });

  // v3.9.3 — homepage FAQPage schema. Eight buyer-intent questions covering
  // the AEO/GEO decision path. Each answer is extractable (≤2 sentences)
  // and repeats the "Citation, not clicks." mantra in at least one slot
  // so AI Overviews and ChatGPT quote it back. Per Google's FAQPage rich
  // result spec, answers may include up to ~500 chars of plain text.
  const homepageFaq = faqSchema([
    {
      question: "What does Wiele Group actually do?",
      answer:
        "Wiele Group engineers the brand that AI engines cite. Six disciplines — brand, marketing, web design, advertising, SEO, and AI search optimization — run as one integrated operating system. Citation, not clicks.",
    },
    {
      question: "What is AEO (Answer Engine Optimization)?",
      answer:
        "AEO is the discipline of engineering a brand to be cited inside AI-generated answers from ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot, and Claude. Classical SEO targets blue-link rankings; AEO targets recommendation inclusion inside the answer itself.",
    },
    {
      question: "What is GEO (Generative Engine Optimization)?",
      answer:
        "GEO is the broader umbrella covering how content, entities, and authority signals are structured so generative AI systems quote, cite, and recommend a brand. AEO is the answer-inclusion layer of GEO.",
    },
    {
      question: "How is Wiele different from a classical SEO agency?",
      answer:
        "Classical SEO optimizes for blue-link rankings. Wiele engineers for citation inside AI answers — the next layer of discovery. The methodology (Map. Build. Compound.) is open; outcomes are tied to named engine runs, not aspirational lift ranges.",
    },
    {
      question: "Who is Wiele Group built for?",
      answer:
        "Premium B2B firms, agencies, and high-margin services brands that compete on perception, trust, and authority. The economics favour clients with high lifetime value where a single AI citation can move a deal forward.",
    },
    {
      question: "How do I get cited by ChatGPT or Perplexity?",
      answer:
        "Five signals decide citation: entity clarity, source authority, structured extractability, freshness, and recommendation history. Wiele engineers all five through a structured Map → Build → Compound rhythm. Start with a Signal Audit at /audit.",
    },
    {
      question: "Does Wiele Group disclose AI use?",
      answer:
        "Yes. Every workflow that uses AI is named. Every deliverable is reviewed by a Wiele principal before it ships. Claims trace to public, verifiable sources. See /trust for the full standard.",
    },
    {
      question: "How do engagements start?",
      answer:
        "Most engagements begin with a Signal Audit — a diagnostic that maps citation graph, entity baseline, authority gaps, and a 30-day implementation roadmap. From there, retainers compound month over month.",
    },
  ]);

  // v3.9.3 — HowTo schema for the Map. Build. Compound. process. Mirrors
  // src/data/homepage.ts processSteps so the structured data matches the
  // human-readable section verbatim. Total time = ~12 weeks for a typical
  // first engagement cycle.
  const processHowTo = howToSchema({
    name: "How Wiele engineers a brand to be cited by AI engines",
    description:
      "The three-stage Map. Build. Compound. process Wiele runs on every engagement to move a brand from invisible to cited inside answer engines.",
    totalTime: "P84D",
    steps: [
      {
        name: "Map — Diagnose AI visibility",
        text:
          "Diagnose AI visibility, citation graph, and authority gaps across the prompt surface that matters to your buyer.",
        url: `${siteConfig.url}/audit`,
      },
      {
        name: "Build — Engineer citation assets",
        text:
          "Engineer content, schema, comparison hubs, and authority assets that AI engines cite — and humans convert from.",
        url: `${siteConfig.url}/systems/ai-visibility`,
      },
      {
        name: "Compound — Stack the moat",
        text:
          "Visibility, citations, and demand compound month over month. The asset gets stronger; the moat gets deeper.",
        url: `${siteConfig.url}/proof`,
      },
    ],
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-home" />
      <JsonLd schema={founderPerson} id="schema-person-founder-home" />
      <JsonLd schema={homepageFaq} id="schema-faq-home" />
      <JsonLd schema={processHowTo} id="schema-howto-home" />
      <CinematicEntry />
      <HeroSection />
      <HorizonStrip fromLabel="Hero" toLabel="Proof" index={1} total={3} />
      <ProofStrip />
      <DisciplinesSection />
      <HorizonStrip fromLabel="Disciplines" toLabel="Problem" index={2} total={3} />
      <ProblemSection />
      <BentoSystem />
      <AuditPreview />
      <ProcessSteps />
      <PricingSection />
      <HorizonStrip fromLabel="Pricing" toLabel="Trust" index={3} total={3} />
      <ProofSection />
      <AnswerEngineStrip />
      <TrustSectionPreview />
      <LabsPreview />
      <CTASection />
    </>
  );
}
