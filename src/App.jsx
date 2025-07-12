import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from './components/Navbar';
import abouttt from './components/abouttt';
import Product from './components/product';
import Contact from './components/contact';
import Footer from './components/Footer';
import Cart from './components/cart';
import Address from './components/address';
import Admin from './components/Admin';
import YourOrders from './components/YourOrders';
import Register from './components/register';
import AdminLogin from './components/adminlogin';


// Home Component
const Home = () => (
  <>
    <Navbar />

    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-[url('images/backgrounddd.jpg')]"
      id="home"
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-20">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
            🍽️ The Food House
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-pink-400 font-semibold mb-4 drop-shadow">
            Spicy, Tasty, and Totally Craveable 🌶️
          </h2>
          <p className="text-lg sm:text-xl text-red-400 mb-4 font-medium drop-shadow">
            जो खाए एक बार, वो मांगे बार-बार 😋
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
            "Come for the food, stay for the burp. 🍛🔥 From grandma's kitchen to your belly.🍪"
          </p>
          <a
            href="#products"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
          >
            🛒 Order Now
          </a>
        </div>
      </div>
    </div>

    <section className="bg-white px-4 sm:px-6 md:px-12 py-12" id="about">
      <About />
    </section>

    <section className="bg-white px-4 sm:px-6 md:px-12 py-12" id="products">
      <Product showHeader={true} />
    </section>

    <section className="px-4 sm:px-6 md:px-12 py-12" id="contact">
      <div className="bg-green-500 border-2 border-red-500 flex justify-center items-center h-20 sm:h-24 mb-10 rounded-md shadow">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center">
          ☎️ <span className="text-pink-500">Contact</span> Us
        </h1>
      </div>
      <Contact />
    </section>

    <Footer />

    <div className="text-center bg-gray-100 py-6 px-4">
      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
        created by <span className="text-pink-500">👷🏻‍♂️ Er. Saif Ansari</span> | all rights reserved |
      </p>
    </div>
  </>
);

// Define routes
const router = createBrowserRouter([
  { path: '/', element: <Register /> },
  { path: '/register', element: <Register /> },
  { path: '/home', element: <Home /> },
  { path: '/cart', element: <Cart /> },
  { path: '/address', element: <Address /> },
  { path: '/admin-login', element: <AdminLogin /> },
  { path: '/admin', element: <Admin /> },
  { path: '/your-orders', element: <YourOrders /> },
  {
    path: '*',
    element: (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <h1 className="text-4xl font-bold text-red-600 text-center">
          404 - Page Not Found 💀
        </h1>
      </div>
    ),
  },
]);

// ✅ Main App Component
function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://tfh-backend-4lb5.onrender.com/api/ping")
        .then(() => console.log("🔁 Pinged backend to keep alive"))
        .catch(() => console.warn("⚠️ Backend ping failed"));
    }, 1000 * 60 * 4); // Every 4 minutes

    return () => clearInterval(interval); // Cleanup
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
