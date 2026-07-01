import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { Faq } from '@/sections/Faq';
import { Rules } from '@/sections/Rules';

export const metadata: Metadata = {
  title: 'Правила Chatus',
  description: 'Правила общения и поведения в Chatus.',
  alternates: {
    canonical: '/rules',
    languages: {
      id: '/id/rules',
      en: '/en/rules',
      ru: '/rules',
      'x-default': '/rules',
    },
  },
};

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
