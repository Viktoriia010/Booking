import {useEffect, useState,} from "react";
import {useNavigate, useParams,} from "react-router-dom";
import {apiFetch, getImageUrl,} from "../../api";
import {useAuth,} from "../../context/useAuth";
import {useBooking,} from "../../hooks/useBooking.ts";
import type {Room,} from "../../context/HotelsContext.types";
import BookingForm from "./BookingForm";

type Hotel = {
    id: string;
    name: string;
    city: string;
    country: string;
};

const BookingPage = () => {
    const {
        roomId,
    } = useParams();

    const navigate =
        useNavigate();

    const {
        isAuth,
    } = useAuth();

    const {
        booking,
        updateBooking,
    } = useBooking();

    const [room, setRoom] =
        useState<Room | null>(
            null
        );

    const [hotelName, setHotelName] =
        useState("");

    const [hotelCity, setHotelCity] =
        useState("");

    const [hotelCountry, setHotelCountry] =
        useState("");

    const [roomError, setRoomError] =
        useState("");

    useEffect(() => {
        if (!roomId) {
            return;
        }

        const loadRoom =
            async () => {
                try {
                    const roomResponse =
                        await apiFetch(
                            `/Room/${roomId}`
                        );

                    if (
                        !roomResponse.ok
                    ) {
                        throw new Error(
                            "Could not load room."
                        );
                    }

                    const loadedRoom =
                        (await roomResponse.json()) as Room;

                    setRoom(
                        loadedRoom
                    );

                    const hotelResponse =
                        await apiFetch(
                            `/Hotel/${loadedRoom.hotelId}`
                        );

                    if (
                        hotelResponse.ok
                    ) {
                        const hotel =
                            (await hotelResponse.json()) as Hotel;

                        setHotelName(
                            hotel.name
                        );

                        setHotelCity(
                            hotel.city
                        );

                        setHotelCountry(
                            hotel.country
                        );
                    }
                } catch {
                    setRoomError(
                        "Could not load room."
                    );
                }
            };

        void loadRoom();
    }, [roomId]);

    if (!isAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 font-['Nunito_Sans']">
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold text-[#222]">
                        Sign in to continue
                    </h1>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/")
                        }
                        className="mt-5 rounded-full bg-[#581ADB] px-8 py-3 text-sm font-bold text-white"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        );
    }

    if (roomError) {
        return (
            <div className="flex min-h-screen items-center justify-center font-['Nunito_Sans']">
                <p className="text-red-500">
                    {roomError}
                </p>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="flex min-h-screen items-center justify-center font-['Nunito_Sans']">
                <p className="text-sm text-[#777]">
                    Loading booking...
                </p>
            </div>
        );
    }

    const nights =
        booking.checkIn &&
        booking.checkOut
            ? Math.max(
                0,
                Math.ceil(
                    (
                        new Date(
                            booking.checkOut
                        ).getTime() -
                        new Date(
                            booking.checkIn
                        ).getTime()
                    ) /
                    86400000
                )
            )
            : 0;

    const total =
        Number(
            room.pricePerNight
        ) * nights;

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const checkOutMin =
        booking.checkIn ||
        today;

    const canAddGuest =
        booking.adults +
        booking.children <
        room.capacity;

    const increaseAdults =
        () => {
            if (!canAddGuest) {
                return;
            }

            updateBooking({
                adults:
                    booking.adults + 1,
            });
        };

    const decreaseAdults =
        () => {
            if (
                booking.adults <= 1
            ) {
                return;
            }

            updateBooking({
                adults:
                    booking.adults - 1,
            });
        };

    const increaseChildren =
        () => {
            if (!canAddGuest) {
                return;
            }

            updateBooking({
                children:
                    booking.children + 1,
            });
        };

    const decreaseChildren =
        () => {
            if (
                booking.children <= 0
            ) {
                return;
            }

            updateBooking({
                children:
                    booking.children - 1,
            });
        };

    return (
        <div className="min-h-screen bg-[#FAFAFA] px-4 py-8 font-['Nunito_Sans'] md:px-8">
            <div className="mx-auto max-w-[1180px]">
                <button
                    type="button"
                    onClick={() =>
                        navigate(-1)
                    }
                    className="mb-5 text-sm font-bold text-[#581ADB]"
                >
                    ← Back
                </button>

                <div className="grid gap-5 lg:grid-cols-[310px_1fr]">
                    <aside className="rounded-[15px] border border-[#E5E5E5] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                        <h2 className="text-lg font-extrabold text-[#222]">
                            Your stay
                        </h2>

                        <div className="mt-4 rounded-[12px] bg-[#F7F4FF] p-4">
                            <p className="text-[10px] uppercase tracking-wide text-[#999]">
                                Hotel location
                            </p>

                            <p className="mt-1 text-sm font-extrabold text-[#581ADB]">
                                {hotelCity},{" "}
                                {hotelCountry}
                            </p>

                            <p className="mt-1 text-xs text-[#777]">
                                {hotelName}
                            </p>
                        </div>

                        <div className="mt-5">
                            <p className="mb-2 text-sm font-bold text-[#222]">
                                Dates
                            </p>

                            <div className="space-y-3">
                                <div>
                                    <label className="mb-1 block text-[11px] text-[#777]">
                                        Check-in
                                    </label>

                                    <input
                                        type="date"
                                        min={today}
                                        value={
                                            booking.checkIn
                                        }
                                        onChange={event => {
                                            const value =
                                                event
                                                    .target
                                                    .value;

                                            updateBooking({
                                                checkIn:
                                                value,
                                            });

                                            if (
                                                booking.checkOut &&
                                                value >=
                                                booking.checkOut
                                            ) {
                                                updateBooking({
                                                    checkIn:
                                                    value,
                                                    checkOut:
                                                        "",
                                                });
                                            }
                                        }}
                                        className="h-11 w-full rounded-[10px] border border-[#DDDDDD] bg-white px-3 text-sm outline-none focus:border-[#581ADB]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-[11px] text-[#777]">
                                        Check-out
                                    </label>

                                    <input
                                        type="date"
                                        min={checkOutMin}
                                        value={
                                            booking.checkOut
                                        }
                                        onChange={event =>
                                            updateBooking({
                                                checkOut:
                                                event
                                                    .target
                                                    .value,
                                            })
                                        }
                                        className="h-11 w-full rounded-[10px] border border-[#DDDDDD] bg-white px-3 text-sm outline-none focus:border-[#581ADB]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="mb-3 text-sm font-bold text-[#222]">
                                Guests
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-[10px] border border-[#E5E5E5] p-3">
                                    <div>
                                        <p className="text-sm font-bold text-[#222]">
                                            Adults
                                        </p>

                                        <p className="text-[11px] text-[#999]">
                                            18+ years
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={
                                                decreaseAdults
                                            }
                                            className="h-8 w-8 rounded-full border border-[#581ADB] text-[#581ADB]"
                                        >
                                            −
                                        </button>

                                        <span className="w-5 text-center text-sm font-bold">
                                            {
                                                booking.adults
                                            }
                                        </span>

                                        <button
                                            type="button"
                                            onClick={
                                                increaseAdults
                                            }
                                            disabled={
                                                !canAddGuest
                                            }
                                            className="h-8 w-8 rounded-full border border-[#581ADB] text-[#581ADB] disabled:opacity-30"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-[10px] border border-[#E5E5E5] p-3">
                                    <div>
                                        <p className="text-sm font-bold text-[#222]">
                                            Children
                                        </p>

                                        <p className="text-[11px] text-[#999]">
                                            0–17 years
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={
                                                decreaseChildren
                                            }
                                            className="h-8 w-8 rounded-full border border-[#581ADB] text-[#581ADB]"
                                        >
                                            −
                                        </button>

                                        <span className="w-5 text-center text-sm font-bold">
                                            {
                                                booking.children
                                            }
                                        </span>

                                        <button
                                            type="button"
                                            onClick={
                                                increaseChildren
                                            }
                                            disabled={
                                                !canAddGuest
                                            }
                                            className="h-8 w-8 rounded-full border border-[#581ADB] text-[#581ADB] disabled:opacity-30"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 rounded-[10px] border border-[#E5E5E5] p-3">
                            <p className="text-[10px] text-[#999]">
                                Room capacity
                            </p>

                            <p className="mt-1 text-sm font-extrabold text-[#581ADB]">
                                {room.capacity} guest(s)
                            </p>

                            <p className="mt-1 text-xs text-[#777]">
                                Selected:{" "}
                                {booking.adults +
                                    booking.children}{" "}
                                guest(s)
                            </p>
                        </div>
                    </aside>

                    <main>
                        <div className="rounded-[15px] border border-[#E5E5E5] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <img
                                    src={getImageUrl(
                                        room.imageUrl
                                    )}
                                    alt={
                                        room.title
                                    }
                                    className="h-52 w-full rounded-[12px] object-cover md:w-[320px]"
                                />

                                <div className="flex-1">
                                    <h1 className="text-xl font-extrabold text-[#222]">
                                        {
                                            room.title
                                        }
                                    </h1>

                                    <p className="mt-1 text-sm text-[#777]">
                                        {hotelName}
                                    </p>

                                    <p className="mt-1 text-sm text-[#777]">
                                        {hotelCity},{" "}
                                        {hotelCountry}
                                    </p>

                                    <p className="mt-2 text-sm text-[#777]">
                                        Bed:{" "}
                                        {
                                            room.bedType
                                        }
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <div className="rounded-[10px] border border-[#E5E5E5] px-4 py-2">
                                            <p className="text-[10px] text-[#999]">
                                                Check-in
                                            </p>

                                            <p className="text-sm font-bold text-[#581ADB]">
                                                {booking.checkIn ||
                                                    "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-[10px] border border-[#E5E5E5] px-4 py-2">
                                            <p className="text-[10px] text-[#999]">
                                                Check-out
                                            </p>

                                            <p className="text-sm font-bold text-[#581ADB]">
                                                {booking.checkOut ||
                                                    "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-[10px] border border-[#E5E5E5] px-4 py-2">
                                            <p className="text-[10px] text-[#999]">
                                                Guests
                                            </p>

                                            <p className="text-sm font-bold text-[#581ADB]">
                                                {
                                                    booking.adults
                                                }{" "}
                                                adult(s),{" "}
                                                {
                                                    booking.children
                                                }{" "}
                                                child(ren)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center text-right">
                                    <p className="text-xs text-[#999]">
                                        Price
                                    </p>

                                    <p className="text-2xl font-extrabold text-[#581ADB]">
                                        $
                                        {
                                            room.pricePerNight
                                        }
                                    </p>

                                    <p className="text-xs text-[#999]">
                                        per night
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 rounded-[15px] border border-[#E5E5E5] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-7">
                            <BookingForm
                                room={room}
                                total={total}
                                navigate={navigate}
                                hotelName={
                                    hotelName
                                }
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;