'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logoSrc from '@/assets/decor/icons/logo.svg';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import './MobileMenu.scss';

type MobileMenuItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  items: MobileMenuItem[];
};

const getAnchorOffset = () => Number.parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'),
) || 0;

const getMobileAnchorOffset = (hash: string) => {
  const baseOffset = getAnchorOffset();

  if (!window.matchMedia('(max-width: 768px)').matches) {
    return baseOffset;
  }

  if (hash === '#audience' || hash === '#steps') {
    return Math.max(72, baseOffset - 36);
  }

  return baseOffset;
};

const scrollToHref = (href: string) => {
  const url = new URL(href, window.location.href);

  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
    window.location.href = href;
    return;
  }

  const target = document.querySelector<HTMLElement>(url.hash);

  if (!target) {
    window.location.href = href;
    return;
  }

  history.pushState(null, '', url.hash);
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - getMobileAnchorOffset(url.hash),
    behavior: 'smooth',
  });
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pendingHrefRef = useRef<string | null>(null);

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
    if (isOpen) {
      setIsMounted(true);
      document.documentElement.classList.add('is-mobile-menu-open');
    }
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

    const ctx = gsap.context(() => {
      const menuItems = gsap.utils.toArray<HTMLElement>('.mobile-menu__nav a');
      const supportingItems = gsap.utils.toArray<HTMLElement>('[data-mobile-menu-reveal]');

      timelineRef.current?.kill();
      timelineRef.current = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onReverseComplete: () => {
          const pendingHref = pendingHrefRef.current;

          pendingHrefRef.current = null;
          document.documentElement.classList.remove('is-mobile-menu-open');
          setIsMounted(false);

          if (pendingHref) {
            requestAnimationFrame(() => scrollToHref(pendingHref));
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
          { autoAlpha: 0, xPercent: -8 },
          { autoAlpha: 1, xPercent: 0, duration: 0.36, ease: 'power3.out' },
          0,
        )
        .fromTo(
          supportingItems,
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.04 },
          0.1,
        )
        .fromTo(
          menuItems,
          { autoAlpha: 0, x: -38, skewX: -4 },
          { autoAlpha: 1, x: 0, skewX: 0, duration: 0.36, stagger: 0.055, ease: 'back.out(1.35)' },
          0.16,
        );

      timelineRef.current.timeScale(1);
    }, overlayRef);

    return () => {
      ctx.revert();
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

    timelineRef.current.timeScale(0.92);
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
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        className={`mobile-menu-toggle ${isOpen ? 'mobile-menu-toggle--open' : ''}`}
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
            <div className="mobile-menu__top" data-mobile-menu-reveal>
              <a
                className="mobile-menu__brand"
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  closeMenu('/');
                }}
                aria-label="Chatus"
              >
                <img src={logoSrc} alt="Chatus" width="130" height="38" />
              </a>
            </div>

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
