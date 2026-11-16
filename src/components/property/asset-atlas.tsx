import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./chrome";

const categories = [
  { number: "01", name: "Property", subtitle: "A place. A purpose. A perspective.", detail: "Residences & investment property", image: "/property/wiele-global-wine-estate-20261113.webp", alt: "AI-created wine estate architectural concept; not a property offered for sale", href: "/properties", focus: "Location · Tenure · Income evidence" },
  { number: "02", name: "Yachts", subtitle: "The freedom to go further.", detail: "Motor & sailing yachts", image: "/luxury-assets/wiele-yachts-20261113.webp", alt: "AI-created motor yacht concept; not a yacht offered for sale", href: "/luxury-assets/yachts", focus: "Builder · Dimensions · Survey records" },
  { number: "03", name: "Classic cars", subtitle: "The story is in the detail.", detail: "Classic & collector cars", image: "/luxury-assets/wiele-classic-cars-20261113.webp", alt: "AI-created classic grand touring car concept; not a vehicle offered for sale", href: "/luxury-assets/classic-cars", focus: "Provenance · Originality · Condition" },
] as const;

export function AssetAtlas() {
  return <section id="asset-atlas" className="asset-atlas wrap" aria-labelledby="asset-atlas-title">
    <div className="atlas-heading"><div><span className="eyebrow">Malta-based brokerage / Explore the categories</span><h2 id="asset-atlas-title">Different assets.<br/><em>One considered approach.</em></h2></div><div><p>Property at our core. A wider perspective on yachts and classic cars. Each category starts with its own questions, records and ownership priorities.</p><a className="text-link" href="#property-brief">Build your asset brief <Arrow diagonal/></a></div></div>
    <div id="luxury-assets" className="atlas-grid" style={{ scrollMarginTop: 120 }}>{categories.map((asset, i) => <Link className={`atlas-entry${i === 0 ? " atlas-entry-primary" : ""}`} key={asset.number} href={asset.href}>
      <div className="atlas-image"><picture><source type="image/webp" srcSet={`${asset.image.replace(".webp", "-640.webp")} 640w, ${asset.image.replace(".webp", "-1024.webp")} 1024w, ${asset.image} 1672w`} sizes={i === 0 ? "(max-width:760px) 100vw, 45vw" : "(max-width:600px) 100vw, 25vw"}/><Image src={asset.image} alt={asset.alt} fill sizes={i === 0 ? "(max-width:760px) 100vw, 45vw" : "(max-width:600px) 100vw, 25vw"}/></picture><span className="atlas-image-note">AI-created concept · Not for sale</span><span className="atlas-image-index" aria-hidden="true">{asset.number}</span></div>
      <div className="atlas-entry-heading"><div><span className="atlas-detail">{asset.detail}</span><h3>{asset.name}</h3></div><span className="atlas-arrow"><Arrow diagonal/></span></div>
      <p className="atlas-subtitle">{asset.subtitle}</p><span className="atlas-focus">{asset.focus}</span>
    </Link>)}</div>
    <p className="atlas-disclosure">Category illustrations, not available stock. No assets are currently advertised for sale. Listing examples are fictional; registration is required to view their full details.</p>
    <nav className="atlas-paths" aria-label="Choose your next step">
      <Link href="/buying"><span className="atlas-path-number">01 / Acquire</span><strong>Find your next property.</strong><span>Define the location, purpose and priorities.<Arrow diagonal/></span></Link>
      <Link href="/selling"><span className="atlas-path-number">02 / Sell</span><strong>A strategy for your asset.</strong><span>Start with the evidence and your objectives.<Arrow diagonal/></span></Link>
      <Link href="/valuations"><span className="atlas-path-number">03 / Understand value</span><strong>Put the detail in perspective.</strong><span>Prepare an indicative valuation brief.<Arrow diagonal/></span></Link>
    </nav>
  </section>;
}
