import { createContext } from "react";

export type Room = {
    id: string;
    hotelId: string;
    title: string;
    bedType: string;
    capacity: number;
    pricePerNight: number;
    imageUrl: string;
    isAvailable: boolean;
};

export type Review = {
    id: string;
    hotelId: string;
    authorName: string;
    rating: number;
    text: string;
    createdAt?: string;
};

export type Hotel = {
    id: string;
    name: string;
    city: string;
    country: string;
    description: string;
    rating: number;
    reviewsCount: number;
    mainImageUrl: string;
    images: string[];
    amenities: string[];
    hasWifi: boolean | null;
    rooms: Room[];
    reviews: Review[];
};

export type SearchData = {
    search: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
};

export type HotelsContextType = {
    hotels: Hotel[];
    selectedHotel: Hotel | null;
    setSelectedHotel: React.Dispatch<
        React.SetStateAction<Hotel | null>
    >;
    loading: boolean;
    error: string;
    loadHotels: (searchData?: SearchData) => Promise<void>;
    loadHotel: (id: string) => Promise<Hotel | null>;
    addReview: (
        hotelId: string,
        rating: number,
        text: string
    ) => Promise<void>;
};

export const HotelsContext = createContext<
    HotelsContextType | undefined
>(undefined);