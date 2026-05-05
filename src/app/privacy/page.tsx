import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const LAST_UPDATED = "2026-05-05";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description:
    "How Wiele Group collects, uses, and protects personal data on wielegroup.com. Cookieless analytics, no third-party trackers, data hosted at the EU edge.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Privacy", url: `${siteConfig.url}/privacy` },
  ]);
  const webPage = webPageSchema({
    name: "Privacy Policy",
    url: `${siteConfig.url}/privacy`,
    description:
      "How Wiele Group collects, uses, and protects personal data on wielegroup.com.",
    datePublished: "2026-05-05",
    dateModified: LAST_UPDATED,
  });

  return (
    <>
      <JsonLd schema={webPage} id="schema-webpage-privacy" />
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-privacy" />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ambient-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-[var(--container-px)] pt-16 md:pt-24 pb-12 md:pb-16">
          <FadeIn>
            <Badge variant="electric" size="sm" className="mb-5">
              Privacy
            </Badge>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-display-xl text-white text-balance mb-5">
              How Wiele handles your data.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-body-lg text-silver max-w-2xl">
              {siteConfig.legalName} (&ldquo;Wiele&rdquo;, &ldquo;we&rdquo;,
              &ldquo;our&rdquo;) operates {siteConfig.url}. This page explains
              what data we collect, why, where it lives, and how to exercise
              your rights under UK GDPR and equivalent regimes.
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
          <article id="data-controller">
            <h2 className="text-heading-lg text-white mb-3">
              Data controller
            </h2>
            <p className="text-body-md text-silver">
              {siteConfig.legalName} is the data controller for personal data
              submitted via this site. Contact:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </article>

          <article id="what-we-collect">
            <h2 className="text-heading-lg text-white mb-3">
              What we collect
            </h2>
            <ul className="text-body-md text-silver flex flex-col gap-3 pl-5 list-disc marker:text-electric">
              <li>
                <strong className="text-white">Form submissions</strong> —
                when you submit the Signal Audit (
                <Link
                  href="/audit"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  /audit
                </Link>
                ), Contact (
                <Link
                  href="/contact"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  /contact
                </Link>
                ), or Onboarding (
                <Link
                  href="/onboarding"
                  className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
                >
                  /onboarding
                </Link>
                ) forms, we collect what you provide: name, email, company,
                website, industry, and any free-text context. Lawful basis:
                legitimate interest (responding to a commercial enquiry) or
                consent (where we follow up by email).
              </li>
              <li>
                <strong className="text-white">Anonymous analytics</strong> —
                aggregate traffic data via Plausible (cookieless, no IP
                logging at the user level, no cross-site tracking, no
                fingerprinting). Lawful basis: legitimate interest in
                understanding which pages serve our visitors.
              </li>
              <li>
                <strong className="text-white">Bot-protection signals</strong>{" "}
                — Cloudflare Turnstile produces an anonymous proof-of-human
                token at form submission. No persistent identifier is stored.
              </li>
              <li>
                <strong className="text-white">Server logs</strong> —
                Cloudflare records standard request data (IP, user agent,
                timestamp) for security and abuse prevention. Retained per
                Cloudflare&apos;s retention schedule.
              </li>
            </ul>
          </article>

          <article id="what-we-do-not-collect">
            <h2 className="text-heading-lg text-white mb-3">
              What we do not collect
            </h2>
            <p className="text-body-md text-silver">
              No advertising cookies. No cross-site trackers. No social
              widgets that exfiltrate visit data to third-party platforms. No
              session replay tools. No fingerprinting. No data brokers.
            </p>
          </article>

          <article id="where-data-lives">
            <h2 className="text-heading-lg text-white mb-3">
              Where your data lives
            </h2>
            <ul className="text-body-md text-silver flex flex-col gap-3 pl-5 list-disc marker:text-electric">
              <li>
                <strong className="text-white">Form submissions</strong> live
                in Cloudflare Workers KV at the EU edge until they are pulled
                into the engagement that follows from your enquiry.
              </li>
              <li>
                <strong className="text-white">Transactional email</strong> —
                Resend (US/EU dual-region) sends confirmation and operational
                email tied to your enquiry.
              </li>
              <li>
                <strong className="text-white">Analytics</strong> — Plausible
                (EU-hosted), no personally identifying data leaves the
                browser.
              </li>
              <li>
                <strong className="text-white">Bot protection</strong> —
                Cloudflare Turnstile, anonymous tokens only.
              </li>
            </ul>
          </article>

          <article id="how-long-we-keep-it">
            <h2 className="text-heading-lg text-white mb-3">
              How long we keep it
            </h2>
            <p className="text-body-md text-silver">
              Form submissions are retained for the duration of the resulting
              engagement plus seven years for accounting and legal purposes,
              or deleted on request once no commercial relationship is
              outstanding. Analytics are retained in aggregate indefinitely
              and are not tied to identifiable individuals.
            </p>
          </article>

          <article id="your-rights">
            <h2 className="text-heading-lg text-white mb-3">
              Your rights
            </h2>
            <p className="text-body-md text-silver">
              Under UK GDPR you have the right to access, rectify, erase,
              restrict, or port your personal data, and to object to
              processing. To exercise any of these, email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              from the address on file. We respond within one business day
              and complete the action within thirty days.
            </p>
          </article>

          <article id="children">
            <h2 className="text-heading-lg text-white mb-3">
              Children
            </h2>
            <p className="text-body-md text-silver">
              {siteConfig.url} is a B2B site addressed to business decision
              makers. We do not knowingly collect data from anyone under 16.
            </p>
          </article>

          <article id="changes">
            <h2 className="text-heading-lg text-white mb-3">
              Changes to this policy
            </h2>
            <p className="text-body-md text-silver">
              We update this page when our data practices change. The
              &ldquo;Last updated&rdquo; date at the top reflects the most
              recent revision. Material changes will be flagged on the home
              page.
            </p>
          </article>

          <article id="contact">
            <h2 className="text-heading-lg text-white mb-3">
              Contact
            </h2>
            <p className="text-body-md text-silver">
              Privacy questions or rights requests:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              . You also have the right to lodge a complaint with your local
              data protection authority — in the UK, the Information
              Commissioner&apos;s Office (
              <a
                href="https://ico.org.uk/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-electric hover:text-electric-light underline-offset-4 hover:underline"
              >
                ico.org.uk
              </a>
              ).
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
