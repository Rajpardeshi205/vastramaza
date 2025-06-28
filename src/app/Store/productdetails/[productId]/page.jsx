"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import {
  BsCart3,
  BsTruck,
  BsShield,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import products from "@/products";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../../../../firebase";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.productId;
  const product = products.find((p) => String(p.id) === id);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [rating] = useState(4.5);
  const [reviewCount] = useState(247);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-indigo-600"
        >
          Product not found
        </motion.h1>
      </motion.div>
    );
  }

  const addToCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    setIsAdding(true);
    try {
      const cartDocRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartDocRef);

      const cartItem = {
        ...product,
        quantity,
        addedAt: new Date(),
      };

      if (cartSnap.exists()) {
        const currentItems = cartSnap.data().items || [];
        const exists = currentItems.find((item) => item.id === product.id);
        if (exists) {
          const updatedItems = currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          await updateDoc(cartDocRef, { items: updatedItems });
        } else {
          await updateDoc(cartDocRef, {
            items: arrayUnion(cartItem),
          });
        }
      } else {
        await setDoc(cartDocRef, { items: [cartItem] });
      }

      toast.success("Item added to cart");
      router.push("/Cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please sign in to proceed with purchase");
      return;
    }
    setIsBuying(true);
    try {
      const order = {
        ...product,
        quantity,
        orderDate: new Date().toISOString(),
        userId: user.uid,
        status: "pending",
      };
      await addDoc(collection(db, "orders"), order);
      toast.success("Order placed successfully");
      router.push("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
    setIsBuying(false);
  };

  return (
    <div className="min-h-screen px-6 md:px-12 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto py-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2"
        >
          <div className="relative group">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="rounded-2xl border-2 border-indigo-100 bg-white shadow-xl p-6 object-contain h-[800px] w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-indigo-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            <motion.button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl border border-indigo-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Wishlist"
            >
              <motion.div
                animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isWishlisted ? (
                  <AiFillHeart className="text-red-500 w-6 h-6" />
                ) : (
                  <AiOutlineHeart className="text-indigo-400 w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col gap-6"
        >
          <motion.div
            className="text-sm space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.span
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              {product.category}
            </motion.span>
            <motion.span
              className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              {product.theme}
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {product.name}
          </motion.h1>

          <motion.div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-red-600">
              {product.price}
            </span>
            <span className="-mt-4 inline-block px-2 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded">
              25% OFF
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {i < Math.floor(rating) ? (
                    <AiFillStar className="w-5 h-5 text-yellow-400" />
                  ) : i === Math.floor(rating) && rating % 1 !== 0 ? (
                    <div className="relative">
                      <AiOutlineStar className="w-5 h-5 text-yellow-400" />
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${(rating % 1) * 100}%` }}
                      >
                        <AiFillStar className="w-5 h-5 text-yellow-400" />
                      </div>
                    </div>
                  ) : (
                    <AiOutlineStar className="w-5 h-5 text-gray-300" />
                  )}
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating} ({reviewCount} reviews)
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-gray-600 font-medium">
              Sizes:{" "}
              {product.size?.length ? (
                <span className="text-indigo-600">
                  {product.size.join(", ")}
                </span>
              ) : (
                <em className="text-gray-400">No sizes available</em>
              )}
            </p>
          </motion.div>

          <motion.p
            className="text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Premium quality oversized t-shirt with cool designs, soft cotton
            fabric and comfortable fit for daily style.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <motion.div
              className="flex flex-col items-center text-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <BsTruck className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-black">Free Shipping</p>
                <p className="text-xs text-gray-600">2-3 business days</p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <BsShield className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-black">Warranty</p>
                <p className="text-xs text-gray-600">2 year coverage</p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <BsArrowCounterclockwise className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-semibold text-black">Returns</p>
                <p className="text-xs text-gray-600">30 day policy</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border-2 border-indigo-200 rounded-lg overflow-hidden">
              <motion.button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-indigo-50 text-black font-medium transition-colors"
                whileHover={{ backgroundColor: "rgb(238 242 255)" }}
                whileTap={{ scale: 0.95 }}
              >
                -
              </motion.button>
              <span className="px-6 py-2 border-x-2 border-indigo-200 bg-indigo-50 font-semibold text-black">
                {quantity}
              </span>
              <motion.button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-indigo-50 text-black font-medium transition-colors"
                whileHover={{ backgroundColor: "rgb(238 242 255)" }}
                whileTap={{ scale: 0.95 }}
              >
                +
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={addToCart}
              className="flex-1 bg-[#FF9E9E] hover:bg-[#ff8181] text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isAdding}
            >
              <BsCart3 className="w-5 h-5" />
              {isAdding ? "Adding..." : "Add to Cart"}
            </motion.button>
            <motion.button
              onClick={handleBuyNow}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isBuying}
            >
              {isBuying ? "Processing..." : "Buy Now"}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
