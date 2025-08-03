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
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll to the top when the route changes
  // }, []);

  const filteredMembers = teams.filter((member) => {
    const matchesSearchTerm =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.research.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDesignation = designation ? member.type === designation : true;

    return matchesSearchTerm && matchesDesignation;
  });

  const sortedMembers = [...filteredMembers].sort(
    (a, b) => parseInt(a.rank) - parseInt(b.rank)
  );

  return (
    <div>
      {/* Page Cover with Smooth Fade-In Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={true}
      >
        <Helmet>
          <title> RDF-Team Members </title>
        </Helmet>
        <PageCoverPhoto
          title="Our Team"
          subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
          imageUrl={coverimg}
        />
      </motion.div>

      {/* Main Container */}
      <div className="container mx-auto p-6 bg-gray-100  ">
        {/* Filter Section with Slide-In Animation */}
        <motion.div
          className="flex flex-wrap gap-6 mb-8 items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full max-w-6xl mx-auto px-4">
            {/* Search Input */}
            <motion.div
              className="relative w-full sm:w-80"
              whileHover={{ scale: 1.05 }}
            >
              <input
                type="text"
                placeholder="🔍 Search by Name..."
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 ease-in-out"
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
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  {/* <option value="">🔹 All Members</option> */}
                  <option value="General committee">
                    📌 General Committee
                  </option>
                  <option value="Executive committee">
                    ⭐ Executive Committee
                  </option>
                  <option value="Senior Management">
                    🏆 Senior Management
                  </option>
                </select>
              </div>

              {/* Desktop: Radio Buttons Styled as Tags */}
              <div className="hidden sm:flex flex-wrap gap-2">
                {[
                  // { label: "🔹 All Members", value: "" },
                  { label: "📌 General Committee", value: "General committee" },
                  {
                    label: "⭐ Executive Committee",
                    value: "Executive committee",
                  },
                  { label: "🏆 Senior Management", value: "Senior Management" },
                ].map((item) => (
                  <label key={item.value}>
                    <input
                      type="radio"
                      name="designation"
                      value={item.value}
                      checked={designation === item.value}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="hidden"
                    />
                    <span
                      className={`px-4 py-2 rounded-lg cursor-pointer border transition text-sm sm:text-base whitespace-nowrap ${
                        designation === item.value
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700 border-gray-300"
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

        {/* Team Members Grid with Staggered Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {sortedMembers.map((member, index) => (
            <div className=" w-72 h-72  bg-green-200 shadow-2xl rounded-xl relative">
              {/* Centered Image */}
              <div className="flex justify-center p-4 ">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-64 h-64 object-cover bg-gray-300 rounded-xl"
                />
              </div>

              {/* Name and Position */}
              <div
                onClick={() =>
                  navigate(`/our-team/${member.name}`, { state: { member } })
                }
                className="bg-green-400 p-4 w-72 h-auto rounded text-white absolute top-52 cursor-pointer"
              >
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm font-medium">{member.post}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurTeam;
