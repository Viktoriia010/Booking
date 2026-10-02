import { useState } from "react";
import Review from "@/components/reviews/Review.tsx";
import reviewsDefault from "@/models/reviews.ts";
import type { Review as ReviewType } from "../../context/HotelsContext.types";

type Props = {
    reviews?: ReviewType[];
    hotelName?: string;
};

const ReviewList = ({ reviews, hotelName }: Props) => {
    const reviewsToShow = reviews ?? reviewsDefault;

    const [expanded, setExpanded] = useState(false);

    if (reviewsToShow.length === 0) {
        return <p>No reviews yet.</p>;
    }

    const initialReviews = reviewsToShow.slice(
        0,
        expanded ? reviewsToShow.length : 9
    );

    return (
        <>
            <div
                className="
                    grid
                    grid-cols-1
                    gap-5
                    lg:grid-cols-3
                "
            >
                {initialReviews.map((review, index) => (
                    <div
                        key={review.id}
                        className={`
                            ${!expanded && index >= 3 ? "hidden lg:block" : ""}
                        `}
                    >
                        <Review
                            review={review}
                            hotelName={hotelName}
                            className="w-full min-w-0"
                        />
                    </div>
                ))}
            </div>

            {/* Mobile button */}
            {!expanded && reviewsToShow.length >= 3 && (
                <div className="mt-8 flex justify-center lg:hidden">
                    <button
                        type="button"
                        onClick={() => setExpanded(true)}
                        className="
                rounded-full
                border border-[#DDDDDD]
                px-6 py-1
                text-sm
                text-[#717171]
                transition
                hover:scale-95
                cursor-pointer

            "
                    >
                       Show all reviews
                    </button>
                </div>
            )}

            {/* Desktop button */}
            {!expanded && reviewsToShow.length > 9 && (
                <div className="mt-8 hidden justify-center lg:flex">
                    <button
                        type="button"
                        onClick={() => setExpanded(true)}
                        className="
                rounded-full
                border border-[#DDDDDD]
                px-8 py-3
                text-sm
                text-[#717171]
                transition
                 hover:scale-95
                 cursor-pointer
            "
                    >
                        Show all reviews
                    </button>
                </div>
            )}

        </>
    );
};

export default ReviewList;
