'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import plusSrc from '@/assets/decor/icons/plus-auditoria.svg';
import './Audience.scss';

const stats = [
  {
    label: 'Время поиска нового диалога',
    value: '0,56 сек',
    className: 'audience__card--time',
  },
  {
    label: 'Активных пользователей в месяц',
    value: '1 000 000+',
    className: 'audience__card--users',
  },
  {
    label: 'Новых диалогов ежедневно',
    value: '25 000+',
    className: 'audience__card--dialogs',
  },
];

gsap.registerPlugin(ScrollTrigger);

export function Audience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !panelRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.audience__card');
      const title = sectionRef.current?.querySelector<HTMLElement>('.audience__title');

      if (!title) {
        return;
      }

      const getPanelSize = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isShortViewport = viewportHeight < 760;

        return {
          startWidth: Math.min(832, viewportWidth - 32),
          startHeight: Math.min(Math.max(viewportHeight * 0.58, 560), viewportHeight - 96),
          finalWidth: viewportWidth,
          finalHeight: viewportHeight,
          contentY: isShortViewport ? -Math.min(130, 760 - viewportHeight) : 0,
        };
      };

      gsap.set(cards[0], { x: -46, y: 58, rotate: -2.5 });
      gsap.set(cards[1], { x: 0, y: 18, rotate: 1.25 });
      gsap.set(cards[2], { x: 46, y: -18, rotate: 2.5 });

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=720',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            panelRef.current?.classList.toggle('audience__panel--expanded', self.progress > 0.96);
          },
          onLeaveBack: () => {
            panelRef.current?.classList.remove('audience__panel--expanded');
          },
        },
      });

      timeline
        .fromTo(
          panelRef.current,
          {
            width: () => getPanelSize().startWidth,
            height: () => getPanelSize().startHeight,
            borderRadius: 36,
            y: 0,
          },
          {
            width: () => getPanelSize().finalWidth,
            height: () => getPanelSize().finalHeight,
            borderRadius: 0,
            y: () => getPanelSize().contentY,
            duration: 1,
          },
        )
        .to(
          cards,
          {
            x: 0,
            y: 0,
            rotate: 0,
            duration: 0.72,
            stagger: 0.05,
          },
          0.24,
        )
        .fromTo(title, { scale: 0.96, y: 10 }, { scale: 1, y: 0, duration: 0.55 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="audience" id="audience" ref={sectionRef}>
      <div className="audience__panel audience-steps__surface" ref={panelRef}>
        <h2 className="audience__title section-title">
          Chatus — сервис
          <br />
          с активной
          <br />
          аудиторией
        </h2>

        <div className="audience__cards">
          {stats.map((stat) => (
            <article className={`audience__card ${stat.className}`} key={stat.label}>
              <p>{stat.label}</p>
              <img className="audience__plus" src={plusSrc} alt="" aria-hidden="true" />
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
