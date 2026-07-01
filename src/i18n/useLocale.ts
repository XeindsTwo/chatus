'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { defaultLocale, locales, type Locale } from './config';

export const localeStorageKey = 'chatus-locale';
export const localeChangeEvent = 'chatus-locale-change';

const legacyLocaleMap: Record<string, Locale> = {
  es: 'ru',
};

export function normalizeLocale(value: string | null): Locale | null {
  if (!value) {
    return null;
  }

  if (locales.includes(value as Locale)) {
    return value as Locale;
  }

  return legacyLocaleMap[value] ?? null;
}

export function isLocale(value: string | null): value is Locale {
  return normalizeLocale(value) === value;
}

export function getPathLocale(pathname: string | null): Locale | null {
  const segment = pathname?.split('/').filter(Boolean)[0] ?? null;

  return normalizeLocale(segment);
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  if (normalizeLocale(segments[0] ?? null)) {
    segments.shift();
  }

  return `/${segments.join('/')}`.replace(/\/$/, '') || '/';
}

export function getLocalizedHref(href: string, locale: Locale) {
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return href;
  }

  const [pathWithHash, query = ''] = href.split('?');
  const [rawPath, hash = ''] = pathWithHash.split('#');
  const path = stripLocaleFromPath(rawPath || '/');
  const localizedPath = locale === defaultLocale ? path : `/${locale}${path === '/' ? '' : path}`;
  const normalizedQuery = query ? `?${query}` : '';
  const normalizedHash = hash ? `#${hash}` : '';

  return `${localizedPath}${normalizedQuery}${normalizedHash}`;
}

export function useLocale() {
  const pathname = usePathname();
  const pathLocale = getPathLocale(pathname);
  const locale = pathLocale ?? defaultLocale;

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale);
    window.dispatchEvent(new CustomEvent(localeChangeEvent, { detail: locale }));

    document.documentElement.lang = locale;
  }, [locale]);

  return locale;
}
