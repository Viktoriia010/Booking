import { Navigate, Outlet } from 'react-router';
import {useAuth} from "@/hooks/useAuth.ts";
export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};