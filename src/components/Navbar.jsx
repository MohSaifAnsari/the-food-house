import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';
import {
  AiOutlineShoppingCart,
  AiOutlineShopping,
  AiOutlineMenu,
  AiOutlineClose,
  AiFillHome,
  AiOutlineInfoCircle,
  AiOutlineAppstore,
  AiOutlinePhone,
} from 'react-icons/ai';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Pacifico', 'Poppins:400,600'],
      },
    });
  }, []);

  return (
    <nav className="bg-purple-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Text Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide flex items-center"
            style={{
              fontFamily: 'Pacifico, cursive',
              background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            🍽️ The Food House
          </h1>
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 text-[16px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <a href="#home" className="flex items-center gap-1 text-gray-800 hover:text-red-600 font-semibold transition">
            <AiFillHome size={20} />
            Home
          </a>
          <a href="#about" className="flex items-center gap-1 text-gray-800 hover:text-red-600 font-semibold transition">
            <AiOutlineInfoCircle size={20} />
            About
          </a>
          <a href="#products" className="flex items-center gap-1 text-gray-800 hover:text-red-600 font-semibold transition">
            <AiOutlineAppstore size={20} />
            Food Menu
          </a>
          <a href="#contact" className="flex items-center gap-1 text-gray-800 hover:text-red-600 font-semibold transition">
            <AiOutlinePhone size={20} />
            Contact
          </a>
        </div>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center space-x-4 text-[16px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Link to="/cart" className="flex items-center gap-1 text-gray-800 hover:text-red-600 font-semibold transition">
            <AiOutlineShoppingCart size={20} />
            Cart
          </Link>
          <Link to="/your-orders" className="flex items-center gap-1 text-gray-800 hover:text-red-600 font-semibold transition">
            <AiOutlineShopping size={20} />
            Your Orders
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-purple-900">
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <a href="#home" onClick={closeMenu} className="display-blockn text-lg font-medium text-gray-800 hover:text-red-600 flex justify-center items-center gap-2">
            <AiFillHome size={20} />
            Home
          </a>
          <a href="#about" onClick={closeMenu} className="display-block text-lg font-medium text-gray-800 hover:text-red-600 flex justify-center items-center gap-2">
            <AiOutlineInfoCircle size={20} />
            About
          </a>
          <a href="#products" onClick={closeMenu} className="display-block text-lg font-medium text-gray-800 hover:text-red-600 flex justify-center items-center gap-2">
            <AiOutlineAppstore size={20} />
            Food Menu
          </a>
          <a href="#contact" onClick={closeMenu} className="display-block text-lg font-medium text-gray-800 hover:text-red-600 flex justify-center items-center gap-2">
            <AiOutlinePhone size={20} />
            Contact
          </a>
          <Link to="/cart" onClick={closeMenu} className="display-block text-lg font-medium text-gray-800 hover:text-red-600 flex justify-center items-center gap-2">
            <AiOutlineShoppingCart size={20} />
            Cart
          </Link>
          <Link to="/your-orders" onClick={closeMenu} className="display-block text-lg font-medium text-gray-800 hover:text-red-600 flex justify-center items-center gap-2">
            <AiOutlineShopping size={20} />
            Your Orders
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
