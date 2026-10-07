import type { Hotel } from "@/context/HotelsContext.types";
import HotelSearchCard from "@/components/hotels/HotelSearchCard.tsx";

type HotelListProps = {
    hotels: Hotel[];
    onChoose?: (hotel: Hotel) => void;
};

const HotelSearchList = ({ hotels, onChoose }: HotelListProps) => {
    console.log("HOTEL LIST:", hotels);

    return (
        <div className="grid grid-flow-col grid-rows-2 gap-x-7 gap-y-9 w-max px-3
                        lg:grid-flow-row lg:w-auto
                        lg:grid-cols-4">
            {hotels.map((hotel) => (
                <HotelSearchCard
                    key={hotel.id}
                    hotel={hotel}
                    onChoose={(hotel) => onChoose?.(hotel)}
                />
            ))}
        </div>
    );
};

export default HotelSearchList;