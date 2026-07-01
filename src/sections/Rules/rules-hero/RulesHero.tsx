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

export function RulesHero() {
  const locale = useLocale();
  const isEnglish = locale === 'en';

  return (
    <section className="rules-hero" aria-labelledby="rules-title">
      <h1 id="rules-title">
        {isEnglish ? enCopy.title[0] : 'Правила'}
        <br />
        {isEnglish ? enCopy.title[1] : 'Chatus'}
      </h1>

      <article className="rules-age-card">
        <strong>18+</strong>
        <p>
          {isEnglish ? enCopy.age : 'Сервис строго 18+. Если вам меньше — пожалуйста, не используйте Chatus.'}
        </p>
      </article>

      <div className="rules-hero__copy">
        {isEnglish ? (
          enCopy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
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
