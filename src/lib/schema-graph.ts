import { investmentReport } from "./investment-report";
import { propertyBrand } from "./property";
import { propertyFaqs } from "./property-faqs";
import { propertyMarket } from "./property-market";
import { maltaReportDescription, SITE_URL } from "./seo-metadata";

const organization = { "@id": `${SITE_URL}/#organization` };
const principal = { "@id": `${SITE_URL}/#jonathan-landman` };

export function buildCoreEntityGraph() {
  return [
    {
      "@type": "Organization",
      ...organization,
      name: propertyBrand.name,
      slogan: propertyBrand.tagline,
      alternateName: ["Wiele Properties", "Wiele Property", "Wiele Group", "WieleGroup"],
      url: SITE_URL,
      email: propertyBrand.email,
      description: propertyBrand.description,
      logo: `${SITE_URL}/property-identity/reflective-gold/organisation-icon.png`,
      foundingDate: propertyBrand.founded,
      address: { "@type": "PostalAddress", addressLocality: "Swieqi", addressCountry: "MT" },
      sameAs: Object.values(propertyBrand.social),
      contactPoint: { "@type": "ContactPoint", email: propertyBrand.email, contactType: "customer enquiries", availableLanguage: propertyBrand.languages },
    },
    {
      "@type": "Person",
      ...principal,
      name: "Jonathan Landman",
      worksFor: organization,
      knowsLanguage: propertyBrand.languages,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: propertyBrand.name,
      alternateName: ["Wiele Properties", "wielegroup.com"],
      description: propertyBrand.description,
      inLanguage: "en-GB",
      publisher: organization,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#brokerage-service`,
      name: "Wiele Investments property and luxury asset enquiries",
      serviceType: ["Property sales and acquisition enquiries", "Yacht and classic car mandate enquiries", "Indicative valuation briefs"],
      provider: organization,
      description: propertyBrand.description,
      areaServed: ["Malta", "United Kingdom", "Europe", "South Africa"],
      termsOfService: `${SITE_URL}/terms/seller-retainer`,
    },
  ];
}

export function buildBreadcrumbSchema(items: readonly { name: string; path: string }[]) {
  const current = items.at(-1);
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${current?.path ?? "/"}#breadcrumb`,
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export const HOME_AEO_FAQS = [
  ...propertyFaqs.filter(faq =>
    ["What is Wiele?", "Is Wiele focused only on Malta?", "How do I start an enquiry?"].includes(faq.question)
  ),
  {
    question: "Can I buy the assets shown in the example dossiers?",
    answer: "The open dossiers show fictional property, yacht and classic-car examples with AI-created visuals. Contact Wiele to discuss a brief for an actual asset.",
  },
  {
    question: "How does the seller marketing mandate work?",
    answer: "The published terms describe a per-asset marketing retainer, a minimum commitment and a credit for net retainers paid against commission on qualifying completions. Malta property engagements require a licensed local intermediary and separately agreed lawful fee arrangements.",
  },
  {
    question: "Who handles formal transaction documentation?",
    answer: "Appropriately licensed practitioners in the relevant jurisdiction handle formal transaction documents and other regulated work. Wiele coordinates the asset brief, marketing preparation and introductions within the agreed scope.",
  },
];

export function buildFaqSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function buildMaltaReportSchema() {
  const url = `${SITE_URL}${investmentReport.path}`;
  return {
    "@type": "Report",
    "@id": `${url}#report`,
    url,
    name: "Malta Investment Property Report 2026",
    headline: "Malta Investment Property Report: 2025 Review and 2026 Outlook",
    description: maltaReportDescription,
    datePublished: investmentReport.published,
    dateModified: investmentReport.updated,
    inLanguage: "en-GB",
    author: organization,
    publisher: organization,
    about: { "@type": "Place", name: "Malta" },
    citation: [propertyMarket.sources.prices, propertyMarket.sources.transactions, propertyMarket.sources.octoberDecision],
    isAccessibleForFree: true,
    conditionsOfAccess: "Complimentary PDF after name and email registration. Marketing consent is optional.",
    image: `${SITE_URL}/property/report-research-20261102-social.jpg`,
  };
}
