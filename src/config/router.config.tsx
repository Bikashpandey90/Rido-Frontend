import { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/homepage/homepage";
import NotFound from "@/pages/not-found/not-found";
import HomePageLayout from "@/pages/homepage/homepage-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import CustomerDashboard from "@/pages/customer/dashboard/dashboard";
import RiderDashboard from "@/pages/rider/dashboard/dashboard";

import ProfilePage from "@/pages/customer/profile/profile";
import RiderProfile from "@/pages/rider/profile/profile";
import RiderPage from "@/pages/rider/rider-map/rider-map";
import ReviewsPage from "@/pages/review/review-page";
import RidesPage from "@/pages/rides/rides-page";
import ChatPage from "@/pages/chat/chat-page";
import MapPage from "@/pages/customer/map/map";
import RiderPageLayout from "@/pages/rider/layout/layout";
import CustomerPageLayout from "@/pages/customer/layout/layout";
import PermissionCheck from "./permission.config";
import PaymentSuccess from "@/pages/payment/payment-success";
import PaymentFailure from "@/pages/payment/payment-failure";



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
                },
                {
                    path: '/rider',
                    element: <PermissionCheck allowedRole="rider">
                        <RiderPageLayout />
                    </PermissionCheck>,
                    children: [
                        {
                            path: "*",
                            element: <NotFound />

                        },
                        {

                            element: <RiderPage />,
                            index: true

                        }, {
                            path: 'profile',
                            element: <RiderProfile />
                        },
                        {
                            path: 'reviews',
                            element: <ReviewsPage />

                        },
                        {
                            path: 'rides',
                            element: <RidesPage />
                        },
                        {
                            path: 'chat',
                            element: <ChatPage />
                        }
                    ]


                },
                {
                    path: '/customer',
                    element: <PermissionCheck allowedRole="customer">
                        <CustomerPageLayout />
                    </PermissionCheck>,
                    children: [
                        {
                            index: true,
                            element: <MapPage />,
                        },
                        {
                            path: "*",
                            element: <NotFound />

                        },

                        {
                            path: 'profile',
                            element: <ProfilePage />
                        },
                        {
                            path: 'reviews',
                            element: <ReviewsPage />

                        },
                        {
                            path: 'rides',
                            element: <RidesPage />
                        },
                        {
                            path: 'chat',
                            element: <ChatPage />
                        }, {
                            path: 'payment-success',
                            element: <PaymentSuccess />
                        },
                        {
                            path: 'payment-failed',
                            element: <PaymentFailure />
                        }
                    ]
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