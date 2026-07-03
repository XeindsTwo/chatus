import gsap from 'gsap';

const mobileScrollQuery = '(max-width: 992px)';
const compactMobileHashes = new Set(['#audience', '#steps']);
const correctionThreshold = 14;
let activeAnchorTween: gsap.core.Tween | null = null;
let activeAnchorCorrection = 0;

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

  if (distance > correctionThreshold) {
    const scrollState = { y: currentTop };

    activeAnchorTween?.kill();
    activeAnchorTween = gsap.to(scrollState, {
      y: targetTop,
      duration: Math.min(0.48, Math.max(0.18, distance / 1100)),
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => {
        window.scrollTo(0, scrollState.y);
      },
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

  activeAnchorTween?.kill();
  activeAnchorCorrection += 1;

  if (!duration || behavior === 'auto') {
    window.scrollTo({
      top: targetTop,
      behavior,
    });

    window.setTimeout(() => correctAnchorPosition(target, url.hash, offset), behavior === 'smooth' ? 420 : 80);

    return true;
  }

  const startTop = window.scrollY;
  const scrollState = { progress: 0 };
  const isMobile = isMobileAnchorViewport();
  const initialTargetTop = targetTop;
  const lockTargetTop = isMobile || url.hash === '#audience';

  activeAnchorTween = gsap.to(scrollState, {
    progress: 1,
    duration,
    ease: typeof options === 'string' ? 'power3.inOut' : options.ease ?? 'power3.inOut',
    overwrite: true,
    onUpdate: () => {
      const liveTargetTop = lockTargetTop ? initialTargetTop : getAnchorTop(target, url.hash, offset);
      const nextTop = startTop + ((liveTargetTop - startTop) * scrollState.progress);

      window.scrollTo(0, nextTop);
    },
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

  return true;
};
