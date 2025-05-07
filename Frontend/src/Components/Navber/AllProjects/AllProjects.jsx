import React, { useEffect, useRef, useState } from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import useRDFStore from "../../../storage/useRDFstorage";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const AllProjects = () => {
  const { programs, fetchPrograms, fetchProjects, projects } = useRDFStore();
  const [selected, setSelected] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("ALL");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all"); // New state for project status filter
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
    setSelectedTitle(program ? program.title : "ALL");
  };

  // **Filter projects based on selected program and status**
  const filteredProjects = projects
    .filter((project) => (selected ? project.programName === selected : true))
    .filter((project) => {
      if (statusFilter === "Current") return project.projectState === "Current";
      if (statusFilter === "Completed")
        return project.projectState === "Completed";
      return true; // Show all projects
    });
  const offset = currentPage * projectPerPage;
  const currentProjects = filteredProjects.slice(
    offset,
    offset + projectPerPage
  );
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="mb-12">
      <Helmet>
        <title> RDF-All Projects </title>
      </Helmet>
      <PageCoverPhoto
        title="All Projects"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
      />

      {/* Scrollable Tab Navigation */}
      <div className="relative flex items-center">
        {showLeft && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        <div
          ref={tabRef}
          className="flex space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-4 sm:px-6 md:px-12 py-2 font-serif mt-10"
          onScroll={checkScrollButtons}
        >
          {/* ALL Tab */}
          <div
            className={`px-4 py-2 font-medium rounded-lg transition-all cursor-pointer text-center min-w-[150px] sm:min-w-[160px] md:min-w-[180px] 
            ${
              selected === ""
                ? "bg-green-400 text-black"
                : "bg-white border border-red-500 hover:border-amber-300 text-gray-700"
            }`}
            onClick={() => handleTabClick(null)}
            title="All Projects"
          >
            ALL
          </div>

          {programs.map((program) => (
            <div
              key={program._id}
              className={`px-2 py-2 pt-4 pb-4 text-[14px] font-medium rounded-lg transition-all cursor-pointer text-center min-w-[150px] sm:min-w-[160px] md:min-w-[180px] 
              ${
                selected === program._id
                  ? "bg-green-400 text-black"
                  : "bg-white border border-red-500 hover:border-amber-300 text-gray-700"
              }`}
              onClick={() => handleTabClick(program)}
              title={program.title}
            >
              <span className="block text-sm leading-tight line-clamp-2 overflow-hidden text-ellipsis">
                {program.title}
              </span>
            </div>
          ))}
        </div>

        {showRight && (
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Filter Section */}
      <div className="max-w-6xl mx-auto mt-2 flex justify-center md:justify-end">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
        >
          <option value="all">All Projects</option>
          <option value="Current">Current Projects</option>
          <option value="Completed">Completed Projects</option>
        </select>
      </div>

      {/* Project Cards Section */}
      <div>
        <h1 className="text-center text-xl font-serif  pb-2 text-orange-400">
          {selectedTitle}
        </h1>
        <div className="max-w-6xl mx-auto p-3 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-black transition flex flex-col h-full"
              >
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold font-serif">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Donor:</strong> {project.donor}
                  </p>
                  <p>
                    <strong>Direct Beneficiaries:</strong>
                    {parseInt(project.directBeneficiaries.male) +
                      parseInt(project.directBeneficiaries.female)}
                  </p>

                  <p>
                    <strong>Indirect Beneficiaries:</strong>
                    {parseInt(project.indirectBeneficiaries.male) +
                      parseInt(project.indirectBeneficiaries.female)}
                  </p>
                  <p className="text-sm font-bold text-blue-600">
                    Status:{" "}
                    {project.projectState === "Current"
                      ? "🟢 Current"
                      : "✅ Completed"}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/project-details/${project._id}`, {
                        state: { project },
                      })
                    }
                    className="inline-flex items-center px-3 py-3 mt-auto text-sm font-medium rounded-lg btn btn-outline btn-primary bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View Details
                    <FaArrowRight className="p-1 text-2xl pl-2" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No projects found.</p>
          )}
        </div>
        <div className="flex justify-center p-4">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel="..."
            pageRangeDisplayed={5}
            pageCount={Math.ceil(filteredProjects.length / projectPerPage)}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName="flex items-center space-x-2  rounded-lg p-2"
            pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
