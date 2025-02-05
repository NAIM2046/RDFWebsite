import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const MemberDetails = () => {
  const location = useLocation();
  const member = location.state?.member || {};
  const [activeTab, setActiveTab] = useState("research"); // Default active tab
  console.log(member);
  return (
    <div className="container mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 mt-14">
        {/* Profile Image */}
        <div className="flex-shrink-0 pt-5 pl-16 pr-16 border-2 border-neutral-300 rounded-lg h-96">
          <img
            src={member.image || "/assets/default-image.jpg"}
            alt={member.name}
            className="w-60 h-60 object-cover rounded-lg shadow-2xl"
          />
          <h3 className="text-center text-xl font-bold text-blue-600 mt-2">
            {member.name}
          </h3>
          <p className="text-center text-gray-700 font-semibold">
            {member.post}
          </p>
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-800 border-2 rounded-lg border-r-white border-l-white pb-2 pl-2">
            PROFILE
          </h1>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              SHORT BIOGRAPHY
            </h2>
            <p className="text-gray-600 mt-2">{member.bio || "N/A"}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              RESEARCH INTEREST
            </h2>
            <p className="text-gray-600 mt-2">{member.research || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-6 border-b pb-2 flex gap-6 text-blue-600 font-semibold text-lg">
        {[
          { id: "research", label: "RESEARCH & PUBLICATION" },
          { id: "academic", label: "ACADEMIC INFO" },
          { id: "experience", label: "EXPERIENCE" },
          { id: "contact", label: "CONTACT" },
        ].map((tab) => (
          <span
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer hover:text-blue-800 ${
              activeTab === tab.id
                ? "text-blue-800 border-b-2 border-blue-800"
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
            <p className="text-gray-600 mt-2">
              {member.research || "No research details available."}
            </p>
          </div>
        )}

        {activeTab === "academic" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Academic Information
            </h2>
            <p className="text-gray-600 mt-2">
              {member.academic || "No academic info available."}
            </p>
          </div>
        )}

        {activeTab === "experience" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800">Experience</h2>
            {member.experience ? (
              member.experience.map((exp, index) => (
                <div key={index} className="mt-4">
                  <p className="text-gray-700 font-semibold">
                    Organization: {exp.organization}
                  </p>
                  <p className="text-gray-600">Position: {exp.position}</p>
                  <p className="text-gray-600">Period: {exp.period}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-2">
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
            <p className="text-gray-600 mt-2">
              Email: {member.contact.email || "Not available"}
            </p>
            <p className="text-gray-600">
              Phone: {member.contact.phone || "Not available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
