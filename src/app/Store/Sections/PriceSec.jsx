"use client";

import React from "react";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

const prices = [
  "Rs. 599 - Rs. 1073",
  "Rs. 1074 - Rs. 1548",
  "Rs. 1549 - Rs. 2023",
  "Rs. 2024 - Rs. 2499",
];

export default function PriceSec({ selected = [], onChange }) {
  const togglePrice = (priceLabel) => {
    if (selected.includes(priceLabel)) {
      onChange(selected.filter((p) => p !== priceLabel));
    } else {
      onChange([...selected, priceLabel]);
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
          Prices
        </h3>
      </motion.div>
      <Card className="shadow-sm">
        <List className="divide-y divide-blue-gray-100">
          {prices.map((priceLabel, index) => {
            const isChecked = selected.includes(priceLabel);
            return (
              <ListItem className="p-0" key={index}>
                <label
                  htmlFor={`price-${index}`}
                  className={`flex items-center w-full px-3 py-2 cursor-pointer rounded-md transition 
                    ${
                      isChecked
                        ? "bg-indigo-300 text-indigo-900 hover:bg-indigo-400"
                        : "text-indigo-700 hover:bg-indigo-100"
                    }`}
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id={`price-${index}`}
                      ripple={false}
                      checked={isChecked}
                      onChange={() => togglePrice(priceLabel)}
                      className="hover:before:opacity-0"
                      containerProps={{ className: "p-0" }}
                      color="indigo"
                    />
                  </ListItemPrefix>
                  <Typography
                    color={isChecked ? "indigo" : "blue-gray"}
                    className={`font-medium text-sm sm:text-base`}
                  >
                    {priceLabel}
                  </Typography>
                </label>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
  );
}
