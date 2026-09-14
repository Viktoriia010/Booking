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