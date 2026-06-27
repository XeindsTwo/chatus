'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import decorOpen from '@/assets/decor/how-work/1.svg';
import decorSearch from '@/assets/decor/how-work/2.svg';
import decorChat from '@/assets/decor/how-work/3.svg';
import mountains from '@/assets/decor/how-work/mountains.svg';
import './Steps.scss';

const steps = [
  {
    title: 'Откройте Chatus',
    text: 'Перейдите в Chatus по ссылке — без регистрации и установки приложения',
    decor: decorOpen,
  },
  {
    title: 'Запустите поиск',
    text: 'Нажмите кнопку поиска — система подберёт случайного собеседника',
    decor: decorSearch,
  },
  {
    title: 'Общайтесь в чате',
    text: 'Общайтесь анонимно и сами решайте, когда перейти к личному контакту',
    decor: decorChat,
  },
];

gsap.registerPlugin(ScrollTrigger);

export function Steps() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 901px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.steps__item');
        const decors = gsap.utils.toArray<HTMLElement>('.steps__decor');
        const track = stickyRef.current?.querySelector<HTMLElement>('.steps__visual-track');
        const grid = stickyRef.current?.querySelector<HTMLElement>('.steps__grid');
        const container = stickyRef.current?.querySelector<HTMLElement>('.steps__container');

        if (!track || !grid || !container || cards.length === 0 || decors.length === 0) {
          return undefined;
        }

        const getStepX = (index: number) => {
          const gap = Number.parseFloat(getComputedStyle(grid).columnGap || '0');
          return index * (track.offsetWidth + gap);
        };

        const getContentShift = () => Math.max(0, container.scrollHeight - window.innerHeight);

        gsap.set(container, { y: 0 });
        gsap.set(cards, { opacity: 0.4, color: '#8a847d' });
        gsap.set(cards[0], { opacity: 1, color: '#20170f' });
        gsap.set(decors, { opacity: 0, scale: 0.88, y: 18 });
        gsap.set(decors[0], { opacity: 1, scale: 1, y: 0 });
        gsap.set(track, { x: 0, scale: 1 });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=2600',
            scrub: 1.7,
            pin: stickyRef.current,
            pinSpacing: true,
            anticipatePin: 1.4,
            fastScrollEnd: false,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(container, { y: () => -getContentShift(), duration: 0.8 }, 0)
          .to({}, { duration: 0.95 })
          .to(cards[0], { opacity: 0.4, color: '#8a847d', duration: 0.34 }, 1)
          .to(decors[0], { opacity: 0, scale: 0.9, y: -10, duration: 0.34 }, 1)
          .to(track, { x: () => getStepX(1), scale: 0.96, duration: 0.44 }, 1)
          .to(track, { scale: 1, duration: 0.42 }, 1.34)
          .to(cards[1], { opacity: 1, color: '#20170f', duration: 0.42 }, 1.18)
          .to(decors[1], { opacity: 1, scale: 1, y: 0, duration: 0.42 }, 1.2)
          .to({}, { duration: 0.58 })
          .to(cards[1], { opacity: 0.4, color: '#8a847d', duration: 0.34 }, 2.08)
          .to(decors[1], { opacity: 0, scale: 0.9, y: -10, duration: 0.34 }, 2.08)
          .to(track, { x: () => getStepX(2), scale: 0.96, duration: 0.44 }, 2.08)
          .to(track, { scale: 1, duration: 0.42 }, 2.42)
          .to(cards[2], { opacity: 1, color: '#20170f', duration: 0.42 }, 2.26)
          .to(decors[2], { opacity: 1, scale: 1, y: 0, duration: 0.42 }, 2.28)
          .to({}, { duration: 0.72 });

        return () => timeline.kill();
      });

      return () => media.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="steps" id="steps" ref={sectionRef}>
      <div className="steps__sticky audience-steps__surface" ref={stickyRef}>
        <div className="steps__container">
          <h2 className="section-title">
            Начните общаться
            <br />
            за несколько
            <br />
            секунд
          </h2>

          <div className="steps__grid">
            {steps.map((step, index) => (
              <article className="steps__item" key={step.title}>
                <span className="steps__number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="card-title">{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div className="steps__visuals" aria-hidden="true">
            <div className="steps__visual-track">
              <img className="steps__mountains" src={mountains} alt="" />
              {steps.map((step, index) => (
                <img className="steps__decor" src={step.decor} alt="" key={step.title} style={{ zIndex: index + 2 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
