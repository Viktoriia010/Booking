import { useState, type ReactNode } from "react";
import {
    BookingContext,
    type BookingData,
} from "./BookingContext.types";

const defaultBooking: BookingData = {
    firstName: "",
    lastName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    phone: "",
    travelDetails: "",
    confirmationMethod: "email",
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
    const [booking, setBooking] = useState<BookingData>(defaultBooking);

    const updateBooking = (data: Partial<BookingData>) => {
        setBooking(current => ({
            ...current,
            ...data,
        }));
    };

    const clearBooking = () => {
        setBooking(defaultBooking);
    };

    return (
        <BookingContext.Provider
            value={{
                booking,
                updateBooking,
                clearBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};