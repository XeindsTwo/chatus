import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { LegalDocument } from '@/sections/LegalDocument';
import { locales, type Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/i18n/seo';

type LocalizedPrivacyPageProps = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedPrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return buildSeoMetadata(locale, 'privacy');
}

export default async function LocalizedPrivacyPage({ params }: LocalizedPrivacyPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <main>
      <Header />
      <LegalDocument />
      <Cta />
      <SiteFooter />
    </main>
  );
}
