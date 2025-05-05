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
// import MapCheck from "@/pages/customer/map/map-check";
import ProfilePage from "@/pages/customer/profile/profile";
import RiderProfile from "@/pages/rider/profile/profile";
import NewMapPage from "@/pages/customer/map/new-map-check";
import RiderPage from "@/pages/rider/rider-map/rider-map";
import ReviewsPage from "@/pages/review/review-page";
import RidesPage from "@/pages/rides/rides-page";
import ChatPage from "@/pages/chat/chat-page";



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
                    element: <NewMapPage />
                }, {
                    path: '/profile',
                    element: <ProfilePage />
                }, {
                    path: '/rider/profile',
                    element: <RiderProfile />
                }, {
                    path: '/rider-map',
                    element: <RiderPage />
                }, {
                    path: '/reviews',
                    element: <ReviewsPage />

                }, {
                    path: '/rides',
                    element: <RidesPage />
                }, {
                    path: 'chat',
                    element: <ChatPage />
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