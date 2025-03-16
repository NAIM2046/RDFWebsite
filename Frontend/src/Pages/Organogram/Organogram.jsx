import React from "react";
import { motion } from "framer-motion";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";

const organogramData = {
  title: "RDF Organogram Structure",
  image: "/assets/RDF Photo/organogram.png",
  governance: {
    heading: "Governance Overview",
    description:
      "A 21-member General Committee (GC) governs RDF. The GC selects a 7-member Executive Committee (EC) responsible for policy guidelines. The Executive Director (ED) oversees programs and implementation.",
  },
  sections: [
    {
      title: "Central Coordination Unit (CCU)",
      description:
        "Consists of 21 senior officials (Finance, HR, Program, etc.). The ED is the Chairman of CCU.",
    },
    {
      title: "Regional Coordination Unit (RCU)",
      description:
        "Five RCU teams ensure coordination between central and field offices.",
    },
    {
      title: "District Focal Team (DFT)",
      description: "Manages all ongoing programs within each district.",
    },
    {
      title: "Upazila Focal Team (UFT)",
      description:
        "Oversees Upazila programs, conducts review and planning meetings.",
    },
  ],
  decisionMaking: {
    heading: "Decision-Making Process",
    description:
      "The governance structure follows a two-way decision-making process, ensuring accountability from both top-down and bottom-up approaches.",
    points: [
      "GC → EC → ED → CCU → RCU → DFT → UFT",
      "AGM ensures annual review, discussions, and budget approvals.",
    ],
  },
};

const Organogram = () => {
  return (
    <div>
      <Helmet>
        <title> RDF-Organogram </title>
      </Helmet>
      <PageCoverPhoto title={"Our Organogram"} />

      <div className="min-h-screen mx-auto max-w-7xl bg-white shadow-lg p-8 mt-24 mb-10 rounded-lg">
        {/* Page Header with Animation */}
        <motion.h1
          className="text-4xl font-bold text-center text-orange-500 mb-6 font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {organogramData.title}
        </motion.h1>

        {/* Organogram Image with Smooth Scale Animation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={organogramData.image}
            alt="Organogram"
            className="w-full max-w-4xl object-contain shadow-xl rounded-lg hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </motion.div>

        {/* Governance Overview with Fade-in */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 border-l-4 border-orange-400 pl-4">
            {organogramData.governance.heading}
          </h2>
          <p className="text-gray-600 leading-relaxed mt-2">
            {organogramData.governance.description}
          </p>
        </motion.div>

        {/* Coordination Units - Smooth Animation */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {organogramData.sections.map((section, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-700 border-l-4 border-orange-400 pl-4">
                {section.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mt-2">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decision-Making Process with Staggered Animation */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg mt-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 border-l-4 border-orange-400 pl-4">
            {organogramData.decisionMaking.heading}
          </h2>
          <p className="text-gray-600 leading-relaxed mt-2">
            {organogramData.decisionMaking.description}
          </p>
          <motion.ul
            className="list-disc pl-6 mt-3 text-gray-600"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {organogramData.decisionMaking.points.map((point, index) => (
              <motion.li
                key={index}
                className="opacity-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Organogram;
