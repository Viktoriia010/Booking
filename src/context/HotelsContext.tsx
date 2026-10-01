import { useState } from "react";
import {
    HotelsContext,
    type Hotel,
    type SearchData,
} from "./HotelsContext.types";
import { apiFetch, readError } from "../api";

export function HotelsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [selectedHotel, setSelectedHotel] =
        useState<Hotel | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadHotels = async (searchData?: SearchData) => {
        setLoading(true);
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
                `/Hotel?${params.toString()}`
            );

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

    const loadHotel = async (id: string) => {
        const response = await apiFetch(`/Hotel/${id}`);

        if (!response.ok) {
            return null;
        }

        return await response.json() as Hotel;
    };

    const addReview = async (
        hotelId: string,
        rating: number,
        text: string
    ) => {
        const response = await apiFetch("/Review", {
            method: "POST",
            body: JSON.stringify({
                hotelId,
                rating,
                text,
            }),
        });

        if (!response.ok) {
            throw new Error(await readError(response));
        }

        const review = await response.json();

        setHotels(current =>
            current.map(hotel => {
                if (hotel.id !== hotelId) {
                    return hotel;
                }

                const reviews = [
                    ...hotel.reviews,
                    review,
                ];

                const totalRating = reviews.reduce(
                    (sum, item) => sum + item.rating,
                    0
                );

                return {
                    ...hotel,
                    reviews,
                    reviewsCount: reviews.length,
                    rating:
                        reviews.length > 0
                            ? totalRating / reviews.length
                            : 0,
                };
            })
        );

        setSelectedHotel(current => {
            if (!current || current.id !== hotelId) {
                return current;
            }

            const reviews = [
                ...current.reviews,
                review,
            ];

            const totalRating = reviews.reduce(
                (sum, item) => sum + item.rating,
                0
            );

            return {
                ...current,
                reviews,
                reviewsCount: reviews.length,
                rating:
                    reviews.length > 0
                        ? totalRating / reviews.length
                        : 0,
            };
        });
    };

    return (
        <HotelsContext.Provider
            value={{
                hotels,
                selectedHotel,
                setSelectedHotel,
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
