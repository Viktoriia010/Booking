import { useContext } from "react";
import { HotelsContext } from "./HotelsContext.types";

export function useHotels() {
    const context = useContext(HotelsContext);

    if (!context) {
        throw new Error(
            "useHotels must be used inside HotelsProvider"
        );
    }

    return context;
}