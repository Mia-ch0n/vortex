"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/lib/api";
import { Game } from "@/types/game";

export const useGetAllGames = () => {
  return useQuery<Game[], Error>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
};
