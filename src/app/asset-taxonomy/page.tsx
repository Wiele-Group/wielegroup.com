import taxonomy from "../../../public/reference-data/taxonomy.json";
import { PageStructuredData } from "@/components/property/structured-data";
import { propertyMetadata } from "@/lib/property";

const path = "/asset-taxonomy";
const title = "Property, Yacht and Classic Car Classifications";
const description = "Explore asset classifications, ownership terminology and listing evidence for the United Kingdom, Europe and South Africa.";
export const metadata = propertyMetadata(title, description, path);

const names: Record<string, string> = { all: "Shared fields", property: "Property", yacht: "Yachts", "classic-car": "Classic cars" };
export default function AssetTaxonomy() {
  return <main className="wrap page-intro">
    <PageStructuredData path={path} title={title} description={description} />
    <span className="eyebrow">UK · Europe · South Africa</span>
    <h1>{title}</h1><p>{description} Check the scope beside each term before applying it to a listing.</p>
    <div className="button-row"><a className="text-link" href="/reference-data/taxonomy.json" download>Download taxonomy JSON</a><a className="text-link" href="/reference-data/listing-filter.schema.json" download>Download listing filter schema</a></div>
    {Array.from(new Set(taxonomy.dimensions.map(item => item.asset))).map(asset => <section key={asset}>
      <h2>{names[asset] ?? asset}</h2>
      {taxonomy.dimensions.filter(item => item.asset === asset).map(item => <details className="example-considerations" key={item.key}>
        <summary>{item.label}</summary><p>{item.help}</p>
        <ul>{item.options.map(option => <li key={option.value}><strong>{option.label}</strong> · {option.scope}{"note" in option ? ` · ${option.note}` : ""}</li>)}</ul>
      </details>)}
    </section>)}
  </main>;
}
