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

const HotelCard = ({ hotel, onChoose }: HotelCardProps) => {
    const [imageError, setImageError] = useState(false);
    const [bookedUsers, setBookedUsers] = useState<BookedUser[]>([]);

    const loadBookedUsers = () => {
        const saved = JSON.parse(
            localStorage.getItem("hotel_booked_users") || "[]"
        ) as BookedUser[];

        setBookedUsers(
            saved.filter(item => item.hotelId === hotel.id)
        );
    };

    useEffect(() => {
        loadBookedUsers();

        const update = () => {
            loadBookedUsers();
        };

        window.addEventListener("booking-updated", update);

        return () => {
            window.removeEventListener("booking-updated", update);
        };
    }, [hotel.id]);

    return (
        <article className="hotel-card">
            {hotel.mainImageUrl && !imageError ? (
                <img
                    className="hotel-card__image"
                    src={getImageUrl(hotel.mainImageUrl)}
                    alt={hotel.name}
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="hotel-card__image hotel-card__image--empty">
                    No image
                </div>
            )}

            <div className="hotel-card__content">
                <h3>{hotel.name}</h3>

                <p>
                    {hotel.city}, {hotel.country}
                </p>

                <div className="hotel-card__rating">
                    <Stars value={hotel.rating} />

                    <span>
                        {hotel.rating > 0
                            ? hotel.rating.toFixed(1)
                            : "No rating"}
                    </span>

                    <span>
                        ({hotel.reviewsCount})
                    </span>
                </div>

                <p>
                    {hotel.rooms.length} room(s) available
                </p>

                {bookedUsers.length > 0 && (
                    <p>
                        Booked by:{" "}
                        {bookedUsers
                            .map(item => item.name)
                            .join(", ")}
                    </p>
                )}

                <div className="hotel-card__bottom">
                    <span>
                        From{" "}
                        {hotel.rooms.length > 0
                            ? Math.min(
                                ...hotel.rooms.map(
                                    x => Number(x.pricePerNight)
                                )
                            )
                            : 0}{" "}
                        / night
                    </span>

                    <button
                        type="button"
                        className="button"
                        onClick={() => onChoose(hotel)}
                    >
                        Choose
                    </button>
                </div>
            </div>
        </article>
    );
};

export default HotelCard;