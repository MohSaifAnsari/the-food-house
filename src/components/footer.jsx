import React from "react";

function Footer() {
  return (
    <footer className="bg-red-300 py-10 px-4 border-4 border-red-600 rounded-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* Quick Links */}
        <div className="border p-6 bg-white rounded-xl text-center shadow-md font-bold">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <a href="#home" className="block hover:text-red-600 mb-2">Home</a>
          <a href="#about" className="block hover:text-red-600 mb-2">About</a>
          <a href="#products" className="block hover:text-red-600 mb-2">Food Menu</a>
          <a href="#contact" className="block hover:text-red-600">Contacts</a>
        </div>

        {/* Locations */}
        <div className="border p-6 bg-white rounded-xl text-center shadow-md font-bold">
          <h3 className="text-2xl font-semibold mb-4 ">Locations</h3>
          <h3 className="block mb-2">Allahabad</h3>
          <h3 className="block mb-2">Lucknow</h3>
          <h3 className="block mb-2">Kanpur</h3>
          <h3 className="block mb-2">Jaunpur</h3>
          
        </div>

        {/* Contact Info */}
        <div className="border p-6 bg-white rounded-xl text-center shadow-md font-bold">
          <h3 className="text-2xl font-semibold mb-4 ">Contact Info</h3>

          {/* Phone */}
          <a href="tel:+918922886076" className="block hover:text-red-600 mb-2">
            +91 8922886076
          </a>

          {/* Email with proper wrapping */}
          <p className=" text-sm mb-2 break-words">
            <a
              href="mailto:loveablefoodmart@gmail.com"
              className="hover:text-red-600 lowercase"
            >
              loveablefoodmart@gmail.com
            </a>
          </p>

          {/* Address */}
          <p className=" text-sm break-words">
            Mungra Badshahpur, Jaunpur, Uttar Pradesh - 222202
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
