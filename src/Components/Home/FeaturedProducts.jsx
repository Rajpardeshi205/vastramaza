"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../Container";
import TransitionLink from "@/TransitionLink";
import products from "@/products";
import {
  containerVariants,
  cardVariants,
  imageVariants,
  priceVariants,
  badgeVariants,
} from "@/animationVariants";

const featuredProducts = products.filter((product) =>
  [102, 104, 206, 303, 404, 602, 704, 807].includes(product.id)
);

export default function FeaturedProducts() {
  return (
    <main className="relative flex-1 py-16 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl"
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            stiffness: 80,
          }}
          className="text-center mb-16 relative"
        >
          {/* Featured badge */}

          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="inline-block bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-[length:200%_100%] bg-clip-text text-transparent"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Featured Products
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-700 mt-6 font-medium max-w-2xl mx-auto"
          >
            Handpicked premium selections that define excellence and quality
          </motion.p>

          {/* Animated decorative line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "150px", opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 mx-auto mt-8 rounded-full shadow-lg"
          />

          {/* Floating sparkles */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/4 text-2xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [360, 180, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-4 right-1/4 text-xl"
          >
            💎
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          {featuredProducts.map((product, index) => (
            <TransitionLink
              key={product.id}
              href={`/Store/productdetails/${product.id}`}
              className="group block"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -16,
                  rotateY: 5,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100 backdrop-blur-sm group-hover:border-amber-300"
              >
                {/* Featured star badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.6,
                    type: "spring",
                  }}
                  className="absolute top-4 right-4 z-30 bg-gradient-to-r from-amber-400 to-yellow-500 text-white p-2 rounded-full shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ⭐
                  </motion.div>
                </motion.div>

                {/* Premium gradient overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 z-20"
                />

                {/* Enhanced image container */}
                <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 group-hover:from-amber-100 group-hover:via-orange-100 group-hover:to-yellow-100 transition-all duration-700 p-8 h-80 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    variants={imageVariants}
                    whileHover="hover"
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />

                  {/* Animated light rays */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{
                      opacity: [0, 0.3, 0],
                      scale: [0, 2, 0],
                      rotate: 180,
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-radial from-amber-200/30 via-transparent to-transparent"
                  />

                  {/* Premium floating elements */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{
                      opacity: [0, 1, 0],
                      y: [-10, -20, -10],
                      x: [0, 5, 0],
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute top-6 left-6 text-amber-400 text-lg"
                  >
                    💎
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{
                      opacity: [0, 1, 0],
                      y: [10, 20, 10],
                      x: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-6 right-6 text-orange-400 text-sm"
                  >
                    ✨
                  </motion.div>
                </div>

                {/* Enhanced content section */}
                <div className="p-6 relative z-30 bg-gradient-to-b from-white to-amber-50/30">
                  <motion.h2
                    whileHover={{ x: 6, color: "#d97706" }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300 mb-3 line-clamp-2"
                  >
                    {product.name}
                  </motion.h2>

                  <motion.div
                    variants={badgeVariants}
                    whileHover="hover"
                    className="inline-block px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-full mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  >
                    {product.category}
                  </motion.div>

                  <div className="flex items-center justify-between">
                    <motion.p
                      variants={priceVariants}
                      whileHover="hover"
                      className="text-2xl font-black text-red-500"
                    >
                      {product.price}
                    </motion.p>

                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.3,
                        backgroundColor: "#f59e0b",
                      }}
                      transition={{ duration: 0.8 }}
                      className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    >
                      <motion.svg
                        whileHover={{ scale: 1.2 }}
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>

                {/* Premium shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent transform -skew-x-12"
                />
              </motion.div>
            </TransitionLink>
          ))}
        </motion.div>
      </Container>
    </main>
  );
}
