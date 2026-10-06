import { useState } from "react";
import {apiFetch, readError,} from "../../api";
import {useAuth,} from "../../context/useAuth";
import {type SubmitHandler, useForm,} from "react-hook-form";

type VerifyCodeProps = {
    email: string;
    purpose: string;
    onSuccess: () => void;
};

type VerifyFormData = {
    code: string;
};

const VerifyCode = ({
                        email,
                        purpose,
                        onSuccess,
                    }: VerifyCodeProps) => {
    const { login } =
        useAuth();

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<VerifyFormData>();

    const onSubmit: SubmitHandler<
        VerifyFormData
    > = async data => {
        setError("");
        setLoading(true);

        try {
            const response =
                await apiFetch(
                    "/Auth/verify",
                    {
                        method: "POST",
                        body: JSON.stringify(
                            {
                                email,
                                code: data.code,
                                purpose,
                            }
                        ),
                    }
                );

            if (!response.ok) {
                throw new Error(
                    await readError(
                        response
                    )
                );
            }

            const resp =
                await response.json();

            if (!resp.accessToken) {
                throw new Error(
                    "Access token was not returned by server."
                );
            }

            login(
                {
                    id:
                        resp.id ||
                        resp.userId,

                    name:
                        resp.name ||
                        "User",

                    email:
                        resp.email ||
                        email,
                },
                resp.accessToken,
                resp.refreshToken
            );

            onSuccess();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-8 pb-8 pt-4 font-['Nunito_Sans']">
            <h2 className="mb-8 text-center text-[24px] font-extrabold text-[#581ADB]">
                Authentication
            </h2>

            <form
                onSubmit={handleSubmit(
                    onSubmit
                )}
                className="flex min-h-[470px] flex-col"
            >
                <p className="mb-5 text-center text-sm text-[#777]">
                    Enter the verification code sent to
                    <br />
                    <strong className="text-[#222]">
                        {email}
                    </strong>
                </p>

                <input
                    {...register(
                        "code",
                        {
                            required:
                                "Enter verification code.",
                        }
                    )}
                    placeholder="Verification code"
                    className="h-12 rounded-full border border-[#DDDDDD] px-5 text-center text-sm outline-none focus:border-[#581ADB]"
                />

                {errors.code && (
                    <p className="mt-2 text-xs text-red-500">
                        {
                            errors
                                .code
                                .message
                        }
                    </p>
                )}

                {error && (
                    <p className="mt-4 text-center text-sm text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-auto h-12 rounded-full bg-[#581ADB] text-sm font-extrabold text-white disabled:opacity-50"
                >
                    {loading
                        ? "Checking..."
                        : "Continue"}
                </button>
            </form>
        </div>
    );
};

export default VerifyCode;