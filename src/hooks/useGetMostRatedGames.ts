"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchMostRatedGames } from "@/lib/api";
import { Game } from "@/types/game";

export const useGetMostRatedGames = () => {
  return useQuery<Game[], Error>({
    queryKey: ["games", "most-rated"],
    queryFn: fetchMostRatedGames,
  });
};
