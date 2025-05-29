import Hero from "@/components/Hero";
import FeaturedGames from "@/components/FeaturedGames";
import React from "react";
import Layout from "@/components/Layout";
import { PlaceholdersAndVanishInputDemo } from "@/components/AllGamesWithSearchBar";

const Page = () => {
  return (
    <>
      <Layout>
        <Hero />
        <FeaturedGames />
        <PlaceholdersAndVanishInputDemo />
      </Layout>
    </>
  );
};

export default Page;
