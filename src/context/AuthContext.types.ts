import { createContext } from "react";

export type User = {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    country?: string;
    city?: string;
    travelPurpose?: string;
    travelingWithPet?: boolean;
};

export type AuthContextType = {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuth: boolean;
    login: (user: User, token: string, refreshToken?: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);