import type { ScrollSmoother } from 'gsap/ScrollSmoother';

declare global {
  interface Window {
    __chatusScrollSmoother?: ScrollSmoother;
  }
}

export {};
