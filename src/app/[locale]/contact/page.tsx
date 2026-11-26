import { notFound } from "next/navigation";
import { ClientDesk, contactMetadata } from "@/components/contact/client-desk";
import type { EnquiryQuery } from "@/components/property/enquiry-form";
import { homeLanguages, isHomeLocale } from "@/lib/home-locales/routing";

export const dynamicParams = false;

export function generateStaticParams() {
 return Object.keys(homeLanguages).filter(locale => locale !== "en").map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<EnquiryQuery> };

export async function generateMetadata({ params }: Props) {
 const { locale } = await params;
 if (!isHomeLocale(locale) || locale === "en") notFound();
 return contactMetadata(locale);
}

export default async function LocalizedContactPage({ params, searchParams }: Props) {
 const { locale } = await params;
 if (!isHomeLocale(locale) || locale === "en") notFound();
 return <ClientDesk locale={locale} query={await searchParams}/>;
}
