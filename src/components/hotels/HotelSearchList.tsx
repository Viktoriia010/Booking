import type { Hotel } from "@/context/HotelsContext.types";
import HotelSearchCard from "@/components/hotels/HotelSearchCard.tsx";

type HotelListProps = {
    hotels: Hotel[];
};

const HotelSearchList = ({ hotels }: HotelListProps) => {
    console.log("HOTEL LIST:", hotels);

    return (
        <div className="flex flex-col gap-x-7 gap-y-9 w-max px-3
                        ">
            {hotels.map((hotel) => (
                <HotelSearchCard
                    key={hotel.id}
                    hotel={hotel}
                />
            ))}
        </div>
    );
};

export default HotelSearchList;