import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MemberDetails = () => {
  const location = useLocation();
  const member = location.state?.member || {};
  const [activeTab, setActiveTab] = useState("research"); // Default active tab

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-100">
      <Helmet>
        <title> RDF-Team Members </title>
      </Helmet>

      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 mt-20 lg:mt-1">
        {/* Profile Image */}
        <div className="flex-shrink-0 mx-auto md:mx-0 border-2 border-neutral-300 rounded-lg p-4">
          <img
            src={member.image || "/assets/default-image.jpg"}
            alt={member.name}
            className="w-40 sm:w-48 md:w-72 h-40 sm:h-48 md:h-72 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-center text-lg sm:text-xl font-bold text-blue-600 mt-3">
            {member.name}
          </h3>
          <p className="text-center text-green-400 font-semibold text-sm sm:text-base">
            {member.post}
          </p>
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl  font-bold text-blue-800 border-2 rounded-lg border-r-white border-l-white pb-2 pl-2">
            PROFILE
          </h1>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-green-400">
              SHORT BIOGRAPHY
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {member.bio || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-6 border-b pb-2 flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start text-blue-600 font-semibold text-sm sm:text-lg">
        {[
          { id: "research", label: "RESEARCH & PUBLICATION" },
          { id: "academic", label: "ACADEMIC INFO" },
          { id: "experience", label: "EXPERIENCE" },
          { id: "contact", label: "CONTACT" },
        ].map((tab) => (
          <span
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer hover:text-blue-800 font-serif px-2 sm:px-3 py-1 rounded ${
              activeTab === tab.id
                ? "text-green-400 border-b-2 border-blue-800"
                : ""
            }`}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "research" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Research & Publications
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {member.research || "No research details available."}
            </p>
          </div>
        )}

        {activeTab === "academic" &&
          member.academic?.map((edu, index) => (
            <div key={index} className="mt-4 pb-2">
              <p className="text-gray-700 font-semibold">
                Institute: {edu.institute || "N/A"}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                Degree: {edu.degree || "N/A"}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                Period: {edu.period || "N/A"}
              </p>
            </div>
          ))}

        {activeTab === "experience" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800">Experience</h2>
            {member.experience?.length ? (
              member.experience.map((exp, index) => (
                <div key={index} className="mt-4">
                  <p className="text-gray-700 font-semibold">
                    Organization: {exp.organization}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Position: {exp.position}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Period: {exp.period}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                No experience details available.
              </p>
            )}
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Contact Information
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Email: {member.contact?.email || "Not available"}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Phone: {member.contact?.phone || "Not available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
