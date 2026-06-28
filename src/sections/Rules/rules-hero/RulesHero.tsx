import './RulesHero.scss';

export function RulesHero() {
  return (
    <section className="rules-hero" aria-labelledby="rules-title">
      <h1 id="rules-title">
        Правила
        <br />
        Chatus
      </h1>

      <article className="rules-age-card">
        <strong>18+</strong>
        <p>
          Сервис строго 18+. Если вам меньше — пожалуйста, не используйте Chatus.
        </p>
      </article>

      <div className="rules-hero__copy">
        <p>
          Chatus — это анонимный чат для общения и знакомств. Здесь
          встречаются два случайных человека, у которых есть желание
          поговорить. Вы сами решаете, что и когда рассказывать собеседнику,
          и можете завершить диалог в любой момент.
        </p>
        <p>
          Чтобы общение оставалось приятным и безопасным для всех, мы просим
          придерживаться нескольких простых правил.
        </p>
      </div>
    </section>
  );
}
