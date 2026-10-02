import type { Review as ReviewType } from "@/context/HotelsContext.types";
import { getDaysAgo } from "@/utils/date.ts";

type Props = {
    review: ReviewType;
    hotelName?: string;
    borderColor?: string;
    className?: string;
    textSize?: string;
};

const Review = ({
                    review,
                    hotelName,
                    borderColor,
                    className = "",
                    textSize = "text-[15px]",

                }: Props) => {

    const URL = import.meta.env.VITE_PATH_TO_SERVER;

    const ratingBorderColor =
        review.rating < 5
            ? "#EBAFBA"
            : review.rating > 5 && review.rating <= 6
                ? "#fdc977"
                : "#94D0B4";


    return (
        <div
            className={`h-[208px] w-[368px] min-w-[345px] rounded-[13px] border bg-white px-6 py-5 ${textSize} shadow-[0_4px_15px_rgba(0,0,0,0.06)] font-['Nunito_Sans'] lg:w-full lg:min-w-0 ${className}`}
            style={{
                borderColor: borderColor ?? ratingBorderColor,
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">

                    {review.authorAvatarUrl ? (
                        <img
                            src={ `${URL}${review.authorAvatarUrl}`}
                            alt={review.authorName}
                            className="h-[48px] w-[48px] shrink-0 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-gray-200">
                            <span className="text-gray-500">
                                {review.authorName.charAt(0)}
                            </span>
                        </div>
                    )}

                    <div className="leading-tight">
                        <p className="font-bold text-[#202020]">
                            {review.authorName}
                        </p>

                        {hotelName && (
                            <p className="mt-1 text-[#717171]">
                                {hotelName}
                            </p>
                        )}
                    </div>
                </div>

                <p className="text-[#717171]">
                    {review.createdAt
                        ? getDaysAgo(review.createdAt)
                        : ""}
                </p>
            </div>

            <p className="mt-4 leading-6 text-[#303030]">
                {review.text}
            </p>
        </div>
    );
};

export default Review;
