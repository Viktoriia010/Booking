import { useEffect, useState } from "react";
import type { Hotel } from "../../context/HotelsContext.types";
import { getImageUrl } from "../../api";
import Stars from "../modal/Stars";

type HotelCardProps = {
    hotel: Hotel;
    onChoose: (hotel: Hotel) => void;
};

type BookedUser = {
    hotelId: string;
    userId: string;
    name: string;
    email: string;
};

const getBookedUsers = (hotelId: string): BookedUser[] => {
    const saved = JSON.parse(
        localStorage.getItem("hotel_booked_users") || "[]"
    ) as BookedUser[];

    return saved.filter((item) => item.hotelId === hotelId);
};

const HotelCard = ({ hotel, onChoose }: HotelCardProps) => {
    const [imageError, setImageError] = useState(false);
    const [bookedUsers, setBookedUsers] = useState<BookedUser[]>(() =>
        getBookedUsers(hotel.id)
    );

    useEffect(() => {
        const update = () => setBookedUsers(getBookedUsers(hotel.id));
        window.addEventListener("booking-updated", update);
        return () => window.removeEventListener("booking-updated", update);
    }, [hotel.id]);

    const minPrice =
        hotel.rooms.length > 0
            ? Math.min(...hotel.rooms.map((x) => Number(x.pricePerNight)))
            : 0;

    return (
        <article className="flex flex-col overflow-hidden rounded-[20px] border border-[#EEEEEE] bg-white transition hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:flex-row">

            <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-neutral-100 sm:h-auto sm:w-[280px]">
                {hotel.mainImageUrl && !imageError ? (
                    <img
                        src={getImageUrl(hotel.mainImageUrl)}
                        alt={hotel.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex h-full min-h-[220px] w-full items-center justify-center text-sm text-neutral-400">
                        No image
                    </div>
                )}
            </div>


            <div className="flex flex-1 flex-col p-5 font-['Nunito_Sans']">
                <h3 className="text-[18px] font-bold text-black">
                    {hotel.name}
                </h3>

                <div className="mt-1 flex items-center gap-2">
                    <Stars value={Math.round(hotel.rating)} />
                </div>

                {hotel.amenities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 rounded-full border border-[#EEEEEE] px-3 py-1 text-[11px] text-[#717171]"
                            >
                                ✦ {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-4 text-[12px] text-[#717171]">
                    <span>airport 3.5км</span>
                    <span>railway station 4.2км</span>
                </div>

                <button
                    type="button"
                    className="mt-2 w-fit text-[12px] font-semibold text-[#581ADB] hover:underline"
                >
                    see on the map →
                </button>

                {hotel.description && (
                    <p className="mt-3 text-[13px] leading-5 text-[#717171] line-clamp-3">
                        {hotel.description}
                    </p>
                )}

                {bookedUsers.length > 0 && (
                    <p className="mt-2 text-[11px] text-[#581ADB]">
                        Booked by: {bookedUsers.map((b) => b.name).join(", ")}
                    </p>
                )}
            </div>


            <div className="flex shrink-0 flex-col items-end justify-between p-5 sm:w-[160px]">
                <div className="flex items-center gap-2">
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#581ADB] text-[15px] font-bold text-[#581ADB]">
                        {hotel.rating > 0 ? hotel.rating.toFixed(1) : "—"}
                    </div>
                    <div className="text-[10px] leading-tight text-[#717171]">
                        <p>reviews</p>
                        <p className="font-semibold text-black">
                            {hotel.reviewsCount}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-end">
                    <p className="text-[11px] text-[#717171]">prices from</p>
                    <p className="text-[22px] font-bold text-[#581ADB]">
                        {minPrice}$
                    </p>

                    <button
                        type="button"
                        onClick={() => onChoose(hotel)}
                        className="mt-2 cursor-pointer rounded-full bg-[#581ADB] px-6 py-2 text-[12px] font-bold uppercase tracking-wide text-white transition hover:bg-violet-800 active:scale-[0.98]"
                    >
                        Choose
                    </button>
                </div>
            </div>
        </article>
    );
};

export default HotelCard;