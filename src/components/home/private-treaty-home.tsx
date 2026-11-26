import Link from "next/link";
import { JsonLdGraph } from "@/components/JsonLdGraph";
import { Arrow } from "@/components/property/chrome";
import { homeCopy } from "@/lib/home-locales";
import { contactPath } from "@/lib/contact-locales/routing";
import { homeLanguages, homeUpdated, type HomeLocale } from "@/lib/home-locales/routing";
import { availableHomeMedia, homeSocialFallback } from "@/lib/homeMedia";
import { mandatePath } from "@/lib/mandate-locales/routing";
import { mandateSummary } from "@/lib/mandateAgreement";
import { propertyBrand } from "@/lib/property";
import { buildFaqSchema } from "@/lib/schema-graph";
import { CorridorMatrix } from "./corridor-matrix";
import { HomeImage } from "./home-image";
import "./private-treaty.css";

const desks = [
  { media: "architecture", path: mandatePath("en"), sizes: "(max-width: 680px) 100vw, 59vw" },
  { media: "maritime", path: "/luxury-assets/yachts", sizes: "(max-width: 680px) 100vw, 39vw" },
  { media: "automotive", path: "/luxury-assets/classic-cars", sizes: "100vw" },
] as const;

const dossiers = [
  { media: "cape", slug: "cape-villa", title: "Granite Coast House", reference: "WG-SAMPLE-CAPE" },
  { media: "ligurian", slug: "ligurian-yacht", title: "Meridian 32", reference: "WG-SAMPLE-LIGURIA" },
  { media: "oxfordshire", slug: "oxfordshire-coupe", title: "The Oxfordshire Coupé", reference: "WG-SAMPLE-OXFORD" },
] as const;

export function PrivateTreatyHome({ locale }: { locale: HomeLocale }) {
  const copy = homeCopy[locale];
  const { path, tag } = homeLanguages[locale];
  const url = propertyBrand.url + path;
  const hero = availableHomeMedia("hero");
  const faqId = `${url}#faq`;
  const ledgerValues = [String(copy.corridors.length), `${mandateSummary.netRetainerCreditPercent}%`, copy.counsel, String(desks.length)];

  return (
    <div lang={tag} className="private-treaty-home">
      <JsonLdGraph includeCore={false} nodes={[
        {
          "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.heading,
          description: copy.description, inLanguage: tag, dateModified: homeUpdated,
          isPartOf: { "@id": `${propertyBrand.url}/#website` },
          about: { "@id": `${propertyBrand.url}/#brokerage-service` },
          primaryImageOfPage: {
            "@type": "ImageObject", contentUrl: propertyBrand.url + (hero ?? homeSocialFallback),
            description: hero ? copy.alt.hero : copy.socialAlt,
          },
          hasPart: { "@id": faqId },
        },
        { ...buildFaqSchema(copy.faqs), "@id": faqId, url: `${url}#questions`, inLanguage: tag },
      ]} />

      <section className="private-hero" aria-labelledby="private-hero-title">
        <HomeImage media="hero" alt={copy.alt.hero} sizes="100vw" />
        <div className="private-hero-inner private-wrap">
          <nav className="private-languages" aria-label={copy.language}>
            {Object.entries(homeLanguages).map(([key, language]) => (
              <Link key={key} href={language.path} hrefLang={language.tag} lang={language.tag}
                title={language.name} aria-label={language.name} aria-current={locale === key ? "page" : undefined}>
                {key.toUpperCase()}
              </Link>
            ))}
          </nav>
          <div className="private-hero-copy">
            <p className="private-kicker">{copy.eyebrow}</p>
            <h1 id="private-hero-title">{copy.heading}</h1>
            <p className="private-hero-intro">{copy.intro}</p>
            <div className="private-actions">
              <Link className="private-button private-button-primary" href="/list-asset">{copy.mandate}<Arrow diagonal /></Link>
              <a className="private-button" href="#viewing-room">{copy.viewing}<span aria-hidden="true">↓</span></a>
            </div>
          </div>
          {hero && <span className="private-artwork-note">{copy.artwork}</span>}
        </div>
      </section>

      <section className="private-ledger" aria-label={copy.ledger}>
        <div className="private-wrap">
          <dl>
            {copy.ledgerLabels.map((label, index) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{ledgerValues[index]}</dd>
                {index === 1 && <dd className="private-commission">{copy.commission}</dd>}
              </div>
            ))}
          </dl>
          <p>{copy.ledgerTerms} <Link href={mandateSummary.publicPath} hrefLang="en-GB">{copy.termsLink}</Link></p>
        </div>
      </section>

      <div className="private-wrap">
        <section id="asset-desks" className="private-section" aria-labelledby="desk-title">
          <div className="private-heading">
            <h2 id="desk-title">{copy.desksTitle}</h2>
            <p>{copy.desksIntro}</p>
          </div>
          <div className="private-triptych">
            {desks.map(({ media, path, sizes }, index) => (
              <Link className="private-desk" key={media} href={media === "architecture" ? mandatePath(locale) : path} hrefLang={media === "architecture" ? tag : "en-GB"}>
                <HomeImage media={media} alt={copy.alt[media]} sizes={sizes} />
                <div className="private-desk-copy">
                  <h3>{copy.desks[index].title}</h3>
                  <p>{copy.desks[index].description}</p>
                </div>
                <span className="private-desk-arrow"><Arrow diagonal /></span>
                {availableHomeMedia(media) && <span className="private-artwork-note">{copy.artwork}</span>}
              </Link>
            ))}
          </div>
        </section>

        <CorridorMatrix copy={copy} />

        <section id="viewing-room" className="private-section" aria-labelledby="viewing-room-title">
          <div className="private-heading">
            <h2 id="viewing-room-title">{copy.viewingTitle}</h2>
            <p>{copy.viewingIntro}</p>
          </div>
          <div className="private-dossiers">
            {dossiers.map(({ media, slug, title, reference }, index) => {
              const dossier = copy.dossiers[index];
              return (
                <article key={slug} className="private-dossier">
                  <div className="private-dossier-cover">
                    <HomeImage media={media} alt={copy.alt[media]} sizes="(max-width: 680px) 100vw, 32vw" />
                  </div>
                  <div className="private-dossier-copy">
                    <p className="private-reference">{copy.reference} <span>{reference}</span></p>
                    <h3 lang="en-GB">{title}</h3>
                    <p className="private-dossier-location">{dossier.category} · {dossier.location}</p>
                    <p>{dossier.description}</p>
                    <a className="private-dossier-link" href={`/flagship-examples/${slug}.html`} hrefLang="en-GB">{dossier.action}<Arrow diagonal /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="questions" className="private-section private-questions" aria-labelledby="private-faq-title">
          <div>
            <h2 id="private-faq-title">{copy.faqTitle}</h2>
            <Link className="private-dossier-link" href={contactPath(locale)} hrefLang={tag}>{copy.contact}<Arrow diagonal /></Link>
          </div>
          <div>
            {copy.faqs.map(({ question, answer }) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
