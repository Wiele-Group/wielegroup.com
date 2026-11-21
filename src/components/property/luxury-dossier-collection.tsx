import "server-only";
import Link from "next/link";
import { Arrow } from "./chrome";
import { AtlasDossierCard, flagshipDossiers, type AtlasDossier } from "./asset-atlas";
import { exampleHref } from "@/lib/listing-examples";
import { luxuryAssetHref, luxuryAssets } from "@/lib/luxury-assets";
import { registeredListingExamples } from "@/server/listing-examples";

const collection = {
 yachts: [
  { ...flagshipDossiers[1], index: "Flagship dossier / Yachts",
   specs: "2017 · 32.40 m / 106.3 ft LOA · 7.30 m / 24.0 ft beam · 4 guest cabins",
   recordNote: "VAT and Union goods status unverified" },
  sample("motor-yacht", "2018 · 32 m / 105.0 ft LOA · 5 guest cabins", "VAT and customs status unverified"),
 ],
 "classic-cars": [
  { ...flagshipDossiers[2], index: "Flagship dossier / Classic cars",
   recordNote: "Earlier ownership incomplete · factory identity unverified" },
  sample("classic-grand-tourer", "1967 · 64,000 km / 39,768 mi indicated", "Provenance and restoration unverified"),
 ],
} as const;

function sample(slug: string, specs: string, recordNote: string): AtlasDossier {
 const example = registeredListingExamples.find(entry => entry.slug === slug);
 if (!example) throw new Error(`Missing luxury dossier ${slug}`);
 return { index: `Regional sample / ${example.categoryLabel}`, title: example.title, href: exampleHref(slug), image: example.image, alt: example.alt, specs, recordNote };
}

export function LuxuryDossierCollection() {
 return <div id="asset-categories" className="luxury-collection wrap"><div id="listing-examples">
  {luxuryAssets.map((asset, index) => {
   const dossiers = collection[asset.id];
   return <section key={asset.id} className="luxury-dossier-section" id={asset.id} aria-labelledby={`${asset.id}-title`}>
    <header className="luxury-dossier-heading">
     <div><span className="eyebrow">0{index + 1} / {asset.name}</span><h2 id={`${asset.id}-title`}>{asset.subtitle}</h2></div>
     <div>
      <p>{asset.details}</p>
      <div className="button-row">
       <a className="text-link" href={dossiers[0].href} aria-label={`Explore open dossier for ${asset.name.toLowerCase()}`}>Explore open dossier <Arrow diagonal/></a>
       <Link className="button" href={luxuryAssetHref(asset.id)} aria-label={`Build acquisition / sales brief for ${asset.name.toLowerCase()}`}>Build acquisition / sales brief <Arrow diagonal/></Link>
      </div>
     </div>
    </header>
    <div className="atlas-grid">
     {dossiers.map(dossier => <AtlasDossierCard key={dossier.href} dossier={dossier} sizes="(max-width: 760px) 100vw, 50vw" showDisclosure={false}/>)}
    </div>
   </section>;
  })}
 </div></div>;
}
