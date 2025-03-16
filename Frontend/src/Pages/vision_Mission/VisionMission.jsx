import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import img from "/assets/rdfphoto2/IMG_20201230_104752.jpg";
import aboutImage from "/assets/rdfphoto2/IMG_20210308_181619.jpg";
import visionImage from "/assets/rdfphoto2/IMG_1070.jpg";
import missionImage from "/public/assets/rdfphoto2/PRA, Joyalbhanga.jpg";
import valuesImage from "/assets/6-circle-value9999s.jpg";
import visionIcon from "/assets/vission.jpg";
import missionIcon from "/assets/mission.jpg";
import valueIcon from "/assets/value-1.jpg";
import aboutIcon from "/assets/RDF Photo/information.png";
import { Helmet } from "react-helmet-async";

const Section = ({ icon, title, text, image, reverse }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row mb-12 ${
        reverse
          ? "md:flex-row-reverse flex-col-reverse"
          : "flex-col md:flex-row"
      }`}
    >
      <div className="md:w-1/2 p-6 md:p-8">
        <div className="flex items-center mb-3">
          <img src={icon} alt="icon" className="w-12 h-12 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800 font-serif">
            {title}
          </h2>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-blue-500 mb-4"></div>
        <p className="text-gray-600 leading-relaxed">{text}</p>
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
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll to the top when the route changes
  // }, []);

  return (
    <div className="mx-auto">
      <Helmet>
        <title> RDF-Vission and Mission </title>
      </Helmet>
      <PageCoverPhoto
        title="Our Mission"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      />

      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <Section
            icon={visionIcon}
            title="Vision"
            text="RDF envisions a socio-economically just and equitable society and capitalization of the potentials of women and children along with intersectional inclusiveness."
            image={visionImage}
            reverse={false}
          />
          <Section
            icon={missionIcon}
            title="Mission"
            text="The Institutional Mission is to bring positive changes and ensure human rights for the poor and disadvantaged people, especially women and children in education, technical skills, health, economic, resilience to climate change with actions and socio-cultural environment both in rural and urban areas."
            image={missionImage}
            reverse={true}
          />
          <Section
            icon={valueIcon}
            title="Values"
            text="Empowerment: Enabling individuals to shape their own future. Integrity: Commitment to transparency and ethical practices. Inclusivity: Promoting equal opportunities for all. Sustainability: Developing long-term, impactful solutions."
            image={valuesImage}
            reverse={false}
          />
          <Section
            icon={aboutIcon}
            title="About RDF"
            text="RDF (Resource Development Foundation) is a nonprofit organization operating in 48 districts of Bangladesh. It was founded in response to the catastrophic cyclone of November 12, 1970, by a group of philanthropists. Over time, RDF has evolved into a formal organization, officially registered in 1995 with the Department of Social Services under the Ministry of Social Welfare of the Government of Bangladesh. RDF is committed to sustainable impact through transformation in education, healthcare, and economic development."
            image={aboutImage}
            reverse={true}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="md:w-1/2 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
              Vision 2030
            </h1>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              RDF’s shared vision for the future
            </h3>
            <p className="text-gray-700 leading-relaxed">
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
              alt="rdf img"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionMission;
