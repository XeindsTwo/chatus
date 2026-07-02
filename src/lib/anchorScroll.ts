import gsap from 'gsap';

const mobileScrollQuery = '(max-width: 992px)';
const compactMobileHashes = new Set(['#audience', '#steps']);
let activeAnchorTween: gsap.core.Tween | null = null;

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
  const targetTop = target.getBoundingClientRect().top + window.scrollY - getAnchorOffset(url.hash);
  const behavior = typeof options === 'string' ? options : options.behavior ?? 'smooth';
  const duration = typeof options === 'string' ? undefined : options.duration;

  activeAnchorTween?.kill();

  if (!duration || behavior === 'auto') {
    window.scrollTo({
      top: targetTop,
      behavior,
    });

    return true;
  }

  const scrollState = { y: window.scrollY };

  activeAnchorTween = gsap.to(scrollState, {
    y: targetTop,
    duration,
    ease: typeof options === 'string' ? 'power3.inOut' : options.ease ?? 'power3.inOut',
    overwrite: true,
    onUpdate: () => {
      window.scrollTo(0, scrollState.y);
    },
    onComplete: () => {
      activeAnchorTween = null;
    },
    onInterrupt: () => {
      activeAnchorTween = null;
    },
  });

  return true;
};
