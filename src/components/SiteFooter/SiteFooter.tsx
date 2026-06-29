import logoSrc from '@/assets/decor/icons/logo.svg';
import mailjoySrc from '@/assets/decor/icons/malijoy.svg';
import layoutStudySrc from '@/assets/decor/icons/layout-study.svg';
import footerDecorSrc from '@/assets/decor/footer.svg';
import './SiteFooter.scss';

const productLinks = [
  { label: 'Аудитория', href: '/#audience' },
  { label: 'Как это работает', href: '/#steps' },
  { label: 'Преимущества', href: '/#benefits' },
  { label: 'Premium', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

const legalLinks = [
  { label: 'Пользовательское соглашение', href: '/privacy' },
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Условия оплаты', href: '/privacy' },
  { label: 'Политика возврата', href: '/privacy' },
  { label: 'Правила общения', href: '/rules' },
];

const telegramLinks = [
  { label: 'Бот — @chatus', href: 'https://t.me/chatusbot' },
  { label: 'Канал — @chatusme', href: 'https://t.me/chatusteam' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <img className="site-footer__decor" src={footerDecorSrc} alt="" aria-hidden="true" />

      <div className="site-footer__container">
        <div className="site-footer__brand">
          <a className="site-footer__logo" href="/" aria-label="Chatus">
            <img src={logoSrc} alt="Chatus" width="130" height="38" />
          </a>
          <p className="site-footer__powered">
            powered by
            <a href="https://mailijoy.com" target="_blank">
              <img src={mailjoySrc} alt="mailijoy" />
            </a>
          </p>
          <p className="site-footer__copyright">©2026 Chatus. Все права защищены.</p>
          <div className="site-footer__actions">
            <div className="site-footer__langs" aria-label="Выбор языка">
              <button type="button">Id</button>
              <button type="button">En</button>
              <button type="button" aria-current="true">Ru</button>
            </div>
            <a className="site-footer__rules" href="/rules">
              Правила сервиса
            </a>
          </div>
        </div>

        <div className="site-footer__nav">
          <nav className="site-footer__column" aria-label="Продукт">
            <span>Продукт</span>
            {productLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>

          <nav className="site-footer__column" aria-label="Legal">
            <span>Legal</span>
            {legalLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>

          <nav className="site-footer__column" aria-label="Telegram">
            <span>Telegram</span>
            {telegramLinks.map((link) => (
              <a className="site-footer__external" href={link.href} key={link.label} target="_blank" rel="noreferrer">
                {link.label}
                <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0.494995 8.7002L8.495 0.700195M1.995 0.700195H8.495V7.2002" stroke="#2A1B00" strokeOpacity="0.7" strokeWidth="1.4" />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <p className="site-footer__made">
        Сделано с любовью в
        <a href="https://layout.com" target="_blank" rel="noreferrer" aria-label="Layout">
          <img src={layoutStudySrc} alt="Layout" />
        </a>
      </p>
    </footer>
  );
}
