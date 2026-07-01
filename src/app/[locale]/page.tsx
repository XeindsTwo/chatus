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
import { locales, type Locale } from '@/i18n/config';

type LocalizedPageProps = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHome({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
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
      <Faq />
      <Cta />
      <SiteFooter />
    </main>
  );
}
