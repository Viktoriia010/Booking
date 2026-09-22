type HotelFiltersProps = {
    maxPrice: number;
    minRating: number;
    city: string;
    roomType: string;
    wifi: boolean;
    pool: boolean;
    onChange: (data: {
        maxPrice: number;
        minRating: number;
        city: string;
        roomType: string;
        wifi: boolean;
        pool: boolean;
    }) => void;
};

const HotelFilters = ({
                          maxPrice,
                          minRating,
                          city,
                          roomType,
                          wifi,
                          pool,
                          onChange,
                      }: HotelFiltersProps) => {
    return (
        <div className="filters">
            <label>
                Max price
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(event) =>
                        onChange({
                            maxPrice: Number(event.target.value),
                            minRating,
                            city,
                            roomType,
                            wifi,
                            pool,
                        })
                    }
                />
            </label>

            <label>
                Min rating
                <select
                    value={minRating}
                    onChange={(event) =>
                        onChange({
                            maxPrice,
                            minRating: Number(event.target.value),
                            city,
                            roomType,
                            wifi,
                            pool,
                        })
                    }
                >
                    {[0, 1, 2, 3, 4, 5].map(x =>
                        <option key={x} value={x}>{x}</option>
                    )}
                </select>
            </label>

            <input
                value={city}
                onChange={(event) =>
                    onChange({
                        maxPrice,
                        minRating,
                        city: event.target.value,
                        roomType,
                        wifi,
                        pool,
                    })
                }
                placeholder="City"
            />

            <input
                value={roomType}
                onChange={(event) =>
                    onChange({
                        maxPrice,
                        minRating,
                        city,
                        roomType: event.target.value,
                        wifi,
                        pool,
                    })
                }
                placeholder="Room type"
            />

            <label>
                <input
                    type="checkbox"
                    checked={wifi}
                    onChange={(event) =>
                        onChange({
                            maxPrice,
                            minRating,
                            city,
                            roomType,
                            wifi: event.target.checked,
                            pool,
                        })
                    }
                />
                Wi-Fi
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={pool}
                    onChange={(event) =>
                        onChange({
                            maxPrice,
                            minRating,
                            city,
                            roomType,
                            wifi,
                            pool: event.target.checked,
                        })
                    }
                />
                Pool
            </label>
        </div>
    );
};

export default HotelFilters;