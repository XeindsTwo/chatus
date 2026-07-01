import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { Faq } from '@/sections/Faq';
import { Rules } from '@/sections/Rules';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

type LocalizedRulesPageProps = {
  params: Promise<{ locale: Locale }>;
};

const rulesMetadata: Record<Locale, Pick<Metadata, 'title' | 'description'>> = {
  id: {
    title: 'Aturan Chatus',
    description: 'Aturan komunikasi dan perilaku di Chatus.',
  },
  en: {
    title: 'Chatus Rules',
    description: 'Rules for chatting and behavior in Chatus.',
  },
  ru: {
    title: 'Правила Chatus',
    description: 'Правила общения и поведения в Chatus.',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedRulesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return {
    ...rulesMetadata[locale],
    alternates: {
      canonical: locale === defaultLocale ? '/rules' : `/${locale}/rules`,
      languages: {
        id: '/id/rules',
        en: '/en/rules',
        ru: '/rules',
        'x-default': '/rules',
      },
    },
  };
}

export default async function LocalizedRulesPage({ params }: LocalizedRulesPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <main>
      <Header />
      <Rules />
      <Faq />
      <Cta />
      <SiteFooter />
    </main>
  );
}
