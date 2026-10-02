import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useHotels } from "@/hooks/useHotels";

type ReviewFormValues = {
    facilities: number;
    staff: number;
    cleanliness: number;
    comfort: number;
    location: number;
    valueForMoney: number;
    text: string;
};

type ReviewFormProps = {
    hotelId: string;
    isAuth: boolean;
    onSubmitted?: () => Promise<void> | void;
};

type RatingFieldProps = {
    label: string;
    value: number;
    onChange: (value: number) => void;
};

const RatingField = ({ label,
                         value,
                         onChange,
                     }: RatingFieldProps) => {
    return (
        <div className="
            flex
            flex-col
            gap-2
            rounded-xl
            bg-white
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
        ">
            <span className="
                text-sm
                font-medium
                text-[#555]
            ">
                {label}
            </span>

            <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, index) => {
                    const rating = index + 1;
                    const active = rating <= value;

                    return (
                        <button
                            key={rating}
                            type="button"
                            onClick={() => onChange(rating)}
                            aria-label={`${rating} out of 10`}
                            className="
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                transition
                                hover:scale-110
                            "
                        >
                            <span
                                className={`
                                    text-[18px]
                                    leading-none
                                    ${
                                    active
                                        ? "text-[#581ADB]"
                                        : "text-[#ddd]"
                                }
                                `}
                            >
                                ★
                            </span>
                        </button>
                    );
                })}

                <span className="
                    ml-2
                    w-8
                    text-right
                    text-xs
                    font-semibold
                    text-[#581ADB]
                ">
                    {value}/10
                </span>
            </div>
        </div>
    );
};

const ReviewForm = ({
                        hotelId,
                        isAuth,
                        onSubmitted,
                    }: ReviewFormProps) => {
    const navigate = useNavigate();
    const { addReview } = useHotels();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ReviewFormValues>({
        defaultValues: {
            facilities: 0,
            staff: 0,
            cleanliness: 0,
            comfort: 0,
            location: 0,
            valueForMoney: 0,
            text: "",
        },
    });

    const facilities = watch("facilities");
    const staff = watch("staff");
    const cleanliness = watch("cleanliness");
    const comfort = watch("comfort");
    const location = watch("location");
    const valueForMoney = watch("valueForMoney");

    const onSubmit = async (data: ReviewFormValues) => {
        await addReview(
            hotelId,
            data.facilities,
            data.staff,
            data.cleanliness,
            data.comfort,
            data.location,
            data.valueForMoney,
            data.text.trim()
        );

        reset();

        await onSubmitted?.();
    };

    if (!isAuth) {
        return (
            <div className="
                mt-8
                rounded-2xl
                border border-[#eeeaff]
                bg-[#faf9ff]
                p-6
                sm:p-8
            ">
                <div className="text-center">
                    <div className="
                        mx-auto mb-4
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-[#eee8ff]
                        text-[#581ADB]
                    ">
                        ★
                    </div>

                    <h3 className="
                        text-lg
                        font-bold
                        text-[#333]
                    ">
                        Share your experience
                    </h3>

                    <p className="
                        mt-2
                        text-sm
                        text-[#888]
                    ">
                        Sign in to leave a review about this hotel.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="
                            mt-5
                            rounded-full
                            bg-[#581ADB]
                            px-7 py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#4816c5]
                        "
                    >
                        Sign in
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="
                mt-8
                rounded-2xl
                bg-[#faf9ff]
                p-6
                sm:p-8
            "
        >
            <div className="mb-7">
                <h3 className="
                    text-lg
                    font-bold
                    text-[#333]
                ">
                    Leave a review
                </h3>

                <p className="
                    mt-1
                    text-sm
                    text-[#999]
                ">
                    Rate your experience at this hotel.
                </p>
            </div>

            {/* RATINGS */}

            <div className="space-y-3">
                <RatingField
                    label="Facilities"
                    value={facilities}
                    onChange={(value) =>
                        setValue("facilities", value, {
                            shouldValidate: true,
                        })
                    }
                />

                <RatingField
                    label="Staff"
                    value={staff}
                    onChange={(value) =>
                        setValue("staff", value, {
                            shouldValidate: true,
                        })
                    }
                />

                <RatingField
                    label="Cleanliness"
                    value={cleanliness}
                    onChange={(value) =>
                        setValue("cleanliness", value, {
                            shouldValidate: true,
                        })
                    }
                />

                <RatingField
                    label="Comfort"
                    value={comfort}
                    onChange={(value) =>
                        setValue("comfort", value, {
                            shouldValidate: true,
                        })
                    }
                />

                <RatingField
                    label="Location"
                    value={location}
                    onChange={(value) =>
                        setValue("location", value, {
                            shouldValidate: true,
                        })
                    }
                />

                <RatingField
                    label="Value for money"
                    value={valueForMoney}
                    onChange={(value) =>
                        setValue("valueForMoney", value, {
                            shouldValidate: true,
                        })
                    }
                />
            </div>

            {/* HIDDEN VALIDATION */}

            <input
                type="hidden"
                {...register("facilities", {
                    validate: (value) =>
                        value > 0 || "Please rate facilities.",
                })}
            />

            <input
                type="hidden"
                {...register("staff", {
                    validate: (value) =>
                        value > 0 || "Please rate staff.",
                })}
            />

            <input
                type="hidden"
                {...register("cleanliness", {
                    validate: (value) =>
                        value > 0 || "Please rate cleanliness.",
                })}
            />

            <input
                type="hidden"
                {...register("comfort", {
                    validate: (value) =>
                        value > 0 || "Please rate comfort.",
                })}
            />

            <input
                type="hidden"
                {...register("location", {
                    validate: (value) =>
                        value > 0 || "Please rate location.",
                })}
            />

            <input
                type="hidden"
                {...register("valueForMoney", {
                    validate: (value) =>
                        value > 0 || "Please rate value for money.",
                })}
            />

            {(errors.facilities ||
                errors.staff ||
                errors.cleanliness ||
                errors.comfort ||
                errors.location ||
                errors.valueForMoney) && (
                <p className="
                    mt-4
                    text-xs
                    text-red-500
                ">
                    Please rate all categories before submitting.
                </p>
            )}

            {/* COMMENT */}

            <div className="mt-5">
                <textarea
                    {...register("text", {
                        required: "Please write a review.",
                        minLength: {
                            value: 5,
                            message:
                                "Review must contain at least 5 characters.",
                        },
                        maxLength: {
                            value: 500,
                            message:
                                "Review cannot exceed 500 characters.",
                        },
                    })}
                    placeholder="Share your experience..."
                    rows={5}
                    className={`
                        w-full
                        resize-none
                        rounded-xl
                        border
                        bg-white
                        p-4
                        text-sm
                        text-[#333]
                        outline-none
                        transition
                        placeholder:text-[#c5c5c5]
                        focus:ring-2
                        ${
                        errors.text
                            ? "border-red-300 focus:border-red-400 focus:ring-red-400/10"
                            : "border-gray-200 focus:border-[#581ADB] focus:ring-[#581ADB]/10"
                    }
                    `}
                />

                {errors.text && (
                    <p className="
                        mt-2
                        text-xs
                        text-red-500
                    ">
                        {errors.text.message}
                    </p>
                )}
            </div>

            {/* SUBMIT */}

            <div className="
                mt-5
                flex
                justify-end
            ">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        rounded-full
                        bg-[#581ADB]
                        px-7 py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-[0_0_20px_rgba(88,26,219,0.25)]
                        transition
                        hover:bg-[#4816c5]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {isSubmitting
                        ? "Sending..."
                        : "Send review"}
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
