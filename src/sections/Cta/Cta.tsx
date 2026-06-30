'use client';

import { useCallback, useEffect, useRef } from 'react';
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react/webgl';
import { Button } from '@/components/Button';
import peepsCarousel from '@/peeps_carousel.lottie';
import './Cta.scss';

const desktopAnimationQuery = '(min-width: 993px)';

export function Cta() {
  const animationRef = useRef<HTMLDivElement | null>(null);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const shouldPlayRef = useRef(false);
  const hasPlayedRef = useRef(false);

  const playOnce = useCallback(() => {
    if (hasPlayedRef.current || !dotLottieRef.current) {
      return;
    }

    dotLottieRef.current.stop();
    dotLottieRef.current.setLoop(false);
    dotLottieRef.current.play();
    hasPlayedRef.current = true;
  }, []);

  useEffect(() => {
    const animation = animationRef.current;

    if (!animation) {
      return;
    }

    const media = window.matchMedia(desktopAnimationQuery);
    let observer: IntersectionObserver | undefined;

    const cleanupObserver = () => {
      observer?.disconnect();
      observer = undefined;
    };

    const setupObserver = () => {
      cleanupObserver();

      if (!media.matches) {
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          shouldPlayRef.current = true;
          playOnce();
          observer?.disconnect();
        },
        { threshold: 0.42 },
      );

      observer.observe(animation);
    };

    setupObserver();
    media.addEventListener('change', setupObserver);

    return () => {
      media.removeEventListener('change', setupObserver);
      cleanupObserver();
    };
  }, [playOnce]);

  return (
    <section className="cta">
      <div className="cta__container">
        <h2 className="cta__title section-title">
          Найдите своего
          <br />
          собеседника
          <br />
          уже сейчас
        </h2>

        <div className="cta__animation" aria-label="Анимация собеседников" ref={animationRef}>
          <DotLottieReact
            autoplay={false}
            className="cta__lottie"
            dotLottieRefCallback={(dotLottie) => {
              dotLottieRef.current = dotLottie;

              if (shouldPlayRef.current) {
                playOnce();
              }
            }}
            layout={{ fit: 'contain', align: [0.5, 0.5] }}
            loop={false}
            renderConfig={{ devicePixelRatio: 1 }}
            src={peepsCarousel}
            useFrameInterpolation={false}
          />
        </div>

        <p className="cta__text">
          Откройте Chatus и начните анонимное <br /> общение за несколько секунд
        </p>

        <Button className="cta__button" href="https://t.me/chatusbot" target="_blank" rel="noreferrer">
          <span className="cta__button-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.2391 3.09578C16.4481 3.01097 16.6769 2.98172 16.9016 3.01107C17.1263 3.04043 17.3388 3.12731 17.5169 3.26267C17.6949 3.39804 17.8321 3.57694 17.9141 3.78076C17.9961 3.98458 18.02 4.20587 17.9832 4.42158L16.0648 15.6387C15.8788 16.7207 14.6473 17.3412 13.6179 16.8023C12.7568 16.3514 11.478 15.6567 10.3276 14.9318C9.75248 14.5689 7.99063 13.407 8.20716 12.5802C8.39324 11.8733 11.3536 9.21681 13.0453 7.63743C13.7092 7.01693 13.4064 6.65898 12.6224 7.22974C10.6753 8.64686 7.54911 10.8019 6.51551 11.4085C5.60372 11.9434 5.12836 12.0348 4.55997 11.9434C3.52299 11.7771 2.56129 11.5194 1.77637 11.2055C0.715709 10.7815 0.767304 9.37581 1.77552 8.96649L16.2391 3.09578Z" fill="white" />
            </svg>
          </span>
          Найти собеседника
        </Button>
      </div>
    </section>
  );
}
