import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext.types";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser) as User;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("accessToken")
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(() =>
        localStorage.getItem("refreshToken")
    );

    const login = (
        newUser: User,
        newToken: string,
        newRefreshToken?: string
    ) => {
        const normalizedUser = {
            ...newUser,
            name: newUser.name || "User",
            email: newUser.email || "",
        };

        setToken(newToken);
        setUser(normalizedUser);

        localStorage.setItem("accessToken", newToken);
        localStorage.setItem("user", JSON.stringify(normalizedUser));

        if (newRefreshToken) {
            setRefreshToken(newRefreshToken);
            localStorage.setItem("refreshToken", newRefreshToken);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setRefreshToken(null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                refreshToken,
                isAuth: token !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}