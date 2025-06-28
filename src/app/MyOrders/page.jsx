"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { auth, db } from "../../../firebase";

export default function MyOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    async function fetchOrders() {
      setLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error("Failed to load your orders");
      }
      setLoading(false);
    }

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600 font-semibold text-lg">
        Loading your orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
        <p>You haven’t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-indigo-600">My Orders</h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-gray-200 rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-indigo-700">
                    Order ID: {order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Ordered on{" "}
                    {new Date(order.date).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                  Total Items: {order.items?.length || 0}
                </p>
              </div>

              <div className="grid gap-4">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start sm:items-center gap-4 border-t pt-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold text-gray-800">
                        {item.name}
                      </span>
                      <span className="text-gray-600">
                        Category: {item.category}
                      </span>
                      <span className="text-gray-600">Theme: {item.theme}</span>
                      <span className="text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                      <span className="text-gray-600">Price: {item.price}</span>
                      <span className="text-gray-600">
                        Size: {item.size?.join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Delivery To: <strong>{order.name}</strong> — {order.phone},{" "}
                {order.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
