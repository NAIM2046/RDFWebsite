import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/team.jpg";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";

const OurTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [designation, setDesignation] = useState("");
  const navigate = useNavigate();
  const { teams, fetchTeams } = useRDFStore();

  useEffect(() => {
    if (teams.length === 0) {
      fetchTeams();
    }
  }, []);
  console.log(teams);

  const filteredMembers = teams.filter((member) => {
    const matchesSearchTerm = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // ✅ Fix: check inside committee_name field
    const matchesDesignation = designation
      ? member.committees.some(
          (c) => c.committee_name.toLowerCase() === designation.toLowerCase()
        )
      : true;

    return matchesSearchTerm && matchesDesignation;
  });

  // Define custom priority order
  const priority = {
    "Executive Committee": 1,
    "General Committee": 2,
    "Senior Management": 3,
  };

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (designation) {
      // Look up the rank for the current designation in each member
      const aCommittee = a.committees.find(
        (c) => c.committee_name.toLowerCase() === designation.toLowerCase()
      );
      const bCommittee = b.committees.find(
        (c) => c.committee_name.toLowerCase() === designation.toLowerCase()
      );

      const aRank = aCommittee ? parseInt(aCommittee.rank) : 999;
      const bRank = bCommittee ? parseInt(bCommittee.rank) : 999;

      return aRank - bRank;
    } else {
      // Fallback → custom priority when no designation is selected
      const priority = {
        "Executive Committee": 1,
        "General Committee": 2,
        "Senior Management": 3,
      };

      const aPriority = Math.min(
        ...a.committees.map((c) => priority[c.committee_name] || 999)
      );
      const bPriority = Math.min(
        ...b.committees.map((c) => priority[c.committee_name] || 999)
      );

      return aPriority - bPriority;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Page Cover */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Helmet>
          <title>
            RDF Team Members | Resource Development Foundation (RDF)
          </title>
          <meta
            name="description"
            content="Meet the dedicated Resource Development Foundation (RDF) team members working to bring positive change in education, healthcare, and community development."
          />
          <meta
            name="keywords"
            content="RDF, Team, Bangladesh NGO, RDF Foundation, RDF Team Members"
          />
          <meta
            property="og:title"
            content="RDF Team Members | Resource Development Foundation (RDF)"
          />
          <meta
            property="og:description"
            content="Discover the passionate team members of Resource Development Foundation (RDF) who are committed to empowering communities."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourdomain.com/team" />
          <meta
            property="og:image"
            content="https://yourdomain.com/images/team-banner.jpg"
          />
          <link rel="canonical" href="https://yourdomain.com/team" />
        </Helmet>
        <PageCoverPhoto
          title="Our Team"
          subtitle="Creating Sustainable Impact Through Transformation"
          imageUrl={coverimg}
        />
      </motion.div>

      {/* Main Container */}
      <div className="container mx-auto p-6">
        {/* Filter Section */}
        <motion.div
          className="flex flex-wrap gap-6 mb-12 items-center justify-center bg-white p-6 rounded-2xl shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full max-w-6xl mx-auto px-4">
            {/* Search Input */}
            <motion.div
              className="relative w-full sm:w-80"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by Name..."
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>

            {/* Designation Filter */}
            <motion.div
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.01 }}
            >
              {/* Mobile: Select Dropdown */}
              <div className="block sm:hidden">
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-gray-700  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  {/* <option value="">All Members</option> */}
                  <option value="Executive Committee">
                    Executive Committee
                  </option>
                  <option value="General Committee">General Committee</option>
                  <option value="Senior Management">Senior Management</option>
                </select>
              </div>

              {/* Desktop: Radio Buttons as Tags */}
              <div className="hidden sm:flex flex-wrap gap-2">
                {[
                  // { label: "All Members", value: "" },
                  {
                    label: "Executive Committee",
                    value: "Executive Committee",
                  },
                  { label: "General Committee", value: "General Committee" },
                  { label: "Senior Management", value: "Senior Management" },
                ].map((item) => (
                  <label key={item.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="designation"
                      value={item.value}
                      checked={designation === item.value}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="hidden"
                    />
                    <span
                      className={`px-4 py-2 rounded-full cursor-pointer border transition-all duration-300 text-sm font-medium ${
                        designation === item.value
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {sortedMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5 },
                },
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group cursor-pointer"
            >
              {/* Professional Photo Card */}
              <div
                onClick={() =>
                  navigate(`/our-team/${member.name}`, { state: { member } })
                }
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100"
              >
                {/* Image Container with Elegant Frame */}
                <div className="relative overflow-hidden">
                  {/* Decorative Top Element */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 z-10"></div>

                  {/* Main Image with Hover Effect */}
                  <div className="p-4 pb-0">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-72 h-75 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>

                {/* Member Information */}
                {/* Member Information */}
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {member.post}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {sortedMembers.length === 0 && teams.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No matching team members
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OurTeam;
