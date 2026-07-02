import type { Metadata } from 'next';
import Script from 'next/script';
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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EE08JE6MZL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EE08JE6MZL');
          `}
        </Script>
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
