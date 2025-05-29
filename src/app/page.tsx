import Hero from "@/components/Hero";
import FeaturedGames from "@/components/FeaturedGames";
import React from "react";
import Layout from "@/components/Layout";
import { PlaceholdersAndVanishInputDemo } from "@/components/AllGamesWithSearchBar";
import MostRatedGames from "@/components/MostRatedGames";

const Page = () => {
  return (
    <>
      <Layout>
        <Hero />
        <FeaturedGames />
        <MostRatedGames />
        <PlaceholdersAndVanishInputDemo />
      </Layout>
    </>
  );
};

export default Page;
