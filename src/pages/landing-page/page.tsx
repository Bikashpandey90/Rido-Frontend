
import { useState, useEffect } from "react"

import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/resizable-navbar/navbar"
import Hero from "./hero"
import TrustedBy from "./trusted"
import Featured from "./features"
import HowItWorks from "./howitworks"
import Testimonials from "./testimonials"
import AppDownload from "./app"
import Pricing from "./pricing"
import Driver from "./driver"
import CTA from "./cta"
import Footer from "./footer"
import { Logos } from "./logos"

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    console.log(isScrolled)



    return (
        <div className="m-0 p-0 w-full  mx-auto overflow-x-hidden">
            {/* <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <NavLink to="/" className="flex items-center space-x-2">
                                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
                                    <Car className="absolute inset-0 h-5 w-5 m-auto text-white" />
                                </div>
                                <span className="font-bold text-xl">RideX</span>
                            </NavLink>
                        </div>

                        <nav className="hidden md:flex items-center space-x-6">
                            <NavLink
                                to="#features"
                                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Features
                            </NavLink>
                            <NavLink
                                to="#how-it-works"
                                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                How It Works
                            </NavLink>
                            <NavLink
                                to="#testimonials"
                                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Testimonials
                            </NavLink>
                            <NavLink
                                to="#pricing"
                                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Pricing
                            </NavLink>
                            <NavLink
                                to="#drivers"
                                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Become a Driver
                            </NavLink>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    Log In
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Sign Up
                                </Button>
                            </div>
                        </nav>

                        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
                        <div className="container mx-auto px-4 py-4 space-y-3">
                            <NavLink
                                to="#features"
                                className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Features
                            </NavLink>
                            <NavLink
                                to="#how-it-works"
                                className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                How It Works
                            </NavLink>
                            <NavLink
                                to="#testimonials"
                                className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Testimonials
                            </NavLink>
                            <NavLink
                                to="#pricing"
                                className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Pricing
                            </NavLink>
                            <NavLink
                                to="#drivers"
                                className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Become a Driver
                            </NavLink>
                            <div className="flex flex-col space-y-2 pt-2">
                                <Button variant="outline" size="sm" className="justify-center">
                                    Log In
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 justify-center">
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </header> */}





            <main className="flex-1  ">
                {/* Hero Section */}
                <Hero />


                {/* Trusted By Section */}
                <Logos />
                <TrustedBy />


                {/* Features Section */}
                <Featured />


                {/* How It Works Section */}
                <HowItWorks />


                {/* Testimonials Section */}
                <Testimonials />


                {/* App Download Section */}
                <AppDownload />


                {/* Pricing Section */}
                <Pricing />


                {/* Become a Driver Section */}
                <Driver />

                {/* CTA Section */}
                <CTA />
            </main>

            <Footer />
        </div>
    )
}

export function NavbarDemo() {
    const navItems = [
        {
            name: "Features",
            link: "#features",
        },
        {
            name: "Pricing",
            link: "#pricing",
        },
        {
            name: "Contact",
            link: "#contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full ">
            <Navbar >
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="secondary">Login</NavbarButton>
                        <NavbarButton variant="primary">Book a call</NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Book a call
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
            {/* <DummyContent /> */}
            <LandingPage />

            {/* Navbar */}
        </div>
    );
}