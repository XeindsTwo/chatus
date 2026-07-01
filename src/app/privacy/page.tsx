import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { LegalDocument } from '@/sections/LegalDocument';
import { buildSeoMetadata } from '@/i18n/seo';

export const metadata: Metadata = buildSeoMetadata('ru', 'privacy');

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
