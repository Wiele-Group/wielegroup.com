import { Fragment } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { luxuryAssetsCopy } from "@/lib/luxury-assets-locales";
import { luxuryAssetsAlternates, luxuryAssetsPath, luxuryAssetsUpdated } from "@/lib/luxury-assets-locales/routing";
import { mandatePath } from "@/lib/mandate-locales/routing";
import { mandateAssetKeys } from "@/lib/mandate-asset-filter";
import { mandateSummary } from "@/lib/mandateAgreement";
import { availableLuxuryAssetsMedia } from "@/lib/luxuryAssetsMedia";
import { propertyBrand } from "@/lib/property";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema-graph";
import { DeskImage } from "./desk-image";
import "../buying/private-acquisition.css";
import "./specialist-desks.css";

const chapter644 = "https://legislation.mt/eli/cap/644/eng/portalpdf";
const shareImage = "/images/luxury-assets/specialist-desks-social.png";
const desks = [
  { media: "estate", asset: mandateAssetKeys[0], guide: "/purchase-guide" },
  { media: "yacht", asset: mandateAssetKeys[1], guide: "/luxury-assets/yachts" },
  { media: "collector", asset: mandateAssetKeys[2], guide: "/luxury-assets/classic-cars" },
] as const;
const matrix = ["scale", "inspection", "settlement", "liquidity", "holding", "lead"] as const;

export function specialistDesksMetadata(locale: HomeLocale): Metadata {
  const copy = luxuryAssetsCopy[locale];
  const path = luxuryAssetsPath(locale);
  const title = `${copy.title} | ${propertyBrand.name}`;
  const og = homeLanguages[locale].og;
  const image = { url: shareImage, width: 1200, height: 630, alt: copy.socialAlt };
  return {
    title: { absolute: title }, description: copy.description,
    alternates: { canonical: path, languages: luxuryAssetsAlternates },
    openGraph: { title, description: copy.description, url: path, siteName: propertyBrand.name,
      locale: og, alternateLocale: Object.values(homeLanguages).map(lang => lang.og).filter(tag => tag !== og),
      type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description: copy.description, images: [image] },
  };
}

