'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import plusSrc from '@/assets/decor/icons/plus-auditoria.svg';
import './Audience.scss';

const stats = [
  {
    label: 'Среднее время поиска собеседника',
    value: '0,56 сек',
    className: 'audience__card--time',
  },
  {
    label: 'Активных пользователей ежемесячно',
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

const desktopAnimationQuery = '(min-width: 993px)';

export function Audience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !panelRef.current) {
      return;
    }

    const media = window.matchMedia(desktopAnimationQuery);
    let ctx: gsap.Context | undefined;

    const setupAnimation = () => {
      ctx?.revert();
      ctx = undefined;

      if (!media.matches) {
        panelRef.current?.classList.remove('audience__panel--expanded');
        return;
      }

      ctx = gsap.context(() => {
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
    };

    setupAnimation();
    media.addEventListener('change', setupAnimation);

    return () => {
      media.removeEventListener('change', setupAnimation);
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;

    if (!cards) {
      return;
    }

    const media = window.matchMedia('(max-width: 992px)');
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handleWheel = (event: WheelEvent) => {
      if (!media.matches) {
        return;
      }

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      if (delta === 0) {
        return;
      }

      const maxScrollLeft = cards.scrollWidth - cards.clientWidth;
      const nextScrollLeft = cards.scrollLeft + delta;
      const canScrollLeft = delta < 0 && cards.scrollLeft > 0;
      const canScrollRight = delta > 0 && cards.scrollLeft < maxScrollLeft;

      if (!canScrollLeft && !canScrollRight) {
        return;
      }

      event.preventDefault();
      cards.scrollLeft = Math.min(Math.max(nextScrollLeft, 0), maxScrollLeft);
    };

    const stopDragging = () => {
      isDragging = false;
      cards.classList.remove('audience__cards--dragging');
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!media.matches) {
        return;
      }

      isDragging = true;
      startX = event.clientX;
      startScrollLeft = cards.scrollLeft;
      cards.classList.add('audience__cards--dragging');
      cards.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      event.preventDefault();
      cards.scrollLeft = startScrollLeft - (event.clientX - startX);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (cards.hasPointerCapture(event.pointerId)) {
        cards.releasePointerCapture(event.pointerId);
      }

      stopDragging();
    };

    cards.addEventListener('wheel', handleWheel, { passive: false });
    cards.addEventListener('pointerdown', handlePointerDown);
    cards.addEventListener('pointermove', handlePointerMove);
    cards.addEventListener('pointerup', handlePointerUp);
    cards.addEventListener('pointercancel', handlePointerUp);
    cards.addEventListener('pointerleave', stopDragging);

    return () => {
      cards.removeEventListener('wheel', handleWheel);
      cards.removeEventListener('pointerdown', handlePointerDown);
      cards.removeEventListener('pointermove', handlePointerMove);
      cards.removeEventListener('pointerup', handlePointerUp);
      cards.removeEventListener('pointercancel', handlePointerUp);
      cards.removeEventListener('pointerleave', stopDragging);
    };
  }, []);

  return (
    <section className="audience" id="audience" ref={sectionRef}>
      <div className="audience__panel audience-steps__surface" ref={panelRef}>
        <h2 className="audience__title section-title">
          Chatus <span className="audience__desktop-dash">—</span> сервис
          <br />
          с активной
          <br />
          аудиторией
        </h2>

        <div className="audience__cards" ref={cardsRef}>
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
