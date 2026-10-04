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
    authorAvatarUrl?: string;
    rating: number;
    facilities: number;
    staff: number;
    cleanliness: number;
    comfort: number;
    location: number;
    valueForMoney: number;
    text: string;
    createdAt?: string;
};

export type RatingFilter = {
    minRating: number;
    count: number;
};

export type StarsFilter = {
    stars: number;
    count: number;
};

export type HotelTypeFilter = {
    type: string;
    count: number;
};

export type ChainFilter = {
    id: number;
    name: string;
    count: number;
};

export type AmenityFilter = {
    name: string;
    count: number;
};

export type HotelSearchResult = {
    hotels: Hotel[];
    total: number;
    page: number;
    pageSize: number;
};

export type HotelFiltersResponse = {
    ratings: RatingFilter[];
    stars: StarsFilter[];
    types: HotelTypeFilter[];
    chains: ChainFilter[];
    amenities: AmenityFilter[];
};

export type HotelFilters = {
    minRating?: number;
    stars?: number;
    types?: string[];
    chainIds?: number[];
    amenities?: string[];
    sort?: string;

    page?: number;
    pageSize?: number;
};

export type SearchData = {
    search: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;

    minRating?: number;
    stars?: number;
    types?: string[];
    chainIds?: number[];
    amenities?: string[];

    sort?: "rating" | "price-asc" | "price-desc";

    page?: number;
    pageSize?: number;
};

export type Hotel = {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    description: string;
    type: string;
    stars: number;
    rating: number;
    reviewsCount: number;
    facilities: number;
    staff: number;
    cleanliness: number;
    comfort: number;
    location: number;
    valueForMoney: number;
    mainImageUrl: string;
    images: string[];
    amenities: string[];
    hasWifi: boolean | null;
    rooms: Room[];
    reviews: Review[];
};

// export type SearchData = {
//     search: string;
//     checkIn: string;
//     checkOut: string;
//     adults: number;
//     children: number;
//     rooms: number;
// };

export type HotelsContextType = {
    hotels: Hotel[];
    selectedHotel: Hotel | null;
    setSelectedHotel: React.Dispatch<
        React.SetStateAction<Hotel | null>
    >;

    searchData: SearchData | null;

    filters: HotelFiltersResponse | null;

    total: number;
    page: number;
    pageSize: number;

    loading: boolean;
    error: string;

    loadHotels: (
        searchData?: SearchData
    ) => Promise<void>;

    loadFilters: (
        searchData?: SearchData
    ) => Promise<void>;

    loadHotel: (
        id: string
    ) => Promise<Hotel | null>;

    loadRandomHotels: () => Promise<void>;

    addReview: (
        hotelId: string,
        facilities: number,
        staff: number,
        cleanliness: number,
        comfort: number,
        location: number,
        valueForMoney: number,
        text: string
    ) => Promise<void>;
};


export const HotelsContext = createContext<
    HotelsContextType | undefined
>(undefined);