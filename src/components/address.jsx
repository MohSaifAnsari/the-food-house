import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:5000");

function Address() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const loginEmail = localStorage.getItem("userEmail");

  const [formData, setFormData] = useState({
    customerName: "", area: "", town: "", city: "", state: "",
    pincode: "", mobile: "", message: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error("🛒 Your cart is empty!");

    setLoading(true);
    const date = new Date().toLocaleString();

    const orderPayload = {
      orders: cartItems.map((item) => ({
        ...formData,
        email: loginEmail, // ✅ Use login email here
        date,
        name: item.name,
        price: item.price,
        image: item.image,
      })),
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("🎉 Order placed successfully!");
        localStorage.removeItem("cart");
        socket.emit("newOrder");
        setTimeout(() => navigate("/your-orders"), 1500);
      } else {
        toast.error(data.message || "Order failed!");
      }
    } catch {
      toast.error("❌ Server error while placing order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center px-4 py-12">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Shipping Address</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {["customerName", "area", "town", "city", "state", "pincode", "mobile"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          ))}

          {/* ✅ Email field (READ-ONLY and from login) */}
          <input
            type="email"
            value={loginEmail}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
            title="This is your login email and cannot be changed"
          />

          <div className="md:col-span-2">
            <textarea
              name="message"
              placeholder="Any Message (Optional)"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 h-24 resize-none"
            />
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-10 rounded-full transition"
            >
              {loading ? "Placing..." : "🛒 Submit & Order"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Address;
