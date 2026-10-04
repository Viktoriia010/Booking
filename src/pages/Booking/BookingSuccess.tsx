import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../api";

type LastBooking = {
    bookingId: string;
    hotelId: string;
    hotelName: string;
    city: string;
    country: string;
    roomId: string;
    roomTitle: string;
    bedType: string;
    pricePerNight: number;
    roomImageUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    phone: string;
    total: number;
};

const BookingSuccess = () => {
    const [booking, setBooking] = useState<LastBooking | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("last_booking");

        if (!saved) {
            return;
        }

        try {
            setBooking(JSON.parse(saved) as LastBooking);
        } catch {
            setBooking(null);
        }
    }, []);

    if (!booking) {
        return (
            <div className="flex min-h-[600px] items-center justify-center bg-white px-4 font-['Nunito_Sans']">
                <div className="text-center">
                    <h1 className="mb-3 text-2xl font-extrabold text-[#581ADB]">
                        Booking completed
                    </h1>

                    <p className="mb-6 text-sm text-[#717171]">
                        Your booking was successfully created.
                    </p>

                    <Link
                        to="/account"
                        className="inline-block rounded-full bg-[#581ADB] px-8 py-3 text-sm font-bold text-white"
                    >
                        Open account
                    </Link>
                </div>
            </div>
        );
    }

    const printConfirmation = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] px-4 py-10 font-['Nunito_Sans']">
            <div className="mx-auto max-w-[850px]">

                <div className="mb-6 text-center print:hidden">
                    <p className="mb-2 text-sm font-bold text-[#581ADB]">
                        ✓ Booking completed
                    </p>

                    <h1 className="text-3xl font-extrabold text-[#202020]">
                        Your booking is confirmed
                    </h1>

                    <p className="mt-2 text-sm text-[#717171]">
                        A confirmation has been created for your booking.
                    </p>
                </div>

                <div
                    className="rounded-[16px] border border-[#E5E5E5] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8"
                >
                    <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-5">
                        <div>
                            <p className="text-[11px] uppercase text-[#717171]">
                                Booking confirmation
                            </p>

                            <h2 className="mt-1 text-xl font-extrabold text-[#581ADB]">
                                {booking.hotelName}
                            </h2>
                        </div>

                        <div className="text-right text-sm text-[#717171]">
                            {booking.bookingId && (
                                <p>
                                    Booking #{booking.bookingId}
                                </p>
                            )}

                            <p>
                                {booking.city}, {booking.country}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border-b border-[#EEEEEE] py-6 sm:flex-row">
                        <img
                            src={getImageUrl(booking.roomImageUrl)}
                            alt={booking.roomTitle}
                            className="h-[180px] w-full rounded-[10px] object-cover sm:w-[260px]"
                        />

                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#202020]">
                                {booking.roomTitle}
                            </h3>

                            <p className="mt-2 text-sm text-[#717171]">
                                Bed: {booking.bedType}
                            </p>

                            <p className="mt-1 text-sm text-[#717171]">
                                ${booking.pricePerNight} / night
                            </p>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[11px] uppercase text-[#999999]">
                                        Check-in
                                    </p>

                                    <p className="mt-1 font-bold text-[#202020]">
                                        {booking.checkIn}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase text-[#999999]">
                                        Check-out
                                    </p>

                                    <p className="mt-1 font-bold text-[#202020]">
                                        {booking.checkOut}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-[#EEEEEE] py-5">
                        <h3 className="mb-4 font-bold text-[#202020]">
                            Guest
                        </h3>

                        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                            <p>
                                <span className="text-[#717171]">
                                    Name:
                                </span>{" "}
                                {booking.firstName} {booking.lastName}
                            </p>

                            <p>
                                <span className="text-[#717171]">
                                    Email:
                                </span>{" "}
                                {booking.email}
                            </p>

                            <p>
                                <span className="text-[#717171]">
                                    Phone:
                                </span>{" "}
                                {booking.phone}
                            </p>

                            <p>
                                <span className="text-[#717171]">
                                    Guests:
                                </span>{" "}
                                {booking.adults} adults, {booking.children} children
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-5">
                        <span className="font-bold text-[#202020]">
                            Total price
                        </span>

                        <span className="text-2xl font-extrabold text-[#581ADB]">
                            ${booking.total}
                        </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-3 print:hidden sm:grid-cols-3">
                        <button
                            type="button"
                            onClick={printConfirmation}
                            className="h-[48px] rounded-full bg-[#581ADB] text-sm font-bold text-white transition hover:bg-violet-800"
                        >
                            Save PDF confirmation
                        </button>

                        <Link
                            to="/account"
                            className="flex h-[48px] items-center justify-center rounded-full border border-[#581ADB] text-sm font-bold text-[#581ADB] transition hover:bg-violet-50"
                        >
                            Open account
                        </Link>

                        <Link
                            to="/"
                            className="flex h-[48px] items-center justify-center rounded-full border border-[#DDDDDD] text-sm font-bold text-[#303030] transition hover:bg-gray-50"
                        >
                            Back to hotels
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;

// import { Link } from "react-router-dom";
//
// const BookingSuccess = () => {
//     return (
//         <div className="success-page">
//             <h1>Booking completed</h1>
//             <p>Your booking was successfully created.</p>
//             <Link className="button" to="/account">
//                 Open account
//             </Link>
//             <Link className="button" to="/">
//                 Back to hotels
//             </Link>
//         </div>
//     );
// };
//
// export default BookingSuccess;