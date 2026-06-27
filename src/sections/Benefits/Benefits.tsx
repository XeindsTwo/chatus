import benefitFast from '@/assets/decor/benefits/1.svg';
import benefitFlirt from '@/assets/decor/benefits/2.svg';
import benefitFlirtBg from '@/assets/decor/benefits/2-bg.svg';
import benefitAnon from '@/assets/decor/benefits/3.svg';
import benefitAnonBg from '@/assets/decor/benefits/3-bg.svg';
import benefitTelegram from '@/assets/decor/benefits/4.svg';
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
    variant: 'telegram',
    decorOnly: true,
  },
];

export function Benefits() {
  return (
    <section className="benefits indent" id="benefits">
      <div className="benefits__container">
        <h2 className="benefits__title section-title">
          Удобен
          <br />
          для общения
        </h2>

        <div className="benefits__cards">
          {benefits.map((benefit) => (
            <article
              className={`benefits__card benefits__card--${benefit.variant}${benefit.decorOnly ? ' benefits__card--decor-only' : ''}`}
              key={benefit.title}
            >
              {benefit.background ? (
                <img className="benefits__card-bg" src={benefit.background} alt="" aria-hidden="true" />
              ) : null}
              <img className="benefits__decor" src={benefit.image} alt="" aria-hidden="true" />

              <div className="benefits__content">
                <h3 className="benefits__card-title card-title">{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
