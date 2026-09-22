import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "@/context/useAuth.ts";
export const ProtectedRoute = () => {
    const { isAuth } = useAuth();
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};