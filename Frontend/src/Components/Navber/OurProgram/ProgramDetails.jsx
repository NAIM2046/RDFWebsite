import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRDFStore from "../../../storage/useRDFstorage";
import { Helmet } from "react-helmet-async";

const ProgramDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state?.program;

  if (!program) {
    return (
      <p className="text-center text-red-500 text-xl mt-10">
        Program not found!
      </p>
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
    <div className="container mx-auto max-w-7xl px-6 py-12 lg:py-16 ">
      <Helmet>
        <title>{program.title}</title>
      </Helmet>
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mt-20 lg:mt-0">
          {program.title}
        </h1>
        <p className="mt-4 text-gray-700 text-lg text-start">
          {program.description}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Left Side - Text & Info */}
        <div className="space-y-8">
          {/* Key Focus Areas */}
          {program.focus?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-green-500 font-serif">
                Key Focus Areas:
              </h2>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                {program.focus.map((area, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-600 transition duration-300 even:text-orange-400 odd:text-blue-600"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Projects Under This Program
            </h2>
            <ul className="mt-3 space-y-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.slice(0, 4).map((project, index) => (
                  <li
                    key={project._id}
                    className={`cursor-pointer text-lg transition duration-300 ${
                      index % 2 === 0 ? "text-blue-600" : "text-green-600"
                    } hover:text-red-500`}
                    onClick={() =>
                      navigate(`/project-details/${project._id}`, {
                        state: { project },
                      })
                    }
                  >
                    ➤ {project.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No projects available.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Side - Images & Video */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-2">
            {program.images?.map((img, index) => (
              <div key={index} className="w-44 h-32 sm:w-60 sm:h-44">
                <img
                  src={img}
                  alt={`Program Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Video Embed */}
          {program.videoId && (
            <div className="w-full sm:w-[500px] h-64">
              <iframe
                className="w-full h-full rounded-lg shadow-md"
                src={`https://www.youtube.com/embed/${program.videoId}`}
                title="Program Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
