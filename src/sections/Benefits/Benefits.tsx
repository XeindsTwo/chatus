'use client';

import benefitFast from '@/assets/decor/benefits/1.svg';
import benefitFlirt from '@/assets/decor/benefits/2.svg';
import benefitFlirtBg from '@/assets/decor/benefits/2-bg.svg';
import benefitAnon from '@/assets/decor/benefits/3.svg';
import benefitAnonBg from '@/assets/decor/benefits/3-bg.svg';
import benefitTelegram from '@/assets/decor/benefits/4.svg';
import benefitTelegramCard from '@/assets/decor/benefits/card-4-desktop.svg';
import benefitTelegramCardEn from '@/assets/decor/benefits/card-4-desktop-en.svg';
import benefitTelegramCardId from '@/assets/decor/benefits/card-4-desktop-id.svg';
import { useLocale } from '@/i18n/useLocale';
import './Benefits.scss';

const benefits = [
  {
    title: 'Быстрый старт',
    text: 'Начните общение сразу — без долгой регистрации и лишних действий',
    image: benefitFast,
    variant: 'fast',
  },
  {
    title: 'Флирт-чат',
    text: 'Формат для романтического общения, флирта и новых знакомств',
    image: benefitFlirt,
    background: benefitFlirtBg,
    variant: 'flirt',
    decorOnly: true,
  },
  {
    title: 'Без анкет и профилей',
    text: 'Не нужно создавать профиль, загружать фото и долго рассказывать о себе',
    image: benefitAnon,
    background: benefitAnonBg,
    variant: 'anon',
    decorOnly: true,
  },
  {
    title: 'Всё внутри Telegram',
    text: 'Не нужно устанавливать новое приложение — общение начинается в привычном мессенджере',
    image: benefitTelegram,
    fullCardImage: benefitTelegramCard,
    variant: 'telegram',
    decorOnly: true,
  },
];

const enBenefits = [
  {
    title: 'Quick start',
    text: 'Start chatting right away — \n no long registration \n or extra steps',
    image: benefitFast,
    variant: 'fast',
  },
  {
    title: 'Flirt-chat',
    text: 'A space for romantic chats, \n flirting, and meeting \n new people',
    image: benefitFlirt,
    background: benefitFlirtBg,
    variant: 'flirt',
    decorOnly: true,
  },
  {
    title: 'No forms or profiles',
    text: 'No need to create a profile, \n upload photos, or talk \n about yourself first',
    image: benefitAnon,
    background: benefitAnonBg,
    variant: 'anon',
    decorOnly: true,
  },
  {
    title: 'All inside Telegram',
    text: 'No need to install a new app — chatting starts in a familiar messenger',
    image: benefitTelegram,
    fullCardImage: benefitTelegramCardEn,
    variant: 'telegram',
    decorOnly: true,
  },
];

const idBenefits = [
  {
    title: 'Mulai cepat',
    text: 'Mulai ngobrol langsung — \n tanpa registrasi panjang \n atau langkah tambahan',
    image: benefitFast,
    variant: 'fast',
  },
  {
    title: 'Chat \n flirting',
    text: 'Format untuk obrolan romantis, \n flirting, dan bertemu \n dengan orang baru',
    image: benefitFlirt,
    background: benefitFlirtBg,
    variant: 'flirt',
    decorOnly: true,
  },
  {
    title: 'Tanpa \n form profil',
    text: 'Tidak perlu membuat profil, \n mengunggah foto, atau panjang \n bercerita tentang diri sendiri',
    image: benefitAnon,
    background: benefitAnonBg,
    variant: 'anon',
    decorOnly: true,
  },
  {
    title: 'Semua di Telegram',
    text: 'Tidak perlu memasang aplikasi baru — obrolan dimulai di messenger yang sudah familiar',
    image: benefitTelegram,
    fullCardImage: benefitTelegramCardId,
    variant: 'telegram',
    decorOnly: true,
  },
];

export function Benefits() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const currentBenefits = isEnglish ? enBenefits : isIndonesian ? idBenefits : benefits;

  return (
    <section className="benefits indent" id="benefits">
      <div className="benefits__container">
        <h2 className="benefits__title section-title">
          {isEnglish ? (
            <>
              Made for
              <br />
              easy chatting
            </>
          ) : isIndonesian ? (
            <>
              Dirancang
              <br />
              untuk ngobrol
            </>
          ) : (
            <>
              Удобен для
              <br />
              общения
            </>
          )}
        </h2>

        <div className="benefits__cards">
          {currentBenefits.map((benefit) => (
            <article
              className={`benefits__card benefits__card--${benefit.variant}${
                benefit.decorOnly ? ' benefits__card--decor-only' : ''
              }`}
              key={benefit.title}
            >
              {benefit.background ? (
                <img
                  className="benefits__card-bg"
                  src={benefit.background}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}

              {benefit.fullCardImage ? (
                <img
                  className="benefits__full-card"
                  src={benefit.fullCardImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}

              <img
                className="benefits__decor"
                src={benefit.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />

              {benefit.variant !== 'telegram' ? (
                <div className="benefits__content">
                  <h3 className="benefits__card-title card-title">
                    {benefit.variant === 'fast' ? (
                      <>
                        {isEnglish ? 'Quick' : isIndonesian ? 'Mulai' : 'Быстрый'}
                        <br />
                        {isEnglish ? 'start' : isIndonesian ? 'cepat' : 'старт'}
                      </>
                    ) : (
                      benefit.title
                    )}
                  </h3>
                  <p>{benefit.text}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
