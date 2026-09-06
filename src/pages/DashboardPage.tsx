import { useEffect, useState } from 'react';
import { customFetch } from '../api/customFetch';
import {useAuth} from "@/hooks/useAuth.ts";


type UserProfile = {
    id: string;
    email: string;
    role: number;
};

export const DashboardPage = () => {
    const { logout } = useAuth();
    const [data, setData] = useState<UserProfile|null>(null);

    useEffect(() => {
        customFetch('auth/profile')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));
    }, []);
    return <div><h1>Dashboard</h1><p>{data?.email}</p><button onClick={logout} className="cursor-pointer">Logout</button></div>;
};