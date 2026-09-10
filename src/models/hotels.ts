import type { HotelType } from "@/types/HotelType.ts";
import Rectangle6 from "@/assets/recttt6.avif";
import hotel2 from "@/assets/hotel2.avif";
import hotel3 from "@/assets/hotel3.avif";
import hotel4 from "@/assets/hotel4.avif";
import hotel5 from "@/assets/hotel5.avif";
import hotel6 from "@/assets/hotel6.avif";
import hotel7 from "@/assets/hotel7.avif";
import hotel8 from "@/assets/hotel8.avif";

const hotels: HotelType[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Mountain Lake Resort",
        city: "Zakopane",
        country: "Poland",
        rating: 9.5,
        location: "Zakopane, Poland",
        price: 120,
        is_liked: false,
        images: [Rectangle6, hotel2, hotel3],
    },
    {
        id: "6ba7b810-9dad-41d1-80b4-00c04fd430c8",
        name: "Green Valley Hotel",
        city: "Bukovel",
        country: "Ukraine",
        rating: 9.2,
        location: "Bukovel, Ukraine",
        price: 95,
        is_liked: true,
        images: [hotel2],
    },
    {
        id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
        name: "Grand Palace Hotel",
        city: "Lviv",
        country: "Ukraine",
        rating: 9.0,
        location: "Lviv, Ukraine",
        price: 110,
        is_liked: false,
        images: [hotel3],
    },
    {
        id: "8f14e45f-ea12-43a8-b7d2-123456789abc",
        name: "Sea View Resort",
        city: "Batumi",
        country: "Georgia",
        rating: 8.8,
        location: "Batumi, Georgia",
        price: 85,
        is_liked: false,
        images: [hotel4],
    },
    {
        id: "3d6f0a92-5b21-4c78-9e34-abcdef123456",
        name: "Lake House Hotel",
        city: "Interlaken",
        country: "Switzerland",
        rating: 9.4,
        location: "Interlaken, Switzerland",
        price: 180,
        is_liked: true,
        images: [hotel5],
    },
    {
        id: "1a2b3c4d-5e6f-4789-a012-3456789abcde",
        name: "Royal Garden",
        city: "Budapest",
        country: "Hungary",
        rating: 8.9,
        location: "Budapest, Hungary",
        price: 90,
        is_liked: false,
        images: [hotel6],
    },
    {
        id: "2b3c4d5e-6f70-489a-b123-456789abcdef",
        name: "Sunset Hotel",
        city: "Nice",
        country: "France",
        rating: 9.1,
        location: "Nice, France",
        price: 140,
        is_liked: false,
        images: [hotel7],
    },
    {
        id: "4c5d6e7f-8091-4abc-c234-56789abcdef0",
        name: "Blue Lagoon Resort",
        city: "Malé",
        country: "Maldives",
        rating: 9.6,
        location: "Maldives",
        price: 250,
        is_liked: true,
        images: [hotel8],
    },
];

export default hotels;

