import { useState } from "react";
import type { HotelType } from "@/types/HotelType.ts";
import star from "@/assets/like-star.svg"
import starLiked from "@/assets/star-circle-fill.svg"
import starRating from "@/assets/star-rounded.svg"

const Hotel = ({ hotel }: { hotel: HotelType }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const[liked, setLiked] = useState(() => {
        const selected = JSON.parse(
            localStorage.getItem("selected") || "[]"
        );

        return selected.includes(hotel.id);
    });


    function likeProduct(){
        const selected = JSON.parse(localStorage.getItem(`selected`)||"[]")

        const newLiked = !liked;
        setLiked(newLiked);

        if (newLiked) {
            selected.push(hotel.id);
        } else {
            const updated = selected.filter((id: string) => id !== hotel.id);

            localStorage.setItem("selected", JSON.stringify(updated));
            return;
        }

        localStorage.setItem("selected", JSON.stringify(selected));
    }

    return (
        <div className="w-full max-w-[272px] text-[#222] font-['Nunito_Sans'] cursor-pointer">

            {/* Image */}
            <div className="relative aspect-[1/0.9] overflow-hidden rounded-[15px]">
                <img
                    src={hotel.images[currentImage]}
                    alt={hotel.name}
                    className="block h-full w-full object-cover"
                />

                {/* Favorite */}
                <button
                    type="button"
                    className="absolute left-2 top-2 p-1 cursor-pointer rounded-md"
                    onClick={likeProduct}
                >
                    <img src={liked? starLiked:star} alt="heart"/>
                </button>


                {/* Slider dots */}
                {hotel.images.length > 1 && (
                    <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-2">
                        {hotel.images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentImage(index)}
                                className={`h-[9px] w-[9px] rounded-full ${
                                    index === currentImage
                                        ? "bg-white"
                                        : "bg-white/55"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Hotel name */}
            <div className="mt-1.5 truncate text-[16px] font-medium">
                {hotel.name} | {hotel.city} | {hotel.country}
            </div>

            {/* Rating */}
            <div className=" flex items-center ">
                {Array.from({ length: 5 }).map((_, index) => (
                    <img
                        key={index}
                        src={starRating}
                        alt="star"
                        className={`h-3.5 w-3.5 ${
                            index < hotel.rating / 2
                                ? "opacity-100"
                                : "opacity-30"
                        }`}
                    />
                ))}
            </div>

            {/* Location */}
            <div className=" text-[16px] text-gray-500">
                the city center · 116 m
            </div>

            {/* Price */}
            <div className="text-[16px] font-extrabold">
                ${hotel.price}{" "}

                    night

            </div>
        </div>
    );
};

export default Hotel;