import type { Locale } from '@/i18n/config';

export const ruBotHref = 'https://t.me/chatus';
export const internationalBotHref = 'https://t.me/anonymous_chatusbot';

export function getBotHref(locale: Locale) {
  return locale === 'ru' ? ruBotHref : internationalBotHref;
}
