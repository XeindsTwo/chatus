'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getAnchorOffset, isMobileAnchorViewport } from '@/lib/anchorScroll';
import { criticalImages } from '@/lib/criticalImages';
import { markPageTransitionPending, markPageTransitionReady } from '@/lib/pageTransition';
import './PageTransition.scss';

const loaderMinDuration = 720;
const completedHoldDelay = 360;
const revealDelay = 760;
const loadedCriticalImages = new Set<string>();

function preloadCriticalImages(onProgress: (progress: number) => void) {
  const sources = [...new Set(criticalImages)].filter(Boolean);

  if (sources.length === 0) {
    onProgress(100);
    return Promise.resolve();
  }

  let processed = 0;
  const updateProgress = () => {
    onProgress((processed / sources.length) * 100);
  };

  updateProgress();

  return Promise.all(
    sources.map((src) => new Promise<void>((resolve) => {
      if (loadedCriticalImages.has(src)) {
        processed += 1;
        updateProgress();
        resolve();
        return;
      }

      const image = new Image();
      let isSettled = false;

      const settle = () => {
        if (isSettled) {
          return;
        }

        isSettled = true;
        loadedCriticalImages.add(src);
        processed += 1;
        updateProgress();
        resolve();
      };

      image.onload = settle;
      image.onerror = settle;
      image.decoding = 'async';
      image.src = src;

      if (image.complete) {
        settle();
      }
    })),
  ).then(() => undefined);
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
    let hideTimer = 0;
    let readyTimer = 0;
    const startedAt = performance.now();
    const targetProgress = { current: 0 };

    markPageTransitionPending();
    setVisible(true);
    setProgress(0);

    const animateProgress = () => {
      setProgress((currentProgress) => {
        const nextProgress = currentProgress + ((targetProgress.current - currentProgress) * 0.12);

        if (targetProgress.current >= 100 && nextProgress > 99.6) {
          return 100;
        }

        return Math.min(99, Math.max(currentProgress, nextProgress));
      });

      progressFrame = window.requestAnimationFrame(animateProgress);
    };

    const completeTransition = () => {
      if (isCancelled) {
        return;
      }

      targetProgress.current = 100;
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

    progressFrame = window.requestAnimationFrame(animateProgress);

    preloadCriticalImages((nextProgress) => {
      if (isCancelled) {
        return;
      }

      targetProgress.current = Math.min(99, nextProgress);
    }).then(() => {
      const elapsed = performance.now() - startedAt;
      const duration = didMountRef.current ? loaderMinDuration : loaderMinDuration + 180;

      readyTimer = window.setTimeout(completeTransition, Math.max(0, duration + completedHoldDelay - elapsed));
    });

    didMountRef.current = true;

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(progressFrame);
      window.clearTimeout(readyTimer);
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
  const loaderStyle = {
    '--loader-progress': `${progress}%`,
    '--loader-rise': `${progress * 0.63}%`,
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
