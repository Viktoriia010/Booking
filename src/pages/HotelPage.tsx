import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../api";
import type { Hotel } from "../context/HotelsContext.types";
import { useHotels } from "../hooks/useHotels.ts";
import { useAuth } from "../context/useAuth";

import starRating from "@/assets/star-rounded.svg";
import ReviewList from "@/components/reviews/ReviewList.tsx";
import Review from "@/components/reviews/Review.tsx";
import RatingItem from "@/components/reviews/RatingItem.tsx";
import RoomCard from "@/components/room/RoomCard.tsx";
import ReviewForm from "@/components/reviews/ReviewForm.tsx";

const HotelPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loadHotel,searchData } = useHotels();
    const { isAuth } = useAuth();

    const [hotel, setHotel] = useState<Hotel | null>(null);


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
                            {Array.from({ length: hotel.stars }).map((_, index) => (
                                <img
                                    key={index}
                                    src={starRating}
                                    alt="star"
                                    className="h-3.5 w-3.5 "
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

                        <hr className="border-[#DDDDDD] mt-6" />
                        {/* REVIEW PREVIEW */}

                        {hotel.reviews.length > 0 && (
                            <Review
                                review={hotel.reviews[0]}
                                hotelName={hotel.name}
                                borderColor="#DDDDDD"
                                textSize="text-[11px]"
                                className="mt-7 h-auto w-full min-w-0 rounded-xl p-4"
                            />
                        )}

                        </div>

                        </section>
                {/* GUEST REVIEWS / RATINGS */}

                <section className="
                mt-10
                pt-8
                lg:mt-9
            ">

                    <h2 className="
                    mb-7
                    text-center
                    text-[13px]
                    uppercase
                    text-[#717171]
                ">
                        Guest reviews
                    </h2>

                    <div className="
                    grid
                    grid-cols-3
                    gap-5
                    sm:grid-cols-5
                    lg:grid-cols-6
                ">

                        <RatingItem
                            value={hotel.facilities}
                            label="Facilities"
                        />

                        <RatingItem
                            value={hotel.staff}
                            label="Staff"
                        />

                        <RatingItem
                            value={hotel.cleanliness}
                            label="Cleanliness"
                        />

                        <RatingItem
                            value={hotel.comfort}
                            label="Comfort"
                        />

                        <RatingItem
                            value={hotel.location}
                            label="Location"
                        />

                        <RatingItem
                            value={hotel.valueForMoney}
                            label="Value for money"
                        />

                    </div>

                </section>


                {/* FACILITIES*/}

                <section className="
                mt-10
                mb-14

            ">

                    <h2 className="
                    mb-7
                    text-center
                   text-[13px]
                    uppercase
                    text-[#717171]
                ">
                        Facilities
                    </h2>

                    <div className="
                    grid
                    ml-4
                    gap-x-7
                    gap-y-5
                    grid-cols-2
                    lg:grid-cols-3
                ">

                        {hotel.amenities.map((amenity) => (
                            <div
                                key={amenity}
                                className="
                                flex items-center gap-1
                            "
                            >

                                <img
                                src="/tick.svg"
                                className="
                                flex h-3 w-3
                                shrink-0
                                items-center justify-center"
                                />

                                <span className="
                                text-[13px]
                                text-[#717171]
                            ">
                                {amenity}
                            </span>
                            </div>
                        ))}

                        {hotel.hasWifi && (
                            <div className="
                            flex items-center gap-1
                        ">
                                <img
                                    src="/tick.svg"
                                    className="
                                flex h-3 w-3
                                shrink-0
                                items-center justify-center"
                                />

                                <span className="
                                text-[13px]
                                   text-[#717171]
                            ">
                                Wi-Fi
                            </span>
                            </div>
                        )}

                    </div>

                </section>


                {/* ROOMS */}
                <section className="mb-16">
                    <div className="mb-6 flex items-center justify-center">
                        <h2 className="text-center text-[13px] uppercase text-[#717171]">
                            Book
                        </h2>
                    </div>

                    {hotel.rooms.length === 0 ? (
                        <div
                            className="
                rounded-2xl
                border border-dashed border-gray-200
                p-10
                text-center
                text-sm
                text-gray-400
            "
                        >
                            No rooms available.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {hotel.rooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                />
                            ))}
                        </div>
                    )}
                </section>


                {/* ALL REVIEWS */}

                <section className="mb-16">

                    <div className="mb-8">
                        <h2 className="
                    text-center
                    text-[13px]
                    uppercase
                    text-[#717171]">
                            Comments
                        </h2>

                    </div>

                    <ReviewList
                        reviews={hotel.reviews}
                        hotelName={hotel.name}
                    />


                    <ReviewForm
                        hotelId={hotel.id}
                        isAuth={isAuth}
                        onSubmitted={async () => {
                            const updated = await loadHotel(hotel.id);

                            if (updated) {
                                setHotel(updated);
                            }
                        }}
                    />

                </section>



</main>
</div>
);
};

export default HotelPage;
// import {useEffect, useState,} from "react";
// import {useNavigate, useParams,} from "react-router-dom";
// import {useHotels,} from "../hooks/useHotels.ts";
// import {getImageUrl,} from "../api";
// import RatingCircle from "../components/hotel/RatingCircle";
// import ReviewList from "../components/reviews/ReviewList";
//
// const HotelPage = () => {
//     const {
//         hotelId,
//     } = useParams();
//
//     const navigate =
//         useNavigate();
//
//     const {
//         loadHotel,
//     } = useHotels();
//
//     const [loading, setLoading] =
//         useState(true);
//
//     const [error, setError] =
//         useState("");
//
//     const [hotel, setHotel] =
//         useState<
//             Awaited<
//                 ReturnType<
//                     typeof loadHotel
//                 >
//             >
//         >(null);
//
//     useEffect(() => {
//         const load = async () => {
//             if (!hotelId) {
//                 setError(
//                     "Hotel not found."
//                 );
//                 setLoading(false);
//                 return;
//             }
//
//             const result =
//                 await loadHotel(
//                     hotelId
//                 );
//
//             if (!result) {
//                 setError(
//                     "Could not load hotel."
//                 );
//             } else {
//                 setHotel(result);
//             }
//
//             setLoading(false);
//         };
//
//         void load();
//     }, [hotelId, loadHotel]);
//
//     if (loading) {
//         return (
//             <div className="flex min-h-screen items-center justify-center font-['Nunito_Sans']">
//                 <p className="text-sm text-[#777]">
//                     Loading hotel...
//                 </p>
//             </div>
//         );
//     }
//
//     if (error || !hotel) {
//         return (
//             <div className="flex min-h-screen flex-col items-center justify-center gap-4 font-['Nunito_Sans']">
//                 <p className="text-red-500">
//                     {error ||
//                         "Something went wrong"}
//                 </p>
//
//                 <button
//                     type="button"
//                     onClick={() =>
//                         navigate("/")
//                     }
//                     className="rounded-full bg-[#581ADB] px-6 py-3 text-sm font-bold text-white"
//                 >
//                     Back to hotels
//                 </button>
//             </div>
//         );
//     }
//
//     const hotelStars =
//         hotel.stars > 0
//             ? Math.round(
//                 hotel.stars
//             )
//             : Math.round(
//                 hotel.rating / 2
//             );
//
//     const scoreItems = [
//         ["Facilities", hotel.facilities],
//         ["Staff", hotel.staff],
//         [
//             "Cleanliness",
//             hotel.cleanliness,
//         ],
//         ["Comfort", hotel.comfort],
//         ["Location", hotel.location],
//         [
//             "Value for money",
//             hotel.valueForMoney,
//         ],
//     ];
//
//     return (
//         <div className="min-h-screen bg-white px-4 py-8 font-['Nunito_Sans'] md:px-8">
//             <div className="mx-auto max-w-[1120px]">
//                 <button
//                     type="button"
//                     onClick={() =>
//                         navigate("/")
//                     }
//                     className="mb-5 text-sm font-bold text-[#581ADB]"
//                 >
//                     ← Back
//                 </button>
//
//                 <div className="flex flex-col gap-3 border-b border-[#EEEEEE] pb-5 md:flex-row md:items-end md:justify-between">
//                     <div>
//                         <div className="flex items-center gap-1">
//                             {Array.from({
//                                 length: 5,
//                             }).map(
//                                 (_, index) => (
//                                     <span
//                                         key={
//                                             index
//                                         }
//                                         className={`text-lg ${
//                                             index <
//                                             hotelStars
//                                                 ? "text-[#581ADB]"
//                                                 : "text-[#D8D8D8]"
//                                         }`}
//                                     >
//                                         ★
//                                     </span>
//                                 )
//                             )}
//                         </div>
//
//                         <h1 className="mt-1 text-3xl font-extrabold text-[#581ADB]">
//                             {hotel.name}
//                         </h1>
//
//                         <p className="text-sm text-[#777]">
//                             {hotel.address ||
//                                 `${hotel.city}, ${hotel.country}`}
//                         </p>
//                     </div>
//
//                     <div className="flex items-center gap-3">
//                         <RatingCircle
//                             rating={
//                                 hotel.rating
//                             }
//                         />
//
//                         <div>
//                             <p className="font-extrabold text-[#581ADB]">
//                                 {hotel.rating >
//                                 0
//                                     ? `${hotel.rating.toFixed(
//                                         1
//                                     )}/10`
//                                     : "No rating"}
//                             </p>
//
//                             <p className="text-xs text-[#999]">
//                                 {
//                                     hotel.reviewsCount
//                                 }{" "}
//                                 reviews
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="mt-6 grid gap-5 lg:grid-cols-[1.45fr_0.8fr]">
//                     <div>
//                         <div className="overflow-hidden rounded-[16px]">
//                             {hotel.mainImageUrl ? (
//                                 <img
//                                     src={getImageUrl(
//                                         hotel.mainImageUrl
//                                     )}
//                                     alt={
//                                         hotel.name
//                                     }
//                                     className="h-[420px] w-full object-cover"
//                                 />
//                             ) : (
//                                 <div className="flex h-[420px] items-center justify-center bg-[#F3F3F3]">
//                                     No image
//                                 </div>
//                             )}
//                         </div>
//
//                         {hotel.images.length >
//                             0 && (
//                                 <div className="mt-3 grid grid-cols-3 gap-3">
//                                     {hotel.images
//                                         .slice(
//                                             0,
//                                             3
//                                         )
//                                         .map(
//                                             image => (
//                                                 <img
//                                                     key={
//                                                         image
//                                                     }
//                                                     src={getImageUrl(
//                                                         image
//                                                     )}
//                                                     alt={
//                                                         hotel.name
//                                                     }
//                                                     className="h-28 w-full rounded-[12px] object-cover"
//                                                 />
//                                             )
//                                         )}
//                                 </div>
//                             )}
//                     </div>
//
//                     <div className="rounded-[16px] border border-[#E5E5E5] p-6">
//                         <h2 className="text-lg font-extrabold text-[#222]">
//                             Hotel information
//                         </h2>
//
//                         <p className="mt-4 leading-6 text-[#666]">
//                             {
//                                 hotel.description
//                             }
//                         </p>
//
//                         <div className="mt-5 space-y-3 text-sm text-[#666]">
//                             <p>
//                                 <strong>
//                                     Type:
//                                 </strong>{" "}
//                                 {
//                                     hotel.hotelType
//                                 }
//                             </p>
//
//                             <p>
//                                 <strong>
//                                     City:
//                                 </strong>{" "}
//                                 {
//                                     hotel.city
//                                 }
//                             </p>
//
//                             <p>
//                                 <strong>
//                                     Country:
//                                 </strong>{" "}
//                                 {
//                                     hotel.country
//                                 }
//                             </p>
//
//                             <p>
//                                 <strong>
//                                     Wi-Fi:
//                                 </strong>{" "}
//                                 {hotel.hasWifi
//                                     ? "Yes"
//                                     : "No"}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//
//                 <section className="mt-8">
//                     <h2 className="text-lg font-extrabold text-[#222]">
//                         Guest reviews
//                     </h2>
//
//                     <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
//                         {scoreItems.map(
//                             ([name, value]) => (
//                                 <div
//                                     key={
//                                         name
//                                     }
//                                     className="flex flex-col items-center rounded-[14px] border border-[#E5E5E5] px-3 py-4"
//                                 >
//                                     <RatingCircle
//                                         rating={
//                                             Number(
//                                                 value
//                                             )
//                                         }
//                                     />
//
//                                     <span className="mt-2 text-center text-[10px] uppercase text-[#581ADB]">
//                                         {name}
//                                     </span>
//                                 </div>
//                             )
//                         )}
//                     </div>
//                 </section>
//
//                 <section className="mt-8">
//                     <h2 className="text-lg font-extrabold text-[#222]">
//                         Amenities
//                     </h2>
//
//                     <p className="mt-3 text-[#666]">
//                         {hotel.amenities
//                             .length
//                             ? hotel.amenities.join(
//                                 ", "
//                             )
//                             : "No amenities."}
//                     </p>
//                 </section>
//
//                 <section className="mt-8">
//                     <h2 className="text-lg font-extrabold text-[#222]">
//                         Rooms
//                     </h2>
//
//                     <div className="mt-4 space-y-3">
//                         {hotel.rooms.map(
//                             room => (
//                                 <div
//                                     key={
//                                         room.id
//                                     }
//                                     className="flex flex-col gap-4 rounded-[16px] border border-[#E5E5E5] p-4 md:flex-row"
//                                 >
//                                     {room.imageUrl ? (
//                                         <img
//                                             src={getImageUrl(
//                                                 room.imageUrl
//                                             )}
//                                             alt={
//                                                 room.title
//                                             }
//                                             className="h-40 w-full rounded-[12px] object-cover md:w-60"
//                                         />
//                                     ) : (
//                                         <div className="flex h-40 w-full items-center justify-center rounded-[12px] bg-[#F3F3F3] md:w-60">
//                                             No image
//                                         </div>
//                                     )}
//
//                                     <div className="flex-1">
//                                         <h3 className="text-lg font-extrabold">
//                                             {
//                                                 room.title
//                                             }
//                                         </h3>
//
//                                         <p className="mt-2 text-sm text-[#777]">
//                                             Bed:{" "}
//                                             {
//                                                 room.bedType
//                                             }
//                                         </p>
//
//                                         <p className="text-sm text-[#777]">
//                                             Capacity:{" "}
//                                             {
//                                                 room.capacity
//                                             }
//                                         </p>
//
//                                         <p className="mt-3 text-xl font-extrabold text-[#581ADB]">
//                                             $
//                                             {
//                                                 room.pricePerNight
//                                             }{" "}
//                                             / night
//                                         </p>
//
//                                         {room.isAvailable && (
//                                             <button
//                                                 type="button"
//                                                 onClick={() =>
//                                                     navigate(
//                                                         `/booking/${room.id}`
//                                                     )
//                                                 }
//                                                 className="mt-4 rounded-full bg-[#581ADB] px-7 py-3 text-sm font-bold text-white"
//                                             >
//                                                 Book
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             )
//                         )}
//                     </div>
//                 </section>
//
//                 <section className="mt-8 pb-10">
//                     <h2 className="mb-4 text-lg font-extrabold text-[#222]">
//                         Reviews
//                     </h2>
//
//                     <ReviewList
//                         reviews={
//                             hotel.reviews
//                         }
//                     />
//                 </section>
//             </div>
//         </div>
//     );
// };
//
// export default HotelPage;