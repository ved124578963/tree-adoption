import React from "react";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import AdoptionProcess from "../Components/Adoptionprocess";
import FAQ from "../Components/FAQ";

export const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <AdoptionProcess />
      <FAQ />
    </div>
  );
};

export default Home;
