import { useState } from "react";
import { useAuth } from "@/context/useAuth.ts";
import { NavLink } from "react-router-dom";
import Modal from "@/components/modal/Modal.tsx";
import Register from "@/pages/Auth/Register.tsx";
import Login from "@/pages/Auth/Login.tsx";
import VerifyCode from "@/pages/Auth/VerifyCode.tsx";
import Information from "@/pages/Auth/Information.tsx";
import AllDone from "@/pages/Auth/AllDone.tsx";

const Header = () => {
    const { isAuth, user } = useAuth();

    const [modal, setModal] = useState<
        "login" | "register" | "verify" | "info" | "all-done" | null
    >(null);

    const [verificationData, setVerificationData] = useState({
        email: "",
        purpose: "Login",
    });

    const closeModal = () => {
        setModal(null);
    };

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

                    <Modal
                        open={modal !== null}
                        closeModal={closeModal}
                    >
                        {modal === "register" && (
                            <Register
                                onRegister={(email) => {
                                    setVerificationData({
                                        email: email,
                                        purpose: "Registration",
                                    });

                                    setModal("verify");
                                }}
                                onLogin={() => {
                                    setModal("login");
                                }}
                            />
                        )}

                        {modal === "login" && (
                            <Login
                                onRegister={() => {
                                    setModal("register");
                                }}
                                onVerify={(email) => {
                                    setVerificationData({
                                        email: email,
                                        purpose: "Login",
                                    });

                                    setModal("verify");
                                }}
                            />
                        )}

                        {modal === "verify" && (
                            <VerifyCode
                                email={verificationData.email}
                                purpose={verificationData.purpose}
                                onSuccess={() => setModal("info")}
                            />
                        )}

                        {modal === "info" && (
                            <Information
                                onSuccess={() => setModal("all-done")}
                            />
                        )}

                        {modal === "all-done" && (
                            <AllDone
                                onClose={closeModal}
                            />
                        )}
                    </Modal>
                </div>
            </div>
        </header>
    );
};

export default Header;