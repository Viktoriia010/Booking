import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import AuthModalManager from "@/components/modal/AuthModalManager.tsx";


const Layout = () => {

    return (

        <div className="flex min-h-screen flex-col bg-gray-100">

            <Header />

            <AuthModalManager />

            <main className="mx-auto w-full flex-1 bg-white pb-17">

                <Outlet />

            </main>

            <Footer />

        </div>

    );
};

export default Layout;
