import type { Metadata } from "next";
import { DivisionPage } from "@/components/sections/division-page";
import { JsonLd } from "@/components/json-ld";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata, siteConfig } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  serviceTierSchema,
} from "@/lib/schema";

const service = getServiceBySlug("ai-visibility-monitoring")!;

export const metadata: Metadata = buildMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: `/services/${service.slug}`,
});

export default function AiVisibilityMonitoringPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: service.eyebrow, url: `${siteConfig.url}/services/${service.slug}` },
  ]);

  const serviceLd = serviceSchema({
    name: `Wiele ${service.eyebrow}`,
    description: service.subhead,
    url: `${siteConfig.url}/services/${service.slug}`,
    serviceType: "AI Visibility Monitoring Retainer",
    offerCatalog: {
      name: "AI Visibility Monitoring tiers",
      items: [
        {
          name: "AI Visibility Monitoring — Lite",
          description: "25-prompt panel, four engines monthly, citation share + source weight, top 3 actions, monthly founder-signed report.",
        },
        {
          name: "AI Visibility Monitoring — Standard",
          description: "60-prompt panel, 3 named competitors, live dashboard, modelled influenced pipeline, top 5 actions with spec docs, quarterly QBR.",
        },
        {
          name: "AI Visibility Monitoring — Pro",
          description: "100-prompt panel, bi-weekly runs, 5 competitors, featured snippet capture, full pipeline modelling, 2 Wiele-executed quick wins, 90-min founder QBR.",
        },
      ],
    },
  });

  const faq = faqSchema(
    service.faqs.map((f) => ({ question: f.question, answer: f.answer })),
  );

  const serviceTiers = service.tiers.map((tier) => {
    const numeric = tier.price.replace(/[^\d]/g, "") + ".00";
    return serviceTierSchema({
      name: `Wiele ${service.eyebrow} — ${tier.name}`,
      description: tier.positioning,
      serviceType: "AI Visibility Monitoring",
      price: numeric,
      priceCurrency: "EUR",
      url: `${siteConfig.url}/services/${service.slug}#${tier.id}`,
      recurring: tier.cadence.includes("/ month"),
    });
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-ai-visibility-monitoring" />
      <JsonLd schema={serviceLd} id="schema-service-ai-visibility-monitoring" />
      <JsonLd schema={faq} id="schema-faq-ai-visibility-monitoring" />
      {serviceTiers.map((s, i) => (
        <JsonLd
          key={service.tiers[i].id}
          schema={s}
          id={`schema-service-tier-${service.tiers[i].id}`}
        />
      ))}
      <DivisionPage division={service} />
    </>
  );
}
