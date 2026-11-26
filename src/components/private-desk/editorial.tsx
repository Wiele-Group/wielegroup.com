import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { homeLanguages, type HomeLocale } from "@/lib/home-locales/routing";
import { propertyBrand } from "@/lib/property";
import "../buying/private-acquisition.css";
import "./editorial.css";

export type HeroCopy = {
 title: string; eyebrow: string; intro: string; language: string; start: string;
};

export function availableDeskImage(src: string) {
 return existsSync(join(process.cwd(), "public", src));
}

export function deskMetadata(locale: HomeLocale, path: string, alternates: Record<string, string>, copy: HeroCopy,
 hero: { src: string; alt: string }, fallback: string): Metadata {
 const title = `${copy.eyebrow} | ${propertyBrand.name}`;
 const { og } = homeLanguages[locale];
 const image = availableDeskImage(hero.src)
  ? { url: hero.src, width: 1664, height: 936, alt: hero.alt }
  : { url: fallback, width: 1200, height: 630, alt: copy.title };
 return { title: { absolute: title }, description: copy.intro,
  alternates: { canonical: path, languages: alternates },
  openGraph: { title, description: copy.intro, url: path, locale: og,
   alternateLocale: Object.values(homeLanguages).map(language => language.og).filter(code => code !== og),
   siteName: propertyBrand.name, type: "website", images: [image] },
  twitter: { card: "summary_large_image", title, description: copy.intro, images: [image] } };
}

export function DeskEditorialImage({ src, alt, credit, hero = false }: { src: string; alt: string; credit: string; hero?: boolean }) {
 return <div className="desk-editorial-image" data-media={hero ? "hero" : undefined}>
  {availableDeskImage(src) ? <>
   <Image src={src} alt={alt} fill preload={hero} sizes={hero ? "100vw" : "(max-width: 740px) 95vw, 45vw"}/>
   <span className="acq-image-credit">{credit}</span>
  </> : <div className="acq-linework" aria-hidden="true"><i/><i/><i/></div>}
 </div>;
}

export function DeskEditorialHero({ copy, locale, image, href, anchor, children }: {
 copy: HeroCopy; locale: HomeLocale; image: { src: string; alt: string; credit: string };
 href: (lang: HomeLocale) => string; anchor: string; children?: React.ReactNode;
}) {
 return <section className="acq-hero desk-editorial-hero" aria-labelledby="editorial-title">
  <DeskEditorialImage {...image} hero/>
  <div className="acq-wrap acq-hero-inner">
   <nav className="acq-language" aria-label={copy.language}>
    {(Object.keys(homeLanguages) as HomeLocale[]).map(key => <Link key={key} href={href(key)}
     lang={homeLanguages[key].tag} hrefLang={homeLanguages[key].tag} aria-label={homeLanguages[key].name}
     aria-current={locale === key ? "page" : undefined}>{key.toUpperCase()}</Link>)}
   </nav>
   <p className="acq-eyebrow">{copy.eyebrow}</p>
   <h1 id="editorial-title">{copy.title}</h1>
   <p className="acq-hero-copy">{copy.intro}</p>
   <div className="desk-editorial-actions">
    <a className="acq-button acq-button-primary" href={anchor}>{copy.start}<span aria-hidden="true">↓</span></a>
    {children}
   </div>
  </div>
 </section>;
}
