import Hero from "@/components/Hero";
import Games from "@/components/Games";
import React from "react";
import Layout from "@/components/Layout";
import { PlaceholdersAndVanishInputDemo } from "@/components/AllGamesWithSearchBar";

const Page = () => {
  return (
    <>
      <Layout>
        <Hero />
        <Games />
        <PlaceholdersAndVanishInputDemo />
      </Layout>
    </>
  );
};

export default Page;
