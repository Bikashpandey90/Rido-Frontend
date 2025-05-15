"use client";

import Roadmap from "./roadmap";

const data = [
    {
        title: "Download our app",
        logo: "rocket", // Use an actual logo image path
        description:
            "Get the RideX app from the App Store or Google Play Store and create your account for free.",
        bg: "#F5BA4C",
    },
    {
        title: "Book a ride",
        logo: "rocket", // Use an actual logo image path
        description:
            "Enter your destination, choose your vehicle type, and confirm your pickup location.Wait for a rider to accept your ride.",
        bg: "#155dfc",
    },
    {
        title: "Enjoy your ride)",
        logo: "rocket", // Use an actual logo image path
        description:
            "Track your driver's arrival, get in, and relax as you're taken to your destination.We will get you there in no time.",
        bg: "#fd47da",
    },
];

const RoadmapDemo: React.FC = () => {
    return (
        <Roadmap>
            {data.map((item, index) => (
                <Roadmap.Card
                    key={index}
                    index={index}
                    logoSrc={item.logo} // Update with actual path
                    logoAlt={item.logo}
                    title={item.title}
                    description={item.description}
                    background={item.bg}
                />
            ))}
        </Roadmap>
    );
};

export default RoadmapDemo;