import type { Metadata } from "next";
import { DivisionPage } from "@/components/sections/division-page";
import { JsonLd } from "@/components/json-ld";
import { getDivisionBySlug } from "@/data/divisions";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  serviceTierSchema,
} from "@/lib/schema";

const division = getDivisionBySlug("marketing-agency")!;

export const metadata: Metadata = buildMetadata({
  title: division.seo.title,
  description: division.seo.description,
  path: `/${division.slug}`,
});

export default function MarketingAgencyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: division.eyebrow, url: `${siteConfig.url}/${division.slug}` },
  ]);

  const service = serviceSchema({
    name: `Wiele ${division.eyebrow}`,
    description: division.subhead,
    url: `${siteConfig.url}/${division.slug}`,
    serviceType: "Marketing Strategy and Operations",
  });

  const faq = faqSchema(
    division.faqs.map((f) => ({ question: f.question, answer: f.answer })),
  );

  const serviceTiers = division.tiers.map((tier) => {
    const numeric = tier.price.replace(/[^\d]/g, "") + ".00";
    return serviceTierSchema({
      name: `Wiele ${division.eyebrow} — ${tier.name}`,
      description: tier.positioning,
      serviceType: division.eyebrow.replace(" Agency", ""),
      price: numeric,
      priceCurrency: "GBP",
      url: `${siteConfig.url}/${division.slug}#${tier.id}`,
      recurring: tier.cadence.includes("/ month"),
    });
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-marketing-agency" />
      <JsonLd schema={service} id="schema-service-marketing-agency" />
      <JsonLd schema={faq} id="schema-faq-marketing-agency" />
      {serviceTiers.map((s, i) => (
        <JsonLd
          key={division.tiers[i].id}
          schema={s}
          id={`schema-service-tier-${division.tiers[i].id}`}
        />
      ))}
      <DivisionPage division={division} />
    </>
  );
}
