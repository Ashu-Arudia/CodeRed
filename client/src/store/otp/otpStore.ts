import { create } from "zustand";

type AuthStore = {
  email: string | null;
  setEmail: (email: string) => void;
  clearEmail: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  email: null,
  setEmail: (email) => set({ email }),
  clearEmail: () => set({ email: null }),
}));
