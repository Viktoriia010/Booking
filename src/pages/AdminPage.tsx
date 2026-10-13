import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { apiFetch, readError } from "@/api";
import { useAuth } from "@/context/useAuth";
import { canManageReviews, isAdministrator } from "@/utils/authRole";

type Review = {
    id: string;
    rating: number;
    text: string;
    authorName?: string;
    createdAt?: string;
};

type Hotel = {
    id: string;
    name: string;
    city: string;
    country: string;
    stars: number;
    reviews?: Review[];
};

type RoomForm = {
    title: string;
    bedType: string;
    capacity: string;
    pricePerNight: string;
    isAvailable: boolean;
    imageUrl: string;
};

type HotelForm = {
    name: string;
    address: string;
    stars: string;
    type: string;
    hotelType: string;
    hotelChain: string;
    attractions: string;
    latitude: string;
    longitude: string;
    isPopular: boolean;
    isCityCentre: boolean;
    isPopularPlace: boolean;
    nearMetro: boolean;
    nearAirport: boolean;
    nearStation: boolean;
    city: string;
    country: string;
    description: string;
    hasWifi: string;
    amenities: string;
};

const inputClass =
    "h-11 w-full rounded-xl border border-[#e8e5ed] bg-white px-4 text-sm outline-none focus:border-[#581ADB]";

const initialRoom: RoomForm = {
    title: "Standard room",
    bedType: "1 double bed",
    capacity: "2",
    pricePerNight: "100",
    isAvailable: true,
    imageUrl: "",
};

const initialForm: HotelForm = {
    name: "",
    address: "",
    stars: "4",
    type: "0",
    hotelType: "Hotel",
    hotelChain: "Independent",
    attractions: "",
    latitude: "0",
    longitude: "0",
    isPopular: false,
    isCityCentre: false,
    isPopularPlace: false,
    nearMetro: false,
    nearAirport: false,
    nearStation: false,
    city: "",
    country: "",
    description: "",
    hasWifi: "null",
    amenities: "",
};

