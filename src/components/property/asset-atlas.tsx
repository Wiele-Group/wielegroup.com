import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./chrome";

const dossiers = [
  { index: "01 / Property", title: "Cape Peninsula Villa", file: "cape-villa", image: "property", alt: "AI-created concept of a coastal villa overlooking the Atlantic", specs: "5 bedrooms · 480 m² / 5,167 sq ft" },
  { index: "02 / Yachts", title: "Ligurian Motor Yacht", file: "ligurian-yacht", image: "yacht", alt: "AI-created concept of a motor yacht under way off a Ligurian-style coast", specs: "32.40 m / 106.3 ft LOA · 4 guest cabins" },
  { index: "03 / Classic cars", title: "Oxfordshire Coupé", file: "oxfordshire-coupe", image: "car", alt: "AI-created concept of a green classic coupé outside a stone motor house", specs: "1967 · 48,200 mi / 77,570 km indicated" },
] as const;

export function AssetAtlas() {
  return <section id="asset-atlas" className="asset-atlas wrap" aria-labelledby="asset-atlas-title">
    <div className="atlas-heading">
      <div><span className="eyebrow">Malta-based brokerage / Property · Yachts · Classic cars</span><h2 id="asset-atlas-title">Open flagship <em>dossiers.</em></h2></div>
      <div><p>Explore the full illustrative prices, specifications, and condition and legal notes. No registration required.</p></div>
    </div>
    <div id="luxury-assets" className="atlas-grid">
      {dossiers.map(dossier => <article className="atlas-entry" key={dossier.file}>
        <a className="atlas-dossier-link" href={`/flagship-examples/${dossier.file}.html`}>
          <div className="atlas-image">
            <Image src={`/flagship-examples/media/${dossier.image}-small.webp`} alt={dossier.alt} sizes="(max-width: 760px) 100vw, 33vw" fill/>
            <span className="atlas-image-note">Illustrative Dossier Study</span>
          </div>
          <div className="atlas-entry-copy">
            <span className="atlas-detail">{dossier.index}</span>
            <h3>{dossier.title}</h3>
            <p className="atlas-example-note">Illustrative concept · Not an asset offered for sale</p>
            <p className="atlas-example-note">AI-created concept</p>
            <span className="atlas-dossier-action">View dossier <Arrow diagonal/></span>
          </div>
          <div className="atlas-specs">{dossier.specs}</div>
        </a>
        <div className="atlas-readiness">
          <p>Due-Diligence Readiness <strong>0 / 5</strong></p>
          <div className="dossier-segments" role="meter" aria-label={`${dossier.title} verified due-diligence checks`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={0} aria-valuetext="0 of 5 checks supported by verified records">
            <span/><span/><span/><span/><span/>
          </div>
        </div>
      </article>)}
    </div>
  </section>;
}

export function AssetPaths() {
  return <nav className="wrap atlas-paths" aria-label="Choose your next step">
      <Link href="/buying"><span className="atlas-path-number">01 / Acquire</span><strong>Find your next property.</strong><span>Define the location, purpose and priorities.<Arrow diagonal/></span></Link>
      <Link href="/selling"><span className="atlas-path-number">02 / Sell</span><strong>A strategy for your asset.</strong><span>Start with the evidence and your objectives.<Arrow diagonal/></span></Link>
      <Link href="/valuations"><span className="atlas-path-number">03 / Understand value</span><strong>Put the detail in perspective.</strong><span>Prepare an indicative valuation brief.<Arrow diagonal/></span></Link>
  </nav>;
}
