import { notFound } from "next/navigation";
import { SpecialistDesks, specialistDesksMetadata } from "@/components/luxury-assets/specialist-desks";
import { homeLanguages, isHomeLocale } from "@/lib/home-locales/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(homeLanguages).filter(locale => locale !== "en").map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return specialistDesksMetadata(locale);
}

export default async function LocalizedLuxuryAssetsPage({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return <SpecialistDesks locale={locale} />;
}
