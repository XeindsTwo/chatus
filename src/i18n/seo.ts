import type { Metadata } from 'next';
import { defaultLocale, type Locale } from './config';

type SeoPage = 'home' | 'rules' | 'privacy' | 'privacy-website' | 'agreement';

const rawSiteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chatus.net';

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

const seoContent: Record<Locale, Partial<Record<SeoPage, { title: string; description: string }>>> = {
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
      title: 'Privacy Policy | Chatus',
      description: 'Privacy policy for the Chatus bot and service.',
    },
    'privacy-website': {
      title: 'Website Privacy Policy | Chatus',
      description: 'Website privacy policy for Chatus.',
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
      title: 'Privacy Policy | Chatus',
      description: 'Privacy policy for the Chatus bot and service.',
    },
    'privacy-website': {
      title: 'Website Privacy Policy | Chatus',
      description: 'Website privacy policy for Chatus.',
    },
    agreement: { title: 'User Agreement | Chatus', description: 'Terms governing use of the Chatus bot and service.' },
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

Object.assign(seoContent.id, { agreement: { title: 'User Agreement | Chatus', description: 'Terms governing use of the Chatus bot and service.' } });
Object.assign(seoContent.ru, { agreement: { title: 'Пользовательское соглашение | Chatus', description: 'Условия использования Chatus.' } });
Object.assign(seoContent.ru, { 'privacy-website': { title: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438 \u0441\u0430\u0439\u0442\u0430 | Chatus', description: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438 \u0441\u0430\u0439\u0442\u0430 Chatus.' } });
Object.assign(seoContent.ru, { privacy: { title: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438 | Chatus', description: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438 \u0431\u043e\u0442\u0430 \u0438 \u0441\u0435\u0440\u0432\u0438\u0441\u0430 Chatus.' } });

const alternatePaths: Record<SeoPage, string> = {
  home: '/',
  rules: '/rules',
  privacy: '/privacy',
  'privacy-website': '/privacy-website',
  agreement: '/agreement',
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
  const content = (seoContent[locale][page] ?? seoContent.en[page])!;
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
