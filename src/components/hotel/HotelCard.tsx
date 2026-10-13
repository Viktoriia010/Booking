import { useState } from "react";
import type { Hotel, HotelFavorite } from "@/context/HotelsContext.types";
import star from "@/assets/like-star.svg";
import starLiked from "@/assets/star-circle-fill.svg";
import starRating from "@/assets/star-rounded.svg";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "@/api.ts";
import { useHotels } from "@/hooks/useHotels";
import RatingCircle from "./RatingCircle.tsx"
const HotelCard = ({ hotel }: { hotel: Hotel | HotelFavorite }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [failedImages, setFailedImages] = useState<string[]>([]);
    const navigate = useNavigate();

    const { favoriteHotelIds, toggleFavorite } = useHotels();
    const liked = favoriteHotelIds.includes(hotel.id);

    const minPrice =
        hotel.rooms.length > 0
            ? Math.min(...hotel.rooms.map((room) => room.pricePerNight))
            : 0;

    const images = [
        ...(hotel.images || []),
        ...(hotel.mainImageUrl &&
        !(hotel.images || []).includes(hotel.mainImageUrl)
            ? [hotel.mainImageUrl]
            : []),
    ]
        .filter((url) => typeof url === "string" && url.trim() !== "")
        .map((url) => getImageUrl(url))
        .filter((url): url is string => Boolean(url));

    const availableImages = images.filter(image => !failedImages.includes(image));
    const imageIndex = availableImages.length > 0
        ? currentImage % availableImages.length
        : 0;

    async function likeProduct(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        try {
            await toggleFavorite(hotel.id);
        } catch (error) {
            console.error("Could not update favorite:", error);
        }
    }

    return (
        <div
            onClick={() => navigate(`/hotel/${hotel.id}`)}
            className="w-full max-w-[272px] cursor-pointer font-['Nunito_Sans'] text-[#222]"
        >
            <div className="group relative aspect-[1/0.9] overflow-hidden rounded-[15px]">
                {availableImages.length > 0 ? (
                    <img
                        key={`${hotel.id}-${availableImages[imageIndex]}`}
                        src={availableImages[imageIndex]}
                        alt={hotel.name}
                        onError={() => setFailedImages(current => [...current, availableImages[imageIndex]])}
                        className="block h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                        No image
                    </div>
                )}

                <button
                    type="button"
                    className="absolute left-2 top-2 cursor-pointer rounded-md p-1"
                    onClick={likeProduct}
                >
                    <img
                        src={liked ? starLiked : star}
                        alt="heart"
                    />
                </button>

                {availableImages.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();

                                setCurrentImage((prev) =>
                                    prev === 0
                                        ? availableImages.length - 1
                                        : prev - 1
                                );
                            }}
                            className="absolute left-2 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-[#222] opacity-0 transition-opacity duration-500 group-hover:opacity-75"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();

                                setCurrentImage((prev) =>
                                    prev === availableImages.length - 1
                                        ? 0
                                        : prev + 1
                                );
                            }}
                            className="absolute right-2 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-[#222] opacity-0 transition-opacity duration-500 group-hover:opacity-75"
                        >
                            ›
                        </button>

                        <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-2">
                            {availableImages.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImage(index);
                                    }}
                                    className={`h-[9px] w-[9px] cursor-pointer rounded-full ${
                                        index === imageIndex
                                            ? "bg-white"
                                            : "bg-white/55"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="mt-1.5 truncate text-[16px] font-medium">
                {hotel.name} | {hotel.city} | {hotel.country}
            </div>

            <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center">
                    {Array.from({ length: hotel.stars }).map((_, index) => (
                        <img
                            key={index}
                            src={starRating}
                            alt="star"
                            className="h-3.5 w-3.5"
                        />
                    ))}
                </div>

                <RatingCircle rating={hotel.rating} />
            </div>

            <div className="text-[16px] text-gray-500">
                {hotel.address}
            </div>

            <div className="text-[16px] font-extrabold">
                ${minPrice} night
            </div>
        </div>
    );
};

export default HotelCard;







