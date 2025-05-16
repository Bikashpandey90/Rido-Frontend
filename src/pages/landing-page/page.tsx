
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
// import TrustedBy from "./trusted"
import Featured from "./features"
// import HowItWorks from "./howitworks"
import Testimonials from "./testimonials"
import AppDownload from "./app"
import Pricing from "./pricing"
import Driver from "./driver"
import CTA from "./cta"
import Footer from "./footer"
import { Logos } from "./logos"
// import { ThreeDMarqueeDemo } from "./customers"
// import Eight from "./bento-grid"
import RoadmapDemo from "./features-new"
import { StickyCards } from "./new-features"

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

        <>
            <div className="m-0 p-0 w-full  mx-auto ">

                <main className="flex-1  ">
                    {/* Hero Section */}
                    <Hero />


                    {/* Trusted By Section */}
                    <Logos />
                    {/* <TrustedBy /> */}


                    {/* Features Section */}
                    <Featured />




                    {/* How It Works Section */}
                    <RoadmapDemo></RoadmapDemo>

                    {/* <HowItWorks /> */}
                    <StickyCards />

                    {/* <ThreeDMarqueeDemo /> */}


                    {/* Testimonials Section */}
                    <Testimonials />

                    {/* <Eight /> */}


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


        </>

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