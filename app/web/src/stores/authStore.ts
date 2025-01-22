import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "employee" | "employer";

interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  setUser: () => {},
};


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: "auth-storage",
    }
  )
);
