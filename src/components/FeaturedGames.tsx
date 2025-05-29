"use client";
import React, { JSX } from "react";
import { Carousel, Card } from "./Cards";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedGames } from "@/lib/api";
import Loader from "./Loader";
import Container from "./Container";
import { Game } from "@/types/game";
import { useGetFeaturedGames } from "@/hooks/useGetFeaturedGames";



export default function AppleCardsCarouselDemo(): JSX.Element {
  const {
    data: games = [],
    isLoading,
    error,
  } = useGetFeaturedGames();

  if (isLoading) return <Loader />;
  if (error) return <div className="flex justify-center my-14 text-white">Error loading games.</div>;

  return (
    <div className="w-full h-full py-20">
      <Container>
        <h2 className="  mx-auto font-mono text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
          Discover, Play, Conquer.
        </h2>
        <p className=" font-mono mx-auto text-xs md:text-sm text-white dark:text-white opacity-60 mt-4">
          Featured Games
        </p>
      </Container>
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
