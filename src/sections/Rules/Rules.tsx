import iconPolite from '@/assets/decor/rules/1.svg';
import iconPrivacy from '@/assets/decor/rules/2.svg';
import iconInterest from '@/assets/decor/rules/3.svg';
import iconCross from '@/assets/decor/rules/cross.svg';
import svetSrc from '@/assets/decor/svet.png';
import './Rules.scss';

const principles = [
  {
    title: 'Будьте вежливы',
    icon: iconPolite,
    text: 'Относитесь к собеседнику с уважением. Если разговор не сложился — просто завершите чат без оскорблений.',
  },
  {
    title: 'Не торопитесь раскрываться',
    icon: iconPrivacy,
    text: 'Вы сами решаете, что рассказывать о себе. Не передавайте личные данные и не показывайте себя до другого человека.',
  },
  {
    title: 'Сделайте разговор интересным',
    icon: iconInterest,
    text: 'Задавайте вопросы, делитесь мыслями и поддерживайте диалог. Хороший разговор начинается с участия обеих сторон.',
  },
];

const bans = [
  {
    title: 'Спам и реклама',
    text: 'Продвижение товаров, услуг, каналов и сторонних ботов запрещено. Любые попытки коммерческого продвижения модерируются.',
  },
  {
    title: 'Призывы к насилию',
    text: 'Угрозы, призывы к насилию или травле других пользователей запрещены для поддержки тёплой атмосферы.',
  },
  {
    title: 'Любой контент с лицами не достигших 18 лет',
    text: 'Запрещено упоминать, публиковать или искать контент с участием людей младше 18 лет, в любой форме и контексте.',
  },
  {
    title: 'Сексуальный контент без согласия',
    text: 'Материалы интимного характера, отправленные собеседнику без его явного согласия, нарушают правила Chatus.',
  },
  {
    title: 'Мошенничество и обман',
    text: 'Финансовые схемы, подозрительные сборы, попытки выманить данные, деньги или коды подтверждения запрещены.',
  },
  {
    title: 'Чужие персональные данные',
    text: 'Имена, адреса, телефоны и фото других людей без их согласия — это нарушение приватности и пространства Chatus.',
  },
  {
    title: 'Незаконные товары и услуги',
    text: 'Наркотики, оружие, поддельные документы и любые другие товары, запрещённые законом, недопустимы.',
  },
  {
    title: 'Оскорбления и травля',
    text: 'Оскорбления по полу, расе, религии, ориентации, внешности, уровню дохода или другим признакам запрещены.',
  },
  {
    title: 'Прямые ссылки t.me',
    text: 'Делиться запрещёнными или нежелательными ссылками нельзя. Используйте Chatus безопасно и уважайте собеседника.',
  },
];

export function Rules() {
  return (
    <section className="rules-page">
      <img className="rules-page__rays" src={svetSrc.src} alt="" aria-hidden="true" />

      <div className="rules-page__container">
        <section className="rules-hero" aria-labelledby="rules-title">
          <h1 id="rules-title">
            Правила
            <br />
            Chatus
          </h1>

          <article className="rules-age-card">
            <strong>18+</strong>
            <p>
              Сервис строго 18+. Если вам меньше — пожалуйста, не используйте
              Chatus.
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

        <section className="rules-principles" aria-label="Главные правила общения">
          {principles.map((item) => (
            <article className="rules-principle-card" key={item.title}>
              <h2>{item.title}</h2>
              <img src={item.icon} alt="" aria-hidden="true" />
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rules-ban" aria-labelledby="rules-ban-title">
          <div className="rules-ban__intro">
            <h2 id="rules-ban-title">
              Что нельзя
              <br />
              делать в Chatus
            </h2>
            <p>
              Эти правила работают для всех. Они помогают сделать так, чтобы
              общение в чате оставалось безопасным и не превращалось во что-то
              неприятное.
            </p>
          </div>

          <div className="rules-ban__grid">
            {bans.map((item) => (
              <article className="rules-ban-card" key={item.title}>
                <img src={iconCross} alt="" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rules-penalty" aria-labelledby="rules-penalty-title">
          <h2 id="rules-penalty-title">
            Что будет при
            <br />
            нарушении
          </h2>
          <p>
            Нарушение этих правил может привести к временному ограничению или
            постоянной блокировке доступа к Chatus. Все сообщения проходят
            автоматическую и ручную проверку. Если вы считаете, что вас
            заблокировали по ошибке — напишите в поддержку, мы пересмотрим
            решение.
          </p>
        </section>
      </div>
    </section>
  );
}
