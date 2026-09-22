import { useContext } from "react";
import { HotelsContext } from "../context/HotelsContext.types.ts";

export function useHotels() {
    const context = useContext(HotelsContext);

    if (!context) {
        throw new Error(
            "useHotels must be used inside HotelsProvider"
        );
    }

    return context;
}