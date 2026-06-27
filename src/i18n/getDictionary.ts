import { defaultLocale, type Locale } from './config';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';
import { ru } from './dictionaries/ru';

const dictionaries = {
  ru,
  en,
  es,
};

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
