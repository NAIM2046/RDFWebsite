import React, { useState } from "react";

const JoinUs = ({ header }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, cv: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen mx-auto  bg-gradient-to-r flex flex-col items-center justify-center py-12 px-6">
      <h1 className="text-4xl font-bold  text-center mb-8">{header}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-96"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold text-lg"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold text-lg"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="address"
            className="block text-gray-700 font-semibold text-lg"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="cv"
            className="block text-gray-700 font-semibold text-lg"
          >
            CV
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            accept=".pdf,.doc,.docx,.txt"
            required
          />
        </div>

        <button
          type="submit"
          className="w-[70%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JoinUs;
