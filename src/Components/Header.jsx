"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiHome,
  FiGrid,
  FiInfo,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import TransitionLink from "@/TransitionLink";
import { auth } from "../../firebase";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Store", path: "/Store", icon: FiGrid },
    { name: "Cart", path: "/Cart", icon: FiShoppingCart },
  ];

  if (user) {
    navItems.push({ name: "My Orders", path: "/MyOrders", icon: FiUser });
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSignOut = async () => {
    if (!user) return;

    try {
      await auth.signOut();
      toast.success(`Logged out successfully`, {
        duration: 3000,
        position: "top-center",
        icon: "👋",
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "12px",
          padding: "16px 24px",
          fontWeight: "600",
        },
      });
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      <Toaster />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <TransitionLink href="/">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-400 hover:text-[#FF9E9E] transition-colors duration-200 cursor-pointer">
                Vastramaza
              </span>
            </div>
          </TransitionLink>

          <nav className="hidden md:flex gap-6 text-indigo-400 text-base font-medium">
            {navItems.map(({ name, path, icon: Icon }) => (
              <TransitionLink key={name} href={path}>
                <div className="flex items-center gap-2 text-indigo-500 hover:text-[#FF9E9E] px-3 py-2 text-sm font-medium transition-all duration-200 relative group cursor-pointer">
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </div>
              </TransitionLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <FiSearch className="w-5 h-5 text-indigo-400 hover:text-[#FF9E9E] cursor-pointer transition-colors duration-200" />

            {user ? (
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
                title="Logout"
              >
                Logout
              </button>
            ) : (
              <TransitionLink href="/sign-in">
                <FiUser
                  className="w-6 h-6 text-indigo-400 hover:text-[#FF9E9E] cursor-pointer transition-colors duration-200"
                  title="Sign In"
                />
              </TransitionLink>
            )}
          </div>

          <button
            className="md:hidden text-indigo-400 hover:text-[#FF9E9E]"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3 text-indigo-400 bg-white/90 backdrop-blur-md">
            {navItems.map(({ name, path, icon: Icon }) => (
              <TransitionLink
                key={name}
                href={path}
                className="flex items-center gap-2 text-base font-medium hover:text-[#FF9E9E] py-2"
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </TransitionLink>
            ))}

            <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
              <FiSearch className="w-5 h-5 cursor-pointer" />

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full font-medium text-sm sm:text-base h-8 sm:h-10 px-3 sm:px-4 cursor-pointer"
                  title="Logout"
                >
                  Logout
                </button>
              ) : (
                <TransitionLink href="/sign-in">
                  <FiUser
                    className="w-6 h-6 text-indigo-400 hover:text-[#FF9E9E] cursor-pointer transition-colors duration-200"
                    title="Sign In"
                  />
                </TransitionLink>
              )}
            </div>
          </div>
        )}
      </motion.header>
    </>
  );
}
