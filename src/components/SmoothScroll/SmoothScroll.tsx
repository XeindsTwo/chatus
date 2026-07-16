'use client';

import { useEffect } from 'react';
import { isPerformanceDebugDisabled } from '@/lib/performanceDebug';

const desktopScrollQuery = '(min-width: 993px)';

const isMacOS = () => /Macintosh|Mac OS X/i.test(window.navigator.userAgent)
  || /Mac/i.test(window.navigator.platform);

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

    if (!isDesktop || isMacOS() || isDesktopSafari()) {
      const useNativeMacScroll = isDesktop && (isMacOS() || isDesktopSafari());

      if (useNativeMacScroll) {
        document.documentElement.classList.add('native-mac-scroll');
      }

      return () => {
        if (useNativeMacScroll) {
          document.documentElement.classList.remove('native-mac-scroll');
        }
      };
    }

    const noGsap = isPerformanceDebugDisabled('no-gsap');
    const noScrollTrigger = isPerformanceDebugDisabled('no-scrolltrigger');
    const useLocomotive = !noScrollTrigger;

    Promise.all([
      noGsap || !useLocomotive ? Promise.resolve(null) : import('locomotive-scroll'),
    ]).then(([locomotiveModule]) => {
      if (isCancelled) {
        return;
      }

      const LocomotiveScroll = locomotiveModule?.default;
      if (!LocomotiveScroll) {
        return;
      }

      const scroll = new LocomotiveScroll({
        autoStart: true,
        lenisOptions: {
          smoothWheel: true,
          syncTouch: false,
          anchors: false,
          lerp: 0.08,
        },
      });

      window.__chatusLocomotiveScroll = scroll;

      cleanup = () => {
        if (window.__chatusLocomotiveScroll === scroll) {
          delete window.__chatusLocomotiveScroll;
        }

        scroll.destroy();
      };
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
