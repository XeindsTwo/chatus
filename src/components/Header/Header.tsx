import './Header.scss';
import logoSrc from '@/assets/decor/icons/logo.svg';
import { Button } from '@/components/Button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { MobileMenu } from '@/components/MobileMenu/MobileMenu';

const navItems = [
  { label: 'Аудитория', href: '/#audience' },
  { label: 'Как это работает', href: '/#steps' },
  { label: 'Преимущества', href: '/#benefits' },
  { label: 'Premium', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Правила сервиса', href: '/rules' },
];

const mobileNavItems = navItems.filter((item) => item.href !== '/rules');

export function Header() {
  return (
    <header className="header">
      <a className="header__brand" href="/" aria-label="Chatus">
        <img src={logoSrc} alt="Chatus" width="130" height="38" />
      </a>

      <div className="header__glass">
        <LanguageSwitcher />
        <nav className="header__nav" aria-label="Главная навигация">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <Button>Начать общение</Button>
        </div>
      </div>

      <MobileMenu items={mobileNavItems} />
    </header>
  );
}
