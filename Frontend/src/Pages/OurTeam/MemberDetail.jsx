import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MemberDetails = () => {
  const location = useLocation();
  const member = location.state?.member || {};

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-100">
      <Helmet>
        <title>RDF Team Members | RDF Bangladesh Foundation</title>
        <meta
          name="description"
          content="Meet the dedicated RDF Bangladesh Foundation team members working to bring positive change in education, healthcare, and community development."
        />
        <meta
          name="keywords"
          content="RDF, Team, Bangladesh NGO, RDF Foundation, RDF Team Members"
        />
        <meta
          property="og:title"
          content="RDF Team Members | RDF Bangladesh Foundation"
        />
        <meta
          property="og:description"
          content="Discover the passionate team members of RDF Bangladesh Foundation who are committed to empowering communities."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/team" />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/team-banner.jpg"
        />
        <link rel="canonical" href="https://yourdomain.com/team" />
      </Helmet>

      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 mt-20 lg:mt-1">
        {/* Profile Image + Name + Post */}
        <div className="flex-shrink-0 flex flex-col items-center text-center mx-auto md:mx-0 border-2 border-neutral-300 rounded-lg p-4 h-[60%]">
          <img
            src={member.image || "/assets/default-image.jpg"}
            alt={member.name}
            className="w-40 sm:w-48 md:w-72 h-40 sm:h-48 md:h-72 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-lg sm:text-xl font-bold text-blue-600 mt-3">
            {member.name}
          </h3>
          <p className="text-green-400 font-semibold text-sm sm:text-base">
            {member.post}
          </p>
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-800 border-2 rounded-lg border-r-white border-l-white pb-2 pt-2 text-center">
            BIOGRAPHY
          </h1>
          <div className="mt-4 pl-3">
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {member.bio || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
