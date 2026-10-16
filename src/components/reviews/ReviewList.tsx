import { useState } from "react";
import Review from "@/components/reviews/Review.tsx";
// import reviewsDefault from "@/models/reviews.ts";
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
        : reviews.slice(0, 9);

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
                {visibleReviews.map((review, index) => (
                    <div
                        key={review.id}
                        className={
                            !expanded && index >= 3
                                ? "hidden lg:block"
                                : ""
                        }
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
                    <ShowMoreButton
                        onClick={() => setExpanded(true)}
                    />
                </div>
            )}
        </>
    );
};

const ShowMoreButton = ({
                            onClick,
                        }: {
    onClick: () => void;
}) => (
    <button
        type="button"
        onClick={onClick}
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
);

export default ReviewList;


// import Review from "@/components/reviews/Review.tsx";
// import reviewsDefault from "@/models/reviews.ts";
// import Stars from "../modal/Stars";
//
// import type {Review as ReviewType,} from "../../context/HotelsContext.types";
//
// import RatingCircle from "../hotel/RatingCircle";
//
// type Props = {
//     reviews?: ReviewType[];
// };
//
// const ReviewList = ({
//                         reviews,
//                     }: Props) => {
//     if (reviews) {
//         if (reviews.length === 0) {
//             return (
//                 <p className="text-sm text-gray-500">
//                     No reviews yet.
//                 </p>
//             );
//         }
//
//         return (
//             <div className="space-y-4">
//                 {reviews.map(
//                     review => {
//                         const stars =
//                             Math.round(
//                                 review.rating /
//                                 2
//                             );
//
//                         return (
//                             <div
//                                 className="rounded-[14px] border border-[#E5E5E5] bg-white p-4"
//                                 key={
//                                     review.id
//                                 }
//                             >
//                                 <div className="flex items-center justify-between gap-4">
//                                     <strong className="font-bold text-[#222]">
//                                         {review.authorName ||
//                                             "User"}
//                                     </strong>
//
//                                     <div className="flex items-center gap-3">
//                                         <Stars
//                                             value={
//                                                 stars
//                                             }
//                                         />
//
//                                         <RatingCircle
//                                             rating={
//                                                 review.rating
//                                             }
//                                         />
//                                     </div>
//                                 </div>
//
//                                 <p className="mt-3 text-sm leading-6 text-[#303030]">
//                                     {
//                                         review.text
//                                     }
//                                 </p>
//
//                                 <p className="mt-2 text-xs text-gray-400">
//                                     {new Date(
//                                         review.createdAt
//                                     ).toLocaleDateString()}
//                                 </p>
//                             </div>
//                         );
//                     }
//                 )}
//             </div>
//         );
//     }
//
//     return (
//         <div className="flex flex-row gap-9 overflow-x-auto scrollbar-hide">
//             {reviewsDefault.map(
//                 review => (
//                     <Review
//                         key={
//                             review.id
//                         }
//                         review={
//                             review
//                         }
//                     />
//                 )
//             )}
//         </div>
//     );
// };
//
// export default ReviewList;