"use client";

import { useGetAllGames } from "../hooks/useGetAllGames";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import Loader from "./Loader";
import GameCardsMapping from "./GameCardsMapping";
import { useState } from "react";

export function PlaceholdersAndVanishInputDemo() {
  const [search, setSearch] = useState('')

  const placeholders = [
    "Emissary Zero",
    "R.E.P.O",
    "Schedule I",
    "The Forest",
    "Valorant",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const {
    data: games = [],
    isLoading,
    error,
  } = useGetAllGames(search);

  if (error) return <div className="flex justify-center my-14 text-white">Error loading games.</div>;
  return (
    <div className="flex flex-col justify-center  items-center px-4" id="search">
      <h2 className="mb-10 font-mono sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Find your game
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        search={search}
        setSearch={setSearch}
      />
      {isLoading ? <Loader /> : <GameCardsMapping data={games} />}

    </div>
  );
}
