import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

const JoinUs = ({ header }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_6261ylg", // Replace with your EmailJS Service ID
        "template_c5rwq9a", // Replace with your EmailJS Template ID
        formData,
        "repDNYNXj4X9Aeaw1" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Failed to send email:", error);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-10 md:mt-0">
      <div className="w-full bg-green-800 p-6 relative">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          {header}
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Illustration */}
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img
              src="https://i.ibb.co.com/pHNLnR4/download-removebg-preview.png"
              alt="Illustration"
              className="w-96 h-auto"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2">
            <h3 className="text-white font-semibold mb-4">
              Send Us Mail From Here
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-green-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-green-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded bg-green-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-white text-green-800 font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-200 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-green-800 text-white p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Location */}
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-4xl mb-2" />
            <h3 className="text-xl font-bold">Location</h3>
            <p className="mt-2 max-w-xs">
              Head Office: RDF BHABAN, House #21, Road #12, Pisciculture Housing
              Society, Block-Kha, Adabor, Dhaka-1207.
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-4xl mb-2" />
            <h3 className="text-xl font-bold">Phone</h3>
            <p className="mt-2">+8802-9104643, +8801733065522</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-4xl mb-2" />
            <h3 className="text-xl font-bold">Email</h3>
            <p className="mt-2">info@rdfbd.org, rdfdk@yahoo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
