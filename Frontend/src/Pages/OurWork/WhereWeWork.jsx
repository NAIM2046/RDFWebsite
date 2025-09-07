import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import map from "/assets/wherewework/image.png";

const WhereWeWork = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  // 🏢 Office Addresses (Dynamic)
  const offices = [
    {
      id: 1,
      title: "Head Office",
      address: [
        "RDF Bhaban",
        "House # 21, Road # 12",
        "Pisciculture Housing Society",
        "Block-Kha, Adabar, Dhaka-1207",
      ],
      phone: "+88-02-91046443",
      email: "info@rdfbd.org",
    },
    {
      id: 2,
      title: "RTRC Barguna Office",
      address: [
        "RDF Training & Research Center ",
        "Police Line Sarak",
        "Barguna -8700",
      ],
      phone: "+88-0247990042",
      email: "",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-25 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 font-serif mb-4">
            Where We Work
          </h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto mb-6">
            Discover our office locations and reach out to us
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
        >
          {/* Image Section */}
          <div className="lg:w-2/5 p-8 flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 relative">
            <div className="absolute top-6 left-6 text-white opacity-20">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-xl shadow-2xl cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={map}
                alt="Working Area Map"
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-800"
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
                <span className="absolute bottom-4 left-4 text-white font-medium bg-blue-800 bg-opacity-70 px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Click to enlarge
                </span>
              </div>
            </motion.div>
          </div>

          {/* Text Section */}
          <div className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 font-serif border-l-4 border-teal-500 pl-3">
              Our Offices
            </h3>

            {/* Office Selector Tabs */}
            <div className="flex mb-6 border-b border-blue-100">
              {offices.map((office, index) => (
                <button
                  key={office.id}
                  className={`px-4 py-2 font-medium text-sm md:text-base transition-colors duration-300 ${
                    activeOffice === index
                      ? "text-blue-800 border-b-2 border-blue-700"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                  onClick={() => setActiveOffice(index)}
                >
                  {office.title}
                </button>
              ))}
            </div>

            <div className="space-y-6 text-gray-700">
              {offices.map((office, index) => (
                <motion.div
                  key={office.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: activeOffice === index ? 1 : 0,
                    x: activeOffice === index ? 0 : 20,
                    display: activeOffice === index ? "block" : "none",
                  }}
                  className={`${activeOffice === index ? "block" : "hidden"}`}
                >
                  <h4 className="text-xl font-bold text-blue-800 mb-4 font-serif flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {office.title}
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                    {office.address.map((line, idx) => (
                      <p key={idx} className="mb-1 text-blue-900">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {office.phone && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-teal-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-blue-800">{office.phone}</span>
                      </div>
                    )}
                    {office.email && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-teal-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <a
                          href={`mailto:${office.email}`}
                          className="text-blue-700 hover:text-blue-900 transition-colors"
                        >
                          {office.email}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative max-w-6xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={map}
                    alt="Fullscreen Map"
                    className="w-full max-h-[80vh] object-contain"
                  />
                </div>
                <button
                  className="absolute -top-12 right-0 text-white hover:text-teal-400 transition-colors p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/50 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
