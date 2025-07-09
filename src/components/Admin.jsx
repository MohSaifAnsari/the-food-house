import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Navigate } from "react-router-dom"; // ✅ Import here

const socket = io("http://localhost:5000");

function Admin() {
  const [groupedOrders, setGroupedOrders] = useState({});

  // ✅ Protect route – redirect if not logged in
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    return <Navigate to="/admin-login" />;
  }

  const groupOrders = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
      const key = `${order.email}-${order.date}`;
      if (!grouped[key]) {
        grouped[key] = {
          _ids: [],
          customerName: order.customerName,
          email: order.email,
          mobile: order.mobile,
          area: order.area,
          town: order.town,
          city: order.city,
          state: order.state,
          pincode: order.pincode,
          message: order.message,
          date: order.date,
          products: [],
        };
      }
      grouped[key]._ids.push(order._id);
      grouped[key].products.push({
        _id: order._id,
        name: order.name,
        price: order.price,
        image: order.image,
        status: order.status,
      });
    });
    return grouped;
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setGroupedOrders(groupOrders(data));
    } catch (err) {
      console.error("Failed to fetch admin orders:", err);
    }
  };

  const markOrderAsDelivered = async (orderIds) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/bulk-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: orderIds, status: "delivered" }),
      });
      if (res.ok) {
        socket.emit("ordersUpdated");
      }
    } catch (err) {
      console.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
    socket.on("ordersUpdated", fetchOrders);
    return () => socket.off("ordersUpdated");
  }, []);

  return (
    <div className="min-h-screen bg-green-100 py-10 px-4">
      <h1 className="text-4xl text-center text-blue-800 mb-10 font-extrabold">
        🛒 Admin Panel – Orders
      </h1>
      {Object.keys(groupedOrders).length === 0 ? (
        <p className="text-center text-gray-600">No orders received yet.</p>
      ) : (
        <div className="space-y-10 max-w-5xl mx-auto">
          {Object.entries(groupedOrders).map(([key, customer], index) => {
            const totalPrice = customer.products.reduce((sum, item) => sum + item.price, 0);
            const allDelivered = customer.products.every((p) => p.status === "delivered");

            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border space-y-4">
                <div className="space-y-1 text-sm text-gray-800">
                  <p className="text-lg font-bold text-blue-700">👤 Customer Details</p>
                  <p><FaUser className="inline mr-1" /> <strong>Name:</strong> {customer.customerName}</p>
                  <p><FaPhoneAlt className="inline mr-1" /> <strong>Mobile:</strong> {customer.mobile}</p>
                  <p><FaEnvelope className="inline mr-1" /> <strong>Email:</strong> {customer.email}</p>
                  <p><FaMapMarkerAlt className="inline mr-1" />
                    <strong>Address:</strong> {customer.area}, {customer.town}, {customer.city}, {customer.state} - {customer.pincode}
                  </p>
                  {customer.message && <p><strong>Message:</strong> {customer.message}</p>}
                  <p className="text-gray-500 text-xs">📅 {customer.date}</p>
                  <p className="text-green-700 font-semibold">💰 Total: ₹{totalPrice}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t pt-4">
                  {customer.products.map((product, i) => (
                    <div key={i} className="flex items-center bg-gray-50 p-3 rounded border justify-between">
                      <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-green-600 text-sm">₹{product.price}</p>
                          {product.status === "delivered" && (
                            <p className="text-sm font-semibold text-green-700 mt-1">✅ Delivered</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {!allDelivered && (
                  <button
                    onClick={() => markOrderAsDelivered(customer._ids)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                  >
                    ✅ Mark Entire Order as Delivered
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Admin;
