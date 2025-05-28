"use client";
import React from "react";
import { Carousel, Card } from "./Cards";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/lib/api";
export default function AppleCardsCarouselDemo() {
  const {
    data: games = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games.</div>;
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Discover, Play, Conquer.
      </h2>
      <p className="max-w-7xl pl-4 mx-auto text-xs md:text-sm text-neutral-500 dark:text-neutral-400 opacity-60 mt-4">
        Our Best sales
      </p>
      <Carousel
        items={games.map((game, index) => (
          <Card
            key={game.id || index}
            card={{
              title: game.name,
              category: game.publisher,
              src: game.image_url,
              content: (
                <div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto">
                    {game.description}
                  </p>
                </div>
              ),
            }}
            index={index}
          />
        ))}
      />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
