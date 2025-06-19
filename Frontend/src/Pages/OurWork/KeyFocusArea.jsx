import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const KeyFocusArea = () => {
  const location = useLocation();
  const [expandedCards, setExpandedCards] = useState({});

  // Toggle expanded state for each card
  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Create references for each section
  const focusSectionRefs = {
    "Economic Empowerment of the Poor": useRef(null),
    "Youth Development": useRef(null),
    "Employable Skills Development": useRef(null),
    "Climate Change Adaptation & Disaster Risk Reduction": useRef(null),
    "Promotion & Expansion of Renewable Energy": useRef(null),
    "Child Rights, Education, and Health": useRef(null),
  };

  // Scroll to the specific section if navigated with a state
  useEffect(() => {
    if (location.state?.scrollTo && focusSectionRefs[location.state.scrollTo]) {
      focusSectionRefs[location.state.scrollTo].current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  const focusAreas = [
    {
      title: "Economic Empowerment of the Poor",
      description:
        "RDF will continue its Economic Empowerment initiatives with innovative ventures, expanding its geographical coverage to enhance the lives and livelihoods of marginal and poor communities, aligning with national priorities and 2030 targets.",
      moreText:
        "Our programs include microfinance initiatives, vocational training, and small business development support to create sustainable income opportunities for disadvantaged communities.",
      image: "/assets/RDF Photo/IMG_8448.JPG",
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Youth Development",
      description:
        "With youth comprising 35% of Bangladesh's population, RDF will focus on their skill development in technical, technological, ethical, and life skills.",
      moreText:
        "Special emphasis will be placed on girls' education, skill training, and promoting STEM education to bridge the existing gap. We run mentorship programs and career counseling sessions to guide young people towards productive careers.",
      image: "/assets/DSC03399.JPG",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Employable Skills Development",
      description:
        "RDF will expand its efforts in providing employable skills training tailored to market demands in the era of the Fourth Industrial Revolution (4IR).",
      moreText:
        "We partner with local industries to identify skill gaps and develop training programs that directly lead to employment opportunities. Our courses include digital literacy, advanced manufacturing skills, and service sector competencies.",
      image: "/assets/key3.webp",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Climate Change Adaptation & Disaster Risk Reduction",
      description:
        "RDF will intensify its work in climate-vulnerable coastal regions, particularly in Barishal Division.",
      moreText:
        "We focus on reducing climate-induced migration, human trafficking risks, and promoting Climate Smart Agriculture (CSA) for sustainable livelihoods. Our initiatives include early warning systems, resilient housing projects, and community-based adaptation strategies.",
      image: "/assets/RDF Photo/IMG_5223.JPG",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Promotion & Expansion of Renewable Energy",
      description:
        "To support climate change adaptation and carbon emission reduction, RDF will expand and promote renewable energy solutions.",
      moreText:
        "We implement solar energy initiatives for rural electrification, promote biogas plants for clean cooking, and train local technicians in renewable energy system maintenance. Our goal is to ensure sustainable and eco-friendly energy access for all communities.",
      image: "/assets/key5.webp",
      color: "from-yellow-500 to-amber-600",
    },
    {
      title: "Child Rights, Education, and Health",
      description:
        "With a dedicated team of professional researchers, RDF will conduct social research to support advocacy at local and national levels.",
      moreText:
        "Key focus areas include education (especially girls' education), healthcare, and climate change vulnerability and its impact. We operate school nutrition programs, mobile health clinics, and child protection services to ensure comprehensive support for children's development.",
      image: "/assets/RDF Photo/IMG_20231015_163140.jpg",
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Helmet>
        <title>RDF - Focus Areas</title>
        <meta
          name="description"
          content="Key focus areas of RDF organization for 2030"
        />
      </Helmet>

      <PageCoverPhoto
        title="Key Focus Areas by 2030"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Gradient Text Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 font-serif bg-gradient-to-r from-teal-400 to-green-600 bg-clip-text text-transparent"
        >
          Our Strategic Focus Areas
        </motion.h1>

        <div className="space-y-12">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              ref={focusSectionRefs[area.title]}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex flex-col md:flex-row`}
            >
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${area.color} opacity-20`}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col md:flex-row w-full bg-white bg-opacity-90 backdrop-blur-sm">
                {/* Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <motion.img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                {/* Text content */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div
                    className={`w-16 h-1 mb-4 bg-gradient-to-r ${area.color} rounded-full`}
                  ></div>
                  <h3
                    className={`text-2xl md:text-3xl font-bold font-serif mb-4 bg-gradient-to-r ${area.color} bg-clip-text text-transparent`}
                  >
                    {area.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Expanded content */}
                  {expandedCards[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-gray-600"
                    >
                      {area.moreText}
                    </motion.div>
                  )}

                  <motion.button
                    onClick={() => toggleExpand(index)}
                    whileHover={{ x: 5 }}
                    className={`mt-6 w-max text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r ${area.color} text-white shadow-md`}
                  >
                    {expandedCards[index] ? "Show less" : "Learn more →"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFocusArea;
