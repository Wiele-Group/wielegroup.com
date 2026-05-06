import { siteConfig } from "./metadata";

/**
 * Schema.org payloads — typed, server-built, consumed by <JsonLd>.
 * Authority: founder reinforcement #2 from Phase 4 brief — discriminated
 * union over 8 schema types, each route imports the helpers it needs.
 *
 * The component (src/components/json-ld.tsx) does the JSON.stringify +
 * '<' → '<' hardening; these helpers just shape data.
 */

/* ─────────────────────────────────────────────────────────────
   Type-safe schema interfaces (8 types)
───────────────────────────────────────────────────────────────── */

type SchemaBase = { "@context": "https://schema.org" };

export type OrganizationSchema = SchemaBase & {
  "@type": "Organization";
  name: string;
  legalName?: string;
  url: string;
  logo?: string;
  description?: string;
  founder?: PersonRef;
  contactPoint?: { "@type": "ContactPoint"; email: string; contactType: string };
  sameAs?: string[];
  areaServed?: string;
  knowsAbout?: string[];
};

export type WebSiteSchema = SchemaBase & {
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  publisher?: { "@type": "Organization"; name: string; url: string };
};

export type ServiceSchema = SchemaBase & {
  "@type": "Service";
  name: string;
  description: string;
  provider: { "@type": "Organization"; name: string; url: string };
  url: string;
  areaServed?: string;
  serviceType?: string;
  hasOfferCatalog?: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: {
      "@type": "Offer";
      itemOffered: { "@type": "Service"; name: string; description?: string };
    }[];
  };
};

export type ArticleSchema = SchemaBase & {
  "@type": "Article";
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: PersonRef;
  publisher: { "@type": "Organization"; name: string; url: string; logo?: { "@type": "ImageObject"; url: string } };
  image?: string;
  articleSection?: string;
};

export type FaqPageSchema = SchemaBase & {
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
};

export type BreadcrumbListSchema = SchemaBase & {
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
};

type PersonRef = { "@type": "Person"; name: string; url?: string };

export type PersonSchema = SchemaBase & {
  "@type": "Person";
  name: string;
  url?: string;
  jobTitle?: string;
  worksFor?: { "@type": "Organization"; name: string; url: string };
  sameAs?: string[];
};

export type ProductSchema = SchemaBase & {
  "@type": "Product";
  name: string;
  description: string;
  brand: { "@type": "Brand"; name: string };
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability?: string;
    url?: string;
  };
};

/**
 * v3.0.4 — per-tier Service schema with a singular `offers` Offer.
 *
 * Distinct from `ServiceSchema` (which models page-level descriptions
 * via `hasOfferCatalog`). This type represents a single priced tier of
 * an agency service (e.g. "Marketing System £4,500/mo") and is the
 * semantically correct replacement for the old per-tier Product schema
 * that GSC flagged as invalid Merchant Listings on division pages.
 *
 * `priceSpecification` is optional — only set for recurring (monthly)
 * tiers. One-off and fixed-scope tiers carry just `price` + `priceCurrency`
 * on the Offer.
 */
export type ServiceTierSchema = SchemaBase & {
  "@type": "Service";
  name: string;
  description: string;
  provider: { "@type": "Organization"; name: string; url: string };
  serviceType: string;
  areaServed: { "@type": "Place"; name: string };
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    url: string;
    priceSpecification?: {
      "@type": "UnitPriceSpecification";
      price: string;
      priceCurrency: string;
      billingDuration: string;
      billingIncrement: number;
    };
  };
};

/* ─────────────────────────────────────────────────────────────
   Phase 7.1 schema additions — Blog, ItemList, AboutPage, ContactPage
───────────────────────────────────────────────────────────────── */

export type BlogSchema = SchemaBase & {
  "@type": "Blog";
  name: string;
  url: string;
  description?: string;
  publisher?: { "@type": "Organization"; name: string; url: string };
  blogPost?: {
    "@type": "BlogPosting";
    headline: string;
    url: string;
    datePublished: string;
    author?: PersonRef;
  }[];
};

export type ItemListSchema = SchemaBase & {
  "@type": "ItemList";
  name?: string;
  itemListElement: {
    "@type": "ListItem";
    position: number;
    url: string;
    name: string;
  }[];
};

export type AboutPageSchema = SchemaBase & {
  "@type": "AboutPage";
  name: string;
  url: string;
  description?: string;
  about?: PersonRef;
};

export type ContactPageSchema = SchemaBase & {
  "@type": "ContactPage";
  name: string;
  url: string;
  description?: string;
};

export type WebPageSchema = SchemaBase & {
  "@type": "WebPage";
  name: string;
  url: string;
  description?: string;
  isPartOf?: { "@type": "WebSite"; name: string; url: string };
  inLanguage?: string;
  datePublished?: string;
  dateModified?: string;
  publisher?: { "@type": "Organization"; name: string; url: string };
};

