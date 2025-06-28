"use client";

import { motion } from "framer-motion";
import Container from "../Container";
import Slider from "./Slider";
import TransitionLink from "@/TransitionLink";

export default function HeroSection() {
  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Slider />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <Container>
        <motion.div
          className="absolute left-8 bottom-12 z-10 max-w-md"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
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
            <h1 className="text-4xl md:text-6xl  font-extrabold -mb-4 leading-tight tracking-tight">
              New
            </h1>
            <h1 className="text-4xl md:text-6xl  font-extrabold leading-tight tracking-tight">
              Collections
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Exclusive Deals Just For You!!!
          </motion.p>
          <TransitionLink href="/Store">
            <motion.button
              className="bg-indigo-300 hover:bg-[#FF9E9E] hover:text-black text-white font-semibold py-4 px-8 rounded-full shadow-lg transform transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Shop now
            </motion.button>
          </TransitionLink>
        </motion.div>
      </Container>
    </motion.section>
  );
}
