import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageTransition } from '@/components/PageTransition';
import { PerformanceDebug } from '@/components/PerformanceDebug';
import faviconHref from '@/assets/favicon.svg';
import heroBackgroundAvifSrc from '@/assets/new_home_screen.avif';
import type { Locale } from '@/i18n/config';
import { siteOrigin } from '@/i18n/seo';

const hagrid = localFont({
  src: '../assets/fonts/Hagrid-ExtraboldItalic.woff2',
  variable: '--font-display',
  display: 'swap',
  preload: true,
  weight: '800',
  style: 'italic',
});

const mont = localFont({
  src: '../assets/fonts/Mont-SemiBold.woff2',
  variable: '--font-body',
  display: 'swap',
  preload: true,
  weight: '600',
  style: 'normal',
});

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  icons: {
    icon: [{ url: faviconHref, type: 'image/svg+xml', sizes: '256x256' }],
    shortcut: [{ url: faviconHref, type: 'image/svg+xml', sizes: '256x256' }],
    apple: [{ url: faviconHref, type: 'image/svg+xml', sizes: '256x256' }],
  },
};

type AppShellProps = Readonly<{
  children: React.ReactNode;
  lang: Locale;
}>;

const websiteDescriptions: Record<Locale, string> = {
  en: 'Anonymous Telegram chat for quick dating and communication without registration.',
  id: 'Chat anonim di Telegram untuk berkenalan dan mengobrol cepat tanpa registrasi.',
  ru: 'Анонимная чат-рулетка для быстрых знакомств и общения без регистрации.',
};

function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function getBaseJsonLd(lang: Locale) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteOrigin}/#organization`,
    name: 'Chatus',
    url: siteOrigin,
    logo: `${siteOrigin}/og-en.png?v=4`,
    sameAs: ['https://t.me/chatus', 'https://t.me/chatusme'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteOrigin}/#website`,
    name: 'Chatus',
    url: siteOrigin,
    inLanguage: lang,
    description: websiteDescriptions[lang],
    publisher: {
      '@id': `${siteOrigin}/#organization`,
    },
  };

  return [organization, website];
}

export function AppShell({ children, lang }: AppShellProps) {
  const [organizationJsonLd, websiteJsonLd] = getBaseJsonLd(lang);

  return (
    <html lang={lang}>
      <head>
        <link
          rel="preload"
          as="image"
          href={heroBackgroundAvifSrc.src}
          type="image/avif"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TTBQ2DMN');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(websiteJsonLd) }}
        />
      </head>
      <body className={`${hagrid.variable} ${mont.variable}`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<!-- Google Tag Manager (noscript) --><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TTBQ2DMN" height="0" width="0" style="display:none;visibility:hidden"></iframe><!-- End Google Tag Manager (noscript) -->',
          }}
        />
        <SmoothScroll />
        <PerformanceDebug />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
