import React from "react";
import { motion } from "framer-motion";
import {
  FaBalanceScale,
  FaLeaf,
  FaFirstAid,
  FaChild,
  FaSolarPanel,
} from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdWork, MdTrendingUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const focusAreas = [
  {
    icon: <FaBalanceScale className="text-blue-600 text-5xl" />,
    title: "Economic Empowerment of the Poor",
    description:
      "Expanding opportunities for marginalized communities through sustainable livelihoods.",
  },
  {
    icon: <MdTrendingUp className="text-purple-600 text-5xl" />,
    title: "Youth Development",
    description:
      "Empowering young people with technical, ethical, and life skills for a brighter future.",
  },
  {
    icon: <MdWork className="text-indigo-600 text-5xl" />,
    title: "Employable Skills Development",
    description:
      "Providing industry-relevant skills to improve job opportunities in the 4IR era.",
  },
  {
    icon: <FaLeaf className="text-green-600 text-5xl" />,
    title: "Climate Change Adaptation & Disaster Risk Reduction",
    description:
      "Mitigating climate-induced risks and promoting sustainable agriculture.",
  },
  {
    icon: <FaSolarPanel className="text-orange-600 text-5xl" />,
    title: "Promotion & Expansion of Renewable Energy",
    description:
      "Advancing solar energy solutions to reduce carbon emissions and energy crises.",
  },
  {
    icon: <FaChild className="text-yellow-600 text-5xl" />,
    title: "Child Rights, Education, and Health",
    description:
      "Ensuring education, nutrition, and reproductive health for children and youth.",
  },
];

const FocusAreas = () => {
  const navigate = useNavigate();

  const handleNavigate = (title) => {
    navigate("/key-focus-area", { state: { scrollTo: title } });
  };

  return (
    <section className="py-16 px-6 bg-white text-gray-900 font-serif">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold mb-6 text-gray-800 font-serif"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Focus Areas of RDF
        </motion.h2>

        {/* Section Description */}
        <motion.p
          className="text-lg text-gray-600 mb-10 font-serif"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Our programs focus on economic empowerment, climate resilience,
          education, and sustainable development.
        </motion.p>

        {/* Grid Layout for Focus Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              className="group  shadow-lg p-8 rounded-2xl flex flex-col justify-between items-center text-center h-full 
                        border-t-4 border-l-2 border-r-2 border-green-400 transition-all duration-300 
                        hover:border-transparent transform hover:scale-105 hover:shadow-2xl odd:bg-gray-100 even:bg-sky-50 hover:bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                {area.icon}
                <h3 className="text-xl font-semibold mt-4 text-gray-700">
                  {area.title}
                </h3>
                <p className="text-gray-600 mt-2">{area.description}</p>
              </div>

              {/* Read More Button */}
              <div
                role="button"
                onClick={() => handleNavigate(area.title)}
                className="mt-4 btn btn-outline btn-dash text-green-500 px-5 py-2 transition cursor-pointer flex justify-center items-center font-semibold 
                           hover:text-green-400"
              >
                Read More{" "}
                <IoIosArrowRoundForward className="text-2xl ml-3 rotate-315" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
