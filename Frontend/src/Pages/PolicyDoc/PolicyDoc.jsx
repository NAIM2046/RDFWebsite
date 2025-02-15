import React, { useState } from "react";

// Policy Data with PDF Files
const policies = [
  {
    id: 1,
    title: "Privacy Policy",
    content: "We respect your privacy. Your data will not be shared...",
    pdf: "/assets/policies/privacy_policy.pdf",
  },
  {
    id: 2,
    title: "Terms & Conditions",
    content:
      "By using our services, you agree to follow our terms and conditions...",
    pdf: "/assets/policies/terms_conditions.pdf",
  },
  {
    id: 3,
    title: "Refund Policy",
    content:
      "We offer refunds under certain conditions. Refund requests must be...",
    pdf: "/assets/policies/refund_policy.pdf",
  },
  {
    id: 4,
    title: "Code of Conduct",
    content:
      "All users must adhere to ethical guidelines while using our services...",
    pdf: "/assets/policies/code_of_conduct.pdf",
  },
];

const PolicyDoc = () => {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-20">
      {/* Header */}
      <div className="bg-gray-800 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Our Policies</h1>
        <p className="text-lg mt-2">
          Read our policies carefully before using our services.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar - Table of Contents */}
        <div className="md:w-1/3 bg-white p-6 shadow-lg rounded-lg sticky top-20 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Table of Contents
          </h2>
          <ul className="space-y-3">
            {policies.map((policy) => (
              <li key={policy.id}>
                <button
                  className="text-gray-700 hover:text-gray-900 hover:underline"
                  onClick={() => setOpenSection(policy.id)}
                >
                  {policy.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Policy Content */}
        <div className="md:w-2/3 space-y-6">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white p-6 shadow-lg rounded-lg border border-gray-200"
            >
              <button
                className="w-full text-left text-xl font-semibold text-gray-800 flex justify-between"
                onClick={() =>
                  setOpenSection(openSection === policy.id ? null : policy.id)
                }
              >
                {policy.title}
                <span>{openSection === policy.id ? "🔼" : "🔽"}</span>
              </button>
              {openSection === policy.id && (
                <div className="mt-4">
                  <p className="text-gray-700">{policy.content}</p>

                  {/* Buttons */}
                  <div className="mt-4 flex gap-4">
                    {/* View Button */}
                    <a
                      href={policy.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                    >
                      👀 View
                    </a>

                    {/* Download Button */}
                    <a
                      href={policy.pdf}
                      download
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
                    >
                      📄 Download
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyDoc;
