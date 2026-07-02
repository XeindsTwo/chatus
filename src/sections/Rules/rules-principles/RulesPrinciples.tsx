'use client';

import { useRef } from 'react';
import iconPolite from '@/assets/decor/rules/1.svg';
import iconPrivacy from '@/assets/decor/rules/2.svg';
import iconInterest from '@/assets/decor/rules/3.svg';
import { useLocale } from '@/i18n/useLocale';
import { useSmoothHorizontalScroll } from '@/lib/useSmoothHorizontalScroll';
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

const enPrinciples = [
  {
    title: 'Be polite',
    icon: iconPolite,
    text: 'Respect your chat partner. If the chat does not work out, end it without insults.',
  },
  {
    title: 'Do not rush to open up',
    icon: iconPrivacy,
    text: 'You decide what to share. Do not send personal data to strangers.',
  },
  {
    title: 'Make the chat fun',
    icon: iconInterest,
    text: 'Ask questions, share thoughts, and keep the dialogue going. A good chat needs both sides.',
  },
];

const idPrinciples = [
  {
    title: 'Bersikap sopan',
    icon: iconPolite,
    text: 'Hormati teman chat kamu. \n Jika tidak cocok, akhiri \n chat tanpa hinaan.',
  },
  {
    title: 'Jangan rush membuka diri',
    icon: iconPrivacy,
    text: 'Kamu memilih apa yang dibagi. Jangan kirim data pribadi \n ke orang asing.',
  },
  {
    title: 'Buat chat menarik',
    icon: iconInterest,
    text: 'Ajukan pertanyaan, bagikan pikiran, dan jaga obrolan. \n Chat baik butuh dua pihak.',
  },
];

export function RulesPrinciples() {
  const locale = useLocale();
  const items = locale === 'en' ? enPrinciples : locale === 'id' ? idPrinciples : principles;
  const listRef = useRef<HTMLElement | null>(null);

  useSmoothHorizontalScroll(listRef, { media: '(max-width: 900px)' });

  return (
    <section className="rules-principles indent" aria-label={locale === 'en' ? 'Main chat rules' : locale === 'id' ? 'Aturan utama chat' : 'Главные правила общения'} ref={listRef}>
      {items.map((item) => (
        <article className="rules-principle-card" key={item.title}>
          <h2>{item.title}</h2>
          <img src={item.icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}
