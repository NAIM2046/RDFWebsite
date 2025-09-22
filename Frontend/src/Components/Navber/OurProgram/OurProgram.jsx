import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useRDFStore from "../../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";

const OurProgram = () => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const tabRef = useRef(null);
  const navigate = useNavigate();
  const autoChangeRef = useRef(null);

  const { programs, fetchPrograms, projects, fetchProjects, isLoading } =
    useRDFStore();

  useEffect(() => {
    fetchPrograms();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (programs.length > 0 && !selected) {
      setSelected(programs[0]._id);
      startAutoChange();
    }
  }, [programs]);

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
      if (!isHovered) {
        setSelected((prev) => {
          const currentIndex = programs.findIndex((p) => p._id === prev);
          return programs[(currentIndex + 1) % programs.length]._id;
        });
      }
    }, 9000);
  };

  const handleTabClick = (id) => {
    setSelected(id);
    startAutoChange();
  };

  const filteredProjects = projects.filter(
    (project) => project.programName === selected
  );

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Our Programs | Resource Development Foundation (RDF)</title>
        <meta
          name="description"
          content="Discover RDF’s diverse programs in Bangladesh, including social development, youth empowerment, climate resilience, and community projects. Learn more about each initiative."
        />
        <meta
          name="keywords"
          content="RDF programs, social development Bangladesh, youth empowerment, climate resilience, RDF projects"
        />
        <link rel="canonical" href="https://rdfbd.org/our-program" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Programs | RDF" />
        <meta
          property="og:description"
          content="Explore RDF’s transformative programs and projects across Bangladesh."
        />
        <meta property="og:url" content="https://rdfbd.org/our-program" />
        <meta
          property="og:image"
          content="https://rdfbd.org/assets/programs/cover.jpg"
        />
      </Helmet>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 font-serif bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent"
      >
        Our Programs
      </motion.h2>

      {/* Scrollable Tabs with Navigation Buttons */}
      <div className="relative flex items-center mb-8">
        {showLeft && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              tabRef.current.scrollBy({ left: -200, behavior: "smooth" })
            }
            className="absolute left-0 z-10 p-2 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </motion.button>
        )}

        <div
          ref={tabRef}
          className="flex space-x-4 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar w-full px-4 py-2 font-serif"
          onScroll={checkScrollButtons}
        >
          {programs.map((program) => (
            <motion.div
              key={program._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-3 shadow-lg text-sm font-medium rounded-lg cursor-pointer text-center min-w-[180px] transition-all duration-300 ${
                selected === program._id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                  : "bg-white border-2 border-amber-300 hover:border-emerald-400 text-gray-700 hover:shadow-md"
              }`}
              onClick={() => handleTabClick(program._id)}
            >
              <span className="block text-sm font-medium leading-tight line-clamp-2">
                {program.title}
              </span>
            </motion.div>
          ))}
        </div>

        {showRight && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              tabRef.current.scrollBy({ left: 200, behavior: "smooth" })
            }
            className="absolute right-0 z-10 p-2 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </motion.button>
        )}
      </div>

      {/* Program Details */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="text-lg ml-3 text-gray-600">Loading programs...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No programs available</p>
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
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-6 p-6 bg-white rounded-xl shadow-lg"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <motion.img
                      src={program.images[0]}
                      alt={program.title}
                      className="w-full h-auto max-h-[400px] object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 leading-snug font-serif">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {program.description.split(" ").slice(0, 30).join(" ")}
                      {program.description.split(" ").length > 30 && "..."}
                    </p>

                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-emerald-600">
                        Projects under this program:
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {filteredProjects.length > 0 ? (
                          filteredProjects.slice(0, 4).map((project, index) => (
                            <motion.li
                              key={project._id}
                              whileHover={{ x: 5 }}
                              className={`cursor-pointer transition-colors duration-200 ${
                                index % 2 === 0
                                  ? "text-blue-600"
                                  : "text-orange-500"
                              } hover:text-emerald-600`}
                              onClick={() =>
                                navigate(`/project-details/${project._id}`, {
                                  state: { project },
                                })
                              }
                            >
                              {project.name}
                            </motion.li>
                          ))
                        ) : (
                          <li className="text-gray-500 italic">
                            No projects available for this program
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          navigate(`/program-details/${program._id}`, {
                            state: { program },
                          })
                        }
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        Read More
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/all-projects")}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        See All Projects
                      </motion.button>
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
