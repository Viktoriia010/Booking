import { useState } from "react";
import { useNavigate } from "react-router-dom";

const hotelFacilities = {
    "Travel information": [
        "Shuttle service",
        "Additional charge",
        "Grocery deliveries",
        "Minimarket on site",
        "Designated smoking area",
        "Air conditioning",
        "Mosquito net",
        "Wake-up service",
        "Heating",
        "Interconnected room(s) available",
        "Lift",
        "Family rooms",
        "Barber/beauty shop",
        "Airport shuttle",
        "Additional charge",
        "Non-smoking rooms",
        "Wake up service/Alarm clock",
        "Room service",
    ],

    Accessibility: [
        "Upper floors accessible by stairs only",
        "Upper floors accessible by elevator",
    ],

    "Languages spoken": [
        "English",
        "Russian",
        "Ukrainian",
    ],

    Parking: [
        "Parking garage",
    ],

    "Reception services": [
        "Fire extinguishers",
        "CCTV outside property",
        "CCTV in common areas",
        "Smoke alarms",
        "Security alarm",
        "Key card access",
        "24-hour security",
        "Safety deposit box",
    ],

    "Cleaning services": [
        "Daily housekeeping",
        "Laundry",
        "Additional charge",
    ],

    "Entertainment and family services": [
        "Kids' outdoor play equipment",
    ],

    "Safety & security": [
        "Invoice provided",
        "Private check-in/check-out",
        "Concierge service",
        "Luggage storage",
        "Express check-in/check-out",
        "24-hour front desk",
    ],
};

const HotelFacilities = () => {
    const navigate = useNavigate();

    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    const handleFacilityChange = (facility: string) => {
        setSelectedFacilities((current) => {
            if (current.includes(facility)) {
                return current.filter((item) => item !== facility);
            }

            return [...current, facility];
        });
    };

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={() => navigate("/account")}
                className="mb-5 text-[10px] text-[#999]"
            >
                ← Main page
            </button>

            {Object.entries(hotelFacilities).map(
                ([category, facilities]) => (
                    <div key={category} className="mb-8">
                        <h2 className="mb-4 text-xl font-semibold">
                            {category}
                        </h2>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {facilities.map((facility, index) => (
                                <label
                                    key={`${facility}-${index}`}
                                    className="flex cursor-pointer items-center gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedFacilities.includes(
                                            facility
                                        )}
                                        onChange={() =>
                                            handleFacilityChange(
                                                facility
                                            )
                                        }
                                        className="h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 checked:bg-blue-600 checked:ring-2 checked:ring-blue-200"
                                    />

                                    <span className="text-sm text-gray-700">
                                        {facility}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default HotelFacilities;

