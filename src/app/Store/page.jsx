"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";

import CatSec from "./Sections/CatSec";
import SizeSec from "./Sections/SizeSec";
import PriceSec from "./Sections/PriceSec";
import ThemeSec from "./Sections/ThemeSec";
import ProductGrid from "./ProductGrid";
import products from "@/products";
import Container from "@/Components/Container";
import {
  containerVariants,
  overlayVariants,
  mobileFilterVariants,
  filterSectionVariants,
} from "@/animationVariants";

export default function Store() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const toggleItem = (array, item) =>
    array.includes(item) ? array.filter((i) => i !== item) : [...array, item];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => toggleItem(prev, category));
  };

  const handleThemeChange = (theme) => {
    setSelectedThemes((prev) => toggleItem(prev, theme));
  };

  const handlePriceChange = (updatedSelectedPrices) => {
    setSelectedPrices(updatedSelectedPrices);
  };

  const handleSizeChange = (updatedSelectedSizes) => {
    setSelectedSizes(updatedSelectedSizes);
  };

  const parsePrice = (priceStr) =>
    parseInt(priceStr.replace(/[₹Rs.,\s]/g, ""), 10) || 0;

  const extractMinMax = (label) => {
    if (typeof label !== "string") return [0, Infinity];
    const parts = label.match(/\d+/g);
    return parts
      ? [parseInt(parts[0], 10), parseInt(parts[1], 10)]
      : [0, Infinity];
  };

  const filteredItems = products.filter((item) => {
    const price = parsePrice(item.price);

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    const themeMatch =
      selectedThemes.length === 0 || selectedThemes.includes(item.theme);

    const priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.some((label) => {
        const [min, max] = extractMinMax(label);
        return price >= min && price <= max;
      });

    let itemSizes = item.size;
    if (typeof itemSizes === "string") {
      itemSizes = [itemSizes];
    }

    const sizeMatch =
      selectedSizes.length === 0 ||
      itemSizes.some((size) => selectedSizes.includes(size));

    return categoryMatch && themeMatch && priceMatch && sizeMatch;
  });

  const FilterContent = ({ variants = filterSectionVariants }) => (
    <>
      <motion.div variants={variants}>
        <CatSec selected={selectedCategories} onChange={handleCategoryChange} />
      </motion.div>
      <motion.div variants={variants}>
        {/* Pass full selectedSizes array and onChange that accepts updated array */}
        <SizeSec selected={selectedSizes} onChange={handleSizeChange} />
      </motion.div>
      <motion.div variants={variants}>
        <PriceSec selected={selectedPrices} onChange={handlePriceChange} />
      </motion.div>
      <motion.div variants={variants}>
        <ThemeSec selected={selectedThemes} onChange={handleThemeChange} />
      </motion.div>
    </>
  );

  return (
    <motion.div
      className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container></Container>
      <div className="lg:hidden sticky top-16 sm:top-20 z-40 bg-white border-b border-gray-200 p-4">
        <motion.button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Filters"
        >
          <FiFilter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
        </motion.button>
      </div>

      <motion.div
        className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto px-4 py-6 text-[15px] sticky top-24 h-[calc(100vh-96px)]"
        variants={filterSectionVariants}
      >
        <FilterContent />
      </motion.div>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMobileFiltersOpen(false)}
              aria-label="Close Filters Overlay"
            />

            <motion.div
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto"
              variants={mobileFilterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <motion.button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close Filters"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-4 text-[15px] space-y-6">
                <FilterContent variants={filterSectionVariants} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 w-full">
        <ProductGrid filteredItems={filteredItems} />
      </div>
    </motion.div>
  );
}
