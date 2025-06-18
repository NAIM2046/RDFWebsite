import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

// Images
import aboutImage from "/assets/rdfphoto2/IMG_20210308_181619.jpg";
import visionImage from "/assets/rdfphoto2/IMG_1070.jpg";
import missionImage from "/assets/rdfphoto2/PRA, Joyalbhanga.jpg";
import valuesImage from "/assets/6-circle-value9999s.jpg";
import visionIcon from "/assets/RDF Photo/vission.png";
import missionIcon from "/assets/RDF Photo/mission.png";
import valueIcon from "/assets/RDF Photo/value.png";

const Section = ({ icon, title, text, image, reverse }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row mb-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2 p-6 md:p-8">
        <div className="flex items-center mb-3">
          <img src={icon} alt={`${title} Icon`} className="w-14 h-14 mr-3" />
          <h2 className="text-3xl font-bold text-green-400 font-serif">
            {title}
          </h2>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-blue-500 mb-4"></div>
        <p className="text-gray-600 leading-relaxed text-[20px] font-serif">
          {text}
        </p>
      </div>
      <div className="md:w-1/2 p-6">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

const VisionMission = () => {
  return (
    <div className="mx-auto">
      <Helmet>
        <title>RDF - Vision and Mission</title>
      </Helmet>

      <PageCoverPhoto
        title="Vision & Mission"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      />

      <div className="bg-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto bg-green-50 shadow-lg rounded-2xl p-8">
          <Section
            icon={visionIcon}
            title="Vision"
            text="RDF envisions a socio-economically just and equitable society and capitalization of the potentials of women and children along with intersectional inclusiveness."
            image={visionImage}
          />
          <Section
            icon={missionIcon}
            title="Mission"
            text="The Institutional Mission is to bring positive changes and ensure human rights for the poor and disadvantaged people, especially women and children in education, technical skills, health, economic, resilience to climate change with actions and socio-cultural environment both in rural and urban areas."
            image={missionImage}
            reverse
          />

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row mb-12"
          >
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex items-center mb-3">
                <img
                  src={valueIcon}
                  alt="Values Icon"
                  className="w-14 h-14 mr-3"
                />
                <h2 className="text-3xl font-bold text-green-400 font-serif">
                  Values
                </h2>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-green-400 to-blue-500 mb-4" />
              <p className="text-gray-600 leading-relaxed text-[20px] font-serif">
                RDF's core values are:
                <br />
                <br />
                <strong>1. Transparency</strong> — being open and honest in all
                our work.
                <br />
                <strong>2. Respect</strong> — treating every individual with
                dignity and fairness.
                <br />
                <strong>3. Integrity</strong> — maintaining strong moral
                principles.
                <br />
                <strong>4. Inclusiveness</strong> — ensuring participation and
                equal opportunities for all.
                <br />
                <strong>5. Accountability</strong> — taking responsibility for
                our actions and impact.
              </p>
            </div>
            <div className="md:w-1/2 p-6">
              <img
                src={valuesImage}
                alt="Core Values"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Vision 2030 Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="md:w-1/2 p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-4 font-serif">
              Vision 2030
            </h1>
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              RDF’s shared vision for the future
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg font-serif">
              RDF's Vision 2030 aims to create a sustainable future by
              integrating community-driven initiatives in education, healthcare,
              and economic development. By focusing on gender equality, resource
              allocation, and humanitarian aid, we strive to build a society
              where everyone has equal opportunities to thrive. Through a set of
              agreed goals based on SDGs, employing a theory of change derived
              from our years of experience, and proper utilization of resources,
              we will systematically move towards fulfilling this vision
              collectively.
            </p>
          </div>
          <div className="md:w-1/2 p-6">
            <img
              src="https://i.ibb.co.com/mCBBVLJc/mission2030.webp"
              alt="Vision 2030"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionMission;
