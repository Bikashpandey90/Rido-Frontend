import { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/homepage/homepage";
import NotFound from "@/pages/not-found/not-found";
import HomePageLayout from "@/pages/homepage/homepage-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
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
import RideDetailPage from "@/pages/rides/ride-detail";
import Dashboard from "@/pages/admin/layout/layout";
import AdminDashBoard from "@/pages/admin/dashboard/dashboard";
import DriversPage from "@/pages/admin/riders/riders";
import CustomerPage from "@/pages/admin/customers/customers";
import AdminRidesPage from "@/pages/admin/rides/rides";
import PaymentsPage from "@/pages/admin/payments/payment";
import SettingsPage from "@/pages/admin/settings/settings";
import MapsPage from "@/pages/admin/maps/maps";
import ReviewPage from "@/pages/admin/reviews/reviews";
import OffersVouchersPage from "@/pages/admin/offers/offers";
import OfferDetailsPage from "@/pages/admin/offers/offer-details";
import UpdateOfferPage from "@/pages/admin/offers/update-offer";
import AdminChatPage from "@/pages/admin/chats/chats";
import PaymentDetailsPage from "@/pages/admin/payments/payments.detail";
import AdminRideDetailsPage from "@/pages/admin/rides/rides.detail";
import DriverProfilePage from "@/pages/admin/riders/riders.profile";
import AdminDriverInfoPage from "@/pages/admin/customers/customers.profile";
import AdminUserInfoPage from "@/pages/admin/customers/customers.profile";
import LandingPage, { NavbarDemo } from "@/pages/landing-page/page";




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
                        }, {
                            path: 'ride-detail/:id',
                            element: <RideDetailPage />

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
        , {
            path: '/admin',
            element: <PermissionCheck allowedRole="admin">
                <Dashboard />
            </PermissionCheck>,

            children: [
                {
                    index: true,
                    element: <AdminDashBoard />
                }, {
                    path: 'riders',
                    element: <DriversPage />
                }, {
                    path: 'riders/profile',
                    element: <AdminDriverInfoPage />

                },
                {
                    path: 'customers',
                    element: <CustomerPage />
                }, {
                    path: 'customers/profile/:id',
                    element: <AdminUserInfoPage />

                }, {
                    path: 'rides',
                    element: <AdminRidesPage />

                }, {
                    path: 'rides/detail/:id',
                    element: <AdminRideDetailsPage />

                }, {
                    path: 'payments',
                    element: <PaymentsPage />
                }, {
                    path: 'payments/details/:id',
                    element: <PaymentDetailsPage />
                }
                , {
                    path: 'chats',
                    element: <AdminChatPage />

                }, {
                    path: 'settings',
                    element: <SettingsPage />
                }, {
                    path: 'map',
                    element: <MapsPage />
                },
                {
                    path: 'reviews',
                    element: <ReviewPage />
                }, {
                    path: 'offers',
                    element: <OffersVouchersPage />
                }, {
                    path: 'offers/details/:id',
                    element: <OfferDetailsPage />
                }, {
                    path: 'offers/update/:id',
                    element: <UpdateOfferPage />
                }
            ]
        }, {
            path: '/landing',
            element: <NavbarDemo />

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