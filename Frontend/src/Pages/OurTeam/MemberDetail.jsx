import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MemberDetails = () => {
  const location = useLocation();
  const member = location.state?.member || {};

  // Helper function to detect URLs and make them clickable
  const renderBioWithLinks = (text) => {
    if (!text) return "N/A";

    // Regex to find http or https links
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>{/* ... (Your existing Helmet code) ... */}</Helmet>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden mt-20 lg:mt-8">
        <div className="flex flex-col md:flex-row">
          {/* Profile Image + Name + Post */}
          <div className="md:w-2/5 bg-gradient-to-b from-blue-800 to-blue-600 p-8 flex flex-col items-center text-center">
            <div className="mb-6">
              <img
                src={member.image || "/assets/default-image.jpg"}
                alt={member.name}
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-lg shadow-lg border-4 border-white"
              />
            </div>
            <h3 className="text-xl font-bold text-white mt-4">{member.name}</h3>
            <p className="text-blue-200 font-medium mt-2">{member.post}</p>
          </div>

          {/* Profile Details */}
          <div className="md:w-3/5 p-8">
            <div className="mb-2">
              <div className="flex justify-center items-center mb-6">
                <div className="h-px w-10 bg-blue-200 mr-4"></div>
                <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center border-b-2 border-blue-100 pb-3">
                  BIOGRAPHY
                </h1>
                <div className="h-px w-10 bg-blue-200 ml-4"></div>
              </div>

              <div className="mt-4">
                {/* Replaced standard text with the helper function */}
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                  {renderBioWithLinks(member.bio)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
