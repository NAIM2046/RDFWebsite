import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/keyof1.webp";

const KeyFocusArea = () => {
  const location = useLocation();

  // Create references for each section
  const focusSectionRefs = {
    "Economic Empowerment of the Poor": useRef(null),
    "Youth Development": useRef(null),
    "Employable Skills Development": useRef(null), // This is the target
    "Climate Change Adaptation & Disaster Risk Reduction": useRef(null),
    "Promotion & Expansion of Renewable Energy": useRef(null),
    "Social Research": useRef(null),
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
        "RDF will continue its Economic Empowerment components with new and innovative ventures, expanding geographical coverage for marginal and poor communities.",
      image: "/assets/key1.webp",
    },
    {
      title: "Youth Development",
      description:
        "RDF will focus on skill development for youth, including technical, technological, ethical, and life-skills training, emphasizing girl's education and STEP education.",
      image: "/assets/key2.webp",
    },
    {
      title: "Employable Skills Development",
      description:
        "RDF will provide employable skills training aligned with market needs and the fourth industrial revolution (4IR).",
      image: "/assets/key3.webp",
    },
    {
      title: "Climate Change Adaptation & Disaster Risk Reduction",
      description:
        "RDF will work intensively in climate-vulnerable coastal areas, focusing on reducing migration risks, trafficking, and promoting Climate Smart Agriculture (CSA).",
      image: "/assets/key4.webp",
    },
    {
      title: "Promotion and Expansion of Renewable Energy",
      description:
        "RDF will expand renewable energy initiatives, including solar energy promotion, to support climate change adaptation and carbon reduction efforts.",
      image: "/assets/key5.webp",
    },
    {
      title: "Child Rights, Education, and Health",
      description:
        "RDF will conduct social research for advocacy on education, health, and climate change impacts, leveraging its professional research team.",
      image: "/assets/key6.webp",
    },
  ];

  return (
    <div className="mx-auto">
      <PageCoverPhoto
        title="Key Focus Areas by 2030"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={coverimg}
      />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Key Focus Areas by 2030
        </h1>
        <div className="space-y-8">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              ref={focusSectionRefs[area.title]} // Attach ref to each section
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row-reverse bg-gray-100" : "bg-white"
              } shadow-lg rounded-lg p-6 hover:shadow-xl transition-all`}
            >
              <img
                src={area.image}
                alt={area.title}
                className="w-full md:w-1/2 h-full object-cover rounded-md"
              />
              <div className="md:w-1/2 p-4">
                <h3 className="text-xl font-bold">{area.title}</h3>
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
