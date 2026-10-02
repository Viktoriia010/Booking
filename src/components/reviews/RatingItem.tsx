type RatingItemProps = {
    value: number;
    label: string;
};
const RatingItem = ({ value, label }: RatingItemProps) => {
    const percentage = Math.min(Math.max(value / 10, 0), 1);
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage);

    return (
        <div className="text-center">
            <div className="relative mx-auto mb-3 h-[64px] w-[64px]">
                <svg
                    className="h-full w-full -rotate-90"
                    viewBox="0 0 64 64"
                >
                    {/* Фонове коло */}
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                    />

                    {/* Рейтинг */}
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="#5b21e6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>

                {/* Число */}
                <div className="
                    absolute inset-0
                    flex items-center justify-center
                    text-[18px]
                    font-medium
                    text-[#5b21e6]
                    md:text-[20px]
                ">
                    {value > 0 ? value.toFixed(1) : "—"}
                </div>
            </div>

            <p className="
                text-[8px]
                uppercase
                text-[#5b21e6]
                sm:text-[12px]
            ">
                {label}
            </p>
        </div>
    );
};

export default RatingItem;