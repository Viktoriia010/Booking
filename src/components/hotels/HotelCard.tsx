import { useEffect, useState } from "react";
import type {Hotel,} from "../../context/HotelsContext.types";
import {getImageUrl,} from "../../api";
import RatingCircle from "../hotel/RatingCircle";

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

const getBookedUsers = (
    hotelId: string
): BookedUser[] => {
    const saved =
        JSON.parse(
            localStorage.getItem(
                "hotel_booked_users"
            ) || "[]"
        ) as BookedUser[];

    return saved.filter(
        item =>
            item.hotelId ===
            hotelId
    );
};

const HotelCard = ({
                       hotel,
                       onChoose,
                   }: HotelCardProps) => {
    const [imageError, setImageError] =
        useState(false);

    const [
        bookedUsers,
        setBookedUsers,
    ] = useState<BookedUser[]>(
        () =>
            getBookedUsers(
                hotel.id
            )
    );

    useEffect(() => {
        const update = () => {
            setBookedUsers(
                getBookedUsers(
                    hotel.id
                )
            );
        };

        window.addEventListener(
            "booking-updated",
            update
        );

        return () => {
            window.removeEventListener(
                "booking-updated",
                update
            );
        };
    }, [hotel.id]);
    const hotelStars =
        hotel.stars > 0
            ? Math.round(hotel.stars)
            : Math.round(
                hotel.rating / 2
            );

    const safeStars =
        Math.max(
            0,
            Math.min(
                5,
                hotelStars
            )
        );

    const price =
        hotel.rooms.length > 0
            ? Math.min(
                ...hotel.rooms.map(
                    room =>
                        Number(
                            room.pricePerNight
                        )
                )
            )
            : 0;

    return (
        <article className="w-full overflow-hidden rounded-[16px] border border-[#E7E7E7] bg-white font-['Nunito_Sans'] shadow-[0_4px_18px_rgba(0,0,0,0.03)] transition hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]">
            <button
                type="button"
                className="block w-full text-left"
                onClick={() =>
                    onChoose(hotel)
                }
            >
                <div className="relative aspect-[1.35] overflow-hidden bg-[#F3F3F3]">
                    {hotel.mainImageUrl &&
                    !imageError ? (
                        <img
                            className="h-full w-full object-cover"
                            src={getImageUrl(
                                hotel.mainImageUrl
                            )}
                            alt={
                                hotel.name
                            }
                            onError={() =>
                                setImageError(
                                    true
                                )
                            }
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[#999]">
                            No image
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="truncate text-[17px] font-extrabold text-[#222]">
                                {hotel.name}
                            </h3>

                            <p className="mt-1 truncate text-sm text-[#777]">
                                {hotel.city},{" "}
                                {hotel.country}
                            </p>
                        </div>

                        <RatingCircle
                            rating={
                                hotel.rating
                            }
                        />
                    </div>

                    <div className="mt-3 flex items-center gap-1">
                        {Array.from({
                            length: 5,
                        }).map(
                            (_, index) => (
                                <span
                                    key={
                                        index
                                    }
                                    className={`text-[17px] leading-none ${
                                        index <
                                        safeStars
                                            ? "text-[#581ADB]"
                                            : "text-[#D8D8D8]"
                                    }`}
                                >
                                    ★
                                </span>
                            )
                        )}

                        <span className="ml-2 text-xs text-[#777]">
                            {hotel.reviewsCount}{" "}
                            reviews
                        </span>
                    </div>

                    <p className="mt-3 text-sm text-[#777]">
                        {hotel.rooms.length}{" "}
                        room(s) available
                    </p>

                    {bookedUsers.length >
                        0 && (
                            <p className="mt-1 text-xs text-[#999]">
                                Booked by:{" "}
                                {bookedUsers
                                    .map(
                                        item =>
                                            item.name
                                    )
                                    .join(
                                        ", "
                                    )}
                            </p>
                        )}

                    <div className="mt-4 flex items-center justify-between border-t border-[#EEEEEE] pt-4">
                        <span className="text-sm text-[#777]">
                            From{" "}
                            <strong className="font-extrabold text-[#222]">
                                ${price}
                            </strong>{" "}
                            / night
                        </span>

                        <span className="rounded-full bg-[#581ADB] px-5 py-2 text-xs font-extrabold text-white">
                            Choose
                        </span>
                    </div>
                </div>
            </button>
        </article>
    );
};

export default HotelCard;