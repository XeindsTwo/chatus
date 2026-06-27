'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
