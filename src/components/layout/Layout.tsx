import { Link, Outlet, useNavigation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Loading from "../modal/Loading";

const Layout = () => {
    const { user, logout } = useAuth();
    const navigation = useNavigation();

    return (
        <>
            <header className="header">
                <Link className="logo" to="/">Hotel <span>for you.</span></Link>

                <nav>
                    <Link to="/">Hotels</Link>
                    <Link to="/reviews">Reviews</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contacts">Contacts</Link>
                </nav>

                <div className="header-actions">
                    <span>EN</span>
                    {user ? (
                        <div className="header-user">
                            <Link to="/account">{user.name || user.email}</Link>
                            <button type="button" className="text-button" onClick={logout}>
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link className="button button--outline" to="/register">Register</Link>
                            <Link className="button" to="/login">Sign in</Link>
                        </div>
                    )}
                </div>
            </header>

            <main>
                {navigation.state === "loading" && <Loading />}
                <Outlet />
            </main>
        </>
    );
};

export default Layout;