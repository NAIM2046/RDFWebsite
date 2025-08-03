import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const workApproach = [
  {
    title: "Identifying Issues",
    description:
      "We begin with a deep understanding of vulnerabilities in coastal regions, including climate change, economic exclusion, dropout rates, and lack of access to essential services.",
    expandedText:
      "RDF identifies the root causes of community challenges by conducting field studies, engaging with local populations across 48 districts, and analyzing pressing issues such as climate vulnerability, child marriage, WASH access, and educational gaps. This ensures our interventions are grounded in evidence and address real needs.",
    image: "/assets/photo-41.1-400x284.jpg",
    color: "bg-gradient-to-r from-blue-500 to-teal-400",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Planning & Strategy",
    description:
      "We design multi-sectoral programs aligned with national strategies and the SDGs, ensuring inclusive, scalable, and sustainable solutions.",
    expandedText:
      "Our strategies incorporate gender transformation, disability inclusion, and locally-led action across programs in food security, climate resilience, education, and emergency response. Each plan includes clear goals and integrates cross-cutting themes to maximize impact.",
    image: "/assets/our2.webp",
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Community Engagement",
    description:
      "We prioritize participatory development through locally-led initiatives, community ownership, and inclusive governance.",
    expandedText:
      "RDF works closely with communities, empowering women's groups and youth leaders while collaborating with local bodies to co-create solutions. Our participatory approach ensures that all interventions are contextually appropriate, culturally sensitive, and community-driven.",
    image: "/assets/our3.webp",
    color: "bg-gradient-to-r from-orange-500 to-pink-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Implementation",
    description:
      "We bring our plans to life through strong field presence, practical solutions, and partnerships across sectors.",
    expandedText:
      "From Skills Training Centres to solar tech, microloans, and emergency support, RDF implements programs that respond to real community needs. Our approach includes capacity building in STEM, AI, and entrepreneurship, and links beneficiaries with government and private services.",
    image: "/assets/our4.webp",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Monitoring & Evaluation",
    description:
      "We track progress through robust governance and data-driven evaluation, ensuring accountability and long-term impact.",
    expandedText:
      "With oversight from our General Council and Executive Committee, RDF uses strong internal controls, ethical practices, and impact assessments to measure success. We emphasize transparency, continuous learning, and alignment with our mission, vision, and values.",
    image: "/assets/our4.webp",
    image: "/assets/our4.webp",
    color: "bg-gradient-to-r from-red-500 to-yellow-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

const OurApproach = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);
  const navigate = useNavigate();
  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl overflow-hidden shadow-2xl mb-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 px-6 py-12 md:py-20 lg:px-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
              Our <span className="text-yellow-300">Approach</span>
            </h1>
            <p className="text-lg text-white mb-6">
              Placing women and girls at the center of focus and working with
              government, national and international NGOs, and civil society
              partners, RDF is working with millions.
              {isExpanded && (
                <>
                  {" "}
                  Through its projects and programs, RDF aims to create lasting
                  change by strengthening marginalized communities and
                  amplifying their voices. Our comprehensive approach ensures
                  sustainable development and measurable impact.
                </>
              )}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-2 bg-white text-green-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <img
              src="/assets/ourapproach.webp"
              alt="Community Women"
              className="w-full max-w-md rounded-lg shadow-xl transform rotate-2 border-4 border-white"
            />
            <img
              src="/assets/ourApproach1.webp"
              alt="Empowered Woman"
              className="hidden lg:block absolute -bottom-10 -right-10 w-56 rounded-lg shadow-xl border-4 border-white transform -rotate-6"
            />
          </div>
        </div>
      </div>

      {/* Work Approach Steps */}
      <div className="space-y-12">
        {workApproach.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            }  ${
              index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
            } items-center rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500`}
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 h-64 md:h-80 relative overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
              />
              <div
                className={`absolute top-4 ${
                  index % 2 === 0 ? "left-4" : "right-4"
                } ${step.color} text-white p-3 rounded-full shadow-lg`}
              >
                {step.icon}
              </div>
            </div>

            {/* Text Section */}
            <div className={`w-full  lg:w-1/2 p-8 `}>
              <div
                className={`inline-block ${step.color} text-white px-4 py-1 rounded-full text-sm font-semibold mb-3`}
              >
                Step {index + 1}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mb-4">{step.description}</p>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedStep === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 pt-4 border-t border-gray-200 mt-4">
                  {step.expandedText}
                </p>
              </div>

              <button
                onClick={() => toggleStep(index)}
                className={`mt-4 px-4 py-2 ${step.color} text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all flex items-center`}
              >
                {expandedStep === index ? "Show Less" : "Learn More"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                    expandedStep === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
        <h2 className="text-3xl font-bold font-serif mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-6 max-w-3xl mx-auto">
          Join us in our mission to create sustainable change through our proven
          approach.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/payment")}
            className="px-8 py-3 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg"
          >
            Donate Now
          </button>
          <button
            onClick={() => navigate("/volunteer")}
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-purple-600 transition-all"
          >
            Volunteer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurApproach;
