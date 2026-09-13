import Review from "@/components/reviews/Review.tsx";
import reviews from "@/models/reviews.ts";

const ReviewList = () => {
    return (
        <div className="flex flex-row gap-9 overflow-x-auto scrollbar-hide">
            {reviews.map((review) => (
                <Review
                    key={review.id}
                    review={review}
                />
            ))}
            </div>

    );
};

export default ReviewList;