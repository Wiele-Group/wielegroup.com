import { notFound } from "next/navigation";
import { PrivatePlacement, sellingMetadata } from "@/components/selling/private-placement";
import { homeLanguages, isHomeLocale } from "@/lib/home-locales/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(homeLanguages).filter(locale => locale !== "en").map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return sellingMetadata(locale);
}

export default async function LocalizedSellingPage({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return <PrivatePlacement locale={locale} />;
}
