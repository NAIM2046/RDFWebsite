import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRDFStore from "../../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const ProgramDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state?.program;

  if (!program) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500 text-xl font-medium">
          Program not found! Please go back and select a program.
        </p>
      </div>
    );
  }

  const { projects, fetchProjects, isLoading } = useRDFStore();

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projects.length]);

  const filteredProjects = projects.filter(
    (project) => project.programName === program._id
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50">
      <Helmet>
        <title>{program.title} | RDF Program</title>
        <meta
          name="description"
          content={program.description.substring(0, 160)}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-700">
            {program.title}
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-700 to-red-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-700 text-[20px] max-w-5xl mx-auto text-left leading-relaxed">
            {program.description}
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Text & Info */}
          <div className="space-y-10">
            {/* Key Focus Areas */}
            {program.focus?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-400"
              >
                <h2 className="text-2xl font-semibold text-red-600 font-serif mb-4 flex items-center">
                  {/* <span className="w-3 h-3 bg-green-700 rounded-full mr-2"></span> */}
                  Key Focus Areas
                </h2>
                <ul className="space-y-3">
                  {program.focus.map((area, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      className={`flex items-start py-2 px-3 rounded-lg transition-all ${
                        index % 2 === 0 ? "bg-emerald-50" : "bg-teal-50"
                      }`}
                    >
                      <span className="text-emerald-500 mr-2">•</span>
                      <span className="text-gray-700">{area}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Projects List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-400"
            >
              <h2 className="text-2xl font-semibold text-gray-800 font-serif mb-4 flex items-center">
                <span className="w-3 h-3 bg-teal-400 rounded-full mr-2"></span>
                Projects Under This Program
              </h2>
              {filteredProjects.length > 0 ? (
                <ul className="space-y-3">
                  {filteredProjects.map((project, index) => (
                    <motion.li
                      key={project._id}
                      whileHover={{ x: 5 }}
                      onClick={() =>
                        navigate(`/project-details/${project._id}`, {
                          state: { project },
                        })
                      }
                      className={`flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all ${
                        index % 2 === 0 ? "bg-emerald-50" : "bg-teal-50"
                      } hover:bg-emerald-100`}
                    >
                      <span
                        className={`mr-3 ${
                          index % 2 === 0 ? "text-emerald-600" : "text-teal-600"
                        }`}
                      >
                        ➤
                      </span>
                      <span className="text-gray-700 font-medium">
                        {project.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic py-3">
                  No projects available under this program yet.
                </p>
              )}
            </motion.div>
          </div>

          {/* Right Side - Images & Video */}
          <div className="space-y-8">
            {/* Image Gallery */}
            {program.images?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-4 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-serif">
                  Program Gallery
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {program.images.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="overflow-hidden rounded-lg shadow-md"
                    >
                      <img
                        src={img}
                        alt={`Program ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Video Embed */}
            {program.videoId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white p-4 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-serif">
                  Program Video
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-64 sm:h-80 rounded-lg"
                    src={`https://www.youtube.com/embed/${program.videoId}`}
                    title="Program Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
