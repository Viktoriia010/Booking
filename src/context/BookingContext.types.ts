import { createContext } from "react";

export type BookingData = {
    firstName: string;
    lastName: string;
    email: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    phone: string;
    travelDetails: string;
    confirmationMethod: string;
};

export type BookingContextType = {
    booking: BookingData;
    updateBooking: (data: Partial<BookingData>) => void;
    clearBooking: () => void;
};

export const BookingContext = createContext<
    BookingContextType | undefined
>(undefined);