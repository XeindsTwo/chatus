import type LocomotiveScroll from 'locomotive-scroll';

declare global {
  interface Window {
    __chatusLocomotiveScroll?: LocomotiveScroll;
  }
}

export {};
