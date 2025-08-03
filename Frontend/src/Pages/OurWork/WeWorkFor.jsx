import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const weWorkForData = [
  {
    title: "•	Coastal Communities in Bangladesh",
    image: "/assets/rdfphoto2/PRA, Joyalbhanga.jpg",
    detail:
      "RDF specifically works in areas highly susceptible to climate change, prioritising interventions that support these vulnerable populations",
  },
  {
    title: "Women, Girls, and Children",
    image: "/assets/children.webp",
    detail:
      "RDF places a strong emphasis on supporting these groups, recognising their increased vulnerability in the face of environmental and societal challenges.",
  },
  {
    title: "Economically Deprived Groups",
    image: "/assets/rdfphoto2/IMG_20210320_164610.jpg",
    detail:
      "RDF targets economically marginalised communities that experience exclusion from market systems, with a particular focus on those who heavily rely on agricultural labor.",
  },
  {
    title: "Education and Skills Development",
    image: "/assets/rdfphoto2/IMG_20201231_111258.jpg",
    detail:
      "Addressing the high dropout rate in Bangladesh, RDF supports skills development to enhance access to the labour market, aiming to reduce the 70% dropout rate before the completion of higher secondary education.",
  },
  {
    title: "Minority and Adivasi Communities",
    image: "/assets/rdfphoto1/DSC03021.JPG",
    detail:
      "These communities are consistently prioritized in RDF's program execution to ensure their inclusion and support.",
  },
  {
    title: "Girls at Risk of Child Marriage and Trafficking",
    image: "/assets/rdfphoto1/Edsc.JPG",
    detail:
      "RDF runs programs designed to support and protect girls who are at risk, aiming to reduce incidents of child marriage and human trafficking.",
  },
  {
    title: "Youth Leadership and Governance",
    image: "/assets/rdfphoto1/Edsc.JPG",
    detail:
      "RDF engages with youth groups to increase leadership skills and encourage their active participation in good governance practices.",
  },
  {
    title: "Digital Technology and AI Enthusiasts",
    image: "/assets/rdfphoto1/Edsc.JPG",
    detail:
      "Support is offered for children and youth interested in STEM, digital technology and AI programs, nurturing their skills in these cutting-edge fields.",
  },
];

const WeWorkFor = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="weworkfor" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            We <span className="text-orange-500">Work For</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our organization is committed to uplifting marginalized communities
            by addressing their unique challenges and empowering them through
            sustainable solutions.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {weWorkForData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden h-60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-0 left-0 right-0 text-white text-xl font-semibold p-6 font-serif">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedItem.title}
                  </h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
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
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedItem.detail}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WeWorkFor;
