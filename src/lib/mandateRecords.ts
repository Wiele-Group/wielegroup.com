import "server-only";
import cape from "../../public/flagship-examples/records/cape-villa.json";
import ligurian from "../../public/flagship-examples/records/ligurian-yacht.json";
import oxfordshire from "../../public/flagship-examples/records/oxfordshire-coupe.json";
import { availableMandateMedia, type MandateSlug } from "./mandateMedia";

export const dossierRateDate = cape.fx.as_of;
type Currency = keyof typeof cape.fx.per_euro;
export type MandateEntry = {
  slug: MandateSlug;
  id: string;
  title: string;
  href: string;
  price: number;
  currency: Currency;
  rates: Record<Currency, number>;
  region: number;
  point: [longitude: number, latitude: number];
  image?: string;
};

const examples = [
  { record: cape, slug: "cape-villa", id: "WG-SAMPLE-CAPE", region: 3, point: [18.42, -34.05] },
  { record: ligurian, slug: "ligurian-yacht", id: "WG-SAMPLE-LIGURIA", region: 2, point: [9.1, 44.25] },
  { record: oxfordshire, slug: "oxfordshire-coupe", id: "WG-SAMPLE-OXFORD", region: 0, point: [-1.3, 51.78] },
] as const;

export const mandateRecords: MandateEntry[] = examples.map(({ record, slug, id, region, point }) => ({
  slug, id, title: record.title, href: `/flagship-examples/${slug}.html`,
  price: record.price, currency: record.currency as Currency,
  rates: {
    EUR: Number(record.fx.per_euro.EUR), GBP: Number(record.fx.per_euro.GBP),
    CHF: Number(record.fx.per_euro.CHF), USD: Number(record.fx.per_euro.USD), ZAR: Number(record.fx.per_euro.ZAR),
  },
  region, point: [...point], image: availableMandateMedia(slug),
}));
