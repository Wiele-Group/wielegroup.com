import { notFound } from "next/navigation";
import { homeLanguages, isHomeLocale } from "@/lib/home-locales/routing";
import { homeMetadata } from "@/lib/homeMetadata";
import { PrivateTreatyHome } from "@/components/home/private-treaty-home";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(homeLanguages).filter(locale => locale !== "en").map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return homeMetadata(locale);
}

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return <PrivateTreatyHome locale={locale} />;
}
