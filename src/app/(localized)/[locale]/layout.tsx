import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppShell, rootMetadata } from '../../AppShell';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import '@/styles/main.scss';

export const metadata: Metadata = rootMetadata;

type LocalizedLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocalizedLayout({ children, params }: LocalizedLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale) || locale === defaultLocale) {
    notFound();
  }

  return <AppShell lang={locale as Locale}>{children}</AppShell>;
}
