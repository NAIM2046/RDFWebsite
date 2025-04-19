import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  return (
    <div className="bg-gray-50 mt-10">
      {/* Title Animation */}
      <motion.h1
        className="text-4xl font-bold text-black text-center font-serif"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }} // Animates once when in view
      >
        Who We Are
      </motion.h1>

      <motion.section
        className="flex flex-col lg:flex-row items-center justify-center space-x-16 p-10  "
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Image Animation */}
        <motion.div
          className="relative w-96 h-96 pl-10"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="rounded-full border-3 border-green-500 overflow-hidden w-96 h-96 ">
            <img
              src="https://i.ibb.co.com/YBWPqYxc/CEO-PIC-88-1.jpg"
              alt="CEO"
              className="w-full h-full rounded-full p-4 object-cover"
            />
          </div>

          <div className="absolute top-60 right-40 md:top-55 md:right-45 rounded-full border-2 border-red-600">
            <div className="p-2 bg-white rounded-full">
              <motion.div
                className="bg-green-600 text-white rounded-full shadow-lg flex flex-col justify-center items-center w-48 h-48 p-2"
                whileInView={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl font-bold">40+</span>
                <span className="text-sm text-center font-serif">
                  In Experience
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Text Animation */}
        <motion.div
          className="lg:w-1/2 text-gray-700 lg:mt-0 lg:ml-10 font-serif"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-green-500 mt-20 md:mt-0 ">
            Resource Development Foundation (RDF)
          </h2>
          <p className="mt-4 text-[18px]">
            Resource Development Foundation (RDF) has started its formal
            philanthropic and social development activities in 1995. RDF with
            its 850 devoted staff members has been supplementing GoB efforts in
            reducing food deficiency in the country and has been trying to
            integrate non-conventional and innovative approaches through solar
            irrigation pumping systems to resolve food security issues.
            Agricultural development through micro- credit support and
            development through Solar Energy is one of the most modern and
            innovative ideas that has already been incorporated to mitigate the
            energy & food security crisis of the country. Now, RDF is the
            national non-government development organization rooted in Southern
            Bangladesh.
          </p>
          <p className="mt-2">
            RDF creates a congenial working environment for women employees.
            Finally, bottom-up management policy is established and practiced
            here and equity of rights- culture has been practiced to strengthen
            the organizational control system internally.
          </p>

          {/* Read More Animation */}
          <motion.div
            className="flex items-center mt-4 text-green-400 hover:underline"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/our-history">Read More...</Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default WhoWeAre;
