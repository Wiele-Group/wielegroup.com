import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./chrome";
import { luxuryAssets } from "@/lib/luxury-assets";
export function LuxuryAssetsPreview() {
 return <section className="asset-preview" aria-labelledby="asset-preview-title"><div className="cinema-wrap"><div className="asset-preview-heading"><div><span className="cinema-eyebrow">Malta-based. International outlook. / Luxury assets</span><h2 id="asset-preview-title">Beyond the address.<br /><em>A wider world.</em></h2></div><div><p>Aircraft. Yachts. Exotic cars. Classic cars. A global asset perspective, shaped around what you want to acquire or bring to market.</p><Link href="/luxury-assets" className="cinema-text-link">Explore luxury assets <Arrow diagonal /></Link></div></div><div className="asset-preview-grid">{luxuryAssets.map(asset=><Link href={`/luxury-assets#${asset.id}`} className="asset-preview-card" key={asset.id}><div><Image src={`/luxury-assets/${asset.image}`} alt={asset.alt} fill sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 25vw" /><span>AI-created concept</span></div><h3>{asset.name}<Arrow diagonal /></h3></Link>)}</div><p className="asset-disclosure">Illustrative concepts · No aircraft, yachts or cars currently advertised for sale.</p></div></section>;
}
