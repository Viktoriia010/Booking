import { create } from "zustand";
import { apiFetch } from "@/api";
import type { User } from "@/context/AuthContext.types";

type UserStore = {
    user: User | null;
    loading: boolean;
    error: string | null;
    getUser: () => Promise<void>;
    setUser: (user: User | null) => void;
};

export const userStore = create<UserStore>((set) => ({
    user: null,
    loading: false,
    error: null,

    setUser: (user) => {
        set({ user });
    },

    getUser: async () => {
        try {
            set({
                loading: true,
                error: null,
            });

            const response = await apiFetch("/Account");

            if (!response.ok) {
                throw new Error("Не вдалося отримати профіль");
            }

            const data: User = await response.json();

            set({
                user: data,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                loading: false,
                error: "Помилка отримання профілю: " + error,
            });
        }
    },
}));