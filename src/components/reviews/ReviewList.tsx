import Review from "@/components/reviews/Review.tsx";
import reviewsDefault from "@/models/reviews.ts";
import Stars from "../modal/Stars";
import type { Review as ReviewType } from "../../context/HotelsContext.types";

type Props = {
    reviews?: ReviewType[];
};

const ReviewList = ({ reviews }: Props) => {
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
                {reviews.map((review) => (
                    <div
                        className="rounded-xl border border-[#E5E5E5] p-4"
                        key={review.id}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <strong>
                                {review.authorName}
                            </strong>

                            <Stars
                                value={review.rating}
                            />
                        </div>

                        <p className="mt-2 text-sm leading-6 text-[#303030]">
                            {review.text}
                        </p>

                        {review.createdAt && (
                            <p className="mt-2 text-xs text-gray-400">
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-9 overflow-x-auto scrollbar-hide">
            {reviewsDefault.map((review) => (
                <Review
                    key={review.id}
                    review={review}
                />
            ))}
        </div>
    );
};

export default ReviewList;