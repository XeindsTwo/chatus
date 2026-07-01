'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getAnchorOffset, isMobileAnchorViewport } from '@/lib/anchorScroll';
import { markPageTransitionPending, markPageTransitionReady } from '@/lib/pageTransition';
import './PageTransition.scss';

const loaderDuration = 720;
const revealDelay = 120;

function scrollToCurrentHash() {
  if (!window.location.hash) {
    return;
  }

  try {
    const target = document.querySelector<HTMLElement>(window.location.hash);

    if (!target) {
      return;
    }

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - getAnchorOffset(window.location.hash),
      behavior: isMobileAnchorViewport() ? 'auto' : 'smooth',
    });
  } catch {
    // Hashes from regular section ids are valid selectors; ignore malformed external hashes.
  }
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const didMountRef = useRef(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('is-page-transitioning', visible);
    document.body.classList.toggle('is-page-transitioning', visible);

    return () => {
      document.documentElement.classList.remove('is-page-transitioning');
      document.body.classList.remove('is-page-transitioning');
    };
  }, [visible]);

  useEffect(() => {
    markPageTransitionPending();
    setVisible(true);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);

      window.setTimeout(() => {
        markPageTransitionReady();
        scrollToCurrentHash();
      }, revealDelay);
    }, didMountRef.current ? loaderDuration : loaderDuration + 180);

    didMountRef.current = true;

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');

      if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const url = new URL(link.href);

      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) {
        return;
      }

      markPageTransitionPending();
      setVisible(true);
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {children}
      <div className={`page-transition ${visible ? 'page-transition--visible' : ''}`} aria-hidden={!visible}>
        <div className="page-transition__inner">
          <span className="page-transition__spinner" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