export function SpecialistDesks({ locale }: { locale: HomeLocale }) {
  const copy = luxuryAssetsCopy[locale];
  const { tag, path: homePath } = homeLanguages[locale];
  const path = luxuryAssetsPath(locale);
  const url = propertyBrand.url + path;
  const mandates = mandatePath(locale);
  const hero = availableLuxuryAssetsMedia("hero");
  return (
    <div className="acq-page triad-page" lang={tag}>
      <JsonLdGraph includeCore={false} nodes={[
        { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.title, description: copy.description,
          inLanguage: tag, dateModified: luxuryAssetsUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` }, hasPart: { "@id": `${url}#faq` }, citation: [chapter644],
          mainEntity: { "@type": "ItemList", name: copy.explorerTitle, numberOfItems: desks.length,
            itemListElement: copy.desks.map((desk, index) => ({ "@type": "ListItem", position: index + 1,
              name: desk.name, url: propertyBrand.url + desks[index].guide })) },
          primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (hero ?? shareImage),
            description: hero ? copy.alt.hero : copy.socialAlt } },
        buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.title, path }]),
        { ...buildFaqSchema(copy.faqs), "@id": `${url}#faq`, url: `${url}#faq`, inLanguage: tag },
      ]} />
      <section className="acq-hero triad-hero" aria-labelledby="triad-title">
        <DeskImage media="hero" alt={copy.alt.hero} caption={copy.artwork} />
        {hero && <span className="acq-image-credit triad-hero-credit">{copy.artwork}</span>}
        <div className="acq-wrap acq-hero-inner">
          <nav className="acq-language" aria-label={copy.language}>
            {(Object.keys(homeLanguages) as HomeLocale[]).map(key => (
              <Link key={key} href={luxuryAssetsPath(key)} lang={homeLanguages[key].tag} hrefLang={homeLanguages[key].tag}
                aria-label={homeLanguages[key].name} aria-current={locale === key ? "page" : undefined}>{key.toUpperCase()}</Link>
            ))}
          </nav>
          <p className="acq-eyebrow">{copy.eyebrow}</p>
          <h1 id="triad-title">{copy.title}</h1>
          <p className="acq-hero-copy">{copy.intro}</p>
          <div className="triad-actions">
            <a className="acq-button acq-button-primary" href="#specialist-desks">{copy.explore}<span aria-hidden="true">↓</span></a>
            <Link className="acq-button acq-button-plain" href={mandates}>{copy.mandates}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
      <div className="acq-wrap">
        <span id="asset-categories" className="acq-legacy-anchor" aria-hidden="true"/>
        <section className="acq-section" id="specialist-desks" aria-labelledby="desk-explorer-title">
          <div className="acq-heading"><h2 id="desk-explorer-title">{copy.explorerTitle}</h2><p>{copy.explorerIntro}</p></div>
          <fieldset className="triad-switcher">
            <legend className="acq-hidden">{copy.deskControl}</legend>
            <div className="triad-switcher-grid">
              {desks.map(({ media, asset, guide }, index) => {
                const desk = copy.desks[index];
                const id = `desk-${asset}`;
                return (
                  <Fragment key={asset}>
                    <input className="acq-hidden" type="radio" name="specialist-desk" id={id} aria-controls={id+"-panel"} defaultChecked={index === 0}/>
                    <label htmlFor={id} id={id+"-label"}><span aria-hidden="true">{["I","II","III"][index]}</span>{desk.name}</label>
                    <div className="triad-panel" id={id+"-panel"} role="region" aria-labelledby={id+"-label"}>
                      <div className="triad-frame"><DeskImage media={media} alt={copy.alt[media]} caption={copy.artwork} /></div>
                      <div className="triad-panel-copy">
                        <dl>{[desk.profile, desk.corridors, desk.governance].map((content, field) => (
                          <div key={copy.deskLabels[field]}><dt>{copy.deskLabels[field]}</dt><dd>{content}</dd></div>
                        ))}</dl>
                        <div className="triad-actions">
                          <Link className="acq-button acq-button-primary" href={`${mandates}#asset=${asset}`}>{copy.mandates}<span aria-hidden="true">↗</span></Link>
                          <Link className="acq-button acq-button-plain" href="/list-asset" hrefLang="en-GB">{copy.submit}<span aria-hidden="true">↗</span></Link>
                        </div>
                        <Link className="acq-link" href={guide} hrefLang="en-GB">{desk.guide}<span aria-hidden="true">↗</span></Link>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </fieldset>
        </section>
        <section id="capital-allocation" className="acq-section" aria-labelledby="triad-matrix-title">
          <div className="acq-heading"><h2 id="triad-matrix-title">{copy.matrixTitle}</h2><p>{copy.matrixIntro}</p></div>
          <div className="triad-ledger" role="region" aria-labelledby="triad-matrix-title" tabIndex={0}>
            <table aria-labelledby="triad-matrix-title">
              <thead><tr><td/>{copy.desks.map(desk => <th scope="col" key={desk.name}>{desk.name}</th>)}</tr></thead>
              <tbody>{matrix.map((field, index) => (
                <tr key={field}><th scope="row">{copy.matrixLabels[index]}</th>{copy.desks.map(desk => <td key={desk.name}>{desk[field]}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </section>
        <section className="acq-section triad-governance" id="title-governance" aria-labelledby="triad-governance-title">
          <h2 id="triad-governance-title">{copy.governanceTitle}</h2>
          <div><p>{copy.governance}</p><p>{copy.malta}</p>
            <nav aria-labelledby="triad-governance-title">
              <a className="acq-link" href={chapter644}>{copy.chapter}<span aria-hidden="true">↗</span></a>
              <Link className="acq-link" href={mandateSummary.publicPath} hrefLang="en-GB">{copy.terms}<span aria-hidden="true">↗</span></Link>
              <Link className="acq-link" href="/legal-compliance/cross-border" hrefLang="en-GB">{copy.dueDiligence}<span aria-hidden="true">↗</span></Link>
              <Link className="acq-link" href="/valuations#landed-cost-estimator" hrefLang="en-GB">{copy.costs}<span aria-hidden="true">↗</span></Link>
            </nav>
          </div>
        </section>
        <section className="acq-section acq-faq" id="faq" aria-labelledby="triad-faq-title">
          <div><h2 id="triad-faq-title">{copy.faqTitle}</h2><Link className="acq-link" href="/list-asset" hrefLang="en-GB">{copy.submit}<span aria-hidden="true">↗</span></Link></div>
          <div>{copy.faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>
      </div>
    </div>
  );
}
