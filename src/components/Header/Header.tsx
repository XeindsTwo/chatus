'use client';

import './Header.scss';
import logoSrc from '@/assets/decor/icons/logo.svg';
import { Button } from '@/components/Button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { MobileMenu } from '@/components/MobileMenu/MobileMenu';
import { getLocalizedHref, useLocale } from '@/i18n/useLocale';
import { isMobileAnchorViewport, scrollToAnchorHref } from '@/lib/anchorScroll';
import { getBotHref } from '@/lib/telegramLinks';

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

const desktopHeaderAnchorOffset = 96;
const sectionTitleSelector = ':scope .section-title, :scope h1, :scope h2';

export function Header() {
  const locale = useLocale();
  const items = locale === 'en' ? enNavItems : locale === 'id' ? idNavItems : navItems;
  const localizedItems = items.map((item) => ({ ...item, href: getLocalizedHref(item.href, locale) }));
  const mobileItems = localizedItems.filter((item) => !item.href.endsWith('/rules'));
  const startChatText = locale === 'en' ? 'Start chatting' : locale === 'id' ? 'Mulai chat' : 'Начать общение';
  const botHref = getBotHref(locale);

  return (
    <header className="header">
      <div className="header__mobile-glass">
        <a className="header__brand" href={getLocalizedHref('/', locale)} aria-label="Chatus">
          <img src={logoSrc} alt="Chatus" width="130" height="38" />
        </a>
      </div>

      <MobileMenu items={mobileItems} />

      <div className="header__glass">
        <LanguageSwitcher />
        <nav className="header__nav" aria-label={locale === 'en' ? 'Main navigation' : 'Главная навигация'}>
          {localizedItems.map((item) => (
            <a
              href={item.href}
              key={item.label}
              onClickCapture={(event) => {
                if (isMobileAnchorViewport() || !item.href.includes('#')) {
                  return;
                }

                event.preventDefault();
                event.stopPropagation();
                scrollToAnchorHref(item.href, {
                  duration: 1.12,
                  ease: 'power3.inOut',
                  offset: desktopHeaderAnchorOffset,
                  targetSelector: sectionTitleSelector,
                });
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <Button href={botHref} target="_blank" rel="noreferrer">{startChatText}</Button>
        </div>
      </div>
    </header>
  );
}
