import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Home from "@/pages/Home.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";
import AccountPage from "@/pages/AccountPage.tsx";
import HotelPage from "@/pages/HotelPage.tsx";

import PaymentMethodPage from "@/pages/PaymentMethodPage.tsx";
import TravelInformationPage from "@/pages/Information.tsx";
import NewslettersPage from "@/pages/NewslettersPage.tsx";
import SecurityPage from "@/pages/SecurityPage.tsx";
import GoogleCallback from "@/pages/Auth/GoogleCallback.tsx";
import Information from "@/pages/Auth/Information.tsx";
import AllDone from "@/pages/Auth/AllDone.tsx";
import BookingPage from "@/pages/Booking/BookingPage.tsx";
import BookingSuccess from "@/pages/Booking/BookingSuccess.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import BookingInfoPage from "@/pages/Booking/BookingInfoPage.tsx";
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
                        path: "information",
                        Component: Information,
                    },
                    {
                        path: "all-done",
                        Component: AllDone,
                    },
                    {
                        path: "account",
                        Component: AccountPage,
                    },
                    {
                        path: "payment-method",
                        Component: PaymentMethodPage,
                    },
                    {
                        path: "travel-information",
                        Component: TravelInformationPage,
                    },
                    {
                        path: "newsletters",
                        Component: NewslettersPage,
                    },
                    {
                        path: "security",
                        Component: SecurityPage,
                    },
                    {
                        path: "booking/:roomId",
                        Component: BookingPage,
                    },
                    {
                        path: "booking-info",
                        Component: BookingInfoPage,
                    },
                    {
                        path: "booking-success",
                        Component: BookingSuccess,
                    }
                    // {
                    //     path: 'account',
                    //     element: <AccountPage />
                    // }
                ],
            },
            {
                path: `hotel/:id`,
                Component: HotelPage,
            },
            {
                path: `search`,
                Component: SearchPage,
            },

            // {
            //     path: "booking/:roomId",
            //     lazy: () =>
            //         import("./pages/Booking/BookingPage").then(module => ({
            //             Component: module.default,
            //         })),
            //
            //
            // },
        ],
    },
]);
