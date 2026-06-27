'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      lerp: 0.08,
      stopInertiaOnNavigate: true,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
