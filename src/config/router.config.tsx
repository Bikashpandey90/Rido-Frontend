import { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/homepage/homepage";
import NotFound from "@/pages/not-found/not-found";
import HomePageLayout from "@/pages/homepage/homepage-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import CustomerDashboard from "@/pages/customer/dashboard/dashboard";
import MapPage from "@/pages/customer/map/map";
import RiderDashboard from "@/pages/rider/dashboard/dashboard";
import RiderNavigationPage from "@/pages/rider/rider-nav/rider-navigation";
// import MapCheck from "@/pages/customer/map/map-check";
// import NewMapPage from "@/pages/customer/map/new-map-check";
import MapCheck from "@/pages/customer/map/map-check";
import ProfilePage from "@/pages/customer/profile/profile";



const Routing: FC = () => {

    const router = createBrowserRouter([
        {
            path: '',
            element: <HomePageLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                }, {
                    path: "*",
                    element: <NotFound />

                }, {
                    path: '/login',
                    element: <Login />
                }, {
                    path: '/register',
                    element: <Register />
                }, {
                    path: '/dashboard',
                    element: <CustomerDashboard />
                }, {
                    path: '/ride',
                    element: <MapPage />
                }, {
                    path: '/rider',
                    element: <RiderDashboard />
                }, {
                    path: '/rider-nav',
                    element: <RiderNavigationPage />
                }, {
                    path: '/map-check',
                    element: <MapCheck />
                }, {
                    path: '/profile',
                    element: <ProfilePage />
                }
            ]
        }

    ])


    const [queryClient] = useState(() => new QueryClient())

    return <>
        <QueryClientProvider client={queryClient}>

            <RouterProvider router={router} />
        </QueryClientProvider>
    </>

}
export default Routing