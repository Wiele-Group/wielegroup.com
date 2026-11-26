import { notFound } from "next/navigation";
import { ValuationDesk, valuationMetadata } from "@/components/valuations/valuation-desk";
import { homeLanguages, isHomeLocale } from "@/lib/home-locales/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(homeLanguages).filter(locale => locale !== "en").map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return valuationMetadata(locale);
}

export default async function LocalizedValuationsPage({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return <ValuationDesk locale={locale} />;
}
