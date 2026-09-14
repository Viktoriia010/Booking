import type { Review } from "../../context/HotelsContext.types";
import Stars from "../modal/Stars";

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
    if (reviews.length === 0) {
        return <p>No reviews yet.</p>;
    }

    return (
        <div className="review-list">
            {reviews.map(review => (
                <div className="review" key={review.id}>
                    <strong>{review.authorName}</strong>
                    <Stars value={review.rating} />
                    <p>{review.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;