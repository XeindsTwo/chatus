import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { LegalDocument } from '@/sections/LegalDocument';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/i18n/seo';

type Props = { params: Promise<{ locale: Locale }> };

export function generateStaticParams() {
  return locales.filter((locale) => locale !== defaultLocale).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale) || locale === defaultLocale) notFound();
  return buildSeoMetadata(locale, 'agreement');
}

export default async function AgreementPage({ params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale) || locale === defaultLocale) notFound();
  return <main><Header /><LegalDocument locale={locale} document="agreement" /><Cta /><SiteFooter /></main>;
}
