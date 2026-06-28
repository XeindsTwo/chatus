import whatThisSrc from '@/assets/what-this.png';
import './Intro.scss';

export function Intro() {
  return (
    <section className="intro">
      <img className="intro__image" src={whatThisSrc.src} alt="" aria-hidden="true"/>

      <div className="intro__content">
        <h2 className="intro__title section-title">
          Что такое
          <br/>
          Chatus
        </h2>
        <p>
          Chatus помогает быстро найти человека для общения, флирта или знакомства. Просто запускаешь поиск — и уже
          через несколько секунд можешь говорить с новым собеседником
        </p>
      </div>
    </section>
  );
}
