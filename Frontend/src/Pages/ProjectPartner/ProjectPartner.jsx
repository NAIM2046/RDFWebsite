import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet-async";

const ProjectPartner = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      reason: formData.reason,
      message: formData.message,
    };

    console.log("📩 Sending data:", templateParams); // Debugging

    try {
      const result = await emailjs.send(
        "service_6261ylg", // Your EmailJS service ID
        "template_a4l2wtw", // Your EmailJS template ID
        templateParams,
        "repDNYNXj4X9Aeaw1" // Your EmailJS public key
      );

      setStatus("Message sent successfully!");
      console.log("✅ Success:", result);
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
      console.error("❌ Error sending message:", error);
    }
  };

  return (
    <div className="bg-gray-100 py-16">
      <Helmet>
        <title>RDF - Project Partner</title>
      </Helmet>

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center px-6">
        <h1 className="text-4xl font-bold text-gray-800 mt-20 lg:mt-0 font-serif">
          Why Partner with Us?
        </h1>
        <p className="text-lg text-gray-600 mt-4 ">
          We are a globally recognized organization creating sustainable change.
          By partnering with us, you can help transform lives and make an
          impact.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 px-6">
        {[
          { value: "105M+", label: "Children helped in 2023", color: "blue" },
          {
            value: "33.7M+",
            label: "Children reached with health & nutrition",
            color: "green",
          },
          { value: "120+", label: "Emergency responses in 2024", color: "red" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-lg p-6 text-center w-64"
          >
            <h3 className={`text-3xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </h3>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Partnering Benefits */}
      <div className="mt-16 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 font-serif">
          What Partnering Means for You
        </h2>
        <p className="text-lg text-gray-600 mt-4 text-center">
          From creating life-saving products to inspiring staff for fundraising,
          our partnerships make a difference.
        </p>

        <div className="mt-8 space-y-6">
          {[
            "Work with us to develop sustainable, long-term solutions.",
            "Collaborate with communities to create lasting impact.",
            "Engage your employees and customers in social impact projects.",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center bg-white p-6 rounded-lg shadow-md"
            >
              <div
                className={`bg-${
                  ["blue", "green", "red"][i]
                }-500 text-white w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-full mr-6`}
              >
                {i + 1}
              </div>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action + Contact Form */}
      <div className="mt-16 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 font-serif">
          Partner With Us
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Let's create meaningful change together.
        </p>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 mt-6">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Submit an Inquiry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name*"
                className="w-1/2 border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name*"
                className="w-1/2 border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleChange}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email*"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />

            <select
              name="reason"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            >
              <option value="">Reason*</option>
              <option value="partnership">Partnership Inquiry</option>
              <option value="donation">Donation Inquiry</option>
              <option value="general">General Inquiry</option>
            </select>

            <textarea
              name="message"
              placeholder="Message*"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
              maxLength={200}
              required
              onChange={handleChange}
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Contact Us
            </button>
          </form>

          {status && <p className="text-gray-700 mt-4 text-center">{status}</p>}

          {/* Privacy Notice */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            By clicking submit, you confirm you are over 18 and agree to receive
            emails about our work. You can opt out anytime. See our{" "}
            <a href="#" className="text-red-500 hover:underline">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPartner;
