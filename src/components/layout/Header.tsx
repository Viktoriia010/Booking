import {useState,} from "react";
import {NavLink, useNavigate,} from "react-router-dom";
import {useAuth,} from "@/context/useAuth.ts";
import Modal from "@/components/modal/Modal.tsx";
import Register from "@/pages/Auth/Register.tsx";
import Login from "@/pages/Auth/Login.tsx";
import VerifyCode from "@/pages/Auth/VerifyCode.tsx";

const Header = () => {
    const {
        isAuth,
    } = useAuth();

    const navigate =
        useNavigate();

    const [modal, setModal] =
        useState<
            "login" |
            "register" |
            "verify" |
            null
        >(null);

    const [
        verificationData,
        setVerificationData,
    ] = useState({
        email: "",
        purpose: "Login",
    });

    const closeModal = () => {
        setModal(null);
    };

    return (
        <header className="border-b border-[#EEEEEE] bg-white">
            <div className="mx-auto flex h-[70px] items-center justify-between px-4 sm:h-[80px] sm:px-6">
                <button
                    type="button"
                    onClick={() =>
                        navigate("/")
                    }
                    className="text-xl font-extrabold text-[#222] sm:text-2xl"
                >
                    Hotel for{" "}
                    <span className="text-[#581ADB]">
                        you.
                    </span>
                </button>

                <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-sm text-[#777]">
                        EN
                    </span>

                    {isAuth ? (
                        <NavLink to="/account">
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-full border border-[#DDDDDD] px-4 py-2 text-sm font-bold"
                            >
                                Account
                                <span className="text-[#581ADB]">
                                    ●
                                </span>
                            </button>
                        </NavLink>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() =>
                                    setModal(
                                        "register"
                                    )
                                }
                                className="rounded-full border border-[#DDDDDD] px-4 py-2 text-sm font-bold"
                            >
                                Register
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setModal(
                                        "login"
                                    )
                                }
                                className="rounded-full border border-[#DDDDDD] px-4 py-2 text-sm font-bold"
                            >
                                Sign In
                            </button>
                        </>
                    )}

                    <Modal
                        open={
                            modal !==
                            null
                        }
                        closeModal={
                            closeModal
                        }
                    >
                        {modal ===
                            "register" && (
                                <Register
                                    onRegister={email => {
                                        setVerificationData(
                                            {
                                                email,
                                                purpose:
                                                    "Registration",
                                            }
                                        );

                                        setModal(
                                            "verify"
                                        );
                                    }}
                                    onLogin={() =>
                                        setModal(
                                            "login"
                                        )
                                    }
                                />
                            )}

                        {modal ===
                            "login" && (
                                <Login
                                    onRegister={() =>
                                        setModal(
                                            "register"
                                        )
                                    }
                                    onVerify={email => {
                                        setVerificationData(
                                            {
                                                email,
                                                purpose:
                                                    "Login",
                                            }
                                        );

                                        setModal(
                                            "verify"
                                        );
                                    }}
                                />
                            )}

                        {modal ===
                            "verify" && (
                                <VerifyCode
                                    email={
                                        verificationData.email
                                    }
                                    purpose={
                                        verificationData.purpose
                                    }
                                    onSuccess={() => {
                                        closeModal();

                                        if (
                                            verificationData.purpose ===
                                            "Registration"
                                        ) {
                                            navigate(
                                                "/information"
                                            );
                                            return;
                                        }

                                        navigate(
                                            "/all-done"
                                        );
                                    }}
                                />
                            )}
                    </Modal>
                </div>
            </div>
        </header>
    );
};

export default Header;