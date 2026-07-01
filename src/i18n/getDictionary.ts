import { defaultLocale, type Locale } from './config';
import { en } from './dictionaries/en';
import { id } from './dictionaries/id';
import { ru } from './dictionaries/ru';

const dictionaries = {
  id,
  ru,
  en,
};

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
