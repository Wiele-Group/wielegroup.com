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

export type AnySchema =
  | OrganizationSchema
  | WebSiteSchema
  | ServiceSchema
  | ArticleSchema
  | FaqPageSchema
  | BreadcrumbListSchema
  | PersonSchema
  | ProductSchema
  | BlogSchema
  | ItemListSchema
  | AboutPageSchema
  | ContactPageSchema;

/* ─────────────────────────────────────────────────────────────
   Helpers / canonical instances
───────────────────────────────────────────────────────────────── */

export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/wiele-wordmark-on-void-2048.png`,
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
}): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: input.url,
    areaServed: "Worldwide",
    serviceType: input.serviceType,
  };
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
        url: `${siteConfig.url}/brand/wiele-wordmark-on-void-2048.png`,
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
