import FeaturedProducts from "@/Components/Home/FeaturedProducts";
import HeroSection from "@/Components/Home/HeroSection";
import RecentlyAdded from "@/Components/Home/RecentlyAdded";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <RecentlyAdded />
      <FeaturedProducts />
    </div>
  );
}
