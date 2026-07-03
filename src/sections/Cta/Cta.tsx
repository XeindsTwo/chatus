'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import type { DotLottie } from '@lottiefiles/dotlottie-react/webgl';
import { Button } from '@/components/Button';
import { useLocale } from '@/i18n/useLocale';
import { getBotHref } from '@/lib/telegramLinks';
import './Cta.scss';

const mobileLottieQuery = '(max-width: 530px)';
const peepsCarouselSrc = '/peeps_carousel.json';
const peepsCarouselMobileSrc = '/peeps_carousel_mobile.json';

type DotLottieReactComponent = ComponentType<{
  autoplay?: boolean;
  className?: string;
  dotLottieRefCallback?: (dotLottie: DotLottie) => void;
  layout?: { fit: 'contain'; align: [number, number] };
  loop?: boolean;
  renderConfig?: { devicePixelRatio: number };
  src: string;
  useFrameInterpolation?: boolean;
}>;

export function Cta() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const botHref = getBotHref(locale);
  const [isMobileLottie, setIsMobileLottie] = useState(false);
  const [DotLottieComponent, setDotLottieComponent] = useState<DotLottieReactComponent | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<HTMLDivElement | null>(null);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const isLottieLoadingRef = useRef(false);
  const shouldPlayRef = useRef(false);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia(mobileLottieQuery);
    const syncLottieSource = () => {
      setIsMobileLottie(media.matches);
      dotLottieRef.current = null;
      shouldPlayRef.current = false;
      hasPlayedRef.current = false;
    };

    syncLottieSource();
    media.addEventListener('change', syncLottieSource);

    return () => {
      media.removeEventListener('change', syncLottieSource);
    };
  }, []);

  const playOnce = useCallback(() => {
    if (hasPlayedRef.current || !dotLottieRef.current) {
      return;
    }

    dotLottieRef.current.stop();
    dotLottieRef.current.setLoop(false);
    dotLottieRef.current.play();
    hasPlayedRef.current = true;
  }, []);

  const loadLottie = useCallback(() => {
    if (DotLottieComponent || isLottieLoadingRef.current) {
      return;
    }

    isLottieLoadingRef.current = true;
    import('@lottiefiles/dotlottie-react/webgl').then((module) => {
      setDotLottieComponent(() => module.DotLottieReact);
    });
  }, [DotLottieComponent]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadLottie();
          preloadObserver.disconnect();
        }
      },
      { rootMargin: '420px 0px', threshold: 0 },
    );

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const ratioBase = Math.min(rect.height, viewportHeight);
        const visibleRatio = ratioBase > 0 ? visibleHeight / ratioBase : 0;

        if (visibleRatio >= 0.8) {
          shouldPlayRef.current = true;
          playOnce();
          playObserver.disconnect();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    preloadObserver.observe(section);
    playObserver.observe(section);

    return () => {
      preloadObserver.disconnect();
      playObserver.disconnect();
    };
  }, [loadLottie, playOnce]);

  return (
    <section className="cta" ref={sectionRef}>
      <div className="cta__container">
        <h2 className="cta__title section-title">
          {isEnglish ? 'Find someone' : isIndonesian ? 'Temukan teman' : 'Найдите своего'}
          <br />
          {isEnglish ? 'to chat with' : isIndonesian ? 'untuk chat' : 'собеседника'}
          <br />
          {isEnglish ? 'right now' : isIndonesian ? 'sekarang' : 'уже сейчас'}
        </h2>

        <div className="cta__animation" aria-label={isEnglish ? 'Chat partners animation' : isIndonesian ? 'Animasi teman chat' : 'Анимация собеседников'} ref={animationRef}>
          {DotLottieComponent ? (
            <DotLottieComponent
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
              key={isMobileLottie ? 'mobile' : 'desktop'}
              src={isMobileLottie ? peepsCarouselMobileSrc : peepsCarouselSrc}
              useFrameInterpolation={false}
            />
          ) : null}
        </div>

        <p className="cta__text">
          {isEnglish ? (
            <>
              Open Chatus and start chatting <br /> anonymously in seconds
            </>
          ) : isIndonesian ? (
            <>
              Buka Chatus dan mulai chat anonim <br /> dalam hitungan detik
            </>
          ) : (
            <>
              Откройте Chatus и начните анонимное <br /> общение за несколько секунд
            </>
          )}
        </p>

        <Button className="cta__button" href={botHref} target="_blank" rel="noreferrer">
          <span className="cta__button-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.2391 3.09578C16.4481 3.01097 16.6769 2.98172 16.9016 3.01107C17.1263 3.04043 17.3388 3.12731 17.5169 3.26267C17.6949 3.39804 17.8321 3.57694 17.9141 3.78076C17.9961 3.98458 18.02 4.20587 17.9832 4.42158L16.0648 15.6387C15.8788 16.7207 14.6473 17.3412 13.6179 16.8023C12.7568 16.3514 11.478 15.6567 10.3276 14.9318C9.75248 14.5689 7.99063 13.407 8.20716 12.5802C8.39324 11.8733 11.3536 9.21681 13.0453 7.63743C13.7092 7.01693 13.4064 6.65898 12.6224 7.22974C10.6753 8.64686 7.54911 10.8019 6.51551 11.4085C5.60372 11.9434 5.12836 12.0348 4.55997 11.9434C3.52299 11.7771 2.56129 11.5194 1.77637 11.2055C0.715709 10.7815 0.767304 9.37581 1.77552 8.96649L16.2391 3.09578Z" fill="white" />
            </svg>
          </span>
          {isEnglish ? 'Start chatting' : isIndonesian ? 'Cari teman chat' : 'Найти собеседника'}
        </Button>
      </div>
    </section>
  );
}
