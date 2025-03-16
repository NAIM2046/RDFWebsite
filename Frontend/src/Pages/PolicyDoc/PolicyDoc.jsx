import React, { useState } from "react";
import { HiDownload } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

// Policy Data with PDF Files
const policies = [
  {
    id: 1,
    name: "Human Resource Management Policy",
    fileUrl: "/assets/policies/hr-management-policy.pdf",
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

  // Filter policies based on user input
  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <Helmet>
        <title> RDF-Policy </title>
      </Helmet>
      {/* Header Section */}
      <div className="bg-gray-800 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Our Policies</h1>
        <p className="text-lg mt-2">
          Read our policies carefully before using our services.
        </p>
      </div>

      {/* Search Box */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <label className="text-gray-700 font-medium">Search Policy:</label>
          <input
            type="text"
            placeholder="Enter policy name"
            className="p-2 border rounded-lg w-72 text-center shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Policies List */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <FiFileText className="w-12 h-12 text-blue-600 mb-3" />

                <h2 className="text-lg font-semibold text-gray-800">
                  {policy.name}
                </h2>

                <div className="flex gap-4 mt-4">
                  {/* View Policy */}
                  <a
                    href={policy.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" btn btn-outline btn-warning px-4 py-2 rounded-lg  transition duration-300"
                  >
                    View
                  </a>

                  {/* Download Policy */}
                  <a
                    href={policy.fileUrl}
                    download
                    className=" btn btn-outline btn-dash btn-primary px-4 py-2 rounded-lg flex items-center gap-2  transition duration-300"
                  >
                    <HiDownload className="w-5 h-5" />
                    Download
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg w-full">
              No policies found for the entered search term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDoc;
