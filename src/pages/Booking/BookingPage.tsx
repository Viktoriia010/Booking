import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../api";
import { useAuth } from "../../context/useAuth";
import { useBooking } from "../../hooks/useBooking.ts";
import type { Room } from "../../context/HotelsContext.types";
import BookingRoom from "./BookingRoom";
import BookingForm from "./BookingForm";

type Hotel = {
    rooms: Room[];
};

const BookingPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    const { booking } = useBooking();

    const [room, setRoom] = useState<Room | null>(null);
    const [roomError, setRoomError] = useState("");

    useEffect(() => {
        if (!roomId) {
            return;
        }

        const loadRoom = async () => {
            try {
                const response = await apiFetch("/Hotel");

                if (!response.ok) {
                    throw new Error("Could not load hotels");
                }

                const hotels = await response.json() as Hotel[];

                for (const hotel of hotels) {
                    const found = hotel.rooms.find(
                        item => item.id === roomId
                    );

                    if (found) {
                        setRoom(found);
                        return;
                    }
                }

                setRoomError("Room not found.");
            } catch {
                setRoomError("Could not load room.");
            }
        };

        void loadRoom();
    }, [roomId]);

    if (!isAuth) {
        return (
            <div>
                <p>You must sign in before booking.</p>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                >
                    Sign in
                </button>
            </div>
        );
    }

    if (roomError) {
        return <p>{roomError}</p>;
    }

    if (!room) {
        return <p>Loading...</p>;
    }

    const nights =
        booking.checkIn && booking.checkOut
            ? Math.max(
                0,
                (
                    new Date(booking.checkOut).getTime() -
                    new Date(booking.checkIn).getTime()
                ) / 86400000
            )
            : 0;

    const total = Number(room.pricePerNight) * nights;

    return (
        <div className="booking-page">
            <h1>Booking</h1>

            <BookingRoom
                room={room}
            />

            <BookingForm
                room={room}
                total={total}
                navigate={navigate}
            />
        </div>
    );
};

export default BookingPage;