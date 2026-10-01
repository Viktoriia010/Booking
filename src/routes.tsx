import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout.tsx";
import { ProtectedRoute } from "@/components/ProtectedRoute.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Home from "@/pages/Home.tsx";
import AccountPage from "@/pages/AccountPage.tsx";
import GoogleCallback from "@/pages/Auth/GoogleCallback.tsx";
import BookingPage from "@/pages/Booking/BookingPage.tsx";
import BookingSuccess from "@/pages/Booking/BookingSuccess.tsx";
export const routes = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "google-callback",
                Component: GoogleCallback,
            },
            {
                Component: ProtectedRoute,
                children: [
                    {
                        path: "account",
                        Component: AccountPage,
                    },
                    {
                        path: "booking/:roomId",
                        Component: BookingPage,
                    },
                    {
                        path: "booking-success",
                        Component: BookingSuccess,
                    },
                ],
            },
        ],
    },
]);