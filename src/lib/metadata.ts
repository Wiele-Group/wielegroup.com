import type { Metadata } from "next";

export const siteConfig = {
  name: "Wiele",
  legalName: "Wiele Group",
  url: "https://wielegroup.com",
  descriptor: "Premium Marketing Agency",
  // v3.9.3 — USP crystallization pass (Reeves three-gate: Proposition / Unique / Pull).
  // The owned mantra "Citation, not clicks." leads the tagline so the H1 carries the
  // proposition itself, the mechanism ("we engineer"), and the pull ("the brand AI engines
  // choose"). Source-of-truth tagline; render the same line in document <title>, hero H1,
  // OpenGraph, and Twitter card.
  tagline: "Citation, not clicks. We engineer the brand AI engines choose.",
  // Tight 151-char meta description — USP-led, decision-verb-led, repeats the mantra so
  // SERP snippets and AI Overviews quote it back. Doubles as the hero sub-lede; reads
  // clean in both surfaces.
  description:
    "Wiele Group engineers brands AI engines cite. Brand, marketing, web, ads, SEO, AI search — six disciplines, one operating system. Citation, not clicks.",
  founder: "Jonathan Landman",
  email: "admin@wielegroup.com",
  ogImage: "/og-image.png",
  twitterHandle: "@wielegroup",
  socials: {
    linkedin: "https://linkedin.com/company/wiele-group",
    x: "https://x.com/wielegroup",
    founderLinkedin: "https://www.linkedin.com/in/jonathan-b-landman",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data) };
}

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
};

/**
 * Per-route metadata helper. Pass `path` (e.g. "/audit") and the canonical URL,
 * OG image, and Twitter card are wired automatically.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  ogImage = siteConfig.ogImage,
  noindex = false,
}: BuildMetadataInput = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const url = new URL(path, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    // v3.9.2 — AI-maximisation robots directive (Wiele doctrine dogfood).
    // Per Google's Robots Meta Tag doc, `max-snippet:-1` + `max-image-preview:large`
    // + `max-video-preview:-1` are the explicit OPT-IN levers for full AI
    // Overviews + AI Mode citation eligibility. Most enterprise sites are
    // accidentally opted out via legacy `nosnippet` defaults; wielegroup.com
    // explicitly opts in site-wide as the Wiele OS reference implementation.
    // Source: developers.google.com/search/docs/crawling-indexing/robots-meta-tag
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      site: siteConfig.twitterHandle,
    },
  };
}
