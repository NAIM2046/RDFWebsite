import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RelateNews from "./RelateNews";
import ShareAndComment from "./ShareAndComment";
import useRDFStore from "../../../storage/useRDFstorage";

import { IoIosArrowForward } from "react-icons/io";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { FiExternalLink } from "react-icons/fi";

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { newss, fetchNews } = useRDFStore();

  // Retrieve from location or fallback to stored project
  const storedProject = localStorage.getItem("selectedProject");
  const project =
    location.state?.project ||
    (storedProject ? JSON.parse(storedProject) : null);

  // Save project to localStorage if it exists
  useEffect(() => {
    if (project) {
      localStorage.setItem("selectedProject", JSON.stringify(project));
    }
    if (!newss.length) {
      fetchNews();
    }
  }, [project, newss]);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-center text-red-500 text-xl font-medium bg-white p-6 rounded-lg shadow-md">
          Project not found!
        </p>
      </div>
    );

  // Handle video embedding
  const videoUrl = project.video?.includes("http")
    ? project.video
    : project.video
    ? `https://www.youtube.com/embed/${project.video}`
    : null;

  const filterNews = newss.filter(
    (news) => String(news.program) === String(project.programName)
  );

  const truncateDescription = (text, wordLimit = 30) => {
    if (!text) return "";
    return text.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  // Helper function to check if field has content
  const hasContent = (field) => {
    if (field === null || field === undefined) return false;
    if (typeof field === "string") return field.trim() !== "";
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === "object") return Object.keys(field).length > 0;
    return true;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Helmet>
        <title>{project.name} | RDF Project Details</title>
        <meta
          name="description"
          content={project.projectGoal || "RDF Project Details"}
        />
      </Helmet>

      {/* Project Header */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm mt-10 lg:mt-0">
        {/* Header Section */}
        <div className="text-center mt-10 md:mt-5">
          <h1 className="text-4xl font-extrabold font-serif text-green-700">
            {project.name}
          </h1>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Project Media Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {hasContent(project.images) && project.images[0] && (
            <div className="col-span-1 md:col-span-3 flex justify-center">
              <img
                src={project.images[0]}
                alt="Project Cover"
                className="rounded-xl w-full h-[300px] md:h-[500px] object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="mt-8 p-4 md:p-6 mx-auto bg-white shadow-md rounded-xl flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          {/* Project Goal */}
          {hasContent(project.projectGoal) && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Project Goal
                </h2>
              </div>
              <p className="text-gray-600 pl-5 leading-relaxed">
                {project.projectGoal}
              </p>
            </div>
          )}

          {/* Project Summary */}
          {hasContent(project.projectSummary) && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Project Summary
                </h2>
              </div>
              <p className="text-gray-600 pl-5 leading-relaxed">
                {project.projectSummary}
              </p>
            </div>
          )}

          {/* Major Interventions */}
          {hasContent(project.majorInterventions) && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Major Interventions
                </h2>
              </div>
              <ul className="space-y-3 pl-5">
                {project.majorInterventions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Results */}
          {hasContent(project.projectResults) && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Project Results
                </h2>
              </div>
              <p className="text-gray-700 pl-5 leading-relaxed">
                {project.projectResults}
              </p>
            </div>
          )}
        </div>

        {/* Right Section - Only show if there's content */}
        {(hasContent(project.donor) ||
          hasContent(project.budget) ||
          hasContent(project.startDate) ||
          hasContent(project.projectState) ||
          hasContent(project.implementingAreas) ||
          hasContent(project.directBeneficiaries) ||
          hasContent(project.indirectBeneficiaries) ||
          hasContent(project.projectCompletionReport) ||
          hasContent(project.images) ||
          hasContent(project.video)) && (
          <div className="w-full md:w-1/3 border border-green-200 bg-white rounded-xl shadow-sm">
            <div className="bg-green-700 px-6 py-4 rounded-t-xl">
              <h1 className="text-center text-white text-xl font-bold font-serif">
                Project Information
              </h1>
            </div>

            <div className="p-6 space-y-4">
              {/* Donor */}
              {hasContent(project.donor) && (
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Donor</p>
                    <p className="text-gray-800">{project.donor}</p>
                  </div>
                </div>
              )}

              {/* Budget */}
              {hasContent(project.budget) && (
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="text-gray-800">{project.budget}</p>
                  </div>
                </div>
              )}

              {/* Duration */}
              {hasContent(project.startDate) && hasContent(project.endDate) && (
                <div className="flex items-start">
                  <FaClock className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Duration
                    </p>
                    <p className="text-gray-800">
                      {project.startDate} to {project.endDate}
                    </p>
                  </div>
                </div>
              )}

              {/* Project State */}
              {hasContent(project.projectState) && (
                <div className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        project.projectState === "Ongoing"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Project State
                    </p>
                    <p className="text-gray-800">{project.projectState}</p>
                  </div>
                </div>
              )}

              {/* Implementing Areas */}
              {hasContent(project.implementingAreas) && (
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Implementing Areas
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.implementingAreas.map((area, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Beneficiaries */}
              {hasContent(project.directBeneficiaries) &&
                (project.directBeneficiaries.male > 0 ||
                  project.directBeneficiaries.female > 0) && (
                  <div className="flex items-start">
                    <FaUsers className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Direct Beneficiaries
                      </p>
                      <div className="flex gap-4 mt-1">
                        <div>
                          <span className="text-xs text-gray-500">Male</span>
                          <p className="text-gray-800">
                            {project.directBeneficiaries.male || 0}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Female</span>
                          <p className="text-gray-800">
                            {project.directBeneficiaries.female || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Indirect Beneficiaries */}
              {hasContent(project.indirectBeneficiaries) &&
                (project.indirectBeneficiaries.male > 0 ||
                  project.indirectBeneficiaries.female > 0) && (
                  <div className="flex items-start">
                    <FaUsers className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Indirect Beneficiaries
                      </p>
                      <div className="flex gap-4 mt-1">
                        <div>
                          <span className="text-xs text-gray-500">Male</span>
                          <p className="text-gray-800">
                            {project.indirectBeneficiaries.male || 0}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Female</span>
                          <p className="text-gray-800">
                            {project.indirectBeneficiaries.female || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Project Completion Report */}
              {hasContent(project.projectCompletionReport) && (
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={project.projectCompletionReport}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    View Completion Report
                    <FiExternalLink className="ml-2" />
                  </a>
                </div>
              )}
            </div>

            {/* Project Image Gallery */}
            {hasContent(project.images) && (
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-center text-lg font-semibold text-green-700 mb-4">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {project.images.slice(0, 4).map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Project Image ${index + 1}`}
                        className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow"
                      />
                      {index === 3 && project.images.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                          <span className="text-white font-medium">
                            +{project.images.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Video */}
            {hasContent(project.video) && (
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-center text-lg font-semibold text-green-700 mb-4">
                  Project Video
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-48 rounded-lg shadow-sm"
                    src={videoUrl}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related News Section - Only show if there are related news */}
      {hasContent(filterNews) && (
        <section className="py-12 bg-gray-50 mt-12 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Related News
              </h2>
              <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterNews.map((news) => (
                <div
                  key={news._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={news.imageURL}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <span className="text-xs text-white bg-green-600 px-2 py-1 rounded-full">
                        {news.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaUserAlt className="mr-2 text-green-600" />
                      <span>{news.author}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncateDescription(news.content[0]?.description)}
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/news/${news._id}`, { state: { news } })
                      }
                      className="flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                    >
                      Read Details
                      <IoIosArrowForward className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filterNews.length > 0 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => navigate("/news")}
                  className="inline-flex items-center px-5 py-2.5 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View All News
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <ShareAndComment />
    </div>
  );
};

export default ProjectDetails;
