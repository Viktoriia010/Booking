import { createContext } from "react";

export type Room = {
    id: string;
    hotelId: string;
    title: string;
    bedType: string;
    capacity: number;
    pricePerNight: number;
    isAvailable: boolean;
    imageUrl: string;
};

export type Review = {
    id: string;
    userId: string;
    hotelId: string;
    rating: number;
    text: string;
    authorName: string | null;
    authorAvatarUrl?: string | null;
    createdAt: string;
};

export type Hotel = {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    description: string;
    stars: number;
    hotelType: string;
    hotelChain: string;
    attractions: string;
    latitude: number;
    longitude: number;
    mapUrl: string;
    isPopular: boolean;
    isCityCentre: boolean;
    isPopularPlace: boolean;
    nearMetro: boolean;
    nearAirport: boolean;
    nearStation: boolean;
    facilities: number;
    staff: number;
    cleanliness: number;
    comfort: number;
    location: number;
    valueForMoney: number;
    rating: number;
    reviewsCount: number;
    mainImageUrl: string;
    images: string[];
    rooms: Room[];
    amenities: string[];
    hasWifi: boolean | null;
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

export type HotelsResponse = {
    totalCount: number;
    hotels: Hotel[];
};

export type HotelsContextType = {
    hotels: Hotel[];
    loading: boolean;
    error: string;
    loadHotels: (data?: SearchData) => Promise<void>;
    loadHotel: (id: string) => Promise<Hotel | null>;
    addReview: (
        hotelId: string,
        rating: number,
        text: string
    ) => Promise<void>;
};

export const HotelsContext =
    createContext<HotelsContextType | null>(null);