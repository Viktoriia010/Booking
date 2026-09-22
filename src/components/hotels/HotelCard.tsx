import { useState } from "react";
import type { Hotel } from "../../context/HotelsContext.types";
import { getImageUrl } from "../../api";
import Stars from "../modal/Stars";

type HotelCardProps = {
    hotel: Hotel;
    onChoose: (hotel: Hotel) => void;
};

const HotelCard = ({ hotel, onChoose }: HotelCardProps) => {
    const [imageError, setImageError] = useState(false);

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
                <p>{hotel.city}, {hotel.country}</p>

                <div className="hotel-card__rating">
                    <Stars value={hotel.rating} />
                    <span>
                        {hotel.rating > 0 ? hotel.rating.toFixed(1) : "No rating"}
                    </span>
                    <span>({hotel.reviewsCount})</span>
                </div>

                <p>{hotel.rooms.length} room(s) available</p>

                <div className="hotel-card__bottom">
                    <span>
                        From {hotel.rooms.length > 0
                        ? Math.min(...hotel.rooms.map(x => Number(x.pricePerNight)))
                        : 0} / night
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