import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ErrorPage from "./pages/Error/ErrorPage";
import NotFoundPage from "./pages/Error/NotFoundPage";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                lazy: () =>
                    import("./pages/Home/HomePage").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "login",
                lazy: () =>
                    import("./pages/Auth/Login").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "register",
                lazy: () =>
                    import("./pages/Auth/Register").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "verify",
                lazy: () =>
                    import("./pages/Auth/VerifyCode").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "information",
                lazy: () =>
                    import("./pages/Auth/Information").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "all-done",
                lazy: () =>
                    import("./pages/Auth/AllDone").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "hotel/:id",
                lazy: () =>
                    import("./pages/HotelPage").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "booking/:roomId",
                lazy: () =>
                    import("./pages/Booking/BookingPage").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "booking-success",
                lazy: () =>
                    import("./pages/Booking/BookingSuccess").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "reviews",
                lazy: () =>
                    import("./pages/Auth/ReviewsPage").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "account",
                lazy: () =>
                    import("./pages/AccountPage").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "about",
                lazy: () =>
                    import("./pages/AboutPage").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "contacts",
                lazy: () =>
                    import("./pages/ContactsPage").then(module => ({
                        Component: module.default,
                    })),
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);

// import {createBrowserRouter} from "react-router";
// import Layout from "@/components/layout/Layout.tsx";
// import ErrorPage from "@/pages/ErrorPage.tsx";
// import Home from "@/pages/Home.tsx";
// import {DashboardPage} from "@/pages/DashboardPage.tsx";
// import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";
//
// export const routes = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//
//         children: [
//             {
//                 // path: "products",
//                 // element: <Products />,
//                 // loader: productsLoader,
//
//                 // Компонент, який показується при помилці loader
//                 errorElement: <ErrorPage />,
//             },
//             {
//                 index: true,
//                 Component:Home
//             },
//             {
//                 element: <ProtectedRoute />,
//                 children: [
//                     {
//                         path: 'dashboard',
//                         element: <DashboardPage />,
//                     },
//                 ],
//             },
//         ],
//     },
// ]);