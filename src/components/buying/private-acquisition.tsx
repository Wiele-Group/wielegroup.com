import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { buyingCopy } from "@/lib/buying-locales";
import { buyingAlternates, buyingPath, buyingUpdated } from "@/lib/buying-locales/routing";
import { mandatePath } from "@/lib/mandate-locales/routing";
import { availableBuyingMedia } from "@/lib/buyingMedia";
import { propertyBrand } from "@/lib/property";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema-graph";
import { contactPath } from "@/lib/contact-locales/routing";
import { AcquisitionBrief } from "./acquisition-brief";
import { DeskProtocol } from "@/components/property/desk-protocol";
import { BuyingImage } from "./buying-image";
import "./private-acquisition.css";

const shareImage = "/images/buying/acquisition-social.png";
const maltaGuidance = "https://mtca.gov.mt/personal-tax/property-taxes/acquisition-of-immovable-property-in-malta-by-non-residents/conditions-for-buying-immovable-property";
const dueDiligence = [
  { media: "maritime", href: maltaGuidance },
  { media: "provenance", href: "/legal-compliance/cross-border" },
  { media: null, href: "/valuations#landed-cost-estimator" },
] as const;

export function buyingMetadata(locale: HomeLocale): Metadata {
  const copy = buyingCopy[locale];
  const path = buyingPath(locale);
  const title = `${copy.title} | ${propertyBrand.name}`;
  const localeCode = homeLanguages[locale].og;
  const image = { url: shareImage, width: 1200, height: 630, alt: copy.socialAlt };
  return {
    title: { absolute: title }, description: copy.description,
    alternates: { canonical: path, languages: buyingAlternates },
    openGraph: {
      type: "website", url: path, siteName: propertyBrand.name, locale: localeCode,
      alternateLocale: Object.values(homeLanguages).map(lang => lang.og).filter(tag => tag !== localeCode),
      title, description: copy.description, images: [image],
    },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [image] },
  };
}

export function PrivateAcquisition({ locale }: { locale: HomeLocale }) {
  const copy = buyingCopy[locale];
  const { tag, path: homePath } = homeLanguages[locale];
  const path = buyingPath(locale);
  const url = propertyBrand.url + path;
  const hero = availableBuyingMedia("hero");
  return (
    <div className="acq-page" lang={tag}>
      <JsonLdGraph includeCore={false} nodes={[
        { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.title, description: copy.description,
          inLanguage: tag, dateModified: buyingUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` }, mainEntity: { "@id": `${url}#service` },
          hasPart: { "@id": `${url}#questions` }, citation: [maltaGuidance],
          primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (hero ?? shareImage),
            description: hero ? copy.imageAlt.hero : copy.socialAlt } },
        { "@type": "Service", "@id": `${url}#service`, url, name: copy.eyebrow, description: copy.description,
          provider: { "@id": `${propertyBrand.url}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` } },
        buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.title, path }]),
        { ...buildFaqSchema(copy.faqs), "@id": `${url}#questions`, url: `${url}#questions`, inLanguage: tag },
      ]} />
      <section className="acq-hero" aria-labelledby="acq-title">
        <BuyingImage media="hero" alt={copy.imageAlt.hero} credit={copy.artwork} />
        <div className="acq-wrap acq-hero-inner">
          <nav className="acq-language" aria-label={copy.language}>
            {(Object.keys(homeLanguages) as HomeLocale[]).map(key => (
              <Link key={key} href={buyingPath(key)} hrefLang={homeLanguages[key].tag} lang={homeLanguages[key].tag}
                aria-label={homeLanguages[key].name} aria-current={locale === key ? "page" : undefined}>{key.toUpperCase()}</Link>
            ))}
          </nav>
          <p className="acq-eyebrow">{copy.eyebrow}</p>
          <h1 id="acq-title">{copy.title}</h1>
          <p className="acq-hero-copy">{copy.intro}</p>
          <a className="acq-button acq-button-primary" href="#acquisition-brief">{copy.start} <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <div className="acq-wrap">
        <p className="acq-scope">{copy.scope}</p>
        <DeskProtocol copy={copy} sectionId="acquisition-protocol" stageId="acquisition-stage" />
        <section className="acq-section" id="due-diligence" aria-labelledby="acq-matrix-title">
          <div className="acq-heading"><h2 id="acq-matrix-title">{copy.matrixTitle}</h2><p>{copy.matrixIntro}</p></div>
          <div className="acq-matrix">
            {dueDiligence.map(({ media, href }, index) => {
              const [title, description, label] = copy.protections[index];
              return (
                <article key={href} className="acq-protection">
                  {media && <div className="acq-protection-image"><BuyingImage media={media} alt={copy.imageAlt[media]} credit={copy.artwork} /></div>}
                  <div className="acq-protection-copy">
                    <h3>{title}</h3><p>{description}</p>
                    <Link className="acq-link" href={href} hrefLang="en-GB">{label} <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <span id="buyer-briefs" className="acq-legacy-anchor" aria-hidden="true" />
        <section className="acq-section acq-brief" id="acquisition-brief" aria-labelledby="acq-brief-title">
          <div><h2 id="acq-brief-title">{copy.brief.title}</h2><p>{copy.brief.intro}</p></div>
          <AcquisitionBrief copy={copy.brief} correspondencePath={contactPath(locale)} language={homeLanguages[locale].tag} />
        </section>
        <section className="acq-section acq-faq" id="questions" aria-labelledby="acq-faq-title">
          <div><h2 id="acq-faq-title">{copy.faqTitle}</h2>
            <Link className="acq-link" href={mandatePath(locale)} hrefLang={tag}>{copy.mandates} <span aria-hidden="true">↗</span></Link></div>
          <div>{copy.faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>
      </div>
    </div>
  );
}
