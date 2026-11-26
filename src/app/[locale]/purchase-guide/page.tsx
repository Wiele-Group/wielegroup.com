import { notFound } from "next/navigation";
import { SettlementBriefing, settlementMetadata } from "@/components/purchase-guide/settlement-briefing";
import { homeLanguages, isHomeLocale } from "@/lib/home-locales/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(homeLanguages).filter(locale => locale !== "en").map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return settlementMetadata(locale);
}

export default async function LocalizedPurchaseGuidePage({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return <SettlementBriefing locale={locale} />;
}