export default function AdminPage() {
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const isAdmin = isAdministrator();
    const canModerate = canManageReviews();

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [message, setMessage] = useState("");
    const [busy, setBusy] = useState(false);

    const [hotelImage, setHotelImage] = useState<File | null>(null);
    const [form, setForm] = useState<HotelForm>(initialForm);
    const [room, setRoom] = useState<RoomForm>(initialRoom);

    const [moderatorEmail, setModeratorEmail] = useState("");
    const [moderatorPassword, setModeratorPassword] = useState("");

    const loadHotels = useCallback(async () => {
        try {
            const response = await apiFetch("/Hotel/random?number=50");

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            const result = await response.json();

            setHotels(Array.isArray(result) ? result : []);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Could not load hotels."
            );
        }
    }, []);

    useEffect(() => {
        if (!isAuth || !canModerate) {
            return;
        }

        const timer = window.setTimeout(() => {
            void loadHotels();
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [isAuth, canModerate, loadHotels]);

    const reviews = useMemo(
        () =>
            hotels.flatMap((hotel) =>
                (hotel.reviews ?? []).map((review) => ({
                    ...review,
                    hotelName: hotel.name,
                }))
            ),
        [hotels]
    );

    const createHotel = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isAdmin) {
            return;
        }

        setBusy(true);
        setMessage("");

        try {
            const amenities = form.amenities
                .split(",")
                .map((amenity) => amenity.trim())
                .filter((amenity) => amenity.length > 0);

            const response = await apiFetch("/Hotel", {
                method: "POST",
                body: JSON.stringify({
                    name: form.name.trim(),
                    address: form.address.trim(),
                    stars: Number(form.stars),
                    type: Number(form.type),
                    hotelType: form.hotelType.trim(),
                    hotelChain: form.hotelChain.trim(),
                    attractions: form.attractions.trim(),
                    latitude: Number(form.latitude),
                    longitude: Number(form.longitude),
                    isPopular: form.isPopular,
                    isCityCentre: form.isCityCentre,
                    isPopularPlace: form.isPopularPlace,
                    nearMetro: form.nearMetro,
                    nearAirport: form.nearAirport,
                    nearStation: form.nearStation,
                    city: form.city.trim(),
                    country: form.country.trim(),
                    description: form.description.trim(),
                    hasWifi:
                        form.hasWifi === "null"
                            ? null
                            : form.hasWifi === "true",
                    amenities,
                    rooms: [
                        {
                            title: room.title.trim(),
                            bedType: room.bedType.trim(),
                            capacity: Number(room.capacity),
                            pricePerNight: Number(room.pricePerNight),
                            isAvailable: room.isAvailable,
                            imageUrl: room.imageUrl.trim(),
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            const created = await response.json();

            if (hotelImage && created?.id) {
                const imageData = new FormData();

                imageData.append("file", hotelImage);

                const imageResponse = await apiFetch(
                    `/Hotel/${created.id}/image`,
{
    method: "POST",
        body: imageData,
}
);

if (!imageResponse.ok) {
    throw new Error(
        `Hotel created, but image upload failed: ${await readError(imageResponse)}`
    );
}
}

setForm(initialForm);
setRoom(initialRoom);
setHotelImage(null);
setMessage("Hotel created successfully.");

await loadHotels();
} catch (error) {
    setMessage(
        error instanceof Error
            ? error.message
            : "Could not create hotel."
    );
} finally {
    setBusy(false);
}
};

const deleteHotel = async (id: string) => {
    if (!isAdmin || !window.confirm("Delete this hotel?")) {
        return;
    }

    setBusy(true);
    setMessage("");

    try {
        const response = await apiFetch(`/Hotel/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(await readError(response));
        }

        setMessage("Hotel deleted successfully.");

        await loadHotels();
    } catch (error) {
        setMessage(
            error instanceof Error
                ? error.message
                : "Could not delete hotel."
        );
    } finally {
        setBusy(false);
    }
};

const deleteReview = async (id: string) => {
    if (!canModerate) {
        return;
    }

    setBusy(true);
    setMessage("");

    try {
        const response = await apiFetch(`/Admin/reviews/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(await readError(response));
        }

        setMessage("Review removed.");

        await loadHotels();
    } catch (error) {
        setMessage(
            error instanceof Error
                ? error.message
                : "Could not remove review."
        );
    } finally {
        setBusy(false);
    }
};

const createModerator = async (
    event: FormEvent<HTMLFormElement>
) => {
    event.preventDefault();

    if (!isAdmin) {
        return;
    }

    setBusy(true);
    setMessage("");

    try {
        const response = await apiFetch("/Admin/moderators", {
            method: "POST",
            body: JSON.stringify({
                email: moderatorEmail,
                password: moderatorPassword,
            }),
        });

        if (!response.ok) {
            throw new Error(await readError(response));
        }

        setModeratorEmail("");
        setModeratorPassword("");
        setMessage("Moderator created successfully.");
    } catch (error) {
        setMessage(
            error instanceof Error
                ? error.message
                : "Could not create moderator."
        );
    } finally {
        setBusy(false);
    }
};

if (!isAuth || (!isAdmin && !canModerate)) {
    return <Navigate to="/" replace />;
}

return (
    <main className="min-h-screen bg-[#faf9fc] px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
            <button
                type="button"
                onClick={() => navigate("/account")}
                className="mb-6 text-sm text-[#777] hover:text-[#581ADB]"
            >
                ← Account
            </button>

            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[.18em] text-[#8c72c5]">
                        Hotel for you
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-[#581ADB]">
                        {isAdmin ? "Administration" : "Moderation"}
                    </h1>

                    <p className="mt-2 text-sm text-[#777]">
                        Manage hotel listings and guest reviews.
                    </p>
                </div>

                <span className="rounded-full bg-[#f0eaff] px-4 py-2 text-sm font-bold text-[#581ADB]">
                        {isAdmin ? "Administrator" : "Moderator"}
                    </span>
            </div>

            {message && (
                <p
                    role="status"
                    className="mb-5 rounded-xl border border-[#e6ddfa] bg-white px-4 py-3 text-sm text-[#581ADB]"
                >
                    {message}
                </p>
            )}

            {isAdmin && (
                <>
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
                        <form
                            onSubmit={createHotel}
                            className="rounded-2xl border border-[#ece9f0] bg-white p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-[#222]">
                                Add a hotel
                            </h2>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <input
                                    required
                                    className={inputClass}
                                    placeholder="Hotel name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    required
                                    className={inputClass}
                                    placeholder="Street address"
                                    value={form.address}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            address: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    required
                                    className={inputClass}
                                    placeholder="City"
                                    value={form.city}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            city: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    required
                                    className={inputClass}
                                    placeholder="Country"
                                    value={form.country}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            country: e.target.value,
                                        })
                                    }
                                />

                                <label className="text-sm text-[#777]">
                                    Hotel stars
                                    <select
                                        className={`${inputClass} mt-1`}
                                        value={form.stars}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                stars: e.target.value,
                                            })
                                        }
                                    >
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <option
                                                key={value}
                                                value={value}
                                            >
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="text-sm text-[#777]">
                                    Hotel type enum value
                                    <input
                                        required
                                        type="number"
                                        className={`${inputClass} mt-1`}
                                        value={form.type}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                type: e.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <input
                                    required
                                    className={inputClass}
                                    placeholder="HotelType"
                                    value={form.hotelType}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            hotelType: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    className={inputClass}
                                    placeholder="Hotel chain"
                                    value={form.hotelChain}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            hotelChain: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    className={inputClass}
                                    placeholder="Attractions"
                                    value={form.attractions}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            attractions: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="number"
                                    step="any"
                                    className={inputClass}
                                    placeholder="Latitude"
                                    value={form.latitude}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            latitude: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="number"
                                    step="any"
                                    className={inputClass}
                                    placeholder="Longitude"
                                    value={form.longitude}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            longitude: e.target.value,
                                        })
                                    }
                                />

                                <label className="text-sm text-[#777]">
                                    Wi-Fi
                                    <select
                                        className={`${inputClass} mt-1`}
                                        value={form.hasWifi}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                hasWifi: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="null">
                                            Not specified
                                        </option>
                                        <option value="true">
                                            Available
                                        </option>
                                        <option value="false">
                                            Not available
                                        </option>
                                    </select>
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Amenities, separated by commas"
                                    value={form.amenities}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            amenities: e.target.value,
                                        })
                                    }
                                />

                                <textarea
                                    className={`${inputClass} h-24 py-3 sm:col-span-2`}
                                    placeholder="Description"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                />

                                <label className="sm:col-span-2">
                                        <span className="mb-2 block text-xs font-semibold text-[#777]">
                                            Main hotel photo
                                        </span>

                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) =>
                                            setHotelImage(
                                                e.target.files?.[0] ?? null
                                            )
                                        }
                                        className="block w-full text-sm text-[#777] file:mr-4 file:rounded-full file:border-0 file:bg-[#f0eaff] file:px-4 file:py-2 file:text-xs file:font-bold file:text-[#581ADB]"
                                    />
                                </label>

                                <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
                                    {[
                                        ["isPopular", "Popular hotel"],
                                        ["isCityCentre", "In city centre"],
                                        ["isPopularPlace", "Popular place"],
                                        ["nearMetro", "Near metro"],
                                        ["nearAirport", "Near airport"],
                                        ["nearStation", "Near station"],
                                    ].map(([key, label]) => (
                                        <label
                                            key={key}
                                            className="flex items-center gap-2 text-sm text-[#555]"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={
                                                    form[
                                                        key as keyof HotelForm
                                                        ] as boolean
                                                }
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        [key]: e.target.checked,
                                                    })
                                                }
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="mb-3 text-sm font-bold text-[#581ADB]">
                                        First room
                                    </p>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <input
                                            required
                                            className={inputClass}
                                            placeholder="Room title"
                                            value={room.title}
                                            onChange={(e) =>
                                                setRoom({
                                                    ...room,
                                                    title: e.target.value,
                                                })
                                            }
                                        />

                                        <input
                                            required
                                            className={inputClass}
                                            placeholder="Bed type"
                                            value={room.bedType}
                                            onChange={(e) =>
                                                setRoom({
                                                    ...room,
                                                    bedType: e.target.value,
                                                })
                                            }
                                        />

                                        <input
                                            required
                                            min="1"
                                            type="number"
                                            className={inputClass}
                                            placeholder="Guest capacity"
                                            value={room.capacity}
                                            onChange={(e) =>
                                                setRoom({
                                                    ...room,
                                                    capacity: e.target.value,
                                                })
                                            }
                                        />

                                        <input
                                            required
                                            min="0"
                                            type="number"
                                            step="0.01"
                                            className={inputClass}
                                            placeholder="Price per night"
                                            value={room.pricePerNight}
                                            onChange={(e) =>
                                                setRoom({
                                                    ...room,
                                                    pricePerNight: e.target.value,
                                                })
                                            }
                                        />

                                        <label className="flex items-center gap-2 text-sm text-[#555] sm:col-span-2">
                                            <input
                                                type="checkbox"
                                                checked={room.isAvailable}
                                                onChange={(e) =>
                                                    setRoom({
                                                        ...room,
                                                        isAvailable: e.target.checked,
                                                    })
                                                }
                                            />
                                            Room is available
                                        </label>

                                        <input
                                            type="url"
                                            className={`${inputClass} sm:col-span-2`}
                                            placeholder="Room image URL (https://...)"
                                            value={room.imageUrl}
                                            onChange={(e) =>
                                                setRoom({
                                                    ...room,
                                                    imageUrl: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={busy}
                                className="mt-5 rounded-full bg-[#581ADB] px-7 py-3 text-sm font-bold text-white disabled:opacity-50"
                            >
                                Create hotel
                            </button>
                        </form>

                        <section className="rounded-2xl border border-[#ece9f0] bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-[#222]">
                                Moderator access
                            </h2>

                            <p className="mt-2 text-sm text-[#777]">
                                Create moderator accounts. Moderators can
                                remove reviews.
                            </p>

                            <form
                                onSubmit={createModerator}
                                className="mt-5 space-y-3"
                            >
                                <input
                                    required
                                    type="email"
                                    className={inputClass}
                                    placeholder="Email address"
                                    value={moderatorEmail}
                                    onChange={(e) =>
                                        setModeratorEmail(e.target.value)
                                    }
                                />

                                <input
                                    required
                                    minLength={8}
                                    type="password"
                                    className={inputClass}
                                    placeholder="Temporary password"
                                    value={moderatorPassword}
                                    onChange={(e) =>
                                        setModeratorPassword(e.target.value)
                                    }
                                />

                                <button
                                    type="submit"
                                    disabled={busy}
                                    className="rounded-full border border-[#581ADB] px-6 py-3 text-sm font-bold text-[#581ADB] disabled:opacity-50"
                                >
                                    Create moderator
                                </button>
                            </form>
                        </section>
                    </div>

                    <section className="mt-6 rounded-2xl border border-[#ece9f0] bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Hotels</h2>

                            <button
                                type="button"
                                onClick={() => void loadHotels()}
                                className="text-sm font-semibold text-[#581ADB]"
                            >
                                Refresh
                            </button>
                        </div>

                        {hotels.length === 0 ? (
                            <p className="text-sm text-[#888]">
                                No hotels found.
                            </p>
                        ) : (
                            <div className="divide-y divide-[#f0edf3]">
                                {hotels.map((hotel) => (
                                    <div
                                        key={hotel.id}
                                        className="flex items-center justify-between gap-4 py-4"
                                    >
                                        <div>
                                            <p className="font-bold">
                                                {hotel.name}
                                            </p>

                                            <p className="mt-1 text-sm text-[#888]">
                                                {hotel.city}, {hotel.country}{" "}
                                                · {hotel.stars} stars
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={busy}
                                            onClick={() =>
                                                void deleteHotel(hotel.id)
                                            }
                                            className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}

            {canModerate && (
                <section className="mt-6 rounded-2xl border border-[#ece9f0] bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">
                                Guest reviews
                            </h2>

                            <p className="mt-1 text-sm text-[#888]">
                                {reviews.length} reviews available
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => void loadHotels()}
                            className="text-sm font-semibold text-[#581ADB]"
                        >
                            Refresh
                        </button>
                    </div>

                    {reviews.length === 0 ? (
                        <p className="rounded-xl bg-[#faf9fc] p-5 text-sm text-[#888]">
                            No reviews available.
                        </p>
                    ) : (
                        <div className="grid gap-3">
                            {reviews.map((review) => (
                                <article
                                    key={review.id}
                                    className="rounded-xl border border-[#f0edf3] p-4"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-[#7b61b6]">
                                                {review.hotelName} ·{" "}
                                                {review.rating}/10
                                            </p>

                                            <p className="mt-2 text-sm leading-6 text-[#555]">
                                                {review.text}
                                            </p>

                                            <p className="mt-2 text-xs text-[#999]">
                                                {review.authorName || "Guest"}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={busy}
                                            onClick={() =>
                                                void deleteReview(review.id)
                                            }
                                            className="shrink-0 text-xs font-semibold text-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </div>
    </main>
);
}

