import type { Hotel } from "@/context/HotelsContext.types";
import HotelCard  from "@/components/hotel/HotelCard.tsx";
// import hotels from "@/models/hotels.ts";

type HotelListProps = {
    hotels: Hotel[];
};

const HotelList = ({ hotels }: HotelListProps) => {
    console.log("HOTEL LIST:", hotels);

    return (
        <div className="grid grid-flow-col grid-rows-2 gap-x-7 gap-y-9 w-max px-3
                            lg:grid-flow-row lg:w-auto
                            lg:grid-cols-4">
            {hotels.map((hotel) => (
                <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                />
            ))}
        </div>
    );
};
export default HotelList;
