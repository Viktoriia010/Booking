import { useState, } from "react";
// import { useNavigate } from "react-router-dom";
// import Modal from "../../components/modal/Modal";
import { apiFetch, readError } from "../../api";
import {type SubmitHandler, useForm} from "react-hook-form";

type RegisterPageProps = {
    onRegister: (email: string, verificationCode: string) => void;
    onLogin: () => void;
};

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};


export const Register = ({ onRegister, onLogin  }: RegisterPageProps) => {
    // const navigate = useNavigate();
    //const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const password = watch('password');

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setError("");
        setLoading(true);

        try {
            const response = await apiFetch("/Auth/register", {
                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password, }),
            });

            if (!response.ok) throw new Error(await readError(response));
            const resp = await response.json();


            onRegister(data.email, resp.verificationCode);

            // navigate(`/verify?email=${encodeURIComponent(data.email)}`, {
            //     state: { verificationCode: resp.verificationCode },
            // });
            //navigate("/account");
            // alert('Реєстрація успішна!');
        } catch (error) {
            setError(error instanceof Error ? error.message : "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
            // <h2>Register</h2>
            // <form onSubmit={submit} className="auth-form">
            //     <input value={name} onChange={event => setName(event.target.value)} placeholder="Name" required />
            //     <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email" required />
            //     <input value={phone} onChange={event => setPhone(event.target.value)} placeholder="Phone" />
            //     <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" required />
            //     <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Confirm password" required />
            //     <label><input type="checkbox" required /> I agree with Privacy policy</label>
            //     <button className="button" type="submit" disabled={loading}>{loading ? "Loading..." : "Send code"}</button>
            // </form>

    <div className="w-full ">

        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-8 pb-8 pt-4 font-['Nunito_Sans']">

            <h1 className="mb-8 text-center text-[22px] font-extrabold text-[#581ADB]">
                Register
            </h1>

            {/* Email */}
            <div className="mb-2">
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
                    className="
                            h-[41px]
                            w-full
                            rounded-full
                            border
                            border-[#e2e2e2]
                            bg-white
                            px-4
                            text-[14px]
                            text-gray-700
                            outline-none
                            transition
                            placeholder:text-[#858585]
                            focus:border-[#6d28d9]
                            focus:ring-1
                            focus:ring-[#6d28d9]
                        "
                />

                {errors.email && (
                    <p className="mt-1 px-4 text-[11px] text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Email info */}
            <p className="mb-2 px-4 text-[12px] leading-[16px] text-[#8a8a8a]">
                We will send you an email to confirm your
                <br />
                email address
            </p>

            {/* Password */}
            <div className="mb-2">
                <div className="relative">
                    <input
                        id="password"
                        type="password"
                        maxLength={50}
                        placeholder="Password"
                        {...register('password', {
                            required: 'Пароль є обовʼязковим',
                            minLength: {
                                value: 6,
                                message:
                                    'Пароль повинен містити мінімум 6 символів',
                            },
                        })}
                        className="
                                h-[41px]
                                w-full
                                rounded-full
                                border
                                border-[#e2e2e2]
                                bg-white
                                px-4
                                pr-12
                                text-[14px]
                                text-gray-700
                                outline-none
                                transition
                                placeholder:text-[#858585]
                                focus:border-[#6d28d9]
                                focus:ring-1
                                focus:ring-[#6d28d9]
                            "
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#b5b5b5]">
                            {password?.length || 0}/50
                        </span>
                </div>

                {errors.password && (
                    <p className="mt-1 px-4 text-[11px] text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Repeat password */}
            <div className="mb-2">
                <div className="relative">
                    <input
                        id="confirmPassword"
                        type="password"
                        maxLength={50}
                        placeholder="Repeat password"
                        {...register('confirmPassword', {
                            required: 'Повторіть пароль',
                            validate: (value) =>
                                value === password ||
                                'Паролі не співпадають',
                        })}
                        className="
                                h-[41px]
                                w-full
                                rounded-full
                                border
                                border-[#e2e2e2]
                                bg-white
                                px-4
                                pr-12
                                text-[14px]
                                text-gray-700
                                outline-none
                                transition
                                placeholder:text-[#858585]
                                focus:border-[#6d28d9]
                                focus:ring-1
                                focus:ring-[#6d28d9]
                            "
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#b5b5b5]">
                            {watch('confirmPassword')?.length || 0}/50
                        </span>
                </div>

                {errors.confirmPassword && (
                    <p className="mt-1 px-4 text-[11px] text-red-500">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* Privacy policy */}
            <p className="mb-7 px-4 text-[12px] text-[#777]">
                *Get acquainted with our{' '}
                <button
                    type="button"
                    className="text-[#581ADB] hover:underline cursor-pointer"
                >
                    Privacy policy
                </button>
            </p>

            {error && <p className="error">{error}</p>}


            <button
                type="submit"
                disabled={loading}
                className="
                        h-[50px]
                        w-full
                        rounded-full
                        bg-[#581ADB]
                        text-[14px]
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#4c1dcb]
                        active:scale-[0.98]
                        cursor-pointer
                    "
            >
                {loading ? "Loading..." : "Continue"}
            </button>


            {/* Social buttons */}
            <div className="mt-9 space-y-4">
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

            {/* Login */}
            <div className="mt-5 text-center text-[12px] text-[#888]">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onLogin}
                    className="font-medium text-[#581ADB] hover:underline cursor-pointer"
                >
                    Sign In
                </button>
            </div>
        </form>
    </div>
    );
};

export default Register;
