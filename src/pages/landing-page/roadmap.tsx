"use client";

import React, { ReactNode, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface RoadmapProps {
    children: ReactNode;
}

interface CardProps {
    index: number;
    icon: any;
    title: string;
    description: string;
    background: string;
}

export default function Roadmap({ children }: RoadmapProps) {
    return (
        <section className="md:px-16 w-full">
            <section className="flex flex-col justify-center items-center md:p-16 w-full">
                <article className="md:px-16 p-5 w-full">
                    <div className="top-[80px] sticky flex justify-center pt-[180px] h-screen">
                        <h1 className="font-bold text-xl sm:text-2xl md:text-4xl lg:text-[6em] text-black  dark:text-white tracking-wide md:tracking-[20px] text-center">
                            How It Works?
                        </h1>

                    </div>
                    <div>{children}</div>
                </article>
            </section>
        </section>
    );
}

const RoadmapCard: React.FC<CardProps> = ({
    index,
    icon,
    title,
    description,
    background
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start start'],
    });

    const rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [40, -index * 4] // Start with 20 degrees rotation, end with -i * 4 degrees
    );

    return (
        <div ref={containerRef} className="top-[80px] sticky flex justify-center pt-[150px] h-screen">
            <motion.div
                className={`py-10 px-8 rounded-[24px] flex flex-col gap-6 max-w-[450px] max-h-[320px] relative`}
                style={{
                    background: background,
                    rotate
                }}
            >
                {/* <img alt={logoAlt} src={`/${logoSrc}.svg`} width={48} height={48} /> */}
                {icon}
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl text-white">{title}</h1>
                    <p className="font-normal text-white text-sm md:text-lg">{description}</p>
                </div>
            </motion.div>
        </div>
    );
};

Roadmap.Card = RoadmapCard;