import Hotel from "@/components/hotel/Hotel.tsx";
import hotels from "@/models/hotels.ts";

const HotelList = () => {
    return (
        <div className="overflow-x-auto">
            <div className="grid grid-flow-col grid-rows-2 gap-x-7 gap-y-9 w-max px-3
                            lg:grid-flow-row lg:w-auto
                            lg:grid-cols-4">
                {hotels.map((hotel) => (
                    <Hotel
                        key={hotel.id}
                        hotel={hotel}
                    />
                ))}
            </div>
        </div>
    );
};

export default HotelList;