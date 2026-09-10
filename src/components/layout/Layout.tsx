import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

    return (

        <div className="flex min-h-screen flex-col bg-gray-100">

            <Header />

            <main className="mx-auto w-full flex-1 bg-white">

                <Outlet />

            </main>

            <Footer />

        </div>

    );
};

export default Layout;