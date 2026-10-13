import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, readError } from "../api";
import { useAuth } from "../context/useAuth";

type Card = {
    id: string;
    cardType: string;
    cardNumberHidden: string;
    last4: string;
    expirationDate: string;
};

const PaymentMethodPage = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    const [cards, setCards] = useState<Card[]>([]);
    const [cardType, setCardType] = useState("Visa");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const loadCards = async () => {
        try {
            const response = await apiFetch("/PaymentMethod");
            if (!response.ok) {
                throw new Error(await readError(response));
            }
            const result = await response.json();
            setCards(Array.isArray(result) ? result : []);
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Could not load payment methods"
            );
        }
    };

    useEffect(() => {
        const timer = window.setTimeout(() => {
            if (!isAuth) {
                navigate("/");
                return;
            }
            void loadCards();
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [isAuth, navigate]);

    const addCard = async () => {
        if (!cardNumber.trim()) {
            setMessage("Enter your card number.");
            return;
        }
        if (!expirationDate.trim()) {
            setMessage("Enter expiration date.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await apiFetch("/PaymentMethod", {
                method: "POST",
                body: JSON.stringify({
                    cardType,
                    cardNumber,
                    expirationDate,
                }),
            });

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            setCardNumber("");
            setExpirationDate("");
            await loadCards();
            setMessage("Card added.");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Could not add card");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuth) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-[900px]">
                <button
                    type="button"
                    onClick={() => navigate("/account")}
                    className="mb-6 text-sm text-gray-500 hover:text-[#581ADB]"
                >
                    ← Account
                </button>

                <h1 className="text-3xl font-bold text-gray-900">Payment method</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage your saved payment cards
                </p>

                <div className="mt-8 rounded-3xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900">Add card</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <select
                            value={cardType}
                            onChange={(event) => setCardType(event.target.value)}
                            className="h-12 rounded-full border border-gray-300 bg-white px-5 text-sm outline-none focus:border-[#581ADB]"
                        >
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                        </select>

                        <input
                            value={cardNumber}
                            onChange={(event) => setCardNumber(event.target.value)}
                            placeholder="Card number"
                            className="h-12 rounded-full border border-gray-300 px-5 text-sm outline-none focus:border-[#581ADB]"
                        />

                        <input
                            value={expirationDate}
                            onChange={(event) => setExpirationDate(event.target.value)}
                            placeholder="MM/YY"
                            className="h-12 rounded-full border border-gray-300 px-5 text-sm outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={addCard}
                        disabled={loading}
                        className="mt-5 h-12 rounded-full bg-[#581ADB] px-7 text-sm font-semibold text-white hover:bg-[#4c1dcb] disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add card"}
                    </button>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900">Saved cards</h2>
                    {cards.length === 0 ? (
                        <div className="mt-4 rounded-3xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                            No saved cards.
                        </div>
                    ) : (
                        <div className="mt-4 grid gap-4">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="flex items-center justify-between rounded-3xl border border-gray-200 p-5 shadow-sm"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900">{card.cardType}</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {card.cardNumberHidden}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">Expires</p>
                                        <p className="text-sm font-medium text-gray-700">
                                            {card.expirationDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {message && (
                    <p className="mt-6 rounded-2xl bg-gray-50 px-5 py-3 text-sm text-gray-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentMethodPage;
