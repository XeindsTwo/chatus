import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { Cta } from '@/sections/Cta';
import { LegalDocument } from '@/sections/LegalDocument';
import { buildSeoMetadata } from '@/i18n/seo';

export const metadata: Metadata = buildSeoMetadata('en', 'agreement');

export default function AgreementPage() {
  return <main><Header /><LegalDocument locale="en" document="agreement" /><Cta /><SiteFooter /></main>;
}
