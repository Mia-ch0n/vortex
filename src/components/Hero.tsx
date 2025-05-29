"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

const images = [
  "https://pt.egw.news/_next/image?url=https%3A%2F%2Fegw.news%2Fuploads%2Fnews%2F1%2F17%2F1743925013265_1743925013265.webp&w=1920&q=75",
  "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png",
  "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/minecraft_poster.png",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-background text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-background lg:block"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div className="relative px-6 py-26 lg:px-8 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div className="mb-5">
                <img
                  src="/logo/logo.png"
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full border border-white p-1"
                />
              </div>
              <div className="hidden sm:mb-10 sm:flex">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-300 ring-1 ring-gray-700 hover:ring-gray-600 font-mono">
                  New games added daily - no DRM, no restrictions{" "}
                  <a
                    href="#"
                    className="font-semibold whitespace-nowrap text-white shadow-xl font-mono"
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    Browse all <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <h1 className="text-5xl font-medium tracking-tight text-pretty text-white sm:text-6xl font-mono">
                Discover your next gaming adventure
              </h1>
              <p className="mt-8 text-lg font-normal text-pretty text-gray-300 sm:text-xl/8 font-mono">
                Explore a vast collection of premium games, all available for
                free. From indie gems to AAA titles, find your perfect game in
                our ever-growing library.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <PrimaryButton text="Explore Games" />
                <a
                  href="#"
                  className="text-sm/6 font-semibold text-gray-200 hover:text-white font-mono"
                >
                  How it works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Carousel with Framer Motion */}
      <div className="bg-gray-900 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 overflow-hidden">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
