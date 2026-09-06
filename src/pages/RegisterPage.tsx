import { customFetch } from '../api/customFetch';
import { type SubmitHandler, useForm } from 'react-hook-form';

type RegisterPageProps = {
    onRegister: () => void;
};

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterPage = ({ onRegister }: RegisterPageProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const password = watch('password');

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        try {
            const response = await customFetch('Auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            alert('Реєстрація успішна! Тепер увійдіть у свій акаунт.');

            onRegister();
        } catch (err) {
            alert('Помилка реєстрації');
        }
    };

    return (
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


                <button
                    type="submit"
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
                    Continue
                </button>


                {/* Social buttons */}
                <div className="mt-9 space-y-4">
                    {/* Google */}
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
                        onClick={onRegister}
                        className="font-medium text-[#581ADB] hover:underline cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};