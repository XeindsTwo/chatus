'use client';

import { useEffect } from 'react';
import { applyPerformanceDebugClasses } from '@/lib/performanceDebug';

export function PerformanceDebug() {
  useEffect(() => {
    applyPerformanceDebugClasses();
  }, []);

  return null;
}
