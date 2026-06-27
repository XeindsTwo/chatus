import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { LegalDocument } from '@/sections/LegalDocument';

export const metadata: Metadata = {
  title: 'Правила использования файлов cookie | Chatus',
  description: 'Правила использования файлов cookie на сайте Chatus.',
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <LegalDocument />
      <Cta />
      <SiteFooter />
    </main>
  );
}
