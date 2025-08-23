import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

import visionIcon from "/assets/RDF Photo/vission.png";
import missionIcon from "/assets/RDF Photo/mission.png";
import valueIcon from "/assets/RDF Photo/value.png";

const VisionMission = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6 },
    }),
  };

  return (
    <div className="bg-gray-50">
      {/* SEO */}
      <Helmet>
        <title>
          Vision & Mission | RDF - Building a Just and Equitable Society
        </title>
        <meta
          name="description"
          content="RDF's vision for a socio-economically just society, our mission to empower women and children, and our core values of transparency, respect, and integrity."
        />
        <meta
          name="keywords"
          content="RDF vision, NGO mission, social development, women empowerment, child rights, sustainable development"
        />
        <meta property="og:title" content="Vision & Mission | RDF" />
        <meta
          property="og:description"
          content="Discover RDF's vision for an equitable society and our mission to empower communities through education and sustainable development."
        />
      </Helmet>

      {/* Page Cover */}
      <PageCoverPhoto
        title="Vision & Mission"
        subtitle="Creating Sustainable Impact through Transformation"
      />

      {/* Vision, Mission, Values */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10 font-serif">
        {/* Vision */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          custom={0}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <img src={visionIcon} alt="Our Vision" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-green-600 inline-block pb-1">
              Our Vision
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-xl">
            RDF envisions a socio-economically just and equitable society and
            capitalization of the potential of women and children along with
            intersectional inclusiveness.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          custom={0.2}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <img src={missionIcon} alt="Our Mission" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-500 inline-block pb-1">
              Our Mission
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            The Institutional Mission is to bring positive changes and ensure
            human rights for the poor and disadvantaged people, especially women
            and children, in education, technical skills, health, economic,
            resilience to climate change, with actions and socio-cultural
            environment both in rural and urban areas.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          custom={0.4}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <img src={valueIcon} alt="Our Values" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-green-500 inline-block pb-1">
              Our Values
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed force:ml-2 text-2xl">
            Transparency <br />
            Accountability <br />
            Integrity <br />
            Inclusiveness <br />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionMission;
