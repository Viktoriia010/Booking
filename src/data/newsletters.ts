export type NewsletterTopic = {
    id: string;
    title: string;
    description: string;
    image: string;
};

const newsletters: NewsletterTopic[] = [
    {
        id: "seasonal-offers",
        title: "Seasonal offers",
        description:
            "Discover the finest offers every season. Every season has its own uniqueness, and we are here to assist you in finding the most exceptional deals.",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
    },

    {
        id: "favorite-cities",
        title: "Favorite cities",
        description:
            "We curate a collection of top-rated hotels in the cities you frequent the most, so you don't have to spend time searching for great deals.",
        image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80",
    },

    {
        id: "across-world",
        title: "Across the world",
        description:
            "Are you a frequent traveler across the world? Let us help you find the best international deals and enjoy your vacation with a beautiful hotel.",
        image:
            "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=700&q=80",
    },

    {
        id: "affordable-travel",
        title: "Affordable travel",
        description:
            "Looking for affordable travel options? Let us find the best budget deals for you in your preferred country.",
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
    },
];

export default newsletters;