import type { ReviewType } from "@/types/ReviewType.ts";

const reviews: ReviewType[] = [
    {
        id: "1",
        username: "Olivia",
        hotelName: "Mountain Lake Resort",
        text: "Amazing hotel! The room was clean, comfortable, and the view was absolutely beautiful.",
        date: new Date("2026-08-23"),
        userImage: "/ava_3.svg",
    },
    {
        id: "2",
        username: "James",
        hotelName: "Sunset Beach Hotel",
        text: "Great location and friendly staff. Everything was exactly as described. I would definitely stay here again.",
        date: new Date("2026-08-30"),
        userImage: "/ava_1.svg",
    },
    {
        id: "3",
        username: "Sophia",
        hotelName: "Grand Palace Hotel",
        text: "We had a wonderful stay. The hotel was beautiful, the service was excellent, and the breakfast was delicious.",
        date: new Date("2026-09-05"),
        userImage: "/ava_2.svg",
    },
];

export default reviews;