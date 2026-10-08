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
    const [pageSize, setPageSize] = useState(7);


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

    const buildSearchParams = (
        searchData?: SearchData) => {
        const params = new URLSearchParams();

        if (searchData?.search) {
            params.append(
                "search",
                searchData.search,
            );
        }

        params.append(
            "adults",
            String(searchData?.adults ?? 0),
        );

        params.append(
            "children",
            String(searchData?.children ?? 0),
        );

        params.append(
            "rooms",
            String(searchData?.rooms ?? 0),
        );

        if (searchData?.checkIn) {
            params.append(
                "checkIn",
                searchData.checkIn,
            );
        }

        if (searchData?.checkOut) {
            params.append(
                "checkOut",
                searchData.checkOut,
            );
        }

        if (searchData?.minRating !== undefined) {
            params.append(
                "minRating",
                String(searchData.minRating),
            );
        }

        if (searchData?.stars !== undefined) {
            params.append(
                "stars",
                String(searchData.stars),
            );
        }

        searchData?.types?.forEach((type) => {
            params.append("types", type);
        });

        searchData?.chainIds?.forEach((id) => {
            params.append(
                "chainIds",
                String(id),
            );
        });

        searchData?.amenities?.forEach((amenity) => {
            params.append(
                "amenities",
                amenity,
            );
        });

        if (searchData?.sort) {
            params.append(
                "sort",
                searchData.sort,
            );
        }

        if (searchData?.minPrice !== undefined) {
            params.append(
                "minPrice",
                String(searchData.minPrice),
            );
        }

        if (searchData?.maxPrice !== undefined) {
            params.append(
                "maxPrice",
                String(searchData.maxPrice),
            );
        }


        return params;
    };


    const loadHotels = async (
        searchData?: SearchData,
    ) => {
        setLoading(true);
        setError("");

        if (searchData) {
            setSearchData(searchData);
        }

        try {
            const params = buildSearchParams(
                searchData);

            params.append(
                "page",
                String(searchData?.page ?? 1),
            );

            params.append(
                "pageSize",
                String(searchData?.pageSize ?? 7),
            );

            const response = await apiFetch(
                `/Hotel?${params.toString()}`,
            );

            if (!response.ok) {
                throw new Error(
                    await readError(response),
                );
            }

            const data =
                await response.json() as HotelSearchResult;

            setHotels(data.hotels);
            setTotal(data.total);
            setPage(data.page);
            setPageSize(data.pageSize);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not load hotels",
            );
        } finally {
            setLoading(false);
        }
    };


    const loadFilters = async (
        searchData?: SearchData,
    ) => {
        setError("");

        try {
            const params = buildSearchParams(
                searchData);

            const response = await apiFetch(
                `/Hotel/filters?${params.toString()}`,
            );

            if (!response.ok) {
                throw new Error(
                    await readError(response),
                );
            }

            const data =
                await response.json() as HotelFiltersResponse;

            setFilters(data);

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not load filters",
            );
        }
    };

    const applyFilters = async (
        changes: Partial<SearchData>,
    ) => {
        if (!searchData) {
            return;
        }

        const nextSearchData: SearchData = {
            ...searchData,
            ...changes,
            page: 1,
        };

        await Promise.all([
            loadHotels(nextSearchData),
            loadFilters(nextSearchData),
        ]);
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
        // const review = await response.json();
        const updatedHotel = await loadHotel(hotelId);

        // setHotels(current =>
        //     current.map(hotel => {
        //         if (hotel.id !== hotelId) {
        //             return hotel;
        //         }
        //
        //         const reviews = [
        //             ...hotel.reviews,
        //             review,
        //         ];
        //
        //         const totalRating = reviews.reduce(
        //             (sum, item) => sum + item.rating,
        //             0
        //         );
//         return {
//             ...hotel,
//             reviews,
//             reviewsCount: reviews.length,
//             rating:
//                 reviews.length > 0
//                     ? totalRating / reviews.length
//                     : 0,
//         };
//     })
// );
//
//     setSelectedHotel(current => {
//         if (!current || current.id !== hotelId) {
//             return current;
//         }
//
//         const reviews = [
//             ...current.reviews,
//             review,
//         ];
//
//         const totalRating = reviews.reduce(
//             (sum, item) => sum + item.rating,
//             0
//         );
//         return {
//             ...current,
//             reviews,
//             reviewsCount: reviews.length,
//             rating:
//                 reviews.length > 0
//                     ? totalRating / reviews.length
//                     : 0,
//         };
//     });
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
                applyFilters,
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


// import {useCallback, useState, type ReactNode,} from "react";
//
// import {HotelsContext, type Hotel, type HotelsResponse, type Review, type SearchData,} from "./HotelsContext.types";
//
// import {apiFetch, readError,} from "../api";
//
// type HotelsProviderProps = {
//     children: ReactNode;
// };
//
// export function HotelsProvider({
//                                    children,
//                                }: HotelsProviderProps) {
//     const [hotels, setHotels] =
//         useState<Hotel[]>([]);
//
//     const [loading, setLoading] =
//         useState(false);
//
//     const [error, setError] =
//         useState("");
//
//     const loadHotels = useCallback(
//         async (data?: SearchData) => {
//             setLoading(true);
//             setError("");
//
//             try {
//                 const params =
//                     new URLSearchParams();
//
//                 if (data) {
//                     if (data.search.trim()) {
//                         params.set(
//                             "search",
//                             data.search.trim()
//                         );
//                     }
//
//                     params.set(
//                         "adults",
//                         String(data.adults)
//                     );
//
//                     params.set(
//                         "children",
//                         String(data.children)
//                     );
//
//                     params.set(
//                         "rooms",
//                         String(data.rooms)
//                     );
//
//                     if (data.checkIn) {
//                         params.set(
//                             "checkIn",
//                             data.checkIn
//                         );
//                     }
//
//                     if (data.checkOut) {
//                         params.set(
//                             "checkOut",
//                             data.checkOut
//                         );
//                     }
//                 }
//
//                 const query =
//                     params.toString();
//
//                 const response =
//                     await apiFetch(
//                         `/Hotel${
//                             query
//                                 ? `?${query}`
//                                 : ""
//                         }`
//                     );
//
//                 if (!response.ok) {
//                     throw new Error(
//                         await readError(response)
//                     );
//                 }
//
//                 const result =
//                     (await response.json()) as HotelsResponse;
//
//                 setHotels(
//                     Array.isArray(
//                         result.hotels
//                     )
//                         ? result.hotels
//                         : []
//                 );
//             } catch (error) {
//                 setHotels([]);
//
//                 setError(
//                     error instanceof Error
//                         ? error.message
//                         : "Could not load hotels."
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         },
//         []
//     );
//
//     const loadHotel = useCallback(
//         async (id: string) => {
//             try {
//                 const response =
//                     await apiFetch(
//                         `/Hotel/${id}`
//                     );
//
//                 if (!response.ok) {
//                     throw new Error(
//                         await readError(response)
//                     );
//                 }
//
//                 const hotel =
//                     (await response.json()) as Hotel;
//
//                 setHotels(
//                     currentHotels => {
//                         const exists =
//                             currentHotels.some(
//                                 item =>
//                                     item.id ===
//                                     hotel.id
//                             );
//
//                         if (!exists) {
//                             return [
//                                 ...currentHotels,
//                                 hotel,
//                             ];
//                         }
//
//                         return currentHotels.map(
//                             item =>
//                                 item.id ===
//                                 hotel.id
//                                     ? hotel
//                                     : item
//                         );
//                     }
//                 );
//
//                 return hotel;
//             } catch {
//                 return null;
//             }
//         },
//         []
//     );
//
//     const addReview = useCallback(
//         async (
//             hotelId: string,
//             rating: number,
//             text: string
//         ) => {
//             if (
//                 rating < 1 ||
//                 rating > 5
//             ) {
//                 throw new Error(
//                     "Please select a rating."
//                 );
//             }
//
//             if (!text.trim()) {
//                 throw new Error(
//                     "Review text is required."
//                 );
//             }
//             const backendRating =
//                 rating * 2;
//
//             const response =
//                 await apiFetch(
//                     "/Review",
//                     {
//                         method: "POST",
//                         body: JSON.stringify({
//                             hotelId,
//
//                             facilities:
//                             backendRating,
//
//                             staff:
//                             backendRating,
//
//                             cleanliness:
//                             backendRating,
//
//                             comfort:
//                             backendRating,
//
//                             location:
//                             backendRating,
//
//                             valueForMoney:
//                             backendRating,
//
//                             text:
//                                 text.trim(),
//                         }),
//                     }
//                 );
//
//             if (!response.ok) {
//                 throw new Error(
//                     await readError(response)
//                 );
//             }
//             const reviewsResponse =
//                 await apiFetch(
//                     `/Review/hotel/${hotelId}`
//                 );
//
//             if (
//                 reviewsResponse.ok
//             ) {
//                 const reviews =
//                     (await reviewsResponse.json()) as Review[];
//
//                 setHotels(
//                     currentHotels =>
//                         currentHotels.map(
//                             item => {
//                                 if (
//                                     item.id !==
//                                     hotelId
//                                 ) {
//                                     return item;
//                                 }
//
//                                 const ratingSum =
//                                     reviews.reduce(
//                                         (
//                                             sum,
//                                             review
//                                         ) =>
//                                             sum +
//                                             Number(
//                                                 review.rating
//                                             ),
//                                         0
//                                     );
//
//                                 const newRating =
//                                     reviews.length > 0
//                                         ? ratingSum /
//                                         reviews.length
//                                         : 0;
//
//                                 return {
//                                     ...item,
//                                     reviews,
//                                     reviewsCount:
//                                     reviews.length,
//                                     rating:
//                                     newRating,
//                                 };
//                             }
//                         )
//                 );
//             } else {
//                 await loadHotel(hotelId);
//             }
//         },
//         [loadHotel]
//     );
//
//     return (
//         <HotelsContext.Provider
//             value={{
//                 hotels,
//                 loading,
//                 error,
//                 loadHotels,
//                 loadHotel,
//                 addReview,
//             }}
//         >
//             {children}
//         </HotelsContext.Provider>
//     );
// }