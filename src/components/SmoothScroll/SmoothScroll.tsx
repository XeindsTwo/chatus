'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const desktopScrollQuery = '(min-width: 993px)';

const isDesktopSafari = () => {
  const userAgent = window.navigator.userAgent;
  const isSafari = /^((?!chrome|android|crios|fxios|edg|opr).)*safari/i.test(userAgent);

  return isSafari && window.matchMedia(desktopScrollQuery).matches;
};

export function SmoothScroll() {
  useEffect(() => {
    const isDesktop = window.matchMedia(desktopScrollQuery).matches;

    if (!isDesktop || isDesktopSafari()) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return null;
}
