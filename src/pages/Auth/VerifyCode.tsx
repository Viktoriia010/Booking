import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, readError } from "../../api";
import { useAuth } from "../../context/useAuth";
import {type SubmitHandler, useForm} from "react-hook-form";

type VerifyCodeProps = {
    email: string;
    verificationCode: string;
    onClose: () => void;
};

type VerifyFormData = {
    code: string;
};

const VerifyCode = ({email, verificationCode, onClose }: VerifyCodeProps) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm<VerifyFormData>();
    const [loading, setLoading] = useState(false);


    const onSubmit: SubmitHandler<VerifyFormData> = async (data) => {
        setError("");
        setLoading(true);

        try {
            const response = await apiFetch("/Auth/verify", {
                method: "POST",
                body: JSON.stringify({ email: email, code: data.code }),
            });

            if (!response.ok) throw new Error(await readError(response));
            const resp = await response.json();

            login(
                { name: "user", email: resp.email },
                resp.accessToken,
                resp.refreshToken
            );

            onClose();
            navigate("/account");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-8 pb-8 pt-4 ">
            <h2 className="mb-8 text-center text-[24px] font-extrabold text-[#581ADB]">
                Authentication
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-[470px] flex-col">
                <div>
                    <input
                        {...register("code", {
                            required: "Код є обовʼязковим",
                        })}
                        placeholder="Code"
                        className="
                    h-[48px]
                    w-full
                    rounded-full
                    border
                    border-[#DDDDDD]
                    bg-white
                    px-5
                    text-[14px]
                    text-gray-700
                    outline-none
                    transition
                    placeholder:text-[#717171]
                    focus:border-[#6d28d9]
                    focus:ring-1
                    focus:ring-[#6d28d9]
                "
                    />

                    {errors.code && (
                        <p className="mt-1 px-4 text-xs text-red-500">
                            {errors.code.message}
                        </p>
                    )}

                    <p className="mt-2 px-5 text-[14px] leading-[20px] text-[#717171]">
                        We have sent you an email with the code.
                        <br />
                        Check your mail and enter the code for the
                        <br />
                        authentication
                    </p>

                    {error && (
                        <p className="mt-2 px-4 text-xs text-red-500">
                            {error}
                        </p>
                    )}
                </div>
                <p>Test code: <strong>{verificationCode}</strong></p>
                <button
                    type="submit"
                    disabled={loading}
                    className="h-[52px] w-full cursor-pointer rounded-full bg-[#581ADB] text-sm font-bold text-white transition duration-300 hover:bg-violet-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Continue"}
                </button>
            </form>
        </div>
    );
};

export default VerifyCode;
