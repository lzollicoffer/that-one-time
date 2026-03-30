'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';

/**
 * AuthProvider — initializes Supabase auth listener on mount.
 * Wrap the app layout with this component.
 */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);
  const initialized = useAuthStore((s) => s.initialized);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  return <>{children}</>;
}
