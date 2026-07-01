import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { Faq } from '@/sections/Faq';
import { Rules } from '@/sections/Rules';
import { buildSeoMetadata } from '@/i18n/seo';

export const metadata: Metadata = buildSeoMetadata('ru', 'rules');

export default function RulesPage() {
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
