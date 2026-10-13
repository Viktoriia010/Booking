import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, readError } from "../api";
import AccountTabs from "../components/account/AccountTabs";

const SecurityPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const timer = window.setTimeout(() => {
            const load = async () => {
                try {
                    const response = await apiFetch("/Account");

                    if (!response.ok) {
                        throw new Error(
                            await readError(response)
                        );
                    }

                    const account = await response.json();

                    setEmail(account.email || "");
                    setPhone(account.phone || "");
                } catch (error) {
                    setMessage(
                        error instanceof Error
                            ? error.message
                            : "Could not load security information."
                    );
                }
            };

            void load();
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white px-4 py-7 font-['Nunito_Sans'] sm:px-8">
            <div className="mx-auto max-w-[1120px]">

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mb-5 text-[10px] text-[#999]"
                >
                    ← Main page
                </button>

                <AccountTabs />

                <h1 className="text-[24px] font-extrabold text-[#581ADB]">
                    Security
                </h1>

                <div className="mt-4 max-w-[800px] rounded-[14px] border border-[#E5E5E5] p-5">

                    <div className="space-y-6">


                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-bold text-[#222]">
                                Email address
                            </label>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    value={email}
                                    readOnly
                                    className="h-11 flex-1 rounded-full border border-[#E5E5E5] px-5 text-sm text-[#777]"
                                />

                                <span className="text-xs text-[#777]">
                                    Is it still your email address?
                                </span>

                                <button
                                    type="button"
                                    onClick={() => navigate("/account")}
                                    className="text-xs font-bold text-[#581ADB]"
                                >
                                    Change
                                </button>
                            </div>
                        </div>


                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-bold text-[#222]">
                                Phone number
                            </label>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    value={phone}
                                    readOnly
                                    placeholder="Phone number"
                                    className="h-11 flex-1 rounded-full border border-[#E5E5E5] px-5 text-sm text-[#777]"
                                />

                                <span className="text-xs text-[#777]">
                                    Is it still your phone number?
                                </span>

                                <button
                                    type="button"
                                    onClick={() => navigate("/account")}
                                    className="text-xs font-bold text-[#581ADB]"
                                >
                                    Change
                                </button>
                            </div>
                        </div>


                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-bold text-[#222]">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={event =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter password"
                                className="h-11 w-full rounded-full border border-[#E5E5E5] px-5 text-sm outline-none focus:border-[#581ADB]"
                            />

                            <p className="text-xs text-[#777]">
                                You can enter a new password here.
                                Password change will be connected separately.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    setMessage(
                                        "Password change is not connected yet."
                                    )
                                }
                                className="w-fit text-xs font-bold text-[#581ADB]"
                            >
                                Change password
                            </button>
                        </div>

                    </div>
                </div>

                <div className="mt-6 max-w-[800px] text-sm leading-6 text-[#777]">
                    When booking hotel rooms online, it is essential to pay attention to the
                    privacy policy of the website. The privacy policy explains how your
                    personal information is collected, used and protected.
                    <br />
                    <br />
                    By keeping your email, phone number and password secure, you can protect
                    your account and booking information.
                </div>

                {message && (
                    <p className="mt-4 text-sm text-[#581ADB]">
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
};

export default SecurityPage;