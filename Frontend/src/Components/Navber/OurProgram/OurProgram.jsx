import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useRDFStore from "../../../storage/useRDFstorage";

const OurProgram = () => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [selected, setSelected] = useState(null);
  const tabRef = useRef(null);
  const navigate = useNavigate();
  const autoChangeRef = useRef(null);

  const { programs, fetchPrograms, projects, fetchProjects, isLoading } =
    useRDFStore();

  useEffect(() => {
    fetchPrograms();
    fetchProjects();
    console.log("calling");
  }, []);

  useEffect(() => {
    if (programs.length > 0) {
      setSelected(programs[0]._id); // Set first program after fetching
      startAutoChange();
    }
  }, [programs]);

  console.log(projects);
  console.log(programs);

  const checkScrollButtons = () => {
    if (tabRef.current) {
      setShowLeft(tabRef.current.scrollLeft > 0);
      setShowRight(
        tabRef.current.scrollLeft <
          tabRef.current.scrollWidth - tabRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const startAutoChange = () => {
    clearInterval(autoChangeRef.current);
    autoChangeRef.current = setInterval(() => {
      setSelected((prev) => {
        const currentIndex = programs.findIndex((p) => p._id === prev);
        return programs[(currentIndex + 1) % programs.length]._id; // Fixed _id reference
      });
    }, 10000);
  };

  const handleTabClick = (id) => {
    setSelected(id);
    startAutoChange();
  };
  const filteredProjects = projects.filter(
    (project) => project.programName === selected
  );

  return (
    <div className="max-w-8xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 font-serif">
        OUR PROGRAMS
      </h2>

      {/* Scrollable Tabs with Navigation Buttons */}
      <div className="relative flex items-center">
        {showLeft && (
          <button
            onClick={() =>
              tabRef.current.scrollBy({ left: -200, behavior: "smooth" })
            }
            className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        <div
          ref={tabRef}
          className="flex space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-4 py-2 font-serif"
          onScroll={checkScrollButtons}
        >
          {programs.map((program) => (
            <div
              key={program._id}
              className={`px-2 py-2 pt-4 pb-4 shadow-lg text-[14px] font-medium rounded-lg transition-all cursor-pointer text-center  min-w-[150px] 
                ${
                  selected === program._id
                    ? "bg-green-400 text-black"
                    : "bg-white border border-red-500 hover:border-amber-300 text-gray-700"
                }`}
              onClick={() => handleTabClick(program._id)}
            >
              <span className="block text-sm leading-tight line-clamp-2 overflow-hidden text-ellipsis">
                {program.title}
              </span>
            </div>
          ))}
        </div>

        {showRight && (
          <button
            onClick={() =>
              tabRef.current.scrollBy({ left: 200, behavior: "smooth" })
            }
            className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Program Details */}
      {projects.length === 0 && programs.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-700"></div>
          <p className="text-lg ml-3">Loading...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {programs.map(
            (program) =>
              selected === program._id && (
                <motion.div
                  key={program._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-6 px-6 py-8 bg-white rounded-lg shadow-lg"
                >
                  <div>
                    <img
                      src={program.images[0]}
                      alt={program.title}
                      className="w-full h-auto max-h-[400px] rounded-lg  object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 leading-snug font-serif">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {program.description.split(" ").slice(0, 20).join(" ")}{" "}
                      ....
                    </p>

                    <h4 className="mt-6 text-lg font-semibold text-gray-800">
                      program under this Projects :
                    </h4>
                    <ul className="mt-3 list-disc pl-5 space-y-2">
                      <ul className="mt-3 list-disc pl-5 space-y-2">
                        {filteredProjects.length > 0 ? (
                          filteredProjects.slice(0, 4).map((project, index) => (
                            <li
                              key={project._id}
                              className={`cursor-pointer transition-colors duration-300 ${
                                index % 2 === 0
                                  ? "text-blue-600"
                                  : "text-green-600"
                              } hover:text-red-500`}
                              onClick={() =>
                                navigate(`/project-details/${project._id}`, {
                                  state: { project },
                                })
                              }
                            >
                              {project.name}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">
                            No projects available.
                          </li>
                        )}
                      </ul>
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <button
                        onClick={() =>
                          navigate(`/program-details/${program._id}`, {
                            state: { program },
                          })
                        }
                        className="px-5 py-2 rounded-lg shadow-md transition hover:shadow-lg cursor-pointer btn btn-outline btn-primary"
                      >
                        Read More...
                      </button>
                      <button
                        onClick={() => navigate("/all-projects")}
                        className="btn btn-outline btn-success px-5 py-2 rounded-lg shadow-md transition hover:shadow-lg"
                      >
                        See All Projects
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default OurProgram;
