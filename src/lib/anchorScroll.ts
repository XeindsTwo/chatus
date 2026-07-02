import gsap from 'gsap';

const mobileScrollQuery = '(max-width: 992px)';
const compactMobileHashes = new Set(['#audience', '#steps']);
let activeAnchorTween: gsap.core.Tween | null = null;
let activeAnchorCorrection = 0;

type AnchorScrollOptions = ScrollBehavior | {
  behavior?: ScrollBehavior;
  duration?: number;
  ease?: string;
};

export const isMobileAnchorViewport = () => window.matchMedia(mobileScrollQuery).matches;

export const getAnchorOffset = (hash: string) => {
  const baseOffset = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'),
  ) || 0;

  if (isMobileAnchorViewport() && compactMobileHashes.has(hash)) {
    return 8;
  }

  return baseOffset;
};

const getAnchorTop = (target: HTMLElement, hash: string) => (
  target.getBoundingClientRect().top + window.scrollY - getAnchorOffset(hash)
);

const correctAnchorPosition = (target: HTMLElement, hash: string, attempt = 0) => {
  const correctionId = activeAnchorCorrection;
  const currentTop = window.scrollY;
  const targetTop = getAnchorTop(target, hash);
  const distance = Math.abs(targetTop - currentTop);

  if (distance > 2) {
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
          window.setTimeout(() => correctAnchorPosition(target, hash, attempt + 1), 90);
        }
      },
      onInterrupt: () => {
        activeAnchorTween = null;
      },
    });

    return;
  }

  if (attempt < 4 && correctionId === activeAnchorCorrection) {
    window.setTimeout(() => correctAnchorPosition(target, hash, attempt + 1), 90);
  }
};

export const scrollToAnchorHref = (href: string, options: AnchorScrollOptions = 'smooth') => {
  const url = new URL(href, window.location.href);

  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
    window.location.href = href;
    return false;
  }

  const target = document.querySelector<HTMLElement>(url.hash);

  if (!target) {
    window.location.href = href;
    return false;
  }

  history.pushState(null, '', url.hash);
  const targetTop = getAnchorTop(target, url.hash);
  const behavior = typeof options === 'string' ? options : options.behavior ?? 'smooth';
  const duration = typeof options === 'string' ? undefined : options.duration;

  activeAnchorTween?.kill();
  activeAnchorCorrection += 1;

  if (!duration || behavior === 'auto') {
    window.scrollTo({
      top: targetTop,
      behavior,
    });

    window.setTimeout(() => correctAnchorPosition(target, url.hash), behavior === 'smooth' ? 420 : 80);

    return true;
  }

  const startTop = window.scrollY;
  const scrollState = { progress: 0 };

  activeAnchorTween = gsap.to(scrollState, {
    progress: 1,
    duration,
    ease: typeof options === 'string' ? 'power3.inOut' : options.ease ?? 'power3.inOut',
    overwrite: true,
    onUpdate: () => {
      const liveTargetTop = getAnchorTop(target, url.hash);
      const nextTop = startTop + ((liveTargetTop - startTop) * scrollState.progress);

      window.scrollTo(0, nextTop);
    },
    onComplete: () => {
      activeAnchorTween = null;
      window.scrollTo(0, getAnchorTop(target, url.hash));
    },
    onInterrupt: () => {
      activeAnchorTween = null;
    },
  });

  return true;
};
