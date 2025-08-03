import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

// Images
import visionImage from "/assets/rdfphoto2/IMG_1070.jpg";
import missionImage from "/assets/rdfphoto2/PRA, Joyalbhanga.jpg";
import valuesImage from "/assets/6-circle-value9999s.jpg";
import visionIcon from "/assets/RDF Photo/vission.png";
import missionIcon from "/assets/RDF Photo/mission.png";
import valueIcon from "/assets/RDF Photo/value.png";

const Section = ({ icon, title, text, image, reverse, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } mb-16 lg:mb-24 gap-8`}
    >
      <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
        <div className="flex items-center mb-4">
          <img
            src={icon}
            alt={`${title} Icon`}
            className="w-16 h-16 mr-4 object-contain"
            loading="lazy"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 font-serif">
            {title}
          </h2>
        </div>
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-400 mb-6 rounded-full"></div>
        <div className="text-gray-700 leading-relaxed text-lg md:text-xl font-serif space-y-4">
          {typeof text === "string" ? <p>{text}</p> : text}
          {children}
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center items-center m-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="overflow-hidden rounded-xl shadow-lg w-full max-w-2xl"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover min-h-[400px]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const VisionMission = () => {
  return (
    <div className="bg-gray-50">
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

      <PageCoverPhoto
        title="Our Vision & Mission"
        subtitle="Guiding Principles for Sustainable Change and Community Empowerment"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-16">
          <Section
            icon={visionIcon}
            title="Our Vision"
            text="“RDF envisions a socio-economically just and equitable society and capitalization of the potentials of women and children along with intersectional inclusiveness”"
            image={visionImage}
          />
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl shadow-lg overflow-hidden mb-16">
          <Section
            icon={missionIcon}
            title="Our Mission"
            text="“The Institutional Mission is to bring positive changes and ensure human rights for the poor and disadvantaged people especially women and children in education, technical skills, health, economic, resilience to climate change with actions and socio-cultural environment both in rural and urban areas”"
            image={missionImage}
            reverse
          >
            {/* <ul className="space-y-3 list-disc pl-5 marker:text-emerald-500">
              <li>Education and technical skills development</li>
              <li>Healthcare access and awareness</li>
              <li>Economic empowerment initiatives</li>
              <li>Climate change resilience programs</li>
              <li>Socio-cultural transformation in rural and urban areas</li>
            </ul> */}
          </Section>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-16">
          <Section icon={valueIcon} title="Our Core Values" image={valuesImage}>
            We strive to transform lives by ensuring human rights and empowering
            the disadvantaged, especially women and children, through
            comprehensive programs in livelihood, youth development, education,
            health, WASH, gender equality, and climate resilience across rural
            and urban communities
            {/* <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">
                  Transparency
                </h3>
                <p className="text-gray-700">
                  We maintain openness and honesty in all our operations and
                  decision-making processes.
                </p>
              </div>
              <div className="p-5 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">
                  Respect
                </h3>
                <p className="text-gray-700">
                  We honor the dignity and worth of every individual, treating
                  all with fairness and compassion.
                </p>
              </div>
              <div className="p-5 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">
                  Integrity
                </h3>
                <p className="text-gray-700">
                  We uphold strong ethical principles and consistency in our
                  words and actions.
                </p>
              </div>
              <div className="p-5 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">
                  Inclusiveness
                </h3>
                <p className="text-gray-700">
                  We ensure participation and equal opportunities for all
                  community members.
                </p>
              </div>
              <div className="p-5 bg-emerald-50 rounded-lg border-l-4 border-emerald-500 md:col-span-2">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">
                  Accountability
                </h3>
                <p className="text-gray-700">
                  We take responsibility for our actions and measure our impact
                  to continuously improve.
                </p>
              </div>
            </div> */}
          </Section>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                Vision 2030
              </h2>
              <div className="h-1.5 w-24 bg-white/80 mb-6 rounded-full"></div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-emerald-100">
                RDF's Strategic Roadmap for Sustainable Development
              </h3>
              <div className="space-y-4 text-lg text-white/90">
                <p>
                  By 2030, RDF aims to create measurable, sustainable impact
                  through integrated community development initiatives aligned
                  with the United Nations Sustainable Development Goals (SDGs).
                </p>
                <p>
                  Our theory of change, refined through years of field
                  experience, focuses on systemic transformation in education,
                  healthcare, and economic empowerment—with gender equality as a
                  cross-cutting priority.
                </p>
                <p>
                  We envision communities where every individual has the
                  resources, skills, and opportunities to thrive in harmony with
                  their environment.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[400px]">
              <img
                src="https://i.ibb.co.com/mCBBVLJc/mission2030.webp"
                alt="Vision 2030 Strategic Goals"
                className=" object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-800/40 to-emerald-900/0 flex items-end p-8">
                <p className="text-white text-lg font-medium">
                  "Sustainable change requires systemic solutions—we're building
                  bridges to 2030."
                </p>
              </div>
            </div>
          </div>
        </motion.div> */}
      </main>
    </div>
  );
};

export default VisionMission;
