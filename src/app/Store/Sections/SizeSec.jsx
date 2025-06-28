"use client";

import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function SizeSec({ selected = [], onChange }) {
  const toggleSize = (size) => {
    if (selected.includes(size)) {
      onChange(selected.filter((s) => s !== size));
    } else {
      onChange([...selected, size]);
    }
  };

  return (
    <div className="mb-6 sm:mb-4">
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
        <h3 className="text-xl md:text-2xl mb-3 font-black tracking-tight">
          Sizes
        </h3>
      </motion.div>

      <div className="flex flex-wrap mt-4 gap-2 sm:gap-3">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selected.includes(size) ? "filled" : "outlined"}
            className={`rounded-full px-4 py-1 text-xs sm:text-sm ${
              selected.includes(size)
                ? "bg-indigo-300 text-indigo-900 hover:bg-indigo-400"
                : "text-indigo-700 hover:bg-indigo-100"
            }`}
            onClick={() => toggleSize(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
}
