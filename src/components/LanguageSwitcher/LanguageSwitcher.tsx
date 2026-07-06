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

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLocale, setActiveLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const pathLocale = getPathLocale(pathname);

    setActiveLocale(pathLocale ?? defaultLocale);
  }, [pathname]);

  useEffect(() => {
    function syncLocale(locale: string | null) {
      const nextLocale = normalizeLocale(locale);

      if (!nextLocale) {
        return;
      }

      setActiveLocale(nextLocale);
      document.documentElement.lang = nextLocale;
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
    document.cookie = `${localeStorageKey}=${locale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = locale;
    window.dispatchEvent(new CustomEvent(localeChangeEvent, { detail: locale }));

    const nextHref = getLocalizedHref(pathname || '/', locale);
    const hash = window.location.hash;

    router.push(`${nextHref}${hash}`);
  }

  return (
    <div className={['language-switcher', className].filter(Boolean).join(' ')} aria-label="Language selection">
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
