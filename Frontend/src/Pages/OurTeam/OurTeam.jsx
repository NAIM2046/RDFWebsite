import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import coverimg from "/assets/ourteam/team1.jpeg";
import useRDFStore from "../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";

const OurTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [designation, setDesignation] = useState("");
  const navigate = useNavigate();
  const { teams, fetchTeams, isLoading } = useRDFStore();

  useEffect(() => {
    if (teams.length === 0) {
      fetchTeams();
    }
  }, []);

  const filteredMembers = teams.filter((member) => {
    const matchesSearchTerm = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDesignation = designation
      ? member.committees.some(
          (c) => c.committee_name.toLowerCase() === designation.toLowerCase()
        )
      : true;

    return matchesSearchTerm && matchesDesignation;
  });

  const priority = {
    "Executive Committee": 1,
    "General Committee": 2,
    "Senior Management": 3,
  };

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (designation) {
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
      const aPriority = Math.min(
        ...a.committees.map((c) => priority[c.committee_name] || 999)
      );
      const bPriority = Math.min(
        ...b.committees.map((c) => priority[c.committee_name] || 999)
      );

      return aPriority - bPriority;
    }
  });

  // Loading Skeleton Component
  const TeamCardSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden">
        <div className="h-1 bg-gray-200"></div>
        <div className="p-4 pb-0">
          <div className="relative overflow-hidden rounded-t-xl">
            <div className="w-full h-72 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-1 bg-gray-200"></div>
    </div>
  );

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
          <meta property="og:url" content="https://rdfbd.org/our-team" />
          <meta
            property="og:image"
            content="https://rdfbd.org/images/team-banner.jpg"
          />
          <link rel="canonical" href="https://rdfbd.org/our-team" />
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
                  className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
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

        {/* Loading State */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto max-w-7xl"
          >
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Team Members Grid */
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
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 z-10"></div>

                    <div className="p-4 pb-0">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-72 h-75 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Member Information */}
                  <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {member.post}
                    </p>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && sortedMembers.length === 0 && teams.length > 0 && (
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

        {/* Initial Loading State */}
        {isLoading && teams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              {/* Animated Spinner */}
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin mx-auto"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-t-4 border-blue-600 rounded-full animate-spin"></div>
              </div>

              {/* Loading Text with Animation */}
              <motion.h3
                className="text-xl font-semibold text-gray-700 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Loading Our Team
              </motion.h3>
              <motion.p
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Gathering our amazing team members...
              </motion.p>

              {/* Progress Dots */}
              <motion.div
                className="flex justify-center space-x-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-blue-600 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OurTeam;
