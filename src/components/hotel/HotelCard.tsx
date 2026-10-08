import { useState} from "react";
import type {Hotel, HotelFavorite} from "@/context/HotelsContext.types";
import star from "@/assets/like-star.svg"
import starLiked from "@/assets/star-circle-fill.svg"
import starRating from "@/assets/star-rounded.svg"
import {useNavigate} from "react-router-dom";
import {getImageUrl} from "@/api.ts";



const HotelCard = ({ hotel }: { hotel: Hotel | HotelFavorite}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();
    const [liked, setLiked] = useState(() => {
        const selected = JSON.parse(
            localStorage.getItem("likedHotels") || "[]"
        );

        return selected.includes(hotel.id);
    });

    const minPrice = hotel.rooms.length > 0
        ? Math.min(
            ...hotel.rooms.map(room => room.pricePerNight)
        )
        : 0;

    function likeProduct(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        const selected = JSON.parse(
            localStorage.getItem("likedHotels") || "[]"
        );

        const newLiked = !liked;

        setLiked(newLiked);

        if (newLiked) {
            selected.push(hotel.id);
            localStorage.setItem(
                "likedHotels",
                JSON.stringify(selected)
            );
        } else {
            const updated = selected.filter(
                (id: string) => id !== hotel.id
            );

            localStorage.setItem(
                "likedHotels",
                JSON.stringify(updated)
            );
        }
    }



    return (
        <div onClick={() => navigate(`/hotel/${hotel.id}`)} className="w-full max-w-[272px] text-[#222] font-['Nunito_Sans'] cursor-pointer">

            <div className="group  relative aspect-[1/0.9] overflow-hidden rounded-[15px]">

                <img
                    src={
                        hotel.images.length > 0
                            ? getImageUrl(hotel.images[currentImage])
                            : getImageUrl(hotel.mainImageUrl)
                    }
                    alt={hotel.name}
                    className="block h-full w-full object-cover"
                />

                <button
                    type="button"
                    className="absolute left-2 top-2 p-1 cursor-pointer rounded-md"
                    onClick={likeProduct}
                >
                    <img
                        src={liked ? starLiked : star}
                        alt="heart"
                    />
                </button>

                {/*{hotel.images.length > 1 && (*/}
                {/*    <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-2">*/}
                {/*        {hotel.images.map((_, index) => (*/}
                {/*            <button*/}
                {/*                key={index}*/}
                {/*                type="button"*/}
                {/*                onClick={(e) => changeImage(e, index)}*/}
                {/*                className={`h-[9px] w-[9px] rounded-full ${*/}
                {/*                    index === currentImage*/}
                {/*                        ? "bg-white"*/}
                {/*                        : "bg-white/55"*/}
                {/*                }`}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*)}*/}

                {/* Previous image */}
                {hotel.images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();

                                setCurrentImage((prev) =>
                                    prev === 0
                                        ? hotel.images.length - 1
                                        : prev - 1
                                );
                            }}
                            className="
                    absolute left-2 top-1/2 z-10
                    flex h-6 w-6 -translate-y-1/2
                    items-center justify-center
                    rounded-full bg-white/90
                    text-xl text-[#222]
                    duration-500
                    opacity-0 transition-opacity
                    group-hover:opacity-75
                    cursor-pointer
                "
                        >
                            ‹
                        </button>

                        {/* Next image */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();

                                setCurrentImage((prev) =>
                                    prev === hotel.images.length - 1
                                        ? 0
                                        : prev + 1
                                );
                            }}
                            className="
                    absolute right-2 top-1/2 z-10
                    flex h-6 w-6 -translate-y-1/2
                    items-center justify-center
                    rounded-full bg-white/90
                    text-xl text-[#222]
                    opacity-0 transition-opacity
                    duration-500
                    group-hover:opacity-75
                    cursor-pointer
                "
                        >
                            ›
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-2">
                            {hotel.images.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImage(index);
                                    }}
                                    className={`h-[9px] w-[9px] cursor-pointer rounded-full ${
                                        index === currentImage
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

            <div className="flex items-center">
                {Array.from({ length: hotel.stars }).map((_, index) => (
                    <img
                        key={index}
                        src={starRating}
                        alt="star"
                        className="h-3.5 w-3.5"
                    />
                ))}

                <span className="ml-1">
                    {hotel.rating.toFixed(1)}
                </span>
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