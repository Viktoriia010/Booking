import {useState} from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem('accessToken')
    );
    const login = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        setToken(accessToken);
    };
    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
    };
    return (
        <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};