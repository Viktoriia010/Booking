import {useEffect} from "react";
import { useAuth } from "@/context/useAuth.ts";
import { NavLink } from "react-router-dom";

import {userStore} from "@/store/userStore.ts";
import {getAvatarUrl} from "@/api.ts";
import {authModalStore} from "@/store/authModalStore.ts";

const Header = () => {
    const { isAuth } = useAuth();

    const openLoginModal = authModalStore(
        (state) => state.openLoginModal
    );

    const openRegisterModal = authModalStore(
        (state) => state.openRegisterModal
    );
    const user = userStore((state) => state.user);
    const getUser = userStore((state) => state.getUser);

    useEffect(() => {
        if (isAuth) {
            getUser();
        } else {
            userStore.getState().setUser(null);
        }
    }, [isAuth, getUser]);


    console.log("USER:", user);
    console.log("AVATAR:", user?.avatarUrl);

    return (
        <header className="border-b border-[#EEEEEE] bg-white">
            <div className="mx-auto flex h-[64px] w-full items-center justify-between px-4 sm:h-[80px] sm:px-6">
                <NavLink to="/">
                    <span className="text-lg font-bold sm:text-2xl">
                        Hotel for{" "}
                        <span className="text-[#581ADB]">you.</span>
                    </span>
                </NavLink>

                <div className="flex items-center gap-2 sm:gap-4">
                    <img
                        src="/uk-lang.svg"
                        alt="English"
                        className="h-5 w-5 cursor-pointer sm:h-auto sm:w-auto"
                    />

                    {isAuth ? (
                        <NavLink to="/account">
                            <button className="flex cursor-pointer items-center gap-1.5 rounded-[30px] border border-[#DDDDDD] py-1.5 pl-3 pr-1.5 text-sm sm:gap-2 sm:pl-4 sm:text-[16px]">
                                <span className="max-w-[120px] truncate">
                                    {user?.name ||
                                        user?.email?.split("@")[0] ||
                                        "Account"}
                                </span>

                                <img
                                    src={
                                        user?.avatarUrl
                                            ? getAvatarUrl(user.avatarUrl)
                                            : "/profile-icon.svg"
                                    }
                                    alt="Profile icon"
                                    className="h-5 w-5 rounded-full object-cover sm:h-6 sm:w-6"
                                />
                            </button>
                        </NavLink>
                    ) : (
                        <>
                            <button
                                className="cursor-pointer rounded-[30px] border border-[#DDDDDD] px-3 py-1.5 text-sm sm:px-4 sm:text-[16px]"
                                onClick={openRegisterModal}
                            >
                                Register
                            </button>

                            <button
                                className="flex cursor-pointer items-center gap-1.5 rounded-[30px] border border-[#DDDDDD] py-1.5 pl-3 pr-1.5 text-sm sm:gap-2 sm:pl-4 sm:text-[16px]"
                                onClick={openLoginModal}
                            >
                                <span>Sign In</span>

                                <img
                                    src="/profile-icon.svg"
                                    alt="Profile icon"
                                    className="h-5 w-5 sm:h-6 sm:w-6"
                                />
                            </button>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
};

export default Header;

