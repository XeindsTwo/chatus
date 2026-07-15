import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { LegalDocument } from '@/sections/LegalDocument';
import { buildSeoMetadata } from '@/i18n/seo';

export const metadata: Metadata = buildSeoMetadata('en', 'privacy-website');

export default function WebsitePrivacyPolicyPage() {
  return (
    <main>
      <Header />
      <LegalDocument locale="en" document="privacy-website" />
      <Cta />
      <SiteFooter />
    </main>
  );
}
