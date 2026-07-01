'use client';

import { useLocale } from '@/i18n/useLocale';
import './RulesHero.scss';

const enCopy = {
  title: ['Chatus', 'Rules'],
  age: 'Chatus is strictly 18+. If you are younger, please do not use Chatus.',
  paragraphs: [
    'Chatus is an anonymous chat for talking and meeting new people. Two random people meet here when both want to chat. You decide what to share with your chat partner and can end the conversation at any time.',
    'To keep chats pleasant and safe for everyone, please follow a few simple rules.',
  ],
};

const idCopy = {
  title: ['Aturan', 'Chatus'],
  age: 'Chatus hanya untuk 18+. Jika kamu lebih muda, mohon jangan gunakan Chatus.',
  paragraphs: [
    'Chatus adalah chat anonim untuk ngobrol dan berkenalan. Di sini dua orang acak bertemu saat sama-sama ingin berbicara. Kamu sendiri yang memutuskan apa yang ingin dibagikan dan bisa mengakhiri chat kapan saja.',
    'Agar chat tetap nyaman dan aman untuk semua orang, ikuti beberapa aturan sederhana ini.',
  ],
};

export function RulesHero() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const copy = isEnglish ? enCopy : isIndonesian ? idCopy : null;

  return (
    <section className="rules-hero" aria-labelledby="rules-title">
      <h1 id="rules-title">
        {copy ? copy.title[0] : 'Правила'}
        <br />
        {copy ? copy.title[1] : 'Chatus'}
      </h1>

      <article className="rules-age-card">
        <strong>18+</strong>
        <p>
          {copy ? copy.age : 'Сервис строго 18+. Если вам меньше — пожалуйста, не используйте Chatus.'}
        </p>
      </article>

      <div className="rules-hero__copy">
        {copy ? (
          copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}
