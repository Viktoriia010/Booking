import type { Review as ReviewType } from "@/context/HotelsContext.types";

const reviews: ReviewType[] = [
    {
        id: "1",
        hotelId: "929CB9BA-CF17-4F8B-9914-0F4BA80E952E",
        authorName: "Olivia",
        authorAvatarUrl: "/ava_3.svg",

        rating: 6,
        facilities: 6,
        staff: 7,
        cleanliness: 6,
        comfort: 7,
        location: 8,
        valueForMoney: 6,

        text:
            "Amazing hotel! The room was clean, comfortable, and the location was absolutely beautiful.",
        createdAt: "2026-07-23",
    },
    {
        id: "2",
        hotelId: "929CB9BA-CF17-4F8B-9914-0F4BA80E952E",
        authorName: "James",
        authorAvatarUrl: "/ava_1.svg",

        rating: 5.2,
        facilities: 5,
        staff: 6,
        cleanliness: 5,
        comfort: 5,
        location: 6,
        valueForMoney: 5,

        text:
            "Great location and friendly staff. Everything was good overall, although there are a few things that could be improved.",
        createdAt: "2026-08-30",
    },
    {
        id: "3",
        hotelId: "929CB9BA-CF17-4F8B-9914-0F4BA80E952E",
        authorName: "Sophia",
        authorAvatarUrl: "/ava_2.svg",

        rating: 8.5,
        facilities: 9,
        staff: 9,
        cleanliness: 9,
        comfort: 8,
        location: 9,
        valueForMoney: 8,

        text:
            "We had a wonderful stay. The hotel was beautiful, the service was excellent, and the breakfast was delicious.",
        createdAt: "2026-09-05",
    },
];

export default reviews;
