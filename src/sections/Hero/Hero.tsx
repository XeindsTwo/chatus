'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { getLocalizedHref, useLocale } from '@/i18n/useLocale';
import { onPageTransitionReady } from '@/lib/pageTransition';
import { getBotHref } from '@/lib/telegramLinks';
import faceRowOne from '@/assets/faces/1.png';
import faceRowTwo from '@/assets/faces/2.png';
import faceRowThree from '@/assets/faces/3.png';
import mobileFaceRowOne from '@/assets/faces/mobile/1.png';
import mobileFaceRowTwo from '@/assets/faces/mobile/2.png';
import mobileFaceRowThree from '@/assets/faces/mobile/3.png';
import luchiMainSrc from '@/assets/decor/luchi-main.png';
import './Hero.scss';

const faceRows = [
  { src: faceRowOne.src, mobileSrc: mobileFaceRowOne.src, className: 'hero__face-row--one', alt: '' },
  { src: faceRowTwo.src, mobileSrc: mobileFaceRowTwo.src, className: 'hero__face-row--two', alt: '' },
  { src: faceRowThree.src, mobileSrc: mobileFaceRowThree.src, className: 'hero__face-row--three', alt: '' },
];

export function Hero() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const botHref = getBotHref(locale);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    let startDelay: gsap.core.Tween | undefined;
    let fallbackDelay: gsap.core.Tween | undefined;
    let timeline: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 901px)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.hero__face-row');
        const revealItems = gsap.utils.toArray<HTMLElement>('[data-hero-reveal]');
        const rays = ref.current?.querySelector<HTMLElement>('.hero__rays');

        gsap.set(revealItems, { autoAlpha: 0, y: 34 });
        if (rays) {
          gsap.set(rays, { autoAlpha: 0 });
        }

        gsap.set(rows, {
          autoAlpha: 1,
          yPercent: (index) => [-115, 115, -115][index] ?? -115,
          xPercent: 0,
          scale: 1,
        });

        timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

        if (rays) {
          timeline.to(rays, {
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power2.out',
          }, 0);
        }

        timeline
          .to(revealItems, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.1,
          })
          .to(
            rows,
            {
              yPercent: 0,
              duration: 1.35,
              ease: 'power4.out',
            },
            0.12,
          );

        return () => {
          timeline?.kill();
          timeline = undefined;
        };
      });

      media.add('(max-width: 900px)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.hero__face-row');
        const revealItems = gsap.utils.toArray<HTMLElement>('[data-hero-reveal]');
        const rays = ref.current?.querySelector<HTMLElement>('.hero__rays');

        gsap.set(revealItems, { autoAlpha: 0, y: 28 });
        if (rays) {
          gsap.set(rays, { autoAlpha: 0 });
        }

        gsap.set(rows, {
          autoAlpha: 1,
          xPercent: (index) => [-115, 115, -115][index] ?? -115,
          yPercent: 0,
          scale: 1,
        });

        timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

        if (rays) {
          timeline.to(rays, {
            autoAlpha: 1,
            duration: 0.86,
            ease: 'power2.out',
          }, 0);
        }

        timeline
          .to(
            rows,
            {
              xPercent: 0,
              duration: 1.25,
              ease: 'power4.out',
            },
            0.06,
          )
          .to(
            revealItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              stagger: 0.08,
            },
            0.12,
          );

        return () => {
          timeline?.kill();
          timeline = undefined;
        };
      });

      return () => media.revert();
    }, ref);

    const playTimeline = () => {
      if (!timeline || timeline.progress() > 0) {
        return;
      }

      timeline.play(0);
    };

    const cleanupReady = onPageTransitionReady(() => {
      startDelay = gsap.delayedCall(0.24, playTimeline);
    });

    fallbackDelay = gsap.delayedCall(1.25, playTimeline);

    return () => {
      cleanupReady();
      startDelay?.kill();
      fallbackDelay?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={ref}>
      <Header />

      <img className="hero__rays" src={luchiMainSrc.src} alt="" aria-hidden="true" decoding="async" />

      <div className="hero__mask hero__mask--top" aria-hidden="true" />
      <div className="hero__mask hero__mask--bottom" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__copy">
          <h1 className="hero__title hero__title--desktop" data-hero-reveal>
            {isEnglish ? (
              <>
                Find a
                <br />
                friend
              </>
            ) : isIndonesian ? (
              <>
                Temukan
                <br />
                teman
              </>
            ) : (
              <>
                Найди
                <br />
                друга
              </>
            )}
          </h1>
          <h1 className="hero__title hero__title--mobile" data-hero-reveal>
            {isEnglish ? (
              <>
                Find a friend
                <br />
                in a few seconds
              </>
            ) : isIndonesian ? (
              <>
                Temukan
                <br />
                teman dalam
                <br />
                sekejap
              </>
            ) : (
              <>
                Найди
                <br />
                друга за пару
                <br />
                секунд
              </>
            )}
          </h1>
          <p className="hero__text" data-hero-reveal>
            {isEnglish
              ? 'Anonymous chats and new people in seconds — no registration, \n profiles, or identity reveal'
              : isIndonesian
                ? 'Chat anonim dan teman baru dalam hitungan detik — tanpa registrasi, profil, atau identitas'
              : 'Анонимное общение и новые знакомства за несколько секунд — без регистрации, анкет и раскрытия личности'}
          </p>
          <div className="hero__actions" data-hero-reveal>
            <Button href={botHref} target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2391 3.09578C16.4481 3.01097 16.6769 2.98172 16.9016 3.01107C17.1263 3.04043 17.3388 3.12731 17.5169 3.26267C17.6949 3.39804 17.8321 3.57694 17.9141 3.78076C17.9961 3.98458 18.02 4.20587 17.9832 4.42158L16.0648 15.6387C15.8788 16.7207 14.6473 17.3412 13.6179 16.8023C12.7568 16.3514 11.478 15.6567 10.3276 14.9318C9.75248 14.5689 7.99063 13.407 8.20716 12.5802C8.39324 11.8733 11.3536 9.21681 13.0453 7.63743C13.7092 7.01693 13.4064 6.65898 12.6224 7.22974C10.6753 8.64686 7.54911 10.8019 6.51551 11.4085C5.60372 11.9434 5.12836 12.0348 4.55997 11.9434C3.52299 11.7771 2.56129 11.5194 1.77637 11.2055C0.715709 10.7815 0.767304 9.37581 1.77552 8.96649L16.2391 3.09578Z"
                  fill="currentColor"
                />
              </svg>
              {isEnglish ? 'Start chatting' : isIndonesian ? 'Cari teman' : 'Найти собеседника'}
            </Button>
            <Button className="hero__rules-button" href={getLocalizedHref('/rules', locale)} variant="light">
              {isEnglish ? 'Service Rules' : isIndonesian ? 'Aturan Layanan' : 'Правила сервиса'}
            </Button>
          </div>
        </div>

        <div className="hero__faces" aria-hidden="true">
          <div className="hero__faces-rotated">
            {faceRows.map((row) => (
              <picture className={`hero__face-row ${row.className}`} key={row.className}>
                <source media="(max-width: 900px)" srcSet={row.mobileSrc} />
                <img
                  src={row.src}
                  alt={row.alt}
                  draggable={false}
                />
              </picture>
            ))}
          </div>
        </div>

        <strong className="hero__side-title" data-hero-reveal>
          {isEnglish ? (
            <>
              In
              <br />
              a few
              <br />
              seconds
            </>
          ) : isIndonesian ? (
            <>
              Cepat
              <br />
              dalam
              <br />
              sekejap
            </>
          ) : (
            <>
              За
              <br />
              пару
              <br />
              секунд
            </>
          )}
        </strong>
      </div>
    </section>
  );
}
