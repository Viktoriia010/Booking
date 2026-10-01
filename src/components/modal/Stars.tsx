type StarsProps = {
    value: number;
    onChange?: (value: number) => void;
};

const Stars = ({ value, onChange }: StarsProps) => {
    const clickStar = (star: number) => {
        if (!onChange) {
            return;
        }

        onChange(star);
    };

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`text-xl leading-none transition ${
                        onChange
                            ? "cursor-pointer hover:scale-110"
                            : "cursor-default"
                    } ${
                        star <= value
                            ? "text-[#581ADB]"
                            : "text-gray-300"
                    }`}
                    onClick={() => clickStar(star)}
                    disabled={!onChange}
                    aria-label={`${star} stars`}
                >
                    {star <= value ? "★" : "☆"}
                </button>
            ))}
        </div>
    );
};

export default Stars;