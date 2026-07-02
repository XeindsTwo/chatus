'use client';

import checkIcon from '@/assets/decor/tariffs/check-arrow-item.svg';
import diamondIcon from '@/assets/decor/tariffs/diamond.svg';
import freeIcon from '@/assets/decor/tariffs/free.svg';
import './Tariffs.scss';
import {Button} from "@/components/Button";
import { useLocale } from '@/i18n/useLocale';
import { getBotHref } from '@/lib/telegramLinks';

const plans = [
  {
    name: 'Free',
    description: 'Базовое общение для знакомств',
    price: '0 ₽',
    period: '/ в месяц',
    note: 'Доступно бесплатно',
    icon: freeIcon,
    variant: 'free',
    features: [
      'Поиск случайного собеседника',
      'Анонимные текстовые и аудио чаты',
      'Общение без регистрации',
      'Базовый подбор',
    ],
  },
  {
    name: 'Premium',
    description: 'Больше свободы в общении',
    price: '99 ₽',
    period: '/ день',
    note: 'Расширенный доступ',
    icon: diamondIcon,
    variant: 'premium',
    features: [
      'Пол и возраст собеседника',
      'Настройка поиска по полу',
      'Флирт-комната',
      'Premium-бейдж',
      'Без рекламы',
    ],
  },
];

const enPlans = [
  {
    name: 'Free',
    description: 'Basic chatting for meeting new people',
    price: '$0',
    period: '/ month',
    note: 'Available for free',
    icon: freeIcon,
    variant: 'free',
    features: [
      'Random chat partner search',
      'Anonymous text and audio chats',
      'No registration required',
      'Basic matching',
      'Standard access',
    ],
  },
  {
    name: 'Premium',
    description: 'More freedom \n in chatting',
    price: '$1',
    period: '/ day',
    note: 'Extended access',
    icon: diamondIcon,
    variant: 'premium',
    features: [
      'Chat partner’s gender and age',
      'Gender search settings',
      'Flirt-room',
      'Premium badge',
      'No ads',
    ],
  },
];

const idPlans = [
  {
    name: 'Free',
    description: 'Obrolan dasar untuk berkenalan',
    price: 'RP 0',
    period: '/ bulan',
    note: 'Tersedia gratis',
    icon: freeIcon,
    variant: 'free',
    features: [
      'Pencarian teman ngobrol acak',
      'Chat teks dan audio anonim',
      'Tanpa registrasi',
      'Pencocokan dasar',
      'Akses standar',
    ],
  },
  {
    name: 'Premium',
    description: 'Lebih bebas \n untuk ngobrol',
    price: 'Rp18K',
    period: '/ minggu',
    note: 'Akses diperluas',
    icon: diamondIcon,
    variant: 'premium',
    features: [
      'Jenis kelamin dan usia lawan bicara',
      'Pilih gender lawan bicara',
      'Ruang flirting',
      'Badge Premium',
      'Tanpa iklan',
    ],
  },
];

export function Tariffs() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const currentPlans = isEnglish ? enPlans : isIndonesian ? idPlans : plans;
  const botHref = getBotHref(locale);

  return (
    <section className="tariffs" id="pricing">
      <div className="tariffs__container">
        <h2 className="tariffs__title section-title">
          {isEnglish ? (
            <>
              More
              <br />
              for chatting
            </>
          ) : isIndonesian ? (
            <>
              Lebih banyak
              <br />
              untuk ngobrol
            </>
          ) : (
            <>
              Больше
              <br />
              для общения
            </>
          )}
        </h2>

        <div className="tariffs__cards">
          {currentPlans.map((plan) => (
            <article className={`tariffs__card tariffs__card--${plan.variant}`} key={plan.name}>
              <img className="tariffs__decor" src={plan.icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />

              <h3 className="tariffs__name card-title">{plan.name}</h3>
              <p className="tariffs__description">{plan.description}</p>

              <p className="tariffs__price">
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </p>

              <div className="tariffs__divider">
                <span>{plan.note}</span>
              </div>

              <ul className="tariffs__features">
                {plan.features.map((feature, index) => (
                  <li key={`${plan.name}-${index}-${feature}`}>
                    <img src={checkIcon} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.variant === 'premium' ? (
                  <Button
                      className={'tariffs__button'}
                      href={botHref}
                      target="_blank"
                      rel="noreferrer"
                      variant="dark"
                  >
                      <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.2391 3.09578C16.4481 3.01097 16.6769 2.98172 16.9016 3.01107C17.1263 3.04043 17.3388 3.12731 17.5169 3.26267C17.6949 3.39804 17.8321 3.57694 17.9141 3.78076C17.9961 3.98458 18.02 4.20587 17.9832 4.42158L16.0648 15.6387C15.8788 16.7207 14.6473 17.3412 13.6179 16.8023C12.7568 16.3514 11.478 15.6567 10.3276 14.9318C9.75248 14.5689 7.99063 13.407 8.20716 12.5802C8.39324 11.8733 11.3536 9.21681 13.0453 7.63743C13.7092 7.01693 13.4064 6.65898 12.6224 7.22974C10.6753 8.64686 7.54911 10.8019 6.51551 11.4085C5.60372 11.9434 5.12836 12.0348 4.55997 11.9434C3.52299 11.7771 2.56129 11.5194 1.77637 11.2055C0.715709 10.7815 0.767304 9.37581 1.77552 8.96649L16.2391 3.09578Z"
                              fill="white"
                          />
                      </svg>
                      {isEnglish ? 'Learn about Premium' : isIndonesian ? 'Pelajari Premium' : 'Узнать про Premium'}
                  </Button>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
