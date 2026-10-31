import { propertyBrand } from "@/lib/property";

export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function PageStructuredData({ path, title, description }: { path: string; title: string; description: string }) {
  const url = `${propertyBrand.url}${path}`;
  const service = path === "/selling" ? {
    name: "Malta investment property marketing",
    description: "Property presentation and marketing for owners in Malta, based on verified particulars, income evidence, lease terms, costs and material limitations. Scope and costs are agreed before work begins.",
  } : path === "/buying" ? {
    name: "Malta property buyer introductions",
    description: "Property briefs and introductions for local and international buyers considering income-focused acquisitions or premium residences in Malta. No properties are currently advertised.",
  } : path === "/property-maintenance" ? {
    name: "Wiele Property Maintenance",
    description: "Wiele-managed and operated property maintenance in Malta: repairs and fittings, painting and making-good, kitchen and bathroom upkeep, planned maintenance, property care visits and preparation for sale or occupation. Work and availability are agreed per property.",
  } : undefined;
  return <StructuredData data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "en-GB", isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` }, breadcrumb: { "@id": `${url}#breadcrumb` }, ...(service ? { mainEntity: { "@id": `${url}#service` } } : {}) },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${propertyBrand.url}/` }, { "@type": "ListItem", position: 2, name: title, item: url }] },
    ...(service ? [{ "@type": "Service", "@id": `${url}#service`, url, ...service, provider: { "@id": `${propertyBrand.url}/#organization` }, areaServed: { "@type": "Country", name: "Malta" }, mainEntityOfPage: { "@id": `${url}#webpage` } }] : []),
  ] }} />;
}
