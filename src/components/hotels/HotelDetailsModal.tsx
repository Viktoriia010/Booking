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

const HotelDetailsModal = ({
                               hotel,
                               onClose,
                           }: Props) => {
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
        hotels.find((item) => item.id === hotel.id) ||
        hotel;

    const displayedRating =
        rating > 0
            ? rating
            : Math.round(currentHotel.rating);

    const sendReview = async () => {
        if (!isAuth) {
            navigate("/login");
            return;
        }

        if (rating === 0) {
            setMessage("Choose a rating.");
            return;
        }

        if (!text.trim()) {
            setMessage("Write a comment.");
            return;
        }

        setMessage("");

        try {
            await addReview(
                currentHotel.id,
                rating,
                text.trim()
            );

            setRating(0);
            setText("");
            setMessage("Review added successfully.");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Could not add review."
            );
        }
    };

    return (
        <Modal
            open={true}
            closeModal={onClose}
        >
            <div className="max-h-[85vh] overflow-y-auto px-5 pb-6">
                <h2 className="mb-4 text-2xl font-bold text-[#222]">
                    {currentHotel.name}
                </h2>

                {currentHotel.mainImageUrl ? (
                    <img
                        className="mb-4 h-56 w-full rounded-xl object-cover"
                        src={getImageUrl(
                            currentHotel.mainImageUrl
                        )}
                        alt={currentHotel.name}
                    />
                ) : (
                    <div className="mb-4 flex h-56 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                        No hotel image
                    </div>
                )}

                <p className="mb-2 text-gray-600">
                    {currentHotel.city},{" "}
                    {currentHotel.country}
                </p>

                <div className="mb-1 flex items-center gap-3">
                    <Stars
                        value={displayedRating}
                        onChange={
                            isAuth
                                ? setRating
                                : undefined
                        }
                    />

                    <span className="font-semibold">
                        {currentHotel.rating > 0
                            ? currentHotel.rating.toFixed(1)
                            : "No rating"}
                    </span>
                </div>

                <p className="mb-5 text-sm text-gray-500">
                    {currentHotel.reviewsCount} review(s)
                </p>

                <h3 className="mb-2 text-lg font-bold">
                    Description
                </h3>

                <p className="mb-5 text-gray-600">
                    {currentHotel.description ||
                        "No description."}
                </p>

                <h3 className="mb-2 text-lg font-bold">
                    Amenities
                </h3>

                <p className="mb-5 text-gray-600">
                    {currentHotel.amenities.length
                        ? currentHotel.amenities.join(", ")
                        : "No amenities."}
                </p>

                <p className="mb-5 text-gray-600">
                    Wi-Fi:{" "}
                    {currentHotel.hasWifi === true
                        ? "Yes"
                        : currentHotel.hasWifi === false
                            ? "No"
                            : "Not specified"}
                </p>

                {currentHotel.images.length > 1 && (
                    <div className="mb-5 grid grid-cols-2 gap-2">
                        {currentHotel.images.map(
                            (image) => (
                                <img
                                    key={image}
                                    src={getImageUrl(
                                        image
                                    )}
                                    alt={
                                        currentHotel.name
                                    }
                                    className="h-32 w-full rounded-lg object-cover"
                                />
                            )
                        )}
                    </div>
                )}

                <h3 className="mb-3 text-lg font-bold">
                    Rooms
                </h3>

                {currentHotel.rooms.length === 0 ? (
                    <p className="mb-5 text-gray-500">
                        No rooms.
                    </p>
                ) : (
                    <div className="mb-6 space-y-3">
                        {currentHotel.rooms.map(
                            (room) => (
                                <div
                                    className="rounded-xl border border-[#E5E5E5] p-3"
                                    key={room.id}
                                >
                                    <div className="flex gap-3">
                                        {room.imageUrl ? (
                                            <img
                                                className="h-24 w-24 rounded-lg object-cover"
                                                src={getImageUrl(
                                                    room.imageUrl
                                                )}
                                                alt={
                                                    room.title
                                                }
                                            />
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500">
                                                No image
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <h4 className="font-bold">
                                                {room.title}
                                            </h4>

                                            <p className="text-sm text-gray-600">
                                                Bed:{" "}
                                                {room.bedType}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                Capacity:{" "}
                                                {
                                                    room.capacity
                                                }
                                            </p>

                                            <p className="text-sm font-semibold">
                                                {
                                                    room.pricePerNight
                                                }{" "}
                                                / night
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {room.isAvailable
                                                    ? "Available"
                                                    : "Not available"}
                                            </p>
                                        </div>
                                    </div>

                                    {room.isAvailable && (
                                        <button
                                            type="button"
                                            className="button mt-3"
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
                            )
                        )}
                    </div>
                )}

                <h3 className="mb-3 text-lg font-bold">
                    Reviews
                </h3>

                <div className="mb-6 max-h-64 overflow-y-auto rounded-xl border border-[#E5E5E5] p-4">
                    <ReviewList
                        reviews={
                            currentHotel.reviews
                        }
                    />
                </div>

                <div className="rounded-xl border border-[#E5E5E5] p-4">
                    <h3 className="mb-3 text-lg font-bold">
                        Leave a review
                    </h3>

                    {isAuth ? (
                        <>
                            <p className="mb-2 text-sm text-gray-500">
                                Your rating
                            </p>

                            <Stars
                                value={rating}
                                onChange={setRating}
                            />

                            <textarea
                                value={text}
                                onChange={(event) =>
                                    setText(
                                        event.target.value
                                    )
                                }
                                placeholder="Your comment"
                                className="mt-4 min-h-24 w-full resize-none rounded-lg border border-[#DDDDDD] p-3 outline-none focus:border-[#581ADB]"
                            />

                            <button
                                type="button"
                                className="button mt-3"
                                onClick={sendReview}
                            >
                                Send review
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

                    {message && (
                        <p
                            className={`mt-3 text-sm ${
                                message.includes("successfully")
                                    ? "text-green-600"
                                    : "text-red-500"
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default HotelDetailsModal;