export type HowToSchema = SchemaBase & {
  "@type": "HowTo";
  name: string;
  description?: string;
  totalTime?: string;
  step: {
    "@type": "HowToStep";
    position: number;
    name: string;
    text: string;
    url?: string;
  }[];
};

export type AnySchema =
  | OrganizationSchema
  | WebSiteSchema
  | ServiceSchema
  | ServiceTierSchema
  | ArticleSchema
  | FaqPageSchema
  | BreadcrumbListSchema
  | PersonSchema
  | ProductSchema
  | BlogSchema
  | ItemListSchema
  | AboutPageSchema
  | ContactPageSchema
  | WebPageSchema
  | HowToSchema;

/* ─────────────────────────────────────────────────────────────
   Helpers / canonical instances
───────────────────────────────────────────────────────────────── */

export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/wiele-wordmark-chrome-2000.png`,
  description: siteConfig.description,
  founder: { "@type": "Person", name: siteConfig.founder },
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.email,
    contactType: "sales",
  },
  sameAs: [siteConfig.socials.linkedin, siteConfig.socials.x],
  areaServed: "Worldwide",
  knowsAbout: [
    "AI Visibility",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Search Engine Optimization",
    "Brand Authority",
    "AI Recommendation Systems",
    "Growth Systems",
  ],
};

export const websiteSchema: WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  offerCatalog?: {
    name: string;
    items: { name: string; description?: string }[];
  };
}): ServiceSchema {
  const base: ServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: input.url,
    areaServed: "Worldwide",
    serviceType: input.serviceType,
  };
  if (input.offerCatalog) {
    base.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: input.offerCatalog.name,
      itemListElement: input.offerCatalog.items.map((it) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: it.name,
          description: it.description,
        },
      })),
    };
  }
  return base;
}

export function articleSchema(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  image?: string;
  articleSection?: string;
}): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@type": "Person", name: input.authorName, url: `${siteConfig.url}/about#founder` },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/wiele-wordmark-chrome-2000.png`,
      },
    },
    image: input.image,
    articleSection: input.articleSection,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): FaqPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function personSchema(input: {
  name: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
}): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    url: input.url,
    jobTitle: input.jobTitle,
    worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    sameAs: input.sameAs,
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  url?: string;
}): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: input.price,
      priceCurrency: input.priceCurrency,
      availability: "https://schema.org/InStock",
      url: input.url,
    },
  };
}

export function serviceTierSchema(input: {
  name: string;
  description: string;
  serviceType: string;
  price: string;
  priceCurrency: string;
  url: string;
  recurring?: boolean;
}): ServiceTierSchema {
  const offers: ServiceTierSchema["offers"] = {
    "@type": "Offer",
    price: input.price,
    priceCurrency: input.priceCurrency,
    url: input.url,
  };
  if (input.recurring) {
    offers.priceSpecification = {
      "@type": "UnitPriceSpecification",
      price: input.price,
      priceCurrency: input.priceCurrency,
      billingDuration: "P1M",
      billingIncrement: 1,
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    serviceType: input.serviceType,
    areaServed: { "@type": "Place", name: "Worldwide" },
    offers,
  };
}

/* ─────────────────────────────────────────────────────────────
   Phase 7.1 helpers — Blog, ItemList, AboutPage, ContactPage
───────────────────────────────────────────────────────────────── */

export function blogSchema(input: {
  name: string;
  url: string;
  description: string;
  posts: { headline: string; url: string; datePublished: string; authorName: string }[];
}): BlogSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: input.name,
    url: input.url,
    description: input.description,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    blogPost: input.posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.headline,
      url: p.url,
      datePublished: p.datePublished,
      author: { "@type": "Person", name: p.authorName },
    })),
  };
}

export function itemListSchema(input: {
  name?: string;
  items: { url: string; name: string }[];
}): ItemListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: item.url,
      name: item.name,
    })),
  };
}

export function aboutPageSchema(input: {
  name: string;
  url: string;
  description: string;
  aboutPersonName?: string;
}): AboutPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: input.name,
    url: input.url,
    description: input.description,
    about: input.aboutPersonName
      ? { "@type": "Person", name: input.aboutPersonName, url: `${siteConfig.url}/about#founder` }
      : undefined,
  };
}

export function contactPageSchema(input: {
  name: string;
  url: string;
  description: string;
}): ContactPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: input.name,
    url: input.url,
    description: input.description,
  };
}

/* ─────────────────────────────────────────────────────────────
   v2.4 helpers — WebPage (legal docs), HowTo (multi-step processes)
───────────────────────────────────────────────────────────────── */

export function webPageSchema(input: {
  name: string;
  url: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}): WebPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    url: input.url,
    description: input.description,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    inLanguage: "en-GB",
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function howToSchema(input: {
  name: string;
  description?: string;
  totalTime?: string;
  steps: { name: string; text: string; url?: string }[];
}): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    totalTime: input.totalTime,
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: s.url,
    })),
  };
}
