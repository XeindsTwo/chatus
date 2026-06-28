'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const getAnchorOffset = () => Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'),
    ) || 0;
    const getAnchorDuration = (distance: number) => {
      const viewportScreens = distance / window.innerHeight;

      return clamp(0.95 + viewportScreens * 0.52, 1.05, 4.6);
    };
    const anchorEasing = (time: number) => (
      time < 0.5
        ? 4 * time * time * time
        : 1 - ((-2 * time + 2) ** 3) / 2
    );

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
      const targetTop = target.getBoundingClientRect().top + window.scrollY - getAnchorOffset();

      lenis.scrollTo(targetTop, {
        duration: getAnchorDuration(Math.abs(targetTop - window.scrollY)),
        easing: anchorEasing,
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
