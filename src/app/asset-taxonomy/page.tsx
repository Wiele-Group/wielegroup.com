import { ReferenceLayout } from "@/components/property/reference-layout";
import taxonomy from "../../../public/reference-data/taxonomy.json";
import { PageStructuredData } from "@/components/property/structured-data";
import { propertyMetadata } from "@/lib/property";

const path = "/asset-taxonomy";
const title = "Property, Yacht and Classic Car Classifications";
const description = "Explore asset classifications, ownership terminology and listing evidence for the United Kingdom, Europe and South Africa.";
export const metadata = propertyMetadata(title, description, path);

const names: Record<string, string> = { all: "Shared fields", property: "Property", yacht: "Yachts", "classic-car": "Classic cars" };
const groups = Array.from(new Set(taxonomy.dimensions.map(item => item.asset)));

export default function AssetTaxonomy() {
  return <ReferenceLayout eyebrow="UK · Europe · South Africa" title="Asset classifications" description="Compare property tenure, yacht specifications and classic car provenance across the UK, Europe and South Africa." sections={groups.map(id => ({ id, label: names[id] ?? id }))}>
    <PageStructuredData path={path} title={title} description={description} />
    {groups.map(asset => <section className="reference-group" id={asset} key={asset}>
      <h2>{names[asset] ?? asset}</h2>
      {taxonomy.dimensions.filter(item => item.asset === asset).map(item => <details className="example-considerations" key={item.key}>
        <summary>{item.label}</summary><p>{item.help}</p>
        <ul>{item.options.map(option => <li key={option.value}><strong>{option.label}</strong> · {option.scope}{"note" in option ? ` · ${option.note}` : ""}</li>)}</ul>
      </details>)}
    </section>)}
    <div className="button-row reference-downloads"><a className="text-link" href="/reference-data/taxonomy.json" download>Download taxonomy JSON</a><a className="text-link" href="/reference-data/listing-filter.schema.json" download>Download listing filter schema</a></div>
  </ReferenceLayout>;
}
