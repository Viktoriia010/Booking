import Modal from "@/components/Modal.tsx";
import {LoginPage} from "@/pages/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage.tsx";
import {useState} from "react";
import {useAuth} from "@/hooks/useAuth.ts";
import {NavLink} from "react-router";

const Header = () => {
    const { isAuthenticated } = useAuth();
    const [modal, setModal] = useState<"login" | "register" | null>(null);


    const closeModal = () => setModal(null);

    return (
        <header className="border-b border-[#EEEEEE] bg-white">
            <div className="mx-auto flex h-[64px] w-full items-center justify-between px-4 sm:h-[80px] sm:px-6">

                <span className="text-lg font-bold sm:text-2xl">
                    Hotel for <span className="text-[#581ADB]">you.</span>
                </span>

                <div className="flex items-center gap-2 sm:gap-4">
                    <img
                        src="/uk-lang.svg"
                        alt="English"
                        className="h-5 w-5 cursor-pointer sm:h-auto sm:w-auto"
                    />

                    {isAuthenticated ? (
                            <NavLink
                                to="/dashboard"
                            >
                                <button
                                    className="flex cursor-pointer items-center gap-1.5 rounded-[30px] border border-[#DDDDDD] py-1.5 pl-3 pr-1.5 text-sm sm:gap-2 sm:pl-4 sm:text-[16px]"
                                >
                                    <span>Account</span>
                                    <img
                                        src="/profile-icon.svg"
                                        alt="Profile icon"
                                        className="h-5 w-5 sm:h-6 sm:w-6"
                                    />
                                </button>
                            </NavLink>

                    ) : (
                        <>
                            <button
                                className="cursor-pointer rounded-[30px] border border-[#DDDDDD] px-3 py-1.5 text-sm sm:px-4 sm:text-[16px]"
                                onClick={() => setModal("register")}
                            >
                                Register
                            </button>

                            <button
                                className="flex cursor-pointer items-center gap-1.5 rounded-[30px] border border-[#DDDDDD] py-1.5 pl-3 pr-1.5 text-sm sm:gap-2 sm:pl-4 sm:text-[16px]"
                                onClick={() => setModal("login")}
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

                    {/* Modal */}
                    <Modal
                        open={modal !== null}
                        closeModal={closeModal}
                    >
                        {modal === "register" && (
                            <RegisterPage
                                onRegister={() => setModal("login")}
                            />
                        )}

                        {modal === "login" && (
                            <LoginPage
                                onRegister={() => setModal("register")}
                                onSuccess={closeModal}
                            />
                        )}
                    </Modal>
                    </div>
                </div>

        </header>
    );
};

export default Header;