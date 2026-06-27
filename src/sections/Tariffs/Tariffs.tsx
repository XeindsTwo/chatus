import checkIcon from '@/assets/decor/tariffs/check-arrow-item.svg';
import diamondIcon from '@/assets/decor/tariffs/diamond.svg';
import freeIcon from '@/assets/decor/tariffs/free.svg';
import './Tariffs.scss';

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
      'Базовый подбор',
    ],
  },
  {
    name: 'Premium',
    description: 'Больше свободы в общении',
    price: '160 ₽',
    period: '/ в 3 дня',
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

export function Tariffs() {
  return (
    <section className="tariffs" id="pricing">
      <div className="tariffs__container">
        <h2 className="tariffs__title section-title">
          Больше
          <br />
          для общения
        </h2>

        <div className="tariffs__cards">
          {plans.map((plan) => (
            <article className={`tariffs__card tariffs__card--${plan.variant}`} key={plan.name}>
              <img className="tariffs__decor" src={plan.icon} alt="" aria-hidden="true" />

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
                    <img src={checkIcon} alt="" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.variant === 'premium' ? (
                <a className="tariffs__button" href="https://t.me/chatusbot" target="_blank" rel="noreferrer">
                  <span aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16.2391 3.09578C16.4481 3.01097 16.6769 2.98172 16.9016 3.01107C17.1263 3.04043 17.3388 3.12731 17.5169 3.26267C17.6949 3.39804 17.8321 3.57694 17.9141 3.78076C17.9961 3.98458 18.02 4.20587 17.9832 4.42158L16.0648 15.6387C15.8788 16.7207 14.6473 17.3412 13.6179 16.8023C12.7568 16.3514 11.478 15.6567 10.3276 14.9318C9.75248 14.5689 7.99063 13.407 8.20716 12.5802C8.39324 11.8733 11.3536 9.21681 13.0453 7.63743C13.7092 7.01693 13.4064 6.65898 12.6224 7.22974C10.6753 8.64686 7.54911 10.8019 6.51551 11.4085C5.60372 11.9434 5.12836 12.0348 4.55997 11.9434C3.52299 11.7771 2.56129 11.5194 1.77637 11.2055C0.715709 10.7815 0.767304 9.37581 1.77552 8.96649L16.2391 3.09578Z" fill="white" />
                    </svg>
                  </span>
                  Узнать про Premium
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
