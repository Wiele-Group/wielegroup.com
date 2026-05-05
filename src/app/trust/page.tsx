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

const LAST_REVIEWED = "2026-05-05";

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
