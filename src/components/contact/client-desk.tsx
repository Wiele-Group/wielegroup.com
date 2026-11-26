import Link from "next/link";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { availableDeskImage, DeskEditorialHero, DeskEditorialImage, deskMetadata } from "@/components/private-desk/editorial";
import type { EnquiryQuery } from "@/components/property/enquiry-form";
import { buyingPath } from "@/lib/buying-locales/routing";
import { contactCopy } from "@/lib/contact-locales/copy";
import { contactAlternates, contactPath, contactUpdated } from "@/lib/contact-locales/routing";
import { contactMedia } from "@/lib/contactMedia";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { mandateSummary } from "@/lib/mandateAgreement";
import { propertyBrand } from "@/lib/property";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema-graph";
import { valuationsPath } from "@/lib/valuation-locales/routing";
import { CorrespondenceForm } from "./correspondence-form";
import "./client-desk.css";

const fallback = "/images/contact/contact-social.png";
const chapter644 = "https://legislation.mt/eli/cap/644/eng/portalpdf";

export function contactMetadata(locale: HomeLocale) {
 const copy = contactCopy[locale];
 return deskMetadata(locale, contactPath(locale), contactAlternates, copy, { src: contactMedia.hero, alt: copy.captionHero }, fallback);
}

export function ClientDesk({ locale, query }: { locale: HomeLocale; query: EnquiryQuery }) {
 const copy = contactCopy[locale];
 const { path: homePath, tag } = homeLanguages[locale];
 const path = contactPath(locale);
 const url = propertyBrand.url + path;
 const { brief, example, interest, focus, market, asset, intent } = query;
 const enquiry = { brief, example, interest, focus, market, asset, intent };
 const queryString = new URLSearchParams();
 for (const [key, value] of Object.entries(enquiry)) {
  if (typeof value === "string" && value.length <= 100) queryString.set(key, value);
 }
 const localizedHref = (lang: HomeLocale) => contactPath(lang) + (queryString.size ? `?${queryString}` : "");
 const destinations = ["/list-asset", buyingPath(locale), valuationsPath(locale), mandateSummary.publicPath];

 return <div className="acq-page desk-editorial client-desk-page" lang={tag}>
  <JsonLdGraph includeCore={false} nodes={[
   { "@type": "ContactPage", "@id": `${url}#webpage`, url, name: copy.title, description: copy.intro, inLanguage: tag,
    dateModified: contactUpdated, isPartOf: { "@id": `${propertyBrand.url}/#website` }, about: { "@id": `${propertyBrand.url}/#organization` },
    breadcrumb: { "@id": `${url}#breadcrumb` }, hasPart: { "@id": `${url}#before-you-submit` }, citation: [chapter644],
    primaryImageOfPage: { "@type": "ImageObject", contentUrl: propertyBrand.url + (availableDeskImage(contactMedia.hero) ? contactMedia.hero : fallback) },
   },
   buildBreadcrumbSchema([{ name: copy.home, path: homePath }, { name: copy.eyebrow, path }]),
   { ...buildFaqSchema(copy.faq), "@id": `${url}#before-you-submit`, url: `${url}#before-you-submit`, inLanguage: tag },
  ]}/>
  <DeskEditorialHero copy={copy} locale={locale} href={localizedHref} anchor="#private-correspondence"
   image={{ src: contactMedia.hero, alt: copy.captionHero, credit: copy.illustration }}>
   <a className="acq-button acq-button-plain" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email}<span aria-hidden="true">↗</span></a>
  </DeskEditorialHero>
  <div className="acq-wrap">
   <section className="acq-section" id="private-correspondence" aria-labelledby="correspondence-title">
    <h2 id="correspondence-title">{copy.formTitle}</h2>
    <div className="correspondence-layout">
     <CorrespondenceForm key={JSON.stringify(enquiry)} copy={copy} query={enquiry}/>
     <aside className="desk-glass correspondence-protocol" aria-labelledby="correspondence-protocol-title">
      <DeskEditorialImage src={contactMedia.liaison} alt={copy.captionDesk} credit={copy.illustration}/>
      <div>
       <p className="acq-eyebrow">{copy.base}</p>
       <h3 id="correspondence-protocol-title">{copy.protocol}</h3>
       <p><a className="acq-link" href={`mailto:${propertyBrand.email}`}>{propertyBrand.email} <span aria-hidden="true">↗</span></a></p>
       <dl><dt>{copy.reply}</dt><dd>{copy.principal}</dd></dl>
       <ul>{copy.windows.map(window => <li key={window}>{window}</li>)}</ul>
       <p>{copy.settlement}</p>
       <p>{copy.malta}</p>
       <a className="acq-link" href={chapter644}>Chapter 644 <span aria-hidden="true">↗</span></a>
      </div>
     </aside>
    </div>
    <nav className="desk-editorial-actions correspondence-links" aria-label={copy.pick}>
     {destinations.map((href,index) => <Link key={href} className="acq-button acq-button-plain" href={href}>{copy.links[index]} <span aria-hidden="true">↗</span></Link>)}
    </nav>
   </section>
   <section className="acq-section correspondence-faq" id="before-you-submit" aria-labelledby="correspondence-faq-title">
    <h2 id="correspondence-faq-title">{copy.faqTitle}</h2>
    <div>
     {copy.faq.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
     <Link className="acq-link" href="/property-maintenance#request-maintenance">{copy.maintenance}<span aria-hidden="true">↗</span></Link>
    </div>
   </section>
  </div>
 </div>;
}
