import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full bg-yellow-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">
            Home
          </Link>
          <span className="text-gray-500">&nbsp; / &nbsp;</span>
          <span className="text-yellow-700 font-semibold">Contact</span>
        </div>
      </div>

      {/* Contact Header */}
      <div className="relative flex items-center justify-center h-[40vh] bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center text-white px-[8%] lg:px-[12%]">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 font-bricolage">Contact Us</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            We’d love to hear from you! Get in touch with us for any queries or support.
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-[8%] lg:px-[12%] py-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <i className="bi bi-envelope text-3xl text-yellow-500"></i>
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Gmail</h4>
            <p className="text-gray-600 text-sm">deepakrath902@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <i className="bi bi-telephone text-3xl text-yellow-500"></i>
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Phone</h4>
            <p className="text-gray-600 text-sm">+91 78470 68895</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <i className="bi bi-geo-alt text-3xl text-yellow-500"></i>
            <h4 className="mt-4 text-lg font-semibold text-gray-800">Address</h4>
            <p className="text-gray-600 text-sm">Mahilo, Jagatsinghpur, Odisha</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-[8%] lg:px-[12%] py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                placeholder="Your Gmail"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="GiftMart Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.916508568009!2d86.176!3d20.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a18f7b1f8!2sJagatsinghpur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1671544448840"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
