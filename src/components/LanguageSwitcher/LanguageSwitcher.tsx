'use client';

import { useEffect, useState } from 'react';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import './LanguageSwitcher.scss';

const storageKey = 'chatus-locale';
const localeLabels: Record<Locale, string> = {
  ru: 'Id',
  en: 'En',
  es: 'Ru',
};

export function LanguageSwitcher() {
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(storageKey) as Locale | null;

    if (savedLocale && locales.includes(savedLocale)) {
      setActiveLocale(savedLocale);
    }
  }, []);

  function selectLocale(locale: Locale) {
    setActiveLocale(locale);
    window.localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
  }

  return (
    <div className="language-switcher" aria-label="Выбор языка">
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
