"use client";
import { ThreeDMarquee } from "./threed-maruqee";

export function ThreeDMarqueeDemo() {
    const images = [
        "https://static.blog.bolt.eu/LIVE/wp-content/uploads/2023/06/27150315/ride-hailing-app.jpg",
        "https://assets.aceternity.com/animated-modal.png",
        "https://assets.aceternity.com/animated-testimonials.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
        "https://static.blog.bolt.eu/LIVE/wp-content/uploads/2023/06/27150315/ride-hailing-app.jpg",
        "https://images.forbesindia.com/blog/wp-content/uploads/2020/01/Ride-Hailing-Apps_SM.jpg",
        "https://assets.aceternity.com/glare-card.png",
        "https://assets.aceternity.com/flip-text.png",
        "https://assets.aceternity.com/hero-highlight.png",
        "https://assets.aceternity.com/carousel.webp",
        "https://assets.aceternity.com/placeholders-and-vanish-input.png",
        "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
        "https://cdn.gadgetbytenepal.com/wp-content/uploads/2024/10/InDrive-Ride.jpg",
        "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
        "https://imageio.forbes.com/specials-images/imageserve/615382530ab02e70fd28050f/0x0.jpg?format=jpg&crop=1087,611,x0,y55,safe&height=900&width=1600&fit=bounds",
        "https://assets.nst.com.my/images/articles/indrive_1730274408.jpg",
        "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
        "https://assets.aceternity.com/tabs.png",
        "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
        "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
        "https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2019/01/UBERIM_Rider_5.1_UAE_17_0272-RT_airport.jpg",
        "https://www.pymnts.com/wp-content/uploads/2019/03/Uber-Ride-Pass-Surge-Discount.jpg",
        "https://cdn.olaelectric.com/ev-discovery-platform/wysiwyg/Care/Ola-care-2.webp",
        "https://static.blog.bolt.eu/LIVE/wp-content/uploads/2022/06/30134551/ride-booker-book-rides-for-your-team-1024x536.jpg",
        "https://assets.aceternity.com/macbook-scroll.png",
        "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
        "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
        "https://assets.aceternity.com/multi-step-loader.png",
        "https://assets.aceternity.com/vortex.png",
        "https://assets.aceternity.com/wobble-card.png",
        "https://assets.aceternity.com/world-map.webp",
    ];
    return (
        <div className="mx-auto my-10  bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
            <ThreeDMarquee images={images} />
        </div>
    );
}
