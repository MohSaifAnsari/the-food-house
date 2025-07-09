import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

export default function YourOrders() {
  const [orders, setOrders] = useState({});
  const [editData, setEditData] = useState(null);
  const email = localStorage.getItem("userEmail");

  const fetchOrders = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/${email}`);
    const data = await res.json();

    const grouped = {};
    for (const key in data.groupedOrders) {
      const order = data.groupedOrders[key];
      const productMap = {};
      order.products.forEach((product) => {
        if (productMap[product._id]) {
          productMap[product._id].quantity += 1;
          productMap[product._id].total += product.price;
        } else {
          productMap[product._id] = {
            _id: product._id,
            name: product.name,
            image: product.image,
            quantity: 1,
            total: product.price,
            status: product.status,
          };
        }
      });
      grouped[key] = { ...order, products: Object.values(productMap) };
    }

    setOrders(grouped);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    const res = await fetch(`http://localhost:5000/api/orders/cancel/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      fetchOrders();
    } else {
      toast.error("Failed to cancel");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/update/${editData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Order updated");
        setEditData(null);
        fetchOrders();
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Server error while updating");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h1 className="text-4xl text-center font-bold text-rose-700 mb-10">📦 Your Orders</h1>

      {Object.keys(orders).length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-8 max-w-5xl mx-auto">
          {Object.entries(orders).map(([key, group], index) => {
            const total = group.products.reduce((sum, p) => sum + p.total, 0);
            const isDelivered = group.products.every((p) => p.status === "delivered");

            return (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-md p-6 border space-y-3 ${
                  isDelivered ? "opacity-60 grayscale backdrop-blur-sm" : ""
                }`}
              >
                {/* ✏️ Edit Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() =>
                      setEditData({
                        _id: group._id,
                        customerName: group.customerName,
                        mobile: group.mobile,
                        area: group.area,
                        town: group.town,
                        city: group.city,
                        state: group.state,
                        pincode: group.pincode,
                        message: group.message,
                      })
                    }
                    className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>

                {/* 👤 Customer Info */}
                <div className="text-gray-800 text-sm space-y-1">
                  <p><FaUser className="inline mr-1 text-rose-500" /> <strong>Name:</strong> {group.customerName}</p>
                  <p><FaPhoneAlt className="inline mr-1 text-green-600" /> <strong>Mobile:</strong> {group.mobile}</p>
                  <p><FaEnvelope className="inline mr-1 text-blue-600" /> <strong>Email:</strong> {group.email}</p>
                  <p><FaMapMarkerAlt className="inline mr-1 text-red-600" />
                    <strong>Address:</strong> {group.area}, {group.town}, {group.city}, {group.state} - {group.pincode}
                  </p>
                  {group.message && <p><strong>Message:</strong> {group.message}</p>}
                  <p className="text-xs text-gray-500">📅 {group.date}</p>
                  <p className="text-green-700 font-semibold mt-2">💰 Total: ₹{total}</p>
                  {isDelivered && (
                    <p className="text-green-600 font-bold text-sm">✅ Entire Order Delivered</p>
                  )}
                </div>

                {/* 🧾 Product List */}
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mt-4">
                  {group.products.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center bg-gray-50 p-3 rounded-lg border relative"
                    >
                      <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded mr-3" />
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-gray-600">Qty: {p.quantity}</p>
                        <p className="text-green-600 text-sm font-bold">₹{p.total}</p>
                        {p.status === "delivered" ? (
                          <p className="text-xs text-green-700 font-semibold mt-1">✅ Delivered</p>
                        ) : (
                          <button
                            onClick={() => cancelOrder(p._id)}
                            className="text-xs text-red-600 underline mt-1"
                          >
                            ❌ Cancel this item
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Edit Drawer */}
      <AnimatePresence>
        {editData && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setEditData(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <h2 className="text-xl font-bold text-rose-700 mb-6">✏️ Update Order Details</h2>
              {["customerName", "mobile", "area", "town", "city", "state", "pincode", "message"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.toUpperCase()}
                  value={editData[field]}
                  onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                  className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              ))}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleUpdate}
                  className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700"
                >
                  ✅ Update
                </button>
                <button
                  onClick={() => setEditData(null)}
                  className="text-rose-600 border px-4 py-2 rounded hover:bg-rose-100"
                >
                  ❌ Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
