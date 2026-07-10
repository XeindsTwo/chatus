import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageTransition } from '@/components/PageTransition';
import faviconHref from '@/assets/favicon.svg';
import type { Locale } from '@/i18n/config';
import { siteOrigin } from '@/i18n/seo';

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

export function AppShell({ children, lang }: AppShellProps) {
  return (
    <html lang={lang}>
      <head>
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
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<!-- Google Tag Manager (noscript) --><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TTBQ2DMN" height="0" width="0" style="display:none;visibility:hidden"></iframe><!-- End Google Tag Manager (noscript) -->',
          }}
        />
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
