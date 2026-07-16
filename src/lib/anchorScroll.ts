import { isPerformanceDebugDisabled } from '@/lib/performanceDebug';

const mobileScrollQuery = '(max-width: 992px)';
const compactMobileHashes = new Set(['#audience', '#steps']);
const correctionThreshold = 14;
type AnchorTween = { kill: () => void };

let gsapPromise: Promise<typeof import('gsap').default> | null = null;
let activeAnchorTween: AnchorTween | null = null;
let activeAnchorCorrection = 0;

const loadGsap = () => {
  gsapPromise ??= import('gsap').then((module) => module.default);
  return gsapPromise;
};

let scrollToPluginPromise: Promise<typeof import('gsap/ScrollToPlugin').ScrollToPlugin> | null = null;

const loadScrollToPlugin = () => {
  scrollToPluginPromise ??= import('gsap/ScrollToPlugin').then((module) => module.ScrollToPlugin);
  return scrollToPluginPromise;
};

const getLocomotiveScroll = () => window.__chatusLocomotiveScroll;

type AnchorScrollOptions = ScrollBehavior | {
  behavior?: ScrollBehavior;
  duration?: number;
  ease?: string;
  offset?: number;
  targetSelector?: string;
};

export const isMobileAnchorViewport = () => window.matchMedia(mobileScrollQuery).matches;

export const getAnchorOffset = (hash: string, offset?: number) => {
  if (typeof offset === 'number') {
    return offset;
  }

  const baseOffset = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'),
  ) || 0;

  if (isMobileAnchorViewport() && compactMobileHashes.has(hash)) {
    return 8;
  }

  return baseOffset;
};

const getAnchorTop = (target: HTMLElement, hash: string, offset?: number) => (
  target.getBoundingClientRect().top + window.scrollY - getAnchorOffset(hash, offset)
);

const clearVisibleHash = () => {
  if (!window.location.hash) {
    return;
  }

  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
};

const correctAnchorPosition = (target: HTMLElement, hash: string, offset?: number, attempt = 0) => {
  const correctionId = activeAnchorCorrection;
  const currentTop = window.scrollY;
  const targetTop = getAnchorTop(target, hash, offset);
  const distance = Math.abs(targetTop - currentTop);

  if (isPerformanceDebugDisabled('no-gsap')) {
    if (distance > correctionThreshold) {
      window.scrollTo({ top: targetTop, behavior: 'auto' });
    }

    return;
  }

  if (distance > correctionThreshold) {
    activeAnchorTween?.kill();
    Promise.all([loadGsap(), loadScrollToPlugin()]).then(([gsap, ScrollToPlugin]) => {
      if (correctionId !== activeAnchorCorrection) {
        return;
      }

      gsap.registerPlugin(ScrollToPlugin);
      activeAnchorTween = gsap.to(window, {
        scrollTo: {
          y: targetTop,
          autoKill: true,
        },
        duration: Math.min(0.78, Math.max(0.3, distance / 820)),
        ease: 'power2.inOut',
        overwrite: true,
        onComplete: () => {
          activeAnchorTween = null;

          if (attempt < 4 && correctionId === activeAnchorCorrection) {
            window.setTimeout(() => correctAnchorPosition(target, hash, offset, attempt + 1), 90);
          }
        },
        onInterrupt: () => {
          activeAnchorTween = null;
        },
      });
    });

    return;
  }

  if (attempt < 4 && correctionId === activeAnchorCorrection) {
    window.setTimeout(() => correctAnchorPosition(target, hash, offset, attempt + 1), 90);
  }
};

export const scrollToAnchorHref = (href: string, options: AnchorScrollOptions = 'smooth') => {
  const url = new URL(href, window.location.href);

  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
    window.location.href = href;
    return false;
  }

  const sectionTarget = document.querySelector<HTMLElement>(url.hash);

  if (!sectionTarget) {
    window.location.href = href;
    return false;
  }

  const offset = typeof options === 'string' ? undefined : options.offset;
  const target = typeof options === 'string' || !options.targetSelector
    ? sectionTarget
    : sectionTarget.querySelector<HTMLElement>(options.targetSelector) ?? sectionTarget;

  clearVisibleHash();
  const targetTop = getAnchorTop(target, url.hash, offset);
  const behavior = typeof options === 'string' ? options : options.behavior ?? 'smooth';
  const duration = typeof options === 'string' ? undefined : options.duration;

  const locomotiveScroll = getLocomotiveScroll();
  if (locomotiveScroll) {
    locomotiveScroll.scrollTo(targetTop, {
      immediate: behavior === 'auto',
      duration: typeof duration === 'number' ? duration : 1.3,
      offset: 0,
    });
    return true;
  }

  activeAnchorTween?.kill();
  activeAnchorCorrection += 1;

  if (isPerformanceDebugDisabled('no-gsap')) {
    window.scrollTo({ top: targetTop, behavior: behavior === 'smooth' ? 'auto' : behavior });
    return true;
  }

  if (!duration || behavior === 'auto') {
    window.scrollTo({
      top: targetTop,
      behavior,
    });

    window.setTimeout(() => correctAnchorPosition(target, url.hash, offset), behavior === 'smooth' ? 420 : 80);

    return true;
  }

  const isMobile = isMobileAnchorViewport();
  const initialTargetTop = targetTop;
  const lockTargetTop = isMobile || url.hash === '#audience';

  const correctionId = activeAnchorCorrection;
  Promise.all([loadGsap(), loadScrollToPlugin()]).then(([gsap, ScrollToPlugin]) => {
    if (correctionId !== activeAnchorCorrection) {
      return;
    }

    gsap.registerPlugin(ScrollToPlugin);
    activeAnchorTween = gsap.to(window, {
      scrollTo: {
        y: lockTargetTop ? initialTargetTop : targetTop,
        autoKill: true,
      },
      duration,
      ease: typeof options === 'string' ? 'power2.inOut' : options.ease ?? 'power2.inOut',
      overwrite: true,
      onComplete: () => {
        activeAnchorTween = null;

        if (lockTargetTop) {
          return;
        }

        const finalTop = getAnchorTop(target, url.hash, offset);
        const finalDistance = Math.abs(finalTop - window.scrollY);

        if (finalDistance > correctionThreshold) {
          window.scrollTo(0, finalTop);
        }
      },
      onInterrupt: () => {
        activeAnchorTween = null;
      },
    });
  });

  return true;
};
