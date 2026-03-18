import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';

type AuthState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  isAdmin: false,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAdmin: session?.user?.user_metadata?.role === 'admin',
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));
