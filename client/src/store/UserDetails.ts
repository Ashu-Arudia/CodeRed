import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  bio: string;
  country: string | null;
  created_at: string;
  current_rank: string;
  current_rating: number;
  date_of_birth: string | null;
  email: string;
  first_name: string;
  is_verified: boolean;
  last_login: string | null;
  last_name: string;
  matches_won: number;
  preferred_language: string;
  problems_solved: number;
  profile_complete: boolean;
  profile_picture: string;
  timezone: string;
  total_matches: number;
  user_id: number;
  username: string;
  win_rate: number;
};

type UserStore = {
  user: User | null;
  setUser: (data: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (data) => set({ user: data }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "codered-user",
    }
  )
);

export default useUserStore;
