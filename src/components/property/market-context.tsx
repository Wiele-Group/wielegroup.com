import Link from "next/link";
import { propertyMarket } from "@/lib/property-market";
import { Arrow } from "./chrome";

export function MarketContext({ audience = "overview" }: { audience?: "overview" | "buyer" | "seller" }) {
  const heading = audience === "seller" ? "Price the property. Evidence the case." : audience === "buyer" ? "Read the market. Test the purchase." : "Price growth. A more selective market.";
  return <section className="market-context wrap" aria-label="Current Malta property market context">
    <div><span className="eyebrow">Malta investment property / Market context</span><h2>{heading}</h2><p className="market-reviewed">Research reviewed <time dateTime={propertyMarket.reviewed}>{propertyMarket.reviewedLabel}</time></p></div>
    <div><p>Malta&apos;s residential price index rose <strong>6.9%</strong> year on year in Q2 2026. September recorded <strong>974 final deeds</strong>, down 11.5% on September 2025. Different measures and periods: one weaker month does not establish a downturn. <a href={propertyMarket.sources.prices} target="_blank" rel="noopener noreferrer">NSO prices</a>; <a href={propertyMarket.sources.transactions} target="_blank" rel="noopener noreferrer">NSO transactions</a>.</p>
      <p>{audience === "seller" ? "A national index cannot value a particular home. Support the asking price with relevant comparables, the lease position, documented income and known costs." : audience === "buyer" ? "Test the full purchase cost against evidenced rent, vacancy, recurring costs and actual lender terms. National price growth is distinct from the return on your purchase." : "For an income-producing asset, the purchase price, evidenced rent, competing supply and cost of borrowing belong in the same decision."}</p>
      <Link className="text-link" href="/malta-investment-report#market-evidence">Read the research and its limits <Arrow /></Link>
    </div>
  </section>;
}
