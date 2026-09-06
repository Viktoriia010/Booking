import { createContext } from 'react';
interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

