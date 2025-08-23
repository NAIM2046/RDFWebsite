import React, { useState } from "react";

const workApproach = [
  {
    title: "Identifying Issues",
    description:
      "RDF's approach to work is systematic and community-centric, encompassing a full project cycle. It begins with Identifying Issues through a deep understanding of the vulnerabilities faced by its target populations, particularly in coastal regions. ",
    expandedText:
      "This includes specific challenges like climate change impacts, high dropout rates, economic exclusion, child marriage risks, and limited access to essential services like WASH, identified through their presence across 48 districts.",
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
      "Planning & Strategy involves designing comprehensive, multi-sectoral programs aligned with national strategies (e.g., Bangladesh Climate Change Strategy) and the SDGs Strategies are tailored to address identified issues, integrating cross-cutting themes like gender transformation, disability inclusion,",
    expandedText:
      " and locally-led action into all initiatives, from food security and climate resilience to education and emergency response.",
    image:
      "https://i.ibb.co.com/1fLW7LW5/ACCESS-TO-FINANCE-Ranapasa-Union-Nalcity-Upazila-Jhalokath-jpg.jpg",
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
      "Community Engagement is fundamental prioritizing locally-led initiatives and participatory decision-making. RDF actively works with communities, engaging youth in governance, empowering women's groups, and ",
    expandedText:
      "collaborating with local bodies (e.g. for WASH infrastructure), ensuring solutions are grounded in the local context and ownership.",
    image: "https://i.ibb.co.com/My2bJG0t/Grameen-Shakti-png.png",
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
      "During Implementation, RDF executes its strategic programs through its strong field presence and approved planning, utilising the practical needs of the target people, like establishing Skills Training Centres, deploying solar technologies (irrigation, rooftops, lighting), providing microloans and asset transfers,running awareness campaigns, ",
    expandedText:
      " and partnering with organisations for emergency response. Implementation focuses on building capacity (technical skills, STEM/AI, entrepreneurship) and providing direct support and linkages with the government, non-government and private sector service providers.",
    image: "https://i.ibb.co.com/Vcynj5yM/IMG-5277-webp.webp",
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
      "Finally, Monitoring and Evaluation is underpinned by robust governance (General Council, Executive Committee oversight of the CEO) and strong internal controls.RDF's commitment to ethical behaviour, accountability, zero-tolerance for violations, and adherence to its mission, vision, and values ensures programs are tracked for effectiveness and impact, maintaining  ",
    expandedText:
      "credibility and enabling continuous improvement in serving vulnerable communities. This structured approach ensures interventions are relevant, participatory, effectively delivered, and accountable, aiming for sustainable and transformative change.",
    image: "https://i.ibb.co.com/0jH0sNMZ/IMG-20190917-160446.jpg",

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

  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4 text-center m-4 pb-4">
          <span className="text-green-500"> Our</span>{" "}
          <span className="text-red-500">Approach</span>
        </h1>
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
              {/* <div
                className={`inline-block ${step.color} text-white px-4 py-1 rounded-full text-sm font-semibold mb-3`}
              >
                Step {index + 1}
              </div> */}
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mb-2">{step.description}</p>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedStep === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 pt-1 border-t border-gray-200 mt-4">
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
      {/* <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
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
      </div> */}
    </div>
  );
};

export default OurApproach;
