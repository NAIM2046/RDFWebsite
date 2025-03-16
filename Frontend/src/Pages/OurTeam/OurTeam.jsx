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
      <div className="container mx-auto p-6">
        {/* Filter Section with Slide-In Animation */}
        <motion.div
          className="flex flex-wrap gap-6 mb-8 items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center w-full max-w-2xl">
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

            {/* Designation Filter Dropdown */}
            <motion.div
              className="relative w-full sm:w-auto"
              whileHover={{ scale: 1.01 }}
            >
              <select
                className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 ease-in-out cursor-pointer"
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="">🔹 All Members</option>
                <option value="General committee">📌 General Committee</option>
                <option value="Executive committee">
                  ⭐ Executive Committee
                </option>
                <option value="Senior Management">🏆 Senior Management</option>
              </select>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Members Grid with Staggered Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 text-center border border-gray-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Centered Image */}
              <div className="flex justify-center">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-60 h-60 object-cover rounded-lg mb-4 shadow-lg mx-auto"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <h3 className="text-xl font-bold text-blue-600">{member.name}</h3>
              <p className="text-gray-700 font-semibold">{member.post}</p>
              <p className="text-sm text-gray-500 mt-2">{member.research}</p>

              {/* View Details Button */}
              <motion.button
                onClick={() =>
                  navigate("/our-team/details", { state: { member } })
                }
                className="btn btn-outline btn-info mt-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurTeam;
