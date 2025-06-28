"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  arrayRemove,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth, db } from "../../../firebase";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    location: "",
    phone: "",
  });
  const [isBuying, setIsBuying] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const userDocRef = doc(db, "carts", u.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setCartItems(docSnap.data().items || []);
          } else {
            setCartItems([]);
          }
        });
        return unsubscribeSnapshot;
      } else {
        setUser(null);
        setCartItems([]);
        router.push("/sign-in");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleRemoveItem = async (productId) => {
    if (!user) return;

    setRemovingItem(productId);
    const itemToRemove = cartItems.find((item) => item.id === productId);

    if (!itemToRemove) {
      toast.error("Item not found in cart");
      setRemovingItem(null);
      return;
    }

    const userDocRef = doc(db, "carts", user.uid);
    try {
      await updateDoc(userDocRef, {
        items: arrayRemove(itemToRemove),
      });
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Remove item error:", err);
      toast.error("Failed to remove item");
    } finally {
      setRemovingItem(null);
    }
  };

  const handleBuyNow = async () => {
    if (!checkoutData.name || !checkoutData.location || !checkoutData.phone) {
      toast.error("Please fill all checkout details");
      return;
    }

    if (!user) {
      toast.error("You must be signed in to place an order");
      router.push("/sign-in");
      return;
    }

    setIsBuying(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems,
        ...checkoutData,
        date: serverTimestamp(),
      });

      await setDoc(doc(db, "carts", user.uid), { items: [] });

      toast.success("Order placed successfully!");
      setCheckoutData({ name: "", location: "", phone: "" });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Failed to place order");
    } finally {
      setIsBuying(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
      return total + price;
    }, 0);
  };

  const isFormValid =
    checkoutData.name && checkoutData.location && checkoutData.phone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#4F46E5",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">🛒</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-600">
            {cartItems.length === 0
              ? "Your cart is waiting for some amazing items!"
              : `${cartItems.length} item${
                  cartItems.length === 1 ? "" : "s"
                } in your cart`}
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Start shopping to add items to your cart
            </p>
            <motion.button
              onClick={() => router.push("/")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Cart Items
              </h2>
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl border-2 border-gray-100"
                          />
                          <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-2xl font-bold text-indigo-600">
                            {item.price}
                          </p>
                        </div>

                        <motion.button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removingItem === item.id}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="text-xl">🗑️</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-semibold">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold text-indigo-600 mt-2">
                    <span>Total:</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery Details
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      👤
                    </span>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                      value={checkoutData.name}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      📍
                    </span>
                    <input
                      type="text"
                      placeholder="Delivery Address"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                      value={checkoutData.location}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      📱
                    </span>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                      value={checkoutData.phone}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleBuyNow}
                  disabled={isBuying || !isFormValid}
                  className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                    isFormValid && !isBuying
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-300"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={
                    isFormValid && !isBuying ? { scale: 1.02, y: -2 } : {}
                  }
                  whileTap={isFormValid && !isBuying ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isBuying ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <span>✅</span>
                        Place Order
                      </>
                    )}
                  </div>
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our terms and conditions
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
