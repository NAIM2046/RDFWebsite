import React, { useEffect, useRef, useState } from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import useRDFStore from "../../../storage/useRDFstorage";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AllProjects = () => {
  const { programs, fetchPrograms, fetchProjects, projects } = useRDFStore();
  const [selected, setSelected] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("All Project");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const tabRef = useRef(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const projectPerPage = 12;

  useEffect(() => {
    if (programs.length === 0) fetchPrograms();
    if (projects.length === 0) fetchProjects();
  }, []);

  const checkScrollButtons = () => {
    if (tabRef.current) {
      setShowLeft(tabRef.current.scrollLeft > 0);
      setShowRight(
        tabRef.current.scrollLeft <
          tabRef.current.scrollWidth - tabRef.current.clientWidth
      );
    }
  };

  const scrollTabs = (direction) => {
    if (tabRef.current) {
      tabRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const handleTabClick = (program) => {
    setSelected(program ? program._id : "");
    setSelectedTitle(program ? program.title : "All Project");
    setCurrentPage(0); // Reset to first page when changing filters
  };

  const filteredProjects = projects
    .filter((project) => (selected ? project.programName === selected : true))
    .filter((project) => {
      if (statusFilter === "Current") return project.projectState === "Current";
      if (statusFilter === "Completed")
        return project.projectState === "Completed";
      return true;
    });

  const offset = currentPage * projectPerPage;
  const currentProjects = filteredProjects.slice(
    offset,
    offset + projectPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50">
      <Helmet>
        <title>RDF - All Project </title>
        <meta
          name="description"
          content="Browse all current and completed projects by RDF"
        />
      </Helmet>

      {/* Scrollable Tab Navigation */}
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative flex items-center">
          {showLeft && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollTabs("left")}
              className="absolute left-0 z-10 p-2 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
          )}

          <div
            ref={tabRef}
            className="flex space-x-3 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-4 py-3 font-serif"
            onScroll={checkScrollButtons}
          >
            {/* ALL Tab */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-center min-w-[120px] sm:min-w-[140px] shadow-md transition-all ${
                selected === ""
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  : "bg-white border border-emerald-300 hover:border-emerald-500 text-gray-700"
              }`}
              onClick={() => handleTabClick(null)}
              title="All Project"
            >
              All
            </motion.div>

            {programs.map((program) => (
              <motion.div
                key={program._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 font-medium rounded-lg cursor-pointer text-center min-w-[120px] sm:min-w-[140px] shadow-md transition-all ${
                  selected === program._id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "bg-white border border-emerald-300 hover:border-emerald-500 text-gray-700"
                }`}
                onClick={() => handleTabClick(program)}
                title={program.title}
              >
                <span className="block text-sm leading-tight line-clamp-2">
                  {program.title}
                </span>
              </motion.div>
            ))}
          </div>

          {showRight && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollTabs("right")}
              className="absolute right-0 z-10 p-2 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          )}
        </div>

        {/* Filter Section */}
        <div className="mt-4 flex justify-center md:justify-end md:mr-15">
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="border border-emerald-300 bg-white text-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 shadow-sm"
          >
            <option value="all">All Projects</option>
            <option value="Current">Current Projects</option>
            <option value="Completed">Completed Projects</option>
          </motion.select>
        </div>
      </div>

      {/* Project Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-serif font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500"
        >
          {selectedTitle}
        </motion.h2>

        {currentProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
                >
                  <div className="overflow-hidden h-48">
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold font-serif text-gray-800 mb-2">
                      {project.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>
                        <span className="font-medium">Donor:</span>{" "}
                        {project.donor}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                          project.projectState === "Current"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-teal-100 text-teal-800"
                        }`}
                      >
                        {project.projectState === "Current"
                          ? "🟢 Ongoing"
                          : "✅ Completed"}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          navigate(`/project-details/${project._id}`, {
                            state: { project },
                          })
                        }
                        className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        View Details
                        <FaArrowRight className="ml-2" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={<span className="mx-1">...</span>}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(filteredProjects.length / projectPerPage)}
                onPageChange={handlePageClick}
                containerClassName="flex items-center space-x-2"
                pageLinkClassName="px-3 py-1 border border-emerald-300 rounded hover:bg-emerald-50 transition"
                activeLinkClassName="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent"
                previousLinkClassName="px-3 py-1 border border-emerald-300 rounded hover:bg-emerald-50 transition"
                nextLinkClassName="px-3 py-1 border border-emerald-300 rounded hover:bg-emerald-50 transition"
                disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-xl shadow-sm"
          >
            <p className="text-gray-500 text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
