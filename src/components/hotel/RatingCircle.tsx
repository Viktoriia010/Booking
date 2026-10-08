type RatingCircleProps = {
    rating: number;
};

const RatingCircle = ({
                          rating,
                      }: RatingCircleProps) => {
    const safeRating = Math.max(
        0,
        Math.min(10, rating)
    );

    const radius = 16;
    const circumference =
        2 * Math.PI * radius;

    const progress =
        (safeRating / 10) *
        circumference;

    const offset =
        circumference - progress;

    return (
        <div className="relative h-10 w-10 shrink-0">
            <svg
                className="h-10 w-10 -rotate-90"
                viewBox="0 0 40 40"
            >
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="1.4"
                />

                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="none"
                    stroke="#581ADB"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>

            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-[#581ADB]">
                {safeRating > 0
                    ? safeRating.toFixed(1)
                    : "—"}
            </span>
        </div>
    );
};

export default RatingCircle;