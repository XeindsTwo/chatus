'use client';

const readyEventName = 'chatus:page-transition-ready';

export function markPageTransitionPending() {
  document.documentElement.dataset.pageReady = 'false';
}

export function markPageTransitionReady() {
  document.documentElement.dataset.pageReady = 'true';
  window.dispatchEvent(new Event(readyEventName));
}

export function onPageTransitionReady(callback: () => void) {
  if (document.documentElement.dataset.pageReady === 'true') {
    callback();
    return () => undefined;
  }

  window.addEventListener(readyEventName, callback, { once: true });

  return () => {
    window.removeEventListener(readyEventName, callback);
  };
}
