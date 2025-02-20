import React, { useState } from "react";
import OurPartners from "../Ourpartners/Ourpartners";
import { Dialog } from "@headlessui/react";

const ProjectPartner = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-100 py-16">
      {/* Introduction */}
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800">
          Why Partner with Us?
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          We are a globally recognized organization creating sustainable change.
          By partnering with us, you can help transform lives and make an
          impact.
        </p>
      </div>

      {/* Impact Statistics */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 px-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-64">
          <h3 className="text-3xl font-bold text-blue-600">105M+</h3>
          <p className="text-gray-700">Children helped in 2023</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-64">
          <h3 className="text-3xl font-bold text-green-600">33.7M+</h3>
          <p className="text-gray-700">
            Children reached with health & nutrition
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-64">
          <h3 className="text-3xl font-bold text-red-600">120+</h3>
          <p className="text-gray-700">Emergency responses in 2023</p>
        </div>
      </div>

      {/* Current Partners */}
      <div className="mt-16 max-w-6xl mx-auto px-6">
        <OurPartners></OurPartners>
      </div>

      {/* Benefits of Partnering */}
      <div className="mt-16 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          What Partnering Means for You
        </h2>
        <p className="text-lg text-gray-600 mt-4 text-center">
          From creating life-saving products to inspiring staff for fundraising,
          our partnerships make a difference.
        </p>
        <div className="mt-8 space-y-6">
          <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-full mr-6">
              1
            </div>
            <p className="text-gray-700">
              Work with us to develop **sustainable, long-term solutions**.
            </p>
          </div>
          <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
            <div className="bg-green-500 text-white w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-full mr-6">
              2
            </div>
            <p className="text-gray-700">
              **Collaborate with communities** to create lasting impact.
            </p>
          </div>
          <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
            <div className="bg-red-500 text-white w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-full mr-6">
              3
            </div>
            <p className="text-gray-700">
              Engage your employees and customers in **social impact projects**.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Partner With Us</h2>
        <p className="text-lg text-gray-600 mt-4">
          Let's create meaningful change together.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get in Touch
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        ></div>

        {/* Modal Content */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>

          {/* Form Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Submit an Inquiry
          </h2>

          {/* Form Fields */}
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name*"
                className="w-1/2 border border-gray-300 p-3 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Last name*"
                className="w-1/2 border border-gray-300 p-3 rounded-md"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email*"
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />

            <select
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            >
              <option value="">Reason*</option>
              <option value="partnership">Partnership Inquiry</option>
              <option value="donation">Donation Inquiry</option>
              <option value="general">General Inquiry</option>
            </select>

            <textarea
              placeholder="Message*"
              className="w-full border border-gray-300 p-3 rounded-md"
              maxLength={200}
              required
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
            >
              Contact Us
            </button>
          </form>

          {/* Privacy Notice */}
          <p className="text-sm text-gray-600 mt-4">
            By clicking submit, you confirm you are over 18 and agree to receive
            emails about our work. You can opt out anytime. See our{" "}
            <a href="#" className="text-blue-600">
              privacy policy
            </a>
            .
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectPartner;
