'use client';

import { useEffect } from 'react';

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

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      if (isCancelled) {
        return;
      }

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const Lenis = lenisModule.default;
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      gsap.registerPlugin(ScrollTrigger);

      const updateScrollTrigger = () => ScrollTrigger.update();
      const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on('scroll', updateScrollTrigger);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        lenis.off('scroll', updateScrollTrigger);
        gsap.ticker.remove(updateLenis);
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
