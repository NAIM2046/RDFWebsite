import React from "react";

const workApproach = [
  {
    title: "Identifying Issues",
    description:
      "We conduct thorough research and assessments to identify the most pressing community issues.",
    image: "/assets/our1.webp",
  },
  {
    title: "Planning & Strategy",
    description:
      "Developing strategic action plans with measurable goals to address identified problems effectively.",
    image: "/assets/our2.webp",
  },
  {
    title: "Community Engagement",
    description:
      "Working closely with local communities to ensure participatory solutions that drive real impact.",
    image: "/assets/our3.webp",
  },
  {
    title: "Implementation",
    description:
      "Executing projects and programs with transparency, efficiency, and sustainability in mind.",
    image: "/assets/our4.webp",
  },
  {
    title: "Monitoring & Impact",
    description:
      "Tracking progress, evaluating results, and continuously improving for long-term effectiveness.",
    image: "/assets/our4.webp",
  },
];

const OurApproach = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold">
            Our <span className="text-orange-500">Approach</span>
          </h1>
          <p className="text-gray-700 mt-4">
            Placing women and girls at the center of focus and working with
            government, national and international NGOs, and civil society
            partners, RDF is working with millions. Through its projects and
            programs, RDF aims to create lasting change by strengthening
            marginalized communities and amplifying their voices.
          </p>
          <a
            href="#"
            className="text-orange-500 font-semibold mt-4 inline-block"
          >
            Read More +
          </a>
        </div>

        {/* Right Images */}
        <div className="md:w-1/2 relative">
          <img
            src="/assets/ourapproach.webp"
            alt="Community Women"
            className="w-3/4 rounded-lg shadow-lg"
          />
          <img
            src="/assets/ourApproach1.webp"
            alt="Empowered Woman"
            className=" bottom-[-10] left-10 w-3/4 rounded-lg shadow-lg border-4 border-white"
          />
        </div>
      </div>
      <div className="space-y-12">
        {workApproach.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all`}
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full md:w-1/2 h-full object-cover rounded-md"
            />
            <div className="md:w-1/2 p-6">
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurApproach;
