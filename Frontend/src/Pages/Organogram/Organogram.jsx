import React from "react";
import { motion } from "framer-motion";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";

const organogramData = {
  title: "RDF Organogram Structure",
  image: "/assets/RDF Photo/organogram.png",
  governance: {
    heading: "Governance Overview",

    description: `A number of 21 General Council Members of RDF is the socially owned authority of the organization
      who elect several 7 members Executive Committee (EC) for a period of 3 years. EC always guides the
      Organization’s Management Committee (OMC) of the organization. The Executive Committee is the policy
      and decision-making body, and the Management Committee is the implementing body of the organization.
      EC consists of socially distinguished and professionally renowned members. The overall responsibility for
      managing the organization is entrusted to the Chief Executive Officer (CEO).
  
      The President of the Executive Committee is the head of the organization and guides the Chief Executive
      Officer. The CEO is accountable to the EC as well as the President for his roles & responsibilities. The constitution
      of the organization was approved by the Department of Social Services (DSS) under the Ministry of Social Welfare.
  
      Founder members of the organization have established it and are the permanent members of the General Council
      along with 21 members. The General Council members socially own the organization, and they are the decision-makers.
      The Executive Committee members are elected by the General Members for a three-year term.
  
      The Founder and Co-Founder are only the founder members but not the owners of the Organization.
      Meetings of the General Council (GC) and Executive Committees are held according to the Constitution.
      Decisions taken in meetings are implemented and followed up. The Mission, Vision, and Values are clearly
      identified in the organizational documents and regularly followed.`,
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
          className="bg-green-50 p-6 rounded-lg mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-green-400 border-l-4 border-orange-400 pl-2 ">
            {organogramData.governance.heading}
          </h2>

          {/* Convert description into multiple paragraphs */}
          {organogramData.governance.description
            .split("\n")
            .map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 leading-relaxed mt-2 ml-4"
              >
                {paragraph}
              </p>
            ))}
        </motion.div>

        {/* Coordination Units - Smooth Animation */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {organogramData.sections.map((section, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg ${
                index % 2 === 0 ? "bg-blue-100" : "bg-blue-100"
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
              <h3 className="text-xl font-semibold text-green-400 border-l-4 border-orange-400 pl-2">
                {section.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mt-2 ml-4">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decision-Making Process with Staggered Animation */}
        <motion.div
          className="bg-sky-100 p-6 rounded-lg mt-10 max-w-4xl mx-auto shadow"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-green-400 border-l-4 border-orange-400 pl-4">
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
