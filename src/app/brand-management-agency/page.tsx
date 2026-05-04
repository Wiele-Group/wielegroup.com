import type { Metadata } from "next";
import { DivisionPage } from "@/components/sections/division-page";
import { JsonLd } from "@/components/json-ld";
import { getDivisionBySlug } from "@/data/divisions";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  productSchema,
  serviceSchema,
} from "@/lib/schema";

const division = getDivisionBySlug("brand-management-agency")!;

export const metadata: Metadata = buildMetadata({
  title: division.seo.title,
  description: division.seo.description,
  path: `/${division.slug}`,
});

export default function BrandManagementAgencyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: division.eyebrow, url: `${siteConfig.url}/${division.slug}` },
  ]);

  const service = serviceSchema({
    name: `Wiele ${division.eyebrow}`,
    description: division.subhead,
    url: `${siteConfig.url}/${division.slug}`,
    serviceType: "Brand Strategy and Management",
  });

  const faq = faqSchema(
    division.faqs.map((f) => ({ question: f.question, answer: f.answer })),
  );

  const products = division.tiers.map((tier) => {
    const numeric = tier.price.replace(/[^\d]/g, "") + ".00";
    return productSchema({
      name: `Wiele ${division.eyebrow} — ${tier.name}`,
      description: tier.positioning,
      price: numeric,
      priceCurrency: "GBP",
      url: `${siteConfig.url}/${division.slug}#${tier.id}`,
    });
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-brand-management-agency" />
      <JsonLd schema={service} id="schema-service-brand-management-agency" />
      <JsonLd schema={faq} id="schema-faq-brand-management-agency" />
      {products.map((p, i) => (
        <JsonLd
          key={division.tiers[i].id}
          schema={p}
          id={`schema-product-${division.tiers[i].id}`}
        />
      ))}
      <DivisionPage division={division} />
    </>
  );
}
