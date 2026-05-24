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

const service = getServiceBySlug("premium-brand-site-system")!;

export const metadata: Metadata = buildMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: `/services/${service.slug}`,
});

export default function PremiumBrandSiteSystemPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: service.eyebrow, url: `${siteConfig.url}/services/${service.slug}` },
  ]);

  const serviceLd = serviceSchema({
    name: `Wiele ${service.eyebrow}`,
    description: service.subhead,
    url: `${siteConfig.url}/services/${service.slug}`,
    serviceType: "Premium Web Design and Development System",
    offerCatalog: {
      name: "Premium Brand Site System engagement shapes",
      items: [
        {
          name: "Premium Brand Site System — Foundation Build",
          description:
            "Token-first design system, 5-mode delivery, 8–12 page Next.js + Cloudflare production build, AI-Search-Native content layer, llms.txt, schema.org, contractual Core Web Vitals SLA. Fixed scope, 6–8 weeks.",
        },
        {
          name: "Premium Brand Site System — Authority Retainer",
          description:
            "1,200 AI revision credits per month, continuous CWV + SEO monitoring, AI Visibility Defense (citation tracking, prompt-injection surface audit), conversion optimisation, design-system extension.",
        },
        {
          name: "Premium Brand Site System — Sovereign Concierge",
          description:
            "Unlimited AI revision credits, private AI routing, embedded brand-defense engineering team, multi-domain and multi-language scope, direct founder access, 24-hour response SLA.",
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
      serviceType: "Premium Brand Site System",
      price: numeric,
      priceCurrency: "EUR",
      url: `${siteConfig.url}/services/${service.slug}#${tier.id}`,
      recurring: tier.cadence.includes("/ month"),
    });
  });

  return (
    <>
      <JsonLd schema={breadcrumbs} id="schema-breadcrumb-premium-brand-site-system" />
      <JsonLd schema={serviceLd} id="schema-service-premium-brand-site-system" />
      <JsonLd schema={faq} id="schema-faq-premium-brand-site-system" />
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
