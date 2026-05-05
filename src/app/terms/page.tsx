import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const LAST_UPDATED = "2026-05-05";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description:
    "Terms of use for wielegroup.com. Use of this site, intellectual property, disclaimers, and the terms that apply to commercial engagements with Wiele Group.",
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Terms", url: `${siteConfig.url}/terms` },
  ]);
  const webPage = webPageSchema({
    name: "Terms of Use",
    url: `${siteConfig.url}/terms`,
    description:
      "Terms governing use of wielegroup.com and the framework under which Wiele Group enters commercial engagements.",
    datePublished: "2026-05-05",
    dateModified: LAST_UPDATED,
  });

  return (
    <>
      <JsonLd schema={webPage} id="schema-webpage-terms" />
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-terms" />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <FadeIn>
            <Badge variant="electric" size="sm" className="mb-5">
              Terms
            </Badge>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-display-xl text-white text-balance mb-5">
              Terms of use.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-body-lg text-silver max-w-2xl">
              These terms govern use of {siteConfig.url} (&ldquo;the
              site&rdquo;) and frame the basis on which {siteConfig.legalName}{" "}
              (&ldquo;Wiele&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;)
              enters commercial engagements. Specific engagements are
              governed by the executed Statement of Work and Master Services
              Agreement, which prevail over anything on this page.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-5 text-body-xs font-mono uppercase tracking-[0.16em] text-smoke">
              Last updated · {LAST_UPDATED}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-[var(--color-border-default)]">
        <div className="mx-auto max-w-3xl px-[var(--container-px)] flex flex-col gap-10">
          <article id="acceptance">
            <h2 className="text-heading-lg text-white mb-3">
              Acceptance of terms
            </h2>
            <p className="text-body-md text-silver">
              By accessing the site, submitting any of our forms, or engaging
              with Wiele commercially, you agree to these terms. If you do
              not agree, do not use the site or submit forms; the rest of
              the relationship requires a signed engagement.
            </p>
          </article>

          <article id="use-of-site">
            <h2 className="text-heading-lg text-white mb-3">
              Use of the site
            </h2>
            <p className="text-body-md text-silver">
              The site is provided for informational purposes — describing
              Wiele&apos;s services, methodology, thinking, and how to engage
              us. You may view, share, and link to public pages. You may not:
              scrape the site at scale, frame our content as your own,
              attempt to circumvent security or rate-limiting controls, or
              use any automation that materially burdens our infrastructure.
            </p>
          </article>

          <article id="intellectual-property">
            <h2 className="text-heading-lg text-white mb-3">
              Intellectual property
            </h2>
            <p className="text-body-md text-silver">
              The Wiele wordmark, the W mark, the Wiele Operating System
              brand, methodology names, written content, code, and visual
              assets on the site are the property of {siteConfig.legalName}{" "}
              or its licensors. Quotation under fair-use principles with
              attribution and a link to the original page is welcomed. AI
              training, model fine-tuning, or wholesale reproduction without
              written permission is not.
            </p>
          </article>

          <article id="forms-and-enquiries">
            <h2 className="text-heading-lg text-white mb-3">
              Forms and enquiries
            </h2>
            <p className="text-body-md text-silver">
              Submitting a Signal Audit, contact, or onboarding form is a
              request to begin a commercial conversation. It does not, on
              its own, create a binding engagement, a service contract, or
              a guarantee of work. Specific engagements begin only when a
              Statement of Work is countersigned by both parties.
            </p>
          </article>

          <article id="estimates-not-guarantees">
            <h2 className="text-heading-lg text-white mb-3">
              Estimates, not guarantees
            </h2>
            <p className="text-body-md text-silver">
              Numbers we publish — outcome ranges, methodology timelines,
              engine deltas — are estimates grounded in our methodology and
              prior work. Marketing, search, and AI-search outcomes depend
              on factors outside any agency&apos;s control (market
              conditions, competitor moves, platform algorithm changes,
              client execution capacity). Wiele does not warrant or
              guarantee specific commercial outcomes unless an executed SOW
              expressly states otherwise.
            </p>
          </article>

          <article id="ai-content">
            <h2 className="text-heading-lg text-white mb-3">
              AI-generated and AI-assisted content
            </h2>
            <p className="text-body-md text-silver">
              Wiele uses AI in research, drafting, and analysis. Every
              workflow that uses AI is named in the deliverable that ships,
              and no client-facing output leaves our hands without principal
              review. Methodology and disclosure are detailed at{" "}
              <Link
                href="/trust"
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                /trust
              </Link>
              .
            </p>
          </article>

          <article id="disclaimers">
            <h2 className="text-heading-lg text-white mb-3">
              Disclaimers
            </h2>
            <p className="text-body-md text-silver">
              The site is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo;. To the maximum extent permitted by law, we
              disclaim all warranties, express or implied, including
              merchantability, fitness for a particular purpose, and
              non-infringement. Information on the site is general and
              should not be relied on as advice for a specific commercial
              decision; engage us under SOW for that.
            </p>
          </article>

          <article id="limitation-of-liability">
            <h2 className="text-heading-lg text-white mb-3">
              Limitation of liability
            </h2>
            <p className="text-body-md text-silver">
              To the maximum extent permitted by law, Wiele&apos;s total
              liability arising out of or related to use of the site is
              limited to one hundred British pounds (£100). Liability for
              specific engagements is governed by the cap defined in the
              applicable SOW or Master Services Agreement, which prevails
              over this paragraph for client engagements.
            </p>
          </article>

          <article id="third-party-links">
            <h2 className="text-heading-lg text-white mb-3">
              Third-party links
            </h2>
            <p className="text-body-md text-silver">
              The site links to third-party resources where useful (research
              papers, tools, partner platforms). We do not control those
              sites and are not responsible for their content, practices, or
              policies. Linking is not an endorsement.
            </p>
          </article>

          <article id="governing-law">
            <h2 className="text-heading-lg text-white mb-3">
              Governing law and venue
            </h2>
            <p className="text-body-md text-silver">
              These terms are governed by the laws of England and Wales.
              Any dispute arising from use of the site is subject to the
              exclusive jurisdiction of the courts of England and Wales.
              Engagement-specific governing law is set by the applicable
              SOW.
            </p>
          </article>

          <article id="changes">
            <h2 className="text-heading-lg text-white mb-3">
              Changes to these terms
            </h2>
            <p className="text-body-md text-silver">
              We may update these terms when our practices change or as
              regulation evolves. The &ldquo;Last updated&rdquo; date above
              reflects the most recent revision. Continued use of the site
              after changes are posted constitutes acceptance of the
              updated terms.
            </p>
          </article>

          <article id="contact">
            <h2 className="text-heading-lg text-white mb-3">
              Contact
            </h2>
            <p className="text-body-md text-silver">
              Questions about these terms:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
