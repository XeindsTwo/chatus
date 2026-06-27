import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import faviconHref from '@/assets/favicon.svg';
import '@/styles/main.scss';

export const metadata: Metadata = {
  title: 'Chatus — анонимный чат для общения и знакомств',
  description:
    'Анонимный чат в Telegram для быстрых знакомств и общения без регистрации. Найдите собеседника за несколько секунд и начните диалог сразу.',
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
        {children}
      </body>
    </html>
  );
}
