import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Audience } from '@/sections/Audience';
import { Benefits } from '@/sections/Benefits';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { Faq } from '@/sections/Faq';
import { Hero } from '@/sections/Hero';
import { Intro } from '@/sections/Intro';
import { Steps } from '@/sections/Steps';
import { Tariffs } from '@/sections/Tariffs';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/i18n/seo';

type LocalizedPageProps = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return locales.filter((locale) => locale !== defaultLocale).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale) || locale === defaultLocale) {
    notFound();
  }

  return buildSeoMetadata(locale, 'home');
}

export default async function LocalizedHome({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale) || locale === defaultLocale) {
    notFound();
  }

  return (
    <main>
      <Hero />
      <div className="line"></div>
      <Intro />
      <div className="audience-steps indent">
        <Audience />
        <Steps />
      </div>
      <Benefits />
      <Tariffs />
      <Faq locale={locale} />
      <Cta />
      <SiteFooter />
    </main>
  );
}
