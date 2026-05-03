import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Trust — How Wiele uses AI, handles data, and verifies claims",
  description:
    "AI use disclosed. Human review on every output. Source-level citation. Data handled with care. Claim verification on the record. Responsible automation.",
  path: "/trust",
});

const trustSections = [
  {
    id: "ai-disclosure",
    title: "AI use, disclosed.",
    body:
      "Every workflow that uses AI is named in our deliverables. We do not hide or downplay the role of AI in our methodology, and we do not let AI substitute for the strategic judgement clients pay for.",
    legalReview: false,
  },
  {
    id: "human-review",
    title: "Human review on every output.",
    body:
      "[LEGAL REVIEW: this section needs founder + counsel sign-off on the exact review-process language and any specific commitments around turnaround time or sign-off authority.]",
    legalReview: true,
  },
  {
    id: "data-handling",
    title: "Data handled with care.",
    body:
      "[LEGAL REVIEW: this section needs founder + counsel sign-off on data residency claims, processor relationships, GDPR posture, and any region-specific commitments. Body must accurately reflect signed DPAs.]",
    legalReview: true,
  },
  {
    id: "security",
    title: "Security commitments.",
    body:
      "[LEGAL REVIEW: this section needs founder + counsel sign-off. Will reference SOC 2 / ISO 27001 posture if and when those certifications are held; should not overclaim.]",
    legalReview: true,
  },
  {
    id: "citation-methodology",
    title: "Source-level citation methodology.",
    body:
      "Every claim, ranking, or competitive assertion in our deliverables traces back to a public, verifiable source. The Wiele OS engine logs source URLs, retrieval timestamps, and confidence scores. Methodology is open for inspection.",
    legalReview: false,
  },
  {
    id: "claim-verification",
    title: "Claim verification on the record.",
    body:
      "Outcome ranges, case-study metrics, and engine deltas in our materials are tied to real engine runs we can show. We do not display aspirational ranges or unverifiable client metrics.",
    legalReview: false,
  },
  {
    id: "content-quality",
    title: "Content quality standards.",
    body:
      "All client-facing content is editorially reviewed by a Wiele principal before it ships. AI-drafted text is treated as a draft, not a deliverable. Originality, accuracy, and voice are non-negotiable.",
    legalReview: false,
  },
  {
    id: "client-confidentiality",
    title: "Client confidentiality.",
    body:
      "[LEGAL REVIEW: this section needs founder + counsel sign-off. Should reference NDA defaults, data segregation, and the specific commitments around naming or anonymising clients in case studies.]",
    legalReview: true,
  },
  {
    id: "responsible-automation",
    title: "Responsible automation.",
    body:
      "Automation is used to lift the volume of work a strategist can ship — never to replace the strategist. Where automation is in the loop, a named human is accountable for the output.",
    legalReview: false,
  },
];

export default function TrustPage() {
  return (
    <>
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
                {section.legalReview ? (
                  <p className="mt-2 pl-8 text-body-xs font-mono text-warning">
                    Body copy pending counsel review.
                  </p>
                ) : null}
              </article>
            ))}
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
