import {useState, type FormEvent,} from "react";
import type {NavigateFunction,} from "react-router-dom";
import {apiFetch, readError,} from "../../api";
import {useBooking,} from "../../hooks/useBooking.ts";
import type {Room,} from "../../context/HotelsContext.types";
type BookingFormProps = {
    room: Room;
    total: number;
    navigate: NavigateFunction;
    hotelName: string;
};

const BookingForm = ({
                         room,
                         total,
                         navigate,
                         hotelName,
                     }: BookingFormProps) => {
    const {
        booking,
        updateBooking,
    } = useBooking();

    const [step, setStep] =
        useState(1);

    const [confirmEmail, setConfirmEmail] =
        useState("");

    const [bookingPassword, setBookingPassword] =
        useState("");

    const [country, setCountry] =
        useState("");

    const [confirmationMethod, setConfirmationMethod] =
        useState("");

    const [cardType, setCardType] =
        useState("Visa");

    const [cardNumber, setCardNumber] =
        useState("");

    const [expiry, setExpiry] =
        useState("");

    const [rules, setRules] =
        useState(false);

    const [error, setError] =
        useState("");

    const submit =
        async (
            event: FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            setError("");

            if (step === 1) {
                if (
                    !booking.firstName ||
                    !booking.lastName ||
                    !booking.email ||
                    !booking.checkIn ||
                    !booking.checkOut
                ) {
                    setError(
                        "Fill in all required fields."
                    );
                    return;
                }

                if (
                    booking.email !==
                    confirmEmail
                ) {
                    setError(
                        "Email addresses do not match."
                    );
                    return;
                }

                if (!bookingPassword) {
                    setError(
                        "Booking password is required."
                    );
                    return;
                }

                const checkIn =
                    new Date(
                        booking.checkIn
                    );

                const checkOut =
                    new Date(
                        booking.checkOut
                    );

                if (
                    checkOut.getTime() <=
                    checkIn.getTime()
                ) {
                    setError(
                        "Check-out must be after check-in."
                    );
                    return;
                }

                if (
                    booking.adults < 1
                ) {
                    setError(
                        "At least one adult is required."
                    );
                    return;
                }

                if (
                    booking.adults +
                    booking.children >
                    room.capacity
                ) {
                    setError(
                        `This room can accommodate only ${room.capacity} guest(s).`
                    );
                    return;
                }

                setStep(2);
                return;
            }

            if (step === 2) {
                if (!country) {
                    setError(
                        "Select your country."
                    );
                    return;
                }

                if (!booking.phone) {
                    setError(
                        "Phone number is required."
                    );
                    return;
                }

                if (!confirmationMethod) {
                    setError(
                        "Choose a booking confirmation method."
                    );
                    return;
                }

                updateBooking({
                    confirmationMethod,
                });

                setStep(3);
                return;
            }

            if (!rules) {
                setError(
                    "You must accept the booking rules."
                );
                return;
            }

            const cleanCardNumber =
                cardNumber.replace(
                    / /g,
                    ""
                );

            if (
                cleanCardNumber.length <
                16
            ) {
                setError(
                    "Enter a valid card number."
                );
                return;
            }

            if (!expiry) {
                setError(
                    "Enter card expiration date."
                );
                return;
            }

            try {
                const response =
                    await apiFetch(
                        "/Booking",
                        {
                            method: "POST",
                            body: JSON.stringify({
                                roomId:
                                room.id,

                                checkInDate:
                                booking.checkIn,

                                checkOutDate:
                                booking.checkOut,

                                adultsCount:
                                booking.adults,

                                childrenCount:
                                booking.children,

                                travelDetails:
                                booking.travelDetails,

                                isPaid:
                                    true,
                            }),
                        }
                    );

                const data =
                    await response
                        .json()
                        .catch(
                            () => null
                        );

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                        (await readError(
                            response
                        ))
                    );
                }

                localStorage.setItem(
                    "last_booking",
                    JSON.stringify({
                        bookingId:
                            data?.id ||
                            Math.floor(
                                Math.random() *
                                90000
                            ) + 10000,

                        hotelName,

                        roomTitle:
                        room.title,

                        bedType:
                        room.bedType,

                        capacity:
                        room.capacity,

                        pricePerNight:
                            Number(
                                room.pricePerNight
                            ),

                        roomImageUrl:
                        room.imageUrl,

                        firstName:
                        booking.firstName,

                        lastName:
                        booking.lastName,

                        email:
                        booking.email,

                        checkIn:
                        booking.checkIn,

                        checkOut:
                        booking.checkOut,

                        adults:
                        booking.adults,

                        children:
                        booking.children,

                        phone:
                        booking.phone,

                        country,

                        confirmationMethod,

                        total,
                    })
                );

                window.dispatchEvent(
                    new Event(
                        "booking-updated"
                    )
                );

                navigate(
                    "/booking-success"
                );
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Booking failed."
                );
            }
        };

    return (
        <form
            onSubmit={submit}
            className="font-['Nunito_Sans']"
        >
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#581ADB]">
                    {step}/3{" "}
                    <span className="ml-3 text-[#222]">
                        Booking
                    </span>
                </h2>
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-bold text-[#555]">
                                First name
                            </label>

                            <input
                                value={
                                    booking.firstName
                                }
                                onChange={event =>
                                    updateBooking({
                                        firstName:
                                        event
                                            .target
                                            .value,
                                    })
                                }
                                placeholder="First name"
                                className="h-11 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-bold text-[#555]">
                                Last name
                            </label>

                            <input
                                value={
                                    booking.lastName
                                }
                                onChange={event =>
                                    updateBooking({
                                        lastName:
                                        event
                                            .target
                                            .value,
                                    })
                                }
                                placeholder="Last name"
                                className="h-11 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Email address
                        </label>

                        <input
                            type="email"
                            value={
                                booking.email
                            }
                            onChange={event =>
                                updateBooking({
                                    email:
                                    event
                                        .target
                                        .value,
                                })
                            }
                            placeholder="Email address"
                            className="h-11 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Confirm email address
                        </label>

                        <input
                            type="email"
                            value={
                                confirmEmail
                            }
                            onChange={event =>
                                setConfirmEmail(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Confirm email address"
                            className="h-11 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Booking password
                        </label>

                        <input
                            type="password"
                            value={
                                bookingPassword
                            }
                            onChange={event =>
                                setBookingPassword(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Choose a password for your booking"
                            className="h-11 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <div className="rounded-[14px] border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                        <p className="text-sm font-bold text-[#222]">
                            Booking details
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="rounded-[10px] bg-white p-3">
                                <p className="text-[10px] text-[#999]">
                                    Guests
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#581ADB]">
                                    {booking.adults} adult(s),{" "}
                                    {booking.children} child(ren)
                                </p>
                            </div>

                            <div className="rounded-[10px] bg-white p-3">
                                <p className="text-[10px] text-[#999]">
                                    Capacity
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#581ADB]">
                                    {room.capacity} guest(s)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-5">
                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Country
                        </label>

                        <select
                            value={country}
                            onChange={event =>
                                setCountry(
                                    event
                                        .target
                                        .value
                                )
                            }
                            className="h-12 w-full rounded-full border border-[#DDDDDD] bg-white px-5 text-sm outline-none focus:border-[#581ADB]"
                        >
                            <option value="">
                                Select country
                            </option>

                            <option>
                                Ukraine
                            </option>

                            <option>
                                Poland
                            </option>

                            <option>
                                Germany
                            </option>

                            <option>
                                France
                            </option>

                            <option>
                                United Kingdom
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Phone number
                        </label>

                        <input
                            type="tel"
                            value={
                                booking.phone
                            }
                            onChange={event =>
                                updateBooking({
                                    phone:
                                    event
                                        .target
                                        .value,
                                })
                            }
                            placeholder="Phone number"
                            className="h-12 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-bold text-[#222]">
                            How should we confirm your booking?
                        </p>

                        <div className="grid gap-3 md:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setConfirmationMethod(
                                        "call"
                                    );

                                    updateBooking({
                                        confirmationMethod:
                                            "call",
                                    });
                                }}
                                className={`rounded-[14px] border p-4 text-left text-sm transition ${
                                    confirmationMethod ===
                                    "call"
                                        ? "border-[#581ADB] bg-[#F5F0FF] text-[#581ADB]"
                                        : "border-[#E5E5E5] text-[#555]"
                                }`}
                            >
                                <span className="mr-2 inline-flex h-4 w-4 rounded-full border border-[#581ADB] align-middle">
                                    {confirmationMethod ===
                                        "call" && (
                                            <span className="m-[3px] h-2 w-2 rounded-full bg-[#581ADB]" />
                                        )}
                                </span>

                                Call me to confirm booking
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setConfirmationMethod(
                                        "email"
                                    );

                                    updateBooking({
                                        confirmationMethod:
                                            "email",
                                    });
                                }}
                                className={`rounded-[14px] border p-4 text-left text-sm transition ${
                                    confirmationMethod ===
                                    "email"
                                        ? "border-[#581ADB] bg-[#F5F0FF] text-[#581ADB]"
                                        : "border-[#E5E5E5] text-[#555]"
                                }`}
                            >
                                <span className="mr-2 inline-flex h-4 w-4 rounded-full border border-[#581ADB] align-middle">
                                    {confirmationMethod ===
                                        "email" && (
                                            <span className="m-[3px] h-2 w-2 rounded-full bg-[#581ADB]" />
                                        )}
                                </span>

                                Send me an email to confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-5">
                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Debit card type
                        </label>

                        <select
                            value={cardType}
                            onChange={event =>
                                setCardType(
                                    event
                                        .target
                                        .value
                                )
                            }
                            className="h-12 w-full rounded-full border border-[#DDDDDD] bg-white px-5 text-sm outline-none focus:border-[#581ADB]"
                        >
                            <option value="Visa">
                                Visa
                            </option>

                            <option value="Mastercard">
                                Mastercard
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Card number
                        </label>

                        <input
                            value={
                                cardNumber
                            }
                            onChange={event =>
                                setCardNumber(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Credit or debit card number"
                            className="h-12 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold text-[#555]">
                            Expiration date
                        </label>

                        <input
                            value={expiry}
                            onChange={event =>
                                setExpiry(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="MM/YY"
                            className="h-12 w-full rounded-full border border-[#DDDDDD] px-5 text-sm outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#E5E5E5] p-4 text-xs text-[#666]">
                        <input
                            type="checkbox"
                            checked={rules}
                            onChange={event =>
                                setRules(
                                    event
                                        .target
                                        .checked
                                )
                            }
                            className="h-4 w-4 accent-[#581ADB]"
                        />

                        I agree to the general booking conditions and privacy policy
                    </label>

                    <div className="flex items-center justify-between border-t border-[#EEEEEE] pt-4">
                        <span className="text-sm text-[#777]">
                            Total
                        </span>

                        <span className="text-xl font-extrabold text-[#581ADB]">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-5 rounded-[12px] bg-red-50 px-4 py-3 text-sm text-red-500">
                    {error}
                </div>
            )}

            <div className="mt-6 flex gap-3">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={() => {
                            setError("");
                            setStep(
                                step - 1
                            );
                        }}
                        className="h-12 rounded-full border border-[#581ADB] px-7 text-sm font-bold text-[#581ADB]"
                    >
                        Back
                    </button>
                )}

                <button
                    type="submit"
                    className="h-12 flex-1 rounded-full bg-[#581ADB] text-sm font-extrabold text-white shadow-[0_5px_18px_rgba(88,26,219,0.22)]"
                >
                    {step === 3
                        ? "Complete the booking"
                        : "Continue"}
                </button>
            </div>
        </form>
    );
};

export default BookingForm;