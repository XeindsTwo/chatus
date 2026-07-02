'use client';

import { useState } from 'react';
import { useLocale } from '@/i18n/useLocale';
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
    isExternal: true,
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

const enQuestions = [
  {
    question: 'What is Chatus?',
    answer:
      'Chatus is a service for anonymous chatting, meeting people, and finding random chat partners. Here you can start a chat without registration or forms.',
  },
  {
    question: 'How does payment work?',
    answer:
      'Premium is paid inside Chatus with Telegram Stars. If needed, Stars can be purchased in a partner bot with rubles or cryptocurrency. Premium features activate automatically after payment.',
  },
  {
    question: 'Is chat anonymous?',
    answer:
      'Yes. Chatus lets you chat anonymously: you do not need to create a profile, upload photos, or provide personal data. Your Telegram profile data is not shown to the chat partner; you decide what to share.',
  },
  {
    question: 'How do I report someone?',
    answer:
      'You can end a conversation and send a report through Chatus. We review reports and restrict users who violate the service rules.',
  },
  {
    question: 'Do I need to sign up?',
    answer:
      'No. Chatus works inside Telegram: just open the bot and start searching for a chat partner.',
  },
];

const enContacts = [
  {
    label: 'Support',
    title: 't.me/chatusteam',
    href: 'https://t.me/chatusteam',
    accent: true,
    isExternal: true,
  },
  {
    label: 'Personal data requests',
    title: 'privacy@maljoy.io',
    href: 'mailto:privacy@maljoy.io',
  },
  {
    label: 'Business inquiries',
    title: 'hello@maljoy.io',
    href: 'mailto:hello@maljoy.io',
  },
];

const idQuestions = [
  {
    question: 'Apa itu Chatus?',
    answer:
      'Chatus adalah layanan untuk chat anonim, berkenalan, dan menemukan teman chat acak. Di sini kamu bisa mulai chat tanpa registrasi atau formulir.',
  },
  {
    question: 'Bagaimana pembayarannya?',
    answer:
      'Premium dibayar di dalam Chatus melalui Telegram Stars. Jika perlu, Stars bisa dibeli di bot partner dengan rubel atau kripto. Fitur Premium aktif otomatis setelah pembayaran.',
  },
  {
    question: 'Chat-nya anonim?',
    answer:
      'Ya. Di Chatus kamu bisa chat anonim: tidak perlu membuat profil, mengunggah foto, atau memberikan data pribadi. Data profil Telegram kamu tidak ditampilkan ke lawan chat.',
  },
  {
    question: 'Cara melaporkan?',
    answer:
      'Kamu bisa mengakhiri percakapan dan mengirim laporan melalui Chatus. Kami meninjau laporan dan membatasi pengguna yang melanggar aturan layanan.',
  },
  {
    question: 'Perlu daftar?',
    answer:
      'Tidak. Chatus bekerja di dalam Telegram: cukup buka bot dan mulai mencari teman chat.',
  },
];

const idContacts = [
  {
    label: 'Dukungan',
    title: '@chatus_support_en',
    href: 'https://t.me/chatusteam',
    accent: true,
    isExternal: true,
  },
  {
    label: 'Pertanyaan data pribadi',
    title: 'privacy@maljoy.io',
    href: 'mailto:privacy@maljoy.io',
  },
  {
    label: 'Pertanyaan bisnis',
    title: 'hello@maljoy.io',
    href: 'mailto:hello@maljoy.io',
  },
];

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="68" height="59" viewBox="0 0 68 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M61.3496 1.32324C62.0191 1.03706 62.7511 0.938288 63.4697 1.03711C64.1886 1.13604 64.8702 1.42944 65.4424 1.8877C66.0146 2.34604 66.4576 2.95347 66.7227 3.64746C66.9545 4.25475 67.0428 4.90819 66.9814 5.55469L66.9453 5.83105L59.2725 53.1025C58.6318 57.0257 54.427 59.2059 50.9551 57.291C47.5204 55.396 42.4321 52.4837 37.8643 49.4512C36.7231 48.6927 34.4469 47.1262 32.5723 45.3389C31.6327 44.443 30.8344 43.5291 30.3262 42.6689C29.809 41.7937 29.6748 41.117 29.7988 40.6162C29.8468 40.4243 30.0265 40.0455 30.4248 39.4561C30.8058 38.8921 31.3316 38.2141 31.9805 37.4414C33.2773 35.8972 35.0189 34.031 36.9629 32.0352C40.8521 28.0422 45.4849 23.5983 48.8818 20.2568L48.8828 20.2559C49.5969 19.5528 50.1107 18.8678 50.3906 18.2422C50.6334 17.6995 50.8583 16.8079 50.251 16.1328C49.6501 15.4649 48.7412 15.5779 48.1592 15.7549C47.573 15.9331 46.9086 16.2856 46.1914 16.8008L45.8809 17.0322C38.0911 23.0055 25.6229 32.0578 21.5361 34.585C19.7478 35.6903 18.4552 36.2944 17.374 36.5879C16.3209 36.8737 15.4259 36.8765 14.4072 36.7041H14.4062C10.3209 36.0137 6.55066 34.947 3.49414 33.6592H3.49316C0.114285 32.2359 0.223425 27.4629 3.49512 26.0635L61.3496 1.32324Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Faq() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const currentQuestions = isEnglish ? enQuestions : isIndonesian ? idQuestions : questions;
  const currentContacts = isEnglish ? enContacts : isIndonesian ? idContacts : contacts;
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section className="faq indent" id="faq">
      <div className="faq__container">
        <div className="faq__inner">
          <h2 className="faq__title section-title">
            {isEnglish ? 'Questions' : isIndonesian ? 'Tanya' : 'Вопросы'}
            <br />
            <span>{isEnglish ? 'Answers' : isIndonesian ? 'Jawab' : 'ответы'}</span>
          </h2>

          <div className="faq__list">
            {currentQuestions.map((item, index) => {
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
          {currentContacts.map((contact) => (
            <a className="faq__contact" href={contact.href} key={contact.title} target={contact.isExternal ? '_blank' : undefined} rel={contact.isExternal ? 'noreferrer' : undefined}>
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
