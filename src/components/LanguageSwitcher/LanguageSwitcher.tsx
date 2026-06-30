'use client';

import { useEffect, useState } from 'react';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import './LanguageSwitcher.scss';

const storageKey = 'chatus-locale';
const localeChangeEvent = 'chatus-locale-change';
const localeLabels: Record<Locale, string> = {
  ru: 'Id',
  en: 'En',
  es: 'Ru',
};

type LanguageSwitcherProps = {
  className?: string;
};

function isLocale(value: string | null): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(storageKey) as Locale | null;

    if (isLocale(savedLocale)) {
      setActiveLocale(savedLocale);
      document.documentElement.lang = savedLocale;
    }
  }, []);

  useEffect(() => {
    function syncLocale(locale: string | null) {
      if (!isLocale(locale)) {
        return;
      }

      setActiveLocale(locale);
      document.documentElement.lang = locale;
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === storageKey) {
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
    window.localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
    window.dispatchEvent(new CustomEvent(localeChangeEvent, { detail: locale }));
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
