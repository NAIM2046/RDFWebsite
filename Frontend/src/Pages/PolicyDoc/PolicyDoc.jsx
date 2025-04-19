import React, { useState } from "react";
import { HiDownload } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";

// Policy Data
const policies = [
  {
    id: 1,
    name: "Human Resource Management Policy",
    fileUrl: "/assets/Policy/Human Resource Policy_RDF.pdf",
  },
  {
    id: 2,
    name: "Financial Policy",
    fileUrl: "/assets/policies/financial-policy.pdf",
  },
  {
    id: 3,
    name: "Procurement Policy",
    fileUrl: "/assets/policies/procurement-policy.pdf",
  },
  {
    id: 4,
    name: "Staff Grievance Policy",
    fileUrl: "/assets/policies/staff-grievance-policy.pdf",
  },
  {
    id: 5,
    name: "Child Protection Policy",
    fileUrl: "/assets/Policy/9. Child Safeguarding Policy.pdf",
  },
  {
    id: 6,
    name: "Gender Policy",
    fileUrl: "/assets/policies/gender-policy.pdf",
  },
  {
    id: 7,
    name: "Monitoring & Evaluation (M&E) Plan & Policy",
    fileUrl: "/assets/policies/me-policy.pdf",
  },
  {
    id: 8,
    name: "Whistle Blowing Policy",
    fileUrl: "/assets/policies/whistle-blowing-policy.pdf",
  },
  {
    id: 9,
    name: "Data Privacy Policy",
    fileUrl: "/assets/policies/data-privacy-policy.pdf",
  },
  {
    id: 10,
    name: "Anti-Modern Slavery Policy",
    fileUrl: "/assets/policies/anti-modern-slavery-policy.pdf",
  },
  {
    id: 11,
    name: "Anti-Corruption and Anti-Fraud Policy",
    fileUrl: "/assets/policies/anti-corruption-policy.pdf",
  },
  {
    id: 12,
    name: "Prevention of Sexual Harassment & Exploitation and Abuse (PSHEA) Policy",
    fileUrl: "/assets/policies/pshea-policy.pdf",
  },
  {
    id: 13,
    name: "ESS Framework",
    fileUrl: "/assets/policies/ess-framework.pdf",
  },
  {
    id: 14,
    name: "Travel Policy",
    fileUrl: "/assets/policies/travel-policy.pdf",
  },
  {
    id: 15,
    name: "Vehicle Operation & Maintenance Policy",
    fileUrl: "/assets/policies/vehicle-operation-policy.pdf",
  },
];

const PolicyDoc = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 pb-10">
      <Helmet>
        <title> RDF - Policies </title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-green-600 text-white py-12 text-center shadow-lg">
        <h1 className="text-4xl font-bold mt-20 lg:mt-0">Our Policies</h1>
        <p className="text-lg mt-2">
          Read our policies carefully before using our services.
        </p>
      </div>

      {/* Search Box */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label className="text-green-800 font-medium">Search Policy:</label>
          <input
            type="text"
            placeholder="Enter policy name"
            className="p-2 border rounded-lg w-72 text-center shadow-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Policies Grid */}
      <div className="container mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white shadow-xl hover:shadow-2xl rounded-2xl p-4 transition-all transform hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                {/* Top Section */}
                <div>
                  <div className="bg-green-100 p-4 rounded-full w-fit mx-auto shadow">
                    <FiFileText className="w-14 h-14 text-green-700" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mt-4 text-center">
                    {policy.name}
                  </h2>
                </div>

                {/* Buttons Section - always at bottom */}
                <div className="flex justify-center gap-4 mt-6">
                  <a
                    href={policy.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-lg transition"
                  >
                    <FaEye className="w-5 h-5" />
                    View
                  </a>
                  <a
                    href={policy.fileUrl}
                    download
                    className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-lg transition"
                  >
                    <HiDownload className="w-5 h-5" />
                    Download
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg w-full">
              No policies found for the entered search term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDoc;
