'use client';

import './Hero.scss';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { useGsapReveal } from '@/lib/useGsapReveal';

const avatars = [
  { name: 'Аня', top: '18%', left: '45%', color: '#ff6f91' },
  { name: 'Макс', top: '10%', left: '61%', color: '#7fd1ff' },
  { name: 'Лея', top: '20%', left: '78%', color: '#f7d57a' },
  { name: 'Ира', top: '34%', left: '39%', color: '#71e4b2' },
  { name: 'Сэм', top: '38%', left: '58%', color: '#ff7a59' },
  { name: 'Ник', top: '34%', left: '72%', color: '#b4f04d' },
  { name: 'Олег', top: '57%', left: '34%', color: '#8bd3ff' },
  { name: 'Миа', top: '63%', left: '50%', color: '#ff9eca' },
  { name: 'Тим', top: '58%', left: '67%', color: '#cab7ff' },
];

export function Hero() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section className="hero" ref={ref}>
      <Header />
      <div className="hero__container">
        <div className="hero__copy">
          <p className="hero__eyebrow" data-reveal>
            Анонимные диалоги
          </p>
          <h1 data-reveal>
            Найди
            <br />
            друга
          </h1>
          <p className="hero__text" data-reveal>
            Сервис быстрых знакомств и общения, где собеседник находится за
            пару секунд.
          </p>
          <div data-reveal>
            <Button>Найти собеседника</Button>
          </div>
        </div>

        <div className="hero__orbit" aria-hidden="true">
          {avatars.map((avatar, index) => (
            <div
              className="hero__avatar"
              key={avatar.name}
              style={{
                '--top': avatar.top,
                '--left': avatar.left,
                '--avatar-color': avatar.color,
                '--delay': `${index * 0.16}s`,
              } as React.CSSProperties}
            >
              <span>{avatar.name.slice(0, 1)}</span>
            </div>
          ))}
        </div>

        <strong className="hero__side-title" data-reveal>
          За пару
          <br />
          секунд
        </strong>
      </div>
    </section>
  );
}
