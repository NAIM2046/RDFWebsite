import React from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const focusAreas = [
  {
    bgImage: "/assets/FocusAreas/foodsuce.JPG",

    title: "Food Security, Livelihood, Skills, and Economic Empowerment",

    textColor: "text-blue-50",
    borderColor: "border-blue-500",
  },
  {
    bgImage: "/assets/FocusAreas/Resilience.jpg",

    title: "Resilience to Climate Change & Disaster Risk Reduction",

    textColor: "text-purple-50",
    borderColor: "border-purple-500",
  },
  {
    bgImage: "/assets/FocusAreas/em1.jpeg",

    title: "Emergency Response",

    textColor: "text-red-50",
    borderColor: "border-red-500",
  },
  {
    bgImage: "/assets/FocusAreas/childRignt.jpg",

    title:
      "Child Rights, Ending Child Marriage, Education, Health, Nutrition, and SRHR",

    textColor: "text-green-50",
    borderColor: "border-green-500",
  },
  {
    bgImage: "/assets/FocusAreas/water.jpg",

    title: "Water, Sanitation, and Hygiene (WASH)",

    textColor: "text-cyan-50",
    borderColor: "border-cyan-500",
  },
  {
    bgImage: "/assets/FocusAreas/gender.jpg",

    title:
      "Cross-cutting programme: Gender Transformation, Disability Inclusion and Locally-led Initiatives",

    textColor: "text-indigo-50",
    borderColor: "border-indigo-500",
  },
];

const FocusAreas = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-4 sm:px-6 bg-white text-gray-900 font-serif">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Strategic Program
        </motion.h2>

        {/* Section Description */}
        <motion.p
          className="text-lg text-green-700 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Our programs focus on economic empowerment, climate resilience,
          education, and sustainable development to create lasting impact.
        </motion.p>

        {/* Grid Layout for Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/our-program")}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${area.bgImage})` }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-4">
                  {area.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
