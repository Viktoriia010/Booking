import {useEffect, useRef, useState, type ChangeEvent, type FormEvent,} from "react";
import {useNavigate,} from "react-router-dom";
import {apiFetch, getImageUrl, readError,} from "../api";
import {useAuth,} from "../context/useAuth";
import AccountTabs from "../components/account/AccountTabs";

type AccountData = {
    name: string;
    email: string;
    phone: string;
    avatarUrl: string;
    country: string;
    city: string;
    preferredCurrency: string;
    dateOfBirth: string;
};

type DateParts = {
    month: string;
    day: string;
    year: string;
};

type BookingData = {
    id: string;
    hotelId: string;
    hotelName: string;
    hotelAddress: string;
    hotelCity: string;
    hotelCountry: string;
    roomTitle: string;
    checkInDate: string;
    checkOutDate: string;
    adultsCount: number;
    childrenCount: number;
    travelDetails: string;
    nights: number;
    totalPrice: number;
    isPaid: boolean;
    status: string;
    createdAt: string;
    roomImageUrl: string;
    bedType: string;
    capacity: number;
};

type RoomResponse = {
    id: string;
    title: string;
    bedType: string;
    imageUrl: string;
    capacity: number;
};

type AccountReview = {
    id: string;
    hotelName: string;
    rating: number;
    text: string;
    createdAt: string;
};

const countries = [
    "Ukraine",
    "United Kingdom",
    "Poland",
    "Germany",
    "France",
    "United States",
];

const cities: Record<
    string,
    string[]
> = {
    Ukraine: [
        "Dnipro",
        "Kyiv",
        "Lviv",
        "Odesa",
        "Kharkiv",
    ],

    "United Kingdom": [
        "London",
        "Manchester",
        "Liverpool",
    ],

    Poland: [
        "Warsaw",
        "Krakow",
        "Gdansk",
    ],

    Germany: [
        "Berlin",
        "Munich",
        "Hamburg",
    ],

    France: [
        "Paris",
        "Lyon",
        "Nice",
    ],

    "United States": [
        "New York",
        "Los Angeles",
        "Chicago",
    ],
};

const currencies = [
    "UAH",
    "EUR",
    "USD",
    "GBP",
];

