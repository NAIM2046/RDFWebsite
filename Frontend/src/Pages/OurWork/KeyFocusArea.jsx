import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/keyof1.webp";
import { Helmet } from "react-helmet-async";

const KeyFocusArea = () => {
  const location = useLocation();

  // Create references for each section
  const focusSectionRefs = {
    "Economic Empowerment of the Poor": useRef(null),
    "Youth Development": useRef(null),
    "Employable Skills Development": useRef(null), // This is the target
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
      image: "/assets/RDF Photo/IMG_8448.JPG",
    },
    {
      title: "Youth Development",
      description:
        "With youth comprising 35% of Bangladesh's population, RDF will focus on their skill development in technical, technological, ethical, and life skills. Special emphasis will be placed on girls' education, skill training, and promoting STEP education to bridge the existing gap.",
      image: "/assets/DSC03399.JPG",
    },
    {
      title: "Employable Skills Development",
      description:
        "RDF will expand its efforts in providing employable skills training tailored to market demands in the era of the Fourth Industrial Revolution (4IR), ensuring better career opportunities for beneficiaries.",
      image: "/assets/key3.webp",
    },
    {
      title: "Climate Change Adaptation & Disaster Risk Reduction",
      description:
        "RDF will intensify its work in climate-vulnerable coastal regions, particularly in Barishal Division, focusing on reducing climate-induced migration, human trafficking risks, and promoting Climate Smart Agriculture (CSA) for sustainable livelihoods.",
      image: "/assets/RDF Photo/IMG_5223.JPG",
    },
    {
      title: "Promotion & Expansion of Renewable Energy",
      description:
        "To support climate change adaptation and carbon emission reduction, RDF will expand and promote renewable energy solutions, particularly solar energy initiatives, ensuring sustainable and eco-friendly energy access.",
      image: "/assets/key5.webp",
    },
    {
      title: "Child Rights, Education, and Health",
      description:
        "With a dedicated team of professional researchers, RDF will conduct social research to support advocacy at local and national levels. Key focus areas include education (especially girls' education), healthcare, and climate change vulnerability and its impact.",
      image: "/assets/RDF Photo/IMG_20231015_163140.jpg",
    },
  ];

  return (
    <div className="mx-auto">
      <Helmet>
        <title> RDF-Focus Areas </title>
      </Helmet>
      <PageCoverPhoto
        title="Key Focus Areas by 2030"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 font-serif">
          Key Focus Areas
        </h1>
        <div className="space-y-8">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              ref={focusSectionRefs[area.title]} // Attach ref to each section
              className={`flex flex-col md:flex-row  ${
                index % 2 === 0 ? "md:flex-row-reverse bg-gray-100" : "bg-white"
              } shadow-lg rounded-lg p-6 hover:shadow-xl transition-all`}
            >
              <img
                src={area.image}
                alt={area.title}
                className="w-full md:w-1/2 h-full object-cover rounded-md "
              />
              <div className="md:w-1/2 p-4">
                <h3 className="text-xl font-bold font-serif">{area.title}</h3>
                <p className="text-gray-600 mt-2">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFocusArea;
