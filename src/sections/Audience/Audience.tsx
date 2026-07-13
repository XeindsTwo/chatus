'use client';

import { useRef } from 'react';
import plusSrc from '@/assets/decor/icons/plus-auditoria.svg';
import { useLocale } from '@/i18n/useLocale';
import { useSmoothHorizontalScroll } from '@/lib/useSmoothHorizontalScroll';
import './Audience.scss';

const stats = [
  {
    label: 'Среднее время поиска собеседника',
    value: '0,56 сек',
    className: 'audience__card--time',
  },
  {
    label: 'Активных пользователей ежемесячно',
    value: '1 000 000+',
    className: 'audience__card--users',
  },
  {
    label: 'Новых диалогов ежедневно',
    value: '25 000+',
    className: 'audience__card--dialogs',
  },
];

const enStats = [
  {
    label: 'Average time to \n find a chat partner',
    value: '0,56 SEC',
    className: 'audience__card--time',
  },
  {
    label: 'Monthly active \n users',
    value: '1 000 000+',
    className: 'audience__card--users',
  },
  {
    label: 'New conversations \n daily',
    value: '500 000+',
    className: 'audience__card--dialogs',
  },
];

const idStats = [
  {
    label: 'Rata-rata waktu \n menemukan teman ngobrol',
    value: '0,56 DTK',
    className: 'audience__card--time',
  },
  {
    label: 'Pengguna aktif \n bulanan',
    value: '1 000 000+',
    className: 'audience__card--users',
  },
  {
    label: 'Percakapan \n baru setiap hari',
    value: '500 000+',
    className: 'audience__card--dialogs',
  },
];

export function Audience() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const currentStats = isEnglish ? enStats : isIndonesian ? idStats : stats;
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useSmoothHorizontalScroll(cardsRef, {
    media: '(max-width: 992px)',
    draggingClass: 'audience__cards--dragging',
  });

  return (
    <section className="audience" id="audience">
      <div className="audience__panel audience-steps__surface">
        <div className="audience__content">
        <h2 className="audience__title section-title">
          {isEnglish ? (
            <>
              Chatus connects
              <br />
              a live active
              <br />
              audience
            </>
          ) : isIndonesian ? (
            <>
              Chatus — platform
              <br />
              dengan audiens
              <br />
              aktif
            </>
          ) : (
            <>
              Chatus <span className="audience__desktop-dash">—</span> сервис
              <br />
              с активной
              <br />
              аудиторией
            </>
          )}
        </h2>

        <div className="audience__cards" ref={cardsRef}>
          {currentStats.map((stat) => (
            <article className={`audience__card ${stat.className}`} key={stat.label}>
              <p>{stat.label}</p>
              <img className="audience__plus" src={plusSrc} alt="" aria-hidden="true" loading="eager" decoding="async" />
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
