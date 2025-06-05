"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedGames } from "../lib/api";
import { Game } from "../types/game";

export const useGetFeaturedGames = () => {
  return useQuery<Game[], Error>({
    queryKey: ["games", "featured"],
    queryFn: fetchFeaturedGames,
  });
};
