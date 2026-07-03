'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

type SmoothHorizontalScrollOptions = {
  media?: string;
  draggingClass?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function useSmoothHorizontalScroll(
  ref: RefObject<HTMLElement | null>,
  { media = '(max-width: 992px)', draggingClass = 'smooth-horizontal-scroll--dragging' }: SmoothHorizontalScrollOptions = {},
) {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const matcher = window.matchMedia(media);
    let isDragging = false;
    let isHorizontalDrag = false;
    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;

    const getMaxScrollLeft = () => Math.max(0, element.scrollWidth - element.clientWidth);
    const animateScroll = (scrollLeft: number, duration = 0.32, ease = 'power3.out') => {
      gsap.to(element, {
        scrollLeft: clamp(scrollLeft, 0, getMaxScrollLeft()),
        duration,
        ease,
        overwrite: true,
      });
    };

    const stopDragging = () => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      element.classList.remove(draggingClass);

      if (isHorizontalDrag && Math.abs(velocity) > 0.04) {
        animateScroll(element.scrollLeft + velocity * 430, 0.9, 'power4.out');
      }

      isHorizontalDrag = false;
      pointerId = null;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!matcher.matches) {
        return;
      }

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      if (!delta) {
        return;
      }

      const maxScrollLeft = getMaxScrollLeft();
      const canScrollLeft = delta < 0 && element.scrollLeft > 0;
      const canScrollRight = delta > 0 && element.scrollLeft < maxScrollLeft;

      if (!canScrollLeft && !canScrollRight) {
        return;
      }

      event.preventDefault();
      animateScroll(element.scrollLeft + delta * 1.25, 0.54, 'power3.out');
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!matcher.matches || event.button > 0) {
        return;
      }

      gsap.killTweensOf(element);
      isDragging = true;
      isHorizontalDrag = false;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      lastX = event.clientX;
      lastTime = performance.now();
      startScrollLeft = element.scrollLeft;
      velocity = 0;
      element.classList.add(draggingClass);
      element.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      if (!isHorizontalDrag) {
        if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) {
          return;
        }

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          stopDragging();
          return;
        }

        isHorizontalDrag = true;
      }

      event.preventDefault();

      const now = performance.now();
      const frameDelta = Math.max(now - lastTime, 16);
      velocity = (lastX - event.clientX) / frameDelta;
      lastX = event.clientX;
      lastTime = now;

      animateScroll(startScrollLeft - deltaX, 0.22, 'power2.out');
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }

      stopDragging();
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointercancel', handlePointerUp);
    element.addEventListener('pointerleave', stopDragging);

    return () => {
      gsap.killTweensOf(element);
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointercancel', handlePointerUp);
      element.removeEventListener('pointerleave', stopDragging);
    };
  }, [draggingClass, media, ref]);
}
