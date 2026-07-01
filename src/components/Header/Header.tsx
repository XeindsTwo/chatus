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

export function Header() {
  const locale = useLocale();
  const items = locale === 'en' ? enNavItems : navItems;
  const localizedItems = items.map((item) => ({ ...item, href: getLocalizedHref(item.href, locale) }));
  const mobileItems = localizedItems.filter((item) => !item.href.endsWith('/rules'));

  return (
    <header className="header">
      <a className="header__brand" href="/" aria-label="Chatus">
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
          <Button>{locale === 'en' ? 'Start chatting' : 'Начать общение'}</Button>
        </div>
      </div>

      <MobileMenu items={mobileItems} />
    </header>
  );
}
