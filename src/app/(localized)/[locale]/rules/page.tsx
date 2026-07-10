import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { Faq } from '@/sections/Faq';
import { Rules } from '@/sections/Rules';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/i18n/seo';

type LocalizedRulesPageProps = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return locales.filter((locale) => locale !== defaultLocale).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedRulesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale) || locale === defaultLocale) {
    notFound();
  }

  return buildSeoMetadata(locale, 'rules');
}

export default async function LocalizedRulesPage({ params }: LocalizedRulesPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale) || locale === defaultLocale) {
    notFound();
  }

  return (
    <main>
      <Header />
      <Rules />
      <Faq locale={locale} />
      <Cta />
      <SiteFooter />
    </main>
  );
}
