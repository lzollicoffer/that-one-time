import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

/**
 * Zustand auth store — manages client-side auth state.
 * Listens to Supabase auth state changes.
 */

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  initialize: () => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,

  initialize: () => {
    const supabase = createClient();

    if (!supabase) {
      set({ user: null, loading: false, initialized: true });
      return () => {};
    }

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      set({ user, loading: false, initialized: true });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, loading: false });
    });

    return () => subscription.unsubscribe();
  },

  signOut: async () => {
    const supabase = createClient();
    if (!supabase) {
      set({ user: null });
      return;
    }
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
