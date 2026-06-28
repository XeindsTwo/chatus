'use client';

import { useState } from 'react';
// @ts-ignore
import TelegramIcon from '@/assets/decor/icons/telegram-white.svg?component';
import './Faq.scss';

const questions = [
  {
    question: 'Что такое Chatus?',
    answer:
      'Chatus — это сервис для анонимного общения, знакомств и поиска случайных собеседников. Здесь можно начать чат без регистрации и анкет.',
  },
  {
    question: 'Как работает оплата?',
    answer:
      'Оплата Premium проходит внутри Chatus через Telegram Stars. При необходимости Stars можно приобрести в партнерском боте за рубли или криптовалюту. После подключения доступ к Premium-функциям активируется автоматически.',
  },
  {
    question: 'Чат анонимный?',
    answer:
      'Да. В Chatus общение проходит анонимно: не нужно создавать профиль, загружать фото или указывать личные данные. Данные вашего Telegram-профиля не отображаются собеседнику, а вы сами решаете, что рассказывать о себе.',
  },
  {
    question: 'Как пожаловаться?',
    answer:
      'Вы можете завершить диалог и отправить жалобу через Chatus. Мы рассматриваем такие обращения и ограничиваем доступ пользователям, которые нарушают правила сервиса.',
  },
  {
    question: 'Нужно ли регистрироваться?',
    answer:
      'Нет. Chatus работает внутри Telegram: достаточно открыть бота и запустить поиск собеседника.',
  },
];

const contacts = [
  {
    label: 'Техподдержка',
    title: 't.me/chatusteam',
    href: 'https://t.me/chatusteam',
    accent: true,
  },
  {
    label: 'Вопросы о персональных данных',
    title: 'privacy@maljoy.io',
    href: 'mailto:privacy@maljoy.io',
  },
  {
    label: 'Деловые предложения и вопросы',
    title: 'hello@maljoy.io',
    href: 'mailto:hello@maljoy.io',
  },
];

export function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="faq__container">
        <div className="faq__inner">
          <h2 className="faq__title section-title">
            Вопросы
            <br />
            <span>ответы</span>
          </h2>

          <div className="faq__list">
            {questions.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <article className={`faq__item ${isOpen ? 'faq__item--open' : ''}`} key={item.question}>
                  <button
                    aria-expanded={isOpen}
                    className="faq__button"
                    onClick={() => setActiveIndex(isOpen ? -1 : index)}
                    type="button"
                  >
                    <span className="faq__icon" aria-hidden="true" />
                    <span className="card-title">{item.question}</span>
                  </button>

                  <div className="faq__answer" inert={!isOpen}>
                    <div>
                      <p className="body-copy">{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="faq__contacts">
          {contacts.map((contact) => (
            <a className="faq__contact" href={contact.href} key={contact.title}>
              {contact.accent ? (
                <TelegramIcon className="faq__telegram" />
              ) : null}
              <span className="body-copy">{contact.label}</span>
              <strong className="card-title">{contact.title}</strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
