'use client';

import { useEffect, useState } from 'react';
import whatThisSrc from '@/assets/what-this.webp';
import whatThisEnSrc from '@/assets/what-this-en.webp';
import whatThisIdSrc from '@/assets/what-this-id.webp';
import type { Locale } from '@/i18n/config';
import { localeChangeEvent, localeStorageKey, normalizeLocale, useLocale } from '@/i18n/useLocale';
import './Intro.scss';

const introImages: Record<Locale, string> = {
  id: whatThisIdSrc.src,
  en: whatThisEnSrc.src,
  ru: whatThisSrc.src,
};

export function Intro() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const [imageSrc, setImageSrc] = useState(introImages[locale]);

  useEffect(() => {
    setImageSrc(introImages[locale]);
  }, [locale]);

  useEffect(() => {
    const syncImage = (locale: string | null) => {
      const nextLocale = normalizeLocale(locale);

      if (!nextLocale) {
        setImageSrc(introImages.ru);
        return;
      }

      setImageSrc(introImages[nextLocale]);
    };

    syncImage(window.localStorage.getItem(localeStorageKey));

    const handleStorage = (event: StorageEvent) => {
      if (event.key === localeStorageKey) {
        syncImage(event.newValue);
      }
    };

    const handleLocaleChange = (event: Event) => {
      syncImage((event as CustomEvent<Locale>).detail);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(localeChangeEvent, handleLocaleChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(localeChangeEvent, handleLocaleChange);
    };
  }, []);

  return (
    <section className="intro">
      <div className="faq__container">
        <img className="intro__image" src={imageSrc} alt="" aria-hidden="true" loading="lazy" decoding="async"/>
      </div>


      <div className="intro__content">
        <h2 className="intro__title section-title">
          {isEnglish ? (
            <>
              What is
              <br/>
              Chatus
            </>
          ) : isIndonesian ? (
            <>
              Apa itu
              <br/>
              Chatus
            </>
          ) : (
            <>
              Что такое
              <br/>
              Chatus
            </>
          )}
        </h2>
        <p>
          {isEnglish
            ? 'Chatus is an anonymous chat roulette that helps you quickly find someone to chat, flirt, or connect with. Just hit search — and within a few seconds, you\'re talking to a new person.'
            : isIndonesian
              ? 'Chatus membantumu cepat menemukan seseorang untuk mengobrol, flirting, atau berkenalan. Cukup mulai pencarian — dan dalam beberapa detik kamu bisa berbicara dengan orang baru.'
            : 'Chatus — это анонимная чат-рулетка, где можно легко найти собеседника для общения, знакомства или флирта. Запускаешь поиск — и уже через пару секунд ты общаешься с новым человеком.'}
        </p>
      </div>
    </section>
  );
}
