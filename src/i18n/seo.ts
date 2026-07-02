import type { Metadata } from 'next';
import ogEn from '@/assets/og/og-en.webp';
import ogId from '@/assets/og/og-id.webp';
import ogRu from '@/assets/og/og-ru.webp';
import { defaultLocale, type Locale } from './config';

type SeoPage = 'home' | 'rules' | 'privacy';

const localeConfig: Record<Locale, { ogLocale: string; ogImage: typeof ogRu; pathPrefix: string }> = {
  id: {
    ogLocale: 'id_ID',
    ogImage: ogId,
    pathPrefix: '/id',
  },
  en: {
    ogLocale: 'en_US',
    ogImage: ogEn,
    pathPrefix: '/en',
  },
  ru: {
    ogLocale: 'ru_RU',
    ogImage: ogRu,
    pathPrefix: '',
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
      title: 'Chatus — anonymous chat roulette for meeting people and chatting',
      description:
        'Anonymous chat roulette for quick connections and conversations, no sign-up needed. Find someone in seconds and start chatting.',
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
    id: `/id${pagePath === '/' ? '' : pagePath}`,
    en: `/en${pagePath === '/' ? '' : pagePath}`,
    ru: pagePath,
    'x-default': pagePath,
  };
}

export function buildSeoMetadata(locale: Locale, page: SeoPage): Metadata {
  const content = seoContent[locale][page];
  const config = localeConfig[locale];
  const canonical = getCanonicalPath(locale, page);

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical,
      languages: getLanguages(page),
    },
    openGraph: {
      title: content.title,
      description: content.description,
      images: [{ url: config.ogImage.src, width: config.ogImage.width, height: config.ogImage.height, alt: content.title }],
      locale: config.ogLocale,
      alternateLocale: Object.values(localeConfig)
        .map((item) => item.ogLocale)
        .filter((ogLocale) => ogLocale !== config.ogLocale),
      siteName: 'Chatus',
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [config.ogImage.src],
    },
  };
}
