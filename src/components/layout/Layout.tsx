import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";
// import { Link, useNavigation } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";
// import Loading from "../modal/Loading";

const Layout = () => {
    // const { user, logout } = useAuth();
    // const navigation = useNavigation();

    return (
        // <>
        //     <header className="header">
        //         <Link className="logo" to="/">Hotel <span>for you.</span></Link>

        <div className="flex min-h-screen flex-col bg-gray-100">
                {/*<nav>*/}
                {/*    <Link to="/">Hotels</Link>*/}
                {/*    <Link to="/reviews">Reviews</Link>*/}
                {/*    <Link to="/about">About</Link>*/}
                {/*    <Link to="/contacts">Contacts</Link>*/}
                {/*</nav>*/}

            <Header />

            {/*    <div className="header-actions">*/}
            {/*        <span>EN</span>*/}
            {/*        {user ? (*/}
            {/*            <div className="header-user">*/}
            {/*                <Link to="/account">{user.name || user.email}</Link>*/}
            {/*                <button type="button" className="text-button" onClick={logout}>*/}
            {/*                    Sign out*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        ) : (*/}
            {/*            <div>*/}
            {/*                <Link className="button button--outline" to="/register">Register</Link>*/}
            {/*                <Link className="button" to="/login">Sign in</Link>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</header>*/}

            <main className="mx-auto w-full flex-1 bg-white pb-17">

            {/*{navigation.state === "loading" && <Loading />}*/}
                <Outlet />

            </main>

            <Footer />

        </div>

    );
};

export default Layout;