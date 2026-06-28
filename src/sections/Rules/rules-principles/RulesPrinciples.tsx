import iconPolite from '@/assets/decor/rules/1.svg';
import iconPrivacy from '@/assets/decor/rules/2.svg';
import iconInterest from '@/assets/decor/rules/3.svg';
import './RulesPrinciples.scss';

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

export function RulesPrinciples() {
  return (
    <section className="rules-principles indent" aria-label="Главные правила общения">
      {principles.map((item) => (
        <article className="rules-principle-card" key={item.title}>
          <h2>{item.title}</h2>
          <img src={item.icon} alt="" aria-hidden="true" />
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}
