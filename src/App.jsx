import React from "react";
import Hero from "./components/Hero";
import FeaturedVehicles from "./components/FeaturedVehicles";
import ServicesSection from "./components/HereForYou";

const App = () => {
  return (
    <main className="relative">
      <Hero />
      <FeaturedVehicles />
      <ServicesSection/>
    </main>
  );
};

export default App;
