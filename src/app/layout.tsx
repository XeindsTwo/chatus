import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageTransition } from '@/components/PageTransition';
import faviconHref from '@/assets/favicon.svg';
import { buildSeoMetadata } from '@/i18n/seo';
import '@/styles/main.scss';

export const metadata: Metadata = {
  ...buildSeoMetadata('ru', 'home'),
  metadataBase: new URL('https://chatus.com'),
  icons: {
    icon: [{ url: faviconHref, type: 'image/svg+xml', sizes: '256x256' }],
    shortcut: [{ url: faviconHref, type: 'image/svg+xml', sizes: '256x256' }],
    apple: [{ url: faviconHref, type: 'image/svg+xml', sizes: '256x256' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
