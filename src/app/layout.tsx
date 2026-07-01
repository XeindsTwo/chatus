import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageTransition } from '@/components/PageTransition';
import faviconHref from '@/assets/favicon.svg';
import ogRu from '@/assets/OG/og-ru.png';
import '@/styles/main.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://chatus.com'),
  title: 'Chatus — анонимный чат для общения и знакомств',
  description:
    'Анонимный чат в Telegram для быстрых знакомств и общения без регистрации. Найдите собеседника за несколько секунд и начните диалог сразу.',
  openGraph: {
    title: 'Chatus — анонимный чат для общения и знакомств',
    description:
      'Анонимный чат в Telegram для быстрых знакомств и общения без регистрации. Найдите собеседника за несколько секунд и начните диалог сразу.',
    images: [{ url: ogRu.src, width: ogRu.width, height: ogRu.height, alt: 'Chatus' }],
    locale: 'ru_RU',
    siteName: 'Chatus',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chatus — анонимный чат для общения и знакомств',
    description:
      'Анонимный чат в Telegram для быстрых знакомств и общения без регистрации. Найдите собеседника за несколько секунд и начните диалог сразу.',
    images: [ogRu.src],
  },
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
