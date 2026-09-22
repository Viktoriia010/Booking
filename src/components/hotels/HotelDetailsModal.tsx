import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Hotel } from "../../context/HotelsContext.types";
import { useHotels } from "../../hooks/useHotels.ts";
import { getImageUrl } from "../../api";
import { useAuth } from "../../context/useAuth";
import Modal from "../modal/Modal";
import Stars from "../modal/Stars";
import ReviewList from "../reviews/ReviewList";

type Props = {
    hotel: Hotel | null;
    onClose: () => void;
};

const HotelDetailsModal = ({ hotel, onClose }: Props) => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    const { hotels, addReview } = useHotels();

    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    if (!hotel) {
        return null;
    }

    const currentHotel =
        hotels.find(x => x.id === hotel.id) || hotel;

    const sendReview = async () => {
        if (!isAuth) {
            navigate("/login");
            return;
        }

        if (rating === 0 || !text.trim()) {
            setMessage(
                "Choose a rating and write a comment."
            );
            return;
        }

        try {
            await addReview(
                currentHotel.id,
                rating,
                text.trim()
            );

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
        <Modal open={true} closeModal={onClose}>
            <h2>{currentHotel.name}</h2>

            {currentHotel.mainImageUrl ? (
                <img
                    className="hotel-details__image"
                    src={getImageUrl(
                        currentHotel.mainImageUrl
                    )}
                    alt={currentHotel.name}
                />
            ) : (
                <p>No hotel image.</p>
            )}

            <p>
                {currentHotel.city},{" "}
                {currentHotel.country}
            </p>

            <Stars
                value={Math.round(currentHotel.rating)}
            />

            <p>
                Rating:{" "}
                {currentHotel.rating > 0
                    ? currentHotel.rating.toFixed(1)
                    : "No rating"}{" "}
                ({currentHotel.reviewsCount})
            </p>

            <h3>Description</h3>

            <p>
                {currentHotel.description ||
                    "No description."}
            </p>

            <h3>Amenities</h3>

            <p>
                {currentHotel.amenities.length
                    ? currentHotel.amenities.join(", ")
                    : "No amenities."}
            </p>

            <p>
                Wi-Fi:{" "}
                {currentHotel.hasWifi === true
                    ? "Yes"
                    : currentHotel.hasWifi === false
                        ? "No"
                        : "Not specified"}
            </p>

            {currentHotel.images.length > 1 && (
                <div className="hotel-gallery">
                    {currentHotel.images.map(image => (
                        <img
                            key={image}
                            src={getImageUrl(image)}
                            alt={currentHotel.name}
                        />
                    ))}
                </div>
            )}

            <h3>Rooms</h3>

            {currentHotel.rooms.length === 0 ? (
                <p>No rooms.</p>
            ) : (
                <div className="rooms-list">
                    {currentHotel.rooms.map(room => (
                        <div
                            className="room-card"
                            key={room.id}
                        >
                            {room.imageUrl ? (
                                <img
                                    className="room-card__image"
                                    src={getImageUrl(
                                        room.imageUrl
                                    )}
                                    alt={room.title}
                                />
                            ) : (
                                <div className="room-card__image room-card__image--empty">
                                    No image
                                </div>
                            )}

                            <div className="room-card__content">
                                <h4>{room.title}</h4>

                                <p>
                                    Bed: {room.bedType}
                                </p>

                                <p>
                                    Capacity: {room.capacity}
                                </p>

                                <p>
                                    Price:{" "}
                                    {room.pricePerNight}{" "}
                                    / night
                                </p>

                                <p>
                                    {room.isAvailable
                                        ? "Available"
                                        : "Not available"}
                                </p>

                                {room.isAvailable && (
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() => {
                                            onClose();
                                            navigate(
                                                `/booking/${room.id}`
                                            );
                                        }}
                                    >
                                        Book
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h3>Reviews</h3>

            <ReviewList/>

            <div className="review-form">
                <h3>Leave a review</h3>

                {isAuth ? (
                    <>
                        <Stars
                            value={rating}
                            onChange={setRating}
                        />

                        <textarea
                            value={text}
                            onChange={event =>
                                setText(event.target.value)
                            }
                            placeholder="Your comment"
                        />

                        <button
                            type="button"
                            className="button"
                            onClick={sendReview}
                        >
                            Send
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        className="button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Sign in to review
                    </button>
                )}

                {message && <p>{message}</p>}
            </div>
        </Modal>
    );
};

export default HotelDetailsModal;