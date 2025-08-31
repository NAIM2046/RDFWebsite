import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhereWeWork = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-950 font-serif mb-4">
            Where We Work
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Image Section */}
          <div className="lg:w-2/5 p-6 flex items-center justify-center bg-white">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <img
                src="https://i.ibb.co.com/sJggYDSZ/image.png"
                alt="Working Area Map"
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center  bg-opacity-0 hover:bg-opacity-20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Text Section */}
          <div className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
              Resource Development Foundation (RDF)
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              RDF is committed to holistic rural development, addressing
              livelihood, skill development, health, education, water and
              sanitation, and nutrition since 1988. Programs include
              microcredit, food security, disaster management, agriculture,
              child education, and human rights.
            </p>
            <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-800 font-medium">
                RDF operates in <span className="font-bold">4,032 Unions</span>,{" "}
                <span className="font-bold">162 Municipalities</span>, and{" "}
                <span className="font-bold">408 Upazilas</span> across{" "}
                <span className="font-bold">53 districts</span>, supporting over{" "}
                <span className="font-bold">15 million vulnerable people</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="/assets/wherewework/image.png"
                  alt="Fullscreen Map"
                  className="w-full max-h-[90vh] object-contain rounded-lg shadow-xl"
                />
                <button
                  className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WhereWeWork;
