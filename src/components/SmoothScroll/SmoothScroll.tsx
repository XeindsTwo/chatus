'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const getAnchorOffset = () => Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'),
    ) || 0;

    const lenis = new Lenis({
      anchors: false,
      lerp: 0.08,
      stopInertiaOnNavigate: true,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');

      if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const url = new URL(link.href);

      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      let target: HTMLElement | null = null;

      try {
        target = document.querySelector<HTMLElement>(url.hash);
      } catch {
        return;
      }

      if (!target) {
        return;
      }

      event.preventDefault();
      history.pushState(null, '', url.hash);
      lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - getAnchorOffset(), {
        duration: 1.05,
      });
    };

    lenis.on('scroll', updateScrollTrigger);
    document.addEventListener('click', handleAnchorClick);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
