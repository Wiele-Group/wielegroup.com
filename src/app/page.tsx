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
import { breadcrumbSchema, personSchema } from "@/lib/schema";
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
  const founderPerson = personSchema({
    name: "Jonathan B. Landman",
    jobTitle: "Founder",
    url: `${siteConfig.url}/about#founder`,
    sameAs: ["https://www.linkedin.com/in/jonathan-b-landman"],
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-home" />
      <JsonLd schema={founderPerson} id="schema-person-founder-home" />
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
