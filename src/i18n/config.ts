export const locales = ['ru', 'en', 'es'] as const;
export const defaultLocale = 'ru';

export type Locale = (typeof locales)[number];
