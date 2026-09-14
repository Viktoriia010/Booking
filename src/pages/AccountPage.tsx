import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, readError } from "../api";
import { useAuth } from "../context/useAuth";

type AccountData = {
    name: string;
    phone: string;
    country: string;
    city: string;
    travelPurpose: string;
    travelingWithPet: boolean;
};

type Card = { cardType: string; cardNumberHidden: string; expirationDate: string };
type Booking = { id: string; roomId: string; checkInDate: string; checkOutDate: string; adultsCount: number; childrenCount: number; totalPrice: number; status: string };

const AccountPage = () => {
    const navigate = useNavigate();
    const { isAuth, user, logout } = useAuth();
    const [data, setData] = useState<AccountData>({ name: user?.name || "", phone: user?.phone || "", country: "", city: "", travelPurpose: "", travelingWithPet: false });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [cardType, setCardType] = useState("Visa");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
            return;
        }
        const load = async () => {
            try {
                const [accountResponse, bookingsResponse, cardsResponse] = await Promise.all([
                    apiFetch("/Account"),
                    apiFetch("/Account/bookings"),
                    apiFetch("/PaymentMethod"),
                ]);
                if (!accountResponse.ok) throw new Error(await readError(accountResponse));
                if (!bookingsResponse.ok) throw new Error(await readError(bookingsResponse));
                if (!cardsResponse.ok) throw new Error(await readError(cardsResponse));
                setData(await accountResponse.json());
                setBookings(await bookingsResponse.json());
                setCards(await cardsResponse.json());
            } catch (error) {
                setMessage(error instanceof Error ? error.message : "Could not load account");
            }
        };
        void load();
    }, [isAuth, navigate]);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await apiFetch("/Account", { method: "PUT", body: JSON.stringify(data) });
        setMessage(response.ok ? "Saved." : await readError(response));
    };

    const addCard = async () => {
        const response = await apiFetch("/PaymentMethod", {
            method: "POST",
            body: JSON.stringify({ cardType, cardNumber, expirationDate }),
        });
        if (!response.ok) {
            setMessage(await readError(response));
            return;
        }
        setCardNumber("");
        setMessage("Card added.");
        const cardsResponse = await apiFetch("/PaymentMethod");
        if (cardsResponse.ok) setCards(await cardsResponse.json());
    };

    if (!isAuth) return null;

    return (
        <div className="account-page">
            <h1>Account</h1>
            <p>Email: {user?.email}</p>
            <form onSubmit={submit} className="account-form">
                <input value={data.name} onChange={event => setData({ ...data, name: event.target.value })} placeholder="Name" />
                <input value={data.phone} onChange={event => setData({ ...data, phone: event.target.value })} placeholder="Phone" />
                <input value={data.country} onChange={event => setData({ ...data, country: event.target.value })} placeholder="Country" />
                <input value={data.city} onChange={event => setData({ ...data, city: event.target.value })} placeholder="City" />
                <input value={data.travelPurpose} onChange={event => setData({ ...data, travelPurpose: event.target.value })} placeholder="Travel purpose" />
                <label><input type="checkbox" checked={data.travelingWithPet} onChange={event => setData({ ...data, travelingWithPet: event.target.checked })} /> Traveling with pet</label>
                <button className="button" type="submit">Save</button>
            </form>
            {message && <p>{message}</p>}

            <h2>Payment method</h2>
            <select value={cardType} onChange={event => setCardType(event.target.value)}><option>Visa</option><option>Mastercard</option></select>
            <input value={cardNumber} onChange={event => setCardNumber(event.target.value)} placeholder="Card number" />
            <input value={expirationDate} onChange={event => setExpirationDate(event.target.value)} placeholder="MM/YY" />
            <button type="button" className="button" onClick={addCard}>Add card</button>
            {cards.map((card, index) => <p key={index}>{card.cardType}: {card.cardNumberHidden} ({card.expirationDate})</p>)}

            <h2>Current and past bookings</h2>
            {bookings.length === 0 ? <p>No bookings.</p> : bookings.map(booking => (
                <div key={booking.id} className="booking-item">
                    <p>{booking.checkInDate} — {booking.checkOutDate}</p>
                    <p>Total: {booking.totalPrice}</p>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
            <button type="button" onClick={logout}>Sign out</button>
        </div>
    );
};

export default AccountPage;