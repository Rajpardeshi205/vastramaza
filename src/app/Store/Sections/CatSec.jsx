"use client";

import React from "react";
import {
  Input,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { categories } from "@/products";
import { motion } from "framer-motion";

export default function CatSec({ selected = [], onChange }) {
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
          Catagories
        </h3>
      </motion.div>

      <Card className="max-h-64 sm:max-h-full overflow-y-auto shadow-none sm:shadow-md">
        <List>
          {categories.map((category, index) => {
            const isChecked = selected.includes(category);
            return (
              <ListItem className="p-0" key={index}>
                <label
                  htmlFor={`cat-${index}`}
                  className={`flex items-center w-full px-3 py-2 cursor-pointer rounded-md transition 
                    ${
                      isChecked
                        ? "bg-indigo-300 text-indigo-900 hover:bg-indigo-400"
                        : "text-indigo-700 hover:bg-indigo-100"
                    }`}
                >
                  <ListItemPrefix className="mr-2">
                    <Checkbox
                      id={`cat-${index}`}
                      ripple={false}
                      checked={isChecked}
                      onChange={() => onChange(category)}
                      className="hover:before:opacity-0"
                      containerProps={{ className: "p-0" }}
                      color="indigo"
                    />
                  </ListItemPrefix>
                  <Typography className="font-medium text-sm sm:text-base">
                    {category}
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
