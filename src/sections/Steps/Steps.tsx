import decorOpen from '@/assets/decor/how-work/1.svg';
import decorSearch from '@/assets/decor/how-work/2.svg';
import decorChat from '@/assets/decor/how-work/3.svg';
import './Steps.scss';

const steps = [
  {
    title: 'Откройте Chatus',
    text: 'Запустите Chatus в Telegram — \n без регистраций и установки приложения',
    decor: decorOpen,
  },
  {
    title: 'Запустите поиск',
    text: 'Нажмите кнопку поиска —\nСистема подберёт случайного собеседника',
    decor: decorSearch,
  },
  {
    title: 'Общайтесь \nв чате',
    text: 'Общайтесь анонимно\nи сами решайте, когда перейти\nк личному контакту',
    decor: decorChat,
  },
];

export function Steps() {
  return (
    <section className="steps audience-steps__surface" id="steps">
      <div className="steps__container">
        <h2 className="section-title">
          Начните общаться
          <br />
          за секунды
        </h2>

        <div className="steps__grid">
          {steps.map((step, index) => (
            <article className="steps__item" key={step.title}>
              <div className="steps__content">
                <span className="steps__number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="card-title">{step.title}</h3>
                <p>{step.text}</p>
              </div>

              <img className={`steps__decor steps__decor--${index + 1}`} src={step.decor} alt="" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
