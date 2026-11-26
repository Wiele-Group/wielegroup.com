import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { CurrencyConverter } from "@/components/property/currency-converter";
import { ValuationWorkspace } from "@/components/property/valuation-workspace";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { propertyBrand } from "@/lib/property";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema-graph";
import { estimateAssets, estimateMarkets, estimateProfiles } from "@/lib/transaction-estimate";
import { valuationCopy } from "@/lib/valuation-locales";
import { valuationsAlternates, valuationsPath, valuationsUpdated } from "@/lib/valuation-locales/routing";
import type { ValuationCopy } from "@/lib/valuation-locales/types";
import { availableValuationsMedia, type ValuationsMediaKey } from "@/lib/valuationsMedia";
import matrix from "../../../public/reference-data/cross-border-matrix.json";
import "../buying/private-acquisition.css";
import "./valuation-desk.css";

const fallbackSocial = "/images/valuations/valuation-social.png";
const chapter644 = "https://legislation.mt/eli/cap/644/eng/portalpdf";
const rics = "https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/valuation-standards/comparable-evidence-in-real-estate-valuation";
const ivs = "https://ivsc.org/standards/";
const imageIndex = { hero: 0, maritime: 1, concours: 2 } as const;
const desks = [
 { key: "estate", href: "/flagship-examples/cape-villa.html" },
 { key: "yacht", href: "/flagship-examples/ligurian-yacht.html", media: "maritime" },
 { key: "collector", href: "/flagship-examples/oxfordshire-coupe.html", media: "concours" },
] as const;
const legalRoutes = estimateMarkets.flatMap((market, index) => estimateAssets.flatMap(asset => estimateProfiles.map(party_profile => {
 const entry = matrix.find(row => row.market === market && row.asset === asset && row.party_profile === party_profile);
 if (!entry) throw new Error(`Missing legal matrix route: ${market} / ${asset} / ${party_profile}`);
 return { market, asset, party_profile, buyer: entry.buyer, seller: entry.seller, anchor: ["uk", "eu", "south-africa"][index] };
})));

export function valuationMetadata(locale: HomeLocale): Metadata {
 const copy = valuationCopy[locale];
 const path = valuationsPath(locale);
 const title = `${copy.eyebrow} | ${propertyBrand.name}`;
 const { og } = homeLanguages[locale];
 const hero = availableValuationsMedia("hero");
 const image = hero
  ? { url: hero, width: 1664, height: 936, alt: copy.pictures[0] }
  : { url: fallbackSocial, width: 1200, height: 630, alt: copy.title };
 return {
  title: { absolute: title }, description: copy.intro,
  alternates: { canonical: path, languages: valuationsAlternates },
  openGraph: { title, description: copy.intro, url: path, siteName: propertyBrand.name,
   locale: og, alternateLocale: Object.values(homeLanguages).map(language => language.og).filter(tag => tag !== og),
   type: "website", images: [image] },
  twitter: { card: "summary_large_image", title, description: copy.intro, images: [image] },
 };
}

function AppraisalImage({ media, copy }: { media: ValuationsMediaKey; copy: ValuationCopy }) {
 const src = availableValuationsMedia(media);
 return <div className="appraisal-image" data-media={media}>
  {src ? <>
   <Image src={src} alt={copy.pictures[imageIndex[media]]} fill preload={media === "hero"}
    sizes={media === "hero" ? "100vw" : "(max-width: 740px) 95vw, 44vw"} />
   <span className="acq-image-credit">{copy.illustration}</span>
  </> : <div className="acq-linework" aria-hidden="true"><i /><i /><i /></div>}
 </div>;
}

