import React from "react";
import { motion } from "framer-motion";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";

const organogramData = {
  title: " Organogram ",
  image: "https://i.ibb.co/FkXT0hKj/RDF-Organogram-1.jpg",
  governance: {
    heading: "Governance",

    description: `RDF is governed by a well-structured and effective system led by its 21-member General Council. This council, which includes its founding members, plays a crucial role in ensuring that the organisation remains socially owned. From this council, a 7-member Executive Committee (EC) is elected every three years. The EC, guided by its chairman, is responsible for offering strategic direction and overseeing the Chief Executive Officer (CEO).

The organisation remains steadfast in following its foundational mission, vision, and values as outlined in its guiding principles. It enforces robust internal controls, ensuring that everyone understands their roles clearly, promotes participatory decision-making, and nurtures an inclusive work environment, with a special emphasis on empowering women.

RDF is deeply committed to ethical behaviour and has a strict policy of zero tolerance for any violations. This commitment helps maintain its accountability and credibility, reinforcing its mission to advance sustainable development in Bangladesh.
`,
  },
};

const Organogram = () => {
  return (
    <div>
      <Helmet>
        <title>RDF-Organogram | Resource Development Foundation (RDF)</title>
        <meta
          name="description"
          content="Explore the RDF Organogram and Governance structure. Learn how the Resource Development Foundation (RDF) is governed by its General Council and Executive Committee to achieve sustainable social impact in Bangladesh."
        />
        <meta
          name="keywords"
          content="RDF, Resource Development Foundation, Organogram, Governance, Executive Committee, Bangladesh NGO, Social Development"
        />
        <meta
          property="og:title"
          content="RDF-Organogram | Resource Development Foundation (RDF)"
        />
        <meta
          property="og:description"
          content="Learn about RDF's governance structure and Executive Committee. Discover how RDF ensures social accountability and sustainable development in Bangladesh."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://i.ibb.co/FkXT0hKj/RDF-Organogram-1.jpg"
        />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <PageCoverPhoto
        title={"ORGANOGRAM & GOVERNANCE"}
        subtitle={"Creating Sustainable Impact through Transformation"}
      />

      <div className="min-h-screen mx-auto max-w-7xl bg-white shadow-lg p-8 mt-24 mb-10 rounded-lg">
        {/* Page Header with Animation */}
        <motion.h1
          className="text-4xl font-bold text-center text-red-500 mb-6 font-serif"
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

        {/* Governance Overview with Professional Card Style */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 mb-12 max-w-4xl mx-auto border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Heading with Icon */}
          <div className="flex items-center gap-3 mb-6">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-3xl font-bold text-gray-800">
              {organogramData.governance.heading}
            </h2>
          </div>

          {/* Description with Bullets */}
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            {organogramData.governance.description
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, index) => {
                // Highlight key points as bullet
                if (
                  paragraph.includes("EC") ||
                  paragraph.includes("internal controls") ||
                  paragraph.includes("zero tolerance")
                ) {
                  return (
                    <ul key={index} className="list-disc list-inside ml-5">
                      <li>{paragraph}</li>
                    </ul>
                  );
                }
                // Normal paragraph
                return <p key={index}>{paragraph}</p>;
              })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Organogram;
