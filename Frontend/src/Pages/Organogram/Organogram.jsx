import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

const organogramData = {
  title: "RDF Organogram Structure",
  image: "/assets/RDF Photo/organogram.png",
  governance: {
    heading: "Governance Overview",
    description:
      "A 21-member General Committee (GC) governs RDF. The GC selects a 7-member Executive Committee (EC) responsible for policy guidelines. The Executive Director (ED) oversees programs and implementation.",
  },
  sections: [
    {
      title: "Central Coordination Unit (CCU)",
      description:
        "Consists of 21 senior officials (Finance, HR, Program, etc.). The ED is the Chairman of CCU.",
    },
    {
      title: "Regional Coordination Unit (RCU)",
      description:
        "Five RCU teams ensure coordination between central and field offices.",
    },
    {
      title: "District Focal Team (DFT)",
      description: "Manages all ongoing programs within each district.",
    },
    {
      title: "Upazila Focal Team (UFT)",
      description:
        "Oversees Upazila programs, conducts review and planning meetings.",
    },
  ],
  decisionMaking: {
    heading: "Decision-Making Process",
    description:
      "The governance structure follows a two-way decision-making process, ensuring accountability from both top-down and bottom-up approaches.",
    points: [
      "GC → EC → ED → CCU → RCU → DFT → UFT",
      "AGM ensures annual review, discussions, and budget approvals.",
    ],
  },
};

const Organogram = () => {
  return (
    <div>
      <PageCoverPhoto title={"Our Organogram"}></PageCoverPhoto>
      <div className="min-h-screen mx-auto max-w-7xl bg-white shadow-2xl p-6 mt-24 mb-10 rounded-lg">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-center text-orange-400 mb-6 font-serif">
          {organogramData.title}
        </h1>

        {/* Organogram Flowchart Image */}
        <div className="flex justify-center mb-8">
          <img
            src={organogramData.image}
            alt="Organogram"
            className="w-full max-w-4xl shadow-2xl rounded-lg"
          />
        </div>

        {/* Governance Overview */}
        <div className="bg-white p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {organogramData.governance.heading}
          </h2>
          <p className="text-gray-600">
            {organogramData.governance.description}
          </p>
        </div>

        {/* Coordination Units - Dynamic Rendering */}
        <div className="bg-white">
          {organogramData.sections.map((section, index) => (
            <div key={index} className="p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                {section.title}
              </h3>
              <p className="text-gray-600">{section.description}</p>
            </div>
          ))}
        </div>

        {/* Decision-Making Process */}
        <div className="p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {organogramData.decisionMaking.heading}
          </h2>
          <p className="text-gray-500">
            {organogramData.decisionMaking.description}
          </p>
          <ul className="list-disc pl-6 mt-3 text-gray-600">
            {organogramData.decisionMaking.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Organogram;