export function ValuationDesk({ locale }: { locale: HomeLocale }) {
 const copy = valuationCopy[locale];
 const { tag, path: homePath } = homeLanguages[locale];
 const path = valuationsPath(locale);
 const url = propertyBrand.url + path;

 return (
  <div className="acq-page appraisal-page" lang={tag}>
   <JsonLdGraph includeCore={false} nodes={[
    { "@type": "WebPage", "@id": `${url}#webpage`, name: copy.title, description: copy.intro, url,
     inLanguage: tag, dateModified: valuationsUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` },
     breadcrumb: { "@id": `${url}#breadcrumb` }, hasPart: { "@id": `${url}#faq` }, citation: [chapter644, rics, ivs],
     primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (availableValuationsMedia("hero") ?? fallbackSocial) } },
    buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.eyebrow, path }]),
    { ...buildFaqSchema(copy.faq), "@id": `${url}#faq`, url: `${url}#faq`, inLanguage: tag },
   ]}/>
   <section className="acq-hero appraisal-hero" aria-labelledby="appraisal-title">
    <AppraisalImage media="hero" copy={copy}/>
    <div className="acq-wrap acq-hero-inner">
     <nav className="acq-language" aria-label={copy.language}>
      {(Object.keys(homeLanguages) as HomeLocale[]).map(key => (
       <Link key={key} href={valuationsPath(key)} lang={homeLanguages[key].tag} hrefLang={homeLanguages[key].tag}
        aria-label={homeLanguages[key].name} aria-current={locale === key ? "page" : undefined}>{key.toUpperCase()}</Link>
      ))}
     </nav>
     <p className="acq-eyebrow">{copy.eyebrow}</p>
     <h1 id="appraisal-title">{copy.title}</h1>
     <p className="acq-hero-copy">{copy.intro}</p>
     <div className="appraisal-actions">
      <a className="acq-button acq-button-primary" href="#appraisal-desk" data-site-action="valuation_brief">{copy.request}<span aria-hidden="true">↓</span></a>
      <a className="acq-button acq-button-plain" href="#currency-converter" data-site-action="currency_converter">{copy.openLedger}<span aria-hidden="true">↓</span></a>
     </div>
    </div>
   </section>
   <div className="acq-wrap">
    <CurrencyConverter copy={copy.ledger} language={tag}/>
    <section className="acq-section" id="valuation-methodology" aria-labelledby="valuation-method-title">
     <div className="acq-heading"><h2 id="valuation-method-title">{copy.method}</h2><p>{copy.comparables}</p></div>
     <div className="appraisal-method">
      <fieldset>
       <legend>{copy.deskLabel}</legend>
       <div className="appraisal-desk-options">
        {desks.map(({ key }, index) => (
         <label key={key}><input name="appraisal-specialist" type="radio" value={key} defaultChecked={index === 0}
          aria-controls={`appraisal-${key}`}/><span>{copy.desks[index].name}</span></label>
        ))}
       </div>
      </fieldset>
      {desks.map((desk, index) => {
       const text = copy.desks[index];
       return <section className="appraisal-method-panel" id={`appraisal-${desk.key}`} key={desk.key} aria-label={text.name}>
        <div className="appraisal-method-copy">
         <h3>{text.name}</h3>
         <dl>{[text.drivers, text.records, text.window].map((detail, detailIndex) => (
          <div key={copy.criteria[detailIndex]}><dt>{copy.criteria[detailIndex]}</dt><dd>{detail}</dd></div>
         ))}</dl>
         <a className="acq-link" href={desk.href} hrefLang="en-GB">{copy.dossier} <span aria-hidden="true">↗</span></a>
        </div>
        {"media" in desk && <AppraisalImage media={desk.media} copy={copy}/>}
       </section>;
      })}
     </div>
    </section>
    <section className="acq-section appraisal-governance" aria-labelledby="appraisal-governance-title">
     <h2 id="appraisal-governance-title">{copy.governance}</h2>
     <div>
      <p>{copy.scope}</p>
      <p>{copy.malta}</p>
      <nav className="appraisal-actions" aria-label={copy.governance}>
       <a className="acq-link" href={rics}>RICS <span aria-hidden="true">↗</span></a>
       <a className="acq-link" href={ivs}>IVS <span aria-hidden="true">↗</span></a>
       <a className="acq-link" href={chapter644}>Chapter 644 <span aria-hidden="true">↗</span></a>
      </nav>
     </div>
    </section>
    <ValuationWorkspace matrix={legalRoutes} copy={copy} locale={locale}/>
    <section className="acq-section appraisal-faq" id="faq" aria-labelledby="appraisal-faq-title">
     <h2 id="appraisal-faq-title">{copy.faqTitle}</h2>
     <div>{copy.faq.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
   </div>
  </div>
 );
}
