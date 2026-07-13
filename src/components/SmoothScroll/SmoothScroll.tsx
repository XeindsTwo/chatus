'use client';

import { useEffect } from 'react';
import { isPerformanceDebugDisabled } from '@/lib/performanceDebug';

const desktopScrollQuery = '(min-width: 993px)';

const isDesktopSafari = () => {
  const userAgent = window.navigator.userAgent;
  const isSafari = /^((?!chrome|android|crios|fxios|edg|opr).)*safari/i.test(userAgent);

  return isSafari && window.matchMedia(desktopScrollQuery).matches;
};

export function SmoothScroll() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isCancelled = false;
    const isDesktop = window.matchMedia(desktopScrollQuery).matches;

    if (!isDesktop || isDesktopSafari()) {
      return undefined;
    }

    const noGsap = isPerformanceDebugDisabled('no-gsap');
    const noScrollTrigger = isPerformanceDebugDisabled('no-scrolltrigger');
    const useScrollTrigger = !noScrollTrigger;

    Promise.all([
      noGsap ? Promise.resolve(null) : import('gsap'),
      noGsap || !useScrollTrigger ? Promise.resolve(null) : import('gsap/ScrollTrigger'),
      noGsap || !useScrollTrigger ? Promise.resolve(null) : import('gsap/ScrollSmoother'),
    ]).then(([gsapModule, scrollTriggerModule, smootherModule]) => {
      if (isCancelled) {
        return;
      }

      const gsap = gsapModule?.default;
      const ScrollTrigger = scrollTriggerModule?.ScrollTrigger;
      const ScrollSmoother = smootherModule?.default;

      if (!gsap || !ScrollTrigger || !ScrollSmoother) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        smoothTouch: 0,
        effects: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });

      window.__chatusScrollSmoother = smoother;

      cleanup = () => {
        if (window.__chatusScrollSmoother === smoother) {
          delete window.__chatusScrollSmoother;
        }

        smoother.kill();
      };
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
