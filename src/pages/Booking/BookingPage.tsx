import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch, getImageUrl, readError } from "../../api";
import { useAuth } from "../../context/useAuth";
import { useBooking } from "../../hooks/useBooking.ts";
import type { Room } from "../../context/HotelsContext.types";

const BookingPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    const { booking, updateBooking } = useBooking();

    const [room, setRoom] = useState<Room | null>(null);
    const [step, setStep] = useState(1);
    const [cardType, setCardType] = useState("Visa");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [rules, setRules] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!roomId) {
            return;
        }

        apiFetch("/Hotel")
            .then(response => {
                if (!response.ok) throw new Error("Could not load hotels");
                return response.json();
            })
            .then((hotels) => {
                for (const hotel of hotels) {
                    const found = hotel.rooms.find(
                        (item: Room) => item.id === roomId
                    );

                    if (found) {
                        setRoom(found);
                        break;
                    }
                }
            });
    }, [roomId]);

    if (!isAuth) {
        return (
            <div>
                <p>You must sign in before booking.</p>
                <button type="button" onClick={() => navigate("/login")}>
                    Sign in
                </button>
            </div>
        );
    }

    if (!room) {
        return <p>Room not found.</p>;
    }

    const nights =
        booking.checkIn && booking.checkOut
            ? Math.max(
                0,
                (new Date(booking.checkOut).getTime() -
                    new Date(booking.checkIn).getTime()) /
                86400000
            )
            : 0;

    const total = Number(room.pricePerNight) * nights;

    const submit = async (event: FormEvent<HTMLFormElement>) => {
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
                setError("Fill in all required fields.");
                return;
            }

            if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
                setError("Check-out must be after check-in.");
                return;
            }

            setStep(2);
            return;
        }

        if (step === 2) {
            if (!booking.phone) {
                setError("Phone is required.");
                return;
            }

            setStep(3);
            return;
        }

        if (!rules) {
            setError("You must accept the booking rules.");
            return;
        }

        if (cardNumber.replace(/ /g, "").length < 16) {
            setError("Enter a valid card number.");
            return;
        }

        try {
            const response = await apiFetch("/Booking", {
                method: "POST",
                body: JSON.stringify({
                    roomId: room.id,
                    checkInDate: booking.checkIn,
                    checkOutDate: booking.checkOut,
                    adultsCount: booking.adults,
                    childrenCount: booking.children,
                    travelDetails: booking.travelDetails,
                    isPaid: true,
                }),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(data?.message || await readError(response));
            }

            navigate("/booking-success");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Booking failed");
        }
    };

    return (
        <div className="booking-page">
            <h1>Booking</h1>
            <p>Step {step} of 3</p>

            <div className="booking-room">
                <img
                    className="room-card__image"
                    src={getImageUrl(room.imageUrl)}
                    alt={room.title}
                />
                <h2>{room.title}</h2>
                <p>{room.bedType}</p>
                <p>{room.pricePerNight} / night</p>
            </div>

            <form onSubmit={submit} className="booking-form">
                {step === 1 && (
                    <>
                        <h2>Personal data and trip dates</h2>

                        <input
                            value={booking.firstName}
                            onChange={event =>
                                updateBooking({ firstName: event.target.value })
                            }
                            placeholder="First name"
                            required
                        />

                        <input
                            value={booking.lastName}
                            onChange={event =>
                                updateBooking({ lastName: event.target.value })
                            }
                            placeholder="Last name"
                            required
                        />

                        <input
                            type="email"
                            value={booking.email}
                            onChange={event =>
                                updateBooking({ email: event.target.value })
                            }
                            placeholder="Email"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Confirm email"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Booking password"
                            required
                        />

                        <label>
                            Check-in
                            <input
                                type="date"
                                value={booking.checkIn}
                                onChange={event =>
                                    updateBooking({ checkIn: event.target.value })
                                }
                                required
                            />
                        </label>

                        <label>
                            Check-out
                            <input
                                type="date"
                                value={booking.checkOut}
                                onChange={event =>
                                    updateBooking({ checkOut: event.target.value })
                                }
                                required
                            />
                        </label>

                        <select
                            value={booking.adults}
                            onChange={event =>
                                updateBooking({ adults: Number(event.target.value) })
                            }
                        >
                            {[1, 2, 3, 4].map(x =>
                                <option key={x} value={x}>Adults: {x}</option>
                            )}
                        </select>

                        <select
                            value={booking.children}
                            onChange={event =>
                                updateBooking({ children: Number(event.target.value) })
                            }
                        >
                            {[0, 1, 2, 3].map(x =>
                                <option key={x} value={x}>Children: {x}</option>
                            )}
                        </select>

                        <textarea
                            value={booking.travelDetails}
                            onChange={event =>
                                updateBooking({ travelDetails: event.target.value })
                            }
                            placeholder="Optional services"
                        />
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>Trip information</h2>

                        <input
                            value={booking.phone}
                            onChange={event =>
                                updateBooking({ phone: event.target.value })
                            }
                            placeholder="Phone"
                            required
                        />

                        <input
                            value={booking.travelDetails}
                            onChange={event =>
                                updateBooking({ travelDetails: event.target.value })
                            }
                            placeholder="Country / trip details"
                        />

                        <label>
                            Confirmation method
                            <select
                                value={booking.confirmationMethod}
                                onChange={event =>
                                    updateBooking({
                                        confirmationMethod: event.target.value,
                                    })
                                }
                            >
                                <option value="email">Email</option>
                                <option value="call">Phone call</option>
                            </select>
                        </label>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>Payment</h2>

                        <select
                            value={cardType}
                            onChange={event => setCardType(event.target.value)}
                        >
                            <option>Visa</option>
                            <option>Mastercard</option>
                        </select>

                        <input
                            value={cardNumber}
                            onChange={event => setCardNumber(event.target.value)}
                            placeholder="Card number"
                            inputMode="numeric"
                            required
                        />

                        <input
                            value={expiry}
                            onChange={event => setExpiry(event.target.value)}
                            placeholder="MM/YY"
                            required
                        />

                        <label>
                            <input
                                type="checkbox"
                                checked={rules}
                                onChange={event => setRules(event.target.checked)}
                            />
                            I agree with booking rules
                        </label>

                        <h3>Total: {total}</h3>
                    </>
                )}

                {error && <p className="error">{error}</p>}

                <button className="button" type="submit">
                    {step === 3 ? "Complete booking" : "Continue"}
                </button>
            </form>
        </div>
    );
};

export default BookingPage;