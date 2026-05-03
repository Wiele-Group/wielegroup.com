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

/**
 * Homepage — 12-section blueprint per CLAUDE_CODE_HANDOFF §9.
 * Header + Footer live in src/app/layout.tsx so they wrap every route.
 */
export default function HomePage() {
  return (
    <>
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
