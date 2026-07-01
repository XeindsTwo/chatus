'use client';

import './Header.scss';
import logoSrc from '@/assets/decor/icons/logo.svg';
import { Button } from '@/components/Button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { MobileMenu } from '@/components/MobileMenu/MobileMenu';
import { getLocalizedHref, useLocale } from '@/i18n/useLocale';

const navItems = [
  { label: 'Аудитория', href: '/#audience' },
  { label: 'Как это работает', href: '/#steps' },
  { label: 'Преимущества', href: '/#benefits' },
  { label: 'Premium', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Правила сервиса', href: '/rules' },
];

const enNavItems = [
  { label: 'Audience', href: '/#audience' },
  { label: 'How it works', href: '/#steps' },
  { label: 'Benefits', href: '/#benefits' },
  { label: 'Premium', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Service Rules', href: '/rules' },
];

const idNavItems = [
  { label: 'Audiens', href: '/#audience' },
  { label: 'Cara kerja', href: '/#steps' },
  { label: 'Keunggulan', href: '/#benefits' },
  { label: 'Premium', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Aturan Layanan', href: '/rules' },
];

export function Header() {
  const locale = useLocale();
  const items = locale === 'en' ? enNavItems : locale === 'id' ? idNavItems : navItems;
  const localizedItems = items.map((item) => ({ ...item, href: getLocalizedHref(item.href, locale) }));
  const mobileItems = localizedItems.filter((item) => !item.href.endsWith('/rules'));
  const startChatText = locale === 'en' ? 'Start chatting' : locale === 'id' ? 'Mulai chat' : 'Начать общение';

  return (
    <header className="header">
      <a className="header__brand" href={getLocalizedHref('/', locale)} aria-label="Chatus">
        <img src={logoSrc} alt="Chatus" width="130" height="38" />
      </a>

      <div className="header__glass">
        <LanguageSwitcher />
        <nav className="header__nav" aria-label={locale === 'en' ? 'Main navigation' : 'Главная навигация'}>
          {localizedItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <Button>{startChatText}</Button>
        </div>
      </div>

      <MobileMenu items={mobileItems} />
    </header>
  );
}
