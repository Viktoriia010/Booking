import Review from "@/components/reviews/Review.tsx";
import reviewsDefault from "@/models/reviews.ts";
import Stars from "../modal/Stars";
import type { Review as ReviewType } from "../../context/HotelsContext.types";

type Props = {
    reviews?: ReviewType[];
};

const ReviewList = ({ reviews }: Props) => {
    if (reviews) {
        if (reviews.length === 0) return <p>No reviews yet.</p>;
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
    }

    return (
        <div className="flex flex-row gap-9 overflow-x-auto scrollbar-hide">
            {reviewsDefault.map((review) => (
                <Review key={review.id} review={review} />
            ))}
        </div>
    );
};

export default ReviewList;

// import type { Review } from "../../context/HotelsContext.types";
// import Stars from "../modal/Stars";
//
// const ReviewList = ({ reviews }: { reviews: Review[] }) => {
//     if (reviews.length === 0) {
//         return <p>No reviews yet.</p>;
//     }
//
//     return (
//         <div className="review-list">
//             {reviews.map(review => (
//                 <div className="review" key={review.id}>
//                     <strong>{review.authorName}</strong>
//                     <Stars value={review.rating} />
//                     <p>{review.text}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default ReviewList;