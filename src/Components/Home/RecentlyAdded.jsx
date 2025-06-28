"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../Container";
import products from "@/products";
import TransitionLink from "@/TransitionLink";
import {
  containerVariants,
  cardVariants,
  imageVariants,
  priceVariants,
  categoryBadgeVariants,
} from "@/animationVariants";

export default function RecentlyAdded() {
  return (
    <main className="relative flex-1 py-16 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className="text-center mb-16"
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
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              Recently Added
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-gray-600 mt-4 font-medium"
          >
            Discover our latest collection of amazing products
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.slice(6, 14).map((product, index) => (
            <TransitionLink
              key={product.id}
              href={`/Store/productdetails/${product.id}`}
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
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-10"
                />

                <div className="relative bg-gradient-to-br from-indigo-100 via-indigo-50 to-purple-50 group-hover:from-indigo-200 group-hover:via-purple-100 group-hover:to-pink-100 transition-all duration-500 p-6 h-80 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    variants={imageVariants}
                    whileHover="hover"
                    className="w-full h-full object-contain filter drop-shadow-lg"
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
                    {product.name}
                  </motion.h2>

                  <motion.div
                    variants={categoryBadgeVariants}
                    whileHover="hover"
                    className="inline-block px-3 py-1 bg-blue-900 text-white text-xs font-semibold rounded-full mb-4 shadow-sm"
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
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.6 }}
                      className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
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
          ))}
        </motion.div>
      </Container>
    </main>
  );
}
