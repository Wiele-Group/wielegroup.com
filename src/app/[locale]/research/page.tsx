import { notFound } from "next/navigation";
import { ResearchLibrary, researchMetadata } from "@/components/research/research-library";
import { homeLanguages, isHomeLocale } from "@/lib/home-locales/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(homeLanguages).filter(locale => locale !== "en").map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return researchMetadata(locale);
}

export default async function LocalizedResearchPage({ params }: Props) {
  const { locale } = await params;
  if (!isHomeLocale(locale) || locale === "en") notFound();
  return <ResearchLibrary locale={locale} />;
}
