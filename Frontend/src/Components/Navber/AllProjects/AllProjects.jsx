import React, { useEffect, useRef, useState } from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import useRDFStore from "../../../storage/useRDFstorage";

const AllProjects = () => {
  const { programs, fetchPrograms, fetchProjects, projects } = useRDFStore();
  const [selected, setSelected] = useState("");
  const [selectedtitle, setSelectedtitle] = useState("ALL");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const tabRef = useRef(null);
  const navigate = useNavigate();

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
    setSelectedtitle(program ? program.title : "ALL");
  };

  const filteredProjects = selected
    ? projects.filter((project) => project.programName === selected)
    : projects;

  return (
    <div className="mb-12">
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
              className={`px-2 py-2 pt-4 pb-4 text-[14px] font-medium rounded-lg transition-all cursor-pointer text-center  min-w-[150px] sm:min-w-[160px] md:min-w-[180px] 
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

      {/* Project Cards Section */}
      <div>
        <h1 className="text-center text-xl font-serif pt-2 pb-2">
          {selectedtitle}
        </h1>
        <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-serif">
          {filteredProjects.map((project) => (
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
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Donor:</strong> {project.donor}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> {project.startDate} to{" "}
                  {project.endDate}
                </p>
                <button
                  onClick={() =>
                    navigate(`/project-details/${project._id}`, {
                      state: { project },
                    })
                  }
                  className="inline-flex items-center px-3 py-2 mt-auto text-sm font-medium rounded-lg btn btn-outline btn-primary focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  View Details
                  <FaArrowRight className="p-1 text-2xl pl-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
