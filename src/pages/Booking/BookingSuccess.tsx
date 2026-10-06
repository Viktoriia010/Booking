import { useState } from "react";
import { Link } from "react-router-dom";

type LastBooking = {
    bookingId: string;
    hotelName: string;
    roomTitle: string;
    bedType: string;
    pricePerNight: number;
    firstName: string;
    lastName: string;
    email: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    phone: string;
    total: number;
    roomImageUrl: string;
};

const getLastBooking = (): LastBooking | null => {
    const saved =
        localStorage.getItem("last_booking");

    if (!saved) {
        return null;
    }

    try {
        return JSON.parse(saved) as LastBooking;
    } catch {
        return null;
    }
};

const BookingSuccess = () => {
    const [booking] =
        useState<LastBooking | null>(
            getLastBooking
        );

    const printConfirmation = () => {
        window.print();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-10 font-['Nunito_Sans']">
            <div className="w-full max-w-[520px] rounded-[24px] border border-[#E5E5E5] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:p-8">

                {/* Logo */}
                <div className="text-center">
                    <p className="text-lg font-extrabold text-[#581ADB]">
                        Hotel for you.
                    </p>
                </div>

                {/* Success */}
                <div className="my-7 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">
                        ✓
                    </div>

                    <h1 className="mt-4 text-2xl font-extrabold text-[#222]">
                        Thank you{" "}
                        {booking?.firstName ||
                            "for booking"}!
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-green-600">
                        Your booking has been successfully confirmed!
                    </p>
                </div>

                {/* Information */}
                <div className="mb-6 rounded-2xl bg-[#FAFAFA] p-5">
                    <p className="flex items-start gap-3 text-sm leading-5 text-[#666]">
                        <span className="font-bold text-green-600">
                            ✓
                        </span>

                        <span>
                            <strong className="text-[#222]">
                                {booking?.hotelName ||
                                    "Your hotel"}
                            </strong>{" "}
                            is waiting for you on{" "}
                            <strong className="text-[#222]">
                                {booking?.checkIn ||
                                    "your check-in date"}
                            </strong>
                            .
                        </span>
                    </p>

                    <p className="mt-4 flex items-start gap-3 text-sm leading-5 text-[#666]">
                        <span className="font-bold text-green-600">
                            ✓
                        </span>

                        <span>
                            The payment for the booking is
                            made upon arrival at the hotel.
                        </span>
                    </p>

                    <p className="mt-4 flex items-start gap-3 text-sm leading-5 text-[#666]">
                        <span className="font-bold text-green-600">
                            ✓
                        </span>

                        <span>
                            You can contact the hotel manager
                            if you need to change or cancel
                            your booking.
                        </span>
                    </p>

                    <p className="mt-4 flex items-start gap-3 text-sm leading-5 text-[#666]">
                        <span className="font-bold text-green-600">
                            ✓
                        </span>

                        <span>
                            Your booking information is
                            available in your account.
                        </span>
                    </p>
                </div>

                {/* Booking details */}
                {booking && (
                    <div className="mb-6 border-t border-[#EEEEEE] pt-5">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-[#999]">
                            Booking details
                        </p>

                        <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="text-[#777]">
                                    Room
                                </span>

                                <span className="text-right font-bold text-[#222]">
                                    {booking.roomTitle}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-[#777]">
                                    Check-in
                                </span>

                                <span className="font-bold text-[#222]">
                                    {booking.checkIn}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-[#777]">
                                    Check-out
                                </span>

                                <span className="font-bold text-[#222]">
                                    {booking.checkOut}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-[#777]">
                                    Guests
                                </span>

                                <span className="font-bold text-[#222]">
                                    {booking.adults} adults,{" "}
                                    {booking.children} children
                                </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-[#EEEEEE] pt-3">
                                <span className="font-bold text-[#222]">
                                    Total price
                                </span>

                                <span className="text-xl font-extrabold text-[#581ADB]">
                                    ${booking.total}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* PDF */}
                <button
                    type="button"
                    onClick={printConfirmation}
                    className="mb-4 flex h-12 w-full items-center justify-center rounded-full bg-[#581ADB] text-sm font-bold text-white shadow-[0_4px_15px_rgba(88,26,219,0.25)] transition hover:bg-violet-800"
                >
                    Save PDF confirmation
                </button>

                {/* Navigation */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                        to="/account"
                        className="flex h-12 items-center justify-center rounded-full border border-[#581ADB] text-sm font-bold text-[#581ADB] transition hover:bg-violet-50"
                    >
                        Open account
                    </Link>

                    <Link
                        to="/"
                        className="flex h-12 items-center justify-center rounded-full border border-[#DDDDDD] text-sm font-bold text-[#333] transition hover:bg-[#FAFAFA]"
                    >
                        Back to hotels
                    </Link>
                </div>

                {/* Hotel */}
                {booking && (
                    <div className="mt-6 border-t border-[#EEEEEE] pt-5 text-center">
                        <div className="mb-1 text-xs tracking-widest text-[#E4B900]">
                            ★★★★
                        </div>

                        <h3 className="text-sm font-extrabold text-[#222]">
                            {booking.hotelName}
                        </h3>

                        <p className="mt-1 text-[11px] text-[#999]">
                            Booking #{booking.bookingId}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingSuccess;