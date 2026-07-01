'use client';

import decorOpen from '@/assets/decor/how-work/1.svg';
import decorSearch from '@/assets/decor/how-work/2.svg';
import decorChat from '@/assets/decor/how-work/3.svg';
import { useLocale } from '@/i18n/useLocale';
import './Steps.scss';

const steps = [
  {
    title: 'Откройте Chatus',
    text: 'Запустите Chatus в Telegram — \n без регистраций и установки приложения',
    decor: decorOpen,
  },
  {
    title: 'Запустите поиск',
    text: 'Нажмите кнопку поиска —\nСистема подберёт случайного собеседника',
    decor: decorSearch,
  },
  {
    title: 'Общайтесь \nв чате',
    text: 'Общайтесь анонимно\nи сами решайте, когда перейти\nк личному контакту',
    decor: decorChat,
  },
];

const enSteps = [
  {
    title: 'Open \n Chatus',
    text: 'Launch Chatus in Telegram — \n no registration or app \n installation needed',
    decor: decorOpen,
  },
  {
    title: 'Start \n searching',
    text: 'Tap the search button —\nthe system will match you \n with a random chat partner',
    decor: decorSearch,
  },
  {
    title: 'Chat \n anonymously',
    text: 'Chat anonymously and decide for yourself when to switch \n to personal contact',
    decor: decorChat,
  },
];

const idSteps = [
  {
    title: 'Buka \n Chatus',
    text: 'Buka Chatus di Telegram — \n tanpa registrasi atau instalasi \n aplikasi',
    decor: decorOpen,
  },
  {
    title: 'Mulai \n pencarian',
    text: 'Tekan tombol pencarian — \n sistem akan mencarikan \n teman ngobrol secara acak',
    decor: decorSearch,
  },
  {
    title: 'Ngobrol \n anonim',
    text: 'Ngobrol secara anonim \n dan tentukan sendiri \n kapan ingin beralih ke kontak pribadi',
    decor: decorChat,
  },
];

export function Steps() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const currentSteps = isEnglish ? enSteps : isIndonesian ? idSteps : steps;

  return (
    <section className="steps audience-steps__surface" id="steps">
      <div className="steps__container">
        <h2 className="section-title">
          {isEnglish ? (
            <>
              Start
              <br />
              chatting
              <br />
              in seconds
            </>
          ) : isIndonesian ? (
            <>
              Mulai ngobrol
              <br />
              dalam hitungan
              <br />
              detik
            </>
          ) : (
            <>
              Начните общаться
              <br />
              за секунды
            </>
          )}
        </h2>

        <div className="steps__grid">
          {currentSteps.map((step, index) => (
            <article className="steps__item" key={step.title}>
              <span className="steps__number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="card-title">{step.title}</h3>
              <img className={`steps__decor steps__decor--${index + 1}`} src={step.decor} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
