import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import biryaniImage from "../images/customer.jpg"; 

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i9my6vq",        
        "template_w25fwhr",       
        form.current,
        "aNP5B4WVyYNGczxuS"       
      )
      .then(() => {
        toast.success("✅ Email sent successfully!");
        form.current.reset();
      })
      .catch((error) => {
        toast.error("❌ Failed to send email: " + error.text);
      });
  };

  return (
    <section className="bg-blue-200 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col md:flex-row-reverse w-full max-w-6xl overflow-hidden">

        {/* Image Section — appears first on mobile */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto">
          <img
            src={biryaniImage}
            alt="Contact Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
           👨🏻‍💻 Contact Us
          </h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="from_name"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <input
              type="submit"
              value="Send Mail 📩" 
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
            />
          </form>
        </div>
      </div>

     
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </section>
  );
}

export default Contact;
