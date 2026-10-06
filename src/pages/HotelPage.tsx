import {useEffect, useState,} from "react";
import {useNavigate, useParams,} from "react-router-dom";
import {useHotels,} from "../hooks/useHotels.ts";
import {getImageUrl,} from "../api";
import RatingCircle from "../components/hotel/RatingCircle";
import ReviewList from "../components/reviews/ReviewList";

const HotelPage = () => {
    const {
        hotelId,
    } = useParams();

    const navigate =
        useNavigate();

    const {
        loadHotel,
    } = useHotels();

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [hotel, setHotel] =
        useState<
            Awaited<
                ReturnType<
                    typeof loadHotel
                >
            >
        >(null);

    useEffect(() => {
        const load = async () => {
            if (!hotelId) {
                setError(
                    "Hotel not found."
                );
                setLoading(false);
                return;
            }

            const result =
                await loadHotel(
                    hotelId
                );

            if (!result) {
                setError(
                    "Could not load hotel."
                );
            } else {
                setHotel(result);
            }

            setLoading(false);
        };

        void load();
    }, [hotelId, loadHotel]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center font-['Nunito_Sans']">
                <p className="text-sm text-[#777]">
                    Loading hotel...
                </p>
            </div>
        );
    }

    if (error || !hotel) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 font-['Nunito_Sans']">
                <p className="text-red-500">
                    {error ||
                        "Something went wrong"}
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/")
                    }
                    className="rounded-full bg-[#581ADB] px-6 py-3 text-sm font-bold text-white"
                >
                    Back to hotels
                </button>
            </div>
        );
    }

    const hotelStars =
        hotel.stars > 0
            ? Math.round(
                hotel.stars
            )
            : Math.round(
                hotel.rating / 2
            );

    const scoreItems = [
        ["Facilities", hotel.facilities],
        ["Staff", hotel.staff],
        [
            "Cleanliness",
            hotel.cleanliness,
        ],
        ["Comfort", hotel.comfort],
        ["Location", hotel.location],
        [
            "Value for money",
            hotel.valueForMoney,
        ],
    ];

    return (
        <div className="min-h-screen bg-white px-4 py-8 font-['Nunito_Sans'] md:px-8">
            <div className="mx-auto max-w-[1120px]">
                <button
                    type="button"
                    onClick={() =>
                        navigate("/")
                    }
                    className="mb-5 text-sm font-bold text-[#581ADB]"
                >
                    ← Back
                </button>

                <div className="flex flex-col gap-3 border-b border-[#EEEEEE] pb-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="flex items-center gap-1">
                            {Array.from({
                                length: 5,
                            }).map(
                                (_, index) => (
                                    <span
                                        key={
                                            index
                                        }
                                        className={`text-lg ${
                                            index <
                                            hotelStars
                                                ? "text-[#581ADB]"
                                                : "text-[#D8D8D8]"
                                        }`}
                                    >
                                        ★
                                    </span>
                                )
                            )}
                        </div>

                        <h1 className="mt-1 text-3xl font-extrabold text-[#581ADB]">
                            {hotel.name}
                        </h1>

                        <p className="text-sm text-[#777]">
                            {hotel.address ||
                                `${hotel.city}, ${hotel.country}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <RatingCircle
                            rating={
                                hotel.rating
                            }
                        />

                        <div>
                            <p className="font-extrabold text-[#581ADB]">
                                {hotel.rating >
                                0
                                    ? `${hotel.rating.toFixed(
                                        1
                                    )}/10`
                                    : "No rating"}
                            </p>

                            <p className="text-xs text-[#999]">
                                {
                                    hotel.reviewsCount
                                }{" "}
                                reviews
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1.45fr_0.8fr]">
                    <div>
                        <div className="overflow-hidden rounded-[16px]">
                            {hotel.mainImageUrl ? (
                                <img
                                    src={getImageUrl(
                                        hotel.mainImageUrl
                                    )}
                                    alt={
                                        hotel.name
                                    }
                                    className="h-[420px] w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-[420px] items-center justify-center bg-[#F3F3F3]">
                                    No image
                                </div>
                            )}
                        </div>

                        {hotel.images.length >
                            0 && (
                                <div className="mt-3 grid grid-cols-3 gap-3">
                                    {hotel.images
                                        .slice(
                                            0,
                                            3
                                        )
                                        .map(
                                            image => (
                                                <img
                                                    key={
                                                        image
                                                    }
                                                    src={getImageUrl(
                                                        image
                                                    )}
                                                    alt={
                                                        hotel.name
                                                    }
                                                    className="h-28 w-full rounded-[12px] object-cover"
                                                />
                                            )
                                        )}
                                </div>
                            )}
                    </div>

                    <div className="rounded-[16px] border border-[#E5E5E5] p-6">
                        <h2 className="text-lg font-extrabold text-[#222]">
                            Hotel information
                        </h2>

                        <p className="mt-4 leading-6 text-[#666]">
                            {
                                hotel.description
                            }
                        </p>

                        <div className="mt-5 space-y-3 text-sm text-[#666]">
                            <p>
                                <strong>
                                    Type:
                                </strong>{" "}
                                {
                                    hotel.hotelType
                                }
                            </p>

                            <p>
                                <strong>
                                    City:
                                </strong>{" "}
                                {
                                    hotel.city
                                }
                            </p>

                            <p>
                                <strong>
                                    Country:
                                </strong>{" "}
                                {
                                    hotel.country
                                }
                            </p>

                            <p>
                                <strong>
                                    Wi-Fi:
                                </strong>{" "}
                                {hotel.hasWifi
                                    ? "Yes"
                                    : "No"}
                            </p>
                        </div>
                    </div>
                </div>

                <section className="mt-8">
                    <h2 className="text-lg font-extrabold text-[#222]">
                        Guest reviews
                    </h2>

                    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
                        {scoreItems.map(
                            ([name, value]) => (
                                <div
                                    key={
                                        name
                                    }
                                    className="flex flex-col items-center rounded-[14px] border border-[#E5E5E5] px-3 py-4"
                                >
                                    <RatingCircle
                                        rating={
                                            Number(
                                                value
                                            )
                                        }
                                    />

                                    <span className="mt-2 text-center text-[10px] uppercase text-[#581ADB]">
                                        {name}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-extrabold text-[#222]">
                        Amenities
                    </h2>

                    <p className="mt-3 text-[#666]">
                        {hotel.amenities
                            .length
                            ? hotel.amenities.join(
                                ", "
                            )
                            : "No amenities."}
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-lg font-extrabold text-[#222]">
                        Rooms
                    </h2>

                    <div className="mt-4 space-y-3">
                        {hotel.rooms.map(
                            room => (
                                <div
                                    key={
                                        room.id
                                    }
                                    className="flex flex-col gap-4 rounded-[16px] border border-[#E5E5E5] p-4 md:flex-row"
                                >
                                    {room.imageUrl ? (
                                        <img
                                            src={getImageUrl(
                                                room.imageUrl
                                            )}
                                            alt={
                                                room.title
                                            }
                                            className="h-40 w-full rounded-[12px] object-cover md:w-60"
                                        />
                                    ) : (
                                        <div className="flex h-40 w-full items-center justify-center rounded-[12px] bg-[#F3F3F3] md:w-60">
                                            No image
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <h3 className="text-lg font-extrabold">
                                            {
                                                room.title
                                            }
                                        </h3>

                                        <p className="mt-2 text-sm text-[#777]">
                                            Bed:{" "}
                                            {
                                                room.bedType
                                            }
                                        </p>

                                        <p className="text-sm text-[#777]">
                                            Capacity:{" "}
                                            {
                                                room.capacity
                                            }
                                        </p>

                                        <p className="mt-3 text-xl font-extrabold text-[#581ADB]">
                                            $
                                            {
                                                room.pricePerNight
                                            }{" "}
                                            / night
                                        </p>

                                        {room.isAvailable && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(
                                                        `/booking/${room.id}`
                                                    )
                                                }
                                                className="mt-4 rounded-full bg-[#581ADB] px-7 py-3 text-sm font-bold text-white"
                                            >
                                                Book
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>

                <section className="mt-8 pb-10">
                    <h2 className="mb-4 text-lg font-extrabold text-[#222]">
                        Reviews
                    </h2>

                    <ReviewList
                        reviews={
                            hotel.reviews
                        }
                    />
                </section>
            </div>
        </div>
    );
};

export default HotelPage;