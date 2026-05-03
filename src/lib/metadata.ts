import type { Metadata } from "next";

export const siteConfig = {
  name: "Wiele",
  legalName: "Wiele Group",
  url: "https://wielegroup.com",
  descriptor: "AI Growth Systems",
  tagline: "Be the brand AI recommends.",
  description:
    "Wiele builds AI-native growth systems that turn expertise into visibility, trust, and demand across search engines, answer engines, and AI recommendation layers.",
  founder: "Jonathan Landman",
  email: "hello@wielegroup.com",
  ogImage: "/og-image.png",
  twitterHandle: "@wielegroup",
  socials: {
    linkedin: "https://linkedin.com/company/wiele-group",
    x: "https://x.com/wielegroup",
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
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
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
