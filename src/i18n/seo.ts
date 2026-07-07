import type { Metadata } from 'next';
import { defaultLocale, type Locale } from './config';

type SeoPage = 'home' | 'rules' | 'privacy';

const rawSiteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://chatus.net');

export const siteOrigin = rawSiteOrigin.replace(/\/$/, '');

const localeConfig: Record<Locale, { ogLocale: string; ogImage: string; pathPrefix: string }> = {
  id: {
    ogLocale: 'id_ID',
    ogImage: '/og-id.png?v=4',
    pathPrefix: '/id',
  },
  en: {
    ogLocale: 'en_US',
    ogImage: '/og-en.png?v=4',
    pathPrefix: '',
  },
  ru: {
    ogLocale: 'ru_RU',
    ogImage: '/og-ru.png?v=4',
    pathPrefix: '/ru',
  },
};

const seoContent: Record<Locale, Record<SeoPage, { title: string; description: string }>> = {
  id: {
    home: {
      title: 'Chatus — chat anonim untuk mengobrol dan berkenalan',
      description:
        'Chat anonim di Telegram untuk berkenalan dan mengobrol cepat tanpa registrasi. Temukan lawan bicara dalam beberapa detik dan mulai chat langsung.',
    },
    rules: {
      title: 'Aturan Chatus',
      description: 'Aturan komunikasi dan perilaku di Chatus agar chat tetap aman, nyaman, dan anonim.',
    },
    privacy: {
      title: 'Kebijakan dan cookie | Chatus',
      description: 'Kebijakan penggunaan cookie dan dokumen legal Chatus.',
    },
  },
  en: {
    home: {
      title: 'Chatus — anonymous chat for communication and dating',
      description:
        'Anonymous Telegram chat for quick dating and communication without registration. Find a conversation partner in a few seconds and start chatting right away.',
    },
    rules: {
      title: 'Chatus Rules',
      description: 'Rules for chatting and behavior in Chatus to keep conversations safe, pleasant, and anonymous.',
    },
    privacy: {
      title: 'Cookie and legal policy | Chatus',
      description: 'Cookie usage policy and legal documents for Chatus.',
    },
  },
  ru: {
    home: {
      title: 'Chatus — анонимная чат-рулетка для знакомств и общения',
      description:
        'Анонимная чат-рулетка для быстрых знакомств и общения без регистрации. Найди собеседника за пару секунд и начинай общение.',
    },
    rules: {
      title: 'Правила Chatus',
      description: 'Правила общения и поведения в Chatus, чтобы чат оставался безопасным, приятным и анонимным.',
    },
    privacy: {
      title: 'Правила использования файлов cookie | Chatus',
      description: 'Правила использования файлов cookie и юридические документы Chatus.',
    },
  },
};

const alternatePaths: Record<SeoPage, string> = {
  home: '/',
  rules: '/rules',
  privacy: '/privacy',
};

function getCanonicalPath(locale: Locale, page: SeoPage) {
  const pagePath = alternatePaths[page];

  if (locale === defaultLocale) {
    return pagePath;
  }

  return `${localeConfig[locale].pathPrefix}${pagePath === '/' ? '' : pagePath}`;
}

function getLanguages(page: SeoPage) {
  const pagePath = alternatePaths[page];

  return {
    id: `${siteOrigin}/id${pagePath === '/' ? '' : pagePath}`,
    en: `${siteOrigin}${pagePath}`,
    ru: `${siteOrigin}/ru${pagePath === '/' ? '' : pagePath}`,
    'x-default': `${siteOrigin}${pagePath}`,
  };
}

export function buildSeoMetadata(locale: Locale, page: SeoPage): Metadata {
  const content = seoContent[locale][page];
  const config = localeConfig[locale];
  const canonical = getCanonicalPath(locale, page);
  const absoluteCanonical = `${siteOrigin}${canonical}`;
  const ogImage = `${siteOrigin}${config.ogImage}`;

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: absoluteCanonical,
      languages: getLanguages(page),
    },
    openGraph: {
      title: content.title,
      description: content.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: content.title }],
      locale: config.ogLocale,
      alternateLocale: Object.values(localeConfig)
        .map((item) => item.ogLocale)
        .filter((ogLocale) => ogLocale !== config.ogLocale),
      siteName: 'Chatus',
      type: 'website',
      url: absoluteCanonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [ogImage],
    },
  };
}
