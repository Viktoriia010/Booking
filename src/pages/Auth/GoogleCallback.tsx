import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const hash = window.location.hash.substring(1);

        const params = new URLSearchParams(hash);

        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const email = params.get("email");

        if (!accessToken || !email) {
            navigate("/");
            return;
        }

        login(
            {
                name: email,
                email: email,
            },
            accessToken,
            refreshToken || undefined
        );

        window.history.replaceState(
            null,
            "",
            window.location.pathname
        );

        navigate("/account");
    }, [login, navigate]);

    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <p>Signing in with Google...</p>
        </div>
    );
};

export default GoogleCallback;