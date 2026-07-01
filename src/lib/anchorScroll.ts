const mobileScrollQuery = '(max-width: 992px)';
const compactMobileHashes = new Set(['#audience', '#steps']);

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

export const scrollToAnchorHref = (href: string, behavior: ScrollBehavior = 'smooth') => {
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
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - getAnchorOffset(url.hash),
    behavior,
  });

  return true;
};