const AccountPage = () => {
    const navigate =
        useNavigate();

    const {
        isAuth,
        user,
        logout,
    } = useAuth();

    const [data, setData] =
        useState<AccountData>({
            name:
                user?.name || "",
            email:
                user?.email || "",
            phone:
                user?.phone || "",
            avatarUrl: "",
            country:
                user?.country || "",
            city:
                user?.city || "",
            preferredCurrency:
                "",
            dateOfBirth: "",
        });

    const [dateParts, setDateParts] =
        useState<DateParts>({
            month: "",
            day: "",
            year: "",
        });

    const [selectedFile, setSelectedFile] =
        useState<File | null>(
            null
        );

    const [previewUrl, setPreviewUrl] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    const [bookings, setBookings] =
        useState<BookingData[]>(
            []
        );

    const [bookingsLoading, setBookingsLoading] =
        useState(true);

    const [bookingsError, setBookingsError] =
        useState("");

    const [reviews, setReviews] =
        useState<AccountReview[]>(
            []
        );

    const fileInputRef =
        useRef<HTMLInputElement>(
            null
        );

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
            return;
        }

        const loadAccount =
            async () => {
                try {
                    const response =
                        await apiFetch(
                            "/Account"
                        );

                    if (!response.ok) {
                        throw new Error(
                            await readError(
                                response
                            )
                        );
                    }

                    const account =
                        await response.json();

                    setData({
                        name:
                            account.name ||
                            "",
                        email:
                            account.email ||
                            user?.email ||
                            "",
                        phone:
                            account.phone ||
                            "",
                        avatarUrl:
                            account.avatarUrl ||
                            "",
                        country:
                            account.country ||
                            "",
                        city:
                            account.city ||
                            "",
                        preferredCurrency:
                            account.preferredCurrency ||
                            "",
                        dateOfBirth:
                            account.dateOfBirth ||
                            "",
                    });

                    if (
                        account.dateOfBirth
                    ) {
                        const date =
                            new Date(
                                account.dateOfBirth
                            );

                        if (
                            !Number.isNaN(
                                date.getTime()
                            )
                        ) {
                            setDateParts({
                                month: String(
                                    date.getMonth() +
                                    1
                                ).padStart(
                                    2,
                                    "0"
                                ),

                                day: String(
                                    date.getDate()
                                ).padStart(
                                    2,
                                    "0"
                                ),

                                year: String(
                                    date.getFullYear()
                                ),
                            });
                        }
                    }
                } catch (error) {
                    setMessage(
                        error instanceof Error
                            ? error.message
                            : "Could not load account."
                    );
                }
            };

        const loadBookings =
            async () => {
                try {
                    setBookingsLoading(
                        true
                    );

                    const response =
                        await apiFetch(
                            "/Account/bookings"
                        );

                    if (!response.ok) {
                        throw new Error(
                            await readError(
                                response
                            )
                        );
                    }

                    const result =
                        await response.json();

                    const source =
                        Array.isArray(
                            result
                        )
                            ? result
                            : [];

                    const enriched =
                        await Promise.all(
                            source.map(
                                async (
                                    booking: BookingData
                                ) => {
                                    let image = "";
                                    let bedType = "";
                                    let capacity = 0;

                                    let hotelCity = "";
                                    let hotelCountry = "";

                                    try {
                                        const hotelResponse =
                                            await apiFetch(
                                                `/Hotel/${booking.hotelId}`
                                            );

                                        if (
                                            hotelResponse.ok
                                        ) {
                                            const hotel =
                                                await hotelResponse.json();

                                            hotelCity =
                                                hotel.city || "";

                                            hotelCountry =
                                                hotel.country || "";
                                        }
                                    } catch {
                                        hotelCity = "";
                                        hotelCountry = "";
                                    }

                                    try {
                                        const roomsResponse =
                                            await apiFetch(
                                                `/Room/hotel/${booking.hotelId}`
                                            );

                                        if (
                                            roomsResponse.ok
                                        ) {
                                            const rooms =
                                                (await roomsResponse.json()) as RoomResponse[];

                                            const room =
                                                rooms.find(
                                                    item =>
                                                        item.title ===
                                                        booking.roomTitle
                                                );

                                            if (room) {
                                                image =
                                                    room.imageUrl;

                                                bedType =
                                                    room.bedType;

                                                capacity =
                                                    room.capacity;
                                            }
                                        }
                                    } catch {
                                        image = "";
                                    }

                                    return {
                                        ...booking,
                                        roomImageUrl:
                                        image,
                                        bedType,
                                        capacity,
                                        hotelCity,
                                        hotelCountry,
                                    };
                                }
                            )
                        );

                    setBookings(
                        enriched
                    );
                } catch (error) {
                    setBookingsError(
                        error instanceof Error
                            ? error.message
                            : "Could not load bookings."
                    );
                } finally {
                    setBookingsLoading(
                        false
                    );
                }
            };

        const loadReviews =
            async () => {
                try {
                    const response =
                        await apiFetch(
                            "/Hotel"
                        );

                    if (!response.ok) {
                        return;
                    }

                    const result =
                        await response.json();

                    const hotels =
                        Array.isArray(
                            result.hotels
                        )
                            ? result.hotels
                            : [];

                    const ownReviews: AccountReview[] =
                        [];

                    hotels.forEach(
                        (hotel: {
                            id: string;
                            name: string;
                            reviews?: {
                                id: string;
                                userId: string;
                                rating: number;
                                text: string;
                                createdAt: string;
                            }[];
                        }) => {
                            if (
                                !Array.isArray(
                                    hotel.reviews
                                )
                            ) {
                                return;
                            }

                            hotel.reviews.forEach(
                                review => {
                                    const sameUser =
                                        user?.id &&
                                        review.userId ===
                                        user.id;

                                    if (
                                        sameUser
                                    ) {
                                        ownReviews.push(
                                            {
                                                id:
                                                review.id,

                                                hotelName:
                                                hotel.name,

                                                rating:
                                                review.rating,

                                                text:
                                                review.text,

                                                createdAt:
                                                review.createdAt,
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    );

                    setReviews(
                        ownReviews
                    );
                } catch {
                    setReviews([]);
                }
            };

        void loadAccount();
        void loadBookings();
        void loadReviews();
    }, [
        isAuth,
        navigate,
        user?.email,
        user?.id,
    ]);

    const handleTextChange =
        (
            event: ChangeEvent<
                HTMLInputElement |
                HTMLSelectElement
            >
        ) => {
            const {
                name,
                value,
            } = event.target;

            setData(
                current => ({
                    ...current,
                    [name]: value,
                })
            );
        };

    const handleDateChange =
        (
            part:
                | "month"
                | "day"
                | "year",
            value: string
        ) => {
            const numbers =
                value.replace(
                    /\D/g,
                    ""
                );

            const next = {
                ...dateParts,
                [part]: numbers,
            };

            setDateParts(next);

            if (
                next.month.length === 2 &&
                next.day.length === 2 &&
                next.year.length === 4
            ) {
                const month =
                    Number(
                        next.month
                    );

                const day =
                    Number(
                        next.day
                    );

                const year =
                    Number(
                        next.year
                    );

                const date =
                    new Date(
                        year,
                        month - 1,
                        day
                    );

                if (
                    date.getFullYear() ===
                    year &&
                    date.getMonth() ===
                    month - 1 &&
                    date.getDate() ===
                    day
                ) {
                    setData(
                        current => ({
                            ...current,
                            dateOfBirth:
                                `${year}-${String(
                                    month
                                ).padStart(
                                    2,
                                    "0"
                                )}-${String(
                                    day
                                ).padStart(
                                    2,
                                    "0"
                                )}`,
                        })
                    );
                }
            }
        };

    const handlePhotoChange =
        (
            event: ChangeEvent<HTMLInputElement>
        ) => {
            const file =
                event.target.files?.[0];

            if (!file) {
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(
                URL.createObjectURL(
                    file
                )
            );
        };

    const submit =
        async (
            event: FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            setSaving(true);
            setMessage("");

            try {
                const formData =
                    new FormData();

                formData.append(
                    "Name",
                    data.name
                );

                formData.append(
                    "Email",
                    data.email
                );

                formData.append(
                    "Phone",
                    data.phone
                );

                formData.append(
                    "Country",
                    data.country
                );

                formData.append(
                    "City",
                    data.city
                );

                formData.append(
                    "PreferredCurrency",
                    data.preferredCurrency
                );

                if (
                    data.dateOfBirth
                ) {
                    formData.append(
                        "DateOfBirth",
                        data.dateOfBirth
                    );
                }

                if (selectedFile) {
                    formData.append(
                        "Image",
                        selectedFile
                    );
                }

                const response =
                    await apiFetch(
                        "/Account",
                        {
                            method: "PUT",
                            body: formData,
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        await readError(
                            response
                        )
                    );
                }

                setMessage(
                    "Account saved."
                );
            } catch (error) {
                setMessage(
                    error instanceof Error
                        ? error.message
                        : "Could not save account."
                );
            } finally {
                setSaving(false);
            }
        };

    if (!isAuth) {
        return null;
    }

    const avatar =
        previewUrl ||
        getImageUrl(
            data.avatarUrl
        );

    const availableCities =
        cities[
            data.country
            ] || [];

    return (
        <div className="min-h-screen bg-white px-4 py-7 font-['Nunito_Sans'] sm:px-8">
            <div className="mx-auto max-w-[1120px]">
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/")
                        }
                        className="text-[10px] text-[#999]"
                    >
                        ← Main page
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate(
                                "/"
                            );
                        }}
                        className="text-xs font-bold text-[#581ADB]"
                    >
                        Sign out
                    </button>
                </div>

                <AccountTabs />

                <h1 className="text-[24px] font-extrabold text-[#581ADB]">
                    Your Account
                </h1>

                <div className="mt-4 grid gap-3 md:grid-cols-[1fr_320px]">
                    <div className="overflow-hidden rounded-[14px] border border-[#E5E5E5] bg-white">
                        <div className="flex h-[110px]">
                            <div className="flex h-[110px] w-[110px] items-center justify-center bg-[#E8E8E8]">
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt="Profile"
                                        className="h-[90px] w-[90px] rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-5xl text-[#AEB2B5]">
                                        ●
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <p className="text-sm font-extrabold text-[#222]">
                                    {
                                        data.name
                                    }{" "}
                                    <span className="text-[#999]">
                                        ✎
                                    </span>
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="mt-2 rounded-full border border-[#DDDDDD] px-3 py-1 text-[10px] text-[#777]"
                                >
                                    Change the photo
                                </button>

                                <input
                                    ref={
                                        fileInputRef
                                    }
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handlePhotoChange
                                    }
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[14px] border border-[#E5E5E5] p-4 text-[11px] leading-5 text-[#999]">
                        Your name will be the only visible information to other users.
                        <br />
                        <br />
                        All other details will remain private and help us simplify the booking process.
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="mt-3 rounded-[14px] border border-[#E5E5E5] p-4"
                >
                    <div className="grid gap-3 md:grid-cols-2">
                        <div>
                            <input
                                name="phone"
                                value={
                                    data.phone
                                }
                                onChange={
                                    handleTextChange
                                }
                                placeholder="Your phone number"
                                className="h-10 w-full rounded-full border border-[#E5E5E5] px-4 text-xs outline-none focus:border-[#581ADB]"
                            />

                            <p className="mt-1 px-3 text-[9px] text-[#999]">
                                *Has to be confirmed
                            </p>
                        </div>

                        <select
                            name="country"
                            value={
                                data.country
                            }
                            onChange={
                                handleTextChange
                            }
                            className="h-10 rounded-full border border-[#E5E5E5] bg-white px-4 text-xs italic text-[#777] outline-none focus:border-[#581ADB]"
                        >
                            <option value="">
                                Country
                            </option>

                            {countries.map(
                                country => (
                                    <option
                                        key={
                                            country
                                        }
                                    >
                                        {
                                            country
                                        }
                                    </option>
                                )
                            )}
                        </select>

                        <div>
                            <input
                                name="email"
                                type="email"
                                value={
                                    data.email
                                }
                                onChange={
                                    handleTextChange
                                }
                                placeholder="Your email"
                                className="h-10 w-full rounded-full border border-[#E5E5E5] px-4 text-xs outline-none focus:border-[#581ADB]"
                            />

                            <p className="mt-1 px-3 text-[9px] text-[#999]">
                                *Has to be confirmed
                            </p>
                        </div>

                        <select
                            name="city"
                            value={
                                data.city
                            }
                            onChange={
                                handleTextChange
                            }
                            className="h-10 rounded-full border border-[#E5E5E5] bg-white px-4 text-xs italic text-[#777] outline-none focus:border-[#581ADB]"
                        >
                            <option value="">
                                City
                            </option>

                            {availableCities.map(
                                city => (
                                    <option
                                        key={
                                            city
                                        }
                                    >
                                        {city}
                                    </option>
                                )
                            )}
                        </select>

                        <div>
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    value={
                                        dateParts.month
                                    }
                                    onChange={event =>
                                        handleDateChange(
                                            "month",
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Month"
                                    maxLength={2}
                                    className="h-10 rounded-full border border-[#E5E5E5] px-3 text-xs outline-none focus:border-[#581ADB]"
                                />

                                <input
                                    value={
                                        dateParts.day
                                    }
                                    onChange={event =>
                                        handleDateChange(
                                            "day",
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Date"
                                    maxLength={2}
                                    className="h-10 rounded-full border border-[#E5E5E5] px-3 text-xs outline-none focus:border-[#581ADB]"
                                />

                                <input
                                    value={
                                        dateParts.year
                                    }
                                    onChange={event =>
                                        handleDateChange(
                                            "year",
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Year"
                                    maxLength={4}
                                    className="h-10 rounded-full border border-[#E5E5E5] px-3 text-xs outline-none focus:border-[#581ADB]"
                                />
                            </div>

                            <p className="mt-1 px-3 text-[9px] text-[#999]">
                                Enter your date of birth
                            </p>
                        </div>

                        <select
                            name="preferredCurrency"
                            value={
                                data.preferredCurrency
                            }
                            onChange={
                                handleTextChange
                            }
                            className="h-10 rounded-full border border-[#E5E5E5] bg-white px-4 text-xs italic text-[#777] outline-none focus:border-[#581ADB]"
                        >
                            <option value="">
                                Preferred currency
                            </option>

                            {currencies.map(
                                currency => (
                                    <option
                                        key={
                                            currency
                                        }
                                    >
                                        {
                                            currency
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={
                                saving
                            }
                            className="rounded-full bg-[#581ADB] px-7 py-2.5 text-xs font-extrabold text-white disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save changes"}
                        </button>
                    </div>

                    {message && (
                        <p className="mt-3 text-center text-xs text-[#581ADB]">
                            {message}
                        </p>
                    )}
                </form>

                <section className="mt-7">
                    <h2 className="text-[10px] font-bold uppercase tracking-wide text-[#999]">
                        YOUR BOOKINGS
                    </h2>


                    {bookingsLoading ? (
                        <p className="mt-4 text-sm text-[#999]">
                            Loading...
                        </p>
                    ) : bookingsError ? (
                        <p className="mt-4 text-sm text-red-500">
                            {
                                bookingsError
                            }
                        </p>
                    ) : bookings.length ===
                    0 ? (
                        <div className="mt-3 rounded-[14px] border border-[#E5E5E5] p-8 text-center text-sm text-[#999]">
                            You have no bookings
                        </div>
                    ) : (
                        <div className="mt-3 space-y-3">
                            {bookings.map(
                                booking => (
                                    <div
                                        key={
                                            booking.id
                                        }
                                        className="overflow-hidden rounded-[14px] border border-[#E5E5E5] bg-white"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="h-[180px] w-full bg-[#F3F3F3] md:w-[220px]">
                                                {booking.roomImageUrl ? (
                                                    <img
                                                        src={getImageUrl(
                                                            booking.roomImageUrl
                                                        )}
                                                        alt={
                                                            booking.roomTitle
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-xs text-[#999]">
                                                        No room image
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 p-4">
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-[10px] text-[#999]">
                                                            {booking.hotelName}
                                                        </p>

                                                        <h3 className="mt-1 font-extrabold text-[#222]">
                                                            {booking.roomTitle}
                                                        </h3>

                                                        <p className="mt-1 text-xs text-[#777]">
                                                            {booking.bedType ||
                                                                "Room"}
                                                        </p>
                                                    </div>

                                                    <span className="rounded-full bg-[#F3ECFF] px-3 py-1 text-[10px] font-bold text-[#581ADB]">
                                                        {booking.status ||
                                                            "Confirmed"}
                                                    </span>
                                                </div>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    <div className="rounded-[10px] border border-[#E5E5E5] px-3 py-2">
                                                        <p className="text-[9px] text-[#999]">
                                                            Check-in
                                                        </p>

                                                        <p className="text-xs font-bold text-[#581ADB]">
                                                            {booking.checkInDate}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-[10px] border border-[#E5E5E5] px-3 py-2">
                                                        <p className="text-[9px] text-[#999]">
                                                            Check-out
                                                        </p>

                                                        <p className="text-xs font-bold text-[#581ADB]">
                                                            {booking.checkOutDate}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-[10px] border border-[#E5E5E5] px-3 py-2">
                                                        <p className="text-[9px] text-[#999]">
                                                            Guests
                                                        </p>

                                                        <p className="text-xs font-bold text-[#581ADB]">
                                                            {booking.adultsCount} adult(s),{" "}
                                                            {booking.childrenCount} child(ren)
                                                        </p>
                                                    </div>

                                                    <div className="rounded-[10px] border border-[#E5E5E5] px-3 py-2">
                                                        <p className="text-[9px] text-[#999]">
                                                            Location
                                                        </p>

                                                        <p className="text-xs font-bold text-[#581ADB]">
                                                            {booking.hotelCity},{" "}
                                                            {booking.hotelCountry}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-5 grid grid-cols-3 gap-3">
                                                    <div>
                                                        <p className="text-[9px] text-[#999]">
                                                            Check-in
                                                        </p>

                                                        <p className="text-xs font-bold">
                                                            {
                                                                booking.checkInDate
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-[9px] text-[#999]">
                                                            Check-out
                                                        </p>

                                                        <p className="text-xs font-bold">
                                                            {
                                                                booking.checkOutDate
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-[9px] text-[#999]">
                                                            Guests
                                                        </p>

                                                        <p className="text-xs font-bold">
                                                            {
                                                                booking.adultsCount
                                                            }{" "}
                                                            ad.{" "}
                                                            {
                                                                booking.childrenCount
                                                            }{" "}
                                                            ch.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-5 flex items-center justify-between border-t border-[#EEEEEE] pt-3">
                                                    <span className="text-xs text-[#999]">
                                                        Total
                                                    </span>

                                                    <span className="font-extrabold text-[#581ADB]">
                                                        $
                                                        {
                                                            booking.totalPrice
                                                        }
                                                        <div className="mt-4 grid gap-3 sm:grid-cols-2">

                                                            <button

                                                                type="button"

                                                                onClick={() =>

                                                                    navigate(

                                                                        `/hotel/${booking.hotelId}`

                                                                    )

                                                            }

                                                                className="flex h-[70px] items-center justify-center rounded-[12px] bg-[#581ADB] text-sm font-extrabold text-white transition hover:opacity-90"

                                                            >

                                                                Hotel Page

                                                            </button>


                                                            <button

                                                                type="button"

                                                                onClick={() =>

                                                                    navigate(

                                                                        "/booking-info",

                                                                        {

                                                                            state: {

                                                                                bookingId:

                                                                                booking.id,

                                                                                hotelId:

                                                                                booking.hotelId,

                                                                                hotelName:

                                                                                booking.hotelName,

                                                                                hotelCity:

                                                                                booking.hotelCity,

                                                                                hotelCountry:

                                                                                booking.hotelCountry,

                                                                                roomTitle:

                                                                                booking.roomTitle,

                                                                                bedType:

                                                                                booking.bedType,

                                                                                capacity:

                                                                                booking.capacity,

                                                                                roomImageUrl:

                                                                                booking.roomImageUrl,

                                                                                checkIn:

                                                                                booking.checkInDate,

                                                                                checkOut:

                                                                                booking.checkOutDate,

                                                                                adults:

                                                                                booking.adultsCount,

                                                                                children:

                                                                                booking.childrenCount,

                                                                                phone:

                                                                                data.phone,

                                                                                email:

                                                                                data.email,

                                                                                country:

                                                                                data.country,

                                                                                total:

                                                                                booking.totalPrice,

                                                                            },

                                                                        }

                                                                        )

                                                            }

                                                                className="flex h-[70px] items-center justify-center rounded-[12px] bg-[#581ADB] text-sm font-extrabold text-white transition hover:opacity-90"

                                                            >

                                                                Booking info

                                                            </button>

                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>

                <section className="mt-7 pb-12">
                    <h2 className="text-[10px] font-bold uppercase tracking-wide text-[#999]">
                        YOUR REVIEWS
                    </h2>

                    {reviews.length ===
                    0 ? (
                        <div className="mt-3 rounded-[14px] border border-[#E5E5E5] p-8 text-center">
                            <div className="text-3xl">
                                📝
                            </div>

                            <h3 className="mt-2 text-sm font-extrabold text-[#222]">
                                You have no reviews
                            </h3>

                            <p className="mt-1 text-xs text-[#999]">
                                When you leave a review about a hotel, it will appear here with your rating and publication date.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-3 space-y-3">
                            {reviews.map(
                                review => (
                                    <div
                                        key={
                                            review.id
                                        }
                                        className="rounded-[14px] border border-[#E5E5E5] p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <strong className="text-sm">
                                                {
                                                    review.hotelName
                                                }
                                            </strong>

                                            <span className="text-sm font-bold text-[#581ADB]">
                                                {
                                                    review.rating
                                                }
                                                /10
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm text-[#555]">
                                            {
                                                review.text
                                            }
                                        </p>

                                        <p className="mt-2 text-xs text-[#999]">
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AccountPage;