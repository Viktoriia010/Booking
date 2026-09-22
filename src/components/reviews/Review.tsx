import type { ReviewType } from "@/types/ReviewType.ts";

//достилізувати

const Review = ({ review }: { review: ReviewType }) => {
    const getDaysAgo = (date: Date) => {
        const now = new Date();
        const difference = now.getTime() - date.getTime();

        return Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );
    };

    return (
        <div className="h-[208px] w-[368px] min-w-[368px] rounded-[13px] border border-[#94D0B4] bg-white px-6 py-5 text-[15px] shadow-[0_4px_15px_rgba(0,0,0,0.06)] font-['Nunito_Sans'] lg:w-full lg:min-w-0">

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={review.userImage}
                        alt={review.username}
                        className="h-[48px] w-[48px] shrink-0 rounded-full object-cover"
                    />

                    <div className="leading-tight">
                        <p className=" font-bold text-[#202020]">
                            {review.username}
                        </p>

                        <p className="mt-1 text-[#717171]">
                            {review.hotelName}
                        </p>
                    </div>
                </div>

                <p className="text-[#717171]">
                    {getDaysAgo(review.date)} days ago
                </p>
            </div>

            <p className="mt-4  leading-6 text-[#303030]">
                {review.text}
            </p>
        </div>
    );
};

export default Review;