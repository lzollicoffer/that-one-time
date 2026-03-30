'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker on mount.
 * Only runs in production to avoid dev caching issues.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Registration failed — non-critical
      });
    }
  }, []);

  return null;
}
