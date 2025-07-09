import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []);

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-pink-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-10">🛒 Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border-2 border-black overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-5 text-center space-y-2">
                    <h2 className="text-2xl text-black font-bold">{item.name}</h2>
                    <p className="text-green-600 font-bold text-lg">₹{item.price}</p>
                    <button
                      className="mt-2 bg-red-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-right">
              <h3 className="text-2xl font-semibold text-gray-800">
                Total: <span className="text-green-600">₹{getTotalPrice()}</span>
              </h3>
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg shadow"
                onClick={() => navigate("/address")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
