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
import { themes } from "@/products";
import { motion } from "framer-motion";

export default function ThemeSec({ selected = [], onChange }) {
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
          Themes
        </h3>
      </motion.div>

      <Card className="shadow-sm">
        <List className="divide-y divide-blue-gray-100">
          {themes.map((theme, index) => {
            const isChecked = selected.includes(theme);
            return (
              <ListItem className="p-0" key={index}>
                <label
                  htmlFor={`theme-${index}`}
                  className={`flex items-center w-full px-3 py-2 cursor-pointer rounded transition 
                    ${
                      isChecked
                        ? "bg-indigo-300 text-indigo-900 hover:bg-indigo-400"
                        : "text-indigo-700 hover:bg-indigo-100"
                    }`}
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id={`theme-${index}`}
                      ripple={false}
                      checked={isChecked}
                      onChange={() => onChange(theme)}
                      className="hover:before:opacity-0"
                      containerProps={{ className: "p-0" }}
                      color="indigo"
                    />
                  </ListItemPrefix>
                  <Typography className="font-medium text-sm sm:text-base">
                    {theme}
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
