export const locales = ['id', 'en', 'ru'] as const;
export const defaultLocale = 'ru';

export type Locale = (typeof locales)[number];
