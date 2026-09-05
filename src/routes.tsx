import {createBrowserRouter} from "react-router";
import Layout from "@/components/layout/Layout.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Home from "@/pages/Home.tsx";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,

        children: [
            {
                // path: "products",
                // element: <Products />,
                // loader: productsLoader,

                // Компонент, який показується при помилці loader
                errorElement: <ErrorPage />,
            },
            {
                index: true,
                Component:Home
            },
        ],
    },
]);
