import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HotelsProvider } from "./context/HotelsContext";
import { BookingProvider } from "./context/BookingContext";
import { routes } from "./routes";

const App = () => {
    return (
        <AuthProvider>
            <HotelsProvider>
                <BookingProvider>
                    <RouterProvider router={routes} />
                </BookingProvider>
            </HotelsProvider>
        </AuthProvider>
    );
};

export default App;