"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "@/TransitionLink";
import {
  containerVariants,
  cardVariants,
  imageVariants,
  priceVariants,
  categoryBadgeVariants,
} from "@/animationVariants";

export default function ProductGrid({ filteredItems }) {
  return (
    <motion.div
      className="w-full px-4 sm:px-6 py-6 overflow-y-auto"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
        className="mb-12"
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] bg-clip-text text-transparent"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Items
          </h2>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mt-3 rounded-full"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filteredItems.length}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <TransitionLink
                key={item.id}
                href={`/Store/productdetails/${item.id}`}
                className="group block"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 backdrop-blur-sm"
                  layoutId={`item-${item.id}`}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-10"
                  />

                  <div className="relative bg-gradient-to-br from-indigo-100 via-indigo-50 to-purple-50 group-hover:from-indigo-200 group-hover:via-purple-100 group-hover:to-pink-100 transition-all duration-500 p-4 h-96 flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      variants={imageVariants}
                      whileHover="hover"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    />

                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                        rotate: 360,
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{
                        opacity: [0, 1, 0],
                        scale: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        delay: 0.3,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                    />
                  </div>

                  <div className="p-6 relative z-20">
                    <motion.h2
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 mb-3 line-clamp-2"
                    >
                      {item.name}
                    </motion.h2>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <motion.div
                        variants={categoryBadgeVariants}
                        whileHover="hover"
                        className="inline-block px-3 py-1 bg-blue-900 text-white text-xs font-semibold rounded-full shadow-sm"
                      >
                        {item.category}
                      </motion.div>

                      <motion.div
                        variants={categoryBadgeVariants}
                        whileHover="hover"
                        className="inline-block px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded-full shadow-sm"
                      >
                        {item.theme}
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-between">
                      <motion.p
                        variants={priceVariants}
                        whileHover="hover"
                        className="text-2xl font-black text-red-500"
                      >
                        {item.price}
                      </motion.p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                  />
                </motion.div>
              </TransitionLink>
            ))
          ) : (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mb-6 flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.div>
              <motion.p
                className="text-xl font-semibold text-gray-400 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                No items found
              </motion.p>
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Try adjusting your filters
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
