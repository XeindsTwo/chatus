import type { Metadata } from 'next';
import { AppShell, rootMetadata } from '../AppShell';
import '@/styles/main.scss';

export const metadata: Metadata = rootMetadata;

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell lang="en">{children}</AppShell>;
}
