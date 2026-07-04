'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { getLocalizedHref, getPathLocale, localeChangeEvent, localeStorageKey, normalizeLocale } from '@/i18n/useLocale';
import './LanguageSwitcher.scss';

const localeLabels: Record<Locale, string> = {
  id: 'Id',
  en: 'En',
  ru: 'Ru',
};

const localeOgImages: Record<Locale, string> = {
  id: '/og-id.png?v=3',
  en: '/og-en.png?v=3',
  ru: '/og-ru.png?v=3',
};

type LanguageSwitcherProps = {
  className?: string;
};

function updateMetaContent(selector: string, content: string) {
  const meta = document.head.querySelector<HTMLMetaElement>(selector);

  if (meta) {
    meta.content = content;
    return;
  }

  const nextMeta = document.createElement('meta');
  const propertyMatch = selector.match(/property="([^"]+)"/);
  const nameMatch = selector.match(/name="([^"]+)"/);

  if (propertyMatch) {
    nextMeta.setAttribute('property', propertyMatch[1]);
  }

  if (nameMatch) {
    nextMeta.setAttribute('name', nameMatch[1]);
  }

  nextMeta.content = content;
  document.head.appendChild(nextMeta);
}

function syncOgImage(locale: Locale) {
  const image = new URL(localeOgImages[locale] ?? localeOgImages[defaultLocale], window.location.origin).href;

  updateMetaContent('meta[property="og:image"]', image);
  updateMetaContent('meta[name="twitter:image"]', image);
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const pathLocale = getPathLocale(pathname);

    setActiveLocale(pathLocale ?? defaultLocale);
  }, [pathname]);

  useEffect(() => {
    const savedLocale = normalizeLocale(window.localStorage.getItem(localeStorageKey));

    syncOgImage(savedLocale ?? defaultLocale);
  }, []);

  useEffect(() => {
    function syncLocale(locale: string | null) {
      const nextLocale = normalizeLocale(locale);

      if (!nextLocale) {
        return;
      }

      setActiveLocale(nextLocale);
      document.documentElement.lang = nextLocale;
      syncOgImage(nextLocale);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === localeStorageKey) {
        syncLocale(event.newValue);
      }
    }

    function handleLocaleChange(event: Event) {
      syncLocale((event as CustomEvent<Locale>).detail);
    }

    window.addEventListener('storage', handleStorage);
    window.addEventListener(localeChangeEvent, handleLocaleChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(localeChangeEvent, handleLocaleChange);
    };
  }, []);

  function selectLocale(locale: Locale) {
    setActiveLocale(locale);
    window.localStorage.setItem(localeStorageKey, locale);
    document.documentElement.lang = locale;
    syncOgImage(locale);
    window.dispatchEvent(new CustomEvent(localeChangeEvent, { detail: locale }));

    const nextHref = getLocalizedHref(pathname || '/', locale);
    const hash = window.location.hash;

    router.push(`${nextHref}${hash}`);
  }

  return (
    <div className={['language-switcher', className].filter(Boolean).join(' ')} aria-label="Выбор языка">
      {locales.map((locale) => (
        <button
          aria-pressed={activeLocale === locale}
          key={locale}
          onClick={() => selectLocale(locale)}
          type="button"
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
