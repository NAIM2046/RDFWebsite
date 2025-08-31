import React, { useState, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactItem = ({ Icon, title, content, link }) => (
  <div className="flex flex-col items-center text-center p-4 hover:bg-green-700 transition rounded-lg">
    <div className="bg-green-700 p-4 rounded-full mb-4">
      <Icon className="text-2xl text-white" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    {link ? (
      <a
        href={link}
        className="text-white hover:underline break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    ) : (
      <p className="text-white">{content}</p>
    )}
  </div>
);

const JoinUs = ({ header }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      toast.success("Message sent successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <ToastContainer />

      {/* Hero Section */}
      <div className="bg-green-800 text-white py-12 px-4 md:px-8 lg:px-16 rounded-xl ">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            {header || "Get In Touch With Us"}
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Illustration */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/assets/joinus/joinus.png"
                alt="Contact Us Illustration"
                className="w-full max-w-md h-auto"
                loading="lazy"
              />
            </div>

            {/* Form */}
            <div className="w-full lg:w-1/2 bg-green-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 rounded bg-green-800 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 border ${
                      errors.name ? "border-red-500" : "border-green-700"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-300 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded bg-green-800 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 border ${
                      errors.email ? "border-red-500" : "border-green-700"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 rounded bg-green-800 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 border ${
                      errors.message ? "border-red-500" : "border-green-700"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-white text-green-800 font-bold py-3 px-6 rounded-lg shadow-md transition flex items-center justify-center gap-2 ${
                    isLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-green-100 hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  {isLoading ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-green-800 border-r-transparent"></span>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="py-12 px-4 md:px-8 lg:px-16 bg-green-900 text-white rounded-xl mt-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactItem
              Icon={FaMapMarkerAlt}
              title="Location"
              content="RDF BHABAN, House #21, Road #12, Pisciculture Housing Society, Block-Kha, Adabor, Dhaka-1207."
            />
            <ContactItem
              Icon={FaPhoneAlt}
              title="Phone"
              content="+8802-9104643, +8801733065522"
              link="tel:+88029104643"
            />
            <ContactItem
              Icon={FaEnvelope}
              title="Email"
              content="info@rdfbd.org"
              link="mailto:info@rdfbd.org"
            />
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="py-1 px-4 md:px-8 lg:px-1 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
            Find Us on Map
          </h2>
          <div className="aspect-w-16 aspect-h-9 w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1090.921997683201!2d90.35514302717196!3d23.770083451770166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1000dcc73e7%3A0xd82969f3638b6a5c!2sResource%20Development%20Foundation%20(RDF)!5e1!3m2!1sen!2sbd!4v1756052742517!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RDF Location Map"
              className="block"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
