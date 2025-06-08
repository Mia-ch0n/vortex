"use client"
import { useQuery } from "@tanstack/react-query";
import { Game } from "../types/game";
import { fetchGameById } from "../lib/api";

export const useGetGameById = (id: string) => {
  return useQuery<Game, Error>({
    queryKey: ["games", id],
    queryFn: () => fetchGameById(id),
  });
};
