export type PerformanceDebugFlag =
  | 'no-gsap'
  | 'no-scrolltrigger'
  | 'no-filters'
  | 'no-video'
  | 'no-fixed'
  | 'no-decor'
  | 'no-animations';

const supportedFlags = new Set<PerformanceDebugFlag>([
  'no-gsap',
  'no-scrolltrigger',
  'no-filters',
  'no-video',
  'no-fixed',
  'no-decor',
  'no-animations',
]);

export function getPerformanceDebugFlags(): PerformanceDebugFlag[] {
  if (typeof window === 'undefined') {
    return [];
  }

  return [...new Set(
    new URLSearchParams(window.location.search)
      .getAll('debug')
      .flatMap((value) => value.split(','))
      .map((value) => value.trim())
      .filter((value): value is PerformanceDebugFlag => supportedFlags.has(value as PerformanceDebugFlag)),
  )];
}

export function hasPerformanceDebugFlag(flag: PerformanceDebugFlag) {
  return getPerformanceDebugFlags().includes(flag);
}

export function isPerformanceDebugDisabled(flag: PerformanceDebugFlag) {
  const flags = getPerformanceDebugFlags();

  return flags.includes(flag) || (flag !== 'no-animations' && flags.includes('no-animations'));
}

export function applyPerformanceDebugClasses() {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const flags = getPerformanceDebugFlags();

  for (const flag of supportedFlags) {
    root.classList.toggle(`debug-${flag}`, flags.includes(flag));
  }
}
