"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Container from "./Container";
const people = [
    {
        id: 1,
        name: "Laith Ferjeoui",
        link: "https://laith-ferjeoui-portfolio.vercel.app",
        designation: "Software Engineer",
        image:
            "/credits/laith.jpg",
    },
    {
        id: 2,
        name: "Meryam Rakkez",
        link: "https://github.com/Mia-ch0n",
        designation: "Software Engineer",
        image:
            "/credits/meryam.jpg",
    },

];

export function Credits() {
    return (
        <Container>
            <h2 className="mb-10 font-mono sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
                Developed and Maintaned by
            </h2>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={people} />
            </div>
        </Container>
    );
}
