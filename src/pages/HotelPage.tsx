import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDaysAgo } from "../utils/date";
import { getImageUrl } from "../api";
import type { Hotel } from "../context/HotelsContext.types";
import { useHotels } from "../hooks/useHotels.ts";
import { useAuth } from "../context/useAuth";

import starRating from "@/assets/star-rounded.svg";

const HotelPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loadHotel, addReview,searchData } = useHotels();
    const { isAuth } = useAuth();

    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!id) return;

        void loadHotel(id).then(setHotel);
    }, [id]);

    const formatDate = (date?: string) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    if (!hotel) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Hotel not found.
                </p>
            </div>
        );
    }

    const submitReview = async () => {
        if (!isAuth) {
            navigate("/login");
            return;
        }

        if (rating === 0 || !text.trim()) {
            setMessage("Choose a rating and write a comment.");
            return;
        }

        try {
            await addReview(hotel.id, rating, text.trim());

            const updated = await loadHotel(hotel.id);

            setHotel(updated);
            setRating(0);
            setText("");
            setMessage("Review added.");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Could not add review."
            );
        }
    };

    return (
        <div className="relative min-h-screen bg-white text-[#333]">

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                absolute left-13 top-15 z-20
                hidden h-9 w-9 items-center justify-center
                rounded-full border border-gray-200 bg-white
               xl:flex
                xl:left-8
            "
            >
                <img
                    src="/back-arrow.svg"
                    alt="Back"
                />
            </button>

            <main className="
            mx-auto w-full
            max-w-[1180px]
            px-4 pb-20 pt-6
            sm:px-6
            lg:px-8 lg:pt-10
        ">


                <section className="
                mb-6
                grid
                grid-cols-1
                gap-5
                lg:mb-9
                lg:grid-cols-[1fr_auto_1fr]
                lg:items-center
            ">

                    {/* BOOKING INFO */}

                    <div className="
                    order-3
                    flex justify-center gap-5
                    lg:order-1 lg:justify-start
                ">

                        {/* DESTINATION */}

                        <div className="
                        flex  h-[64px] w-[82px]
                        flex-col items-center justify-center
                        rounded-xl border border-[#DDDDDD]
                        md:w-[100px] md:h-[80px]
                    ">
                        <img
                        src="/plane.svg"
                        className="md:h-4 md:w-4 h-3 w-3 mb-1 opacity-60 md:mb-2 "
                        />

                            <span className="text-[11px] md:text-[13px] text-[#581ADB]">
                            {hotel.city}
                        </span>

                            <span className="text-[10px] text-[#581ADB]">
                            •••
                        </span>
                        </div>

                        {/* DATES */}

                        <div className="
                         flex  h-[64px] w-[82px]
                            flex-col items-center justify-center
                            rounded-xl border border-[#DDDDDD]
                            md:w-[100px] md:h-[80px]
                        ">
                            <img
                                src="/calendar.svg"
                                className="md:h-4 md:w-4 h-3 w-3 mb-1 opacity-60 md:mb-2 "
                            />


                            <span className="text-[11px] md:text-[13px] text-[#581ADB]">
                            {searchData
                                ? `${formatDate(searchData.checkIn)} - ${formatDate(searchData.checkOut)}`
                                : "—"}
                            </span>


                            <span className="text-[10px] text-[#581ADB]">
                            •••
                        </span>
                        </div>

                        {/* GUESTS */}

                        <div className="
                           flex  h-[64px] w-[82px]
                                flex-col items-center justify-center
                                rounded-xl border border-[#DDDDDD]
                                md:w-[100px] md:h-[80px]
                            ">
                            <img
                                src="/peoples.svg"
                                className="md:h-4 md:w-4 h-3 w-3 mb-1 opacity-60 md:mb-2 "
                            />

                            <span className="text-[11px] md:text-[13px] text-[#581ADB]">
                                {searchData?.adults ?? 0} ad. {searchData?.children ?? 0} ch.
                            </span>

                            <span className="text-[10px] text-[#581ADB]">
                            •••
                        </span>
                        </div>
                    </div>


                    {/* HOTEL TITLE */}

                    <div className="
                    order-1
                    min-w-0
                    text-center
                    lg:order-2
                ">

                        {/* Rating */}
                        <div className=" flex items-center justify-center mb-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <img
                                    key={index}
                                    src={starRating}
                                    alt="star"
                                    className={`h-3.5 w-3.5 ${
                                        index < hotel.rating / 2
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                />
                            ))}
                        </div>



                        <h1 className="
                        text-[28px] font-bold leading-none
                        text-[#581ADB]
                        sm:text-[32px]
                    ">
                            {hotel.name}
                        </h1>

                        <p className="
                        mt-2 text-[12px] text-[#717171]
                        sm:text-[14px]
                    ">
                            (380) 555-0103
                        </p>
                    </div>


                    {/* RATING */}

                    <div className="
                    order-2
                    flex items-center justify-center gap-2
                    lg:justify-end
                ">

                        <div className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        border border-[#581ADB]
                    ">
                        <span className="text-[17px] text-[#581ADB]">
                            {hotel.rating > 0
                                ? hotel.rating.toFixed(1)
                                : "—"}
                        </span>
                        </div>

                        <div className="
                        flex flex-col items-center justify-center
                        text-[14px]
                        text-[#717171]
                    ">
                            <span>reviews</span>
                            <span>{hotel.reviewsCount}</span>
                        </div>

                        <img
                            src="/check.svg"
                            alt="Check"
                            className="h-7 w-7"
                        />
                    </div>

                </section>


                <section className="
                grid
                gap-6
                lg:grid-cols-[1fr_270px]
                lg:gap-5
                overflow-x-hidden
            ">


                    <div className="order-1 min-w-0">

                        {/* MAIN IMAGE */}

                        <div className="
                        h-[225px]
                        overflow-hidden
                        rounded-xl
                        sm:h-[340px]
                        lg:h-[380px]
                        xl:h-[408px]
                    ">
                            {hotel.mainImageUrl ? (
                                <img
                                    src={getImageUrl(hotel.mainImageUrl)}
                                    alt={hotel.name}
                                    className="
                                    h-full w-full
                                    object-cover
                                    transition duration-500
                                    hover:scale-[1.02]
                                "
                                />
                            ) : (
                                <div className="
                                flex h-full items-center justify-center
                                bg-gray-100 text-sm text-gray-400
                            ">
                                    No image
                                </div>
                            )}
                        </div>


                        {/* ROOM IMAGES */}
                        <div className="overflow-x-auto scrollbar-hide">
                            <div
                                className="
                                    mt-4
                                    grid
                                    grid-flow-col
                                    auto-cols-[240px]
                                    gap-3
                                    w-max

                                    sm:grid-flow-row
                                    sm:grid-cols-3
                                    sm:auto-cols-auto
                                    sm:w-full
                                "
                            >
                                {hotel.rooms
                                    .filter((room) => room.imageUrl)
                                    .slice(0, 3)
                                    .map((room) => (
                                        <div
                                            key={room.id}
                                            className="
                                                h-[160px]
                                                overflow-hidden
                                                rounded-xl
                                            "
                                        >
                                            <img
                                                src={getImageUrl(room.imageUrl!)}
                                                alt={room.title}
                                                className="
                                                    h-full
                                                    w-full
                                                    object-cover
                                                    transition
                                                    duration-500
                                                    hover:scale-105
                                                "
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — HOTEL INFO */}

                    <div className="
                    order-2
                    flex flex-col
                ">

                        {/* PRICE */}

                        <div className="
                        flex
                        flex-col
                        items-center
                        lg:items-start
                    ">

                            <div className="flex items-end">
                            <span className="
                                text-[25px]
                                font-bold
                                text-[#581ADB]
                            ">
                                {hotel.rooms[0]?.pricePerNight ?? "—"}$
                            </span>

                                <span className="
                                ml-1 mb-[3px]
                                font-semibold
                                text-[19px]
                                text-[#717171]
                            ">
                                per night
                            </span>
                            </div>


                            {/* LOCATION */}

                            <div className="
                            mt-1
                            flex items-center gap-2
                            text-[10px] uppercase
                            text-[#717171]
                        ">
                            <img
                            src="/location.svg"
                            className="h-3 w-3"
                            />

                                {hotel.address} | {hotel.city}
                            </div>


                            {/* BOOK BUTTON */}

                            {hotel.rooms[0] && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/booking/${hotel.rooms[0].id}`
                                        )
                                    }
                                    disabled={!hotel.rooms[0].isAvailable}
                                    className="
                                    mt-5
                                    w-[130px]
                                    rounded-full
                                    cursor-pointer
                                    bg-[#581ADB]
                                    px-6 py-3
                                    text-sm font-semibold text-white
                                    shadow-[0_0_20px_rgba(88,26,219,0.5)]
                                    transition
                                    hover:shadow-[0_0_25px_rgba(88,26,219,0.7)]
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-300
                                    lg:w-[118px]
                                "
                                >
                                    {hotel.rooms[0].isAvailable
                                        ? "BOOK"
                                        : "NOT AVAILABLE"}
                                </button>
                            )}

                        </div>


                        {/* DESCRIPTION */}

                        <p className="
                        mt-7
                        text-[11px]
                        leading-[1.7]
                        text-[#717171]
                    ">
                            {hotel.description} </p>


                        {/* TAGS */}
                        <div className="
                            mt-4
                            flex flex-wrap gap-x-5 gap-y-2
                            text-[10px] text-[#717171]
                        ">
                            {hotel.hasWifi && (
                                <span className="flex items-center gap-1">
                                    ♡ Wi-Fi
                                </span>
                                )}

                            {hotel.amenities.map((amenity) => (
                                <span
                                    key={amenity}
                                    className="flex items-center gap-1"
                                >
                                    ♡ {amenity}
                                </span>
                                ))}
                        </div>


                        {/* REVIEW PREVIEW */}

                        {hotel.reviews.length > 0 && (
                            <div className="mt-5 rounded-xl border border-gray-100 bg-white p-4">

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">

                                        {hotel.reviews[0].authorAvatarUrl ? (
                                            <img
                                                src={getImageUrl(hotel.reviews[0].authorAvatarUrl)}
                                                alt={hotel.reviews[0].authorName}
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-9 w-9 rounded-full bg-gray-200" />
                                        )}

                                        <div>
                                            <p className="text-[11px] font-semibold">
                                                {hotel.reviews[0].authorName}
                                            </p>

                                            <p className="text-[10px] text-gray-400">
                                                {hotel.name}
                                            </p>
                                        </div>

                                    </div>

                                    <span className="text-[10px] text-gray-400">
                                        {getDaysAgo(hotel.reviews[0].createdAt!)}
                                    </span>
                                </div>

                                <p className="mt-4 text-[10px] leading-5 text-gray-500">
                                    {hotel.reviews[0].text}
                                </p>

                            </div>
                        )}

                        </div>

                        </section>



</main>
</div>
);
};

type RatingItemProps = {
    value: number;
    label: string;
};

const RatingItem = ({ value, label }: RatingItemProps) => (
    <div className="text-center">

        <div className="
            mx-auto mb-3
            flex h-[54px] w-[54px]
            items-center justify-center
            rounded-full
            border-2 border-[#5b21e6]
            text-[18px]
            font-medium
            text-[#5b21e6]
        ">
            {value > 0 ? value.toFixed(1) : "—"}
        </div>

        <p className="
            text-[8px]
            uppercase
            text-[#5b21e6]
            sm:text-[9px]
        ">
            {label}
        </p>

    </div>
);

export default HotelPage;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getImageUrl } from "../api";
// import type { Hotel } from "../context/HotelsContext.types";
// import { useHotels } from "../hooks/useHotels.ts";
// import { useAuth } from "../context/useAuth";
// import Stars from "../components/modal/Stars";
// import ReviewList from "../components/reviews/ReviewList";
//
// const HotelPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { loadHotel, addReview } = useHotels();
//     const { isAuth } = useAuth();
//     const [hotel, setHotel] = useState<Hotel | null>(null);
//     const [rating, setRating] = useState(0);
//     const [text, setText] = useState("");
//     const [message, setMessage] = useState("");
//
//     useEffect(() => {
//         if (!id) return;
//         void loadHotel(id).then(setHotel);
//     }, [id]);
//
//     if (!hotel) return <p>Hotel not found.</p>;
//
//     const submitReview = async () => {
//         if (!isAuth) {
//             navigate("/login");
//             return;
//         }
//         if (rating === 0 || !text.trim()) {
//             setMessage("Choose a rating and write a comment.");
//             return;
//         }
//         try {
//             await addReview(hotel.id, rating, text.trim());
//             const updated = await loadHotel(hotel.id);
//             setHotel(updated);
//             setRating(0);
//             setText("");
//             setMessage("Review added.");
//         } catch (error) {
//             setMessage(error instanceof Error ? error.message : "Could not add review.");
//         }
//     };
//
//     return (
//         <div className="hotel-page">
//             <button type="button" onClick={() => navigate(-1)}>Back</button>
//             <h1>{hotel.name}</h1>
//             <p>{hotel.city}, {hotel.country}</p>
//             <Stars value={Math.round(hotel.rating)} />
//             <p>Rating: {hotel.rating > 0 ? hotel.rating.toFixed(1) : "No rating"} ({hotel.reviewsCount} reviews)</p>
//
//             {hotel.mainImageUrl && <img className="hotel-page__image" src={getImageUrl(hotel.mainImageUrl)} alt={hotel.name} />}
//             <h2>Description</h2>
//             <p>{hotel.description || "No description."}</p>
//             <h2>Amenities</h2>
//             <p>{hotel.amenities.length ? hotel.amenities.join(", ") : "No amenities."}</p>
//             <p>Wi-Fi: {hotel.hasWifi === true ? "Yes" : hotel.hasWifi === false ? "No" : "Not specified"}</p>
//
//             <h2>Rooms</h2>
//             {hotel.rooms.length === 0 ? <p>No rooms.</p> : hotel.rooms.map(room => (
//                 <div className="room-card" key={room.id}>
//                     {room.imageUrl && <img className="room-card__image" src={getImageUrl(room.imageUrl)} alt={room.title} />}
//                     <div>
//                         <h3>{room.title}</h3>
//                         <p>{room.bedType}</p>
//                         <p>Capacity: {room.capacity}</p>
//                         <p>{room.pricePerNight} / night</p>
//                         <button className="button" type="button" disabled={!room.isAvailable} onClick={() => navigate(`/booking/${room.id}`)}>
//                             {room.isAvailable ? "Book" : "Not available"}
//                         </button>
//                     </div>
//                 </div>
//             ))}
//
//             <h2>Reviews</h2>
//             <ReviewList reviews={hotel.reviews} />
//             <div className="review-form">
//                 <h3>Leave a review</h3>
//                 {isAuth ? <>
//                     <Stars value={rating} onChange={setRating} />
//                     <textarea value={text} onChange={event => setText(event.target.value)} placeholder="Comment" />
//                     <button type="button" className="button" onClick={submitReview}>Send</button>
//                 </> : <button type="button" className="button" onClick={() => navigate("/login")}>Sign in to review</button>}
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// };
//
// export default HotelPage;
