import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    getImageUrl,
} from "../../api";

type BookingInfo = {
    bookingId?: string;
    hotelId?: string;
    hotelName?: string;
    hotelCity?: string;
    hotelCountry?: string;
    roomTitle?: string;
    bedType?: string;
    capacity?: number;
    roomImageUrl?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    phone?: string;
    email?: string;
    country?: string;
    confirmationMethod?: string;
    total?: number;
};

const getSavedBooking = (): BookingInfo | null => {
    try {
        const saved =
            localStorage.getItem(
                "last_booking"
            );

        if (!saved) {
            return null;
        }

        return JSON.parse(saved) as BookingInfo;
    } catch {
        return null;
    }
};

const BookingInfoPage = () => {
    const navigate =
        useNavigate();

    const location =
        useLocation();

    const stateBooking =
        location.state as BookingInfo | null;

    const booking =
        stateBooking ||
        getSavedBooking();

    if (!booking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 font-['Nunito_Sans']">
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold text-[#222]">
                        Booking information
                    </h1>

                    <p className="mt-2 text-sm text-[#777]">
                        Booking information is not available.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/account"
                            )
                        }
                        className="mt-5 rounded-full bg-[#581ADB] px-7 py-3 text-sm font-bold text-white"
                    >
                        Back to account
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] px-4 py-8 font-['Nunito_Sans'] md:px-8">
            <div className="mx-auto max-w-[950px]">
                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/account"
                        )
                    }
                    className="mb-5 text-sm font-bold text-[#581ADB]"
                >
                    ← Account
                </button>

                <div className="overflow-hidden rounded-[18px] border border-[#E5E5E5] bg-white shadow-sm">
                    {booking.roomImageUrl && (
                        <img
                            src={getImageUrl(
                                booking.roomImageUrl
                            )}
                            alt={
                                booking.roomTitle ||
                                "Room"
                            }
                            className="h-64 w-full object-cover"
                        />
                    )}

                    <div className="p-6">
                        <h1 className="text-2xl font-extrabold text-[#581ADB]">
                            Booking information
                        </h1>

                        <p className="mt-1 text-sm text-[#777]">
                            {booking.hotelName}
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-[12px] bg-[#F7F4FF] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Hotel
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#222]">
                                    {booking.hotelName}
                                </p>
                            </div>

                            <div className="rounded-[12px] bg-[#F7F4FF] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Location
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#222]">
                                    {booking.hotelCity}{" "}
                                    {booking.hotelCountry}
                                </p>
                            </div>

                            <div className="rounded-[12px] bg-[#F7F4FF] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Room
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#222]">
                                    {booking.roomTitle}
                                </p>
                            </div>

                            <div className="rounded-[12px] border border-[#E5E5E5] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Check-in
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#581ADB]">
                                    {booking.checkIn || "—"}
                                </p>
                            </div>

                            <div className="rounded-[12px] border border-[#E5E5E5] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Check-out
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#581ADB]">
                                    {booking.checkOut || "—"}
                                </p>
                            </div>

                            <div className="rounded-[12px] border border-[#E5E5E5] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Guests
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#581ADB]">
                                    {booking.adults || 0} adult(s),{" "}
                                    {booking.children || 0} child(ren)
                                </p>
                            </div>

                            <div className="rounded-[12px] border border-[#E5E5E5] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Capacity
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#222]">
                                    {booking.capacity || "—"} guest(s)
                                </p>
                            </div>

                            <div className="rounded-[12px] border border-[#E5E5E5] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Bed
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#222]">
                                    {booking.bedType || "—"}
                                </p>
                            </div>

                            <div className="rounded-[12px] border border-[#E5E5E5] p-4">
                                <p className="text-[10px] text-[#999]">
                                    Total
                                </p>

                                <p className="mt-1 text-sm font-bold text-[#581ADB]">
                                    $
                                    {Number(
                                        booking.total || 0
                                    ).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-[#EEEEEE] pt-5">
                            <h2 className="text-lg font-extrabold text-[#222]">
                                Guest information
                            </h2>

                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs text-[#999]">
                                        Email
                                    </p>

                                    <p className="text-sm text-[#333]">
                                        {booking.email || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#999]">
                                        Phone
                                    </p>

                                    <p className="text-sm text-[#333]">
                                        {booking.phone || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#999]">
                                        Country
                                    </p>

                                    <p className="text-sm text-[#333]">
                                        {booking.country || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#999]">
                                        Confirmation
                                    </p>

                                    <p className="text-sm text-[#333]">
                                        {
                                            booking.confirmationMethod ===
                                            "call"
                                                ? "Phone call"
                                                : booking.confirmationMethod ===
                                                "email"
                                                    ? "Email"
                                                    : "—"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/hotel/${booking.hotelId || ""}`
                                )
                            }
                            className="mt-6 rounded-full border border-[#581ADB] px-7 py-3 text-sm font-bold text-[#581ADB]"
                        >
                            Hotel page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingInfoPage;