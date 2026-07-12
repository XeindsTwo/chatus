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
    // Load ScrollTrigger only when a section explicitly opts into it.
    const hasScrollTriggerContent = document.querySelector('[data-scrolltrigger]') !== null;
    const useScrollTrigger = !noScrollTrigger && hasScrollTriggerContent;

    Promise.all([
      noGsap ? Promise.resolve(null) : import('gsap'),
      noGsap || !useScrollTrigger ? Promise.resolve(null) : import('gsap/ScrollTrigger'),
      import('lenis'),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      if (isCancelled) {
        return;
      }

      const Lenis = lenisModule.default;
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      const gsap = gsapModule?.default;
      const ScrollTrigger = scrollTriggerModule?.ScrollTrigger;
      const updateScrollTrigger = ScrollTrigger ? () => ScrollTrigger.update() : undefined;
      let nativeFrame = 0;

      if (gsap) {
        if (ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        const updateLenis = (time: number) => {
          lenis.raf(time * 1000);
        };

        if (updateScrollTrigger) {
          lenis.on('scroll', updateScrollTrigger);
        }

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          if (updateScrollTrigger) {
            lenis.off('scroll', updateScrollTrigger);
          }

          gsap.ticker.remove(updateLenis);
          lenis.destroy();
        };
        return;
      }

      const updateNative = (time: number) => {
        lenis.raf(time);
        nativeFrame = window.requestAnimationFrame(updateNative);
      };

      nativeFrame = window.requestAnimationFrame(updateNative);

      cleanup = () => {
        window.cancelAnimationFrame(nativeFrame);
        lenis.destroy();
      };
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
