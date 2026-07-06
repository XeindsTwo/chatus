import type { Metadata } from 'next';
import { Audience } from '@/sections/Audience';
import { Benefits } from '@/sections/Benefits';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { Faq } from '@/sections/Faq';
import { Hero } from '@/sections/Hero';
import { Intro } from '@/sections/Intro';
import { Steps } from '@/sections/Steps';
import { Tariffs } from '@/sections/Tariffs';
import { buildSeoMetadata } from '@/i18n/seo';

export const metadata: Metadata = buildSeoMetadata('en', 'home');

export default function Home() {
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
