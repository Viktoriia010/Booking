import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, readError } from "../api";
import { useAuth } from "../context/useAuth";

type AccountData = {
    name: string;
    avatarUrl: string | null;
    phone: string;
    country: string;
    city: string;
    travelPurpose: string;
    travelingWithPet: boolean;
};

type Card = { cardType: string; cardNumberHidden: string; expirationDate: string };
type Booking = { id: string; roomId: string; checkInDate: string; checkOutDate: string; adultsCount: number; childrenCount: number; totalPrice: number; status: string };

const inputClass =
    "h-[52px] w-full rounded-full border border-neutral-300 bg-white px-5 text-sm text-neutral-700 outline-none transition placeholder:text-neutral-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

const AccountPage = () => {
    const navigate = useNavigate();

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);


    const { isAuth, user, logout } = useAuth();
    const [data, setData] = useState<AccountData>({
        name: user?.name || "",
        phone: user?.phone || "",
        country: "",
        city: "",
        avatarUrl: null,
        travelPurpose: "",
        travelingWithPet: false,
    });
    // const [data, setData] = useState<AccountData>({ name: user?.name || "", phone: user?.phone || "", country: "", city: "", travelPurpose: "", travelingWithPet: false });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [cardType, setCardType] = useState("Visa");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(true);
    const avatarUrl = data.avatarUrl
        ? `${import.meta.env.VITE_PATH_TO_SERVER}${data.avatarUrl.replace(/^\//, "")}`
        : null;
    useEffect(() => {
        if (!isAuth) {
            navigate("/");
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
            } finally {
                setLoading(false);
            }
        };
        void load();
    }, [isAuth, navigate]);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("country", data.country);
        formData.append("city", data.city);
        formData.append("travelPurpose", data.travelPurpose);
        formData.append(
            "travelingWithPet",
            String(data.travelingWithPet)
        );

        if (avatarFile) {
            formData.append("image", avatarFile);
        }

        const response = await apiFetch("/Account", {
            method: "PUT",
            body: formData,
        });

        setMessage(
            response.ok
                ? "Saved successfully."
                : await readError(response)
        );
        // setMessage(response.ok ? "Saved." : await readError(response));

        setAvatarFile(null);
    };

    const addCard = async () => {
        setMessage("");
        const response = await apiFetch("/PaymentMethod", {
            method: "POST",
            body: JSON.stringify({ cardType, cardNumber, expirationDate }),
        });
        if (!response.ok) {
            setMessage(await readError(response));
            return;
        }
        setCardNumber("");
        setExpirationDate("");
        setMessage("Card added.");
        const cardsResponse = await apiFetch("/PaymentMethod");
        if (cardsResponse.ok) setCards(await cardsResponse.json());
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!isAuth) return null;

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center font-['Nunito_Sans']">
                <p className="text-neutral-500">Loading account...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 font-['Nunito_Sans']">
            {/* Header */}
            <div className="mb-10 flex items-center justify-between border-b border-[#EEEEEE] pb-6">

                <div className="flex items-center gap-4">
                    {avatarPreview || avatarUrl ? (
                        <img
                            src={avatarPreview || avatarUrl || ""}
                            alt={data.name || "Avatar"}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-[#581ADB]">
                            {data.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}

                    <div>
                        <label className="cursor-pointer rounded-full border border-[#581ADB] px-5 py-2 text-sm font-semibold text-[#581ADB] hover:bg-violet-50">
                            Choose avatar

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];

                                    if (!file) return;

                                    setAvatarFile(file);
                                    setAvatarPreview(URL.createObjectURL(file));
                                }}
                            />
                        </label>

                        {/*{avatarFile && (*/}
                        {/*    <p className="mt-2 text-xs text-neutral-500">*/}
                        {/*        {avatarFile.name}*/}
                        {/*    </p>*/}
                        {/*)}*/}
                    </div>
                </div>


                <div className="flex items-center gap-4">
                    {/*{avatarUrl ? (*/}
                    {/*    <img*/}
                    {/*        src={avatarUrl}*/}
                    {/*        alt={data.name || "Avatar"}*/}
                    {/*        className="h-14 w-14 rounded-full object-cover"*/}
                    {/*    />*/}
                    {/*) : (*/}
                    {/*    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-[#581ADB]">*/}
                    {/*        {data.name?.charAt(0).toUpperCase() || "U"}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div>
                        <h1 className="text-[28px] font-extrabold text-[#581ADB]">
                            My Account
                        </h1>

                        <p className="mt-1 text-sm text-neutral-500">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="cursor-pointer rounded-full border border-[#DDDDDD] bg-white px-5 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                    Sign out
                </button>
            </div>

            {message && (
                <p className="mb-6 rounded-[20px] bg-violet-50 px-5 py-3 text-sm text-[#581ADB]">
                    {message}
                </p>
            )}

            {/* Profile */}
            <section className="mb-12">
                <h2 className="mb-5 text-[18px] font-bold text-neutral-800">
                    Personal information
                </h2>
                <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder="Name"
                        className={inputClass}
                    />
                    <input
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        placeholder="Phone"
                        className={inputClass}
                    />
                    <input
                        value={data.country}
                        onChange={(e) => setData({ ...data, country: e.target.value })}
                        placeholder="Country"
                        className={inputClass}
                    />
                    <input
                        value={data.city}
                        onChange={(e) => setData({ ...data, city: e.target.value })}
                        placeholder="City"
                        className={inputClass}
                    />
                    <input
                        value={data.travelPurpose}
                        onChange={(e) => setData({ ...data, travelPurpose: e.target.value })}
                        placeholder="Travel purpose"
                        className={`${inputClass} sm:col-span-2`}
                    />
                    <label className="flex cursor-pointer items-center gap-3 px-5 sm:col-span-2">
                        <input
                            type="checkbox"
                            checked={data.travelingWithPet}
                            onChange={(e) => setData({ ...data, travelingWithPet: e.target.checked })}
                            className="h-4 w-4 accent-[#581ADB]"
                        />
                        <span className="text-sm text-neutral-700">Traveling with pet</span>
                    </label>
                    <button
                        type="submit"
                        className="h-[52px] cursor-pointer rounded-full bg-[#581ADB] text-sm font-bold text-white transition duration-300 hover:bg-violet-800 active:scale-[0.99] sm:col-span-2"
                    >
                        Save changes
                    </button>
                </form>
            </section>
        {/*<div className="account-page">*/}
        {/*    <h1>Account</h1>*/}
        {/*    <p>Email: {user?.email}</p>*/}
        {/*    <form onSubmit={submit} className="account-form">*/}
        {/*        <input value={data.name} onChange={event => setData({ ...data, name: event.target.value })} placeholder="Name" />*/}
        {/*        <input value={data.phone} onChange={event => setData({ ...data, phone: event.target.value })} placeholder="Phone" />*/}
        {/*        <input value={data.country} onChange={event => setData({ ...data, country: event.target.value })} placeholder="Country" />*/}
        {/*        <input value={data.city} onChange={event => setData({ ...data, city: event.target.value })} placeholder="City" />*/}
        {/*        <input value={data.travelPurpose} onChange={event => setData({ ...data, travelPurpose: event.target.value })} placeholder="Travel purpose" />*/}
        {/*        <label><input type="checkbox" checked={data.travelingWithPet} onChange={event => setData({ ...data, travelingWithPet: event.target.checked })} /> Traveling with pet</label>*/}
        {/*        <button className="button" type="submit">Save</button>*/}
        {/*    </form>*/}
        {/*    {message && <p>{message}</p>}*/}

            {/* Payment methods */}
            <section className="mb-12">
                <h2 className="mb-5 text-[18px] font-bold text-neutral-800">
                    Payment methods
                </h2>
            {/*<h2>Payment method</h2>*/}
            {/*<select value={cardType} onChange={event => setCardType(event.target.value)}><option>Visa</option><option>Mastercard</option></select>*/}
            {/*<input value={cardNumber} onChange={event => setCardNumber(event.target.value)} placeholder="Card number" />*/}
            {/*<input value={expirationDate} onChange={event => setExpirationDate(event.target.value)} placeholder="MM/YY" />*/}
            {/*<button type="button" className="button" onClick={addCard}>Add card</button>*/}
            {/*{cards.map((card, index) => <p key={index}>{card.cardType}: {card.cardNumberHidden} ({card.expirationDate})</p>)}*/}

                {cards.length > 0 && (
                    <div className="mb-5 space-y-3">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-[20px] border border-[#EEEEEE] bg-white px-5 py-4"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-neutral-800">
                                        {card.cardType}
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        {card.cardNumberHidden}
                                    </p>
                                </div>
                                <p className="text-sm text-neutral-500">
                                    {card.expirationDate}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <select
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                        className={inputClass}
                    >
                        <option>Visa</option>
                        <option>Mastercard</option>
                    </select>
                    <input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card number"
                        className={inputClass}
                    />
                    <input
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        placeholder="MM/YY"
                        className={inputClass}
                    />
                </div>

                <button
                    type="button"
                    onClick={addCard}
                    className="mt-4 h-[52px] w-full cursor-pointer rounded-full border border-[#581ADB] bg-white text-sm font-bold text-[#581ADB] transition hover:bg-violet-50 sm:w-auto sm:px-10"
                >
                    Add card
                </button>
            </section>

            {/* Bookings */}
            <section>
                <h2 className="mb-5 text-[18px] font-bold text-neutral-800">
                    Current and past bookings
                </h2>

                {bookings.length === 0 ? (
                    <p className="rounded-[20px] border border-[#EEEEEE] bg-white px-5 py-6 text-center text-sm text-neutral-500">
                        No bookings yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="rounded-[20px] border border-[#EEEEEE] bg-white px-5 py-4"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-neutral-800">
                                        {new Date(booking.checkInDate).toLocaleDateString()} —{" "}
                                        {new Date(booking.checkOutDate).toLocaleDateString()}
                                    </p>
                                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-[#581ADB]">
                                        {booking.status}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-neutral-500">
                                    Total: <strong className="text-neutral-800">${booking.totalPrice}</strong>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {/*<h2>Current and past bookings</h2>*/}
            {/*{bookings.length === 0 ? <p>No bookings.</p> : bookings.map(booking => (*/}
            {/*    <div key={booking.id} className="booking-item">*/}
            {/*        <p>{booking.checkInDate} — {booking.checkOutDate}</p>*/}
            {/*        <p>Total: {booking.totalPrice}</p>*/}
            {/*        <p>Status: {booking.status}</p>*/}
            {/*    </div>*/}
            {/*))}*/}
            {/*<button type="button" onClick={logout}>Sign out</button>*/}
        </div>
    );
};

export default AccountPage;