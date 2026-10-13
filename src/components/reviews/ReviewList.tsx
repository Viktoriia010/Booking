import { useState } from "react";
import Review from "@/components/reviews/Review.tsx";
import type { Review as ReviewType } from "../../context/HotelsContext.types";

type Props = {
    reviews: ReviewType[];
    hotelName?: string;
};

const ReviewList = ({ reviews, hotelName }: Props) => {
    const [expanded, setExpanded] = useState(false);

    if (reviews.length === 0) {
        return <p>No reviews yet.</p>;
    }

    const visibleReviews = expanded
        ? reviews
        : reviews.slice(0, 3);

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
                {visibleReviews.map((review) => (
                    <div
                        key={review.id}
                    >
                        <Review
                            review={review}
                            hotelName={hotelName}
                            className="w-full min-w-0"
                        />
                    </div>
                ))}
            </div>

            {!expanded && reviews.length > 3 && (
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setExpanded(true)}
                        className="
                            cursor-pointer
                            rounded-full
                            border border-[#DDDDDD]
                            px-6 py-1
                            text-sm
                            text-[#717171]
                            transition
                            hover:scale-95
                            lg:px-8 lg:py-3
                        "
                    >
                        Show all reviews
                    </button>
                </div>
            )}

            {expanded && reviews.length > 3 && (
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setExpanded(false)}
                        className="
                            cursor-pointer
                            rounded-full
                            border border-[#DDDDDD]
                            px-6 py-1
                            text-sm
                            text-[#717171]
                            transition
                            hover:scale-95
                            lg:px-8 lg:py-3
                        "
                    >
                        Show less
                    </button>
                </div>
            )}
        </>
    );
};


export default ReviewList;


