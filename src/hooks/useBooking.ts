import { useContext } from "react";
import { BookingContext } from "../context/BookingContext.types.ts";

export const useBooking = () => {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error("useBooking must be used inside BookingProvider");
    }

    return context;
};