
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../lib/api";
import { Game } from "../types/game";

export const useGetAllGames = (search: string = "") => {
    console.log(search)
    return useQuery<Game[], Error>({
        queryKey: ["games", search],
        queryFn: () => fetchGames(search),
    });
};