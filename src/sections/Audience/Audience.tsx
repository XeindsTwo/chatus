'use client';

import { useEffect, useRef } from 'react';
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

const desktopAnimationQuery = '(min-width: 993px)';

type AudienceGsapContext = {
  revert: () => void;
};

export function Audience() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const currentStats = isEnglish ? enStats : isIndonesian ? idStats : stats;
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useSmoothHorizontalScroll(cardsRef, {
    media: '(max-width: 992px)',
    draggingClass: 'audience__cards--dragging',
  });

  useEffect(() => {
    if (!sectionRef.current || !panelRef.current) {
      return;
    }

    const media = window.matchMedia(desktopAnimationQuery);
    let ctx: AudienceGsapContext | undefined;
    let setupVersion = 0;

    const setupAnimation = () => {
      setupVersion += 1;
      const currentVersion = setupVersion;

      ctx?.revert();
      ctx = undefined;

      if (!media.matches) {
        return;
      }

      Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]).then(([gsapModule, scrollTriggerModule]) => {
        if (currentVersion !== setupVersion || !sectionRef.current || !panelRef.current || !media.matches) {
          return;
        }

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.audience__card');
        const content = sectionRef.current?.querySelector<HTMLElement>('.audience__content');
        const title = sectionRef.current?.querySelector<HTMLElement>('.audience__title');

        if (!content || !title) {
          return;
        }

        gsap.set(content, { y: 0 });
        gsap.set(cards[0], { x: -46, y: 58, rotate: -2.5 });
        gsap.set(cards[1], { x: 0, y: 18, rotate: 1.25 });
        gsap.set(cards[2], { x: 46, y: -18, rotate: 2.5 });

        const timeline = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=720',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            cards,
            {
              x: 0,
              y: 0,
              rotate: 0,
              duration: 0.72,
              stagger: 0.05,
            },
            0,
          )
          .fromTo(title, { scale: 0.96, y: 10 }, { scale: 1, y: 0, duration: 0.55 }, 0);
        }, sectionRef);
      });
    };

    setupAnimation();
    media.addEventListener('change', setupAnimation);

    return () => {
      setupVersion += 1;
      media.removeEventListener('change', setupAnimation);
      ctx?.revert();
    };
  }, []);

  return (
    <section className="audience" id="audience" ref={sectionRef}>
      <div className="audience__panel audience-steps__surface" ref={panelRef}>
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
              <img className="audience__plus" src={plusSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
