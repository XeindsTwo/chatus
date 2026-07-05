'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { scrollToAnchorHref } from '@/lib/anchorScroll';
import './MobileMenu.scss';

type MobileMenuItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  items: MobileMenuItem[];
};

type MobileMenuTimeline = {
  fromTo: (
    target: Element | Element[] | null,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: number,
  ) => MobileMenuTimeline;
  kill: () => void;
  progress: (value: number) => MobileMenuTimeline;
  timeScale: (value: number) => MobileMenuTimeline;
  play: (from?: number) => MobileMenuTimeline;
  reverse: () => MobileMenuTimeline;
};

type MobileMenuGsapContext = {
  revert: () => void;
};

type MobileMenuToggleTheme = 'orange' | 'light';

const orangeBackgroundClassPattern = /(hero|intro|benefits|tariffs|faq|legal-document|rules-page|mobile-menu)/;
const lightBackgroundClassPattern = /(audience|steps|cta|site-footer|footer)/;

const isOrangeColor = (color: string) => {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);

  if (!match) {
    return false;
  }

  const [, red, green, blue, alpha = '1'] = match;
  const opacity = Number.parseFloat(alpha);

  return opacity > 0.08 && Number(red) > 210 && Number(green) > 120 && Number(green) < 210 && Number(blue) < 90;
};

const resolveToggleTheme = (toggle: HTMLButtonElement | null): MobileMenuToggleTheme => {
  if (!toggle) {
    return 'orange';
  }

  const rect = toggle.getBoundingClientRect();
  const elements = document.elementsFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);

  for (const element of elements) {
    if (!(element instanceof HTMLElement)) {
      continue;
    }

    if (
      element === toggle ||
      element.closest('.header') ||
      element.closest('.mobile-menu-toggle') ||
      element.closest('.mobile-menu')
    ) {
      continue;
    }

    const className = element.className.toString();

    if (lightBackgroundClassPattern.test(className)) {
      return 'light';
    }

    if (orangeBackgroundClassPattern.test(className)) {
      return 'orange';
    }

    let current: HTMLElement | null = element;

    while (current && current !== document.body) {
      const backgroundColor = getComputedStyle(current).backgroundColor;

      if (isOrangeColor(backgroundColor)) {
        return 'orange';
      }

      if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
        return 'light';
      }

      current = current.parentElement;
    }
  }

  return 'orange';
};

const scrollToHref = (href: string) => {
  scrollToAnchorHref(href, {
    duration: 1.48,
    ease: 'power3.inOut',
  });
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [toggleTheme, setToggleTheme] = useState<MobileMenuToggleTheme>('orange');
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<MobileMenuTimeline | null>(null);
  const pendingHrefRef = useRef<string | null>(null);
  const isOpenRef = useRef(isOpen);

  const closeMenu = useCallback((href?: string) => {
    if (!isOpen) {
      return;
    }

    if (href) {
      pendingHrefRef.current = href;
    }

    setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setToggleTheme('orange');
      document.documentElement.classList.add('is-mobile-menu-open');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    let frame = 0;

    const updateToggleTheme = () => {
      frame = 0;
      const nextTheme = resolveToggleTheme(toggleRef.current);

      setToggleTheme((currentTheme) => (currentTheme === nextTheme ? currentTheme : nextTheme));
    };

    const requestThemeUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateToggleTheme);
    };

    requestThemeUpdate();
    window.addEventListener('scroll', requestThemeUpdate, { passive: true });
    window.addEventListener('resize', requestThemeUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', requestThemeUpdate);
      window.removeEventListener('resize', requestThemeUpdate);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('is-mobile-menu-open');
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !overlayRef.current || !panelRef.current) {
      return;
    }

    let ctx: MobileMenuGsapContext | undefined;
    let isCancelled = false;

    import('gsap').then((module) => {
      if (isCancelled || !overlayRef.current || !panelRef.current) {
        return;
      }

      const gsap = module.default;

      ctx = gsap.context(() => {
      const nav = overlayRef.current?.querySelector<HTMLElement>('.mobile-menu__nav');
      const langs = overlayRef.current?.querySelector<HTMLElement>('.mobile-menu__langs');
      const revealBlocks = [nav, langs].filter(Boolean) as HTMLElement[];

      timelineRef.current?.kill();
      timelineRef.current = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onReverseComplete: () => {
          const pendingHref = pendingHrefRef.current;

          pendingHrefRef.current = null;
          document.documentElement.classList.remove('is-mobile-menu-open');
          setIsMounted(false);

          if (pendingHref) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                window.setTimeout(() => scrollToHref(pendingHref), 40);
              });
            });
          }
        },
      });

      timelineRef.current
        .fromTo(
          overlayRef.current,
          { autoAlpha: 0, xPercent: -100 },
          { autoAlpha: 1, xPercent: 0, duration: 0.4, ease: 'power3.out' },
        )
        .fromTo(
          panelRef.current,
          { autoAlpha: 0, xPercent: -5 },
          { autoAlpha: 1, xPercent: 0, duration: 0.34, ease: 'power3.out' },
          0,
        )
        .fromTo(
          revealBlocks,
          { autoAlpha: 0, x: -26 },
          { autoAlpha: 1, x: 0, duration: 0.42, stagger: 0.07, ease: 'power3.out' },
          0.12,
        );

      timelineRef.current.timeScale(1);
      }, overlayRef);

      if (isOpenRef.current) {
        pendingHrefRef.current = null;
        timelineRef.current?.timeScale(1);
        timelineRef.current?.play(0);
      } else {
        timelineRef.current?.progress(1);
        timelineRef.current?.timeScale(1.08);
        timelineRef.current?.reverse();
      }
    });

    return () => {
      isCancelled = true;
      ctx?.revert();
      timelineRef.current = null;
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !timelineRef.current) {
      return;
    }

    if (isOpen) {
      pendingHrefRef.current = null;
      timelineRef.current.timeScale(1);
      timelineRef.current.play(0);
      return;
    }

    timelineRef.current.timeScale(1.08);
    timelineRef.current.reverse();
  }, [isMounted, isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  return (
    <>
      <button
        ref={toggleRef}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        className={`mobile-menu-toggle mobile-menu-toggle--${toggleTheme} ${isOpen ? 'mobile-menu-toggle--open' : ''}`}
        onClick={() => {
          if (isOpen) {
            closeMenu();
            return;
          }

          setIsOpen(true);
        }}
        type="button"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {isMounted ? (
        <div className="mobile-menu" ref={overlayRef}>
          <div className="mobile-menu__panel" ref={panelRef}>
            <nav className="mobile-menu__nav" aria-label="Мобильная навигация">
              {items.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    closeMenu(item.href);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <LanguageSwitcher className="mobile-menu__langs" />
          </div>
        </div>
      ) : null}
    </>
  );
}
