import { useState } from "react";
import {
    HotelsContext,
    type Hotel,
    type SearchData, type HotelSearchResult, type HotelFiltersResponse,
} from "./HotelsContext.types";
import { apiFetch, readError } from "../api";

export function HotelsProvider({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchData, setSearchData] =  useState<SearchData | null>(null);
    const [filters, setFilters] = useState<HotelFiltersResponse | null>(null);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);


    const loadRandomHotels = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await apiFetch("/Hotel/random");

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            const data = await response.json() as Hotel[];

            setHotels(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not load hotels"
            );
        } finally {
            setLoading(false);
        }
    };

    const loadHotels = async (searchData?: SearchData) => {
        setLoading(true);
        setError("");
        if (searchData) {
            setSearchData(searchData);
        }

        try {
            const params = new URLSearchParams();

            if (searchData?.search) {
                params.append("search", searchData.search);
            }

            params.append(
                "adults",
                String(searchData?.adults ?? 0)
            );

            params.append(
                "children",
                String(searchData?.children ?? 0)
            );

            params.append(
                "rooms",
                String(searchData?.rooms ?? 0)
            );

            if (searchData?.checkIn) {
                params.append("checkIn", searchData.checkIn);
            }

            if (searchData?.checkOut) {
                params.append("checkOut", searchData.checkOut);
            }

            if (searchData?.minRating !== undefined) {
                params.append(
                    "minRating",
                    String(searchData.minRating)
                );
            }

            if (searchData?.stars !== undefined) {
                params.append(
                    "stars",
                    String(searchData.stars)
                );
            }

            if (searchData?.types?.length) {
                searchData.types.forEach(type => {
                    params.append("types", type);
                });
            }

            if (searchData?.chainIds?.length) {
                searchData.chainIds.forEach(id => {
                    params.append("chainIds", String(id));
                });
            }

            if (searchData?.amenities?.length) {
                searchData.amenities.forEach(amenity => {
                    params.append("amenities", amenity);
                });
            }

            if (searchData?.sort) {
                params.append("sort", searchData.sort);
            }

            params.append(
                "page",
                String(searchData?.page ?? 1)
            );

            params.append(
                "pageSize",
                String(searchData?.pageSize ?? 20)
            );

            const response = await apiFetch(
                `/Hotel?${params.toString()}`
            );

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            const data = await response.json() as HotelSearchResult;

            setHotels(data.hotels);
            setTotal(data.total);
            setPage(data.page);
            setPageSize(data.pageSize);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not load hotels"
            );
        } finally {
            setLoading(false);
        }
    };

    const loadFilters = async (searchData?: SearchData) => {
        setError("");

        try {
            const params = new URLSearchParams();

            if (searchData?.search) {
                params.append("search", searchData.search);
            }

            params.append(
                "adults",
                String(searchData?.adults ?? 0)
            );

            params.append(
                "children",
                String(searchData?.children ?? 0)
            );

            params.append(
                "rooms",
                String(searchData?.rooms ?? 0)
            );

            if (searchData?.checkIn) {
                params.append("checkIn", searchData.checkIn);
            }

            if (searchData?.checkOut) {
                params.append("checkOut", searchData.checkOut);
            }

            const response = await apiFetch(
                `/Hotel/filters?${params.toString()}`
            );

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            const data =
                await response.json() as HotelFiltersResponse;

            setFilters(data);

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not load filters"
            );
        }
    };


    const loadHotel = async (id: string) => {
        const response = await apiFetch(`/Hotel/${id}`);

        if (!response.ok) {
            return null;
        }

        return await response.json() as Hotel;
    };

    const addReview = async (
        hotelId: string,
        facilities: number,
        staff: number,
        cleanliness: number,
        comfort: number,
        location: number,
        valueForMoney: number,
        text: string
    ) => {
        const response = await apiFetch("/Review", {
            method: "POST",
            body: JSON.stringify({
                hotelId,
                facilities,
                staff,
                cleanliness,
                comfort,
                location,
                valueForMoney,
                text,
            }),
        });

        if (!response.ok) {
            throw new Error(await readError(response));
        }

        const updatedHotel = await loadHotel(hotelId);

        if (updatedHotel) {
            setHotels((current) =>
                current.map((hotel) =>
                    hotel.id === hotelId
                        ? updatedHotel
                        : hotel
                )
            );

            setSelectedHotel(updatedHotel);
        }
    };

    return (
        <HotelsContext.Provider
            value={{
                hotels,
                selectedHotel,
                setSelectedHotel,
                loading,
                error,
                searchData,
                filters,
                total,
                page,
                pageSize,
                loadHotels,
                loadRandomHotels,
                loadFilters,
                loadHotel,
                addReview,
            }}
        >
            {children}
        </HotelsContext.Provider>
    );
}