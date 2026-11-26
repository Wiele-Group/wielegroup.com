import type { Metadata } from "next";

export const propertyBrand = {
  name: "Wiele Investments",
  tagline: "South African roots. Global perspective.",
  url: "https://wielegroup.com",
  email: "admin@wielegroup.com",
  location: "Swieqi, Malta",
  founded: "2026",
  languages: ["English", "Afrikaans"],
  social: {
    facebook: "https://www.facebook.com/wieleinvestments/",
    linkedin: "https://www.linkedin.com/company/wiele-investments/",
  },
  description: "Malta-based brokerage for property, yachts and classic cars. Explore fictional examples, purchase guides and buyer or seller enquiries for the UK, Europe and South Africa.",
} as const;

export const propertyNavigation = [
  { href: "/properties", label: "Property" },
  { href: "/buying", label: "For buyers" },
  { href: "/selling", label: "For sellers" },
  { href: "/luxury-assets", label: "Luxury assets" },
  { href: "/purchase-guide", label: "Purchase guide" },
  { href: "/research", label: "Research" },
  { href: "/valuations", label: "Valuations" },
  { href: "/wiele-algorithm", label: "The Algorithm" },
];

export const propertyLogo = {
  src: "/property-identity/gold-rings/wiele.webp",
  width: 656,
  height: 496,
  organization: "/property-identity/gold-rings/organisation-logo.png",
} as const;

export const DEFAULT_OG_IMAGE = "/og/wiele-gold-rings-20261126.png";
export const defaultOpenGraphImage = {
  url: DEFAULT_OG_IMAGE, width: 1200, height: 630,
  alt: "Gold-ring WIELE logo over an AI-created villa concept for Wiele Investments",
};

export function propertyMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${propertyBrand.name}`;
  return {
    title, description, alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_GB", siteName: propertyBrand.name,
      title: fullTitle, description, url: path,
      images: [defaultOpenGraphImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [{ url: DEFAULT_OG_IMAGE, alt: defaultOpenGraphImage.alt }] },
  };
}
