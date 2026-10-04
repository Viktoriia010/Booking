// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./components/layout/Layout";
// import ErrorPage from "./pages/Error/ErrorPage";
// import NotFoundPage from "./pages/Error/NotFoundPage";
//
// export const routes = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 index: true,
//                 lazy: () =>
//                     import("./pages/Home/HomePage").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "login",
//                 lazy: () =>
//                     import("./pages/Auth/Login").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "register",
//                 lazy: () =>
//                     import("./pages/Auth/Register").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "verify",
//                 lazy: () =>
//                     import("./pages/Auth/VerifyCode").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "information",
//                 lazy: () =>
//                     import("./pages/Auth/Information").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "all-done",
//                 lazy: () =>
//                     import("./pages/Auth/AllDone").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "hotel/:id",
//                 lazy: () =>
//                     import("./pages/HotelPage").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "booking/:roomId",
//                 lazy: () =>
//                     import("./pages/Booking/BookingPage").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "booking-success",
//                 lazy: () =>
//                     import("./pages/Booking/BookingSuccess").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "reviews",
//                 lazy: () =>
//                     import("./pages/Auth/ReviewsPage").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "account",
//                 lazy: () =>
//                     import("./pages/AccountPage").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "about",
//                 lazy: () =>
//                     import("./pages/AboutPage").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "contacts",
//                 lazy: () =>
//                     import("./pages/ContactsPage").then(module => ({
//                         Component: module.default,
//                     })),
//             },
//             {
//                 path: "*",
//                 element: <NotFoundPage />,
//             },
//         ],
//     },
// ]);

import {createBrowserRouter} from "react-router-dom";
import Layout from "@/components/layout/Layout.tsx";
// import { ProtectedRoute } from "@/components/ProtectedRoute.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Home from "@/pages/Home.tsx";
// import {DashboardPage} from "@/pages/DashboardPage.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";
import AccountPage from "@/pages/AccountPage.tsx";
import HotelPage from "@/pages/HotelPage.tsx";

import GoogleCallback from "@/pages/Auth/GoogleCallback.tsx";
import BookingPage from "@/pages/Booking/BookingPage.tsx";
import BookingSuccess from "@/pages/Booking/BookingSuccess.tsx";
export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
            },
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
                // element: <ProtectedRoute />,
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