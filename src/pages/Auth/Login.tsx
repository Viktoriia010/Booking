import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { apiFetch, readError } from "@/api";
import { useAuth } from "@/context/useAuth";
import {type SubmitHandler, useForm} from "react-hook-form";



type LoginPageProps = {
    onRegister: () => void;
    onSuccess: () => void;
};

type LogInFormData = {
    email: string;
    password: string;
};


const Login = ({ onRegister, onSuccess }: LoginPageProps) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm<LogInFormData>();


    const onSubmit: SubmitHandler<LogInFormData> = async (data) => {
        setError("");
        setLoading(true);

        try {
            const response = await apiFetch("/Auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,}),
            });

            if (!response.ok) throw new Error(await readError(response));
            const resp = await response.json();

            login(
                { name: resp.name, email: resp.email },
                resp.accessToken,
                resp.refreshToken
            );
            onSuccess();
            navigate('/account');
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (

    <div className="w-full">

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-8 pb-8 pt-4 font-['Nunito_Sans']"
        >
            {/* Title */}
            <h1 className="mb-9 text-center text-[22px] font-extrabold text-[#581ADB]">
                Sign In
            </h1>

            {/* Email */}
            <div className="mb-4">
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email є обовʼязковим',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Введіть коректний email',
                        },
                    })}
                    className="h-[52px]  w-full rounded-full border border-neutral-300 bg-white px-5 text-sm text-neutral-700 outline-none transition placeholder:text-neutral-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 "
                />

                {errors.email && (
                    <p className="mt-1 px-4 text-xs text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div className="mb-4 ">
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                        required: 'Пароль є обовʼязковим',
                        minLength: {
                            value: 6,
                            message: 'Пароль повинен містити мінімум 6 символів',
                        },
                    })}
                    className="h-[52px] w-full rounded-full border border-neutral-300 bg-white px-5 text-sm text-neutral-700 outline-none transition placeholder:text-neutral-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />

                {errors.password && (
                    <p className="mt-1 px-4 text-xs text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>
            {error && <p className="error">{error}</p>}
            {/* Continue */}
            <button
                type="submit"
                disabled={loading}
                // className="h-[52px] w-full cursor-pointer rounded-full bg-neutral-300 text-sm font-bold text-neutral-600 transition duration-300 hover:bg-neutral-400 active:scale-[0.99]"
            className="h-[52px] w-full cursor-pointer rounded-full bg-[#581ADB] text-sm font-bold text-white transition duration-300 hover:bg-violet-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Loading..." : "Continue"}
            </button>

            {/* Register */}
            <div className="mt-2 text-center text-sm text-neutral-500">
                Do not have an account?{' '}
                <button
                    type="button"
                    onClick={onRegister}
                    className="text-[#581ADB] transition hover:text-violet-800 cursor-pointer hover:underline"
                >
                    Register
                </button>
            </div>

            {/* Social buttons */}
            <div className="mt-9 space-y-5 mb-14">

                {/* Google */}
                <button
                    type="button"
                    className="flex h-[52px] w-full items-center cursor-pointer rounded-full border border-neutral-300 bg-white px-5 text-sm  transition hover:bg-neutral-50"
                >
                    <img
                        src="/logos_google-icon.svg"
                        alt="Google Logo"
                    />

                    <span className="flex-1 text-center text-black">
                            Sign In with Google
                        </span>

                    <span className="w-8" />
                </button>

                {/* Facebook */}
                <button
                    type="button"
                    className="flex h-[52px] w-full items-center cursor-pointer rounded-full border border-neutral-300 bg-white px-5 text-sm transition hover:bg-neutral-50"
                >
                    <img
                        src="/logos_facebook.svg"
                        alt="Facebook Logo"
                    />

                    <span className="flex-1 text-center text-black">
                            Sign In with Facebook
                        </span>

                    <span className="w-8" />
                </button>

                {/* Apple */}
                <button
                    type="button"
                    className="flex h-[52px] w-full items-center cursor-pointer rounded-full border border-neutral-300 bg-white px-5 text-sm transition hover:bg-neutral-50"
                >
                    <img
                        src="/apple.svg"
                        alt="Apple Logo"
                    />

                    <span className="flex-1 text-center text-black">
                            Sign In with Apple
                        </span>

                    <span className="w-8" />
                </button>

            </div>
        </form>
    </div>
    );
};

export default Login;
