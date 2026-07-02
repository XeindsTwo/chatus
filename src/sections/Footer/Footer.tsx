import './Footer.scss';
import { Button } from '@/components/Button';
import { ruBotHref } from '@/lib/telegramLinks';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__stage" aria-hidden="true">
          <span className="footer__face footer__face--small" />
          <span className="footer__face footer__face--main" />
          <span className="footer__face footer__face--small" />
        </div>
        <h2>
          Найдите своего
          <br />
          собеседника уже сейчас
        </h2>
        <p>
          Декоративные изображения можно будет заменить на готовые рендеры или
          иллюстрации без перестройки секций.
        </p>
        <Button href={ruBotHref} target="_blank" rel="noreferrer">Найти собеседника</Button>
      </div>
    </footer>
  );
}
