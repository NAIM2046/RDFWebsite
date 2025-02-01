import React from "react";
import { motion } from "framer-motion";
import { FaBalanceScale, FaLeaf, FaFirstAid, FaChild } from "react-icons/fa";

const focusAreas = [
  {
    icon: <FaBalanceScale className="text-blue-600 text-5xl" />,
    title: "Economic Empowerment",
    description:
      "Promoting inclusion and justice through economic opportunities.",
  },
  {
    icon: <FaLeaf className="text-green-600 text-5xl" />,
    title: "Resilience to Climate Change & Disaster Risk Reduction",
    description:
      "Ensuring justice and sustainable management of natural resources.",
  },
  {
    icon: <FaFirstAid className="text-red-600 text-5xl" />,
    title: "Emergency Response",
    description: "Providing urgent aid and support during crises.",
  },
  {
    icon: <FaChild className="text-yellow-600 text-5xl" />,
    title: "Child Rights, Education, Nutrition, and SRHR",
    description:
      "Advocating for children's well-being and reproductive health rights.",
  },
];

const WhatWeDo = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          WHAT WE DO
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Our initiatives focus on improving lives through justice,
          sustainability, and resilience.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg p-8 rounded-2xl flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              {area.icon}
              <h3 className="text-xl font-semibold mt-4 text-gray-700">
                {area.title}
              </h3>
              <p className="text-gray-600 mt-2">{area.description}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition cursor-pointer">
                See Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
