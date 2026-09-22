type StarsProps = {
    value: number;
    onChange?: (value: number) => void;
};

const Stars = ({ value, onChange }: StarsProps) => {
    const clickStar = (star: number) => {
        if (!onChange) {
            return;
        }

        if (star === value) {
            onChange(0);
            return;
        }

        onChange(star);
    };

    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={star <= value ? "star active" : "star"}
                    onClick={() => clickStar(star)}
                    disabled={!onChange}
                >
                    {star <= value ? "★" : "☆"}
                </button>
            ))}
        </div>
    );
};

export default Stars;