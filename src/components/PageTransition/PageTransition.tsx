'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getAnchorOffset, isMobileAnchorViewport } from '@/lib/anchorScroll';
import { markPageTransitionPending, markPageTransitionReady } from '@/lib/pageTransition';
import './PageTransition.scss';

const loaderMinDuration = 720;
const revealDelay = 120;
const loaderTickMs = 80;

function getContentLoadProgress() {
  const images = Array.from(document.images).filter((image) => image.loading !== 'lazy');
  const loadedImages = images.filter((image) => image.complete);
  const imagesProgress = images.length > 0 ? loadedImages.length / images.length : 1;
  const documentProgress = document.readyState === 'complete' ? 1 : document.readyState === 'interactive' ? 0.72 : 0.28;

  return Math.min(1, (documentProgress * 0.45) + (imagesProgress * 0.55));
}

function whenCriticalContentReady() {
  const imagePromises = Array.from(document.images)
    .filter((image) => image.loading !== 'lazy' && !image.complete)
    .map((image) => new Promise<void>((resolve) => {
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener('error', () => resolve(), { once: true });
    }));
  const fontPromise = 'fonts' in document ? document.fonts.ready.then(() => undefined) : Promise.resolve();
  const documentPromise = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
      window.addEventListener('load', () => resolve(), { once: true });
    });

  return Promise.all([documentPromise, fontPromise, ...imagePromises]);
}

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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('is-page-transitioning', visible);
    document.body.classList.toggle('is-page-transitioning', visible);

    return () => {
      document.documentElement.classList.remove('is-page-transitioning');
      document.body.classList.remove('is-page-transitioning');
    };
  }, [visible]);

  useEffect(() => {
    let isCancelled = false;
    let progressFrame = 0;
    let progressTimer = 0;
    let hideTimer = 0;
    const startedAt = performance.now();

    markPageTransitionPending();
    setVisible(true);
    setProgress(0);

    const animateProgress = (targetProgress: number) => {
      setProgress((currentProgress) => {
        const nextProgress = currentProgress + ((targetProgress - currentProgress) * 0.18);

        return Math.min(99, Math.max(currentProgress, nextProgress));
      });
    };

    const scheduleProgressTick = () => {
      progressTimer = window.setTimeout(() => {
        progressFrame = window.requestAnimationFrame(() => {
          if (isCancelled) {
            return;
          }

          animateProgress(getContentLoadProgress() * 92);
          scheduleProgressTick();
        });
      }, loaderTickMs);
    };

    const completeTransition = () => {
      if (isCancelled) {
        return;
      }

      setProgress(100);

      hideTimer = window.setTimeout(() => {
        if (isCancelled) {
          return;
        }

        setVisible(false);

        window.setTimeout(() => {
          if (isCancelled) {
            return;
          }

          markPageTransitionReady();
          scrollToCurrentHash();
        }, revealDelay);
      }, 220);
    };

    scheduleProgressTick();

    whenCriticalContentReady().then(() => {
      const elapsed = performance.now() - startedAt;
      const duration = didMountRef.current ? loaderMinDuration : loaderMinDuration + 180;

      window.setTimeout(completeTransition, Math.max(0, duration - elapsed));
    });

    didMountRef.current = true;

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(progressFrame);
      window.clearTimeout(progressTimer);
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

  const roundedProgress = Math.round(progress);
  const nextProgress = Math.min(100, progress + 4);
  const loaderStyle = {
    '--loader-progress': `${progress}%`,
    '--loader-next-progress': `${nextProgress}%`,
    '--loader-rise': `${progress * 0.63}%`,
    '--loader-next-rise': `${nextProgress * 0.63}%`,
  } as React.CSSProperties;

  return (
    <>
      {children}
      <div
        className={`page-transition ${visible ? 'page-transition--visible' : ''}`}
        aria-hidden={!visible}
        style={loaderStyle}
      >
        <div className="page-transition__bar" aria-hidden="true" />
        <div className="page-transition__inner">
          <span className="page-transition__percent">{roundedProgress}%</span>
        </div>
      </div>
    </>
  );
}
