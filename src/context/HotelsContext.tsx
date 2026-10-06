import {useCallback, useState, type ReactNode,} from "react";

import {HotelsContext, type Hotel, type HotelsResponse, type Review, type SearchData,} from "./HotelsContext.types";

import {apiFetch, readError,} from "../api";

type HotelsProviderProps = {
    children: ReactNode;
};

export function HotelsProvider({
                                   children,
                               }: HotelsProviderProps) {
    const [hotels, setHotels] =
        useState<Hotel[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const loadHotels = useCallback(
        async (data?: SearchData) => {
            setLoading(true);
            setError("");

            try {
                const params =
                    new URLSearchParams();

                if (data) {
                    if (data.search.trim()) {
                        params.set(
                            "search",
                            data.search.trim()
                        );
                    }

                    params.set(
                        "adults",
                        String(data.adults)
                    );

                    params.set(
                        "children",
                        String(data.children)
                    );

                    params.set(
                        "rooms",
                        String(data.rooms)
                    );

                    if (data.checkIn) {
                        params.set(
                            "checkIn",
                            data.checkIn
                        );
                    }

                    if (data.checkOut) {
                        params.set(
                            "checkOut",
                            data.checkOut
                        );
                    }
                }

                const query =
                    params.toString();

                const response =
                    await apiFetch(
                        `/Hotel${
                            query
                                ? `?${query}`
                                : ""
                        }`
                    );

                if (!response.ok) {
                    throw new Error(
                        await readError(response)
                    );
                }

                const result =
                    (await response.json()) as HotelsResponse;

                setHotels(
                    Array.isArray(
                        result.hotels
                    )
                        ? result.hotels
                        : []
                );
            } catch (error) {
                setHotels([]);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load hotels."
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const loadHotel = useCallback(
        async (id: string) => {
            try {
                const response =
                    await apiFetch(
                        `/Hotel/${id}`
                    );

                if (!response.ok) {
                    throw new Error(
                        await readError(response)
                    );
                }

                const hotel =
                    (await response.json()) as Hotel;

                setHotels(
                    currentHotels => {
                        const exists =
                            currentHotels.some(
                                item =>
                                    item.id ===
                                    hotel.id
                            );

                        if (!exists) {
                            return [
                                ...currentHotels,
                                hotel,
                            ];
                        }

                        return currentHotels.map(
                            item =>
                                item.id ===
                                hotel.id
                                    ? hotel
                                    : item
                        );
                    }
                );

                return hotel;
            } catch {
                return null;
            }
        },
        []
    );

    const addReview = useCallback(
        async (
            hotelId: string,
            rating: number,
            text: string
        ) => {
            if (
                rating < 1 ||
                rating > 5
            ) {
                throw new Error(
                    "Please select a rating."
                );
            }

            if (!text.trim()) {
                throw new Error(
                    "Review text is required."
                );
            }
            const backendRating =
                rating * 2;

            const response =
                await apiFetch(
                    "/Review",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            hotelId,

                            facilities:
                            backendRating,

                            staff:
                            backendRating,

                            cleanliness:
                            backendRating,

                            comfort:
                            backendRating,

                            location:
                            backendRating,

                            valueForMoney:
                            backendRating,

                            text:
                                text.trim(),
                        }),
                    }
                );

            if (!response.ok) {
                throw new Error(
                    await readError(response)
                );
            }
            const reviewsResponse =
                await apiFetch(
                    `/Review/hotel/${hotelId}`
                );

            if (
                reviewsResponse.ok
            ) {
                const reviews =
                    (await reviewsResponse.json()) as Review[];

                setHotels(
                    currentHotels =>
                        currentHotels.map(
                            item => {
                                if (
                                    item.id !==
                                    hotelId
                                ) {
                                    return item;
                                }

                                const ratingSum =
                                    reviews.reduce(
                                        (
                                            sum,
                                            review
                                        ) =>
                                            sum +
                                            Number(
                                                review.rating
                                            ),
                                        0
                                    );

                                const newRating =
                                    reviews.length > 0
                                        ? ratingSum /
                                        reviews.length
                                        : 0;

                                return {
                                    ...item,
                                    reviews,
                                    reviewsCount:
                                    reviews.length,
                                    rating:
                                    newRating,
                                };
                            }
                        )
                );
            } else {
                await loadHotel(hotelId);
            }
        },
        [loadHotel]
    );

    return (
        <HotelsContext.Provider
            value={{
                hotels,
                loading,
                error,
                loadHotels,
                loadHotel,
                addReview,
            }}
        >
            {children}
        </HotelsContext.Provider>
    );
}