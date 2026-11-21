import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import matrix from "../../../../public/reference-data/cross-border-matrix.json";
import { PageStructuredData } from "@/components/property/structured-data";
import { propertyMetadata } from "@/lib/property";

const path = "/legal-compliance/cross-border";
const title = "Cross-Border Buying and Selling Guide";
const description = "UK, EU and South African purchase and sale routes for property, yachts and classic cars. Compare buyer and seller checks for 27 market, asset and party combinations.";
export const metadata = propertyMetadata(title, description, path);
export const dynamic = "force-static";

export default function CrossBorderGuide() {
  const markdown = readFileSync(join(process.cwd(), "public/reference-data/detailed-routes.md"), "utf8");
  const sections = markdown.split(/^## /m).slice(1);
  return <main className="wrap page-intro">
    <PageStructuredData path={path} title={title} description={description} />
    <span className="eyebrow">UK · European Union · South Africa</span>
    <h1>{title}</h1>
    <p>{description} Classify the buyer and seller separately. Residence, citizenship, establishment and customs status can lead to different requirements.</p>
    <p>Reviewed <time dateTime="2026-11-21">21 November 2026</time>. Confirm the applicable procedure with the responsible local professional before committing funds or moving an asset.</p>
    <div className="button-row"><a className="text-link" href="/reference-data/cross-border-matrix.json" download>Download the matrix in JSON</a><a className="text-link" href="/reference-data/detailed-routes.md" download>Download detailed routes</a><Link className="text-link" href="/purchase-guide">Country purchase guides</Link></div>
    <h2>Buyer and seller matrix</h2>
    {Array.from(new Set(matrix.map(entry => entry.market))).map(market => <section key={market}>
      <h3>{market}</h3>
      {matrix.filter(entry => entry.market === market).map(entry => <details className="example-considerations" key={entry.asset + entry.party_profile}>
        <summary>{entry.asset} · {entry.party_profile}</summary>
        <p>{entry.sequence}</p><p><strong>Buyer.</strong> {entry.buyer}</p><p><strong>Seller.</strong> {entry.seller}</p>
        <ul>{entry.sources.map(url => <li key={url}><a href={url}>{new URL(url).hostname}</a></li>)}</ul>
      </details>)}
    </section>)}
    <h2>Detailed transaction routes</h2>
    {sections.map(section => {
      const [heading, ...lines] = section.trim().split("\n");
      return <details className="example-considerations" key={heading}><summary>{heading}</summary>
        {lines.filter(Boolean).map((line, index) => <p key={index}>{line.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\)|\*\*[^*]+\*\*)/).map((part, n) => {
          const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
          if (link) return <a key={n} href={link[2]}>{link[1]}</a>;
          if (part.startsWith("**") && part.endsWith("**")) return <strong key={n}>{part.slice(2, -2)}</strong>;
          return part;
        })}</p>)}
      </details>;
    })}
  </main>;
}
