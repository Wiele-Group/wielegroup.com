import {
  AuditPreview,
  BentoSystem,
  CTASection,
  HeroSection,
  LabsPreview,
  PricingSection,
  ProblemSection,
  ProcessSteps,
  ProofSection,
  ProofStrip,
  TrustSectionPreview,
} from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
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

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-home" />
      <HeroSection />
      <ProofStrip />
      <ProblemSection />
      <BentoSystem />
      <AuditPreview />
      <ProcessSteps />
      <PricingSection />
      <ProofSection />
      <TrustSectionPreview />
      <LabsPreview />
      <CTASection />
    </>
  );
}
