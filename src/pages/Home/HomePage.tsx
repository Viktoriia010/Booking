import { useEffect, useMemo, useState } from "react";
import type { Hotel } from "../../context/HotelsContext.types";
import { useHotels } from "../../context/useHotels";
import SearchForm from "../../components/hotels/SearchForm";
import HotelFilters from "../../components/hotels/HotelFilters";
import HotelCard from "../../components/hotels/HotelCard";
import type { SearchData } from "../../context/HotelsContext.types";
import HotelDetailsModal from "../../components/hotels/HotelDetailsModal";

const HomePage = () => {
    const { hotels, loading, error, loadHotels } = useHotels();
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [sort, setSort] = useState("rating");
    const [filters, setFilters] = useState({
        maxPrice: 1000,
        minRating: 0,
        city: "",
        roomType: "",
        wifi: false,
        pool: false,
    });

    useEffect(() => {
        void loadHotels();
    }, []);

    const search = async (data: SearchData) => {
        await loadHotels(data);
    };

    const visibleHotels = useMemo(() => {
        const result = hotels.filter(hotel => {
            const minPrice = hotel.rooms.length > 0
                ? Math.min(...hotel.rooms.map(room => Number(room.pricePerNight)))
                : 0;

            const cityMatch =
                filters.city === "" ||
                hotel.city.toLowerCase().includes(filters.city.toLowerCase());

            const roomMatch =
                filters.roomType === "" ||
                hotel.rooms.some(room =>
                    room.title.toLowerCase().includes(filters.roomType.toLowerCase()) ||
                    room.bedType.toLowerCase().includes(filters.roomType.toLowerCase()));

            const wifiMatch =
                !filters.wifi ||
                hotel.amenities.some(x => x.toLowerCase() === "wi-fi");

            const poolMatch =
                !filters.pool ||
                hotel.amenities.some(x => x.toLowerCase() === "pool");

            return (
                minPrice <= filters.maxPrice &&
                hotel.rating >= filters.minRating &&
                cityMatch &&
                roomMatch &&
                wifiMatch &&
                poolMatch
            );
        });

        if (sort === "price") {
            return result.sort((a, b) => {
                const aPrice = a.rooms.length > 0
                    ? Math.min(...a.rooms.map(room => Number(room.pricePerNight)))
                    : 0;
                const bPrice = b.rooms.length > 0
                    ? Math.min(...b.rooms.map(room => Number(room.pricePerNight)))
                    : 0;

                return aPrice - bPrice;
            });
        }

        if (sort === "name") {
            return result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result.sort((a, b) => b.rating - a.rating);
    }, [hotels, filters, sort]);

    return (
        <div className="home">
            <section className="banner">
                <h1>Find your hotel</h1>
                <SearchForm onSearch={search} />
            </section>

            <section className="advantages">
                <h2>Why choose us</h2>
                <p>Simple booking</p>
                <p>Hotel reviews</p>
                <p>Clear prices</p>
            </section>

            <section className="hotel-search">
                <HotelFilters
                    {...filters}
                    onChange={setFilters}
                />

                <label>
                    Sort
                    <select value={sort} onChange={event => setSort(event.target.value)}>
                        <option value="rating">Rating</option>
                        <option value="price">Price</option>
                        <option value="name">Name</option>
                    </select>
                </label>
            </section>

            <section className="hotels">
                <h2>Hotels</h2>

                {error ? (
                    <p>{error}</p>
                ) : loading ? (
                    <p>Loading...</p>
                ) : visibleHotels.length === 0 ? (
                    <p>No hotels found.</p>
                ) : (
                    <div className="hotel-list">
                        {visibleHotels.map(hotel => (
                            <HotelCard
                                key={hotel.id}
                                hotel={hotel}
                                onChoose={setSelectedHotel}
                            />
                        ))}
                    </div>
                )}
            </section>

            <HotelDetailsModal
                hotel={selectedHotel}
                onClose={() => setSelectedHotel(null)}
            />
        </div>
    );
};

export default HomePage;
