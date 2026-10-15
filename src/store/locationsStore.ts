import { create } from "zustand";

type Location = {
    country: string;
    cities: string[];
};

type LocationsResponse = {
    error: boolean;
    msg: string;
    data: Location[];
};

type LocationsStore = {
    locations: Location[];
    loading: boolean;
    error: string | null;
    getLocations: () => Promise<void>;
};

export const locationsStore = create<LocationsStore>((set, get) => ({
    locations: [],
    loading: false,
    error: null,

    getLocations: async () => {
        if (get().locations.length > 0) return;

        try {
            set({
                loading: true,
                error: null,
            });

            const response = await fetch(
                "https://countriesnow.space/api/v0.1/countries"
            );

            if (!response.ok) {
                throw new Error("Помилка отримання локацій");
            }

            const result: LocationsResponse = await response.json();

            if (result.error) {
                throw new Error(result.msg || "Помилка отримання локацій");
            }

            set({
                locations: result.data,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                loading: false,
                error: "Не вдалось отримати локації: " +
                    (error instanceof Error ? error.message : String(error)),
            });
        }
    },
}));