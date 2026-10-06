import Review from "@/components/reviews/Review.tsx";
import reviewsDefault from "@/models/reviews.ts";
import Stars from "../modal/Stars";

import type {Review as ReviewType,} from "../../context/HotelsContext.types";

import RatingCircle from "../hotel/RatingCircle";

type Props = {
    reviews?: ReviewType[];
};

const ReviewList = ({
                        reviews,
                    }: Props) => {
    if (reviews) {
        if (reviews.length === 0) {
            return (
                <p className="text-sm text-gray-500">
                    No reviews yet.
                </p>
            );
        }

        return (
            <div className="space-y-4">
                {reviews.map(
                    review => {
                        const stars =
                            Math.round(
                                review.rating /
                                2
                            );

                        return (
                            <div
                                className="rounded-[14px] border border-[#E5E5E5] bg-white p-4"
                                key={
                                    review.id
                                }
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <strong className="font-bold text-[#222]">
                                        {review.authorName ||
                                            "User"}
                                    </strong>

                                    <div className="flex items-center gap-3">
                                        <Stars
                                            value={
                                                stars
                                            }
                                        />

                                        <RatingCircle
                                            rating={
                                                review.rating
                                            }
                                        />
                                    </div>
                                </div>

                                <p className="mt-3 text-sm leading-6 text-[#303030]">
                                    {
                                        review.text
                                    }
                                </p>

                                <p className="mt-2 text-xs text-gray-400">
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        );
                    }
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-9 overflow-x-auto scrollbar-hide">
            {reviewsDefault.map(
                review => (
                    <Review
                        key={
                            review.id
                        }
                        review={
                            review
                        }
                    />
                )
            )}
        </div>
    );
};

export default ReviewList;