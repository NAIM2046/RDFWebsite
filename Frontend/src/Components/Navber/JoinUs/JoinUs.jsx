import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactItem = ({ Icon, title, content }) => (
  <div className="flex flex-col items-center text-center">
    <Icon className="text-4xl mb-2" />
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-2">{content}</p>
  </div>
);

const JoinUs = ({ header }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.includes("@") || formData.message.length < 5) {
      toast.error("Please enter a valid email and message.");
      return;
    }

    setIsLoading(true);

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send message.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-10 md:mt-0">
      <ToastContainer />
      <div className="w-full bg-green-800 p-6 relative">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          {header}
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Illustration */}
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img
              src="https://i.ibb.co.com/pHNLnR4/download-removebg-preview.png"
              alt="Join Us Illustration"
              className="w-96 h-auto"
              loading="lazy"
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
                disabled={isLoading}
                className={`w-full bg-white text-green-800 font-semibold py-2 px-4 rounded shadow-md transition cursor-pointer ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-green-800 text-white p-6 md:p-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactItem
            Icon={FaMapMarkerAlt}
            title="Location"
            content="RDF BHABAN, House #21, Road #12, Pisciculture Housing Society, Block-Kha, Adabor, Dhaka-1207."
          />
          <ContactItem
            Icon={FaPhoneAlt}
            title="Phone"
            content="+8802-9104643, +8801733065522"
          />
          <ContactItem
            Icon={FaEnvelope}
            title="Email"
            content="info@rdfbd.org, rdfdk@yahoo.com"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
